"""Regression checks for safe, repeatable source-monitor publication."""
import copy
import json
import tempfile
import unittest
from pathlib import Path

from scrape_official_sources import registered_source_targets, save_snapshot


class SnapshotTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.output = Path(self.directory.name) / "snapshot.json"
        self.previous = {
            "generatedAt": "2026-09-17T09:00:00Z", "targetCount": 2, "reachableCount": 2,
            "targets": [
                {"url": "https://example.org/a", "title": "Water services", "state": "reachable", "status": 200, "checkedAt": "old", "durationMs": 10},
                {"url": "https://example.org/b", "title": "Shelter", "state": "reachable", "status": 200, "checkedAt": "old", "durationMs": 20},
            ],
        }
        self.output.write_text(json.dumps(self.previous), encoding="utf-8")
        self.original = self.output.read_bytes()

    def test_timing_and_order_alone_do_not_rewrite_snapshot(self):
        refreshed = copy.deepcopy(self.previous)
        refreshed["generatedAt"] = "2026-09-18T09:00:00Z"
        refreshed["targets"].reverse()
        for target in refreshed["targets"]:
            target.update(checkedAt="new", durationMs=500)
        self.assertEqual(save_snapshot(refreshed, self.output, True), 0)
        self.assertEqual(self.output.read_bytes(), self.original)

    def test_metadata_and_availability_changes_are_saved(self):
        for change in [{"title": "Updated water services"}, {"state": "response-error", "status": 404}]:
            with self.subTest(change=change):
                refreshed = copy.deepcopy(self.previous)
                refreshed["targets"][0].update(change)
                refreshed["reachableCount"] = sum(t["state"] == "reachable" for t in refreshed["targets"])
                self.assertEqual(save_snapshot(refreshed, self.output, True), 0)
                self.assertEqual(json.loads(self.output.read_text(encoding="utf-8")), refreshed)

    def test_manual_refresh_saves_new_check_times(self):
        refreshed = copy.deepcopy(self.previous)
        refreshed["generatedAt"] = "2026-09-18T09:00:00Z"
        self.assertEqual(save_snapshot(refreshed, self.output), 0)
        self.assertEqual(json.loads(self.output.read_text())["generatedAt"], refreshed["generatedAt"])

    def test_complete_network_failure_preserves_last_snapshot(self):
        failed = copy.deepcopy(self.previous)
        failed["reachableCount"] = 0
        self.assertEqual(save_snapshot(failed, self.output), 1)
        self.assertEqual(self.output.read_bytes(), self.original)

    def test_new_source_is_detected(self):
        refreshed = copy.deepcopy(self.previous)
        refreshed["targets"].append({"url": "https://example.org/c", "state": "reachable", "status": 200})
        refreshed.update(targetCount=3, reachableCount=3)
        self.assertEqual(save_snapshot(refreshed, self.output, True), 0)
        self.assertEqual(len(json.loads(self.output.read_text())["targets"]), 3)

    def test_registered_sources_include_recent_additions(self):
        urls = {target["url"] for target in registered_source_targets()}
        self.assertIn("https://www.anera.org/press/launching-a-wash-project-with-the-lebanon-humanitarian-fund/", urls)
        self.assertIn("https://www.icrc.org/en/article/lebanon-humanitarian-needs-remain-acute", urls)


if __name__ == "__main__":
    unittest.main()
