/* Selected LEAP source history, not a live programme-status or completion feed.
 * Dates are publication dates unless explicitly labelled otherwise.
 * Preserve event and record IDs when editing titles or descriptions.
 */
(function (root) {
  const leap = Object.freeze({
    id:"leap", name:["Lebanon Emergency Assistance Project (LEAP)", "مشروع المساعدة الطارئة للبنان (LEAP)"],
    events:[
      { id:"leap-design", date:"2025-06", recordId:"rec-0003", kind:["Project documentation", "وثائق المشروع"] },
      { id:"leap-approval", date:"2025-06-25", recordId:"rec-0002", kind:["Approval announcement", "إعلان الموافقة"],
        note:["The release was published on 25 June and reports Board approval on the previous day. Its publication date is not a disbursement date.", "نُشر البيان في 25 يونيو وأفاد بموافقة مجلس الإدارة في اليوم السابق. تاريخ نشره ليس تاريخ صرف الأموال."] },
      { id:"leap-faq", date:"2026-02-17", sourceId:"leap", kind:["Programme factsheet", "ورقة تعريفية بالبرنامج"],
        title:["Financing framework and programme responsibilities explained", "توضيح إطار التمويل والمسؤوليات ضمن البرنامج"],
        note:["The factsheet explains the $1B framework and initial $250M financing. It is not an additional financing commitment or a completion report.", "تشرح الورقة الإطار البالغ $1B والتمويل الأولي بقيمة $250M. ليست التزاماً تمويلياً إضافياً ولا تقرير إنجاز."] },
      { id:"leap-procurement-plan", date:"2026-08-14", recordId:"rec-0004", kind:["Procurement planning", "تخطيط المشتريات"] },
      { id:"leap-nabatieh-tender", date:"2026-08-18", sourceId:"cdr-leap-nabatieh-roads-tender-2026", kind:["Procurement notice", "إعلان مشتريات"],
        title:["Nabatieh road-clearing and restoration tender", "مناقصة تنظيف طرق النبطية وترميمها"],
        note:["The source register dates the notice to 18 August and records an extended bid deadline of 3 September. A bid deadline is not a contract award or completion date.", "يؤرّخ سجل المصادر الإعلان في 18 أغسطس، ويسجّل تمديد مهلة العروض إلى 3 سبتمبر. موعد تقديم العروض ليس تاريخ إرساء عقد أو إنجاز أعمال."] },
      { id:"leap-public-buildings", date:"2026-09-04", recordId:"rec-0005", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-environment-social", date:"2026-09-04", recordId:"rec-0006", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-water-infrastructure", date:"2026-09-08", recordId:"rec-0170", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-rhuh-mri", date:"2026-09-09", recordId:"rec-0172", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-ambulances", date:"2026-09-18", recordId:"rec-0184", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-rhuh-mri-extension", date:"2026-09-22", recordId:"rec-0172", kind:["Procurement extension", "تمديد مهلة المشتريات"],
        title:["Hospital MRI tender deadline extended", "تمديد مهلة مناقصة الرنين المغناطيسي للمستشفى"],
        note:["CDR lists an extension notice dated 22 September and a tender-document update dated 23 September. The submission deadline is 15 October, noon Beirut time. Checked 28 September 2026; no award is established.", "يسجل المجلس إعلان تمديد في 22 أيلول وتحديثاً لوثيقة المناقصة في 23 أيلول. تنتهي مهلة التقديم في 15 تشرين الأول ظهراً بتوقيت بيروت. فُحص في 28 أيلول 2026؛ ولا يثبت إرساءً."] },
      { id:"leap-ogero-wireless", date:"2026-09-25", recordId:"rec-0185", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] },
      { id:"leap-schools-batch-3", date:"2026-09-25", recordId:"rec-0189", kind:["Pre-award works procurement", "مشتريات أشغال قبل الإرساء"] },
      { id:"leap-schools-batch-1", date:"2026-09-28", recordId:"rec-0188", kind:["Pre-award works procurement", "مشتريات أشغال قبل الإرساء"] },
      { id:"leap-public-buildings-addendum", date:"2026-09-11", recordId:"rec-0005", kind:["Procurement addendum", "ملحق إعلان المشتريات"],
        title:["Public-building consultancy deadline extended", "تمديد مهلة استشارات المباني العامة"],
        note:["The CDR notice lists an addendum dated 11 September and a revised submission deadline of 22 September, noon Beirut time. This is a dated amendment to the 4 September notice, not a new project or an award. Notice checked on 18 September 2026.", "يسجل إعلان مجلس الإنماء والإعمار ملحقاً بتاريخ 11 أيلول ومهلة معدلة للتقديم في 22 أيلول، الساعة 12 ظهراً بتوقيت بيروت. هذا تعديل مؤرخ لإعلان 4 أيلول وليس مشروعاً جديداً أو إرساءً. فُحص الإعلان في 18 أيلول 2026."] }
    ]
  });
  const programmes = Object.freeze([
    leap,
    {id:"lrp-2026", name:["Lebanon Response Plan 2026", "خطة الاستجابة للبنان لعام 2026"],
      note:["The original appeal and its September addendum describe related response scopes. Neither establishes funding received or completed delivery. Amounts are not added together here.", "يصف النداء الأصلي وملحق أيلول نطاقات استجابة مترابطة. ولا يثبت أي منهما تلقي التمويل أو اكتمال التنفيذ. لا تُجمع المبالغ هنا."],
      events:[
        {id:"lrp-2026-appeal", recordId:"rec-0010", kind:["Original appeal", "النداء الأصلي"]},
        {id:"lrp-2026-addendum", recordId:"rec-0187", kind:["Response addendum", "ملحق الاستجابة"]}
      ]},
    {id:"unicef-2024", name:["UNICEF 2024 emergency response", "استجابة اليونيسف للطوارئ في 2024"],
      note:["Selected appeal and response records with different reporting scopes. Two records share the appeal URL; dates follow the library register. Their outputs and funding cannot be added or treated as a single project's progress.", "سجلات مختارة للنداء والاستجابة بنطاقات إبلاغ مختلفة. يشترك سجلان في رابط النداء؛ وتتبع التواريخ فهرس المكتبة. لا تُجمع مخرجاتها أو أموالها ولا تُعرض كتقدم مشروع واحد."],
      events:[
        {id:"unicef-2024-appeal", recordId:"rec-0046", kind:["Funding appeal", "نداء تمويل"]},
        {id:"unicef-2024-response", recordId:"rec-0037", kind:["Reported response", "استجابة مبلّغ عنها"]},
        {id:"unicef-2024-return", recordId:"rec-0067", kind:["Response record", "سجل استجابة"]}
      ]}
  ]);
  function relatedProgrammes(recordId) {
    return programmes.filter(programme => programme.events.some(event => event.recordId === recordId));
  }
  function resolveEvents(data, guide, programmeId = "leap") {
    const programme = programmes.find(item => item.id === programmeId);
    if (!programme) return [];
    return programme.events.map(event => {
      const record = event.recordId ? data.records.find(item => guide.get(item).id === event.recordId) : null;
      const source = event.sourceId ? data.sources.find(item => item.id === event.sourceId) : null;
      return { ...event, date:event.date || record?.date || "", record, source, href:record?.href || source?.href || null };
    }).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }
  const api = Object.freeze({ leap, programmes, relatedProgrammes, resolveEvents });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ObservatoryProgrammes = api;
})(typeof window !== "undefined" ? window : globalThis);
