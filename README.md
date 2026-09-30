# Rebuild Lebanon Observatory

A local public-data web application for reviewing Lebanon reconstruction and recovery context.

<!-- data-summary:start -->
## Current library snapshot

Generated from the editorial registries by npm run data:summary and npm run build.

- 193 source records and 177 registered source entries (entries can share a URL).
- 177 source-reviewed records, 14 record-wording annotations, and 2 records awaiting readable sources.
- Latest individual editorial review: 2026-09-30. The baseline dataset review remains 7 Sep 2026.
- 3 selected programme histories; 15 events in the LEAP history.
- 7 dated deadline observations, including past dates. These are not live procurement statuses.
<!-- data-summary:end -->

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

`record-guide.js` supplies Arabic reading titles and permanent IDs for all records and a separate, conservative financing/delivery classification. Original record titles, source wording, values and links in `data.js` are retained. The frontend applies the guide equally to bundled and API-loaded records.

- Title keys are exact English record names; they must be updated deliberately if a record is renamed.
- `classification-reviews.js` records the 8 September 2026 source review of the remaining 154 records: 152 classified from 100 readable official sources, and 2 awaiting a readable copy of the same 29 November 2024 UNHCR report. Its 101 source entries include bilingual rationales, passage/page locators, original and alternative URLs, and direct/indexed/unavailable access status. Indexed access means official text was read through the search index, not that the original URL was live.
- Separately dated reviews preserve earlier check dates. As of 28 September there are 172 source-review outcomes across 119 review-source entries (170 reviewed records and 2 inaccessible-source outcomes), plus 14 record-wording annotations. The public register contains 170 source entries, some sharing a URL.
- The 18 September additions are `rec-0181` (Anera WASH programme, planned delivery), `rec-0182` (ICRC and South Lebanon Water Establishment monitoring centre, reported facility completion), and `rec-0183` (UNIFIL equipment donation to the ISF, reported handover). All three keep financing at “Source does not state stage.” The UNIFIL text was reviewed through the official search index; the other two pages were read directly. Publication dates remain 15, 11 and 9 September respectively. The baseline dataset review date remains 7 September; availability checks and individual editorial reviews have their own dates.
- The 28 September refresh adds `rec-0184` (29 LEAP ambulances) and `rec-0185` (30,000 OGERO wireless devices), both pre-award procurement with financing stage unstated, plus `rec-0186` (€505M EU support adopted for 2026–2027 within the existing €1B package), classified as approved financing and planned delivery. It updates the MRI notice review and timeline with the 22 September extension to 15 October, retains the original 9 September publication date, and adds the 23 September Lebanon/EU/UNDP policy dialogue to the source-linked news feed. At that review, three deadline cards showed 12, 15 and 19 October, all noon Beirut time. The current shared register also includes the later school notices. Older historical checks keep their original dates.
- Each reviewed classification is bound to an exact snapshot of the record's source URL, date, scope and descriptive fields. Changed evidence fails closed and is visibly marked for re-review. The earlier 15 annotations retain their exact `funding` or `marker` guards and are labelled “Based on record wording”; they are not presented as newly reviewed primary sources.
- “Source does not state stage” is a reviewed source's silence on one axis; “Evidence / information only” covers assessments, research and monitoring instead of delivery. An unavailable source stays unknown, not “no activity.” Damage estimates, needs, appeals, budgets, approvals, signed commitments, disbursements and spending are separate financing categories. A signed financing contract is not a works contract award.
- Do not infer delivery from a publisher, category, planned activity, financing approval or procurement notice. Reported completion is not independent verification and does not establish spending or completion of an entire programme.
- For a new classification, read the relevant primary-source passage, record its locator and review date, bind it to the exact record snapshot, supply English and Arabic paraphrases, and test material distinctions. Never propagate one project's budget or an agency appeal to each subactivity. The classification check date is separate from the unchanged dataset review date; reported outcomes are not independent audits.

The overview shows the newest three publications from the existing source monitor, independent of its category filter. The library supports Arabic/English text search and separate financing and delivery filters. `styles.css` owns the consolidated layout, typography and RTL rules. Earlier overlapping stylesheets and obsolete table-row selectors have been retired.

Run `npm test` before `npm run build`. The build includes the guide and stylesheet in both hosted output and GitHub Pages output. Publishing remains a separate action.

## Shareable views, exports and LEAP history

`library-tools.js` owns the URL and CSV helpers. The library restores `q`, `type`, `period`, `area`, `finance`, `delivery`, `sort`, `lang` and `record` query parameters. Missing filters use defaults; invalid enumerations are rejected; malformed or unknown record links show a missing-record state. Explicit URL language takes precedence over the device preference. Search typing replaces the current history entry; other filter changes push an entry, and browser Back/Forward restores the view.

The `v` cache-version parameter is retained, but unrelated query parameters are not included in copied URLs. Clipboard denial exposes a selectable manual-copy field. Programme links clear record filters; record links open the single identified record.

Permanent `rec-0001` style identifiers are literal assignments in the `record-guide.js` reading registry. **Never renumber them or derive them from the current array order.** When renaming a record, update its registry key while preserving its ID; assign a new unused ID to a newly added record. Keep retired IDs reserved. Source reviews add separate editorial metadata; an availability refresh does not rewrite record evidence.

The library intentionally omits the matching-results sentence, language explanation, sort selector, and view-copy/download/clear-filter toolbar. Search, category/period/coverage/stage filters and per-record links remain. Existing alphabetical links still work; legacy `sort=scale` links fall back to latest first because headline measures mix money, people and other units. This applies to the frontend and API.

The retained CSV helper serializes `visibleRecords` with bilingual titles and notes, classification provenance, source links and original quantities. It preserves the UTF-8 BOM and formula-injection safeguards but has no visible download button. The legacy `/api/export.csv` endpoint remains available with its existing parameters; it does not implement the newer stage/coverage/Arabic-title filters.

`programme-data.js` defines selected histories for LEAP, the 2026 Lebanon Response Plan and UNICEF’s 2024 emergency response. The LEAP history includes the two school-procurement batches. Current event counts are generated in the snapshot above. The 11 September 2026 public-building procurement addendum is a separate event linked to the existing `rec-0005`; its deadline was checked against CDR on 18 September. It is an editorial source chronology, not a live status feed or a count of separate projects. Dates identify publication or register dates, preserve month-only precision, and distinguish the approval announcement from the underlying decision. The history retains the dataset review date and does not certify awards, disbursements, expenditure or programme completion. Add later events only with dated source evidence and stable event IDs.

## Reading material and programme histories

`page-insights.js` adds bilingual, source-linked reading sections to the original ten pages, styled in `styles.css`: evidence routes on the overview; four service cases; three partnership examples; a ten-sector reading table; eight library collections; seven financing examples; six LEAP procurement scopes; chronology guidance; the shared deadline register; and review coverage with source FAQs. The library collections, stage guide and comparison appear below the results. Records render in batches of 20; filters reset the batch, language changes retain the loaded count and expanded details, and record permalinks remain direct. The export helper still receives the entire filtered set. Tables scroll within their containers on small screens.

The additional reading tools include a comparison of any two records, delivery and financing record-count breakdowns by response period, four question-based library links, six organisational reading examples, three assessment scopes, a LEAP document desk, a procurement-date explainer, the latest four publication months represented in the library, and an eight-term evidence glossary. The comparison preserves original headline measures and distinct classification axes; it does not add quantities or infer a before-and-after relationship. The period breakdown uses the existing response tag, not the publication year. Its bars show counts of records, never recovery progress or money. Zero is a statement about the current library, not a finding that activity or financing is absent.

Reading-tool choices stay in memory for the current page session. Language changes retain selected periods, compared records and open reading sections. Availability-snapshot loading only updates the sources section. The publication digest displays up to three records per month, ordered by publication date, and identifies its limited library scope.

The module uses stable record IDs and the existing record guide for titles, review rationales and stages. Links open a single record or an explicitly filtered view and discard unrelated filters. Counts describe records or selected events, never unique projects or a recovery rate. The sources page reads the saved availability snapshot and deduplicates registered URLs; unavailable checks are not evidence that a publication was withdrawn. `deadline-data.js` is the shared register used by library details, histories and the source monitor. Each observation keeps its checked date, source snapshot, time zone, optional time and amendment. School notices do not invent a submission time. Date-passed labels use the Beirut calendar; they never imply an award. Changed record evidence visibly requires re-review. Deadline checks are historical observations and must be reconfirmed with the publishing authority.

The script and stylesheet are included in the local server allowlist and the two static build outputs. `scripts/test-page-insights.js` covers all ten mounts, both languages, stable links, date distinctions, finance classifications, source-check handling, HTML escaping, exact period counts, comparison state, publication grouping and control updates through locale changes.

API collections must contain the bundled editorial entries before replacing them; matching review dates alone do not establish freshness. Live availability metadata may change independently. The local preview serves only public site files and assets, not workspace research, Git metadata or notes. Mobile navigation supports Escape, an expanded-state label, and an inactive off-screen menu. The narrow-screen library resets desktop flex bases to prevent oversized search and filter controls.

The retained geographic API is not used by the current visible site. Its ArcGIS boundary calls failed during the 9 September validation. These endpoints now return an explicit 503 source-unavailable response on failure rather than a generic 500 or fabricated empty geography. No substitute geography has been introduced.

## Refresh source metadata

The site includes a small, dependency-free Python collector that checks the public source register and a core diagnostic subset and writes title, description, publication metadata, HTTP status and check time to `data/source-snapshots.json`.

```powershell
python scripts/scrape_official_sources.py
```

A manual run saves the current check times. A run with `--only-if-changed` retains the saved snapshot when only request timings change. If no page is reachable, the collector exits with failure and preserves the previous snapshot. Writes are atomic.

This does not copy article bodies or treat page availability as implementation evidence. The generated snapshot is used only to show source-monitoring detail in the website.

## GitHub automation

`.github/workflows/daily-news.yml` runs a substantive source review every six hours at **00:00, 06:00, 12:00 and 18:00 Asia/Beirut**, including daylight-saving changes, and supports **Run workflow** in GitHub Actions. It searches new primary publications and amendments, deduplicates existing entries, and updates English/Arabic news, records, classifications, histories and deadlines only for supported material changes. The editorial instructions are in `.github/prompts/daily-news.md`.

**One-time setup:** add an OpenRouter API key as the repository Actions secret `OPENROUTER_API_KEY` under **Settings → Secrets and variables → Actions**. An OpenRouter key already saved under the older `OPENAI_API_KEY` name also works; the dedicated OpenRouter secret takes precedence. The workflow checks the `sk-or-` prefix before sending a credential to OpenRouter. Research uses OpenRouter's `/api/v1/chat/completions` endpoint with hosted search; the editing agent uses `/api/v1/responses`. Both use `openai/gpt-5.6-sol` by default. Set the repository variable `OPENROUTER_MODEL` to select another compatible model. Usage is charged to the OpenRouter account and needs available credits. Missing or invalid credentials, insufficient balance, or failed source review fail the run visibly without publishing anything. GitHub schedules are best effort, so runs may start after their scheduled times.

Research runs without GitHub write credentials. The action wrapper generates the editorial patch directly from Git after the agent finishes, avoiding model-generated patch formatting errors. A fresh job checks the allowed editorial files, runs regressions and rebuilds both public copies. Only a successful changed result reaches a separate publishing job. Newer conflicting edits cause a failure rather than an overwrite; unchanged reviews make no commit and do not advance review dates. Source links and review coverage are retained in the run summary. This is an automated editorial review, not independent verification of a publisher's claims.

`scripts/collect_daily_news.py` explicitly enables OpenRouter's hosted web-search and page-fetch tools for five source groups, then passes dated evidence to the editing agent. The editing stage retains its restricted filesystem/network permissions. Incomplete research cannot be reported as an unchanged review. The source report is retained as a seven-day Actions artifact; it is not added to the public site.

The workflow checks out an exact Codex action revision and applies the stream-lifecycle correction described in [upstream PR 151](https://github.com/openai/codex-action/pull/151). For shutdowns that still stall, it recovers a complete JSON report only after the final-response file or final standard-output report has remained stable for 30 seconds. The separate validation job still checks every recovered result before publication. The patch verifies the original bundle's SHA-256 and preserves the action's privilege and sandbox protections. Regression tests cover lingering output pipes, recovery, incomplete reports and nonzero exit codes. The review job has a 25-minute limit; composite-action step timeouts are not relied upon.

`.github/workflows/pages.yml` deploys the committed `docs/` output after normal pushes and successful automation runs, including bot commits that do not trigger ordinary push workflows. It skips deployment when served content is unchanged. GitHub Pages must use **GitHub Actions** as its build source. Only this repository's Pages site is deployed by GitHub; the separate Codex desktop monitor handles the existing Sites data service.

`.github/workflows/source-monitor.yml` runs the same public-source metadata check hourly (and can be started manually from the Actions tab). It runs `--only-if-changed`, validates and rebuilds the site, then commits the snapshot and both served copies (`docs/data/` and `dist/client/data/`) together when page metadata, monitored URLs or availability changes. Recorded check times refer to the last saved run, rather than every unchanged hourly attempt. Python collector regressions run alongside the application suite. It deliberately does not alter editorial recovery records, financing classifications, or published claims: those require a reviewed source and an explicit repository change.

## Interface modules

`locale.js` owns the bilingual dictionary, attribute translation (including image alt text) and numeric isolation. `library-view.js` owns filtering, compact record cards, incremental rendering and source histories. `app.js` connects application state, navigation and the other views. Classic scripts load in dependency order through `index.html`; the same assets are allowlisted by the server and copied by the build.

The skip link and page navigation focus the visible heading. Navigation uses links and labelled sections; off-screen mobile navigation stays inert. Static accessibility labels and image descriptions round-trip between English and Arabic.

Programme history links use `?programme=lrp-2026#programme-history` (or `unicef-2024` / `leap`) and retain the language. Related links clear record filters. These are selected source chronologies, not a project census or an inferred stage progression.
