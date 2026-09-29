import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path

from patch_codex_action import DRAIN, NEW, patch_bundle


class CodexActionWrapperTests(unittest.TestCase):
    def run_wrapper(self, child):
        with tempfile.TemporaryDirectory() as directory:
            return self.run_wrapper_in(directory, child)

    def run_wrapper_in(self, directory, child):
        output_path = str(Path(directory) / "final.json")
        child = child.replace("OUTPUT_PATH", json.dumps(output_path))
        script = '''const import_child_process2 = require("node:child_process");
const import_promises = require("node:fs/promises");
const runAsUser = null, outputFile = {file: OUTPUT_PATH};
async function finalizeExecution(file, user, recoveredMessage) {
  JSON.parse(recoveredMessage ?? await import_promises.readFile(file.file, "utf8"));
  console.log("FINAL_REPORT_RECOVERED");
}
const program2 = process.execPath, env = process.env, input = "";
const command = ["-e", CHILD];
''' .replace("OUTPUT_PATH", json.dumps(output_path)).replace("CHILD", json.dumps(child)) + DRAIN + '''
(async () => {
  await new Promise((resolve, reject) => {
''' + NEW.replace("< 30000", "< 100").replace("}, 1000);", "}, 25);") + '''
    if (code !== 0) { reject(new Error("child exit " + code)); return; }
    resolve();
  });
  });
  console.log("WRAPPER_COMPLETED");
})().catch(error => { console.error(error.message); process.exitCode = 1; });
'''
        return subprocess.run(["node", "-e", script], capture_output=True, text=True, timeout=4)

    def test_descendant_cannot_hold_runner_logs_open(self):
        result = self.run_wrapper('''
const {spawn} = require("node:child_process");
process.stdout.write("START" + "x".repeat(1024 * 1024) + "END");
process.stderr.write("ERRORSTART" + "y".repeat(1024 * 1024) + "ERROREND");
const descendant = spawn(process.execPath, ["-e", "setTimeout(() => {}, 8000)"], {stdio: "inherit"});
descendant.unref();
''')
        self.assertEqual(result.returncode, 0, result.stderr[-500:])
        self.assertIn("START" + "x" * (1024 * 1024) + "END", result.stdout)
        self.assertIn("ERRORSTART" + "y" * (1024 * 1024) + "ERROREND", result.stderr)
        self.assertIn("WRAPPER_COMPLETED", result.stdout)

    def test_failed_direct_child_is_not_accepted(self):
        result = self.run_wrapper("process.exitCode = 7;")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("WRAPPER_COMPLETED", result.stdout)

    def test_complete_report_is_recovered_when_direct_child_hangs(self):
        result = self.run_wrapper('''
require("node:fs").writeFileSync(OUTPUT_PATH, JSON.stringify({
  status: "no_change", summary: "Reviewed sources", sources: [], patch: ""
}));
setTimeout(() => {}, 8000);
''')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("FINAL_REPORT_RECOVERED", result.stdout)
        self.assertIn("WRAPPER_COMPLETED", result.stdout)

    def test_partial_or_invalid_reports_cannot_trigger_recovery(self):
        for report in ['{"status":', '{}', 'null', '{"status":"updated"}']:
            with self.subTest(report=report):
                result = self.run_wrapper(
                    'require("node:fs").writeFileSync(OUTPUT_PATH, ' + json.dumps(report) + ');'
                    'setTimeout(() => { process.exitCode = 7; }, 400);'
                )
                self.assertNotEqual(result.returncode, 0)
                self.assertNotIn("FINAL_REPORT_RECOVERED", result.stdout)
                self.assertNotIn("WRAPPER_COMPLETED", result.stdout)

    def test_completed_stdout_report_is_recovered_before_file_flush(self):
        result = self.run_wrapper('''
console.log("Startup diagnostic, not a report.");
console.log(JSON.stringify({status: "updated", summary: "Verified", sources: [], patch: ""}));
setTimeout(() => {}, 8000);
''')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("FINAL_REPORT_RECOVERED", result.stdout)
        self.assertIn("WRAPPER_COMPLETED", result.stdout)

    def test_failure_before_recovery_grace_is_not_accepted(self):
        result = self.run_wrapper('''
require("node:fs").writeFileSync(OUTPUT_PATH, JSON.stringify({
  status: "no_change", summary: "Reviewed sources", sources: [], patch: ""
}));
process.exitCode = 7;
''')
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("FINAL_REPORT_RECOVERED", result.stdout)

    def test_unrecognized_upstream_code_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "different version"):
            patch_bundle(b"unrecognized bundle")

    def test_handoff_uses_exact_git_diff_instead_of_model_patch(self):
        with tempfile.TemporaryDirectory() as directory:
            def git(*args, **kwargs):
                return subprocess.run(["git", *args], cwd=directory, check=True,
                                      capture_output=True, **kwargs).stdout
            git("init", "-q")
            git("config", "user.name", "Test")
            git("config", "user.email", "test@example.invalid")
            git("config", "core.autocrlf", "false")
            for name in ("data.js", "other.txt"):
                Path(directory, name).write_text("original\n", encoding="utf-8")
            git("add", ".")
            git("commit", "-qm", "Initial")
            Path(directory, "data.js").write_text('const title = "مياه الشرب";\n', encoding="utf-8")
            Path(directory, "other.txt").write_text("exclude this file\n", encoding="utf-8")
            script = 'const import_child_process2 = require("node:child_process");\n' + DRAIN + '''
const metadata = {status: "updated", summary: "Verified change", sources: [], patch: "malformed model patch"};
console.log(attachDailyWorkspaceDiff(JSON.stringify(metadata), () => readDailyEditorialDiff("git")));
'''
            result = subprocess.run(["node", "-e", script], check=True, capture_output=True,
                                    env={**os.environ, "GITHUB_WORKSPACE": directory})
            report = json.loads(result.stdout)
            self.assertEqual(report["patch"].encode(), git("diff", "--no-color", "HEAD", "--", "data.js"))
            self.assertNotIn("other.txt", report["patch"])
            git("restore", "data.js")
            git("apply", "--check", input=report["patch"].encode())

    def test_handoff_rejects_inconsistent_status_and_oversized_changes(self):
        script = 'const assert = require("node:assert/strict");\n' + DRAIN + '''
const report = status => JSON.stringify({status, summary: "Reviewed", sources: [], patch: ""});
assert.throws(() => attachDailyWorkspaceDiff(report("no_change"), () => "diff"));
assert.throws(() => attachDailyWorkspaceDiff(report("updated"), () => ""));
assert.throws(() => attachDailyWorkspaceDiff(report("updated"), () => "x".repeat(24001)));
assert.equal(JSON.parse(attachDailyWorkspaceDiff(report("no_change"), () => "")).patch, "");
assert.equal(JSON.parse(attachDailyWorkspaceDiff(report("blocked"), () => {throw Error("must not read diff")})).status, "blocked");
'''
        subprocess.run(["node", "-e", script], check=True, capture_output=True)


if __name__ == "__main__":
    unittest.main()
