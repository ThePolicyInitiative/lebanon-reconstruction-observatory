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
      child.stdout.setEncoding("utf8");
      child.stdout.pipe(process.stdout, { end: false });
      child.stderr.pipe(process.stderr, { end: false });
      let stdoutTail = "", stdoutReport = "";
      const rememberFinalOutput = (chunk) => {
        stdoutTail = (stdoutTail + chunk.toString("utf8")).slice(-200000);
        const lastLine = stdoutTail.trim().split(/\\r?\\n/).pop() || "";
        stdoutReport = isCompleteDailyReport(lastLine) ? lastLine : "";
      };
      child.stdout.on("data", rememberFinalOutput);
      child.stdin.write(input);
      child.stdin.end();
      const closeOutputStreams = () => {
        child.stdout.off("data", rememberFinalOutput);
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
          let report;
          try {
            report = await (0, import_promises.readFile)(outputFile.file, "utf8");
          } catch (_) { report = ""; }
          // Some CLI shutdowns print the final JSON before flushing the file.
          if (!isCompleteDailyReport(report)) report = stdoutReport;
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
            await finalizeExecution(outputFile, runAsUser, report);
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
DRAIN = '''function readDailyEditorialDiff(gitBinary = "/usr/bin/git") {
  if (!process.env.GITHUB_WORKSPACE) throw new Error("Missing review workspace");
  return (0, import_child_process2.execFileSync)(gitBinary, [
    "-c", "core.hooksPath=/dev/null", "diff", "--no-ext-diff", "--no-textconv",
    "--no-color", "HEAD", "--", "data.js", "record-guide.js",
    "classification-reviews.js", "programme-data.js", "deadline-data.js", "locale.js"
  ], { cwd: process.env.GITHUB_WORKSPACE, encoding: "utf8", maxBuffer: 200000 });
}
function attachDailyWorkspaceDiff(text, readDiff = readDailyEditorialDiff) {
  if (!isCompleteDailyReport(text)) throw new Error("Invalid final review metadata");
  const report = JSON.parse(text);
  if (report.status === "blocked") return JSON.stringify({ ...report, patch: "" });
  const patch = readDiff();
  if (report.status === "no_change" && patch) throw new Error("No-change review left editorial edits");
  if (report.status === "updated" && (!patch || patch.length > 24000)) {
    throw new Error("Updated review needs a nonempty Git diff under 24,000 characters");
  }
  return JSON.stringify({ ...report, patch });
}
function isCompleteDailyReport(text) {
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
    output = '(0, import_core.setOutput)("final-message", lastMessage);'
    read_anchor = '    let lastMessage;\n    if (runAsUser == null) {'
    if any(source.count(part) != 1 for part in (OLD, anchor, output, read_anchor)):
        raise ValueError("Expected exactly one Codex lifecycle patch location")
    source = source.replace(OLD, NEW).replace(anchor, DRAIN +
        "async function finalizeExecution(outputFile, runAsUser, recoveredMessage) {")
    source = source.replace(read_anchor,
        '    let lastMessage;\n    if (recoveredMessage != null) {\n'
        '      lastMessage = recoveredMessage;\n    } else if (runAsUser == null) {')
    source = source.replace(output, 'lastMessage = attachDailyWorkspaceDiff(lastMessage);\n    ' + output)
    return source.encode("utf-8")


if __name__ == "__main__":
    bundle = Path(sys.argv[1]) / "dist/main.js"
    bundle.write_bytes(patch_bundle(bundle.read_bytes()))
    print("Applied verified Codex action lifecycle fix; sandbox protections retained.")
