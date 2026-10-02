/* Dated editorial observations copied from the existing reviewed evidence.
 * Availability checks never change these dates. Amend here after reviewing a source. */
(function (root) {
  const entries = [
  {
    "id": "rec-0195",
    "date": "2026-10-27",
    "time": "12:00",
    "checkedAt": "2026-10-02",
    "title": [
      "Civil Defense ambulances",
      "سيارات إسعاف الدفاع المدني"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Civil Defense Ambulance Procurement",
      "date": "2026-09-30",
      "place": "Lebanon / General Directorate of Civil Defense • Posted 30 Sep 2026",
      "funding": "World Bank-financed pre-award supply procurement",
      "marker": "Tender for 34 fully equipped ambulances; bids due 27 Oct; no award or delivery reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12916"
    }
  },
  {
    "id": "rec-0196",
    "date": "2026-11-05",
    "time": "12:00",
    "checkedAt": "2026-10-02",
    "title": [
      "RHUH radiotherapy machine",
      "وحدة العلاج الشعاعي في مستشفى رفيق الحريري"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP RHUH Radiotherapy Machine Procurement",
      "date": "2026-09-30",
      "place": "Rafik Hariri University Hospital, Beirut • Posted 30 Sep 2026",
      "funding": "World Bank-financed pre-award supply procurement",
      "marker": "Tender for radiotherapy-machine supply and installation; bids due 5 Nov; no award, delivery or installation reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12941"
    }
  },
  {
    "id": "rec-0190",
    "date": "2026-10-26",
    "time": null,
    "checkedAt": "2026-09-29",
    "title": ["Zahle Caza water systems", "منظومات المياه في قضاء زحلة"],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "Zahle Caza Drinking-Water Systems Rehabilitation Tender",
      "date": "2026-09-15",
      "place": "Wadi al-Dalam, Qabb Elias and Mreijat, Zahle Caza • Posted 15 Sep 2026",
      "funding": "Open works procurement; financing and payment stage not stated",
      "marker": "Tender for drinking-water system rehabilitation and upgrading; offers due 26 Oct; no award or works reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12779"
    }
  },
  {
    "id": "rec-0005",
    "date": "2026-09-22",
    "time": "12:00",
    "checkedAt": "2026-09-18",
    "amendedAt": "2026-09-11",
    "title": [
      "Public-building consultancy",
      "استشارات المباني العامة"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Public-Building Framework Procurement",
      "date": "2026-09-04",
      "place": "National framework • Posted 4 Sep 2026 • amended 11 Sep",
      "funding": "World Bank-financed procurement notice",
      "marker": "Addendum issued 11 Sep; bid deadline extended to 22 Sep; no award or completed works reported",
      "href": "https://www.cdr.gov.lb/Procurment/ProcurementDetail.aspx?id=1261&lot=0"
    }
  },
  {
    "id": "rec-0189",
    "date": "2026-10-06",
    "time": null,
    "checkedAt": "2026-09-29",
    "title": [
      "School repairs · Batch 3",
      "إصلاح المدارس · الحزمة الثالثة"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Public-School Shelter Rehabilitation Procurement Batch 3",
      "date": "2026-09-25",
      "place": "Lebanon • Public schools and educational facilities • Posted 25 Sep 2026",
      "funding": "World Bank-financed pre-award works procurement",
      "marker": "Four open tender lots for light repairs; bids due 6 Oct; no award or repairs reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12889"
    }
  },
  {
    "id": "rec-0188",
    "date": "2026-10-08",
    "time": null,
    "checkedAt": "2026-09-29",
    "title": [
      "School repairs · Batch 1",
      "إصلاح المدارس · الحزمة الأولى"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Public-School Shelter Rehabilitation Procurement Batch 1",
      "date": "2026-09-28",
      "place": "Lebanon • Public schools and educational facilities • Posted 28 Sep 2026",
      "funding": "World Bank-financed pre-award works procurement",
      "marker": "Three open tender lots for light repairs; bids due 8 Oct; no award or repairs reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12896/tenders"
    }
  },
  {
    "id": "rec-0194",
    "date": "2026-10-09",
    "time": null,
    "checkedAt": "2026-10-01",
    "title": [
      "School repairs · Batch 2",
      "إصلاح المدارس · الحزمة الثانية"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Public-School Shelter Rehabilitation Procurement Batch 2",
      "date": "2026-09-29",
      "place": "Lebanon • Public schools and educational facilities • Posted 29 Sep 2026",
      "funding": "World Bank-financed pre-award works procurement",
      "marker": "Three open tender lots for light repairs; bids due 9 Oct; no award or repairs reported",
      "href": "https://www.ppa.gov.lb/ar/tenders/details/12899"
    }
  },
  {
    "id": "rec-0184",
    "date": "2026-10-12",
    "time": "12:00",
    "checkedAt": "2026-09-28",
    "title": [
      "Equipped ambulances",
      "سيارات إسعاف مجهزة"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP Fully Equipped Ambulance Procurement",
      "date": "2026-09-18",
      "place": "Lebanon / Ministry of Public Health • Posted 18 Sep 2026",
      "funding": "World Bank-financed procurement notice",
      "marker": "Tender for 29 equipped ambulances; bids due 12 Oct; no award or delivery reported",
      "href": "https://www.cdr.gov.lb/Procurment/ProcurementDetail.aspx?id=1264&lot=0"
    }
  },
  {
    "id": "rec-0172",
    "date": "2026-10-15",
    "time": "12:00",
    "checkedAt": "2026-09-28",
    "amendedAt": "2026-09-22",
    "previousDate": "2026-09-25",
    "title": [
      "RHUH MRI supply and installation",
      "توريد جهاز الرنين المغناطيسي وتركيبه في مستشفى رفيق الحريري"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP MRI Supply and Installation Procurement",
      "date": "2026-09-09",
      "place": "Rafik Hariri University Hospital, Beirut • Posted 9 Sep 2026",
      "funding": "World Bank-financed procurement notice",
      "marker": "Bid deadline extended to 15 Oct by 22 Sep notice; no supplier, delivery or installation reported",
      "href": "https://www.cdr.gov.lb/Procurment/ProcurementDetail.aspx?id=1262&lot=0"
    }
  },
  {
    "id": "rec-0185",
    "date": "2026-10-19",
    "time": "12:00",
    "checkedAt": "2026-09-28",
    "title": [
      "OGERO wireless equipment",
      "معدات أوجيرو اللاسلكية"
    ],
    "timeZone": "Asia/Beirut",
    "snapshot": {
      "name": "LEAP OGERO Wireless Equipment Procurement",
      "date": "2026-09-25",
      "place": "Lebanon / telecommunications services • Posted 25 Sep 2026",
      "funding": "World Bank-financed procurement notice",
      "marker": "Qualified tender for 30,000 LTE-A CPEs; bids due 19 Oct; no award or delivery reported",
      "href": "https://www.cdr.gov.lb/Procurment/ProcurementDetail.aspx?id=1240&lot=0"
    }
  }
];
  function resolve(data, guide) {
    return entries.map(entry => {
      const record = data.records.find(item => guide.get(item).id === entry.id);
      const current = record && guide.get(record).review?.status === "reviewed" && Object.entries(entry.snapshot).every(([key,value]) => record[key] === value);
      return {...entry, record, status:current ? "reviewed" : "needs_review", href:entry.snapshot.href};
    }).sort((a,b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }
  function dayInBeirut(now = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Beirut", year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
  }
  function dateState(entry, today = dayInBeirut()) {
    return entry.status !== "reviewed" ? "needs_review" : entry.date < today ? "passed" : entry.date === today ? "today" : "upcoming";
  }
  function escape(value) {
    return String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  }
  function html(entry, locale = "en", {compact = false, today = dayInBeirut()} = {}) {
    const ar = locale === "ar", t = (en,arabic) => ar ? arabic : en;
    const date = value => `<time datetime="${escape(value)}">${escape(new Intl.DateTimeFormat(ar ? "ar-LB" : "en-GB",{day:"numeric",month:"long",year:"numeric",numberingSystem:"latn",timeZone:"UTC"}).format(new Date(value+"T12:00:00Z")))}</time>`;
    const state = dateState(entry,today);
    const label = {passed:t("Listed date has passed", "انقضى الموعد المسجل"),today:t("Listed date is today", "الموعد المسجل اليوم"),upcoming:t("Upcoming listed date", "موعد مسجل قادم"),needs_review:t("Needs re-review · historical date", "تحتاج إلى مراجعة جديدة · موعد تاريخي")}[state];
    const amendment = entry.amendedAt ? `<span>${t("Amended", "عُدّل في")} ${date(entry.amendedAt)}${entry.previousDate ? ` · ${t("Previously", "الموعد السابق")} ${date(entry.previousDate)}` : ""}</span>` : "";
    return `<${compact ? "div" : "article"} class="${compact ? "record-deadline" : "insight-deadline"}" data-deadline="${escape(entry.id)}" data-deadline-state="${state}" data-locale-control>
      ${compact ? "" : `<h4>${escape(entry.title[ar ? 1 : 0])}</h4>`}
      <p><strong>${t("Submission", "تقديم العروض")}: ${date(entry.date)}</strong> · ${entry.time ? `<bdi dir="ltr">${entry.time}</bdi> ${t("Beirut time", "بتوقيت بيروت")}` : t("Time not recorded", "لم يُسجّل الوقت")}</p>
      <p class="deadline-meta"><span>${label}</span>${amendment}<span>${t("Last checked", "آخر فحص")} ${date(entry.checkedAt)}</span></p>
      ${compact ? "" : `<p>${t("Confirm amendments at the source. A deadline does not establish an award or delivery.", "تحقق من التعديلات لدى المصدر. لا يثبت الموعد إرساءً أو تنفيذاً.")}</p><a href="${escape(entry.href)}" target="_blank" rel="noreferrer">${t("Open procurement notice", "افتح إعلان المشتريات")}</a>`}
    </${compact ? "div" : "article"}>`;
  }
  const api = Object.freeze({entries, resolve, dayInBeirut, dateState, html});
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ObservatoryDeadlines = api;
})(typeof window !== "undefined" ? window : globalThis);
