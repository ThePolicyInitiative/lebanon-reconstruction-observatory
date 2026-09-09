const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const seed = require("../data.js");
const localeCode = source.slice(source.indexOf("const arabicText ="), source.indexOf("const mapTopics ="));

function functionCode(name) {
  return extractFunction(source, name);
}

function extractFunction(code, name) {
  const start = code.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1, `Missing function ${name}`);
  return code.slice(start, code.indexOf("\n}", start) + 2);
}

test("equal-date or newer API responses cannot silently remove or rewrite bundled entries", async () => {
  const context = dataContext(seed.reviewedAt);
  for (const collection of ["records", "sources", "news", "sectors"]) {
    context.collection = collection;
    for (const reviewedAt of [seed.reviewedAt, "9 Sep 2026"]) {
      for (const invalid of [undefined, null, {}, [], seed[collection].slice(1), [null, ...seed[collection]]]) {
        context.payload = { reviewedAt, [collection]:invalid };
        assert.equal(vm.runInContext("isCurrentDataset(payload, seedData.reviewedAt, collection)", context), false, collection);
      }
      context.payload = { reviewedAt, [collection]:seed[collection].map((item, index) => index ? item : {...item, [Object.keys(item)[0]]:"Changed"}) };
      assert.equal(vm.runInContext("isCurrentDataset(payload, seedData.reviewedAt, collection)", context), false);
      context.payload = { reviewedAt, [collection]:seed[collection].map(item => ({...item, check:{state:"reachable"}})).reverse() };
      assert.equal(vm.runInContext("isCurrentDataset(payload, seedData.reviewedAt, collection)", context), true, "Availability metadata and ordering may change");
    }
  }
  context.fetch = async url => ({ok:true, json:async () => url === "/api/records"
    ? {reviewedAt:seed.reviewedAt, records:seed.records.slice(1)}
    : url === "/api/news" ? {reviewedAt:seed.reviewedAt, news:seed.news.slice(1)}
    : url === "/api/sources" ? {reviewedAt:seed.reviewedAt, sources:seed.sources}
    : {reviewedAt:seed.reviewedAt, sectors:seed.sectors}});
  await vm.runInContext("Promise.all([loadApplicationData(), loadNews()])", context);
  assert.equal(context.apiAvailable, false);
  assert.equal(context.records.length, seed.records.length);
  assert.equal(context.news.length, seed.news.length);
});

test("legacy scale ordering cannot rank money, people and other units together", () => {
  assert.equal(libraryTools.readState("?sort=scale").sort, "latest");
  for (const filename of ["app.js", "server.js", "worker/site-worker.js"]) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, filename), "utf8"), /(?:direction|sort) === "scale"/);
  }
});

test("all records, sources, updates and static anchors resolve without duplicate identifiers", () => {
  for (const collection of [seed.sources, seed.news]) assert.equal(new Set(collection.map(item => item.id)).size, collection.length);
  const sourceIds = new Set(seed.sources.map(item => item.id));
  for (const record of seed.records) {
    assert.ok(sourceIds.has(record.sourceId), record.name);
    assert.match(record.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(record.date)), record.name);
    assert.ok(guide.get(record).id, record.name);
  }
  for (const collection of [seed.records, seed.sources, seed.news, seed.actors, seed.actions]) {
    for (const item of collection) assert.equal(new URL(item.href).protocol, "https:", item.href);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), match[1]);
  for (const match of html.matchAll(/(?:src|href)="((?:assets\/|[\w-]+\.(?:js|css))[^"?]*)(?:\?[^"]*)?"/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
  }
});

test("all monitored update titles and summaries have Arabic translations", () => {
  const context = recordContext("ar");
  for (const item of seed.news) for (const field of ["title", "summary", "category"]) {
    context.input = item[field];
    assert.match(vm.runInContext("translatedText(input)", context), /[\u0600-\u06ff]/, `${item.id}: ${field}`);
  }
});

test("financing overview and dossier use approval language, never imply payment from approval", () => {
  assert.doesNotMatch(html, /AVAILABLE STARTING FINANCE|LEAP FINANCE AVAILABLE|FINANCING AVAILABLE|funds available for a defined purpose/);
  const context = recordContext("ar");
  for (const text of ["03 · APPROVED INITIAL FINANCE", "04 · LEAP FINANCE APPROVED", "FINANCING APPROVED", "Approval authorises financing for a defined purpose; it does not establish a signed agreement, payment or expenditure."]) {
    assert.ok(html.includes(text));
    context.input = text;
    assert.match(vm.runInContext("translatedText(input)", context), /[\u0600-\u06ff]/);
  }
});

test("navigation state makes the off-screen mobile menu inactive and supports focus return", () => {
  const context = recordContext("ar");
  let mobile = true, open = false, focused = false;
  const attrs = {};
  const sidebar = {classList:{toggle:(_name, value) => {open=value;}}};
  const button = {setAttribute:(name,value)=>{attrs[name]=value;}, focus:()=>{focused=true;}};
  context.document.querySelector = selector => selector === ".sidebar" ? sidebar : selector === ".menu-button" ? button : null;
  context.window.matchMedia = () => ({matches:mobile});
  vm.runInContext("setNavigationOpen(false)", context);
  assert.equal(sidebar.inert, true);
  assert.equal(attrs["aria-expanded"], "false");
  vm.runInContext("setNavigationOpen(true)", context);
  assert.equal(open, true);
  assert.equal(sidebar.inert, false);
  assert.equal(attrs["aria-expanded"], "true");
  assert.equal(attrs["aria-label"], "إغلاق التنقل");
  vm.runInContext("setNavigationOpen(false, true)", context);
  assert.equal(focused, true);
  mobile = false;
  vm.runInContext("setNavigationOpen(false)", context);
  assert.equal(sidebar.inert, false);
  assert.match(html, /aria-controls="siteNavigation" aria-expanded="false"/);
});

test("local preview does not expose research, notes or Git metadata", async () => {
  const serverCode = fs.readFileSync(path.join(root, "server.js"), "utf8");
  let reads = 0, status;
  const context = vm.createContext({ROOT:root,path,fs:{readFile:async ()=>{reads++;return "public";}},mimeTypes:{".html":"text/html"},sendText:(_response,code)=>{status=code;}});
  vm.runInContext(extractFunction(serverCode, "serveStatic"), context);
  context.response={writeHead:code=>{status=code;},end(){}};
  for (const pathname of ["/.git/config", "/review_work/private.md", "/outputs/private.json", "/server.js", "/README.md", "/../outside.txt"]) {
    context.pathname=pathname;
    await vm.runInContext("serveStatic(response, pathname)", context);
    assert.ok([403,404].includes(status), pathname);
  }
  assert.equal(reads, 0);
  for (const pathname of ["/", "/app.js", "/assets/images/un-debris-recovery.jpg", "/data/source-snapshots.json"]) {
    context.pathname=pathname;
    await vm.runInContext("serveStatic(response, pathname)", context);
    assert.equal(status, 200, pathname);
  }
  assert.equal(reads, 4);
});

test("local and hosted CSV endpoints neutralise whitespace-prefixed formulas", () => {
  for (const filename of ["server.js", "worker/site-worker.js"]) {
    const context = vm.createContext({});
    vm.runInContext(extractFunction(fs.readFileSync(path.join(root, filename), "utf8"), "csvValue"), context);
    for (const value of ["=1+1", " +SUM(A1)", "\t@command", "\r\n-1+2"]) {
      context.input=value;
      assert.equal(parseCsv(vm.runInContext("csvValue(input)", context) + "\r\n")[0][0], "'" + value);
    }
  }
});

test("unavailable boundary services return an explicit error, never empty or invented geography", async () => {
  for (const [filename, name, expression] of [["server.js", "sendBoundaryData", "sendBoundaryData({}, loader)"], ["worker/site-worker.js", "boundaryResponse", "boundaryResponse(loader)"]]) {
    const context = vm.createContext({sendJson:(_response,status,body)=>({status,body}),json:(body,status=200)=>({status,body})});
    vm.runInContext(extractFunction(fs.readFileSync(path.join(root, filename), "utf8"), name), context);
    context.loader = async () => {throw new Error("Unavailable upstream");};
    const failed = await vm.runInContext(expression, context);
    assert.equal(failed.status, 503);
    assert.equal(failed.body.sourceUnavailable, true);
    assert.equal(failed.body.features, undefined);
    const data = {data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[]}}]}};
    context.loader = async () => data;
    assert.equal((await vm.runInContext(expression, context)).body, data);
  }
});

test("font request uses valid Playfair weight axes and versioned assets", () => {
  assert.match(html, /Playfair\+Display:wght@600;700/);
  assert.doesNotMatch(html, /Playfair\+Display:ital,wght@600;700/);
  for (const asset of ["styles.css", "clarity.css"]) {
    assert.ok(html.includes(`${asset}?v=numbers-20260907`));
  }
  for (const asset of ["data.js", "programme-data.js", "classification-reviews.js", "record-guide.js", "library-tools.js", "app.js", "observatory.css"]) {
    assert.ok(html.includes(`${asset}?v=current-20260909`));
  }
  assert.ok(html.indexOf('src="classification-reviews.js') < html.indexOf('src="record-guide.js'));
  assert.ok(html.indexOf('src="record-guide.js') < html.indexOf('src="app.js'));
});

test("static translations and arrows round-trip without corrupting state-driven controls", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(localeCode, context);
  const node = { nodeValue: "Availability is not proof of delivery.", parentElement: { closest: () => null } };
  context.node = node;
  vm.runInContext("localizeTextNode(node)", context);
  assert.equal(node.nodeValue, "إتاحة المصدر ليست دليلاً على التنفيذ.");
  vm.runInContext('activeLocale="en"; localizeTextNode(node)', context);
  assert.equal(node.nodeValue, "Availability is not proof of delivery.");
  node.nodeValue = "↗";
  context.arrow = { nodeValue: "↗", parentElement: { closest: () => null } };
  vm.runInContext('activeLocale="ar"; localizeTextNode(arrow); localizeTextNode(arrow)', context);
  assert.equal(context.arrow.nodeValue, "↖");
  vm.runInContext('activeLocale="en"; localizeTextNode(arrow)', context);
  assert.equal(context.arrow.nodeValue, "↗");
  context.control = { nodeValue: "English", parentElement: { closest: () => ({}) } };
  vm.runInContext('activeLocale="ar"; localizeTextNode(control)', context);
  context.control.nodeValue = "العربية";
  vm.runInContext('activeLocale="en"; localizeTextNode(control)', context);
  assert.equal(context.control.nodeValue, "العربية");
});

test("attribute translation preserves canonical placeholders and skips locale controls", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(localeCode, context);
  const original = "Search an actor, action, location, stage or source";
  const attrs = { placeholder: original };
  const field = {
    closest: () => null,
    hasAttribute: name => name in attrs,
    getAttribute: name => attrs[name],
    setAttribute: (name, value) => { attrs[name] = value; }
  };
  context.root = { querySelectorAll: () => [field] };
  vm.runInContext("localizeAttributes(root)", context);
  assert.equal(attrs.placeholder, "ابحث عن جهة فاعلة أو إجراء أو موقع أو مرحلة أو مصدر");
  vm.runInContext('activeLocale="en"; localizeAttributes(root)', context);
  assert.equal(attrs.placeholder, original);
  field.closest = () => ({});
  attrs.placeholder = "Managed by locale state";
  vm.runInContext('activeLocale="ar"; localizeAttributes(root)', context);
  assert.equal(attrs.placeholder, "Managed by locale state");
});

test("Arabic quantities keep English digits, separators, units and LTR order", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(localeCode, context);
  const cases = [
    ["$250M", "$250M"], ["$3–5B", "$3–5B"], ["$365M+", "$365M+"],
    ["64K+", "64K+"], ["٦٤٬٠٠٠+", "64,000+"], ["۲۵٫۵٪", "25.5%"],
    ["3.1M m³", "3.1M\u00a0m³"], ["648,942 m³", "648,942\u00a0m³"],
    ["US$ millions", "US$\u00a0millions"], ["18–24", "18–24"],
    ["2023–2024", "2023–2024"], ["14:05", "14:05"], ["18/18", "18/18"]
  ];
  for (const [input, expected] of cases) {
    context.input = input;
    const result = vm.runInContext("formatArabicNumbers(input)", context);
    assert.equal(result, `\u2066${expected}\u2069`, input);
    context.input = result;
    assert.equal(vm.runInContext("formatArabicNumbers(input)", context), result, "Formatting is idempotent");
  }
});

test("Arabic financial translations preserve every English currency amount", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(localeCode, context);
  const entries = vm.runInContext("Object.entries(arabicText)", context);
  for (const [english, arabic] of entries) {
    const amounts = english.match(/\$\d+(?:[.,]\d+)*(?:–\d+)?[KMB]?/g) || [];
    for (const amount of amounts) assert.ok(arabic.includes(amount), `${amount} missing from: ${arabic}`);
  }
});

test("numeric text returns to its exact English source after repeated language changes", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(localeCode, context);
  const original = "  $6.8B in physical damage and $7.2B in economic losses.  ";
  context.node = { nodeValue: original, parentElement: { closest: () => null } };
  for (let pass = 0; pass < 3; pass += 1) {
    vm.runInContext('activeLocale="ar"; localizeTextNode(node)', context);
    assert.ok(context.node.nodeValue.includes("\u2066$6.8B\u2069"));
    vm.runInContext('activeLocale="en"; localizeTextNode(node)', context);
    assert.equal(context.node.nodeValue, original);
  }
});

test("Arabic dates and availability-check times use Latin digits", () => {
  const context = vm.createContext({ activeLocale: "ar" });
  vm.runInContext(["formatNewsDate", "formatCheckedAt"].map(functionCode).join("\n"), context);
  for (const expression of ['formatNewsDate("2026-09-07")', 'formatCheckedAt("2026-09-07T14:05:00Z")']) {
    const result = vm.runInContext(expression, context);
    assert.doesNotMatch(result, /[٠-٩۰-۹]/);
    assert.match(result, /2026/);
  }
});

function dataContext(date) {
  const payloads = {
    "/api/records": { records: seed.records, reviewedAt: date },
    "/api/sectors": { sectors: seed.sectors, reviewedAt: date },
    "/api/sources": { sources: date === seed.reviewedAt ? seed.sources : seed.sources.slice(2), reviewedAt: date },
    "/api/health": { recordCount: seed.records.length, reviewedAt: date },
    "/api/news": { news: date === seed.reviewedAt ? seed.news : seed.news.slice(2), reviewedAt: date }
  };
  const context = vm.createContext({
    seedData: seed, currentReviewedAt: seed.reviewedAt, activeLocale: "en", apiAvailable: false,
    records: seed.records, sectors: seed.sectors, sources: seed.sources, news: seed.news,
    latestNewsPayload: null, newsStatusKind: "ready", sourceReview: null,
    fetch: async url => ({ ok: true, json: async () => payloads[url] }), apiUrl: url => url,
    renderSectors() {}, renderSources() {}, renderPeriodComparison() {}, renderAftermathBoard() {},
    renderAftermathDetails() {}, renderRecords() {}, renderNews() {}, renderNewsStatus() {}
  });
  vm.runInContext(["isCurrentDataset", "loadApplicationData", "loadNews"].map(functionCode).join("\n"), context);
  return context;
}

test("older API data cannot remove published updates or source entries", async () => {
  const context = dataContext("31 Aug 2026");
  await vm.runInContext("loadApplicationData()", context);
  await vm.runInContext("loadNews()", context);
  assert.equal(context.news.length, seed.news.length);
  assert.equal(context.sources.length, seed.sources.length);
  assert.equal(context.news.filter(item => item.category === "Procurement").length, 3);
  assert.equal(context.apiAvailable, false);
  assert.equal(context.newsStatusKind, "stale");
});

test("current API data loads; absent and invalid review dates are rejected", async () => {
  const context = dataContext(seed.reviewedAt);
  await vm.runInContext("loadApplicationData()", context);
  await vm.runInContext("loadNews()", context);
  assert.equal(context.apiAvailable, true);
  assert.equal(context.news.length, seed.news.length);
  assert.equal(context.sources.length, seed.sources.length);
  assert.equal(vm.runInContext("isCurrentDataset({})", context), false);
  assert.equal(vm.runInContext('isCurrentDataset({reviewedAt:"unknown"})', context), false);
  assert.equal(vm.runInContext('isCurrentDataset({reviewedAt:"8 Sep 2026"})', context), true);
});

const guide = require("../record-guide.js");
const classificationReviews = require("../classification-reviews.js");
const recordById = id => seed.records.find(record => guide.get(record).id === id);

test("source-reviewed records have explicit outcomes and individual review dates, including inaccessible evidence", () => {
  assert.equal(Object.keys(classificationReviews.records).length, 156);
  assert.equal(Object.keys(classificationReviews.sources).length, 103);
  assert.equal(classificationReviews.checkedAt, "2026-09-08");
  assert.equal(seed.reviewedAt, "7 Sep 2026", "Classification review does not redate the dataset");
  const counts = {};
  for (const [id, entry] of Object.entries(classificationReviews.records)) {
    const record = recordById(id);
    assert.ok(record, id);
    const meta = guide.get(record);
    const evidence = classificationReviews.sources[entry.source];
    counts[meta.review.status] = (counts[meta.review.status] || 0) + 1;
    assert.deepEqual(entry.snapshot, Object.fromEntries(Object.keys(entry.snapshot).map(key => [key, record[key]])));
    assert.equal(evidence.originalUrl, record.href);
    assert.equal(meta.review.checkedAt, evidence.checkedAt || classificationReviews.checkedAt);
    assert.equal(new URL(meta.review.sourceUrl).protocol, "https:");
    assert.ok(["direct", "indexed", "unavailable"].includes(meta.review.access));
    assert.match(meta.note[1], /[\u0600-\u06ff]/);
    assert.ok(Object.isFrozen(entry.snapshot));
    if (meta.review.status === "reviewed") {
      assert.notEqual(meta.finance, "unknown", id);
      assert.notEqual(meta.delivery, "unknown", id);
      assert.equal(meta.basis.field, "source_review");
      assert.ok(meta.review.locator[0]);
      assert.match(meta.review.locator[1], /[\u0600-\u06ff]/);
    } else {
      assert.equal(meta.review.status, "unavailable");
      assert.equal(meta.finance, "unknown");
      assert.equal(meta.delivery, "unknown");
      assert.equal(meta.basis, null);
      assert.equal(meta.review.locator, null);
      assert.ok(evidence.accessError);
    }
  }
  assert.deepEqual(counts, {reviewed:154, unavailable:2});
  assert.equal(seed.records.filter(record => guide.get(record).review.status === "record_only").length, 15);
});

test("source reviews fail closed on changed evidence, dates, URLs or scope, never by title keywords", () => {
  for (const [id, entry] of Object.entries(classificationReviews.records)) {
    const record = recordById(id);
    for (const field of Object.keys(entry.snapshot)) {
      const meta = guide.get({ ...record, [field]:"Changed after review" });
      assert.equal(meta.finance, "unknown", `${id}: ${field}`);
      assert.equal(meta.delivery, "unknown", `${id}: ${field}`);
      assert.equal(meta.basis, null);
      assert.notEqual(meta.review.status, "reviewed");
    }
  }
  const clone = guide.get({ ...recordById("rec-0011"), name:"New grant, completed delivery" });
  assert.equal(clone.finance, "unknown");
  assert.equal(clone.delivery, "unknown");
});

test("review judgments distinguish actual payments, signed commitments, planned work and evidence products", () => {
  const expected = {
    "rec-0011":["disbursed", "in_progress"],
    "rec-0021":["announced", "planning"],
    "rec-0022":["committed", "planning"],
    "rec-0016":["damage", "not_applicable"],
    "rec-0018":["not_applicable", "not_applicable"],
    "rec-0050":["not_stated", "in_progress"],
    "rec-0073":["disbursed", "in_progress"],
    "rec-0072":["not_stated", "planning"],
    "rec-0074":["announced", "planning"],
    "rec-0075":["not_stated", "reported_complete"],
    "rec-0094":["committed", "planning"],
    "rec-0112":["not_stated", "planning"],
    "rec-0129":["announced", "planning"],
    "rec-0138":["disbursed", "in_progress"],
    "rec-0139":["not_stated", "in_progress"],
    "rec-0145":["not_applicable", "not_applicable"],
    "rec-0063":["unknown", "unknown"],
    "rec-0064":["unknown", "unknown"],
    "rec-0170":["not_stated", "procurement"],
    "rec-0171":["not_stated", "reported_complete"]
  };
  for (const [id, stages] of Object.entries(expected)) {
    const meta = guide.get(recordById(id));
    assert.deepEqual([meta.finance, meta.delivery], stages, id);
  }
});

test("browser and CommonJS classification modules agree and missing review assets stay conservative", () => {
  const browser = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(root, "classification-reviews.js"), "utf8"), browser);
  vm.runInContext(fs.readFileSync(path.join(root, "record-guide.js"), "utf8"), browser);
  for (const record of seed.records) assert.equal(JSON.stringify(browser.ObservatoryRecordGuide.get(record)), JSON.stringify(guide.get(record)));
  const missing = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(root, "record-guide.js"), "utf8"), missing);
  assert.equal(missing.ObservatoryRecordGuide.get(recordById("rec-0011")).finance, "unknown");
});
const libraryTools = require("../library-tools.js");
const programmeData = require("../programme-data.js");

function recordContext(locale = "ar") {
  const context = vm.createContext({
    activeLocale:locale, recordGuide:guide, records:seed.records, seedData:seed, programmeData, libraryTools,
    activeFilter:"All", activePeriod:"All", activeRecordArea:"All",
    activeRecordFinance:"All", activeRecordDelivery:"All", activeRecordId:"", visibleRecords:[],
    document:{ querySelector:() => null, querySelectorAll:() => [] },
    window:{ location:{ href:"https://thepolicyinitiative.github.io/lebanon-reconstruction-observatory/?v=01b8bf9#projects", search:"?v=01b8bf9" } },
    periodLabels:{ All:"All records", "2024":"After 2024 war", "2026":"After 2026 war" },
    recordAreaLabels:{ All:"All coverage", South:"South & Nabatieh", Beirut:"Beirut & Mount Lebanon", Bekaa:"Bekaa & Baalbek-Hermel", National:"Nationwide or multi-area" },
    projectSearch:{value:""}, activeRecordSort:"latest", recordCount:{textContent:""},
    projectList:{innerHTML:""}, recordAreaFilter:{value:"All"},
    recordFinanceFilter:{innerHTML:"",value:"All",setAttribute() {}},
    recordDeliveryFilter:{innerHTML:"",value:"All",setAttribute() {}}
  });
  vm.runInContext(localeCode, context);
  const functions = ["escapeHtml", "recordTitle", "recordStageLabel", "localizedMarkup", "normalizeRecordSearch", "matchesRecordSearch", "renderRecordCard", "localizedRecordFilter", "localizedPeriodLabel", "periodLabel", "formatNewsDate", "sortRecords", "matchesRecordArea", "localizedAreaLabel", "renderRecords", "renderRecordStageControls", "recentUpdates", "renderLibraryLinkNotice", "currentLibraryState", "syncLibraryUrl", "syncLibraryControls", "restoreLibraryLocation", "clearLibraryFilters", "libraryControlChanged", "copyShareLink", "formatHistoryDate", "renderLeapHistory", "downloadRecords"];
  vm.runInContext([...functions, "recordReviewLabel", "setNavigationOpen"].map(functionCode).join("\n"), context);
  return context;
}

test("requested library toolbar and explanatory text are removed without removing core filters", () => {
  const library = html.slice(html.indexOf('id="projects"'), html.indexOf('id="funding"'));
  for (const removed of ["libraryFilterStatus", "library-language-note", "recordSort", "copyLibraryView", "resetLibraryFilters", "data-download", "library-share-controls", "library-subtoolbar", "Arabic reading titles accompany"]) {
    assert.ok(!library.includes(removed), removed);
  }
  for (const kept of ["projectSearch", "recordAreaFilter", "recordFinanceFilter", "recordDeliveryFilter", "recordCount", "libraryLinkNotice", "copyLinkFallback", "projectList"]) {
    assert.ok(library.includes(kept), kept);
  }
  assert.doesNotMatch(source, /recordSort|libraryFilterStatus|#copyLibraryView|#resetLibraryFilters/);
  const context = recordContext();
  context.languageToggle = {textContent:"", setAttribute() {}};
  context.document.documentElement = {};
  context.document.body = {classList:{toggle() {}}};
  context.projectSearch.setAttribute = () => {};
  vm.runInContext(functionCode("updateLocaleControls"), context);
  for (const locale of ["en", "ar", "en"]) {
    context.activeLocale = locale;
    vm.runInContext("updateLocaleControls(); renderRecords()", context);
    assert.equal(context.visibleRecords.length, seed.records.length);
    assert.equal(context.document.documentElement.dir, locale === "ar" ? "rtl" : "ltr");
    assert.equal(context.activeRecordSort, "latest");
  }
});

test("every source record has an Arabic reading title and a classification outcome without altering original data", () => {
  const before = JSON.stringify(seed);
  assert.equal(Object.keys(guide.titles).length, seed.records.length);
  for (const record of seed.records) {
    const metadata = guide.get(record);
    assert.match(metadata.titleAr, /[\u0600-\u06ff]/, record.name);
    assert.ok(["reviewed", "record_only", "unavailable"].includes(metadata.review.status), record.name);
    assert.ok(guide.stages.finance[metadata.finance]);
    assert.ok(guide.stages.delivery[metadata.delivery]);
  }
  assert.equal(JSON.stringify(seed), before);
});

test("stage annotations require exact recorded evidence; sector and publisher are never delivery stages", () => {
  for (const [name, annotation] of Object.entries(guide.annotations)) {
    const record = seed.records.find(item => item.name === name);
    assert.ok(record, name);
    assert.equal(record[annotation.field], annotation.evidence, name);
    assert.equal(guide.get(record).basis.text, annotation.evidence);
    const changed = guide.get({ ...record, [annotation.field]:"The evidence changed" });
    assert.equal(changed.finance, "unknown");
    assert.equal(changed.delivery, "unknown");
    assert.equal(changed.basis, null);
  }
  const synthetic = guide.get({ name:"Completed projects announced", filter:"Financing", status:"World Bank", funding:"$250M approved", marker:"planned completion; not completed" });
  assert.equal(synthetic.finance, "unknown");
  assert.equal(synthetic.delivery, "unknown");
});

test("needs, appeals, frameworks, announcements and approvals cannot become spent funds or completed delivery", () => {
  const expected = [
    ["Lebanon Rapid Damage & Needs Assessment (RDNA)", "needs", "unknown"],
    ["Lebanon Emergency Assistance Project (LEAP)", "approved", "unknown"],
    ["Lebanon Response Plan 2026", "appeal", "unknown"],
    ["Norway Additional Support for the Lebanese Armed Forces", "announced", "unknown"],
    ["LEAP Project Design and Safeguards", "framework", "planning"],
    ["LEAP Public-Building Framework Procurement", "unknown", "procurement"],
    ["LEAP Environmental and Social Services Framework Procurement", "unknown", "procurement"]
  ];
  for (const [name, finance, delivery] of expected) {
    const metadata = guide.get(seed.records.find(record => record.name === name));
    assert.equal(metadata.finance, finance);
    assert.equal(metadata.delivery, delivery);
  }
  const completed = seed.records.filter(record => guide.get(record).delivery === "reported_complete");
  assert.deepEqual(completed.map(record => guide.get(record).id).sort(), ["rec-0015", "rec-0023", "rec-0028", "rec-0075", "rec-0088", "rec-0108", "rec-0163", "rec-0171"]);
  for (const record of completed) assert.match(guide.get(record).note[0], /not independent|not completion of the entire|not all recovery|not completion of post-war|not completion of shelter|not the wider protection|wider municipal works programme/);
});

test("readable cards preserve source titles, quantities, URLs and original evidence in both languages", () => {
  const context = recordContext();
  const snapshots = {};
  for (const locale of ["ar", "en", "ar", "en"]) {
    context.activeLocale = locale;
    vm.runInContext("renderRecords()", context);
    const output = context.projectList.innerHTML;
    assert.equal((output.match(/class="evidence-record"/g) || []).length, seed.records.length);
    assert.equal((output.match(/class="record-detail"/g) || []).length, seed.records.length);
    assert.ok(output.includes("$250M"));
    assert.ok(output.includes("$1B"));
    assert.ok(output.includes("648,942"));
    for (const record of seed.records) {
      context.record = record;
      const card = vm.runInContext("renderRecordCard(record)", context);
      context.value = record.name;
      assert.ok(card.includes(vm.runInContext("escapeHtml(value)", context)), record.name);
      context.value = record.href;
      assert.ok(card.includes(vm.runInContext("escapeHtml(value)", context)), record.href);
    }
    assert.ok(output.includes(locale === "ar" ? "↖" : "↗"));
    if (snapshots[locale]) assert.equal(output, snapshots[locale], "Language round trip is exact");
    snapshots[locale] = output;
  }
});

test("Arabic search tolerates diacritics and searches Arabic titles even in English mode", () => {
  const context = recordContext("en");
  context.projectSearch.value = "تَأْهِيل المَدارِس";
  vm.runInContext("renderRecords()", context);
  assert.ok(context.visibleRecords.length >= 1);
  assert.ok(context.visibleRecords.some(record => record.name === "School Rehabilitation & Shelter Decommissioning"));
  context.projectSearch.value = "Public-Building Framework";
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 1);
});

test("stage filters combine with category, period, coverage and text without changing labels on locale switch", () => {
  const context = recordContext();
  context.activeRecordDelivery = "procurement";
  vm.runInContext("renderRecords(); renderRecordStageControls()", context);
  assert.equal(context.visibleRecords.length, 3);
  assert.equal(context.recordDeliveryFilter.value, "procurement");
  assert.match(context.recordDeliveryFilter.innerHTML, /مشتريات قبل الإرساء/);
  context.activePeriod = "2026";
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 0);
  context.activePeriod = "2024";
  context.activeLocale = "en";
  context.projectSearch.value = "public-building";
  context.activeFilter = "Financing";
  vm.runInContext("renderRecords(); renderRecordStageControls()", context);
  assert.equal(context.visibleRecords.length, 1);
  assert.equal(context.recordDeliveryFilter.value, "procurement");
  assert.match(context.recordDeliveryFilter.innerHTML, /Pre-award procurement/);
  context.activeRecordFinance = "spent";
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 0);
  assert.match(context.projectList.innerHTML, /Try changing/);
});

test("overview uses the newest three dated publications, without mutating or conflating monitor filters", () => {
  const context = recordContext();
  const before = JSON.stringify(seed.news);
  context.items = seed.news;
  const latest = vm.runInContext("recentUpdates(items)", context);
  assert.equal(latest.length, 3);
  assert.equal(latest[0].id, "undp-municipal-waste-equipment-2026");
  assert.equal(latest[0].date, "2026-09-09");
  assert.equal(latest[1].date, "2026-09-08");
  assert.equal(latest[2].date, "2026-09-04");
  for (const item of latest) {
    context.title = item.title;
    context.summary = item.summary;
    assert.match(vm.runInContext("translatedText(title)", context), /[\u0600-\u06ff]/);
    assert.match(vm.runInContext("translatedText(summary)", context), /[\u0600-\u06ff]/);
  }
  assert.equal(JSON.stringify(seed.news), before);
  assert.doesNotMatch(html, /overviewFreshness/);
  assert.doesNotMatch(source, /Curated public record · last reviewed|سجل عام منتقى · آخر مراجعة|updateFreshness/);
  const overview = html.slice(html.indexOf('id="overview"'), html.indexOf('id="response"'));
  assert.doesNotMatch(overview, /mini-progress/);
  assert.match(overview, /Approval is not evidence of spending/);
});

test("record source markup is escaped, not interpreted as HTML", () => {
  const context = recordContext("en");
  context.record = { ...seed.records[0], name:'<img src=x onerror="bad()">', funding:"<script>bad()</script>", marker:"<svg onload=bad()>" };
  const card = vm.runInContext("renderRecordCard(record)", context);
  assert.doesNotMatch(card, /<img|<script|<svg/);
  assert.match(card, /&lt;img/);
});

test("source-review provenance is bilingual, preserves Latin numbers and distinguishes unavailable or stale sources", () => {
  const context = recordContext();
  for (const locale of ["ar", "en"]) {
    context.activeLocale = locale;
    vm.runInContext("renderRecords()", context);
    const output = context.projectList.innerHTML;
    assert.equal((output.match(/data-review="reviewed"/g) || []).length, 154);
    assert.equal((output.match(/data-review="unavailable"/g) || []).length, 2);
    assert.equal((output.match(/data-review="record_only"/g) || []).length, 15);
    assert.equal((output.match(/data-review="[^"]+">[^<]*<time datetime="2026-09-08"/g) || []).length, 154);
    assert.equal((output.match(/data-review="[^"]+">[^<]*<time datetime="2026-09-09"/g) || []).length, 2);
    assert.doesNotMatch(output, /[\u0660-\u0669\u06f0-\u06f9]/);
    context.record = recordById("rec-0018");
    const alternative = vm.runInContext("renderRecordCard(record)", context);
    assert.ok(alternative.includes(guide.get(context.record).review.sourceUrl));
    assert.ok(alternative.includes(context.record.href), "Original link is retained");
    assert.ok(alternative.includes(locale === "ar" ? "رابط رسمي بديل" : "alternative official link"));
    assert.ok(alternative.includes(locale === "ar" ? "عبر فهرس البحث" : "through the search index"));
    assert.ok(alternative.includes(locale === "ar" ? "تقييم أضرار المدارس" : "school damage assessment"));
    assert.ok(!alternative.includes(locale === "ar" ? "الصياغة الأصلية" : "Basis for stage label — original wording"), "Paraphrase is never labelled a quotation");
    context.record = recordById("rec-0063");
    const unavailable = vm.runInContext("renderRecordCard(record)", context);
    assert.ok(unavailable.includes(locale === "ar" ? "المصدر غير متاح" : "Source unavailable"));
    assert.doesNotMatch(unavailable, /data-review="reviewed"/);
    context.record = {...recordById("rec-0011"), funding:"Updated amount"};
    const stale = vm.runInContext("renderRecordCard(record)", context);
    assert.match(stale, /data-review="stale"/);
    assert.doesNotMatch(stale, /data-stage="disbursed"|datetime="2026-09-08"/);
  }
});

test("all financing and delivery options round-trip in URLs and work as bilingual filters", () => {
  const context = recordContext();
  for (const axis of ["finance", "delivery"]) {
    assert.deepEqual(libraryTools.choices[axis], ["All", ...Object.keys(guide.stages[axis])]);
    for (const stage of Object.keys(guide.stages[axis])) {
      const state = {...libraryTools.defaults, [axis]:stage, lang:"ar"};
      assert.equal(libraryTools.readState(new URL(libraryTools.viewUrl("https://example.org/", state)).search)[axis], stage);
      context.activeRecordFinance = axis === "finance" ? stage : "All";
      context.activeRecordDelivery = axis === "delivery" ? stage : "All";
      for (const locale of ["en", "ar"]) {
        context.activeLocale = locale;
        vm.runInContext("renderRecords(); renderRecordStageControls()", context);
        assert.deepEqual(Array.from(context.visibleRecords, r => guide.get(r).id).sort(), seed.records.filter(r => guide.get(r)[axis] === stage).map(r => guide.get(r).id).sort());
      }
    }
  }
});

test("all current records have unique permanent IDs, independent of display order", () => {
  const ids = seed.records.map(record => guide.get(record).id);
  assert.equal(new Set(ids).size, seed.records.length);
  for (const id of ids) assert.match(id, /^rec-\d{4}$/);
  const reversed = [...seed.records].reverse().map(record => guide.get(record).id).reverse();
  assert.deepEqual(reversed, ids);
  assert.equal(guide.get(seed.records.find(record => record.name === "Lebanon Emergency Assistance Project (LEAP)")).id, "rec-0002");
  for (const name of ["constructor", "toString", "__proto__"]) {
    const unknown = guide.get({name});
    assert.equal(unknown.id, null);
    assert.equal(unknown.titleAr, null);
    assert.equal(unknown.basis, null);
  }
});

test("share links round-trip every filter, Arabic text, sort and language on GitHub Pages", () => {
  const state = { q:"تأهيل المدارس & $250M", type:"Financing", period:"2024", area:"South", finance:"approved", delivery:"procurement", sort:"az", lang:"ar", record:"" };
  const url = new URL(libraryTools.viewUrl("https://example.org/repo/?v=test&tracking=private#overview", state, "#projects"));
  assert.equal(url.pathname, "/repo/");
  assert.equal(url.hash, "#projects");
  assert.equal(url.searchParams.get("v"), "test");
  assert.equal(url.searchParams.has("tracking"), false);
  assert.deepEqual(libraryTools.readState(url.search), state);
  assert.equal(libraryTools.viewUrl(url.href, state, "#projects"), url.href);
});

test("invalid filter values are rejected; broken record links cannot silently show all records", () => {
  const state = libraryTools.readState("?period=2000&type=MadeUp&sort=bad&lang=xx&record=%3Cscript%3E");
  assert.equal(state.type, "All");
  assert.equal(state.period, "All");
  assert.equal(state.sort, "latest");
  assert.equal(state.lang, null);
  assert.equal(state.record, "invalid-record");
  const context = recordContext();
  const notice = {hidden:true,innerHTML:""};
  context.document.querySelector = selector => selector === "#libraryLinkNotice" ? notice : null;
  context.activeRecordId = state.record;
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 0);
  assert.equal(notice.hidden, false);
  assert.match(notice.innerHTML, /غير موجود/);
});

test("record permalinks clear unrelated filters and resolve to exactly one source record", () => {
  const link = new URL(libraryTools.recordUrl("https://example.org/repo/?q=unrelated&finance=spent&lang=en#leap-history", "rec-0002", "ar"));
  assert.equal(link.hash, "#projects");
  const state = libraryTools.readState(link.search);
  assert.equal(state.q, "");
  assert.equal(state.finance, "All");
  assert.equal(state.lang, "ar");
  const context = recordContext();
  context.activeRecordId = state.record;
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 1);
  assert.equal(context.visibleRecords[0].sourceId, "leap");
});

test("location restoration updates state and controls; clear filters removes record scope", () => {
  const context = recordContext("en");
  const calls = [];
  context.window.history = {};
  for (const method of ["pushState", "replaceState"]) context.window.history[method] = (_state, _unused, href) => {
    calls.push(method);
    context.window.location.href = href;
    context.window.location.search = new URL(href).search;
  };
  context.applyLocale = locale => {
    context.activeLocale = locale;
    vm.runInContext("syncLibraryControls(); renderRecords()", context);
  };
  context.window.location.href = "https://example.org/repo/?q=public-building&type=Financing&period=2024&delivery=procurement&sort=az&lang=ar#projects";
  context.window.location.search = new URL(context.window.location.href).search;
  vm.runInContext("restoreLibraryLocation()", context);
  assert.equal(context.activeLocale, "ar");
  assert.equal(context.projectSearch.value, "public-building");
  assert.equal(context.activeRecordSort, "az");
  assert.equal(context.recordDeliveryFilter.value, "procurement");
  assert.equal(context.visibleRecords.length, 1);
  context.activeRecordId = "rec-0005";
  vm.runInContext("clearLibraryFilters()", context);
  assert.equal(context.activeRecordId, "");
  assert.equal(context.visibleRecords.length, seed.records.length);
  assert.equal(context.projectSearch.value, "");
  assert.equal(context.recordDeliveryFilter.value, "All");
  assert.equal(new URL(context.window.location.href).search, "?lang=ar");
  assert.equal(calls.at(-1), "pushState");
});

function parseCsv(csv) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = csv.charCodeAt(0) === 0xFEFF ? 1 : 0; i < csv.length; i++) {
    const c = csv[i];
    if (c === '"') {
      if (quoted && csv[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && c === ",") { row.push(cell); cell = ""; }
    else if (!quoted && c === "\r" && csv[i + 1] === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; i++; }
    else cell += c;
  }
  assert.equal(quoted, false);
  return rows;
}

test("CSV exports the exact filtered/sorted rows with original numbers, Arabic titles and stable links", () => {
  const context = recordContext();
  context.activeRecordDelivery = "procurement";
  context.projectSearch.value = "بيئية";
  vm.runInContext("renderRecords()", context);
  assert.equal(context.visibleRecords.length, 1);
  const csv = libraryTools.recordsCsv(context.visibleRecords, guide, "https://example.org/repo/?delivery=procurement#projects", seed.reviewedAt);
  assert.equal(csv.charCodeAt(0), 0xFEFF);
  const rows = parseCsv(csv);
  assert.equal(rows.length, 2);
  assert.equal(rows[1][0], "rec-0006");
  assert.equal(rows[1][1], context.visibleRecords[0].name);
  assert.equal(rows[1][2], guide.get(context.visibleRecords[0]).titleAr);
  assert.equal(rows[1][7], context.visibleRecords[0].funding);
  assert.equal(rows[1][11], "Pre-award procurement");
  assert.equal(rows[1][15], context.visibleRecords[0].href);
  assert.equal(new URL(rows[1][16]).searchParams.get("record"), "rec-0006");
  assert.equal(new URL(rows[1][16]).searchParams.has("delivery"), false);
  const all = parseCsv(libraryTools.recordsCsv(seed.records, guide, "https://example.org/", seed.reviewedAt));
  assert.equal(all.length, seed.records.length + 1);
  assert.ok(all.some(row => row[7] === "$250M approved"));
  assert.equal(parseCsv(libraryTools.recordsCsv([], guide, "https://example.org/", seed.reviewedAt)).length, 1);
});

test("CSV preserves quotes/newlines and neutralises spreadsheet formula prefixes", () => {
  for (const value of ["=1+1", " +SUM(A1)", "\t@command", "\r\n-1+2"]) {
    assert.equal(parseCsv(libraryTools.csvCell(value) + "\r\n")[0][0], "'" + value);
  }
  const value = 'A "quoted", Arabic عنوان\nsecond line';
  assert.equal(parseCsv(libraryTools.csvCell(value) + "\r\n")[0][0], value);
  assert.equal(parseCsv(libraryTools.csvCell("$250M") + "\r\n")[0][0], "$250M");
});

test("CSV retains source-review provenance, access limits and Arabic rationales for every record", () => {
  const rows = parseCsv(libraryTools.recordsCsv(seed.records, guide, "https://example.org/", seed.reviewedAt));
  assert.equal(rows[0].length, 23);
  for (const [index, record] of seed.records.entries()) {
    const row = rows[index + 1], meta = guide.get(record);
    assert.equal(row.length, 23);
    assert.equal(row[7], record.funding);
    assert.equal(row[14], seed.reviewedAt);
    assert.equal(row[15], record.href);
    assert.equal(row[17], meta.review.status);
    assert.equal(row[18], meta.review.checkedAt || "");
    assert.equal(row[19], meta.review.sourceUrl || "");
    assert.equal(row[20], meta.review.locator?.[0] || "");
    assert.equal(row[21], meta.review.access || "");
    assert.equal(row[22], meta.note?.[1] || "");
  }
  const stale = {...recordById("rec-0011"), href:"https://example.org/new-source"};
  const row = parseCsv(libraryTools.recordsCsv([stale], guide, "https://example.org/", seed.reviewedAt))[1];
  assert.equal(row[17], "stale");
  assert.equal(row[18], "");
  assert.equal(row[19], "");
});

test("download always uses the displayed selection, regardless of API availability", async () => {
  for (const connected of [false, true]) {
    const context = recordContext();
    context.apiAvailable = connected;
    context.currentReviewedAt = seed.reviewedAt;
    context.activeRecordFinance = "approved";
    vm.runInContext("renderRecords()", context);
    let blob, clicked = false, revoked = false;
    context.Blob = Blob;
    context.URL = { createObjectURL:value => { blob = value; return "blob:test"; }, revokeObjectURL:() => { revoked = true; } };
    context.window.setTimeout = fn => fn();
    context.document.createElement = () => ({ style:{}, click:() => { clicked = true; }, remove() {} });
    context.document.body = { append() {} };
    context.showToast = () => {};
    context.fetch = () => { throw new Error("Downloads must not query an independently filtered API"); };
    vm.runInContext("downloadRecords()", context);
    assert.equal(clicked, true);
    assert.equal(revoked, true);
    const rows = parseCsv(await blob.text());
    assert.equal(rows.length, context.visibleRecords.length + 1);
    assert.equal(rows[1][0], "rec-0002");
  }
});

test("clipboard success and denied permission give truthful, usable feedback", async () => {
  for (const allowed of [true, false]) {
    const context = recordContext();
    let toast = "", copied = "", selected = false;
    const fallback = {hidden:true};
    const field = {value:"",focus() {},select:() => { selected = true; }};
    context.document.querySelector = selector => selector === "#copyLinkFallback" ? fallback : field;
    context.navigator = { clipboard:{ writeText:async url => { if (!allowed) throw new Error("Denied"); copied = url; } } };
    context.showToast = message => { toast = message; };
    const success = await vm.runInContext('copyShareLink("https://example.org/?lang=ar#projects")', context);
    assert.equal(success, allowed);
    if (allowed) { assert.match(toast, /تم نسخ/); assert.equal(copied, "https://example.org/?lang=ar#projects"); }
    else { assert.equal(fallback.hidden, false); assert.equal(selected, true); assert.match(toast, /تعذر/); assert.match(field.value, /^https:/); }
  }
});

test("LEAP history resolves chronological entries to existing evidence, not new projects", () => {
  const events = programmeData.resolveEvents(seed, guide);
  assert.equal(events.length, 8);
  assert.equal(events.filter(event => event.record).length, 6);
  assert.equal(events.filter(event => event.source).length, 2);
  assert.equal(new Set(events.map(event => event.id)).size, events.length);
  assert.equal(events[0].date, "2025-06");
  assert.equal(events.at(-1).date, "2026-09-08");
  assert.equal(events.at(-1).recordId, "rec-0170");
  for (const event of events) {
    assert.ok(event.href?.startsWith("https://"));
    if (event.record) assert.notEqual(guide.get(event.record).delivery, "reported_complete");
  }
  assert.equal(seed.records.length, 171);
  assert.match(html, /data-tab-panel="leap-history"/);
  assert.match(source, /"leap-history": "LEAP programme history"/);
});

test("LEAP history renders both languages, source citations, month precision and the correct review date", () => {
  for (const locale of ["ar", "en"]) {
    const context = recordContext(locale);
    const list = {innerHTML:""}, scope = {textContent:""};
    context.document.querySelector = selector => selector === "#leapHistoryList" ? list : selector === "#programmeHistoryScope" ? scope : null;
    vm.runInContext("renderLeapHistory()", context);
    assert.equal((list.innerHTML.match(/<li id=/g) || []).length, programmeData.leap.events.length);
    assert.equal((list.innerHTML.match(/target="_blank"/g) || []).length, programmeData.leap.events.length);
    assert.ok(list.innerHTML.includes("$250M"));
    assert.ok(list.innerHTML.includes("$1B"));
    assert.ok(list.innerHTML.includes("record=rec-0002"));
    assert.match(list.innerHTML, /datetime="2025-06"/);
    assert.match(scope.textContent, /2026/);
    if (locale === "ar") { assert.ok(list.innerHTML.includes("↖")); assert.ok(list.innerHTML.includes("السجل الأصلي")); }
    assert.doesNotMatch(vm.runInContext('formatHistoryDate("2025-06")', context), /\b01\b/);
  }
});
