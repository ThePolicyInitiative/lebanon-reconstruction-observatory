/* Curated reading routes across the Observatory. Counts describe this library,
 * never independent projects, beneficiaries, financing totals or delivery rates. */
(function (root) {
  const pages = ["overview", "response", "actors", "evidence", "projects", "funding", "leap", "leap-history", "updates", "sources"];
  const collections = [
    { title:["Water and sanitation", "المياه والصرف الصحي"], note:["From proposed assistance to a reported operating facility.", "من المساعدة المخطط لها إلى مرفق أُبلغ عن إنشائه."], ids:["rec-0181", "rec-0182", "rec-0170"] },
    { title:["Schools and learning", "المدارس والتعلّم"], note:["Read damage evidence, rehabilitation reporting and education coordination together.", "اقرأ أدلة الضرر وتقارير التأهيل والتنسيق التربوي معاً."], ids:["rec-0018", "rec-0028", "rec-0179"] },
    { title:["Municipal services", "الخدمات البلدية"], note:["Equipment, local priorities and community participation.", "المعدات والأولويات المحلية والمشاركة المجتمعية."], ids:["rec-0171", "rec-0173", "rec-0175"] },
    { title:["Livelihoods and enterprises", "سبل العيش والمؤسسات"], note:["Business support, grant plans and agricultural recovery.", "دعم الأعمال وخطط المنح والتعافي الزراعي."], ids:["rec-0011", "rec-0021", "rec-0033"] }
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
    if (page === "projects") return `<details class="page-insights page-insights-projects" data-locale-control><summary>${text(["Explore curated reading collections","استكشف مجموعات القراءة المختارة"])}</summary><section aria-labelledby="insights-projects-title">${content}</section></details>`;
    return `<section class="page-insights page-insights-${page}" aria-labelledby="insights-${page}-title" data-locale-control>${content}</section>`;
  }
  function mount(document, window) {
    let snapshot = null;
    const options = () => ({data:window.OBSERVATORY_DATA, guide:window.ObservatoryRecordGuide, library:window.ObservatoryLibrary, programmes:window.ObservatoryProgrammes, locale:document.documentElement.lang === "ar" ? "ar" : "en", base:window.location.href, snapshot});
    const render = () => document.querySelectorAll("[data-page-insights]").forEach(host => {host.innerHTML=pageHtml(host.dataset.pageInsights,options());});
    render();
    const observer = new window.MutationObserver(render);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    window.addEventListener("popstate",render);
    // Relative to the document so GitHub Pages subdirectory hosting also works.
    window.fetch(new URL("data/source-snapshots.json",window.location.href),{cache:"no-store"})
      .then(response=>{if(!response.ok) throw new Error("No saved source check");return response.json();})
      .then(value=>{snapshot=value;render();}).catch(()=>{snapshot=null;render();});
  }
  const api = Object.freeze({pages,collections,cases,sectorRoutes,partnerships,procurement,deadlines,financeIds,snapshotSummary,pageHtml,mount});
  if (typeof module !== "undefined" && module.exports) module.exports=api;
  else {root.ObservatoryPageInsights=api;mount(root.document,root);}
})(typeof window !== "undefined" ? window : globalThis);
