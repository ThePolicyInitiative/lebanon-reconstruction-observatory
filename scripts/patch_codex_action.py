"""Apply bounded shutdown recovery to one exact upstream action bundle.

Upstream: https://github.com/openai/codex-action/pull/151
No changes to privilege dropping, sandbox configuration, or credentials.
"""

import hashlib
from pathlib import Path
import sys

UPSTREAM_SHA256 = "c0e530e7883cc18e28f854d171f58d83e2387f7decf29f1a8ec3aa682f6601be"
OLD = '''      const child = (0, import_child_process2.spawn)(program2, command, {
        env,
        stdio: ["pipe", "inherit", "inherit"]
      });
      child.stdin.write(input);
      child.stdin.end();
      child.on("error", reject);
      child.on("close", async (code) => {
'''
NEW = '''      const child = (0, import_child_process2.spawn)(program2, command, {
        env,
        stdio: ["pipe", "pipe", "pipe"]
      });
      child.stdout.pipe(process.stdout, { end: false });
      child.stderr.pipe(process.stderr, { end: false });
      child.stdin.write(input);
      child.stdin.end();
      const closeOutputStreams = () => {
        child.stdout.unpipe(process.stdout);
        child.stderr.unpipe(process.stderr);
        child.stdout.destroy();
        child.stderr.destroy();
      };
      let settled = false;
      let candidate = "", candidateSince = 0, checking = false;
      // The CLI writes this file only after its final response. Some upstream
      // shutdown paths never emit exit, so recover a complete, stable report.
      // A fresh job still validates its patch and runs all publication checks.
      const recoveryHandle = setInterval(async () => {
        if (settled || checking || runAsUser != null) return;
        checking = true;
        try {
          const report = await (0, import_promises.readFile)(outputFile.file, "utf8");
          if (settled) return;
          if (!isCompleteDailyReport(report)) {
            candidate = "";
            return;
          }
          if (report !== candidate) {
            candidate = report;
            candidateSince = Date.now();
            return;
          }
          if (Date.now() - candidateSince < 30000) return;
          settled = true;
          clearInterval(recoveryHandle);
          console.warn("::warning::Recovered a complete final report after Codex shutdown stalled; independent validation is still required.");
          // Touch only this invocation's child, never other runner processes.
          try { child.kill("SIGTERM"); } catch (_) {}
          child.stdin.destroy();
          await drainCodexOutputStreams([child.stdout, child.stderr]);
          closeOutputStreams();
          child.unref();
          try {
            await finalizeExecution(outputFile, runAsUser);
            resolve(void 0);
          } catch (err) { reject(err); }
        } catch (_) {
          candidate = "";
        } finally { checking = false; }
      }, 1000);
      child.once("error", (err) => {
        if (settled) return;
        settled = true;
        clearInterval(recoveryHandle);
        closeOutputStreams();
        reject(err);
      });
      child.once("exit", async (code) => {
        if (settled) return;
        settled = true;
        clearInterval(recoveryHandle);
        await drainCodexOutputStreams([child.stdout, child.stderr]);
        closeOutputStreams();
'''
DRAIN = '''function isCompleteDailyReport(text) {
  if (text.length > 200000) return false;
  try {
    const report = JSON.parse(text);
    return report !== null && typeof report === "object" &&
      ["updated", "no_change", "blocked"].includes(report.status) &&
      typeof report.summary === "string" && Array.isArray(report.sources) &&
      typeof report.patch === "string" && report.patch.length <= 24000;
  } catch (_) { return false; }
}
function drainCodexOutputStreams(streams) {
  return new Promise((resolve) => {
    let quietHandle;
    const onData = () => scheduleQuietCheck();
    for (const stream of streams) stream.on("data", onData);
    const finish = () => {
      clearTimeout(quietHandle);
      clearTimeout(timeoutHandle);
      for (const stream of streams) stream.off("data", onData);
      resolve();
    };
    const scheduleQuietCheck = () => {
      clearTimeout(quietHandle);
      quietHandle = setTimeout(() => {
        if (streams.every((stream) => stream.destroyed ||
            (stream.readableLength === 0 && stream.readableFlowing !== false))) {
          finish();
        } else {
          scheduleQuietCheck();
        }
      }, 25);
    };
    const timeoutHandle = setTimeout(finish, 1000);
    scheduleQuietCheck();
  });
}
'''


def patch_bundle(content):
    if hashlib.sha256(content).hexdigest() != UPSTREAM_SHA256:
        raise ValueError("Unexpected Codex action bundle; refusing to patch a different version")
    source = content.decode("utf-8")
    anchor = "async function finalizeExecution(outputFile, runAsUser) {"
    if source.count(OLD) != 1 or source.count(anchor) != 1:
        raise ValueError("Expected exactly one Codex lifecycle patch location")
    return source.replace(OLD, NEW).replace(anchor, DRAIN + anchor).encode("utf-8")


if __name__ == "__main__":
    bundle = Path(sys.argv[1]) / "dist/main.js"
    bundle.write_bytes(patch_bundle(bundle.read_bytes()))
    print("Applied verified Codex action lifecycle fix; sandbox protections retained.")
