/* Pure helpers shared by the interface and regression tests. No network or storage. */
(function (root) {
  const defaults = Object.freeze({ q:"", type:"All", period:"All", area:"All", finance:"All", delivery:"All", sort:"latest", lang:null, record:"" });
  const choices = Object.freeze({
    type:["All", "Assessment", "Financing", "Local recovery", "Evidence", "Municipal"],
    period:["All", "2024", "2026"], area:["All", "National", "South", "Beirut", "Bekaa"],
    finance:["All", "unknown", "not_stated", "not_applicable", "damage", "needs", "framework", "appeal", "announced", "budgeted", "approved", "committed", "disbursed", "spent"],
    delivery:["All", "unknown", "not_stated", "not_applicable", "planning", "procurement", "contracted", "in_progress", "reported_complete"],
    sort:["latest", "scale", "az"], lang:["ar", "en"]
  });
  function readState(search) {
    const params = new URLSearchParams(search);
    const state = { ...defaults };
    for (const [key, values] of Object.entries(choices)) {
      if (values.includes(params.get(key))) state[key] = params.get(key);
    }
    state.q = (params.get("q") || "").trim();
    const record = (params.get("record") || "").trim();
    state.record = record ? (/^rec-\d{4}$/.test(record) ? record : "invalid-record") : "";
    return state;
  }
  function viewUrl(base, state, hash) {
    const url = new URL(base);
    // Keep the asset version, but do not spread unrelated/tracking parameters
    // into shared links. Only the documented view-state fields are shared.
    const version = url.searchParams.get("v");
    url.search = "";
    if (version) url.searchParams.set("v", version);
    for (const key of Object.keys(defaults)) {
      url.searchParams.delete(key);
      const value = state[key];
      if (value !== undefined && value !== null && value !== "" && value !== defaults[key]) url.searchParams.set(key, String(value));
    }
    if (hash) url.hash = hash;
    return url.href;
  }
  function recordUrl(base, id, lang) {
    return viewUrl(base, { ...defaults, record:id, lang }, "#projects");
  }
  function csvCell(value) {
    // Spreadsheet apps can evaluate formulas after leading whitespace/control
    // characters. Quote every field and neutralise those prefixes, not just '='.
    const text = String(value ?? "");
    const safe = /^[\s\u0000-\u001f\u007f]*[=+\-@]/.test(text) ? "'" + text : text;
    return `"${safe.replaceAll('"', '""')}"`;
  }
  function recordsCsv(items, guide, base, reviewedAt) {
    const header = ["Record ID", "Record (original title)", "Arabic reading title", "Response period", "Type", "Publisher / partner", "Location / coverage", "Headline measure", "Supporting detail", "Publication date", "Financing stage", "Delivery stage", "Classification basis", "Classification note", "Dataset reviewed at", "Primary source", "Record link", "Source review status", "Source checked at", "Classification source", "Source passage / page", "Source access method", "Classification note (Arabic)"];
    const rows = items.map(record => {
      const meta = guide.get(record);
      return [meta.id || "", record.name, meta.titleAr || "", record.period, record.filter, record.status, record.place, record.funding, record.marker, record.date,
        guide.stages.finance[meta.finance][0], guide.stages.delivery[meta.delivery][0], meta.basis?.text || "", meta.note?.[0] || "No stage assigned in this index; this does not mean no activity occurred.",
        reviewedAt, record.href, meta.id ? recordUrl(base, meta.id, "en") : "",
        meta.review?.status || "not_reviewed", meta.review?.checkedAt || "", meta.review?.sourceUrl || "", meta.review?.locator?.[0] || "", meta.review?.access || "", meta.note?.[1] || ""];
    });
    // UTF-8 BOM preserves Arabic in common spreadsheet applications.
    return "\uFEFF" + [header, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  }
  const api = Object.freeze({ defaults, choices, readState, viewUrl, recordUrl, csvCell, recordsCsv });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ObservatoryLibrary = api;
})(typeof window !== "undefined" ? window : globalThis);
