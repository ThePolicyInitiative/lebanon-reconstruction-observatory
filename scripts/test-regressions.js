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
  for (const asset of ["app.js", "data.js", "styles.css", "clarity.css"]) {
    assert.ok(html.includes(`${asset}?v=numbers-20260907`));
  }
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
