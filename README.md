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
- Export the currently visible records as server-generated CSV.
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
- Stage annotations apply only when their quoted `funding` or `marker` evidence exactly matches the record. Changed wording falls back to “Not documented in this index.”
- That fallback means an index classification is missing, not that no activity took place. The UI explains this distinction.
- Do not infer delivery from a publisher, category, planned activity, financing approval or procurement notice. Reported completion is not independent verification and does not establish spending or completion of an entire programme.
- For a new annotation, check the primary source, retain the exact supporting wording, supply both English and Arabic notes, and add a regression test where appropriate. The existing review date is not changed by presentation edits.

The overview shows the newest three publications from the existing source monitor, independent of its category filter. The library supports Arabic/English text search and separate financing and delivery filters. `observatory.css` contains the scoped readable-layout rules; the earlier typography and number-isolation rules remain in effect.

Run `npm test` before `npm run build`. The build includes the guide and stylesheet in both hosted output and GitHub Pages output. Publishing remains a separate action.

## Refresh source metadata

The site includes a small, dependency-free Python collector that checks selected primary institutional pages and writes title, description, publication metadata, HTTP status and check time to `data/source-snapshots.json`.

```powershell
python scripts/scrape_official_sources.py
```

This does not copy article bodies or treat page availability as implementation evidence. The generated snapshot is used only to show source-monitoring detail in the website.
