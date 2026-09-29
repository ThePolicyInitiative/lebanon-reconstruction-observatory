import json
import subprocess
import unittest

from patch_codex_action import DRAIN, NEW, patch_bundle


class CodexActionWrapperTests(unittest.TestCase):
    def run_wrapper(self, child):
        script = '''const import_child_process2 = require("node:child_process");
const program2 = process.execPath, env = process.env, input = "";
const command = ["-e", CHILD];
''' .replace("CHILD", json.dumps(child)) + DRAIN + '''
(async () => {
  await new Promise((resolve, reject) => {
''' + NEW + '''
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

    def test_unrecognized_upstream_code_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "different version"):
            patch_bundle(b"unrecognized bundle")


if __name__ == "__main__":
    unittest.main()
