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
      { id:"leap-water-infrastructure", date:"2026-09-08", recordId:"rec-0170", kind:["Pre-award procurement", "مشتريات قبل الإرساء"] }
    ]
  });
  function resolveEvents(data, guide) {
    return leap.events.map(event => {
      const record = event.recordId ? data.records.find(item => guide.get(item).id === event.recordId) : null;
      const source = event.sourceId ? data.sources.find(item => item.id === event.sourceId) : null;
      return { ...event, record, source, href:record?.href || source?.href || null };
    }).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }
  const api = Object.freeze({ leap, resolveEvents });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ObservatoryProgrammes = api;
})(typeof window !== "undefined" ? window : globalThis);
