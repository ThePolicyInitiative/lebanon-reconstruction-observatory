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
  assert.deepEqual(pages.deadlines.map(item=>item.date),require("../deadline-data.js").entries.map(item=>item.date));
  const output=pages.pageHtml("updates",options);
  assert.match(output,/Last checked/);
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
  for(const file of ["page-insights.js","deadline-data.js","styles.css"]) {
    assert.ok(build.includes('copy("'+file+'"'));
    assert.ok(server.includes('"'+file+'"'));
    assert.match(html,new RegExp(file.replaceAll(".","\\.")+"\\?v=[A-Za-z0-9_-]+[\"']"));
  }
});

test("stage breakdowns follow response tags rather than publication years and count each record once", () => {
  const selectedIds=["rec-0005","rec-0023","rec-0015"];
  const fixture={records:data.records.filter(record=>selectedIds.includes(guide.get(record).id))};
  // rec-0005 was published in 2026 but belongs to the 2024 response track.
  const earlier=pages.stageSummary(fixture,guide,"delivery","2024");
  assert.equal(earlier.total,1);
  assert.equal(earlier.counts.procurement,1);
  const later=pages.stageSummary(fixture,guide,"delivery","2026");
  assert.equal(later.total,1);
  assert.equal(later.counts.reported_complete,1);
  const all=pages.stageSummary(fixture,guide,"delivery");
  assert.equal(all.total,3);
  assert.equal(all.counts.reported_complete,2);
  for(const axis of ["finance","delivery"]) for(const period of ["All","2024","2026"]) {
    const summary=pages.stageSummary(data,guide,axis,period);
    assert.equal(Object.values(summary.counts).reduce((a,b)=>a+b,0),summary.total);
    assert.ok(Object.values(summary.counts).every(count=>Number.isInteger(count)&&count>=0));
  }
  const empty=pages.stageSummary({records:[]},guide,"finance","2026");
  assert.equal(empty.total,0);
  assert.ok(Object.values(empty.counts).every(count=>count===0));
  assert.doesNotMatch(pages.readerHtml("funding",{...options,data:{...data,records:[]}}),/NaN|Infinity/);
});

test("reader choices reject invalid IDs, unrecognised periods and unrelated state", () => {
  assert.deepEqual(pages.readerState({deliveryPeriod:"2026",financePeriod:"2024",compareLeft:"rec-0181",compareRight:"rec-0182",q:"old"},data,guide),{deliveryPeriod:"2026",financePeriod:"2024",compareLeft:"rec-0181",compareRight:"rec-0182"});
  assert.deepEqual(pages.readerState({deliveryPeriod:"Cross-cutting",financePeriod:"<script>",compareLeft:"rec-9999",compareRight:"bad"},data,guide),pages.readerDefaults);
  assert.deepEqual(pages.readerState({}, {records:[]},guide),{...pages.readerDefaults,compareLeft:"",compareRight:""});
  assert.equal(pages.collections.length,8);
});

test("publication digest groups publication months in order without mutating records", () => {
  const fixture=[
    {name:"Older",date:"2025-06"},{name:"Latest",date:"2026-09-18"},
    {name:"Earlier September",date:"2026-09-01"},{name:"August",date:"2026-08-20"},
    {name:"Undated",date:"unknown"},{name:"Bad month",date:"2026-19-04"}
  ];
  const before=JSON.stringify(fixture);
  const groups=pages.publicationGroups(fixture,2);
  assert.deepEqual(groups.map(group=>group.month),["2026-09","2026-08"]);
  assert.deepEqual(groups[0].records.map(record=>record.name),["Latest","Earlier September"]);
  assert.equal(JSON.stringify(fixture),before);
  const actual=pages.publicationGroups(data.records);
  assert.equal(actual.length,4);
  assert.ok(actual.some(group=>group.records.length>3));
  const digest=pages.readerHtml("updates",options);
  assert.equal((digest.match(/<li>/g)||[]).length,actual.reduce((sum,group)=>sum+Math.min(3,group.records.length),0));
});

test("comparison preserves different financing and delivery meanings in both languages", () => {
  for(const locale of ["en","ar"]) {
    const output=pages.readerHtml("projects",{...options,locale},"result");
    assert.ok(output.includes(guide.stages.finance.committed[locale==="ar"?1:0]));
    assert.ok(output.includes(guide.stages.delivery.reported_complete[locale==="ar"?1:0]));
    assert.match(output,/record=rec-0022/);
    assert.match(output,/record=rec-0023/);
    assert.doesNotMatch(output,/q=old|finance=approved/);
  }
  assert.match(pages.readerHtml("projects",{...options,reader:{compareLeft:"rec-0181",compareRight:"rec-0181"}},"result"),/same record is selected twice/);
  const changed={...data,records:data.records.map(record=>guide.get(record).id==="rec-0022"?{...record,funding:"Altered evidence"}:record)};
  const output=pages.readerHtml("projects",{...options,data:changed},"result");
  assert.match(output,/Not documented in this index/);
  assert.doesNotMatch(output,/Signed commitment/);
});

test("reader controls update results and retain choices through language and source-check updates", async () => {
  const listeners={}, results={delivery:{innerHTML:""},finance:{innerHTML:""},comparison:{innerHTML:""}};
  const hosts=pages.pages.map(page=>({dataset:{pageInsights:page},innerHTML:"",querySelectorAll:()=>[]}));
  const controls={};
  let localeObserver, finishFetch;
  const document={documentElement:{lang:"en"},activeElement:null,
    querySelectorAll:()=>hosts,
    querySelector:selector=>{
      const result=selector.match(/data-reader-result="([^"]+)"/);
      if(result) return results[result[1]];
      const page=selector.match(/data-page-insights="([^"]+)"/);
      if(page) return hosts.find(host=>host.dataset.pageInsights===page[1]);
      const control=selector.match(/data-reader-control="([^"]+)"/);
      return control?controls[control[1]]:null;
    },
    addEventListener:(name,callback)=>{listeners[name]=callback;}
  };
  const window={OBSERVATORY_DATA:data,ObservatoryRecordGuide:guide,ObservatoryLibrary:library,ObservatoryProgrammes:programmes,
    location:{href:options.base},addEventListener:()=>{},
    MutationObserver:class {constructor(callback){localeObserver=callback;} observe(){}},
    fetch:()=>new Promise(resolve=>{finishFetch=resolve;})
  };
  pages.mount(document,window);
  const change=(key,value)=>{
    const target=controls[key]={dataset:{readerControl:key},value,focused:false,focus(){this.focused=true;}};
    listeners.change({target});
    return target;
  };
  const control=change("deliveryPeriod","2024");
  assert.match(results.delivery.innerHTML,/After 2024 war/);
  assert.match(results.delivery.innerHTML,/period=2024/);
  change("compareLeft","rec-0181");
  assert.match(results.comparison.innerHTML,/Anera Emergency WASH Programme/);
  document.activeElement=control;
  document.documentElement.lang="ar";
  localeObserver();
  const response=hosts.find(host=>host.dataset.pageInsights==="response").innerHTML;
  assert.match(response,/value="2024" selected/);
  assert.match(response,/بعد حرب 2024/);
  assert.equal(control.focused,true);
  const comparisonBefore=hosts.find(host=>host.dataset.pageInsights==="projects").innerHTML;
  assert.match(comparisonBefore,/value="rec-0181" selected/);
  finishFetch({ok:true,json:async()=>snapshot});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(hosts.find(host=>host.dataset.pageInsights==="projects").innerHTML,comparisonBefore);
  const health=pages.snapshotSummary(snapshot,data.sources);
  assert.ok(hosts.find(host=>host.dataset.pageInsights==="sources").innerHTML.includes(`${health.reachable} / ${health.total}`));
});
