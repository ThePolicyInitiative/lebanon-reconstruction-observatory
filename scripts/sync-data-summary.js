/* Generate the current README counts from the same registries as the site. */
const fs = require("node:fs");
const path = require("node:path");
const data = require("../data.js");
const guide = require("../record-guide.js");
const programmes = require("../programme-data.js");
const deadlines = require("../deadline-data.js");

function syncDataSummary() {
  const reviews = data.records.map(record => guide.get(record).review);
  const latest = reviews.map(review => review.checkedAt).filter(Boolean).sort().at(-1);
  const count = status => reviews.filter(review => review.status === status).length;
  const summary = `<!-- data-summary:start -->
## Current library snapshot

Generated from the editorial registries by npm run data:summary and npm run build.

- ${data.records.length} source records and ${data.sources.length} registered source entries (entries can share a URL).
- ${count("reviewed")} source-reviewed records, ${count("record_only")} record-wording annotations, and ${count("unavailable")} records awaiting readable sources.
- Latest individual editorial review: ${latest}. The baseline dataset review remains ${data.reviewedAt}.
- ${programmes.programmes.length} selected programme histories; ${programmes.leap.events.length} events in the LEAP history.
- ${deadlines.entries.length} dated deadline observations, including past dates. These are not live procurement statuses.
<!-- data-summary:end -->`;
  const file = path.join(__dirname, "..", "README.md");
  const existing = fs.readFileSync(file, "utf8");
  const pattern = /<!-- data-summary:start -->[\s\S]*?<!-- data-summary:end -->/;
  const updated = pattern.test(existing) ? existing.replace(pattern, summary) : existing.replace("## Run locally", summary + "\n\n## Run locally");
  if (updated !== existing) fs.writeFileSync(file, updated);
}

if (require.main === module) syncDataSummary();
module.exports = syncDataSummary;
