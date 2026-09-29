/* Record browsing and source histories. App state is supplied by app.js. */
const recordBatchSize = 20;
let renderedRecordLimit = recordBatchSize;
let recordQuerySignature = "";
const recordAreaLabels = Object.freeze({
  All: "All coverage",
  National: "Nationwide or multi-area",
  South: "South & Nabatieh",
  Beirut: "Beirut & Mount Lebanon",
  Bekaa: "Bekaa & Baalbek-Hermel"
});

function localizedAreaLabel(area) {
  const label = recordAreaLabels[area] || area;
  return activeLocale === "ar" ? (arabicText[label] || label) : label;
}

function localizedRecordFilter(filter) {
  return activeLocale === "ar" ? (arabicText[filter] || filter) : filter.toUpperCase();
}

function matchesRecordArea(record) {
  if (activeRecordArea === "All") return true;
  const value = `${record.place} ${record.marker} ${record.status}`.toLowerCase();
  const areas = {
    National: /nationwide|national|lebanon-wide|across lebanon|all governorates|multi-sector/,
    South: /south lebanon|nabatieh|tyre|sour|bint jbeil|marjaayoun|hasbaya|saida|sidon|jezzine/,
    Beirut: /beirut|mount lebanon|baabda|metn|aley|chouf|damour|keserwan|jbeil/,
    Bekaa: /bekaa|baalbek|hermel|zahle|rachaya|west bekaa/
  };
  return areas[activeRecordArea]?.test(value) || false;
}

function periodLabel(period) {
  return periodLabels[period] || period;
}

function localizedPeriodLabel(period) {
  const label = periodLabel(period);
  return activeLocale === "ar" ? (arabicText[label] || label) : label;
}

function sortRecords(items) {
  const direction = activeRecordSort;
  return [...items].sort((a, b) => {
    if (direction === "az") return recordTitle(a).localeCompare(recordTitle(b), activeLocale);
    return b.date.localeCompare(a.date);
  });
}

function recordTitle(record) {
  return activeLocale === "ar" ? (recordGuide.get(record).titleAr || record.name) : record.name;
}

function recordStageLabel(axis, stage) {
  const labels = recordGuide.stages[axis][stage] || recordGuide.stages[axis].unknown;
  return labels[activeLocale === "ar" ? 1 : 0];
}

function recordReviewLabel(status) {
  const labels = {
    reviewed:["Source reviewed", "تمت مراجعة المصدر"],
    unavailable:["Source unavailable — review pending", "المصدر غير متاح — المراجعة معلّقة"],
    stale:["Record changed — re-review needed", "تغيّر السجل — تلزم إعادة المراجعة"],
    record_only:["Based on record wording", "استناداً إلى صياغة السجل"],
    not_reviewed:["Source review pending", "مراجعة المصدر معلّقة"]
  };
  return (labels[status] || labels.not_reviewed)[activeLocale === "ar" ? 1 : 0];
}

// These components own their locale state, including number isolation, and are
// excluded from the static-text observer so repeated language switches are safe.
function localizedMarkup(value) {
  return escapeHtml(activeLocale === "ar" ? formatArabicNumbers(value) : value);
}

function normalizeRecordSearch(value) {
  return String(value).normalize("NFKC").toLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g, "").replace(/[أإآٱ]/g, "ا");
}

function matchesRecordSearch(record, query) {
  const guide = recordGuide.get(record);
  const searchable = [record.name, guide.titleAr, record.place, record.filter,
    arabicText[record.filter], record.period, record.status, arabicText[record.status],
    record.funding, record.marker, ...(guide.note || []),
    ...recordGuide.stages.finance[guide.finance], ...recordGuide.stages.delivery[guide.delivery]];
  return normalizeRecordSearch(searchable.join(" ")).includes(normalizeRecordSearch(query.trim()));
}

function renderRecordStageControls() {
  for (const [axis, control, active] of [["finance", recordFinanceFilter, activeRecordFinance], ["delivery", recordDeliveryFilter, activeRecordDelivery]]) {
    if (!control) continue;
    control.setAttribute("aria-label", axis === "finance" ? uiText("Filter by financing stage", "التصفية حسب مرحلة التمويل") : uiText("Filter by delivery stage", "التصفية حسب مرحلة التنفيذ"));
    control.innerHTML = `<option value="All">${uiText("All stages", "كل المراحل")}</option>` + Object.keys(recordGuide.stages[axis]).map(stage => `<option value="${stage}">${localizedMarkup(recordStageLabel(axis, stage))}</option>`).join("");
    control.value = active;
  }
}

function renderRecordCard(record) {
  const guide = recordGuide.get(record);
  const originalTitle = activeLocale === "ar" && guide.titleAr
    ? `<p class="record-original">${uiText("Original record title", "عنوان السجل الأصلي")}<bdi lang="en" dir="auto">${escapeHtml(record.name)}</bdi></p>` : "";
  const detailFields = [
    [uiText("Publisher / partner", "الجهة الناشرة / الشريكة"), record.status],
    [uiText("Location / coverage — source wording", "الموقع / النطاق — صياغة المصدر"), record.place],
    [uiText("Supporting detail — source wording", "التفصيل الداعم — صياغة المصدر"), record.marker]
  ];
  if (guide.basis && guide.basis.field !== "source_review") detailFields.push([uiText("Basis for stage label — original wording", "أساس تصنيف المرحلة — الصياغة الأصلية"), guide.basis.text]);
  if (guide.review?.locator) detailFields.push([uiText("Reviewed passage / page", "المقطع / الصفحة التي تمت مراجعتها"), guide.review.locator[activeLocale === "ar" ? 1 : 0]]);
  if (guide.review?.status === "reviewed") detailFields.push([uiText("Source access", "طريقة الوصول إلى المصدر"), guide.review.access === "indexed"
    ? uiText("Official source text read through the search index; this does not verify current link availability.", "قُرئ نص المصدر الرسمي عبر فهرس البحث؛ لا يثبت ذلك إتاحة الرابط حالياً.")
    : uiText("Official source text retrieved directly.", "استُرجع نص المصدر الرسمي مباشرةً.")]);
  const reviewStatus = guide.review ? `<p class="record-stage-note" data-review="${escapeHtml(guide.review.status)}">${localizedMarkup(recordReviewLabel(guide.review.status))}${guide.review.checkedAt ? ` · ${uiText("Checked", "فُحص في")} <time datetime="${escapeHtml(guide.review.checkedAt)}">${localizedMarkup(formatNewsDate(guide.review.checkedAt))}</time>` : ""}</p>` : "";
  const classificationSource = guide.review?.sourceUrl && guide.review.sourceUrl !== record.href
    ? `<p><a href="${escapeHtml(guide.review.sourceUrl)}" target="_blank" rel="noreferrer">${uiText("Open classification source (alternative official link)", "افتح مصدر التصنيف — رابط رسمي بديل")} <span aria-hidden="true">${uiText("↗", "↖")}</span></a></p>` : "";
  const recordLink = guide.id ? `<button type="button" class="record-copy-link" data-copy-record="${guide.id}" aria-label="${localizedMarkup(uiText("Copy record link: ", "انسخ رابط السجل: ") + recordTitle(record))}">${uiText("Copy record link", "انسخ رابط السجل")}</button>` : "";
  const programmeLink = programmeData.relatedProgrammes(guide.id).map(programme => `<a class="record-programme-link" href="${escapeHtml(libraryTools.historyUrl(window.location.href, programme.id, activeLocale))}">${uiText("Related history", "السجل الزمني المرتبط")}: ${localizedMarkup(programme.name[activeLocale === "ar" ? 1 : 0])} <span aria-hidden="true">${uiText("→", "←")}</span></a>`).join("");
  const deadline = deadlineData.resolve({records:[record]}, recordGuide).find(item => item.id === guide.id);
  return `<article class="evidence-record"${guide.id ? ` id="${guide.id}"` : ""} data-locale-control>
    <div class="record-heading-meta"><span>${localizedMarkup(localizedRecordFilter(record.filter))}</span><span>${localizedMarkup(localizedPeriodLabel(record.period))}</span><time datetime="${escapeHtml(record.date)}">${uiText("Published", "نُشر")} ${localizedMarkup(formatNewsDate(record.date))}</time></div>
    <h3 dir="auto" tabindex="-1">${localizedMarkup(recordTitle(record))}</h3>
    <p class="record-coverage"><span>${uiText("Coverage", "النطاق")}</span> <bdi dir="auto">${localizedMarkup(translatedText(record.place.split(" • ")[0]))}</bdi></p>
    <dl class="record-stages"><div><dt>${uiText("Financing stage", "مرحلة التمويل")}</dt><dd data-stage="${guide.finance}">${localizedMarkup(recordStageLabel("finance", guide.finance))}</dd></div><div><dt>${uiText("Delivery stage", "مرحلة التنفيذ")}</dt><dd data-stage="${guide.delivery}">${localizedMarkup(recordStageLabel("delivery", guide.delivery))}</dd></div></dl>
    ${reviewStatus}
    <div class="record-footer"><details class="record-detail"><summary>${uiText("Source details & classification basis", "تفاصيل المصدر وأساس التصنيف")}</summary>
    ${originalTitle}
    <p class="record-measure"><span>${uiText("Source figure / scope", "رقم المصدر / نطاقه")}</span><bdi dir="auto">${localizedMarkup(record.funding)}</bdi></p>
    ${guide.note ? `<p class="record-stage-note">${localizedMarkup(guide.note[activeLocale === "ar" ? 1 : 0])}</p>` : ""}
    ${deadline ? deadlineData.html(deadline, activeLocale, {compact:true}) : ""}
    ${programmeLink}
    <dl class="record-source-fields">${detailFields.map(([label, value]) => `<div><dt>${label}</dt><dd><bdi dir="auto">${localizedMarkup(value || uiText("Not stated", "غير مذكور"))}</bdi></dd></div>`).join("")}</dl>${classificationSource}${!guide.basis && !guide.note ? `<p class="record-stage-note">${uiText("No financing or delivery stage has been assigned in this index. Consult the original source; this is not a finding that no activity occurred.", "لم تُحدّد مرحلة تمويل أو تنفيذ في هذا الفهرس. راجع المصدر الأصلي؛ فهذا لا يعني عدم حدوث نشاط.")}</p>` : ""}</details><a href="${escapeHtml(record.href)}"${record.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${uiText("Open primary source", "افتح المصدر الأساسي")} <span aria-hidden="true">${uiText("↗", "↖")}</span></a>${recordLink}</div>
  </article>`;
}

function renderRecords({append = false} = {}) {
  const query = projectSearch.value.trim().toLowerCase();
  const filtered = records.filter(record => {
    const matchesFilter = activeFilter === "All" || record.filter === activeFilter;
    const matchesPeriod = activePeriod === "All" || record.period === activePeriod;
    const matchesArea = matchesRecordArea(record);
    const guide = recordGuide.get(record);
    const matchesStages = (activeRecordFinance === "All" || guide.finance === activeRecordFinance) && (activeRecordDelivery === "All" || guide.delivery === activeRecordDelivery);
    return (!activeRecordId || guide.id === activeRecordId) && matchesFilter && matchesPeriod && matchesArea && matchesStages && matchesRecordSearch(record, query);
  });
  visibleRecords = sortRecords(filtered);
  const signature = JSON.stringify([query,activeFilter,activePeriod,activeRecordArea,activeRecordFinance,activeRecordDelivery,activeRecordId,activeRecordSort,visibleRecords.map(record => recordGuide.get(record).id)]);
  if (signature !== recordQuerySignature) {
    renderedRecordLimit = recordBatchSize;
    recordQuerySignature = signature;
    append = false;
  }
  const expanded = [...(projectList.querySelectorAll?.(".record-detail[open]") || [])].map(detail => detail.closest("article").id);
  recordCount.textContent = activeLocale === "ar"
    ? `${visibleRecords.length} من أصل ${records.length} سجل مصدر${activePeriod === "All" ? "" : ` • ${localizedPeriodLabel(activePeriod)}`}`
    : `${visibleRecords.length} of ${records.length} source records${activePeriod === "All" ? "" : ` • ${localizedPeriodLabel(activePeriod)}`}`;
  const shown = visibleRecords.slice(0,renderedRecordLimit);
  if (append) {
    const existing = projectList.querySelectorAll(".evidence-record").length;
    projectList.insertAdjacentHTML("beforeend", shown.slice(existing).map(renderRecordCard).join(""));
  } else {
    projectList.innerHTML = shown.length ? shown.map(renderRecordCard).join("") : `<p class="empty-state" data-locale-control>${uiText("No source-backed records match this search. Try changing the category, period, coverage or stage filters.", "لا توجد سجلات تطابق هذا البحث. جرّب تغيير مرشحات الفئة أو الفترة أو النطاق أو المرحلة.")}</p>`;
    expanded.forEach(id => { const detail = document.querySelector(`#${id} .record-detail`); if (detail) detail.open = true; });
  }
  const status = document.querySelector("#recordBatchStatus");
  const more = document.querySelector("#loadMoreRecords");
  if (status) status.textContent = uiText(`Showing ${shown.length} of ${visibleRecords.length} matching records`, `يُعرض ${shown.length} من أصل ${visibleRecords.length} سجلاً مطابقاً`);
  if (more) {
    more.hidden = shown.length >= visibleRecords.length;
    more.textContent = uiText(`Show next ${Math.min(recordBatchSize, visibleRecords.length-shown.length)} records`, `اعرض السجلات ${Math.min(recordBatchSize, visibleRecords.length-shown.length)} التالية`);
  }
  renderLibraryLinkNotice();
}

function loadMoreRecords() {
  const firstNew = visibleRecords[renderedRecordLimit];
  renderedRecordLimit += recordBatchSize;
  renderRecords({append:true});
  if (firstNew) document.querySelector(`#${recordGuide.get(firstNew).id} h3`)?.focus({preventScroll:true});
}

function currentLibraryState() {
  return { q:projectSearch.value.trim(), type:activeFilter, period:activePeriod, area:activeRecordArea, finance:activeRecordFinance, delivery:activeRecordDelivery, sort:activeRecordSort, lang:activeLocale, record:activeRecordId, programme:libraryTools.readState(window.location.search).programme };
}

function syncLibraryUrl({ push = false } = {}) {
  const url = libraryTools.viewUrl(window.location.href, currentLibraryState());
  if (url !== window.location.href) window.history[push ? "pushState" : "replaceState"](null, "", url);
}

function syncLibraryControls() {
  recordAreaFilter.value = activeRecordArea;
  renderRecordStageControls();
  document.querySelectorAll(".filter-chip").forEach(button => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll(".period-filter-button, .library-period-button").forEach(button => {
    const selected = (button.dataset.period || button.dataset.libraryPeriod) === activePeriod;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (activePeriod !== "All" || activeRecordArea !== "All" || activeRecordFinance !== "All" || activeRecordDelivery !== "All") {
    const moreFilters = document.querySelector(".library-more-filters");
    if (moreFilters) moreFilters.open = true;
  }
}

function restoreLibraryLocation() {
  const state = libraryTools.readState(window.location.search);
  projectSearch.value = state.q;
  activeRecordSort = state.sort;
  activeFilter = state.type;
  activePeriod = state.period;
  activeRecordArea = state.area;
  activeRecordFinance = state.finance;
  activeRecordDelivery = state.delivery;
  activeRecordId = state.record;
  applyLocale(state.lang || activeLocale, { persist:false });
}

function renderLibraryLinkNotice() {
  const notice = document.querySelector("#libraryLinkNotice");
  if (!notice) return;
  notice.hidden = !activeRecordId;
  if (!activeRecordId) { notice.textContent = ""; return; }
  const exists = records.some(record => recordGuide.get(record).id === activeRecordId);
  const message = exists ? uiText("Viewing a permanently linked record.", "تُعرض نتيجة مرتبطة برابط دائم لسجل.") : uiText("This record link is not in the current dataset. It may have been withdrawn or the link may be incorrect.", "رابط السجل غير موجود في مجموعة البيانات الحالية. ربما سُحب السجل أو كان الرابط غير صحيح.");
  notice.innerHTML = `<p>${message}</p><button type="button" data-clear-record>${uiText("Return to all records", "العودة إلى كل السجلات")}</button>`;
}

function clearLibraryFilters() {
  activeFilter = activePeriod = activeRecordArea = activeRecordFinance = activeRecordDelivery = "All";
  activeRecordId = "";
  projectSearch.value = "";
  activeRecordSort = "latest";
  syncLibraryUrl({ push:true });
  applyLocale(activeLocale, { persist:false });
}

function libraryControlChanged({ push = true } = {}) {
  activeRecordId = "";
  syncLibraryControls();
  renderRecords();
  syncLibraryUrl({ push });
}

async function copyShareLink(url, programme = false) {
  const fallback = document.querySelector(programme ? "#programmeLinkFallback" : "#copyLinkFallback");
  const field = document.querySelector(programme ? "#programmeLinkField" : "#copyLinkField");
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard not available");
    await navigator.clipboard.writeText(url);
    if (fallback) fallback.hidden = true;
    showToast(uiText("Link copied", "تم نسخ الرابط"));
    return true;
  } catch (error) {
    if (fallback && field) { fallback.hidden = false; field.value = url; field.focus(); field.select(); }
    showToast(uiText("Automatic copying was unavailable. Select and copy the link shown.", "تعذر النسخ التلقائي. حدّد الرابط الظاهر وانسخه."));
    return false;
  }
}

function formatHistoryDate(date) {
  const monthOnly = /^\d{4}-\d{2}$/.test(date);
  return new Intl.DateTimeFormat(activeLocale === "ar" ? "ar-LB" : "en-GB", { year:"numeric", month:"long", ...(monthOnly ? {} : { day:"numeric" }), numberingSystem:"latn", timeZone:"UTC" }).format(new Date(`${date}${monthOnly ? "-01" : ""}T12:00:00Z`));
}

function renderLeapHistory() {
  renderHistory("leap", "#leapHistoryList", "#programmeHistoryScope");
}

function renderProgrammeHistory() {
  const select = document.querySelector("#programmeSelector");
  if (!select) return;
  const selected = libraryTools.readState(window.location.search).programme;
  const language = activeLocale === "ar" ? 1 : 0;
  select.innerHTML = programmeData.programmes.map(programme => `<option value="${programme.id}">${escapeHtml(programme.name[language])}</option>`).join("");
  select.value = selected;
  renderHistory(selected, "#relatedHistoryList", "#relatedHistoryScope");
}

function renderHistory(programmeId, listSelector, scopeSelector) {
  const list = document.querySelector(listSelector);
  const scope = document.querySelector(scopeSelector);
  if (!list || !scope) return;
  const language = activeLocale === "ar" ? 1 : 0;
  const events = programmeData.resolveEvents(seedData, recordGuide, programmeId);
  const programme = programmeData.programmes.find(item => item.id === programmeId);
  const reviewed = new Intl.DateTimeFormat(activeLocale === "ar" ? "ar-LB" : "en-GB", { dateStyle:"medium", numberingSystem:"latn" }).format(new Date(seedData.reviewedAt));
  scope.textContent = uiText(`Selected sources from the dataset reviewed ${reviewed}. Dates below are publication dates; a month-only date stays at month precision.`, `مصادر مختارة من مجموعة البيانات المراجَعة في ${reviewed}. التواريخ أدناه للنشر؛ ويُحفظ التاريخ المحدد بالشهر فقط دون إضافة يوم.`);
  if (programme.note) scope.textContent = programme.note[language];
  list.innerHTML = events.map(event => {
    const meta = event.record ? recordGuide.get(event.record) : null;
    const title = event.title?.[language] || (event.record ? recordTitle(event.record) : uiText("Source unavailable in this dataset", "المصدر غير متاح في مجموعة البيانات هذه"));
    const originalTitle = event.record?.name || event.source?.name || "";
    const notes = [meta?.note?.[language], event.note?.[language]].filter(Boolean);
    const recordLink = meta?.id ? libraryTools.recordUrl(window.location.href, meta.id, activeLocale) : null;
    const deadline = meta ? deadlineData.resolve(seedData, recordGuide).find(item => item.id === meta.id) : null;
    return `<li id="${listSelector === "#leapHistoryList" ? "" : "related-"}${event.id}"><div class="programme-event-date"><time datetime="${event.date}">${localizedMarkup(formatHistoryDate(event.date))}</time><span>${localizedMarkup(event.kind[language])}</span></div><article class="programme-event"><h3>${localizedMarkup(title)}</h3>${activeLocale === "ar" && originalTitle ? `<p class="record-original">عنوان السجل الأصلي<bdi dir="auto" lang="en">${escapeHtml(originalTitle)}</bdi></p>` : ""}${event.record ? `<p class="record-coverage">${uiText("Coverage", "النطاق")}: <bdi dir="auto">${localizedMarkup(event.record.place)}</bdi></p>` : ""}${notes.map(note => `<p>${localizedMarkup(note)}</p>`).join("")}${meta ? `<dl class="record-stages"><div><dt>${uiText("Financing stage", "مرحلة التمويل")}</dt><dd>${localizedMarkup(recordStageLabel("finance", meta.finance))}</dd></div><div><dt>${uiText("Delivery stage", "مرحلة التنفيذ")}</dt><dd>${localizedMarkup(recordStageLabel("delivery", meta.delivery))}</dd></div></dl><p class="record-stage-note">${localizedMarkup(recordReviewLabel(meta.review.status))}${meta.review.checkedAt ? ` · ${localizedMarkup(formatHistoryDate(meta.review.checkedAt))}` : ""}</p>` : ""}${deadline ? deadlineData.html(deadline,activeLocale,{compact:true}) : ""}<div class="programme-event-links">${event.href ? `<a href="${escapeHtml(event.href)}" target="_blank" rel="noreferrer">${uiText("Open primary source", "افتح المصدر الأساسي")} <span aria-hidden="true">${uiText("↗", "↖")}</span></a>` : `<p>${uiText("The linked source is missing from this dataset.", "المصدر المرتبط غير موجود في مجموعة البيانات هذه.")}</p>`}${recordLink ? `<a href="${escapeHtml(recordLink)}">${uiText("Open this record", "افتح هذا السجل")} <span aria-hidden="true">${uiText("→", "←")}</span></a>` : ""}</div></article></li>`;
  }).join("");
}
