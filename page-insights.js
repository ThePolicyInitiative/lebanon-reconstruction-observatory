/* Curated reading routes across the Observatory. Counts describe this library,
 * never independent projects, beneficiaries, financing totals or delivery rates. */
(function (root) {
  const pages = ["overview", "response", "actors", "evidence", "projects", "funding", "leap", "leap-history", "updates", "sources"];
  const collections = [
    { title:["Water and sanitation", "المياه والصرف الصحي"], note:["From proposed assistance to a reported operating facility.", "من المساعدة المخطط لها إلى مرفق أُبلغ عن إنشائه."], ids:["rec-0181", "rec-0182", "rec-0170"] },
    { title:["Schools and learning", "المدارس والتعلّم"], note:["Read damage evidence, rehabilitation reporting and education coordination together.", "اقرأ أدلة الضرر وتقارير التأهيل والتنسيق التربوي معاً."], ids:["rec-0018", "rec-0028", "rec-0179"] },
    { title:["Municipal services", "الخدمات البلدية"], note:["Equipment, local priorities and community participation.", "المعدات والأولويات المحلية والمشاركة المجتمعية."], ids:["rec-0171", "rec-0173", "rec-0175"] },
    { title:["Livelihoods and enterprises", "سبل العيش والمؤسسات"], note:["Business support, grant plans and agricultural recovery.", "دعم الأعمال وخطط المنح والتعافي الزراعي."], ids:["rec-0011", "rec-0021", "rec-0033"] },
    { title:["Health and essential care", "الصحة والرعاية الأساسية"], note:["Service continuity, mobile teams and hospital equipment procurement.", "استمرارية الخدمات والفرق المتنقلة ومشتريات معدات المستشفيات."], ids:["rec-0038", "rec-0020", "rec-0172"] },
    { title:["Housing and urban recovery", "السكن والتعافي الحضري"], note:["Compare an earlier urban recovery reference with later damage and planning evidence.", "قارن مرجعاً سابقاً للتعافي الحضري بأدلة لاحقة للضرر والتخطيط."], ids:["rec-0015", "rec-0016", "rec-0029"] },
    { title:["Energy for public services", "الطاقة للخدمات العامة"], note:["A signed partnership and a reported installation have different scopes and stages.", "للشراكة الموقّعة والتركيب المبلّغ عنه نطاقان ومرحلتان مختلفتان."], ids:["rec-0022", "rec-0023"] },
    { title:["Debris and the environment", "الركام والبيئة"], note:["Read technical guidance alongside planning and safeguard procurement.", "اقرأ الإرشادات الفنية إلى جانب التخطيط ومشتريات الضمانات البيئية."], ids:["rec-0087", "rec-0026", "rec-0006"] }
  ];
  const cases = [
    { title:["Water services", "خدمات المياه"], id:"rec-0182", next:["Look for operating coverage and continuity-of-service reporting after the centre was built.", "تابع تقارير نطاق التشغيل واستمرارية الخدمة بعد إنشاء المركز."] },
    { title:["Waste collection", "جمع النفايات"], id:"rec-0171", next:["Equipment handover can be followed by collection schedules, maintained fleets and facility operating records.", "يمكن تتبع التسليم بجداول الجمع وصيانة الأسطول وسجلات تشغيل المرافق."] },
    { title:["Education recovery", "التعافي التعليمي"], id:"rec-0179", next:["Follow school-level rehabilitation and learning-continuity evidence after strategic coordination.", "تابع أدلة تأهيل المدارس واستمرارية التعلم بعد التنسيق الاستراتيجي."] },
    { title:["Local employment", "التشغيل المحلي"], id:"rec-0174", next:["A launch can be followed by participant, payment and completed-activity reporting.", "يمكن تتبع الإطلاق بتقارير المشاركين والمدفوعات والأنشطة المنجزة."] }
  ];
  const sectorRoutes = [
    [["Agriculture and food security", "الزراعة والأمن الغذائي"], "rec-0032"],
    [["Commerce, industry and tourism", "التجارة والصناعة والسياحة"], "rec-0001"],
    [["Education", "التعليم"], "rec-0018"],
    [["Environment and debris", "البيئة والركام"], "rec-0087"],
    [["Energy", "الطاقة"], "rec-0022"],
    [["Health", "الصحة"], "rec-0172"],
    [["Housing", "الإسكان"], "rec-0001"],
    [["Municipal and public services", "الخدمات البلدية والعامة"], "rec-0019"],
    [["Transport", "النقل"], "rec-0004"],
    [["Water, wastewater and irrigation", "المياه والصرف الصحي والري"], "rec-0170"]
  ];
  const partnerships = [
    { title:["Public-building procurement", "مشتريات المباني العامة"], id:"rec-0005", roles:[
      [["CDR", "مجلس الإنماء والإعمار"], ["Publishes the consultancy procurement.", "ينشر إعلان مشتريات الخدمات الاستشارية."]],
      [["World Bank / IBRD", "البنك الدولي للإنشاء والتعمير"], ["Named financing source in the notice.", "جهة التمويل المذكورة في الإعلان."]],
      [["Consultancy applicants", "الجهات الاستشارية المتقدمة"], ["Submit expressions of interest; no selected consultant is identified in this record.", "تقدم إبداء الاهتمام؛ ولا يحدد هذا السجل استشارياً مختاراً."]]
    ]},
    { title:["Municipal waste services", "خدمات النفايات البلدية"], id:"rec-0171", roles:[
      [["European Union", "الاتحاد الأوروبي"], ["Funds the equipment support.", "يموّل دعم المعدات."]],
      [["UNDP and Ministry of Environment", "البرنامج الإنمائي ووزارة البيئة"], ["Implementation and national partnership.", "التنفيذ والشراكة الوطنية."]],
      [["Municipalities, unions and facilities", "البلديات والاتحادات والمرافق"], ["Receive the machinery and collection trucks.", "تتسلّم الآليات وشاحنات الجمع."]]
    ]},
    { title:["Remote water operations", "تشغيل المياه عن بُعد"], id:"rec-0182", roles:[
      [["ICRC", "اللجنة الدولية للصليب الأحمر"], ["Reports building the monitoring centre with the water establishment.", "تبلغ عن إنشاء مركز المراقبة مع مؤسسة المياه."]],
      [["South Lebanon Water Establishment", "مؤسسة مياه لبنان الجنوبي"], ["Water-service partner for connected pumping stations.", "الشريك في خدمات محطات الضخ المتصلة."]],
      [["Engineers and technical teams", "المهندسون والفرق الفنية"], ["Use remote monitoring and alerts to respond to network faults.", "يستخدمون المراقبة والتنبيهات عن بُعد للاستجابة لأعطال الشبكة."]]
    ]}
  ];
  const procurement = [
    {id:"rec-0005", title:["Public buildings", "المباني العامة"], scope:["Design, structural assessment and rehabilitation supervision.", "التصميم والتقييم الإنشائي والإشراف على التأهيل."]},
    {id:"rec-0006", title:["Environmental and social services", "الخدمات البيئية والاجتماعية"], scope:["Impact assessments, management plans and audits.", "تقييمات الأثر وخطط الإدارة والتدقيق."]},
    {id:"rec-0170", title:["Water infrastructure", "البنية التحتية للمياه"], scope:["Repair design and supervision services.", "خدمات تصميم الإصلاح والإشراف عليه."]},
    {id:"rec-0172", title:["Hospital MRI equipment", "معدات الرنين المغناطيسي للمستشفى"], scope:["Supply and installation at Rafik Hariri University Hospital.", "التوريد والتركيب في مستشفى رفيق الحريري الجامعي."]}
  ];
  // Dated observations of the notices, not a continuously refreshed tender calendar.
  const deadlines = [
    {id:"rec-0005", date:"2026-09-22", title:["Public-building consultancy", "استشارات المباني العامة"], note:["The 11 September addendum extends submission to 22 September, noon Beirut time.", "يمدد ملحق 11 أيلول تقديم العروض إلى 22 أيلول، الساعة 12 ظهراً بتوقيت بيروت."]},
    {id:"rec-0172", date:"2026-09-25", title:["RHUH MRI supply and installation", "توريد جهاز الرنين المغناطيسي وتركيبه في مستشفى رفيق الحريري"], note:["The 9 September notice lists 25 September, noon Beirut time, for submission.", "يحدد إعلان 9 أيلول موعد تقديم العروض في 25 أيلول، الساعة 12 ظهراً بتوقيت بيروت."]}
  ];
  const financeIds = ["rec-0001", "rec-0010", "rec-0007", "rec-0002", "rec-0022", "rec-0011"];
  function escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  }
  function snapshotSummary(snapshot, sources) {
    if (!snapshot || !Array.isArray(snapshot.targets) || !Number.isFinite(Date.parse(snapshot.generatedAt))) return null;
    const registered = new Set(sources.map(source => source.href));
    const targets = [...new Map(snapshot.targets.filter(item => item && registered.has(item.url)).map(item => [item.url, item])).values()];
    if (!targets.length) return null;
    const reachable = targets.filter(item => item.state === "reachable").length;
    return {checkedAt:snapshot.generatedAt, total:targets.length, reachable, unavailable:targets.length-reachable, unmonitored:registered.size-targets.length};
  }
  const readerDefaults = Object.freeze({deliveryPeriod:"All", financePeriod:"All", compareLeft:"rec-0022", compareRight:"rec-0023"});
  function readerState(input, data, guide) {
    const ids = new Set(data.records.map(record=>guide.get(record).id).filter(Boolean));
    const state = {...readerDefaults};
    for (const key of ["deliveryPeriod","financePeriod"]) if (["All","2024","2026"].includes(input?.[key])) state[key]=input[key];
    for (const key of ["compareLeft","compareRight"]) {
      if (ids.has(input?.[key])) state[key]=input[key];
      else if (!ids.has(state[key])) state[key]=[...ids][key==="compareLeft"?0:1] || [...ids][0] || "";
    }
    return state;
  }
  function stageSummary(data, guide, axis, period="All") {
    if (!["delivery","finance"].includes(axis)) throw new Error("Unknown evidence axis");
    const selected = ["2024","2026"].includes(period) ? period : "All";
    const records = data.records.filter(record=>selected==="All" || record.period===selected);
    const counts = Object.fromEntries(Object.keys(guide.stages[axis]).map(key=>[key,0]));
    for (const record of records) counts[guide.get(record)[axis]]++;
    return {period:selected,total:records.length,counts};
  }
  function publicationGroups(records, limit=4) {
    const groups = new Map();
    for (const record of records) {
      if (!/^\d{4}-(0[1-9]|1[0-2])(?:-\d{2})?$/.test(record.date)) continue;
      const month=record.date.slice(0,7);
      if (!groups.has(month)) groups.set(month,[]);
      groups.get(month).push(record);
    }
    return [...groups].sort(([a],[b])=>b.localeCompare(a)).slice(0,limit).map(([month,items])=>({month,records:[...items].sort((a,b)=>b.date.localeCompare(a.date)||a.name.localeCompare(b.name))}));
  }
  function readerHtml(page, options, part="all") {
    const {data,guide,library,programmes,locale="en",base="https://example.org/"}=options;
    const state=readerState(options.reader,data,guide), lang=locale==="ar"?1:0;
    const t=pair=>escape(pair[lang]);
    const byId=new Map(data.records.map(record=>[guide.get(record).id,record]));
    const title=record=>lang ? guide.get(record).titleAr || record.name : record.name;
    const link=id=>byId.has(id)?`<a class="insight-record-link" href="${escape(library.recordUrl(base,id,locale))}">${escape(title(byId.get(id)))}<span aria-hidden="true">${lang?"←":"→"}</span></a>`:"";
    const period=key=>key==="2024"?t(["After 2024 war","بعد حرب 2024"]):key==="2026"?t(["After 2026 war","بعد حرب 2026"]):t(["All response periods","جميع فترات الاستجابة"]);
    const date=value=>new Intl.DateTimeFormat(lang?"ar-LB":"en-GB",{year:"numeric",month:"short",...(/^\d{4}-\d{2}-\d{2}$/.test(value)?{day:"numeric"}:{}),numberingSystem:"latn",timeZone:"UTC"}).format(new Date(value));
    const time=value=>`<time datetime="${escape(value)}">${escape(date(value))}</time>`;
    const field=(label,value)=>`<div><dt>${t(label)}</dt><dd>${value}</dd></div>`;
    const recordCard=(id,extra="")=>{
      const record=byId.get(id);
      if (!record) return `<p>${t(["This record is not available in the current library.","هذا السجل غير متاح في المكتبة الحالية."])}</p>`;
      const meta=guide.get(record);
      return `<article class="reader-record">${extra}${link(id)}<dl class="reader-fields">${field(["Source publication","تاريخ نشر المصدر"],time(record.date))}${field(["Headline measure · source wording","القيمة الأصلية · صياغة المصدر"],`<bdi dir="auto" lang="en">${escape(record.funding)}</bdi>`)}${field(["Financing stage","مرحلة التمويل"],t(guide.stages.finance[meta.finance]))}${field(["Delivery stage","مرحلة التنفيذ"],t(guide.stages.delivery[meta.delivery]))}</dl><p>${escape(meta.note?.[lang] || "")}</p></article>`;
    };
    const section=(heading,description,body)=>`<section class="reader-section" aria-labelledby="reader-${page}-title" data-locale-control><header class="insight-heading"><div><h3 id="reader-${page}-title">${t(heading)}</h3></div><p>${t(description)}</p></header>${body}</section>`;
    const stageResults=axis=>{
      const summary=stageSummary(data,guide,axis,state[axis+"Period"]);
      const bars=Object.entries(summary.counts).map(([key,count])=>{
        const href=library.viewUrl(base,{...library.defaults,period:summary.period,[axis]:key,lang:locale},"#projects");
        return `<li><a href="${escape(href)}"><span>${t(guide.stages[axis][key])}</span><strong><bdi dir="ltr">${count}</bdi></strong></a><span class="reader-bar" aria-hidden="true"><i style="width:${summary.total?100*count/summary.total:0}%"></i></span></li>`;
      }).join("");
      return `<p class="reader-result-status" role="status">${period(summary.period)} · <bdi dir="ltr">${summary.total}</bdi> ${t(["source records","سجلاً من المصادر"])}</p><ul class="reader-stage-list">${bars}</ul><p class="insight-footnote">${t(["Each record is counted once on this axis. Zero means no matching record in this library; it does not prove no activity or funding exists. All response periods includes cross-cutting records.","يُحتسب كل سجل مرة واحدة على هذا المحور. يعني الصفر عدم وجود سجل مطابق في المكتبة، ولا يثبت غياب النشاط أو التمويل. تشمل جميع الفترات السجلات المشتركة بينها."])}</p>`;
    };
    if (page==="response" || page==="funding") {
      const axis=page==="response"?"delivery":"finance", key=axis+"Period";
      if (part==="result") return stageResults(axis);
      const label=axis==="delivery"?["Delivery breakdown by response period","توزيع مراحل التنفيذ بحسب فترة الاستجابة"]:["Financing evidence by response period","أدلة التمويل بحسب فترة الاستجابة"];
      const controls=`<div class="reader-controls"><label for="reader-${key}">${t(["Response period","فترة الاستجابة"])}</label><select id="reader-${key}" data-reader-control="${key}" aria-controls="reader-${axis}-result">${["All","2024","2026"].map(value=>`<option value="${value}"${state[key]===value?" selected":""}>${period(value)}</option>`).join("")}</select></div><div id="reader-${axis}-result" data-reader-result="${axis}">${stageResults(axis)}</div>`;
      return section(label,["Select a period to explore classified source records. Bar lengths represent record counts, not project progress or amounts of money.","اختر فترة لاستكشاف سجلات المصادر المصنفة. تمثل أطوال الأشرطة أعداد السجلات، ولا تمثل تقدم المشاريع أو مبالغ مالية."],controls);
    }
    if (page==="projects") {
      const result=`<p class="reader-result-status" role="status">${t(state.compareLeft===state.compareRight?["The same record is selected twice. Choose another to compare.","السجل نفسه مختار مرتين. اختر سجلاً آخر للمقارنة."]:["Two source records shown side by side.","يُعرض سجلان من المصادر جنباً إلى جنب."])}</p><div class="insight-grid">${recordCard(state.compareLeft)}${recordCard(state.compareRight)}</div>`;
      if (part==="result") return result;
      const items=[...data.records].filter(r=>guide.get(r).id).sort((a,b)=>title(a).localeCompare(title(b),locale));
      const controls=["compareLeft","compareRight"].map((key,i)=>`<div class="reader-picker"><label for="reader-${key}">${t(i?["Second record","السجل الثاني"]:["First record","السجل الأول"])}</label><select id="reader-${key}" data-reader-control="${key}" aria-controls="reader-comparison-result">${items.map(r=>`<option value="${guide.get(r).id}"${guide.get(r).id===state[key]?" selected":""}>${escape(title(r))}</option>`).join("")}</select></div>`).join("");
      return `<details class="page-insights reader-comparison" data-locale-control><summary>${t(["Compare two source records","قارن بين سجلين من المصادر"])}</summary>${section(["Read the differences before drawing a conclusion","اقرأ الفروق قبل استخلاص النتيجة"],["Compare dates, source measures and evidence stages. These may be different interventions; the comparison does not establish a before-and-after relationship or a combined total.","قارن التواريخ والقيم الواردة في المصادر ومراحل الأدلة. قد تخص السجلات تدخلات مختلفة؛ ولا تثبت المقارنة علاقة قبل وبعد أو مجموعاً موحداً."],`<div class="insight-grid reader-pickers">${controls}</div><div id="reader-comparison-result" data-reader-result="comparison">${result}</div>`)}</details>`;
    }
    if (page==="overview") {
      const routes=[
        [["Where is damage documented?","أين وُثّقت الأضرار؟"],["Read assessments before looking for delivery evidence.","اقرأ التقييمات قبل البحث عن أدلة التنفيذ."],{type:"Assessment"}],
        [["What is happening in the South?","ماذا يجري في الجنوب؟"],["Browse records mentioning South Lebanon and Nabatieh in the library's coverage filter.","تصفّح السجلات التي تذكر جنوب لبنان والنبطية ضمن مرشح النطاق في المكتبة."],{area:"South"}],
        [["Which records report implementation?","أي سجلات تبلغ عن تنفيذ جارٍ؟"],["Open the source rationale and identify the activity actually described.","افتح تفسير التصنيف وحدّد النشاط الموصوف فعلياً."],{delivery:"in_progress"}],
        [["How are municipalities involved?","كيف تشارك البلديات؟"],["Explore the library's municipal record category.","استكشف فئة السجلات البلدية في المكتبة."],{type:"Municipal"}]
      ];
      return section(["Start with a recovery question","ابدأ بسؤال عن التعافي"],["Four routes into the public record, with the relevant library filter already selected.","أربعة مسارات إلى السجل العام، مع تحديد مرشح المكتبة المناسب مسبقاً."],`<div class="insight-grid reader-question-grid">${routes.map(([name,note,filters])=>`<a href="${escape(library.viewUrl(base,{...library.defaults,...filters,lang:locale},"#projects"))}"><strong>${t(name)}</strong><span>${t(note)}</span><span aria-hidden="true">${lang?"←":"→"}</span></a>`).join("")}</div>`);
    }
    if (page==="actors") {
      const publishers=[[["World Bank","البنك الدولي"],"rec-0002"],[["UNDP and assessment partners","البرنامج الإنمائي وشركاء التقييم"],"rec-0016"],[["UNICEF and health partners","اليونيسف والشركاء الصحيون"],"rec-0038"],[["ICRC and the water establishment","الصليب الأحمر الدولي ومؤسسة المياه"],"rec-0182"],[["Anera and the Lebanon Humanitarian Fund","أنيرا وصندوق لبنان الإنساني"],"rec-0181"],[["Council for Development and Reconstruction","مجلس الإنماء والإعمار"],"rec-0172"]];
      return section(["Six entry points into organisations' records","ست نقاط بداية لقراءة سجلات الجهات"],["A selected record for each organisation or partnership. These are reading examples, not a ranking or an exhaustive list of their work.","سجل مختار لكل جهة أو شراكة. هذه أمثلة للقراءة، وليست ترتيباً أو حصراً لأعمال الجهات."],`<div class="insight-grid reader-publisher-grid">${publishers.map(([name,id])=>`<article><h4>${t(name)}</h4>${link(id)}<p class="insight-meta">${t(["Published","نُشر"])} ${time(byId.get(id).date)}</p></article>`).join("")}</div>`);
    }
    if (page==="evidence") return section(["Read three assessment scopes together","اقرأ نطاقات ثلاثة تقييمات معاً"],["The national needs estimate and the two regional building-damage estimates measure different things. Their publication dates are not necessarily the end dates of the periods assessed. Do not add their headline figures.","يقيس تقدير الاحتياجات الوطني وتقديرا أضرار المباني الإقليميان أموراً مختلفة. ولا تعني تواريخ النشر بالضرورة نهاية الفترات المقيمة. لا تجمع القيم الرئيسية لهذه التقييمات."],`<div class="insight-grid insight-grid-three">${["rec-0001","rec-0016","rec-0017"].map(id=>recordCard(id)).join("")}</div>`);
    if (page==="leap") {
      const faq=data.sources.find(source=>source.id==="leap");
      const documents=[[["Design and safeguards","التصميم والضمانات"],"rec-0003",["Read the intended scope and safeguards before interpreting later activities.","اقرأ النطاق المقصود والضمانات قبل تفسير الأنشطة اللاحقة."]],[["Procurement plan","خطة المشتريات"],"rec-0004",["Use the planning record to place individual notices in context.","استخدم سجل التخطيط لوضع الإعلانات المنفردة في سياقها."]]];
      const cards=documents.map(([name,id,note])=>`<article class="insight-card"><h4>${t(name)}</h4><p>${t(note)}</p>${link(id)}</article>`).join("");
      return section(["The LEAP document desk","مكتبة وثائق ليب"],["Keep the programme design, planning documents and explanatory factsheet close to the procurement record.","اقرأ تصميم البرنامج ووثائق التخطيط والورقة التوضيحية إلى جانب سجل المشتريات."],`<div class="insight-grid insight-grid-three">${cards}${faq&&/^https:\/\//.test(faq.href)?`<article class="insight-card"><h4>${t(["Programme questions and answers","أسئلة وأجوبة عن البرنامج"])}</h4><p>${t(["Read the World Bank's explanation of the financing framework and programme responsibilities.","اقرأ شرح البنك الدولي لإطار التمويل ومسؤوليات البرنامج."])}</p><a class="insight-source-link" href="${escape(faq.href)}" target="_blank" rel="noreferrer">${t(["Open the factsheet","افتح الورقة التعريفية"])}</a></article>`:""}</div>`);
    }
    if (page==="leap-history") return section(["Three dates on the same procurement","ثلاثة تواريخ لعملية مشتريات واحدة"],["The public-building notice shows why a document event, a submission deadline and an editorial check need separate labels.","يوضح إعلان المباني العامة أهمية الفصل بين تاريخ الوثيقة ومهلة تقديم العروض وتاريخ المراجعة التحريرية."],`<div class="insight-grid insight-grid-three">${[
      [["Addendum issued","صدور الملحق"],"2026-09-11",["A dated revision of the procurement notice.","تعديل مؤرخ لإعلان المشتريات."]],
      [["Notice checked","فحص الإعلان"],"2026-09-18",["When this dated notice information was checked for the reading guide.","وقت فحص معلومات الإعلان المؤرخة لإعداد دليل القراءة."]],
      [["Submission deadline","مهلة تقديم العروض"],"2026-09-22",["Noon Beirut time, as listed in the checked notice. Reconfirm amendments with CDR.","الساعة 12 ظهراً بتوقيت بيروت، وفق الإعلان المفحوص. تحقق مجدداً من التعديلات لدى المجلس."]]
    ].map(([label,value,note])=>`<article class="reader-date-card"><h4>${t(label)}</h4>${time(value)}<p>${t(note)}</p></article>`).join("")}</div>${link("rec-0005")}`);
    if (page==="updates") {
      const groups=publicationGroups(data.records);
      return section(["Browse recent publication months","تصفّح أشهر النشر الأخيرة"],["The latest four publication months represented in the library. Counts describe indexed records, not all publications or the volume of recovery work.","أحدث أربعة أشهر نشر ممثلة في المكتبة. تصف الأعداد السجلات المفهرسة، ولا تمثل جميع المنشورات أو حجم أعمال التعافي."],`<div class="reader-digest">${groups.map(group=>`<details><summary>${time(group.month)} <span><bdi dir="ltr">${group.records.length}</bdi> ${t(["records","سجلاً"])}</span></summary><p class="insight-meta">${t(["Latest three records in this month, or all records when fewer than three.","أحدث ثلاثة سجلات في هذا الشهر، أو جميعها عندما يكون العدد أقل من ثلاثة."])}</p><ul>${group.records.slice(0,3).map(record=>`<li>${link(guide.get(record).id)}<span class="insight-meta">${time(record.date)}</span></li>`).join("")}</ul></details>`).join("")}</div>`);
    }
    if (page==="sources") {
      const terms=[
        [["Damage estimate","تقدير الأضرار"],["A source's valuation of physical damage within a stated scope and date. It is not a funding allocation.","تقييم المصدر للأضرار المادية ضمن نطاق وتاريخ محددين. لا يمثل تخصيصاً مالياً."]],
        [["Recovery needs","احتياجات التعافي"],["An estimate of resources needed for recovery. Its scope can differ from direct physical damage.","تقدير للموارد اللازمة للتعافي. قد يختلف نطاقه عن الأضرار المادية المباشرة."]],
        [["Funding appeal","نداء التمويل"],["A request for support. The amount requested does not establish how much was received.","طلب للدعم. لا يثبت المبلغ المطلوب مقدار ما تم تلقيه."]],
        [["Signed commitment","التزام موقّع"],["A documented financing agreement. It does not by itself establish a works contract or a payment.","اتفاق تمويل موثق. لا يثبت وحده وجود عقد أشغال أو دفع أموال."]],
        [["Disbursement and expenditure","الصرف والإنفاق"],["A reported transfer of funds and reported spending are different stages. Read the source's recipient, purpose and reporting period.","تحويل الأموال المبلّغ عنه والإنفاق المبلّغ عنه مرحلتان مختلفتان. اقرأ الجهة المتلقية والغرض وفترة التقرير في المصدر."]],
        [["Pre-award procurement","مشتريات قبل الإرساء"],["A procurement step before an identified contract award. A submission deadline is not an award date.","خطوة مشتريات تسبق إرساء عقد محدد. مهلة تقديم العروض ليست تاريخ إرساء."]],
        [["Reported completion","إنجاز مبلّغ عنه"],["The cited source reports a defined output as complete. This is not independent verification of all programme outcomes.","يفيد المصدر بإنجاز مخرج محدد. لا يمثل ذلك تحققاً مستقلاً من جميع نتائج البرنامج."]],
        [["Source record and project","سجل المصدر والمشروع"],["Several records can describe one project, and one source can describe several activities. Record counts are not project counts.","قد تصف عدة سجلات مشروعاً واحداً، وقد يصف مصدر واحد أنشطة متعددة. أعداد السجلات ليست أعداد المشاريع."]]
      ];
      return section(["A short evidence glossary","معجم موجز للأدلة"],["Open a term when comparing headlines, stages and source claims.","افتح المصطلح عند مقارنة العناوين ومراحل التنفيذ وما تورده المصادر."],`<div class="insight-faq reader-glossary">${terms.map(([term,definition])=>`<details><summary>${t(term)}</summary><p>${t(definition)}</p></details>`).join("")}</div>`);
    }
    return "";
  }
  function pageHtml(page, options) {
    if (!pages.includes(page)) return "";
    const {data, guide, library, programmes, locale="en", base="https://example.org/", snapshot=null} = options;
    const ar = locale === "ar", lang = ar ? 1 : 0;
    const t = pair => pair[lang];
    const records = new Map(data.records.map(record => [guide.get(record).id, record]));
    const meta = id => records.has(id) ? guide.get(records.get(id)) : null;
    const title = id => ar ? (meta(id)?.titleAr || records.get(id)?.name) : records.get(id)?.name;
    const date = value => new Intl.DateTimeFormat(ar ? "ar-LB" : "en-GB", {day:"numeric",month:"short",year:"numeric",numberingSystem:"latn",timeZone:"UTC"}).format(new Date(value));
    const text = pair => escape(t(pair));
    const time = value => `<time datetime="${escape(value)}">${escape(date(value))}</time>`;
    const recordLink = id => records.has(id) ? `<a class="insight-record-link" href="${escape(library.recordUrl(base,id,locale))}">${escape(title(id))}<span aria-hidden="true">${ar ? "←" : "→"}</span></a>` : `<span>${text(["Record unavailable in this edition","السجل غير متاح في هذا الإصدار"])}</span>`;
    const primary = id => records.has(id) && /^https:\/\//.test(records.get(id).href) ? `<a class="insight-source-link" href="${escape(records.get(id).href)}" target="_blank" rel="noreferrer">${text(["Read the source","اقرأ المصدر"])} <span aria-hidden="true">${ar ? "↖" : "↗"}</span></a>` : "";
    const stage = (id, axis="delivery") => meta(id) ? `<span class="insight-stage" data-stage="${escape(meta(id)[axis])}">${escape(guide.stages[axis][meta(id)[axis]][lang])}</span>` : "";
    const note = id => meta(id)?.note?.[lang] || t(["No reviewed stage is available.","لا تتوفر مرحلة مراجَعة."]);
    const heading = (eyebrow, name, description) => `<header class="insight-heading"><div><p class="eyebrow">${text(eyebrow)}</p><h3 id="insights-${page}-title">${text(name)}</h3></div>${description ? `<p>${text(description)}</p>` : ""}</header>`;
    const metric = (value,label) => `<div class="insight-metric"><strong><bdi dir="ltr">${escape(value)}</bdi></strong><span>${text(label)}</span></div>`;
    const count = (axis,value) => data.records.filter(record => guide.get(record)[axis] === value).length;
    const view = state => escape(library.viewUrl(base,{...library.defaults,...state,lang:locale},"#projects"));
    const stats = snapshotSummary(snapshot,data.sources);
    let content = "";
    if (page === "overview") {
      content = heading(["EXPLORE THE RECORD","استكشف السجل"],["Where recovery stands in this library","صورة التعافي في هذه المكتبة"],["Start with the kind of evidence you need. These counts describe source records, not unique projects or a national completion rate.","ابدأ بنوع الأدلة الذي تحتاجه. تصف الأعداد سجلات المصادر، ولا تمثل مشاريع منفردة أو نسبة إنجاز وطنية."]);
      content += `<div class="insight-metrics">${metric(data.records.length,["curated records","سجلاً منسقاً"])}${metric(data.sources.length,["source entries","مدخلاً للمصادر"])}${metric(data.sectors.length,["RDNA sectors","قطاعات في التقييم الوطني"])}</div><div class="insight-grid insight-grid-three">`;
      for (const item of [
        {name:["Assessments and needs","التقييمات والاحتياجات"],description:["Locate damage and needs evidence before interpreting recovery activity.","حدّد أدلة الضرر والاحتياجات قبل تفسير نشاط التعافي."],state:{type:"Assessment"},value:data.records.filter(r=>r.filter==="Assessment").length},
        {name:["Procurement under preparation","مشتريات قيد الإعداد"],description:["Read the notices behind consultancy and equipment procurement.","اقرأ الإعلانات التي تستند إليها مشتريات الاستشارات والمعدات."],state:{delivery:"procurement"},value:count("delivery","procurement")},
        {name:["Reported completed outputs","مخرجات أُبلغ عن إنجازها"],description:["Inspect the limited output each source reports as completed.","اطّلع على المخرج المحدد الذي يبلغ كل مصدر عن إنجازه."],state:{delivery:"reported_complete"},value:count("delivery","reported_complete")}
      ]) content += `<article class="insight-card"><span class="insight-number"><bdi dir="ltr">${item.value}</bdi> ${text(["records","سجلات"])}</span><h4>${text(item.name)}</h4><p>${text(item.description)}</p><a href="${view(item.state)}">${text(["Explore these records","استكشف هذه السجلات"])} ${ar?"←":"→"}</a></article>`;
      content += "</div>";
    } else if (page === "response") {
      content = heading(["ESSENTIAL SERVICES","الخدمات الأساسية"],["Four recovery pathways to follow","أربعة مسارات لمتابعة التعافي"],["Selected cases connect a reported activity with the next evidence to look for. Follow-up questions are editorial, not promised milestones.","تربط الحالات المختارة النشاط المبلغ عنه بالأدلة المطلوب تتبعها لاحقاً. أسئلة المتابعة تحريرية وليست محطات إنجاز موعودة."]);
      content += '<div class="insight-grid">';
      for (const item of cases) content += `<article class="insight-card"><h4>${text(item.title)}</h4>${stage(item.id)}${recordLink(item.id)}<p>${escape(note(item.id))}</p><div class="insight-next"><strong>${text(["Evidence to follow","أدلة للمتابعة"])}</strong><p>${text(item.next)}</p></div>${primary(item.id)}</article>`;
      content += "</div>";
    } else if (page === "actors") {
      content = heading(["PARTNERS IN PRACTICE","الشركاء في الممارسة"],["Who connects finance, delivery and local services","من يربط التمويل والتنفيذ والخدمات المحلية"],["Three source-linked examples explain specific roles. An organisation's presence does not establish payment or completion.","توضح ثلاثة أمثلة مرتبطة بالمصادر أدواراً محددة. وجود جهة في السجل لا يثبت الدفع أو الإنجاز."]);
      content += '<div class="insight-grid insight-grid-three">';
      for (const item of partnerships) content += `<article class="insight-partnership"><h4>${text(item.title)}</h4><ol>${item.roles.map(([actor,role],i)=>`<li><b class="insight-step" aria-hidden="true">${i+1}</b><div><strong>${text(actor)}</strong><p>${text(role)}</p></div></li>`).join("")}</ol>${primary(item.id)}</article>`;
      content += "</div>";
    } else if (page === "evidence") {
      content = heading(["SECTOR READING ROOM","قراءات حسب القطاع"],["Follow the evidence across ten sectors","تتبّع الأدلة عبر عشرة قطاعات"],["A starting record for each RDNA sector. Some links lead to assessments; others to programme or procurement evidence. This is a reading guide, not a sector-by-sector recovery score.","سجل للبدء في كل قطاع من قطاعات التقييم الوطني. تقود بعض الروابط إلى تقييمات وأخرى إلى برامج أو مشتريات. هذا دليل قراءة وليس تقييماً لتعافي كل قطاع."]);
      content += `<div class="insight-table-wrap" tabindex="0" role="region" aria-label="${text(["Sector evidence table","جدول الأدلة القطاعية"])}"><table class="insight-table"><thead><tr><th scope="col">${text(["Sector","القطاع"])}</th><th scope="col">${text(["Starting record","سجل للبدء"])}</th><th scope="col">${text(["Evidence stage","مرحلة الدليل"])}</th></tr></thead><tbody>${sectorRoutes.map(([name,id])=>`<tr><th scope="row">${text(name)}</th><td>${recordLink(id)}</td><td>${stage(id)}</td></tr>`).join("")}</tbody></table></div>`;
    } else if (page === "projects") {
      content = heading(["CURATED COLLECTIONS","مجموعات مختارة"],["Explore a recovery question","استكشف أحد مجالات التعافي"],["Selected reading lists bring related records together across dates, publishers and delivery stages.","تجمع قوائم القراءة المختارة سجلات مترابطة عبر التواريخ والناشرين ومراحل التنفيذ."]);
      content += '<div class="insight-grid">' + collections.map(item=>`<article class="insight-collection"><h4>${text(item.title)}</h4><p>${text(item.note)}</p><ul>${item.ids.map(id=>`<li>${recordLink(id)}</li>`).join("")}</ul></article>`).join("")+"</div>";
    } else if (page === "funding") {
      content = heading(["FINANCING IN THE RECORD","التمويل في السجل"],["Six examples, six different meanings","ستة أمثلة ومعانٍ مختلفة"],["Read the classified stage alongside the original headline measure. Figures refer to different scopes and must not be totalled.","اقرأ المرحلة المصنفة إلى جانب القيمة الأصلية. تخص الأرقام نطاقات مختلفة ولا يجوز جمعها."]);
      content += `<div class="insight-table-wrap" tabindex="0" role="region" aria-label="${text(["Financing evidence examples","أمثلة الأدلة التمويلية"])}"><table class="insight-table"><thead><tr><th scope="col">${text(["Source record","سجل المصدر"])}</th><th scope="col">${text(["Headline measure","القيمة الأصلية"])}</th><th scope="col">${text(["Financing stage and reading","مرحلة التمويل وقراءتها"])}</th></tr></thead><tbody>${financeIds.map(id=>`<tr><th scope="row">${recordLink(id)}</th><td><bdi dir="auto" lang="en">${escape(records.get(id)?.funding)}</bdi></td><td>${stage(id,"finance")}<p>${escape(note(id))}</p></td></tr>`).join("")}</tbody></table></div>`;
    } else if (page === "leap") {
      content = heading(["PROCUREMENT CASEBOOK","ملفات المشتريات"],["What the notices actually cover","ما الذي تغطيه الإعلانات فعلياً"],["These are separate procurement scopes within LEAP. None of these records establishes a contract award or completed works.","هذه نطاقات مشتريات منفصلة ضمن ليب. لا يثبت أي من هذه السجلات إرساء عقد أو إنجاز أعمال."]);
      content += '<div class="insight-grid">' + procurement.map(item=>`<article class="insight-card"><h4>${text(item.title)}</h4><p>${text(item.scope)}</p>${stage(item.id)}<p class="insight-meta">${text(["Published","نُشر"])} ${time(records.get(item.id).date)}</p>${recordLink(item.id)}${primary(item.id)}</article>`).join("")+"</div>";
      content += `<div class="insight-next"><strong>${text(["Track each package separately","تتبّع كل حزمة على حدة"])}</strong><p>${text(["Match later awards and progress reports to the same procurement reference, location and scope before advancing its delivery stage.","طابق الإرساء وتقارير التقدم اللاحقة مع مرجع المشتريات والموقع والنطاق نفسه قبل تغيير مرحلة التنفيذ."])}</p></div>`;
    } else if (page === "leap-history") {
      const events = programmes.resolveEvents(data,guide);
      content = heading(["READING THE CHRONOLOGY","قراءة التسلسل الزمني"],["A programme changes through documents","يتطور البرنامج عبر وثائقه"],["An addendum updates an existing procurement. It is another event in the same programme, not another project or financing commitment.","يحدّث الملحق عملية مشتريات قائمة. وهو حدث آخر في البرنامج نفسه وليس مشروعاً أو التزاماً تمويلياً جديداً."]);
      content += `<div class="insight-metrics">${metric(events.length,["selected history entries","مدخلات زمنية مختارة"])}${metric(new Set(events.filter(e=>e.record).map(e=>guide.get(e.record).id)).size,["distinct linked library records","سجلات مكتبة مرتبطة دون تكرار"])}${metric(1,["programme traced","برنامج يجري تتبعه"])}</div><div class="insight-grid insight-grid-three">`;
      for (const [name,description,href] of [
        [["Documentation","الوثائق"],["Design papers set the intended scope and safeguards.","تحدد وثائق التصميم النطاق المقصود والضمانات."],library.recordUrl(base,"rec-0003",locale)],
        [["Approval","الموافقة"],["The June 2025 announcement records a financing decision, not a payment date.","يوثق إعلان يونيو 2025 قراراً تمويلياً وليس تاريخ دفع."],library.recordUrl(base,"rec-0002",locale)],
        [["Procurement revisions","تعديلات المشتريات"],["The 11 September addendum extends the public-building submission deadline to 22 September.","يمدد ملحق 11 أيلول مهلة تقديم عروض المباني العامة إلى 22 أيلول."],library.recordUrl(base,"rec-0005",locale)]
      ]) content += `<article class="insight-card"><h4>${text(name)}</h4><p>${text(description)}</p><a href="${escape(href)}">${text(["Read the linked record","اقرأ السجل المرتبط"])} ${ar?"←":"→"}</a></article>`;
      content += "</div>";
    } else if (page === "updates") {
      content = heading(["PROCUREMENT DATES TO FOLLOW","مواعيد مشتريات للمتابعة"],["Two published submission dates","موعدان منشوران لتقديم العروض"],["Notice details checked on 18 September 2026. Confirm amendments with CDR before relying on a deadline; reaching a deadline does not establish an award.","فُحصت تفاصيل الإعلانين في 18 أيلول 2026. راجع التعديلات لدى مجلس الإنماء والإعمار قبل الاعتماد على موعد؛ وبلوغ الموعد لا يثبت الإرساء."]);
      content += '<div class="insight-grid">' + deadlines.map(item=>`<article class="insight-deadline"><p class="insight-date">${time(item.date)}</p><h4>${text(item.title)}</h4><p>${text(item.note)}</p>${stage(item.id)}${primary(item.id)}</article>`).join("")+"</div>";
      content += `<p class="insight-footnote">${text(["Publication, editorial review and availability checks are separate dates. The source monitor checks access; it does not automatically discover awards or rewrite delivery classifications.","النشر والمراجعة التحريرية وفحص الإتاحة تواريخ منفصلة. يتحقق مراقب المصادر من الوصول ولا يكتشف الإرساء تلقائياً أو يعيد تصنيف التنفيذ."])}</p>`;
    } else if (page === "sources") {
      const reviews = data.records.map(record=>guide.get(record).review);
      content = heading(["EVIDENCE COVERAGE","تغطية الأدلة"],["What has been reviewed, and what remains uncertain","ما خضع للمراجعة وما بقي غير محسوم"],["Editorial review assesses the cited passage. Availability checks only test whether a page responds.","تقيّم المراجعة التحريرية المقطع المستشهد به. أما فحوص الإتاحة فتختبر استجابة الصفحة فقط."]);
      content += `<div class="insight-metrics">${metric(reviews.filter(r=>r.status==="reviewed").length,["source-reviewed records","سجلات روجعت مصادرها"])}${metric(reviews.filter(r=>r.status==="record_only").length,["record-wording annotations","تعليقات تستند إلى صياغة السجل"])}${metric(reviews.filter(r=>r.status==="unavailable").length,["records awaiting readable sources","سجلات تنتظر مصادر قابلة للقراءة"])}</div>`;
      content += stats ? `<div class="insight-check-summary"><h4>${text(["Saved availability check","فحص الإتاحة المحفوظ"])}</h4><p>${time(stats.checkedAt)} · <bdi dir="ltr">${stats.reachable} / ${stats.total}</bdi> ${text(["registered URLs responded successfully.","من روابط السجل استجابت بنجاح."])}</p><p>${escape(stats.unavailable)} ${text(["returned an access, network or certificate error. This does not establish that their publications were withdrawn.","أعادت خطأ وصول أو شبكة أو شهادة. لا يثبت ذلك سحب منشوراتها."])}</p>${stats.unmonitored ? `<p>${escape(stats.unmonitored)} ${text(["registered URLs are absent from this saved check.","من روابط السجل غير موجودة في هذا الفحص المحفوظ."])}</p>` : ""}</div>` : `<p class="insight-footnote">${text(["No saved availability check is loaded. This is not a claim that the sources are unavailable.","لم يُحمّل فحص إتاحة محفوظ. ولا يعني ذلك تعذر الوصول إلى المصادر."])}</p>`;
      content += '<div class="insight-faq">';
      for (const [question,answer] of [
        [["Why are there several dates?","لماذا توجد تواريخ متعددة؟"],["The publication date belongs to the source; the review date records when its evidence was assessed; the check date records an access test.","تاريخ النشر يخص المصدر، وتاريخ المراجعة يحدد وقت تقييم أدلته، وتاريخ الفحص يسجل اختبار الوصول."]],
        [["Does a completion label mean an independent audit?","هل يعني تصنيف الإنجاز وجود تدقيق مستقل؟"],["No. Read the scope and rationale: a reported handover or facility can be complete while the wider recovery programme remains ongoing or undocumented.","لا. اقرأ النطاق والتفسير: قد تُنجز عملية تسليم أو مرفق بحسب التقرير بينما يبقى البرنامج الأوسع جارياً أو غير موثق."]],
        [["What happens when a record changes?","ماذا يحدث عند تغيير السجل؟"],["Source-reviewed classifications are tied to an exact record snapshot. Changes to the evidence require re-review; an old stage is not silently carried forward.","ترتبط التصنيفات المراجَعة بنسخة مطابقة من السجل. يستلزم تغيير الأدلة مراجعة جديدة، ولا يُحتفظ بالمرحلة السابقة تلقائياً."]]
      ]) content += `<details><summary>${text(question)}</summary><p>${text(answer)}</p></details>`;
      content += "</div>";
    }
    if (page === "projects") return `<details class="page-insights page-insights-projects" data-locale-control><summary>${text(["Explore curated reading collections","استكشف مجموعات القراءة المختارة"])}</summary><section aria-labelledby="insights-projects-title">${content}</section></details>${readerHtml(page,options)}`;
    content += readerHtml(page,options);
    return `<section class="page-insights page-insights-${page}" aria-labelledby="insights-${page}-title" data-locale-control>${content}</section>`;
  }
  function mount(document, window) {
    let snapshot = null;
    let reader = {...readerDefaults};
    const options = () => ({data:window.OBSERVATORY_DATA, guide:window.ObservatoryRecordGuide, library:window.ObservatoryLibrary, programmes:window.ObservatoryProgrammes, locale:document.documentElement.lang === "ar" ? "ar" : "en", base:window.location.href, snapshot, reader});
    const renderHost = host => {
      // Keep expanded reading sections open through language changes.
      const expanded = [...host.querySelectorAll("details")].map(item=>item.open);
      host.innerHTML=pageHtml(host.dataset.pageInsights,options());
      host.querySelectorAll("details").forEach((item,i)=>{if(expanded[i]) item.open=true;});
    };
    const render = () => {
      const focused=document.activeElement?.dataset?.readerControl;
      document.querySelectorAll("[data-page-insights]").forEach(renderHost);
      if (focused) document.querySelector(`[data-reader-control="${focused}"]`)?.focus();
    };
    render();
    document.addEventListener("change",event=>{
      const key=event.target.dataset?.readerControl;
      if (!Object.hasOwn(readerDefaults,key)) return;
      reader=readerState({...reader,[key]:event.target.value},window.OBSERVATORY_DATA,window.ObservatoryRecordGuide);
      event.target.value=reader[key];
      const page=key==="deliveryPeriod"?"response":key==="financePeriod"?"funding":"projects";
      const result=key==="deliveryPeriod"?"delivery":key==="financePeriod"?"finance":"comparison";
      const target=document.querySelector(`[data-reader-result="${result}"]`);
      if (target) target.innerHTML=readerHtml(page,options(),"result");
    });
    const observer = new window.MutationObserver(render);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    window.addEventListener("popstate",render);
    // Relative to the document so GitHub Pages subdirectory hosting also works.
    window.fetch(new URL("data/source-snapshots.json",window.location.href),{cache:"no-store"})
      .then(response=>{if(!response.ok) throw new Error("No saved source check");return response.json();})
      .then(value=>{snapshot=value;const host=document.querySelector('[data-page-insights="sources"]');if(host) renderHost(host);})
      .catch(()=>{snapshot=null;const host=document.querySelector('[data-page-insights="sources"]');if(host) renderHost(host);});
  }
  const api = Object.freeze({pages,collections,cases,sectorRoutes,partnerships,procurement,deadlines,financeIds,snapshotSummary,readerDefaults,readerState,stageSummary,publicationGroups,readerHtml,pageHtml,mount});
  if (typeof module !== "undefined" && module.exports) module.exports=api;
  else {root.ObservatoryPageInsights=api;mount(root.document,root);}
})(typeof window !== "undefined" ? window : globalThis);
