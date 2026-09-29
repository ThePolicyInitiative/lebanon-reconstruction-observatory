import copy
import json
import unittest

from collect_daily_news import GROUPS, parse_report, safe_error


class DailyNewsResearchTests(unittest.TestCase):
    def setUp(self):
        self.report = {
            "status": "complete", "summary": "Sources searched; no material additions.",
            "coverage": [{"group": group, "searched": True, "finding": "Checked"} for group in GROUPS],
            "sources": [{"url": "https://example.org/report", "title": "Report", "publication_date": "2026-09-29",
                         "event_date": "", "locator": "Section 2", "excerpt": "Reported finding", "finding": "Already indexed", "material_change": False}],
        }

    def response(self, report=None):
        return {"choices": [{"finish_reason": "stop", "message": {"content": json.dumps(report or self.report)}}]}

    def test_completed_coverage_can_report_no_material_changes(self):
        self.assertEqual(parse_report(self.response()), self.report)

    def test_failed_searches_and_missing_evidence_cannot_be_no_news(self):
        for mutation in ("blocked", "coverage", "sources", "excerpt"):
            report = copy.deepcopy(self.report)
            if mutation == "blocked": report["status"] = "blocked"
            if mutation == "coverage": report["coverage"][0]["searched"] = False
            if mutation == "sources": report["sources"] = []
            if mutation == "excerpt": report["sources"][0]["excerpt"] = ""
            with self.assertRaises(ValueError): parse_report(self.response(report))

    def test_incomplete_api_response_is_rejected(self):
        response = self.response()
        response["choices"][0]["finish_reason"] = "length"
        with self.assertRaises(ValueError): parse_report(response)

    def test_malformed_report_fails_with_actionable_error(self):
        report = copy.deepcopy(self.report)
        report["summary"] = {"finding": "Unexpected provider format"}
        with self.assertRaisesRegex(ValueError, "report format"):
            parse_report(self.response(report))

    def test_api_error_redacts_the_key(self):
        key = "sk-or-v1-test-secret"
        self.assertNotIn(key, safe_error("Invalid key " + key, key))


if __name__ == "__main__":
    unittest.main()
