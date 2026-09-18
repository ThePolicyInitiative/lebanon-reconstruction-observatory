const assert = require("node:assert/strict");
const {test} = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const pages = require("../page-insights.js");
const data = require("../data.js");
const guide = require("../record-guide.js");
const library = require("../library-tools.js");
const programmes = require("../programme-data.js");
const snapshot = require("../data/source-snapshots.json");
const root = path.resolve(__dirname,"..");
const html = fs.readFileSync(path.join(root,"index.html"),"utf8");
const options = {data,guide,library,programmes,base:"https://example.org/observatory/?q=old&record=rec-0001&finance=approved#sources"};

test("all ten page additions are mounted inside their own tab panel", () => {
  const sections=[];
  const mounted=[];
  for(const token of html.matchAll(/<section\b[^>]*>|<\/section>|<div\b[^>]*data-page-insights="([^"]+)"[^>]*>/g)) {
    if(token[0].startsWith("</")) sections.pop();
    else if(token[1]) {
      assert.equal(sections.filter(Boolean).at(-1),token[1]);
      mounted.push(token[1]);
    } else sections.push(token[0].match(/data-tab-panel="([^"]+)"/)?.[1] || null);
  }
  assert.deepEqual(mounted.sort(),[...pages.pages].sort());
  assert.ok(html.indexOf('src="page-insights.js') > html.indexOf('src="app.js'));
});

test("every page renders substantial English and Arabic content without unresolved placeholders", () => {
  for(const page of pages.pages) for(const locale of ["en","ar"]) {
    const output=pages.pageHtml(page,{...options,locale,snapshot});
    assert.ok(output.length>1000,page);
    assert.match(output,new RegExp('id="insights-'+page+'-title"'));
    assert.doesNotMatch(output,/undefined|NaN|\[object Object\]/);
    if(locale==="ar") assert.match(output,/[\u0600-\u06ff]/);
    assert.doesNotMatch(output,/[\u0660-\u0669\u06f0-\u06f9]/);
  }
  assert.equal(pages.pageHtml("invalid",options),"");
});

test("reading links resolve stable records and clear unrelated library filters", () => {
  const ids=new Set(data.records.map(record=>guide.get(record).id));
  for(const page of pages.pages) for(const locale of ["en","ar"]) {
    const output=pages.pageHtml(page,{...options,locale});
    for(const [,encoded] of output.matchAll(/href="([^"]+)"/g)) {
      const url=new URL(encoded.replaceAll("&amp;","&"));
      assert.equal(url.protocol,"https:");
      if(url.origin==="https://example.org") {
        assert.equal(url.pathname,"/observatory/");
        assert.equal(url.hash,"#projects");
        assert.equal(url.searchParams.get("lang"),locale);
        assert.equal(url.searchParams.get("q"),null);
        if(url.searchParams.has("record")) {
          assert.ok(ids.has(url.searchParams.get("record")));
          assert.equal(url.searchParams.get("finance"),null);
        }
      }
    }
  }
});

test("overview counts use record classifications and never aggregate mixed financial quantities", () => {
  const changed={...data,records:data.records.filter(record=>guide.get(record).delivery!=="reported_complete")};
  const output=pages.pageHtml("overview",{...options,data:changed});
  assert.match(output,/delivery=reported_complete/);
  assert.match(output,/<bdi dir="ltr">0<\/bdi> records/);
  assert.match(output,/not unique projects/);
  const funding=pages.pageHtml("funding",options);
  assert.match(funding,/must not be totalled/);
  for(const id of pages.financeIds) {
    const record=data.records.find(r=>guide.get(r).id===id);
    assert.ok(funding.includes(library.recordUrl(options.base,id,"en").replaceAll("&","&amp;")));
    assert.ok(funding.includes(guide.stages.finance[guide.get(record).finance][0]));
  }
});

test("source health deduplicates registered URLs and excludes unrelated or missing targets", () => {
  const sources=[{href:"https://a.org"},{href:"https://a.org"},{href:"https://b.org"},{href:"https://c.org"}];
  const fixture={generatedAt:"2026-09-18T12:00:00Z",targets:[
    {url:"https://a.org",state:"reachable"},{url:"https://a.org",state:"reachable"},
    {url:"https://b.org",state:"response-error"},{url:"https://other.org",state:"reachable"}
  ]};
  assert.deepEqual(pages.snapshotSummary(fixture,sources),{checkedAt:fixture.generatedAt,total:2,reachable:1,unavailable:1,unmonitored:1});
  for(const input of [null,{}, {generatedAt:"invalid",targets:[]}, {generatedAt:fixture.generatedAt,targets:[null]}]) assert.equal(pages.snapshotSummary(input,sources),null);
  assert.match(pages.pageHtml("sources",options),/No saved availability check is loaded/);
});

test("procurement dates remain dated observations and the addendum is not a new project", () => {
  assert.deepEqual(pages.deadlines.map(item=>item.date),["2026-09-22","2026-09-25"]);
  const output=pages.pageHtml("updates",options);
  assert.match(output,/18 September 2026/);
  assert.match(output,/does not establish an award/);
  const event=programmes.leap.events.find(item=>item.id==="leap-public-buildings-addendum");
  assert.equal(event.recordId,"rec-0005");
  assert.equal(event.date,"2026-09-11");
  assert.match(event.note[0],/not a new project or an award/);
});

test("source-derived text is escaped in page additions", () => {
  const changed={...data,records:data.records.map(record=>record.name==="Anera Emergency WASH Programme"?{...record,name:'<img src=x onerror="bad()">'}:record)};
  assert.doesNotMatch(pages.pageHtml("projects",{...options,data:changed}),/<img|onerror=/);
  const fundingData={...data,records:data.records.map(record=>guide.get(record).id==="rec-0002"?{...record,funding:"<script>bad()</script>"}:record)};
  const output=pages.pageHtml("funding",{...options,data:fundingData});
  assert.doesNotMatch(output,/<script>/);
  assert.match(output,/&lt;script&gt;/);
  assert.match(output,/Not documented in this index/);
});

test("new assets are public and included in both website builds", () => {
  const build=fs.readFileSync(path.join(root,"scripts/build-site.js"),"utf8");
  const server=fs.readFileSync(path.join(root,"server.js"),"utf8");
  for(const file of ["page-insights.js","page-insights.css"]) {
    assert.ok(build.includes('copy("'+file+'"'));
    assert.ok(server.includes('"'+file+'"'));
    assert.ok(html.includes(file+"?v=pages-20260918"));
  }
});
