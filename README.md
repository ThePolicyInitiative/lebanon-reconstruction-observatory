# Rebuild Lebanon Observatory

A local public-data web application for reviewing Lebanon reconstruction and recovery context.

## Run locally

Run the bundled application server:

```powershell
node server.js
```

Then open `http://127.0.0.1:4173`.

## What works

- Search and filter a curated source-record library by 2024 and 2026 response period.
- Explore a source-linked actor and action registry that follows the selected response period.
- Share a filtered library view through its URL, or copy a permanent record link.
- Follow the selected LEAP source history at `#leap-history`, linked from the dossier and its library records.
- Browse the 10 RDNA sectors and source-linked recovery programs.
- Browse the observatory's actor and action classifications, which keep assessment, financing, relief, and implementation records distinct.
- Explore the evidence briefs, recovery records and dated programme history.
- Open every listed primary publication from the site.
- Run an on-demand source check against each listed primary publication.
- Use the local API: `/api/health`, `/api/records`, `/api/sectors`, `/api/sources`, `/api/export.csv`, and `POST /api/refresh`.

## Data model

`data.js` is the maintainable local data layer. Each record keeps a publication date, source organization, headline measure, supporting detail, and direct primary-source link. `server.js` serves the site, exposes its data through local JSON endpoints, generates CSV exports, and runs source-availability / metadata checks on demand.

The site deliberately does not claim live implementation completion data, municipal damage registries, or real-time financial disbursement. Publishing governed project completion data would require an approved source list and a scheduled server-side ingestion process.

## Bilingual record guide and evidence stages

`record-guide.js` supplies Arabic reading titles and permanent IDs for all 170 records and a separate, conservative financing/delivery classification. Original record titles, source wording, values and links in `data.js` are retained. The frontend applies the guide equally to bundled and API-loaded records.

- Title keys are exact English record names; they must be updated deliberately if a record is renamed.
- `classification-reviews.js` records the 8 September 2026 source review of the remaining 154 records: 152 classified from 100 readable official sources, and 2 awaiting a readable copy of the same 29 November 2024 UNHCR report. Its 101 source entries include bilingual rationales, passage/page locators, original and alternative URLs, and direct/indexed/unavailable access status. Indexed access means official text was read through the search index, not that the original URL was live.
- A separately dated 9 September check adds CDR procurement 1259 as `rec-0170` / `src-102`: a pre-award water-services procurement, not a reported payment or completed repair. Earlier sources keep their original check dates. Totals are now 155 source-review outcomes across 102 source entries, plus 15 record-wording annotations.
- Each reviewed classification is bound to an exact snapshot of the record's source URL, date, scope and descriptive fields. Changed evidence fails closed and is visibly marked for re-review. The earlier 15 annotations retain their exact `funding` or `marker` guards and are labelled “Based on record wording”; they are not presented as newly reviewed primary sources.
- “Source does not state stage” is a reviewed source's silence on one axis; “Evidence / information only” covers assessments, research and monitoring instead of delivery. An unavailable source stays unknown, not “no activity.” Damage estimates, needs, appeals, budgets, approvals, signed commitments, disbursements and spending are separate financing categories. A signed financing contract is not a works contract award.
- Do not infer delivery from a publisher, category, planned activity, financing approval or procurement notice. Reported completion is not independent verification and does not establish spending or completion of an entire programme.
- For a new classification, read the relevant primary-source passage, record its locator and review date, bind it to the exact record snapshot, supply English and Arabic paraphrases, and test material distinctions. Never propagate one project's budget or an agency appeal to each subactivity. The classification check date is separate from the unchanged dataset review date; reported outcomes are not independent audits.

The overview shows the newest three publications from the existing source monitor, independent of its category filter. The library supports Arabic/English text search and separate financing and delivery filters. `observatory.css` contains the scoped readable-layout rules; the earlier typography and number-isolation rules remain in effect.

Run `npm test` before `npm run build`. The build includes the guide and stylesheet in both hosted output and GitHub Pages output. Publishing remains a separate action.

## Shareable views, exports and LEAP history

`library-tools.js` owns the URL and CSV helpers. The library restores `q`, `type`, `period`, `area`, `finance`, `delivery`, `sort`, `lang` and `record` query parameters. Missing filters use defaults; invalid enumerations are rejected; malformed or unknown record links show a missing-record state. Explicit URL language takes precedence over the device preference. Search typing replaces the current history entry; other filter changes push an entry, and browser Back/Forward restores the view.

The `v` cache-version parameter is retained, but unrelated query parameters are not included in copied URLs. Clipboard denial exposes a selectable manual-copy field. Programme links clear record filters; record links open the single identified record.

Permanent `rec-0001` style identifiers are literal assignments in the `record-guide.js` reading registry. **Never renumber them or derive them from the current array order.** When renaming a record, update its registry key while preserving its ID; assign a new unused ID to a newly added record. Keep retired IDs reserved. The existing 169 records keep their original source data; source reviews add separate editorial metadata.

The library intentionally omits the matching-results sentence, language explanation, sort selector, and view-copy/download/clear-filter toolbar. Search, category/period/coverage/stage filters and per-record links remain. Existing alphabetical links still work; legacy `sort=scale` links fall back to latest first because headline measures mix money, people and other units. This applies to the frontend and API.

The retained CSV helper serializes `visibleRecords` with bilingual titles and notes, classification provenance, source links and original quantities. It preserves the UTF-8 BOM and formula-injection safeguards but has no visible download button. The legacy `/api/export.csv` endpoint remains available with its existing parameters; it does not implement the newer stage/coverage/Arabic-title filters.

`programme-data.js` defines eight selected LEAP history entries (six library records and two additional sources). It is an editorial source chronology, not a live status feed or a count of separate projects. Dates identify publication or register dates, preserve month-only precision, and distinguish the approval announcement from the underlying decision. The history retains the dataset review date and does not certify awards, disbursements, expenditure or programme completion. Add later events only with dated source evidence and stable event IDs.

API collections must contain the bundled editorial entries before replacing them; matching review dates alone do not establish freshness. Live availability metadata may change independently. The local preview serves only public site files and assets, not workspace research, Git metadata or notes. Mobile navigation supports Escape, an expanded-state label, and an inactive off-screen menu. The narrow-screen library resets desktop flex bases to prevent oversized search and filter controls.

The retained geographic API is not used by the current visible site. Its ArcGIS boundary calls failed during the 9 September validation. These endpoints now return an explicit 503 source-unavailable response on failure rather than a generic 500 or fabricated empty geography. No substitute geography has been introduced.

## Refresh source metadata

The site includes a small, dependency-free Python collector that checks selected primary institutional pages and writes title, description, publication metadata, HTTP status and check time to `data/source-snapshots.json`.

```powershell
python scripts/scrape_official_sources.py
```

This does not copy article bodies or treat page availability as implementation evidence. The generated snapshot is used only to show source-monitoring detail in the website.
