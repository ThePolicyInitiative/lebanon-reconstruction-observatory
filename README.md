# Rebuild Lebanon Observatory

A local public-data web application for reviewing Lebanon reconstruction and recovery context.

## Run locally

Run the bundled application server:

```powershell
node server.js
```

Then open `http://127.0.0.1:4173`.

## What works

- Search, filter, sort, and compare a curated source-record library by 2024 and 2026 response period.
- Explore a source-linked actor and action registry that follows the selected response period.
- Download exactly the filtered records displayed in the library as a bilingual UTF-8 CSV.
- Copy a library view with its search, filters, sort and language, or share a permanent record link.
- Follow the selected LEAP source history at `#leap-history`, linked from the dossier and its library records.
- Browse the 10 RDNA sectors and source-linked recovery programs.
- Browse the observatory's actor and action classifications, which keep assessment, financing, relief, and implementation records distinct.
- Switch qualitative map context and explore governorate notes.
- Open every listed primary publication from the site.
- Run an on-demand source check against each listed primary publication.
- Use the local API: `/api/health`, `/api/records`, `/api/sectors`, `/api/sources`, `/api/export.csv`, and `POST /api/refresh`.

## Data model

`data.js` is the maintainable local data layer. Each record keeps a publication date, source organization, headline measure, supporting detail, and direct primary-source link. `server.js` serves the site, exposes its data through local JSON endpoints, generates CSV exports, and runs source-availability / metadata checks on demand.

The site deliberately does not claim live implementation completion data, municipal damage registries, or real-time financial disbursement. Publishing governed project completion data would require an approved source list and a scheduled server-side ingestion process.

## Bilingual record guide and evidence stages

`record-guide.js` supplies Arabic reading titles for the 169 existing records and a separate, conservative financing/delivery classification. Original record titles, source wording, values and links in `data.js` are retained. The frontend applies the guide equally to bundled and API-loaded records.

- Title keys are exact English record names; they must be updated deliberately if a record is renamed.
- `classification-reviews.js` records the 8 September 2026 source review of the remaining 154 records: 152 classified from 100 readable official sources, and 2 awaiting a readable copy of the same 29 November 2024 UNHCR report. Its 101 source entries include bilingual rationales, passage/page locators, original and alternative URLs, and direct/indexed/unavailable access status. Indexed access means official text was read through the search index, not that the original URL was live.
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

The visible download button serializes `visibleRecords` directly whether the API is connected or unavailable. It includes English and Arabic titles, both stage labels, classification basis, dataset review date, primary source and permanent record link. Appended columns retain the source-review status, separate check date, classification source, passage/page, access method and Arabic rationale. It preserves original amounts and units, adds a UTF-8 BOM, handles quoted/newline content, and neutralizes spreadsheet formula prefixes. Empty results produce headers only. The legacy `/api/export.csv` endpoint remains available for its existing parameters; it is not used for these UI exports and does not implement the new stage/coverage/Arabic-title filters.

`programme-data.js` defines seven selected LEAP history entries (five library records and two additional sources). It is an editorial source chronology, not a live status feed or a count of separate projects. Dates identify publication or register dates, preserve month-only precision, and distinguish the approval announcement from the underlying decision. The history retains the dataset review date and does not certify awards, disbursements, expenditure or programme completion. Add later events only with dated source evidence and stable event IDs.

## Refresh source metadata

The site includes a small, dependency-free Python collector that checks selected primary institutional pages and writes title, description, publication metadata, HTTP status and check time to `data/source-snapshots.json`.

```powershell
python scripts/scrape_official_sources.py
```

This does not copy article bodies or treat page availability as implementation evidence. The generated snapshot is used only to show source-monitoring detail in the website.
