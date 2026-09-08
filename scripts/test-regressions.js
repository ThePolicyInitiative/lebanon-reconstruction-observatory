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
  const start = source.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1, `Missing function ${name}`);
  return source.slice(start, source.indexOf("\n}", start) + 2);
}

test("font request uses valid Playfair weight axes and versioned assets", () => {
  assert.match(html, /Playfair\+Display:wght@600;700/);
  assert.doesNotMatch(html, /Playfair\+Display:ital,wght@600;700/);
  for (const asset of ["data.js", "styles.css", "clarity.css"]) {
    assert.ok(html.includes(`${asset}?v=numbers-20260907`));
  }
  for (const asset of ["app.js", "record-guide.js", "observatory.css"]) {
    assert.ok(html.includes(`${asset}?v=readable-20260908`));
  }
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
    renderAftermathDetails() {}, renderRecords() {}, renderNews() {}, renderNewsStatus() {}, updateFreshness() {}
  });
  vm.runInContext(["isCurrentDataset", "loadApplicationData", "loadNews"].map(functionCode).join("\n"), context);
  return context;
}

test("older API data cannot remove published updates or source entries", async () => {
  const context = dataContext("31 Aug 2026");
  await vm.runInContext("loadApplicationData()", context);
  await vm.runInContext("loadNews()", context);
  assert.equal(context.news.length, 18);
  assert.equal(context.sources.length, 149);
  assert.equal(context.news.filter(item => item.category === "Procurement").length, 2);
  assert.equal(context.apiAvailable, false);
  assert.equal(context.newsStatusKind, "stale");
});

test("current API data loads; absent and invalid review dates are rejected", async () => {
  const context = dataContext(seed.reviewedAt);
  await vm.runInContext("loadApplicationData()", context);
  await vm.runInContext("loadNews()", context);
  assert.equal(context.apiAvailable, true);
  assert.equal(context.news.length, 18);
  assert.equal(context.sources.length, 149);
  assert.equal(vm.runInContext("isCurrentDataset({})", context), false);
  assert.equal(vm.runInContext('isCurrentDataset({reviewedAt:"unknown"})', context), false);
  assert.equal(vm.runInContext('isCurrentDataset({reviewedAt:"8 Sep 2026"})', context), true);
});

const guide = require("../record-guide.js");

function recordContext(locale = "ar") {
  const context = vm.createContext({
    activeLocale:locale, recordGuide:guide, records:seed.records,
    activeFilter:"All", activePeriod:"All", activeRecordArea:"All",
    activeRecordFinance:"All", activeRecordDelivery:"All", visibleRecords:[],
    periodLabels:{ All:"All records", "2024":"After 2024 war", "2026":"After 2026 war" },
    recordAreaLabels:{ All:"All coverage", South:"South & Nabatieh", Beirut:"Beirut & Mount Lebanon", Bekaa:"Bekaa & Baalbek-Hermel", National:"Nationwide or multi-area" },
    projectSearch:{value:""}, recordSort:{value:"latest"}, recordCount:{textContent:""},
    libraryFilterStatus:{textContent:""}, projectList:{innerHTML:""},
    recordFinanceFilter:{innerHTML:"",value:"All",setAttribute() {}},
    recordDeliveryFilter:{innerHTML:"",value:"All",setAttribute() {}}
  });
  vm.runInContext(localeCode, context);
  const functions = ["escapeHtml", "recordTitle", "recordStageLabel", "localizedMarkup", "normalizeRecordSearch", "matchesRecordSearch", "renderRecordCard", "localizedRecordFilter", "localizedPeriodLabel", "periodLabel", "formatNewsDate", "sortRecords", "matchesRecordArea", "localizedAreaLabel", "renderRecords", "renderRecordStageControls", "recentUpdates"];
  vm.runInContext(functions.map(functionCode).join("\n"), context);
  return context;
}

test("all 169 source records have Arabic reading titles without altering original data", () => {
  const before = JSON.stringify(seed);
  assert.equal(Object.keys(guide.titles).length, seed.records.length);
  for (const record of seed.records) {
    const metadata = guide.get(record);
    assert.match(metadata.titleAr, /[\u0600-\u06ff]/, record.name);
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
  assert.equal(completed.length, 2);
  for (const record of completed) assert.match(guide.get(record).note[0], /not independent|not completion of the entire/);
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
  assert.equal(context.visibleRecords.length, 2);
  assert.equal(context.recordDeliveryFilter.value, "procurement");
  assert.match(context.libraryFilterStatus.textContent, /مشتريات قبل الإرساء/);
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
  assert.match(context.libraryFilterStatus.textContent, /Pre-award procurement/);
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
  assert.equal(latest[0].id, "cdr-leap-framework-procurements-2026");
  assert.equal(latest[0].date, "2026-09-04");
  assert.equal(latest[1].date, "2026-09-03");
  assert.equal(latest[2].date, "2026-09-03");
  for (const item of latest) {
    context.title = item.title;
    context.summary = item.summary;
    assert.match(vm.runInContext("translatedText(title)", context), /[\u0600-\u06ff]/);
    assert.match(vm.runInContext("translatedText(summary)", context), /[\u0600-\u06ff]/);
  }
  assert.equal(JSON.stringify(seed.news), before);
  assert.match(html, /id="overviewFreshness"[^>]*data-locale-control/);
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
