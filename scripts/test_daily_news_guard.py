import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

import daily_news_guard as guard


class DailyNewsGuardTests(unittest.TestCase):
    def setUp(self):
        self.previous = Path.cwd()
        self.temp = tempfile.TemporaryDirectory()
        os.chdir(self.temp.name)
        self.git("init", "-q")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.invalid")
        self.git("config", "core.autocrlf", "false")
        for name in ("data.js", "locale.js", "README.md", "index.html", "other.txt"):
            Path(name).write_text('original\n' if name != 'index.html' else '<script src="data.js?v=old"></script>\n', encoding="utf-8")
        self.git("add", ".")
        self.git("commit", "-qm", "Initial")

    def tearDown(self):
        os.chdir(self.previous)
        self.temp.cleanup()

    def git(self, *args):
        return subprocess.run(["git", *args], check=True, capture_output=True).stdout

    def review(self, name="data.js"):
        Path(name).write_text("verified news\n", encoding="utf-8")
        patch = self.git("diff", "--no-color").decode()
        self.git("restore", name)
        return {"status": "updated", "summary": "Source reviewed", "patch": patch,
                "sources": [{"url": "https://example.org/publication", "publication_date": "2026-09-29",
                             "locator": "Paragraph 2", "finding": "Verified change"}]}

    def test_no_news_and_blocked_review_never_change_files(self):
        self.assertFalse(guard.apply_review({"status": "no_change", "patch": ""}))
        with self.assertRaises(ValueError):
            guard.apply_review({"status": "blocked", "patch": "", "summary": "Search failed"})
        self.assertEqual(self.git("diff"), b"")

    def test_rejects_unexpected_paths_and_missing_evidence(self):
        with self.assertRaises(ValueError):
            guard.apply_review(self.review("other.txt"))
        result = self.review()
        result["sources"] = []
        with self.assertRaises(ValueError):
            guard.apply_review(result)
        self.assertEqual(self.git("diff"), b"")

    def test_rejects_file_deletion(self):
        Path("data.js").unlink()
        patch = self.git("diff").decode()
        self.git("restore", "data.js")
        result = self.review()
        result["patch"] = patch
        with self.assertRaises(ValueError):
            guard.apply_review(result)
        self.assertTrue(Path("data.js").exists())

    def test_review_package_publish_roundtrip_and_unrelated_concurrent_edit(self):
        self.assertTrue(guard.apply_review(self.review()))
        self.assertNotIn("?v=old", Path("index.html").read_text())
        guard.pack("bundle.json")
        bundle = json.loads(Path("bundle.json").read_text())
        self.git("restore", ".")
        Path("other.txt").write_text("New source metadata\n")
        self.git("add", "other.txt")
        self.git("commit", "-qm", "Concurrent unrelated change")
        guard.publish(bundle)
        self.assertEqual(Path("data.js").read_text(), "verified news\n")
        self.assertEqual(Path("other.txt").read_text(), "New source metadata\n")
        self.assertIn(b"data.js", self.git("diff", "--cached", "--name-only"))

    def test_concurrent_editorial_change_fails_before_writing(self):
        guard.apply_review(self.review())
        guard.pack("bundle.json")
        bundle = json.loads(Path("bundle.json").read_text())
        self.git("restore", ".")
        Path("data.js").write_text("Newer user edit\n")
        with self.assertRaises(ValueError):
            guard.publish(bundle)
        self.assertEqual(Path("data.js").read_text(), "Newer user edit\n")
        self.assertIn("?v=old", Path("index.html").read_text())

    def test_bundle_cannot_write_workflows_or_forge_original_content(self):
        guard.apply_review(self.review())
        guard.pack("bundle.json")
        bundle = json.loads(Path("bundle.json").read_text())
        self.git("restore", ".")
        bundle["files"][0]["before"] = "0" * 64
        with self.assertRaises(ValueError):
            guard.publish(bundle)
        bundle["files"].append({"path": ".github/workflows/daily-news.yml", "before": "", "content": "bad"})
        with self.assertRaises(ValueError):
            guard.publish(bundle)
        self.assertEqual(self.git("diff"), b"")


if __name__ == "__main__":
    unittest.main()
