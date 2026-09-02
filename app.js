const seedData = window.OBSERVATORY_DATA;
let records = [...seedData.records];
let sectors = [...seedData.sectors];
let sources = [...seedData.sources];
let news = [...(seedData.news || [])];
const actors = [...seedData.actors];
const actions = [...seedData.actions];
const framework = seedData.framework;
let apiAvailable = false;
const GITHUB_PAGES_ORIGIN = "https://thepolicyinitiative.github.io";
const LIVE_API_ORIGIN = "https://rebuild-lebanon.tpichatgpt.chatgpt.site";
const apiUrl = pathname => window.location.origin === GITHUB_PAGES_ORIGIN ? `${LIVE_API_ORIGIN}${pathname}` : pathname;
let activeLocale = "en";
try {
  activeLocale = window.localStorage.getItem("observatory-language") === "ar" ? "ar" : "en";
} catch (error) {
  activeLocale = "en";
}

const arabicText = Object.freeze({
  "Overview": "نظرة عامة",
  "Response": "الاستجابة",
  "Response tracker": "متابعة الاستجابة",
  "Actors & actions": "الجهات الفاعلة والإجراءات",
  "Impact map": "خريطة الأثر",
  "Map": "الخريطة",
  "Evidence": "الأدلة",
  "Evidence briefs": "موجزات الأدلة",
  "Data library": "مكتبة البيانات",
  "Funding": "التمويل",
  "Funding flows": "مسارات التمويل",
  "LEAP": "ليب",
  "LEAP dossier": "ملف ليب",
  "Updates": "التحديثات",
  "Live updates": "تحديثات مباشرة",
  "Sources": "المصادر",
  "OBSERVATORY": "المرصد",
  "OVERVIEW": "نظرة عامة",
  "RESPONSE TRACKER": "متابعة الاستجابة",
  "ACTORS & ACTIONS": "الجهات الفاعلة والإجراءات",
  "IMPACT MAP": "خريطة الأثر",
  "EVIDENCE BRIEFS": "موجزات الأدلة",
  "SECTOR MATRIX": "مصفوفة القطاعات",
  "DATA LIBRARY": "مكتبة البيانات",
  "FUNDING FLOWS": "مسارات التمويل",
  "LEAP DOSSIER": "ملف ليب",
  "LIVE UPDATES": "تحديثات مباشرة",
  "Check sources": "تحقق من المصادر",
  "Download data": "تنزيل البيانات",
  "LEBANON RECONSTRUCTION OBSERVATORY": "مرصد إعادة إعمار لبنان",
  "Track rebuilding": "تابع إعادة الإعمار",
  "with evidence.": "بالأدلة.",
  "A source-backed public record connecting damage assessments, response actors, actions, financing and recovery signals, with clear boundaries on what the evidence can and cannot prove.": "سجل عام مدعوم بالمصادر يربط تقييمات الأضرار والجهات الفاعلة والإجراءات والتمويل ومؤشرات التعافي، مع توضيح ما يمكن للأدلة إثباته وما لا يمكنها إثباته.",
  "Explore data library": "استكشف مكتبة البيانات",
  "LEBANON": "لبنان",
  "Recovery & reconstruction needs": "احتياجات التعافي وإعادة الإعمار",
  "Physical damages assessed": "الأضرار المادية المقدرة",
  "Initial LEAP financing": "تمويل ليب الأولي",
  "Buildings damaged or destroyed": "المباني المتضررة أو المدمرة",
  "Across 10 assessed sectors": "عبر 10 قطاعات جرى تقييمها",
  "of a $1B scalable framework": "ضمن إطار قابل للتوسع بقيمة مليار دولار",
  "RESPONSE ARCHITECTURE": "هيكل الاستجابة",
  "From evidence to delivery": "من الأدلة إلى التنفيذ",
  "The observatory separates assessments, financing, relief and implementation so planned activity is never presented as completed reconstruction.": "يفصل المرصد بين التقييمات والتمويل والإغاثة والتنفيذ حتى لا يتم عرض النشاط المخطط على أنه إعادة إعمار مكتملة.",
  "All evidence": "كل الأدلة",
  "All records": "كل السجلات",
  "2024 response": "استجابة 2024",
  "2026 response": "استجابة 2026",
  "After 2024 war": "ما بعد حرب 2024",
  "After 2026 war": "ما بعد حرب 2026",
  "CHOOSE A CONFLICT PERIOD": "اختر فترة النزاع",
  "CONFLICT PERIOD": "فترة النزاع",
  "AFTER THE 2024 WAR": "ما بعد حرب 2024",
  "AFTER THE 2026 WAR": "ما بعد حرب 2026",
  "AFTER-WAR COMPARISON": "مقارنة ما بعد الحرب",
  "What changed in the recovery picture": "ما الذي تغير في مسار التعافي",
  "Use this matrix to compare the role of each evidence set, not to rank the scale of two differently scoped assessments.": "استخدم هذه المصفوفة لمقارنة دور كل مجموعة أدلة، لا لترتيب حجم تقييمين يختلف نطاقهما.",
  "COMPARISON LENS": "محور المقارنة",
  "AFTER 2024 WAR": "ما بعد حرب 2024",
  "AFTER 2026 WAR": "ما بعد حرب 2026",
  "Assessment frame": "إطار التقييم",
  "What the evidence covers": "ما يغطيه الدليل",
  "First priority": "الأولوية الأولى",
  "What follows from the evidence": "ما يتبع من الدليل",
  "Delivery position": "موضع التنفيذ",
  "What the records prove": "ما تثبته السجلات",
  "How to interpret it": "كيفية تفسيره",
  "Correct comparison": "المقارنة السليمة",
  "A national, multi-sector damage, loss and recovery-needs baseline covering the 2023 to 2024 conflict period.": "خط أساس وطني متعدد القطاعات للأضرار والخسائر واحتياجات التعافي يغطي فترة النزاع من 2023 إلى 2024.",
  "A rapid, building-focused assessment for Beirut and Mount Lebanon using GeoAI, satellite imagery and field verification.": "تقييم سريع يركز على المباني في بيروت وجبل لبنان ويستخدم الذكاء الاصطناعي الجغرافي وصور الأقمار الصناعية والتحقق الميداني.",
  "Recovery costing, financing pathways, recovery prioritisation and area-based local planning.": "تقدير كلفة التعافي ومسارات التمويل وتحديد الأولويات والتخطيط المحلي القائم على المناطق.",
  "Life-saving assistance, service continuity, rapid recovery prioritisation and support for affected communities.": "المساعدة المنقذة للحياة واستمرارية الخدمات وتحديد أولويات التعافي السريع ودعم المجتمعات المتضررة.",
  "A recovery framework and early delivery pathway. It does not by itself prove that projects were completed.": "إطار للتعافي ومسار مبكر للتنفيذ. ولا يثبت بمفرده أن المشاريع قد اكتملت.",
  "An initial response and recovery evidence base. It does not constitute a national reconstruction total or a completed-works register.": "قاعدة أدلة أولية للاستجابة والتعافي. ولا تشكل إجمالي إعادة إعمار وطني أو سجلاً للأعمال المكتملة.",
  "Use it to understand the nationwide post-war baseline and the financing architecture that followed.": "استخدمه لفهم خط الأساس الوطني بعد الحرب وبنية التمويل التي تلتها.",
  "Use it to understand immediate after-war impacts and the response transition into recovery.": "استخدمه لفهم الآثار المباشرة بعد الحرب وانتقال الاستجابة إلى التعافي.",
  "POST-WAR EVIDENCE ROUTES": "مسارات الأدلة بعد الحرب",
  "Follow each aftermath from assessment to action": "تتبع كل مرحلة ما بعد الحرب من التقييم إلى الإجراء",
  "These track summaries draw from the same public-source registry as the detailed actor, action and data-library views below.": "تعتمد ملخصات المسارات هذه على سجل المصادر العامة نفسه المستخدم في عروض الجهات الفاعلة والإجراءات ومكتبة البيانات أدناه.",
  "National baseline to recovery architecture": "من خط الأساس الوطني إلى هيكل التعافي",
  "Start with nationwide needs and damage evidence, then trace recovery financing, safeguards, municipal priorities and early implementation pathways.": "ابدأ بأدلة الاحتياجات والأضرار على مستوى البلاد، ثم تتبع تمويل التعافي والضمانات والأولويات البلدية ومسارات التنفيذ المبكرة.",
  "Rapid recovery and service continuity": "التعافي السريع واستمرارية الخدمات",
  "Start with rapid impact evidence and emergency operations, then trace service continuity, protection, local response and recovery preparation.": "ابدأ بأدلة الأثر السريع والعمليات الطارئة، ثم تتبع استمرارية الخدمات والحماية والاستجابة المحلية والتحضير للتعافي.",
  "SHARED SYSTEMS": "الأنظمة المشتركة",
  "Recovery capacities that span both aftermaths": "قدرات التعافي التي تمتد عبر مرحلتي ما بعد الحرب",
  "These records connect local systems, livelihoods, resilience and long-term public-service capacity. They remain separate to prevent double counting.": "تربط هذه السجلات بين الأنظمة المحلية وسبل العيش والقدرة على الصمود وقدرة الخدمات العامة على المدى الطويل. وهي تبقى منفصلة لمنع العد المزدوج.",
  "source records": "سجلات المصدر",
  "named actors": "جهات فاعلة محددة",
  "documented actions": "إجراءات موثقة",
  "DETAILED EVIDENCE PROFILE": "ملف الأدلة التفصيلي",
  "Who is active and what is documented": "من هم الفاعلون وما الذي جرى توثيقه",
  "Each bar represents the share of public-source entries tagged to an aftermath. Counts describe this observatory library, not the total scale of real-world operations.": "يمثل كل شريط حصة السجلات ذات المصدر العام المصنفة لمرحلة ما بعد الحرب. وتصف الأعداد مكتبة هذا المرصد، لا الحجم الكلي للعمليات الفعلية.",
  "Actors": "الجهات الفاعلة",
  "Actions": "الإجراءات",
  "Evidence records": "سجلات الأدلة",
  "Open full 2024 record set": "افتح كامل سجل ما بعد حرب 2024",
  "Open full 2026 record set": "افتح كامل سجل ما بعد حرب 2026",
  "EVIDENCE DISCIPLINE": "انضباط الأدلة",
  "do not equate an announcement or a framework with financed delivery": "لا تساوِ بين الإعلان أو الإطار وبين تنفيذ ممول",
  "RECOVERY PATHWAY": "مسار التعافي",
  "Evidence-led view": "عرض قائم على الأدلة",
  "Assess": "التقييم",
  "Measure needs": "قياس الاحتياجات",
  "Fund": "التمويل",
  "Approve & disburse": "الاعتماد والصرف",
  "Deliver": "التنفيذ",
  "Contract & restore": "التعاقد والاستعادة",
  "Who is acting?": "من هي الجهات الفاعلة؟",
  "What is happening?": "ما الذي يحدث؟",
  "Actors and documented actions": "الجهات الفاعلة والإجراءات الموثقة",
  "ACTORS": "الجهات الفاعلة",
  "ACTIONS": "الإجراءات",
  "Who is involved": "الجهات المشاركة",
  "What is documented": "ما هو موثق",
  "Actors are grouped by institutional position, from public bodies to local authorities and community initiatives.": "تُجمع الجهات الفاعلة بحسب موقعها المؤسسي، من الهيئات العامة إلى السلطات المحلية والمبادرات المجتمعية.",
  "Each activity has a main category, a subcategory and a separate implementation stage.": "لكل نشاط فئة رئيسية وفئة فرعية ومرحلة تنفيذ مستقلة.",
  "Each entry shows an actor group and the documented response role.": "يعرض كل سجل مجموعة الجهة الفاعلة ودور الاستجابة الموثق.",
  "Each entry separates action category, subcategory and implementation stage.": "يفصل كل سجل بين فئة الإجراء والفئة الفرعية ومرحلة التنفيذ.",
  "Named organisations and actions drawn from public online sources. Every entry opens its original publication.": "جهات فاعلة وإجراءات محددة مأخوذة من مصادر عامة على الإنترنت. يفتح كل سجل منشوره الأصلي.",
  "Each entry shows an actor group, response role and original online source.": "يعرض كل سجل مجموعة الجهة الفاعلة ودور الاستجابة والمصدر الأصلي على الإنترنت.",
  "Each entry separates action category, subcategory, implementation stage and original online source.": "يفصل كل سجل بين فئة الإجراء والفئة الفرعية ومرحلة التنفيذ والمصدر الأصلي على الإنترنت.",
  "VISUAL RECORD": "سجل بصري",
  "Response in operation": "الاستجابة قيد التنفيذ",
  "Official photographs connect the public record to humanitarian operations, water-service continuity and field assessment.": "تربط الصور الرسمية السجل العام بالعمليات الإنسانية واستمرارية خدمات المياه والتقييم الميداني.",
  "HUMANITARIAN OPERATIONS": "عمليات إنسانية",
  "Emergency support alongside local responders": "دعم طارئ إلى جانب المستجيبين المحليين",
  "WATER SERVICE": "خدمة المياه",
  "Keeping essential water systems running": "الحفاظ على تشغيل أنظمة المياه الأساسية",
  "FIELD ASSESSMENT": "تقييم ميداني",
  "Documenting damage to guide recovery": "توثيق الأضرار لتوجيه التعافي",
  "GOVERNANCE": "الحوكمة",
  "Procurement & accountable investment": "المشتريات والاستثمار الخاضع للمساءلة",
  "UNDP’s area-based local programme supports municipalities and unions to strengthen public-procurement practice, helping make local investment decisions more transparent and delivery-ready.": "يدعم برنامج الأمم المتحدة الإنمائي المحلي القائم على المناطق البلديات واتحادات البلديات لتعزيز ممارسات المشتريات العامة، بما يساعد على جعل قرارات الاستثمار المحلي أكثر شفافية وجاهزية للتنفيذ.",
  "Open governance context": "افتح سياق الحوكمة",
  "MUNICIPAL RECOVERY WORK": "العمل البلدي للتعافي",
  "Local systems that turn recovery plans into services": "أنظمة محلية تحوّل خطط التعافي إلى خدمات",
  "Municipal work is shown as evidence, planning, readiness or implementation support. It should not be read as proof that every listed intervention is complete.": "يُعرض العمل البلدي بوصفه دليلاً أو تخطيطاً أو جاهزية أو دعماً للتنفيذ. ولا ينبغي اعتباره دليلاً على اكتمال كل تدخل مدرج.",
  "EVIDENCE": "الأدلة",
  "ACTIVE PROGRAMME": "برنامج نشط",
  "RESPONSE PLAN": "خطة الاستجابة",
  "COMMUNITY READINESS": "الجاهزية المجتمعية",
  "GOVERNANCE": "الحوكمة",
  "Municipal damage & needs reporting": "إبلاغ بلدي عن الأضرار والاحتياجات",
  "Municipalities, their unions and governorate Disaster Risk Management units contributed local evidence on displacement, service disruption, infrastructure and livelihoods after the escalation.": "قدمت البلديات واتحاداتها ووحدات إدارة مخاطر الكوارث في المحافظات أدلة محلية حول النزوح وتعطل الخدمات والبنية التحتية وسبل العيش بعد التصعيد.",
  "Open local assessment": "افتح التقييم المحلي",
  "Local platforms, observatories & plans": "منصات محلية ومراصد وخطط",
  "UNDP’s Local Development Project is designed to strengthen local capacity to plan, prioritise and deliver inclusive services through locally owned development plans and evidence platforms.": "صُمم مشروع التنمية المحلية لبرنامج الأمم المتحدة الإنمائي لتعزيز قدرة الجهات المحلية على التخطيط وتحديد الأولويات وتقديم خدمات شاملة عبر خطط تنمية محلية ومنصات أدلة مملوكة محلياً.",
  "Open programme context": "افتح سياق البرنامج",
  "Essential services & public spaces": "الخدمات الأساسية والفضاءات العامة",
  "The 2026 response framework identifies municipal and union support across water, wastewater, energy, firefighting, education, health, agriculture and public-space rehabilitation.": "يحدد إطار الاستجابة لعام 2026 دعماً للبلديات والاتحادات في المياه والصرف الصحي والطاقة ومكافحة الحرائق والتعليم والصحة والزراعة وتأهيل الفضاءات العامة.",
  "Open service framework": "افتح إطار الخدمات",
  "Preparedness & municipal resource use": "الاستعداد واستخدام الموارد البلدية",
  "Municipalities and community committees are supported to improve local readiness, coordination, first-aid and fire-response capacity, and use of existing municipal resources.": "تتلقى البلديات واللجان المجتمعية دعماً لتحسين الجاهزية المحلية والتنسيق وقدرات الإسعافات الأولية والاستجابة للحرائق واستخدام الموارد البلدية المتاحة.",
  "Open community update": "افتح تحديث المجتمع المحلي",
  "RECOVERY PRIORITIES": "أولويات التعافي",
  "Tyre Caza recovery priorities": "أولويات التعافي في قضاء صور",
  "Eight municipalities in Tyre Caza identified solid waste, water and wastewater, flood risk, and municipal and agricultural infrastructure as priorities following the 2024 escalation.": "حددت ثماني بلديات في قضاء صور إدارة النفايات الصلبة والمياه والصرف الصحي ومخاطر الفيضانات والبنية التحتية البلدية والزراعية كأولويات بعد تصعيد 2024.",
  "Open municipal priorities": "افتح أولويات البلديات",
  "INSTITUTION BUILDING": "بناء المؤسسات",
  "Local observatories & development plans": "المراصد المحلية وخطط التنمية",
  "Local Development Platforms, observatories and locally owned plans give municipalities an evidence base to prioritise recovery, service delivery and resilient local investment.": "توفر منصات التنمية المحلية والمراصد والخطط المملوكة محلياً للبلديات قاعدة أدلة لتحديد أولويات التعافي وتقديم الخدمات والاستثمار المحلي المرن.",
  "Open local-development programme": "افتح برنامج التنمية المحلية",
  "INTEGRATED DELIVERY": "تنفيذ متكامل",
  "Services, livelihoods & social stability": "الخدمات وسبل العيش والاستقرار الاجتماعي",
  "Area-based municipal work combines infrastructure, renewable energy, water management and local economic support with community dialogue and social-stability measures.": "يجمع العمل البلدي القائم على المناطق بين البنية التحتية والطاقة المتجددة وإدارة المياه والدعم الاقتصادي المحلي والحوار المجتمعي وتدابير الاستقرار الاجتماعي.",
  "Open integrated-delivery context": "افتح سياق التنفيذ المتكامل",
  "Public officials and institutions": "المسؤولون والمؤسسات العامة",
  "NGOs, international organizations, and UN actors": "المنظمات غير الحكومية والمنظمات الدولية وجهات الأمم المتحدة",
  "Municipal and local authorities": "السلطات البلدية والمحلية",
  "Community initiatives": "المبادرات المجتمعية",
  "Financial actions": "الإجراءات المالية",
  "Damage assessment and management": "تقييم الأضرار وإدارتها",
  "Relief and community recovery": "الإغاثة والتعافي المجتمعي",
  "Reconstruction and implementation": "إعادة الإعمار والتنفيذ",
  "Financing": "التمويل",
  "Compensation": "التعويض",
  "Damage and needs assessment": "تقييم الأضرار والاحتياجات",
  "Rubble clearance or debris treatment and disposal": "إزالة الركام أو معالجته والتخلص منه",
  "Relief": "الإغاثة",
  "Shelter": "الإيواء",
  "Community recovery": "التعافي المجتمعي",
  "Reconstruction and public-service restoration": "إعادة الإعمار واستعادة الخدمات العامة",
  "Procurement and contracting": "المشتريات والتعاقد",
  "Strategy and coordination": "الاستراتيجية والتنسيق",
  "Stage:": "المرحلة:",
  "Actor:": "الجهة الفاعلة:",
  "SOURCE-INFORMED GEOGRAPHY": "جغرافيا مدعومة بالمصادر",
  "Recovery status, place by place": "وضع التعافي، منطقة بمنطقة",
  "Damage severity": "شدة الأضرار",
  "Funding status": "حالة التمويل",
  "Implementation status": "حالة التنفيذ",
  "Jaafari School after the conflict": "مدرسة الجعفري بعد النزاع",
  "Conflict damage in a Nabatieh neighbourhood": "أضرار النزاع في أحد أحياء النبطية",
  "Occupation locations": "مواقع الاحتلال",
  "OCCUPATION LOCATIONS": "مواقع الاحتلال",
  "How the map works": "كيفية عمل الخريطة",
  "Recovery status, district by district": "حالة التعافي، قضاءً بقضاء",
  "DISTRICT VIEW": "عرض القضاء",
  "District": "القضاء",
  "Town locator": "محدد موقع البلدة",
  "TOWN LOCATOR": "محدد موقع البلدة",
  "Occupation location": "موقع احتلال",
  "OCCUPATION LOCATION": "موقع احتلال",
  "Reported IDF-held position": "موقع معلن خاضع لتمركز الجيش الإسرائيلي",
  "Reported Israeli-held positions": "مواقع معلن خاضعة لتمركز إسرائيلي",
  "Israeli military locations monitored by UNIFIL": "مواقع عسكرية إسرائيلية تراقبها اليونيفيل",
  "5 POSTS": "5 مواقع",
  "REPORTED": "مُبلّغ عنه",
  "Reported location": "الموقع المُبلغ عنه",
  "Map treatment": "تمثيل الخريطة",
  "Town-level locator": "محدد موقع على مستوى البلدة",
  "Town": "البلدة",
  "Governorate context": "سياق المحافظة",
  "Five town-adjacent positions": "خمسة مواقع قرب بلدات",
  "Point markers only": "علامات نقطية فقط",
  "UNIFIL / UN Security Council": "اليونيفيل / مجلس الأمن التابع للأمم المتحدة",
  "Approximate nearby-town marker": "علامة تقريبية قرب البلدة",
  "Open UN Security Council report": "افتح تقرير مجلس الأمن التابع للأمم المتحدة",
  "Higher assessed impact": "أثر مقدر أعلى",
  "Assessed impact": "أثر مقدر",
  "No comparable score published": "لا توجد درجة قابلة للمقارنة منشورة",
  "Priority area in national framework": "منطقة أولوية في الإطار الوطني",
  "National funding context only": "سياق تمويل وطني فقط",
  "No governorate allocation published": "لا يوجد تخصيص منشور للمحافظة",
  "Assessment / planning documented": "تقييم أو تخطيط موثق",
  "Framework support documented": "دعم الإطار موثق",
  "No verified completion data": "لا توجد بيانات إنجاز متحققة",
  "DATA LIBRARY": "مكتبة البيانات",
  "Search records, programs, or sources": "ابحث في السجلات أو البرامج أو المصادر",
  "All records": "كل السجلات",
  "Assessment": "تقييم",
  "Local recovery": "تعافٍ محلي",
  "Sort": "ترتيب",
  "Latest first": "الأحدث أولاً",
  "Largest financial scale": "أكبر قيمة مالية",
  "FOLLOW THE MONEY": "تتبع التمويل",
  "A staged financing": "صورة تمويلية",
  "picture.": "متدرجة.",
  "The RDNA estimates $3–5B of public financing and $6–8B of private financing will be required. LEAP provides a source-backed starting layer for priority public recovery.": "يقدّر تقييم الأضرار والاحتياجات أن التمويل العام المطلوب يتراوح بين 3 و5 مليارات دولار، والتمويل الخاص بين 6 و8 مليارات دولار. ويوفّر ليب طبقة انطلاق مدعومة بالمصادر لأولوية التعافي العام.",
  "Explore LEAP details": "استكشف تفاصيل ليب",
  "Funding flow visualization": "تصور مسارات التمويل",
  "01 · NEED ESTIMATE": "01 · تقدير الاحتياج",
  "National recovery and reconstruction need": "احتياج التعافي وإعادة الإعمار الوطني",
  "02 · PUBLIC FINANCING REQUIREMENT": "02 · متطلب التمويل العام",
  "Indicative public financing need, including infrastructure": "احتياج إرشادي للتمويل العام، يشمل البنية التحتية",
  "03 · AVAILABLE STARTING FINANCE": "03 · التمويل الأولي المتاح",
  "Initial World Bank finance within a $1B scalable framework": "تمويل أولي من البنك الدولي ضمن إطار قابل للتوسع بقيمة مليار دولار",
  "Different stages of the financing picture — do not add them together.": "هذه مراحل مختلفة من الصورة التمويلية — لا تجمعها معاً.",
  "RDNA recovery need": "احتياج التعافي وفق التقييم الوطني",
  "$11B over recovery & reconstruction": "11 مليار دولار للتعافي وإعادة الإعمار",
  "Public financing need": "احتياج التمويل العام",
  "$3–5B, including public infrastructure": "3 إلى 5 مليارات دولار، تشمل البنية التحتية العامة",
  "LEAP starting layer": "طبقة انطلاق ليب",
  "$250M of a $1B scalable framework": "250 مليون دولار ضمن إطار قابل للتوسع بقيمة مليار دولار",
  "FINANCING INTERPRETATION": "تفسير التمويل",
  "Read the funding picture without double counting.": "اقرأ صورة التمويل من دون احتساب مزدوج.",
  "Needs estimates, framework ceilings, approved finance and verified spending are different stages. They should not be added together.": "تقديرات الاحتياجات وسقوف الإطار والتمويل المعتمد والإنفاق المتحقق هي مراحل مختلفة ولا ينبغي جمعها معاً.",
  "NEED ESTIMATE": "تقدير الاحتياج",
  "01 · NEED ESTIMATE": "01 · تقدير الاحتياج",
  "PUBLIC FINANCING NEED": "احتياج التمويل العام",
  "02 · PUBLIC FINANCING NEED": "02 · احتياج التمويل العام",
  "PRIVATE FINANCING NEED": "احتياج التمويل الخاص",
  "03 · PRIVATE FINANCING NEED": "03 · احتياج التمويل الخاص",
  "LEAP FINANCE AVAILABLE": "تمويل ليب المتاح",
  "04 · LEAP FINANCE AVAILABLE": "04 · تمويل ليب المتاح",
  "Recovery and reconstruction need": "احتياج التعافي وإعادة الإعمار",
  "Public-sector requirement": "متطلب القطاع العام",
  "Private-sector requirement": "متطلب القطاع الخاص",
  "Initial World Bank financing": "تمويل البنك الدولي الأولي",
  "The RDNA estimates what recovery could require. It is not a pool of committed funds.": "يقدّر التقييم ما قد يتطلبه التعافي. ولا يمثل رصيداً من الأموال الملتزم بها.",
  "This includes infrastructure and public-service recovery that needs public financing to be mobilised.": "يشمل ذلك البنية التحتية وتعافي الخدمات العامة التي تتطلب حشد تمويل عام.",
  "This relates principally to housing, commerce, industry and tourism. It is separate from LEAP's public framework.": "يتصل ذلك أساساً بالإسكان والتجارة والصناعة والسياحة، وهو منفصل عن الإطار العام لليب.",
  "Available financing inside a $1B scalable public-recovery framework. The remaining framework gap is not financed.": "تمويل متاح ضمن إطار قابل للتوسع للتعافي العام بقيمة مليار دولار. أما الفجوة المتبقية في الإطار فليست ممولة.",
  "MONEY TO DELIVERY": "من التمويل إلى التنفيذ",
  "What moves a financing announcement into a verifiable public result": "ما الذي يحول إعلان التمويل إلى نتيجة عامة يمكن التحقق منها",
  "Need and eligibility": "الاحتياج والأهلية",
  "Finance approved": "تم اعتماد التمويل",
  "Scope and tender": "النطاق والمناقصة",
  "Contract and delivery": "التعاقد والتنفيذ",
  "Reporting and assurance": "التقارير والضمان",
  "Damage, safety and local-service evidence establish what can be prioritised.": "تحدد أدلة الأضرار والسلامة والخدمات المحلية ما يمكن إعطاؤه الأولوية.",
  "A loan, grant or budget commitment identifies funds available for a defined purpose.": "يحدد القرض أو المنحة أو التزام الموازنة الأموال المتاحة لغرض محدد.",
  "Technical designs, procurement plans and tender notices make proposed work traceable.": "تجعل التصاميم الفنية وخطط المشتريات وإعلانات المناقصات العمل المقترح قابلاً للتتبع.",
  "Award notices, supervision and site evidence distinguish contracted work from completed work.": "تميّز إشعارات الترسية والإشراف وأدلة الموقع بين الأعمال المتعاقد عليها والأعمال المنجزة.",
  "Financial reports, audits and independent monitoring help verify use of funds and delivery claims.": "تساعد التقارير المالية وعمليات التدقيق والمراقبة المستقلة على التحقق من استخدام الأموال وادعاءات التنفيذ.",
  "TRANSPARENCY CHECK": "فحص الشفافية",
  "For LEAP, the public trail should include procurement plans, tenders, awards, quarterly progress records and independent monitoring evidence as they are disclosed.": "بالنسبة إلى ليب، ينبغي أن يشمل المسار العام خطط المشتريات والمناقصات والترسيات وسجلات التقدم الفصلية وأدلة المراقبة المستقلة عند الإفصاح عنها.",
  "Open RDNA": "افتح تقييم الأضرار والاحتياجات",
  "Open LEAP factsheet": "افتح نشرة ليب",
  "MEDIA CONTEXT": "سياق إعلامي",
  "REUTERS INTERVIEW · 28 FEB 2025": "مقابلة رويترز · 28 فبراير 2025",
  "Finance Minister's reconstruction-fund perspective": "رؤية وزير المالية لصندوق إعادة الإعمار",
  "Reuters reported that Finance Minister Yassine Jaber described an anticipated $1B reconstruction framework, with $250M in World Bank seed financing and an expected $750M from donors. This is a ministerial statement at that date, not evidence that the full framework gap was committed, disbursed or spent.": "أفادت رويترز بأن وزير المالية ياسين جابر وصف إطاراً متوقعاً لإعادة الإعمار بقيمة مليار دولار، مع 250 مليون دولار كتمويل تأسيسي من البنك الدولي و750 مليون دولار متوقعة من المانحين. وهذا تصريح وزاري في ذلك التاريخ، وليس دليلاً على أن فجوة الإطار كاملة قد التُزم بها أو صُرفت أو أُنفقت.",
  "Read Reuters coverage": "اقرأ تغطية رويترز",
  "Reuters story republished by Yahoo": "قصة رويترز معاد نشرها عبر ياهو",
  "WORLD BANK / GOVERNMENT OF LEBANON": "البنك الدولي / حكومة لبنان",
  "LEAP: the implementation dossier": "ليب: ملف التنفيذ",
  "Read the World Bank factsheet": "اقرأ نشرة البنك الدولي",
  "LEBANON EMERGENCY ASSISTANCE PROJECT": "مشروع المساعدة الطارئة للبنان",
  "A scalable vehicle for public recovery, not a completed-work count.": "أداة قابلة للتوسع للتعافي العام، وليست عداداً للأعمال المنجزة.",
  "LEAP is a government-led reconstruction project financed by the World Bank to restore lifeline services and critical public infrastructure in conflict-affected areas. It is structured to sequence response, recovery and early reconstruction as financing becomes available.": "ليب مشروع لإعادة الإعمار تقوده الحكومة ويموله البنك الدولي لاستعادة الخدمات الأساسية والبنية التحتية العامة الحيوية في المناطق المتأثرة بالنزاع. وقد صمم لتسلسل الاستجابة والتعافي وإعادة الإعمار المبكرة مع إتاحة التمويل.",
  "Implemented by": "التنفيذ بواسطة",
  "Initial approval": "الاعتماد الأولي",
  "FRAMEWORK SIZE": "حجم الإطار",
  "FINANCING AVAILABLE": "التمويل المتاح",
  "FINANCING GAP": "فجوة التمويل",
  "INITIAL HORIZON": "الأفق الأولي",
  "scalable total project envelope": "إجمالي قابل للتوسع لمظروف المشروع",
  "initial World Bank financing": "تمويل أولي من البنك الدولي",
  "additional grants or loans to be mobilized": "منح أو قروض إضافية ينبغي حشدها",
  "months of priority investment needs": "أشهر من احتياجات الاستثمار ذات الأولوية",
  "COMPONENT ENVELOPE": "مظروف المكونات",
  "What the $1B framework is designed to fund": "ما الذي صُمم إطار المليار دولار لتمويله",
  "Available financing is separate from the remaining framework gap. Amounts in US$ millions.": "التمويل المتاح منفصل عن فجوة الإطار المتبقية. المبالغ بملايين الدولارات الأمريكية.",
  "Component": "المكوّن",
  "Available": "المتاح",
  "Gap": "الفجوة",
  "Framework total": "إجمالي الإطار",
  "Immediate response": "الاستجابة الفورية",
  "Rubble management, unsafe buildings, heritage assessment, road access": "إدارة الركام والمباني غير الآمنة وتقييم التراث وإتاحة الطرق",
  "Restore public lifelines": "استعادة الخدمات الأساسية العامة",
  "Water, energy, mobility, health, education and alternative service delivery": "المياه والطاقة والتنقل والصحة والتعليم وتقديم الخدمات البديلة",
  "Reconstruction designs": "تصاميم إعادة الإعمار",
  "Execution-ready studies, designs and technical preparation": "دراسات وتصاميم وتحضيرات فنية جاهزة للتنفيذ",
  "Reconstruction works": "أعمال إعادة الإعمار",
  "Resilient construction of severely damaged or destroyed public infrastructure": "إنشاء مرن للبنية التحتية العامة المتضررة بشدة أو المدمرة",
  "Project management": "إدارة المشروع",
  "CDR project management unit, monitoring, evaluation and fiduciary oversight": "وحدة إدارة مشروع مجلس الإنماء والإعمار والمتابعة والتقييم والرقابة الائتمانية",
  "Eligibility & prioritisation": "الأهلية وتحديد الأولويات",
  "Rubble & environmental management": "إدارة الركام والبيئة",
  "Implementation & project governance": "التنفيذ وحوكمة المشروع",
  "Procurement, controls & oversight": "المشتريات والضوابط والرقابة",
  "Exclusions & safeguards": "الاستبعادات والضمانات",
  "Consultation & grievance channels": "التشاور وقنوات التظلم",
  "IMPLEMENTATION WATCHLIST": "قائمة متابعة التنفيذ",
  "Signals that move a framework toward delivery": "مؤشرات تنقل الإطار نحو التنفيذ",
  "Use these public checkpoints to read updates carefully. A completed checkpoint is evidence of that stage only.": "استخدم نقاط التحقق العامة هذه لقراءة التحديثات بعناية. إنجاز نقطة تحقق هو دليل على تلك المرحلة فقط.",
  "Safety & access": "السلامة والوصول",
  "Check whether a site has the required safety clearance before interpreting an announced intervention as ready for works.": "تحقق مما إذا كان الموقع قد حصل على تصاريح السلامة المطلوبة قبل تفسير أي تدخل معلن على أنه جاهز للأعمال.",
  "Design & scope": "التصميم والنطاق",
  "Execution-ready studies and technical designs define what can be tendered; they are not the same as reconstruction works.": "تحدد الدراسات الجاهزة للتنفيذ والتصاميم الفنية ما يمكن طرحه للمناقصة، وهي ليست أعمال إعادة الإعمار نفسها.",
  "Procurement trail": "مسار المشتريات",
  "Look for procurement plans, tenders and award notices to identify the shift from planning into contracted delivery.": "ابحث عن خطط المشتريات والمناقصات وإشعارات الترسية لتحديد الانتقال من التخطيط إلى تنفيذ متعاقد عليه.",
  "Independent checks": "التحقق المستقل",
  "Read supervision reports and third-party monitoring as verification layers alongside implementation updates.": "اقرأ تقارير الإشراف ومراقبة الأطراف الثالثة كطبقات تحقق إلى جانب تحديثات التنفيذ.",
  "DELIVERY ARCHITECTURE": "هيكل التنفيذ",
  "Who does what in the LEAP delivery chain": "من يقوم بماذا في سلسلة تنفيذ ليب",
  "IMPLEMENTER": "جهة التنفيذ",
  "STRATEGIC GUIDANCE": "التوجيه الاستراتيجي",
  "TECHNICAL INPUT": "المدخلات الفنية",
  "ASSURANCE": "الضمان",
  "EVIDENCE OF DELIVERY": "دليل التنفيذ",
  "A practical proof trail for each intervention": "مسار إثبات عملي لكل تدخل",
  "Site clearance and eligibility": "إخلاء الموقع والأهلية",
  "Design and procurement": "التصميم والمشتريات",
  "Award and site verification": "الترسية والتحقق الميداني",
  "Financial and completion evidence": "الدليل المالي ودليل الإنجاز",
  "PRIMARY PROJECT DOCUMENTS": "وثائق المشروع الأساسية",
  "Use the original project record.": "استخدم سجل المشروع الأصلي.",
  "Factsheet": "النشرة التعريفية",
  "Project design document": "وثيقة تصميم المشروع",
  "Procurement plan": "خطة المشتريات",
  "LIVE RELATED UPDATES": "تحديثات مرتبطة مباشرة",
  "Live related updates": "تحديثات مرتبطة مباشرة",
  "All updates": "كل التحديثات",
  "Selected updates": "التحديثات المختارة",
  "A concise live-status feed of the public updates most directly relevant to recovery. Each card links to the original publisher; the refresh action checks that source page directly.": "موجز مباشر ومختصر للتحديثات العامة الأكثر صلة بالتعافي. ترتبط كل بطاقة بالناشر الأصلي، ويتحقق زر التحديث من صفحة المصدر مباشرة.",
  "Economy": "الاقتصاد",
  "Coordination": "التنسيق",
  "Municipal work": "العمل البلدي",
  "Public services": "الخدمات العامة",
  "Livelihoods": "سبل العيش",
  "Education": "التعليم",
  "Health & protection": "الصحة والحماية",
  "Refresh source status": "تحديث حالة المصدر",
  "EVIDENCE BRIEFS": "موجزات الأدلة",
  "OUR DATA STANDARD": "معيار البيانات لدينا",
  "Every headline number has a public path back to its source.": "لكل رقم رئيسي مسار عام يعود إلى مصدره.",
  "Data sources": "مصادر البيانات",
  "Back to top": "العودة إلى الأعلى",
  "© 2026 Rebuild Lebanon Observatory": "© 2026 مرصد إعادة إعمار لبنان",
  "Curated public record · last reviewed 31 Aug 2026": "سجل عام منتقى · آخر مراجعة 31 أغسطس 2026",
  "START WITH A QUESTION": "ابدأ بسؤال",
  "Understand the picture": "افهم الصورة العامة",
  "Explore the map": "استكشف الخريطة",
  "Search records": "ابحث في السجلات",
  "District evidence, by period": "أدلة الأقضية بحسب الفترة",
  "MAP EVIDENCE PERIOD": "فترة أدلة الخريطة",
  "Map evidence period": "فترة أدلة الخريطة",
  "Showing post-2026 evidence. Map context is independent from other page filters.": "تعرض الخريطة أدلة ما بعد حرب 2026. سياق الخريطة مستقل عن عوامل التصفية الأخرى.",
  "Damage severity": "شدة الأضرار",
  "Funding status": "حالة التمويل",
  "Implementation status": "حالة التنفيذ",
  "Occupation locations": "مواقع الاحتلال",
  "RESPONSE PERIOD": "فترة الاستجابة",
  "Coverage": "النطاق الجغرافي",
  "All coverage": "كل النطاقات",
  "Nationwide or multi-area": "وطني أو متعدد المناطق",
  "South & Nabatieh": "الجنوب والنبطية",
  "Beirut & Mount Lebanon": "بيروت وجبل لبنان",
  "Bekaa & Baalbek-Hermel": "البقاع وبعلبك الهرمل",
  "THE PUBLIC RECORD": "السجل العام",
  "Recovery records & programs": "سجلات وبرامج التعافي",
  "Project filters": "عوامل تصفية السجلات",
  "Library response period": "فترة استجابة المكتبة",
  "Filter records by coverage": "تصفية السجلات بحسب النطاق الجغرافي",
  "Municipal": "بلدي",
  "Open primary source": "افتح المصدر الأساسي",
  "Showing all curated records.": "تعرض كل السجلات المنتقاة.",
  "Arabic navigation is available; primary-record titles and publisher wording remain in their original language to match the source.": "تتوفر الواجهة العربية، بينما تبقى عناوين السجلات الأساسية وصياغة الناشر بلغتها الأصلية لمطابقة المصدر.",
  "How we use sources": "كيف نستخدم المصادر",
  "CURATED OFFICIAL COVERAGE": "تغطية رسمية منتقاة",
  "Source monitor": "متابعة المصادر",
  "A selected, source-linked monitor of public updates relevant to recovery—not a real-time reconstruction-progress tracker. The check only confirms whether a linked page is reachable.": "متابعة منتقاة ومتصلة بالمصادر للتحديثات العامة ذات الصلة بالتعافي، وليست متتبّعاً لحظياً لتقدم إعادة الإعمار. يؤكد الفحص فقط ما إذا كانت الصفحة المرتبطة متاحة.",
  "Check source availability": "تحقق من إتاحة المصادر",
  "Curated source monitor ready. Check availability to test the selected linked pages.": "متابعة المصادر المنتقاة جاهزة. تحقق من الإتاحة لاختبار الصفحات المرتبطة المختارة.",
  "CURATED MONITOR, NOT A NEWSWIRE": "متابعة منتقاة وليست غرفة أخبار",
  "A reachable page confirms its availability at the last check; it does not by itself confirm project delivery, spending or implementation progress.": "تؤكد الصفحة المتاحة إتاحتها وقت آخر فحص؛ لكنها لا تؤكد بمفردها تنفيذ المشروع أو الإنفاق أو تقدم التنفيذ.",
  "Documented places, not district averages": "أماكن موثقة، لا متوسطات على مستوى القضاء",
  "TOWN-LEVEL LOCATORS": "محددات مواقع على مستوى البلدة",
  "Markers show only places named in the cited 2026 UNDP assessments. Unmarked places are not a no-damage designation.": "تُظهر العلامات الأماكن التي سُميت في تقييمات برنامج الأمم المتحدة الإنمائي لعام 2026 فقط. وعدم ظهور مكان لا يعني عدم وجود ضرر فيه.",
  "Occupied areas": "المناطق المحتلة",
  "Occupied areas (2026 data)": "المناطق المحتلة (بيانات 2026)",
  "Loading source-backed place locators": "جارٍ تحميل محددات المواقع المدعومة بالمصادر",
  "Rebuild Lebanon: Reconstruction Observatory": "إعادة إعمار لبنان: مرصد التعافي",
  "REBUILD": "إعادة الإعمار",
  "World Bank RDNA, Mar 2025": "تقييم البنك الدولي للاحتياجات بعد الكارثة، آذار 2025",
  "UN multi-agency estimate, Jul 2025": "تقدير مشترك لوكالات الأمم المتحدة، تموز 2025",
  "All figures are labelled by their evidence type and publication date. A financing framework, approval, disbursement, tender and completed project each carry a different meaning.": "تُرفق بكل رقم رئيسي طبيعة الدليل وتاريخ نشره. فإطار التمويل والموافقة والصرف والمناقصة والمشروع المنجز تحمل دلالات مختلفة.",
  "Use the source library to inspect the primary publication behind each signal.": "استخدم مكتبة المصادر للاطلاع على المنشور الأصلي وراء كل مؤشر.",
  "0 records": "0 سجل",
  "Nationwide recovery baseline": "خط أساس وطني للتعافي",
  "Scope: national assessments and early recovery mechanisms following the 2023 to 2024 conflict.": "النطاق: تقييمات وطنية وآليات تعافٍ مبكر بعد نزاع 2023–2024.",
  "recovery and reconstruction needs estimated in the national RDNA": "احتياجات التعافي وإعادة الإعمار المقدّرة في التقييم الوطني للاحتياجات بعد الكارثة",
  "initial LEAP financing approved within a $1B scalable framework": "تمويل ليب الأولي المعتمد ضمن إطار قابل للتوسع بقيمة مليار دولار",
  "people displaced during the conflict period in the multi-agency assessment": "أشخاص نزحوا خلال فترة النزاع بحسب التقييم المشترك بين الوكالات",
  "Open after-2024 source base": "افتح قاعدة مصادر ما بعد 2024",
  "Rapid recovery and response baseline": "خط أساس سريع للتعافي والاستجابة",
  "Scope: rapid building assessments, emergency service continuity and response instruments documented after the 2026 war.": "النطاق: تقييمات سريعة للمباني واستمرارية الخدمات الطارئة وأدوات استجابة موثقة بعد حرب 2026.",
  "direct building damage estimated in Beirut and Mount Lebanon": "أضرار مباشرة مقدّرة للمباني في بيروت وجبل لبنان",
  "debris estimated in the rapid assessment": "ركام مقدّر في التقييم السريع",
  "Lebanon Response Plan appeal, targeting 1.5M people": "نداء خطة الاستجابة للبنان، يستهدف 1.5 مليون شخص",
  "Open after-2026 source base": "افتح قاعدة مصادر ما بعد 2026",
  "Compare the aftermath, not raw totals.": "قارن آثار ما بعد الحرب، لا الأرقام المجردة.",
  "The post-2024 record gives a nationwide, multi-sector recovery baseline. The post-2026 record starts with targeted rapid assessment and immediate response. They are different after-war phases with different geographic scopes, so their figures cannot be added or treated as a trend.": "يوفر سجل ما بعد 2024 خط أساس وطنياً متعدد القطاعات للتعافي، بينما يبدأ سجل ما بعد 2026 بتقييم سريع موجّه واستجابة فورية. وهما مرحلتان مختلفتان بعد الحرب وبنطاقين جغرافيين مختلفين، لذلك لا يمكن جمع هذه الأرقام أو التعامل معها كاتجاه زمني.",
  "Browse the selected record set": "تصفح مجموعة السجلات المختارة",
  "01 · HUMANITARIAN BRIDGE": "01 · الجسر الإنساني",
  "Protect households while recovery systems are rebuilt.": "حماية الأسر ريثما يُعاد بناء نظم التعافي.",
  "The Lebanon Response Plan connects assistance, shelter, protection, education, livelihoods and water services with resilience measures. It is a coordinated response framework, not a reconstruction completion report.": "تربط خطة الاستجابة للبنان المساعدة والمأوى والحماية والتعليم وسبل العيش وخدمات المياه بتدابير الصمود. وهي إطار استجابة منسّق، وليست تقريراً عن اكتمال إعادة الإعمار.",
  "Open the response plan": "افتح خطة الاستجابة",
  "02 · AREA-BASED DELIVERY": "02 · التنفيذ القائم على المكان",
  "Match service, livelihood and local-governance actions to place.": "اربط إجراءات الخدمات وسبل العيش والحوكمة المحلية بالمكان.",
  "UNDP’s local programming describes participatory, conflict-sensitive prioritisation with municipalities and municipal unions, linking infrastructure, basic services and local economic recovery.": "يصف برنامج الأمم المتحدة الإنمائي برامجه المحلية كأولويات تشاركية وحساسة للنزاع مع البلديات واتحاداتها، تربط البنية التحتية والخدمات الأساسية والتعافي الاقتصادي المحلي.",
  "Open local-resilience context": "افتح سياق الصمود المحلي",
  "03 · RECONSTRUCTION CONTROL": "03 · ضبط إعادة الإعمار",
  "Track the chain from safety clearance to verified works.": "تتبع المسار من إخلاء الموقع للسلامة إلى الأعمال المتحقق منها.",
  "For LEAP, site eligibility, technical designs, procurement, supervision and independent monitoring are distinct checkpoints. Progress at one stage does not prove completion at the next.": "في ليب، أهلية الموقع والتصاميم الفنية والمشتريات والإشراف والرصد المستقل نقاط تحقق منفصلة. والتقدم في مرحلة لا يثبت اكتمال المرحلة التالية.",
  "Open implementation controls": "افتح ضوابط التنفيذ",
  "ACTOR AND ACTION REGISTER": "سجل الجهات الفاعلة والإجراءات",
  "Explore who is involved and what is being done through a source-linked, period-specific public record.": "استكشف الجهات المشاركة وما يُنفّذ عبر سجل عام مرتبط بالمصادر ومحدد بالفترة.",
  "Showing all actor and action records.": "تعرض كل سجلات الجهات الفاعلة والإجراءات.",
  "Named actors grouped by institutional type": "جهات فاعلة مسماة مجمعة حسب النوع المؤسسي",
  "Documented activities grouped by category and subcategory": "أنشطة موثقة مجمعة حسب الفئة والفئة الفرعية",
  "SEARCH THE CATALOGUE": "ابحث في الفهرس",
  "Expand all": "توسيع الكل",
  "Collapse all": "طي الكل",
  "Showing all categories for the selected period.": "تعرض كل الفئات للفترة المختارة.",
  "Actor groups": "مجموعات الجهات الفاعلة",
  "Public officials and institutions, international and NGO actors, municipal authorities, and community initiatives.": "مسؤولون ومؤسسات عامة، وجهات دولية ومنظمات غير حكومية، وسلطات بلدية، ومبادرات مجتمعية.",
  "Action categories": "فئات الإجراءات",
  "Each action has a main category, a defined subcategory and a documented implementation stage.": "لكل إجراء فئة رئيسية وفئة فرعية محددة ومرحلة تنفيذ موثقة.",
  "PUBLIC-SOURCE CATALOGUE": "فهرس المصادر العامة",
  "Browse the classified registry": "تصفح السجل المصنّف",
  "Loading actors and actions from the public-source registry.": "جارٍ تحميل الجهات الفاعلة والإجراءات من سجل المصادر العامة.",
  "By actor group": "حسب مجموعة الجهة الفاعلة",
  "Each group follows the observatory’s institutional structure and opens the original online source.": "تتبع كل مجموعة الهيكل المؤسسي للمرصد وتفتح المصدر الأصلي على الإنترنت.",
  "By category and type": "حسب الفئة والنوع",
  "Each category is divided into defined subcategories and documented stages.": "تُقسّم كل فئة إلى فئات فرعية ومراحل موثقة.",
  "Documented town-level evidence in Lebanon": "أدلة موثقة على مستوى البلدة في لبنان",
  "A neutral national base map with markers only for towns and areas named in the cited source assessments. Districts are not coloured as if they were measured individually.": "خريطة وطنية أساسية محايدة، تضع علامات فقط للبلدات والمناطق المسماة في تقييمات المصادر المذكورة. ولا تُلوّن الأقضية كما لو كانت مقاسة على نحو منفرد.",
  "THE NATIONAL PICTURE": "الصورة الوطنية",
  "What the assessments show": "ما الذي تُظهره التقييمات",
  "Read the RDNA release": "اقرأ بيان تقييم الاحتياجات بعد الكارثة",
  "ASSESSMENT BRIEFS": "موجزات التقييم",
  "Three assessments, three different evidence boundaries.": "ثلاثة تقييمات، وثلاثة حدود مختلفة للأدلة.",
  "Read the source, geography, observation window and method before comparing a figure. These assessments are complementary, but they are not one additive national total.": "اقرأ المصدر والنطاق الجغرافي وفترة الرصد والمنهج قبل مقارنة أي رقم. هذه التقييمات متكاملة، لكنها لا تشكل إجمالياً وطنياً واحداً قابلاً للجمع.",
  "NATIONAL RDNA · MAR 2025": "تقييم الاحتياجات الوطني · آذار 2025",
  "National recovery baseline": "خط الأساس الوطني للتعافي",
  "recovery and reconstruction needs estimated": "احتياجات تعافٍ وإعادة إعمار مقدّرة",
  "Scope": "النطاق",
  "Entire country · 10 sectors · 8 Oct 2023–20 Dec 2024": "كامل البلاد · 10 قطاعات · 8 تشرين الأول 2023–20 كانون الأول 2024",
  "What it measures": "ما الذي يقيسه",
  "$6.8B in physical damage and $7.2B in economic losses.": "6.8 مليارات دولار أضرار مادية و7.2 مليارات دولار خسائر اقتصادية.",
  "Read carefully": "تنبيه للقراءة",
  "A national recovery-and-needs assessment, not a town-by-town damage count or delivery tracker.": "تقييم وطني للتعافي والاحتياجات، وليس عدّاً للأضرار بلدةً ببلدة أو متتبّعاً للتنفيذ.",
  "Open national RDNA": "افتح التقييم الوطني للاحتياجات",
  "SOUTH LEBANON · 19 JUN 2026": "جنوب لبنان · 19 حزيران 2026",
  "Building-level view of South Lebanon": "نظرة على مستوى المبنى في جنوب لبنان",
  "direct building damage estimated": "أضرار مباشرة مقدّرة للمباني",
  "Areas south of the Litani, including Bint Jbeil, Marjaayoun, Nabatieh, Tyre and Saida.": "المناطق الواقعة جنوب الليطاني، بما فيها بنت جبيل ومرجعيون والنبطية وصور وصيدا.",
  "11,095 buildings destroyed and about 3.1M m³ of debris, visible in the assessment imagery.": "11,095 مبنى مدمراً ونحو 3.1 مليون م³ من الركام، ظاهرة في صور التقييم.",
  "29 Apr 2026 imagery versus a 23 Oct 2025 baseline; excludes underground structures and critical infrastructure.": "صور 29 نيسان 2026 مقارنةً بخط أساس 23 تشرين الأول 2025؛ ولا يشمل المنشآت تحت الأرض والبنية التحتية الحيوية.",
  "Open South Lebanon assessment": "افتح تقييم جنوب لبنان",
  "BEIRUT & MOUNT LEBANON · 9 JUN 2026": "بيروت وجبل لبنان · 9 حزيران 2026",
  "Rapid assessment of Beirut & Mount Lebanon": "تقييم سريع لبيروت وجبل لبنان",
  "Beirut and Mount Lebanon, with damage concentrations named in six affected areas.": "بيروت وجبل لبنان، مع تسمية تركز الأضرار في ست مناطق متضررة.",
  "146 buildings destroyed, 264 partially damaged and 648,942 m³ of debris estimated.": "146 مبنى مدمراً، و264 متضرراً جزئياً، و648,942 م³ من الركام المقدّر.",
  "GeoAI, satellite analysis and field verification provide an initial planning baseline, not a cumulative 2024 total.": "يوفر الذكاء الاصطناعي الجغرافي والتحليل الفضائي والتحقق الميداني خط أساس أولياً للتخطيط، وليس إجمالياً تراكمياً لعام 2024.",
  "Open Beirut & Mount Lebanon assessment": "افتح تقييم بيروت وجبل لبنان",
  "AITAROUN · FEB 2025": "عيترون · شباط 2025",
  "NABATIEH · DEC 2024": "النبطية · كانون الأول 2024",
  "SCALE OF IMPACT": "حجم الأثر",
  "economic cost assessed": "كلفة اقتصادية مقدّرة",
  "Physical damage and economic losses are distinct but compounding measures in the World Bank’s 2025 assessment.": "الأضرار المادية والخسائر الاقتصادية مقياسان مختلفان لكنهما متراكمان في تقييم البنك الدولي لعام 2025.",
  "Physical damage": "الأضرار المادية",
  "Economic losses": "الخسائر الاقتصادية",
  "SOURCE: WORLD BANK RDNA, MAR 2025": "المصدر: تقييم البنك الدولي للاحتياجات بعد الكارثة، آذار 2025",
  "SECTOR PRESSURE": "ضغط القطاعات",
  "Housing damage, the largest assessed sector impact": "أضرار الإسكان، وهي أكبر أثر قطاعي مقدّر",
  "Commerce, industry & tourism losses": "خسائر التجارة والصناعة والسياحة",
  "sectors assessed nationwide in the RDNA": "قطاعات جرى تقييمها وطنياً في تقييم الاحتياجات بعد الكارثة",
  "PEOPLE & PLACES": "الناس والأماكن",
  "people displaced during the conflict period": "أشخاص نزحوا خلال فترة النزاع",
  "SOURCE: UNDP / ESCWA MULTI-AGENCY ASSESSMENT, JUL 2025": "المصدر: تقييم مشترك لبرنامج الأمم المتحدة الإنمائي والإسكوا ووكالات الأمم المتحدة، تموز 2025",
  "buildings destroyed in Beirut & Mount Lebanon": "مبانٍ مدمّرة في بيروت وجبل لبنان",
  "debris estimated": "ركام مقدّر",
  "0 curated records": "0 سجل منتقى",
  "Eligible areas are those damaged during the 2023–2024 conflict. Sites are ineligible until cleared by the Lebanese Army for explosive remnants of war and where unmanaged human remains are present.": "المناطق المؤهلة هي التي تضررت خلال نزاع 2023–2024. ولا تصبح المواقع مؤهلة قبل أن يعلن الجيش اللبناني خلوها من مخلفات الحرب المتفجرة، أو عند وجود رفات بشرية غير معالجة.",
  "The Council of Ministers approved the prioritisation methodology on 27 March 2025. For service restoration, priority considers lower damage intensity for quicker recovery, winter population, and pre-conflict economic activity.": "أقر مجلس الوزراء منهجية تحديد الأولويات في 27 آذار 2025. وعند استعادة الخدمات، تراعي الأولوية شدة ضرر أقل للتعافي الأسرع، وسكان الشتاء، والنشاط الاقتصادي قبل النزاع.",
  "LEAP starts from rubble already moved to temporary sites. It anticipates treatment at suitable existing quarry sites or other determined locations, sorting concrete and steel for recycling and reuse, and safe disposal of unusable or hazardous material with site rehabilitation.": "ينطلق ليب من ركام نُقل بالفعل إلى مواقع مؤقتة. ويتوقع معالجته في مقالع قائمة مناسبة أو مواقع أخرى محددة، مع فرز الخرسانة والصلب لإعادة التدوير والاستخدام، والتخلص الآمن من المواد غير القابلة للاستخدام أو الخطرة مع تأهيل الموقع.",
  "Site-specific environmental and social assessments and management plans are required depending on the works, alongside environmental, occupational-health and community-safety requirements.": "تُلزم الأعمال، بحسب نوعها، بتقييمات وخطط إدارة بيئية واجتماعية خاصة بالموقع، إلى جانب متطلبات البيئة والصحة المهنية وسلامة المجتمع.",
  "The Council for Development and Reconstruction is responsible for implementation through a dedicated project management unit. The Prime Minister, in consultation with the Finance Minister, provides strategic guidance; line ministries provide technical input for prioritised areas and service needs.": "يتولى مجلس الإنماء والإعمار التنفيذ عبر وحدة مخصصة لإدارة المشروع. ويوفر رئيس مجلس الوزراء، بالتشاور مع وزير المالية، التوجيه الاستراتيجي؛ وتقدم الوزارات المعنية مدخلات فنية للمناطق ذات الأولوية واحتياجات الخدمات.",
  "The stated reform measures include delegated decision-making, business-process reengineering, digitised financial and procurement systems, and information disclosure.": "تشمل تدابير الإصلاح المعلنة تفويض اتخاذ القرار، وإعادة هندسة إجراءات العمل، ورقمنة الأنظمة المالية وأنظمة المشتريات، والإفصاح عن المعلومات.",
  "LEAP uses World Bank procurement regulations and standard documents, with publication of tenders, procurement plans and awards as required. Works procurement is designed for a 12-week timeline and consulting services for 18 weeks.": "يستخدم ليب لوائح ووثائق المشتريات القياسية للبنك الدولي، مع نشر المناقصات وخطط المشتريات والإحالات وفقاً للمتطلبات. وقد صُممت مدة مشتريات الأعمال لتكون 12 أسبوعاً، والخدمات الاستشارية 18 أسبوعاً.",
  "Controls include supervision engineers, CDR site visits and quarterly progress reports, third-party monitoring using site visits and satellite imagery, independent engineering checks, annual external audits and World Bank reviews.": "تشمل الضوابط مهندسي الإشراف، وزيارات مجلس الإنماء والإعمار للمواقع، وتقارير تقدم ربع سنوية، ورصداً من طرف ثالث بالزيارات والصور الفضائية، وتدقيقات هندسية مستقلة، وتدقيقات خارجية سنوية، ومراجعات من البنك الدولي.",
  "Ineligible activities include those with high-risk environmental or social impacts, projects affecting international waterways or disputed territories, critical natural habitats or cultural heritage, defense or security-related facilities, and activities requiring land acquisition.": "تشمل الأنشطة غير المؤهلة ما ينطوي على آثار بيئية أو اجتماعية عالية المخاطر، أو يمس المجاري المائية الدولية أو الأراضي المتنازع عليها أو الموائل الطبيعية الحرجة أو التراث الثقافي، أو مرافق الدفاع أو الأمن، أو يتطلب استملاك الأراضي.",
  "Environmental and social instruments include impact assessments, management plans, labor and safety procedures, waste plans, stakeholder engagement and a grievance mechanism.": "تشمل الأدوات البيئية والاجتماعية تقييمات الأثر، وخطط الإدارة، وإجراءات العمل والسلامة، وخطط النفايات، وإشراك أصحاب المصلحة، وآلية للتظلمات.",
  "Preparation consultations involved public institutions, municipalities, civil society, academic institutions and the private sector. The stakeholder plan focuses on accessible engagement, including with women, older people, persons with disabilities, displaced people and informal waste pickers.": "شملت المشاورات التحضيرية مؤسسات عامة وبلديات ومجتمعاً مدنياً ومؤسسات أكاديمية وقطاعاً خاصاً. وتركز خطة أصحاب المصلحة على مشاركة متاحة للجميع، بمن فيهم النساء وكبار السن والأشخاص ذوو الإعاقة والنازحون وجامعو النفايات غير الرسميين.",
  "The factsheet lists interim project grievance channels through CDR, including": "تسرد النشرة التعريفية قنوات مؤقتة للتظلمات الخاصة بالمشروع عبر مجلس الإنماء والإعمار، منها",
  "and +961 1 980096, alongside World Bank grievance channels.": "و +961 1 980096، إلى جانب قنوات التظلمات لدى البنك الدولي.",
  "CDR project management unit": "وحدة إدارة مشروع مجلس الإنماء والإعمار",
  "Coordinates the project, monitoring, evaluation and fiduciary oversight.": "تنسق المشروع والمتابعة والتقييم والرقابة الائتمانية.",
  "Prime Minister's Office": "مكتب رئيس مجلس الوزراء",
  "Provides strategic direction in consultation with the Ministry of Finance.": "يوفر التوجيه الاستراتيجي بالتشاور مع وزارة المالية.",
  "Line ministries and local stakeholders": "الوزارات المعنية وأصحاب المصلحة المحليون",
  "Inform prioritised areas, service needs and inclusive recovery choices.": "يسهمون في تحديد المناطق ذات الأولوية واحتياجات الخدمات وخيارات التعافي الشامل.",
  "World Bank and independent monitors": "البنك الدولي والجهات الرقابية المستقلة",
  "Apply procurement review, implementation support, supervision and third-party checks.": "يطبقون مراجعة المشتريات ودعم التنفيذ والإشراف والتحقق من طرف ثالث.",
  "Confirm safety clearance and a documented eligible scope before works are interpreted as ready.": "تحقق من إخلاء الموقع للسلامة ومن نطاق مؤهل موثق قبل اعتبار الأعمال جاهزة.",
  "Look for execution-ready design, procurement-plan entries and issued tender documentation.": "ابحث عن تصميم جاهز للتنفيذ وبنود في خطة المشتريات ووثائق مناقصات صادرة.",
  "Look for award notices, supervision evidence, CDR site visits and third-party monitoring.": "ابحث عن إشعارات إحالة وأدلة إشراف وزيارات للمواقع من مجلس الإنماء والإعمار ورصد من طرف ثالث.",
  "Look for quarterly financial reporting, audited statements and an explicit works-completion record.": "ابحث عن تقارير مالية ربع سنوية وكشوف مدققة وسجل صريح لاكتمال الأعمال.",
  "components, safeguards and accountability": "المكونات والضمانات والمساءلة",
  "financing, governance and delivery design": "تصميم التمويل والحوكمة والتنفيذ",
  "disclosed project procurement record": "سجل مشتريات مشروع معلن",
  "Source: World Bank LEAP factsheet, 17 February 2026. The amounts shown describe the framework and financing status stated in that publication; they do not prove project completion or disbursement.": "المصدر: النشرة التعريفية للبنك الدولي عن ليب، 17 شباط 2026. تصف المبالغ المعروضة الإطار وحالة التمويل الواردين في ذلك المنشور؛ ولا تثبت اكتمال المشروع أو الصرف.",
  "Review source standards": "راجع معايير المصدر",
  "OPEN SOURCE REGISTER": "سجل المصادر المفتوحة",
  "Trace every number": "تتبع كل رقم",
  "Records are curated from primary institutional publications, labelled by date, and linked to the original publication. Where local detail is unavailable, the site says so.": "تُنتقى السجلات من منشورات مؤسسية أولية، وتُوسم بالتاريخ وترتبط بالمنشور الأصلي. وعندما لا تتوفر تفاصيل محلية، يذكر الموقع ذلك صراحة.",
  "01 Primary institutional source": "01 مصدر مؤسسي أولي",
  "02 Publication date shown": "02 تاريخ النشر ظاهر",
  "03 No inferred allocation values": "03 لا توجد قيم تخصيص مستنتجة",
  "2026 RAPID ASSESSMENT · BEIRUT & MOUNT LEBANON": "تقييم سريع لعام 2026 · بيروت وجبل لبنان",
  "buildings destroyed in Beirut & Mount Lebanon": "مبانٍ مدمّرة في بيروت وجبل لبنان",
  "SOURCE: UNDP / CNRS-L / LAF / UNDSS, 9 JUN 2026": "المصدر: برنامج الأمم المتحدة الإنمائي / المجلس الوطني للبحوث العلمية في لبنان / الجيش اللبناني / إدارة الأمم المتحدة للسلامة والأمن، 9 حزيران 2026",
  "Jun 2025": "حزيران 2025",
  "Agriculture & food security": "الزراعة والأمن الغذائي",
  "Commerce, industry & tourism": "التجارة والصناعة والسياحة",
  "Environment & debris management": "البيئة وإدارة الركام",
  "Municipal & public services": "الخدمات البلدية والعامة",
  "Water, wastewater & irrigation": "المياه والصرف الصحي والري",
  "Productive systems": "الأنظمة الإنتاجية",
  "Social services": "الخدمات الاجتماعية",
  "Public systems": "الأنظمة العامة",
  "Public lifelines": "الخدمات العامة الأساسية",
  "Built environment": "البيئة المبنية",
  "Assessed in the RDNA as a national recovery sector.": "قُيّم في تقييم الاحتياجات بعد الكارثة كقطاع وطني للتعافي.",
  "The RDNA estimates $3.4B in economic losses for this combined sector.": "يقدّر تقييم الاحتياجات بعد الكارثة الخسائر الاقتصادية في هذا القطاع المجمع بـ3.4 مليارات دولار.",
  "The multi-agency assessment records disruption for hundreds of thousands of students.": "يوثق التقييم المشترك بين الوكالات اضطراباً أثر في مئات آلاف الطلاب.",
  "Recovery planning includes rehabilitation of damaged environmental ecosystems.": "يشمل تخطيط التعافي تأهيل النظم البيئية المتضررة.",
  "Included in the estimated public infrastructure financing requirement.": "مدرج ضمن احتياج التمويل المقدّر للبنية التحتية العامة.",
  "Assessed alongside essential services critical to community recovery.": "قُيّم إلى جانب الخدمات الأساسية الحيوية لتعافي المجتمعات.",
  "Housing is the largest assessed damage sector in the RDNA.": "الإسكان هو أكبر قطاع أضرار مقدّر في تقييم الاحتياجات بعد الكارثة.",
  "Livelihood and food systems": "سبل العيش والنظم الغذائية",
  "$3.4B assessed losses": "خسائر مقدّرة بـ3.4 مليارات دولار",
  "Learning continuity": "استمرارية التعليم",
  "Debris & environmental recovery": "التعافي من الركام والضرر البيئي",
  "Public lifeline": "خدمة عامة أساسية",
  "Essential service": "خدمة أساسية",
  "$4.6B assessed damage": "أضرار مقدّرة بـ4.6 مليارات دولار",
  "Public officials and institutions": "المسؤولون والمؤسسات العامة",
  "NGOs, international organizations, and UN actors": "المنظمات غير الحكومية والدولية وجهات الأمم المتحدة",
  "Municipal and local authorities": "السلطات البلدية والمحلية",
  "Community initiatives": "المبادرات المجتمعية",
  "National coordination, damage assessment, financing decisions, debris management, service restoration and procurement.": "التنسيق الوطني وتقييم الأضرار وقرارات التمويل وإدارة الركام واستعادة الخدمات والمشتريات.",
  "Humanitarian coordination, assessments, relief, shelter, healthcare, financing and technical assistance.": "التنسيق الإنساني والتقييمات والإغاثة والمأوى والرعاية الصحية والتمويل والمساعدة التقنية.",
  "Local damage reporting, rubble clearance, and communication with national and international actors.": "الإبلاغ المحلي عن الأضرار وإزالة الركام والتواصل مع الجهات الوطنية والدولية.",
  "Relief distribution, fundraising, shelter support, damage reporting, rubble clearance, and household recovery.": "توزيع الإغاثة وجمع التبرعات ودعم المأوى والإبلاغ عن الأضرار وإزالة الركام وتعافي الأسر.",
  "Financial actions": "الإجراءات المالية",
  "Damage assessment and management": "تقييم الأضرار وإدارتها",
  "Relief and community recovery": "الإغاثة والتعافي المجتمعي",
  "Reconstruction and implementation": "إعادة الإعمار والتنفيذ",
  "Financing · Compensation": "التمويل · التعويض",
  "Damage and needs assessment · Rubble clearance · Debris treatment and disposal": "تقييم الأضرار والاحتياجات · إزالة الركام · معالجة الركام والتخلص منه",
  "Relief · Shelter · Community recovery": "الإغاثة · المأوى · التعافي المجتمعي",
  "Reconstruction and public-service restoration · Procurement and contracting · Strategy and coordination": "إعادة الإعمار واستعادة الخدمات العامة · المشتريات والتعاقد · الاستراتيجية والتنسيق",
  "Separates financing announcements, approvals, disbursements and financial assistance to affected households, property owners and farmers.": "يفصل بين إعلانات التمويل والموافقات والصرف والمساعدة المالية للأسر المتضررة ومالكي العقارات والمزارعين.",
  "Covers measuring and mapping damage, opening access, and managing debris with environmental and public-health safeguards.": "يغطي قياس الأضرار ورسم خرائطها وفتح الوصول وإدارة الركام مع ضمانات بيئية وصحية عامة.",
  "Keeps immediate assistance, shelter support, household repairs, fundraising and volunteer recovery visible.": "يبقي المساعدة الفورية ودعم المأوى وإصلاحات الأسر وجمع التبرعات والتعافي التطوعي ظاهرة.",
  "Distinguishes reconstruction delivery from the plans, tenders and coordination needed to reach it.": "يميز تنفيذ إعادة الإعمار عن الخطط والمناقصات والتنسيق اللازم للوصول إليه.",
  "Nationwide baseline and recovery architecture": "خط أساس وطني وهيكلية التعافي",
  "Rapid assessment, response and recovery transition": "تقييم سريع واستجابة وانتقال إلى التعافي",
  "AFTER 2024 WAR": "ما بعد حرب 2024",
  "AFTER 2026 WAR": "ما بعد حرب 2026",
  "Actors": "الجهات الفاعلة",
  "Actions": "الإجراءات",
  "Evidence records": "سجلات الأدلة"
});

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

function translatedText(value) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (activeLocale !== "ar" || !compact) return value;
  return arabicText[compact] || value;
}

function uiText(english, arabic) {
  return activeLocale === "ar" ? arabic : english;
}

function localizeTextNode(node) {
  if (!node?.nodeValue || node.parentElement?.closest("script, style")) return;
  const original = originalTextNodes.get(node) ?? node.nodeValue;
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, original);
  const trimmed = original.trim();
  if (!trimmed) return;
  const translated = activeLocale === "ar" ? translatedText(trimmed) : original;
  node.nodeValue = original.replace(trimmed, translated);
}

function localizeAttributes(root = document.body) {
  if (!root?.querySelectorAll) return;
  root.querySelectorAll("[aria-label],[placeholder],[title]").forEach(element => {
    const original = originalAttributes.get(element) || {};
    ["aria-label", "placeholder", "title"].forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      if (!(attribute in original)) original[attribute] = element.getAttribute(attribute);
      const value = original[attribute];
      element.setAttribute(attribute, activeLocale === "ar" ? translatedText(value) : value);
    });
    originalAttributes.set(element, original);
  });
}

function localizeTextTree(root = document.body) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    localizeTextNode(root);
    return;
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) localizeTextNode(node);
  localizeAttributes(root);
}

const mapTopics = {
  severity: {
    label: "ASSESSED DAMAGE SEVERITY",
    legend: [
      { key: "higher", color: "#bd4d3d", label: "Higher assessed impact" },
      { key: "assessed", color: "#d69b47", label: "Assessed impact" },
      { key: "unavailable", color: "#a9a39a", label: "No comparable score published" }
    ]
  },
  funding: {
    label: "PUBLIC RECOVERY FUNDING",
    legend: [
      { key: "priority", color: "#2f628f", label: "Priority area in national framework" },
      { key: "national", color: "#7ea4c3", label: "National funding context only" },
      { key: "unavailable", color: "#a9a39a", label: "No governorate allocation published" }
    ]
  },
  completion: {
    label: "IMPLEMENTATION STATUS",
    legend: [
      { key: "planning", color: "#c89740", label: "Assessment / planning documented" },
      { key: "support", color: "#4f8165", label: "Framework support documented" },
      { key: "unavailable", color: "#a9a39a", label: "No verified completion data" }
    ]
  },
  occupation: {
    label: "OCCUPATION LOCATIONS",
    legend: [
      { key: "reported", kind: "symbol", label: "Reported Israeli-held position" }
    ]
  }
};

const mapStatLabels = {
  severity: ["Assessment basis", "Comparability", "Primary source"],
  funding: ["Funding position", "Allocation status", "Primary source"],
  completion: ["Evidence stage", "Completion signal", "Primary source"],
  occupation: ["Reported location", "Map treatment", "Primary source"]
};

const regions = {
  "South": {
    name: "South Lebanon",
    damage: { key: "remote", signal: "REMOTE", topic: "Remote-sensing building assessment", context: "UNDP and CNRS-L publish a building-level assessment for areas south of the Litani River using GeoAI, satellite imagery and office-based visual validation.", assessment: "Building-level evidence", lens: "Damage & debris", evidence: "UNDP / CNRS-L", source: "Open South Lebanon assessment", href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026" },
    focus: { key: "return", signal: "RETURN", topic: "Return, debris and public-lifeline focus", context: "The public record links assessment evidence with return, debris management and restoration of essential public services; it does not provide a governorate works-completion register.", assessment: "Recovery-planning focus", lens: "Return & lifelines", evidence: "UNDP / World Bank", source: "Open LEAP recovery framework", href: "https://www.worldbank.org/en/news/factsheet/2026/02/17/lebanon-emergency-assistance-project-frequently-asked-questions" },
    coverage: { key: "regional", signal: "REGIONAL", topic: "Regional building-assessment coverage", context: "A current public building-level assessment is available for the affected South Lebanon area, with stated scope and methodological limits.", assessment: "Regional source page", lens: "Building damage", evidence: "UNDP / CNRS-L", source: "Open regional source", href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026" }
  },
  "Nabatieh": {
    name: "Nabatieh",
    damage: { key: "remote", signal: "REMOTE", topic: "Remote-sensing building assessment", context: "Nabatieh is within the South Lebanon building-level assessment coverage. The source describes visible building damage and explicitly notes what it does not measure.", assessment: "Building-level evidence", lens: "Damage & debris", evidence: "UNDP / CNRS-L", source: "Open South Lebanon assessment", href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026" },
    focus: { key: "return", signal: "RETURN", topic: "Return, debris and public-lifeline focus", context: "Public recovery planning identifies return conditions, debris management and essential services as relevant lenses; no completion score is shown here.", assessment: "Recovery-planning focus", lens: "Housing & services", evidence: "UNDP / World Bank", source: "Open LEAP recovery framework", href: "https://www.worldbank.org/en/news/factsheet/2026/02/17/lebanon-emergency-assistance-project-frequently-asked-questions" },
    coverage: { key: "regional", signal: "REGIONAL", topic: "Regional building-assessment coverage", context: "A region-specific building-level assessment is linked for this topic, alongside national recovery and response sources.", assessment: "Regional source page", lens: "Building damage", evidence: "UNDP / CNRS-L", source: "Open regional source", href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026" }
  },
  "Mount Lebanon": {
    name: "Mount Lebanon",
    damage: { key: "field", signal: "VALIDATED", topic: "GeoAI and field-validated building assessment", context: "UNDP’s Beirut and Mount Lebanon assessment combines GeoAI, satellite analysis and field verification to create an initial recovery-planning evidence base.", assessment: "Rapid damage evidence", lens: "Buildings & debris", evidence: "UNDP / CNRS-L / LAF", source: "Open rapid assessment", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" },
    focus: { key: "urban", signal: "URBAN", topic: "Urban services and building-recovery focus", context: "The recovery lens combines damaged buildings with urban public services; it is a planning topic, not a funding or implementation ranking.", assessment: "Urban recovery planning", lens: "Services & buildings", evidence: "UNDP / CNRS-L", source: "Open rapid assessment", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" },
    coverage: { key: "regional", signal: "REGIONAL", topic: "Regional building-assessment coverage", context: "A region-specific rapid assessment page is available for Mount Lebanon, while municipal project-level data remains outside this map.", assessment: "Regional source page", lens: "Rapid assessment", evidence: "UNDP / CNRS-L / LAF", source: "Open regional source", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" }
  },
  "Beirut": {
    name: "Beirut",
    damage: { key: "field", signal: "VALIDATED", topic: "GeoAI and field-validated building assessment", context: "UNDP’s rapid assessment covers Beirut and Mount Lebanon, using GeoAI, satellite imagery and field verification for preliminary recovery planning.", assessment: "Rapid damage evidence", lens: "Buildings & debris", evidence: "UNDP / CNRS-L / LAF", source: "Open rapid assessment", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" },
    focus: { key: "urban", signal: "URBAN", topic: "Urban services and building-recovery focus", context: "The available public evidence points to urban building recovery and essential service continuity, without claiming a live municipal works register.", assessment: "Urban recovery planning", lens: "Services & economy", evidence: "UNDP / CNRS-L", source: "Open rapid assessment", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" },
    coverage: { key: "regional", signal: "REGIONAL", topic: "Regional building-assessment coverage", context: "A current regional assessment provides an evidence base for Beirut; neighbourhood-level delivery and completion data is not inferred by this map.", assessment: "Regional source page", lens: "Rapid assessment", evidence: "UNDP / CNRS-L / LAF", source: "Open regional source", href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon" }
  },
  "Beqaa": {
    name: "Beqaa",
    damage: { key: "national", signal: "NATIONAL", topic: "National and municipal assessment evidence", context: "The public evidence linked here is national or municipal in scope; this map does not imply a dedicated current building-level assessment for every Beqaa locality.", assessment: "National / municipal evidence", lens: "Recovery needs", evidence: "UNDP / UN sources", source: "Open municipal assessment", href: "https://www.undp.org/lebanon/publications/crisis-recovery-local-authorities-confronting-post-war-realities-lebanon-rapid-impact-assessment" },
    focus: { key: "services", signal: "SERVICES", topic: "Services and livelihoods focus", context: "National response sources connect basic services, livelihoods, resilience and social protection; locally disaggregated implementation data is not shown.", assessment: "National response focus", lens: "Livelihoods & services", evidence: "Government / UN", source: "Open Lebanon Response Plan", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" },
    coverage: { key: "municipal", signal: "MUNICIPAL", topic: "Municipal and national source coverage", context: "This topic is backed by municipal rapid-impact and national response evidence rather than a dedicated governorate project register.", assessment: "Municipal / national sources", lens: "Local recovery needs", evidence: "UNDP / UN", source: "Open municipal assessment", href: "https://www.undp.org/lebanon/publications/crisis-recovery-local-authorities-confronting-post-war-realities-lebanon-rapid-impact-assessment" }
  },
  "Baalbek-Hermel": {
    name: "Baalbek-Hermel",
    damage: { key: "national", signal: "NATIONAL", topic: "National and municipal assessment evidence", context: "The current linked record is national or municipal in scope. The colour does not claim a new governorate-specific damage total or delivery status.", assessment: "National / municipal evidence", lens: "Recovery needs", evidence: "UNDP / UN sources", source: "Open municipal assessment", href: "https://www.undp.org/lebanon/publications/crisis-recovery-local-authorities-confronting-post-war-realities-lebanon-rapid-impact-assessment" },
    focus: { key: "services", signal: "SERVICES", topic: "Services and livelihoods focus", context: "The public response framework places livelihoods, essential services, social stability and resilience in a nationwide recovery context.", assessment: "National response focus", lens: "Infrastructure & livelihoods", evidence: "Government / UN", source: "Open Lebanon Response Plan", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" },
    coverage: { key: "municipal", signal: "MUNICIPAL", topic: "Municipal and national source coverage", context: "This category means public municipal and national evidence is available; it is not a statement about local project completion.", assessment: "Municipal / national sources", lens: "Local recovery needs", evidence: "UNDP / UN", source: "Open municipal assessment", href: "https://www.undp.org/lebanon/publications/crisis-recovery-local-authorities-confronting-post-war-realities-lebanon-rapid-impact-assessment" }
  },
  "North": {
    name: "North",
    damage: { key: "national", signal: "NATIONAL", topic: "National and municipal assessment evidence", context: "No region-specific building-assessment layer is claimed here. The linked public evidence is national or programmatic in scope.", assessment: "National / program evidence", lens: "Recovery needs", evidence: "UNDP / UN sources", source: "Open national response source", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" },
    focus: { key: "host", signal: "HOST", topic: "Host-community and essential-service focus", context: "Public programs point to host-community resilience, services and local development rather than a governorate reconstruction-completion metric.", assessment: "Program response focus", lens: "Host communities", evidence: "UNDP / partners", source: "Open host communities project", href: "https://www.undp.org/lebanon/projects/lebanon-host-communities-support-project-phase-2-lhsp-20" },
    coverage: { key: "national", signal: "NATIONAL", topic: "National response-source coverage", context: "National response and program sources are linked for this topic; the observatory awaits a comparable public governorate damage registry.", assessment: "National program sources", lens: "Response & resilience", evidence: "UNDP / UN", source: "Open national response source", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" }
  },
  "Akkar": {
    name: "Akkar",
    damage: { key: "national", signal: "NATIONAL", topic: "National and municipal assessment evidence", context: "No region-specific building-assessment layer is claimed here. The colour identifies the type of public evidence available, not a local severity level.", assessment: "National / program evidence", lens: "Recovery needs", evidence: "UNDP / UN sources", source: "Open national response source", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" },
    focus: { key: "host", signal: "HOST", topic: "Host-community and essential-service focus", context: "The linked public record is oriented to host-community resilience and essential services, without inferring local implementation completion.", assessment: "Program response focus", lens: "Host communities", evidence: "UNDP / partners", source: "Open host communities project", href: "https://www.undp.org/lebanon/projects/lebanon-host-communities-support-project-phase-2-lhsp-20" },
    coverage: { key: "national", signal: "NATIONAL", topic: "National response-source coverage", context: "National response and program sources are available for this topic; the site does not treat them as a governorate damage registry.", assessment: "National program sources", lens: "Response & resilience", evidence: "UNDP / UN", source: "Open national response source", href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026" }
  }
};

const southAssessmentLink = {
  source: "Open South Lebanon assessment",
  href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026"
};
const beirutAssessmentLink = {
  source: "Open rapid assessment",
  href: "https://www.undp.org/arab-states/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon"
};
const leapLink = {
  source: "Open LEAP framework",
  href: "https://www.worldbank.org/en/news/factsheet/2026/02/17/lebanon-emergency-assistance-project-frequently-asked-questions"
};
const nationalRecoveryLink = {
  source: "Open national recovery assessment",
  href: "https://www.worldbank.org/en/news/press-release/2025/03/07/lebanon-s-recovery-and-reconstruction-needs-estimated-at-us-11-billion"
};
const responsePlanLink = {
  source: "Open national response source",
  href: "https://lebanon.un.org/en/309523-lebanon-response-plan-2026"
};

function mapEntry(key, signal, topic, context, assessment, lens, evidence, link) {
  return { key, signal, topic, context, assessment, lens, evidence, ...link };
}

["South", "Nabatieh"].forEach(region => {
  regions[region].severity = mapEntry(
    "higher", "HIGHER", "Higher assessed building impact",
    "The linked regional assessment reports material building damage. This label reflects the published assessment scope; it is not a complete governorate damage score.",
    "Current regional assessment", "Regional; not a full score", "UNDP / CNRS-L", southAssessmentLink
  );
  regions[region].funding = mapEntry(
    "priority", "PRIORITY", "Priority area in the national recovery framework",
    "The national recovery framework prioritises public facilities and infrastructure in conflict-affected localities. It does not publish a governorate allocation for this map.",
    "National framework", "No governorate amount", "World Bank / Government", leapLink
  );
  regions[region].completion = mapEntry(
    "support", "NOT VERIFIED", "Framework support documented",
    "Public assessment and recovery-framework records are available. They do not verify completed reconstruction works or a governorate completion rate.",
    "Framework / planning", "No verified works total", "UNDP / World Bank", leapLink
  );
});

["Beirut", "Mount Lebanon"].forEach(region => {
  regions[region].severity = mapEntry(
    "assessed", "ASSESSED", "Assessed building impact",
    "The linked rapid assessment covers Beirut and Mount Lebanon. It supports an assessed-impact label, not a severity ranking between the two governorates.",
    "Rapid assessment", "Combined regional scope", "UNDP / CNRS-L / LAF", beirutAssessmentLink
  );
  regions[region].funding = mapEntry(
    "national", "NATIONAL", "National recovery financing context",
    "The linked recovery sources describe a national financing picture. No separate governorate allocation is published for this map.",
    "National recovery need", "No governorate amount", "World Bank", nationalRecoveryLink
  );
  regions[region].completion = mapEntry(
    "planning", "NOT VERIFIED", "Assessment and planning documented",
    "The current public record documents assessment and recovery planning. It does not verify completed reconstruction works or a governorate completion rate.",
    "Assessment / planning", "No verified works total", "UNDP / World Bank", beirutAssessmentLink
  );
});

["Beqaa", "Baalbek-Hermel", "North", "Akkar"].forEach(region => {
  regions[region].severity = mapEntry(
    "unavailable", "NOT COMPARABLE", "No comparable governorate severity score published",
    "The linked public evidence is national, municipal or programmatic in scope. A comparable current governorate damage score is not published for this map.",
    "National / local context", "No comparable score", "UNDP / UN", responsePlanLink
  );
  regions[region].funding = mapEntry(
    "national", "NATIONAL", "National recovery financing context",
    "The linked recovery sources describe national financing needs and response planning, not a governorate allocation.",
    "National recovery need", "No governorate amount", "World Bank / UN", nationalRecoveryLink
  );
  regions[region].completion = mapEntry(
    "unavailable", "NOT PUBLISHED", "No verified governorate completion data",
    "No public governorate completion register is linked for this map. Completion is not inferred from response plans or source availability.",
    "No current public register", "Not inferred", "National / program sources", responsePlanLink
  );
});

const unifil2024ImpactLink = {
  source: "Open 2024 UN Security Council report",
  href: "https://digitallibrary.un.org/record/4040907/files/S_2024_222-EN.pdf"
};
const flashAppeal2024Link = {
  source: "Open 2024 Government and UN Flash Appeal",
  href: "https://lebanon.un.org/en/280095-united-nations-and-lebanese-government-launch-426-million-flash-appeal-urgent-humanitarian"
};
const periodSelectionLink = {
  source: "Choose a post-war period",
  href: "#response"
};

function unavailablePeriodProfile(region) {
  return {
    name: regions[region].name,
    severity: mapEntry("unavailable", "SELECT PERIOD", "Choose a post-war period", "Select 2024 or 2026 to view a map that keeps the two post-war evidence tracks separate.", "Period not selected", "No evidence tracks combined", "Observatory period filter", periodSelectionLink),
    funding: mapEntry("unavailable", "SELECT PERIOD", "Choose a post-war period", "Select 2024 or 2026 to view the corresponding public funding context. The map does not combine funding evidence across post-war tracks.", "Period not selected", "No evidence tracks combined", "Observatory period filter", periodSelectionLink),
    completion: mapEntry("unavailable", "SELECT PERIOD", "Choose a post-war period", "Select 2024 or 2026 to view the corresponding implementation evidence. Completion is not combined across post-war tracks.", "Period not selected", "No evidence tracks combined", "Observatory period filter", periodSelectionLink)
  };
}

const periodMapProfiles = {
  "2024": {
    "South": {
      name: "South Lebanon",
      severity: mapEntry("assessed", "ASSESSED", "2024 conflict-impact context", "UN reporting identifies heavily affected residential areas in South Lebanon. This is a period-specific impact context, not a district damage total.", "UN-reported affected areas", "Not a district score", "UNIFIL / UN Security Council", unifil2024ImpactLink),
      funding: mapEntry("national", "NATIONAL", "2024 emergency funding context", "The 2024 Government and UN Flash Appeal set a national emergency-response funding context. It does not publish a South Lebanon governorate allocation for this map.", "National emergency appeal", "No governorate amount", "Government of Lebanon / UN", flashAppeal2024Link),
      completion: mapEntry("planning", "EARLY RESPONSE", "2024 early response stage", "Public sources document emergency response and return conditions. They do not verify a governorate reconstruction-completion rate for this period.", "Response / return conditions", "No verified works total", "Government of Lebanon / UN", flashAppeal2024Link)
    },
    "Nabatieh": {
      name: "Nabatieh",
      severity: mapEntry("assessed", "ASSESSED", "2024 conflict-impact context", "UN reporting identifies heavily affected residential areas in Nabatieh. This is a period-specific impact context, not a district damage total.", "UN-reported affected areas", "Not a district score", "UNIFIL / UN Security Council", unifil2024ImpactLink),
      funding: mapEntry("national", "NATIONAL", "2024 emergency funding context", "The 2024 Government and UN Flash Appeal set a national emergency-response funding context. It does not publish a Nabatieh governorate allocation for this map.", "National emergency appeal", "No governorate amount", "Government of Lebanon / UN", flashAppeal2024Link),
      completion: mapEntry("planning", "EARLY RESPONSE", "2024 early response stage", "Public sources document emergency response and return conditions. They do not verify a governorate reconstruction-completion rate for this period.", "Response / return conditions", "No verified works total", "Government of Lebanon / UN", flashAppeal2024Link)
    }
  },
  All: Object.fromEntries(Object.keys(regions).map(region => [region, unavailablePeriodProfile(region)]))
};

["Beqaa", "Baalbek-Hermel", "North", "Akkar", "Beirut", "Mount Lebanon"].forEach(region => {
  periodMapProfiles["2024"][region] = {
    name: regions[region].name,
    severity: mapEntry("unavailable", "NOT COMPARABLE", "No comparable 2024 governorate impact score", "The linked 2024 evidence does not publish a comparable governorate impact score for this map. The map does not infer one.", "No comparable score", "Not inferred", "UN Security Council / UN", unifil2024ImpactLink),
    funding: mapEntry("national", "NATIONAL", "2024 emergency funding context", "The 2024 Government and UN Flash Appeal provides a national emergency-response funding context, not a governorate allocation.", "National emergency appeal", "No governorate amount", "Government of Lebanon / UN", flashAppeal2024Link),
    completion: mapEntry("planning", "EARLY RESPONSE", "2024 early response stage", "The public record documents emergency response. It does not verify a governorate reconstruction-completion rate for this period.", "Emergency response", "No verified works total", "Government of Lebanon / UN", flashAppeal2024Link)
  };
});

function mapProfileForPeriod(region) {
  if (activeMapPeriod === "2026") return regions[region];
  return periodMapProfiles[activeMapPeriod]?.[region] || periodMapProfiles.All[region];
}

const projectList = document.querySelector("#projectList");
const projectSearch = document.querySelector("#projectSearch");
const recordSort = document.querySelector("#recordSort");
const recordCount = document.querySelector("#recordCount");
const recordAreaFilter = document.querySelector("#recordAreaFilter");
const libraryFilterStatus = document.querySelector("#libraryFilterStatus");
const overviewFreshness = document.querySelector("#overviewFreshness");
const sectorGrid = document.querySelector("#sectorGrid");
const sourceList = document.querySelector("#sourceList");
const sourceReview = document.querySelector("#sourceReview");
const sourceRefresh = document.querySelector("[data-refresh]");
const actorGrid = document.querySelector("#actorGrid");
const actionGrid = document.querySelector("#actionGrid");
const actorRegistry = document.querySelector("#actorRegistry");
const actionRegistry = document.querySelector("#actionRegistry");
const registryStatus = document.querySelector("#registryStatus");
const actorsPeriodStatus = document.querySelector("#actorsPeriodStatus");
const actorCatalogCount = document.querySelector("#actorCatalogCount");
const actionCatalogCount = document.querySelector("#actionCatalogCount");
const catalogSearch = document.querySelector("#catalogSearch");
const catalogSearchStatus = document.querySelector("#catalogSearchStatus");
let catalogQuery = "";
const newsList = document.querySelector("#newsList");
const newsStatus = document.querySelector("#newsStatus");
const newsRefresh = document.querySelector("#newsRefresh");
let activeFilter = "All";
const periodLabels = Object.freeze({
  All: "All records",
  "2024": "After 2024 war",
  "2026": "After 2026 war"
});
const requestedPeriod = new URLSearchParams(window.location.search).get("period");
let activePeriod = Object.hasOwn(periodLabels, requestedPeriod) ? requestedPeriod : "All";
let activeNewsFilter = "All";
let visibleRecords = [...records];
let activeRecordArea = "All";
let currentReviewedAt = seedData.reviewedAt;

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

function updateFreshness(reviewedAt = currentReviewedAt) {
  if (!overviewFreshness) return;
  currentReviewedAt = reviewedAt;
  const formattedReviewedAt = activeLocale === "ar"
    ? new Intl.DateTimeFormat("ar-LB", { dateStyle: "medium" }).format(new Date(reviewedAt))
    : reviewedAt;
  overviewFreshness.textContent = activeLocale === "ar"
    ? `سجل عام منتقى · آخر مراجعة ${formattedReviewedAt}`
    : `Curated public record · last reviewed ${reviewedAt}`;
}

function periodLabel(period) {
  return periodLabels[period] || period;
}

function localizedPeriodLabel(period) {
  const label = periodLabel(period);
  return activeLocale === "ar" ? (arabicText[label] || label) : label;
}

function sortRecords(items) {
  const direction = recordSort.value;
  return [...items].sort((a, b) => {
    if (direction === "scale") return b.scale - a.scale;
    if (direction === "az") return a.name.localeCompare(b.name);
    return b.date.localeCompare(a.date);
  });
}

function renderRecords() {
  const query = projectSearch.value.trim().toLowerCase();
  const filtered = records.filter(record => {
    const matchesFilter = activeFilter === "All" || record.filter === activeFilter;
    const matchesPeriod = activePeriod === "All" || record.period === activePeriod;
    const matchesArea = matchesRecordArea(record);
    const searchable = [record.name, record.place, record.filter, record.period, record.status, record.funding, record.marker].join(" ").toLowerCase();
    return matchesFilter && matchesPeriod && matchesArea && searchable.includes(query);
  });
  visibleRecords = sortRecords(filtered);
  recordCount.textContent = activeLocale === "ar"
    ? `${visibleRecords.length} من أصل ${records.length} سجل مصدر${activePeriod === "All" ? "" : ` • ${localizedPeriodLabel(activePeriod)}`}`
    : `${visibleRecords.length} of ${records.length} source records${activePeriod === "All" ? "" : ` • ${localizedPeriodLabel(activePeriod)}`}`;
  if (libraryFilterStatus) {
    const period = activePeriod === "All" ? (activeLocale === "ar" ? "كل فترات الاستجابة" : "all response periods") : localizedPeriodLabel(activePeriod);
    const area = activeRecordArea === "All" ? (activeLocale === "ar" ? "كل النطاقات" : "all coverage") : localizedAreaLabel(activeRecordArea);
    libraryFilterStatus.textContent = activeLocale === "ar"
      ? `يعرض ${period} · ${area} · ${visibleRecords.length} سجل متاح.`
      : `Showing ${period} · ${area} · ${visibleRecords.length} matching records.`;
  }
  projectList.innerHTML = visibleRecords.length ? visibleRecords.map(record => {
    const external = record.href.startsWith("http");
    const sourceLanguage = activeLocale === "ar" ? ' lang="en" dir="ltr"' : "";
    return `
    <a class="project-row"${sourceLanguage} href="${record.href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
      <div class="project-title"><span class="project-icon">${record.icon}</span><div><p class="project-name">${record.name}</p><p class="project-place">${record.place}</p></div></div>
      <p class="project-meta"><strong>${localizedPeriodLabel(record.period)} • ${localizedRecordFilter(record.filter)}</strong>${translatedText(record.status)}</p>
      <p class="project-funding">${record.funding}</p>
      <p class="record-marker">${record.marker}</p>
      <span class="row-arrow" aria-label="${translatedText("Open primary source")}">↗</span>
    </a>`;
  }).join("") : `<p class="empty-state">${uiText("No source-backed records match this search.", "لا توجد سجلات مدعومة بالمصادر تطابق هذا البحث.")}</p>`;
}

function renderSectors() {
  if (!sectorGrid) return;
  sectorGrid.innerHTML = sectors.map(sector => `
    <article class="sector-tile">
      <div class="tile-top"><span>${sector.code}</span><i>${sector.icon}</i></div>
      <p class="tile-group">${translatedText(sector.group)}</p>
      <h3>${translatedText(sector.name)}</h3>
      <p>${translatedText(sector.note)}</p>
      <strong>${sector.fact}</strong>
    </article>`).join("");
}

function sourceHealth(source) {
  if (source.local) return `<small class="source-health local">${uiText("Local evidence input", "مدخل دليل محلي")}</small>`;
  if (source.check) return source.check.state === "reachable" ? `<small class="source-health reachable">${uiText("Live check", "فحص مباشر")}: ${source.check.status}</small>` : `<small class="source-health unavailable">${uiText("Live check unavailable", "الفحص المباشر غير متاح")}</small>`;
  if (source.snapshot?.state === "reachable") return `<small class="source-health scraped">${uiText("Python scrape", "فحص بايثون")}: ${source.snapshot.status}</small>`;
  if (source.snapshot) return `<small class="source-health unavailable">${uiText("Python scrape unavailable", "فحص بايثون غير متاح")}</small>`;
  return `<small class="source-health pending">${uiText("Not checked this session", "لم يُفحص في هذه الجلسة")}</small>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function sourceSnapshotDetail(source) {
  if (!source.snapshot?.description) return "";
  return `<small class="source-snapshot" title="${uiText("Metadata collected by the local Python source monitor", "بيانات وصفية جمعها مراقب المصادر المحلي")}">${escapeHtml(source.snapshot.description)}</small>`;
}

function renderSources() {
  sourceList.innerHTML = sources.map(source => {
    const external = source.href.startsWith("http");
    const tag = source.local ? "article" : "a";
    const attributes = source.local ? "" : ` href="${source.href}"${external ? ' target="_blank" rel="noreferrer"' : ""}`;
    return `
    <${tag} class="source-row${source.local ? " local-source" : ""}"${attributes}>
      <div class="source-row-index">${String(sources.indexOf(source) + 1).padStart(2, "0")}</div>
      <div><h3>${source.name}</h3><p>${source.publisher}</p>${sourceSnapshotDetail(source)}</div>
      <div class="source-row-meta"><span>${translatedText(source.type)}</span><strong>${translatedText(source.coverage)}</strong></div>
      <time datetime="${source.date}">${source.date}${sourceHealth(source)}</time>
      <span class="row-arrow">${source.local ? "•" : "↗"}</span>
    </${tag}>`;
  }).join("");
}

function renderFramework() {
  if (!framework || !actorGrid || !actionGrid) return;
  actorGrid.innerHTML = framework.actorGroups.map(group => `
    <article class="taxonomy-card actor-card" style="--accent:${group.color}">
      <span>${group.code}</span><h4>${translatedText(group.name)}</h4><p>${translatedText(group.role)}</p>
    </article>`).join("");
  actionGrid.innerHTML = framework.actionGroups.map(group => `
    <article class="taxonomy-card action-card" style="--accent:${group.color}">
      <span>${group.code}</span><h4>${translatedText(group.name)}</h4><strong>${translatedText(group.subcategories)}</strong><p>${translatedText(group.note)}</p>
    </article>`).join("");
}

function renderPeriodComparison() {
  const count2024 = records.filter(record => record.period === "2024").length;
  const count2026 = records.filter(record => record.period === "2026").length;
  const crossCutting = records.filter(record => record.period === "Cross-cutting").length;
  document.querySelector("#periodCount2024").textContent = activeLocale === "ar" ? `${count2024} سجل موسوم` : `${count2024} tagged records`;
  document.querySelector("#periodCount2026").textContent = activeLocale === "ar" ? `${count2026} سجل موسوم` : `${count2026} tagged records`;
  document.querySelectorAll(".period-filter-button").forEach(button => {
    const isActive = button.dataset.period === activePeriod;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  document.querySelectorAll("[data-period-card]").forEach(card => {
    card.classList.toggle("focus", activePeriod === card.dataset.periodCard);
    card.classList.toggle("muted", activePeriod !== "All" && activePeriod !== card.dataset.periodCard);
  });
}

function renderAftermathBoard() {
  const tracks = [
    { period: "2024", prefix: "after2024", highlights: "after2024Highlights" },
    { period: "2026", prefix: "after2026", highlights: "after2026Highlights" },
    { period: "Cross-cutting", prefix: "afterShared", highlights: "afterSharedHighlights" }
  ];
  tracks.forEach(track => {
    const trackRecords = records.filter(record => record.period === track.period).sort((left, right) => right.date.localeCompare(left.date));
    const trackActors = actors.filter(actor => actor.period === track.period);
    const trackActions = actions.filter(action => action.period === track.period);
    const recordMetric = document.querySelector(`#${track.prefix}Records`);
    const actorMetric = document.querySelector(`#${track.prefix}Actors`);
    const actionMetric = document.querySelector(`#${track.prefix}Actions`);
    const highlights = document.querySelector(`#${track.highlights}`);
    if (recordMetric) recordMetric.textContent = trackRecords.length;
    if (actorMetric) actorMetric.textContent = trackActors.length;
    if (actionMetric) actionMetric.textContent = trackActions.length;
    if (highlights) {
      highlights.innerHTML = trackRecords.slice(0, 3).map(record => `
        <a href="${record.href}"${record.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
          <span>${localizedRecordFilter(record.filter)}</span><strong>${record.name}</strong><i>↗</i>
        </a>`).join("") || `<p>${uiText("No highlighted record is currently tagged to this track.", "لا يوجد سجل بارز موسوم بهذا المسار حالياً.")}</p>`;
    }
  });
  document.querySelectorAll("[data-aftermath-track]").forEach(board => {
    const isCrossCutting = board.dataset.aftermathTrack === "Cross-cutting";
    board.classList.toggle("focus", activePeriod === board.dataset.aftermathTrack);
    board.classList.toggle("muted", activePeriod !== "All" && !isCrossCutting && activePeriod !== board.dataset.aftermathTrack);
    board.classList.toggle("shared-muted", activePeriod !== "All" && isCrossCutting);
  });
}

function tallyBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());
}

function renderAftermathDetails() {
  const grid = document.querySelector("#aftermathDetailGrid");
  if (!grid) return;
  const tracks = [
    { period: "2024", title: "AFTER 2024 WAR", subtitle: "Nationwide baseline and recovery architecture", className: "detail-2024" },
    { period: "2026", title: "AFTER 2026 WAR", subtitle: "Rapid assessment, response and recovery transition", className: "detail-2026" }
  ];
  const mixRows = (counts, total, label) => [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([name, count]) => `<div class="aftermath-mix-row"><span>${translatedText(name)}</span><div><i style="width:${total ? Math.round((count / total) * 100) : 0}%"></i></div><b>${count}</b></div>`).join("") || `<p class="aftermath-empty">${activeLocale === "ar" ? `لا توجد ${label === "actors" ? "جهات فاعلة" : label === "actions" ? "إجراءات" : "سجلات"} موسومة بهذا المسار.` : `No ${label.toLowerCase()} are currently tagged to this aftermath.`}</p>`;
  grid.innerHTML = tracks.map(track => {
    const trackRecords = records.filter(record => record.period === track.period);
    const trackActors = actors.filter(actor => actor.period === track.period);
    const trackActions = actions.filter(action => action.period === track.period);
    const actorMix = tallyBy(trackActors, actorGroupFor);
    const actionMix = tallyBy(trackActions, action => classifyAction(action).category);
    const evidenceMix = tallyBy(trackRecords, record => record.filter);
    return `<article class="aftermath-detail-card ${track.className}" data-aftermath-detail="${track.period}">
      <div class="aftermath-detail-top"><span>${translatedText(track.title)}</span><strong>${translatedText(track.subtitle)}</strong></div>
      <div class="aftermath-mix-block"><h4>${uiText("Actors", "الجهات الفاعلة")} <b>${trackActors.length}</b></h4>${mixRows(actorMix, trackActors.length, "actors")}</div>
      <div class="aftermath-mix-block"><h4>${uiText("Actions", "الإجراءات")} <b>${trackActions.length}</b></h4>${mixRows(actionMix, trackActions.length, "actions")}</div>
      <div class="aftermath-mix-block"><h4>${uiText("Evidence records", "سجلات الأدلة")} <b>${trackRecords.length}</b></h4>${mixRows(evidenceMix, trackRecords.length, "records")}</div>
      <a class="aftermath-detail-link" href="?period=${track.period}#projects">${activeLocale === "ar" ? `افتح كامل سجل ${track.period}` : `Open full ${track.period} record set`} <span>↗</span></a>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-aftermath-detail]").forEach(card => {
    card.classList.toggle("focus", activePeriod === card.dataset.aftermathDetail);
    card.classList.toggle("muted", activePeriod !== "All" && activePeriod !== card.dataset.aftermathDetail);
  });
}

function setPeriodFilter(period) {
  activePeriod = period;
  const url = new URL(window.location.href);
  if (period === "All") url.searchParams.delete("period");
  else url.searchParams.set("period", period);
  window.history.replaceState({}, "", url);
  renderPeriodComparison();
  renderAftermathBoard();
  renderAftermathDetails();
  renderRegistries();
  renderRecords();
  document.querySelectorAll(".period-filter-button, .library-period-button").forEach(button => {
    const isActive = button.dataset.period === activePeriod || button.dataset.libraryPeriod === activePeriod;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function actorGroupFor(actor) {
  const name = actor.name.toLowerCase();
  if (/nahnoo|permanent peace movement|community committees and youth volunteers|youth facilitators|outreach volunteers|female grassroots outreach partner/.test(name)) return "Community initiatives";
  if (/municipalit|water establishment|waste management authority|governorate disaster|governors and qaemaqams|tyre union|south tyre caza municipal partnership|local development platforms and observatories/.test(name)) return "Municipal and local authorities";
  if (/united nations|un office for the coordination|united nations special coordinator|world bank|undp|unicef|fao|un-habitat|unops|un women|unesco|unfpa|european union|kuwait fund|kfw|government of japan|government of switzerland|government of germany|government of france|french development|world health organization|unhcr|world food programme|un debris|international labour organization|lebanese red cross|lebanese union for people with disabilities|transition and resilience education fund|unesco heritage emergency fund|gender-based violence working group|ocha|unrwa|international organization for migration|international committee of the red cross|inter-sector coordination group|humanitarian country team|disability inclusion working group|norwegian refugee council|action against hunger|save the children|anera|médecins sans frontières|international medical corps/.test(name)) return "NGOs, international organizations, and UN actors";
  return "Public officials and institutions";
}

function classifyAction(action) {
  const value = `${action.name} ${action.stage}`.toLowerCase();
  if (/compensation|cash assistance|cash transfer/.test(value)) {
    return { category: "Financial actions", subcategory: "Compensation" };
  }
  if (/financ|fund|grant|loan|budget allocation|emergency fund|donor appeal|working capital/.test(value)) {
    return { category: "Financial actions", subcategory: "Financing" };
  }
  if (/debris.*(?:treatment|disposal)|(?:treatment|disposal).*debris|landfill|debris sorting/.test(value)) {
    return { category: "Damage assessment and management", subcategory: "Debris treatment and disposal" };
  }
  if (/rubble|road access|opening roads|clear(?:ing)? roads/.test(value)) {
    return { category: "Damage assessment and management", subcategory: "Rubble clearance" };
  }
  if (/assess|damage|needs|geoai|mapping|map damage|hotspots|unsafe buildings/.test(value)) {
    return { category: "Damage assessment and management", subcategory: "Damage and needs assessment" };
  }
  if (/relief|shelter|community|cooperative|livelihood|crop|livestock|preparedness|household|health|food|water|sanitation|return|protection|psychosocial|farmer|agricultur|explosive ordnance|mine action/.test(value)) {
    return { category: "Relief and community recovery", subcategory: /shelter/.test(value) ? "Shelter" : /relief/.test(value) ? "Relief" : "Community recovery" };
  }
  if (/procurement|tender|contract|execution-ready|design|procurement preparation/.test(value)) {
    return { category: "Reconstruction and implementation", subcategory: "Procurement and contracting" };
  }
  if (/coordinat|prioritis|planning|plan |framework|guide|oversight/.test(value)) {
    return { category: "Reconstruction and implementation", subcategory: "Strategy and coordination" };
  }
  return { category: "Reconstruction and implementation", subcategory: "Reconstruction and public-service restoration" };
}

function catalogEntryForActor(actor) {
  return `<a class="catalog-entry actor-catalog-entry" href="${actor.href}" target="_blank" rel="noreferrer">
    <span class="catalog-mark">${actor.short}</span><div><p class="catalog-meta"><span>${localizedPeriodLabel(actor.period)}</span><span>${actor.category}</span></p><h5>${actor.name}</h5><p>${actor.role}</p><small>${actor.source} ↗</small></div>
  </a>`;
}

function catalogEntryForAction(action, index) {
  return `<a class="catalog-entry action-catalog-entry" href="${action.href}" target="_blank" rel="noreferrer">
    <span class="catalog-mark">${String(index + 1).padStart(2, "0")}</span><div><p class="catalog-meta"><span>${localizedPeriodLabel(action.period)}</span><span>${action.stage}</span></p><h5>${action.name}</h5><p>${action.description}</p><small><span>Actor:</span> ${action.actor} • ${action.source} ↗</small></div>
  </a>`;
}

function renderRegistries() {
  const showPeriod = item => activePeriod === "All" || item.period === activePeriod;
  const query = catalogQuery.trim().toLowerCase();
  const matchesCatalogQuery = item => !query || Object.values(item).join(" ").toLowerCase().includes(query);
  const activeActors = actors.filter(showPeriod).filter(matchesCatalogQuery).sort((left, right) => left.name.localeCompare(right.name));
  const activeActions = actions.filter(showPeriod).filter(matchesCatalogQuery).sort((left, right) => left.name.localeCompare(right.name));
  const actorGroups = OBSERVATORY_DATA.framework.actorGroups;
  const actionGroups = OBSERVATORY_DATA.framework.actionGroups;

  actorRegistry.innerHTML = activeActors.length ? actorGroups.map(group => {
    const groupedActors = activeActors.filter(actor => actorGroupFor(actor) === group.name);
    return `<details class="catalog-group actor-catalog-group"${query ? " open" : ""}>
      <summary><span class="catalog-code">${group.code}</span><span><strong>${translatedText(group.name)}</strong><small>${translatedText(group.role)}</small></span><b>${groupedActors.length}</b></summary>
      <div class="catalog-list">${groupedActors.length ? groupedActors.map(catalogEntryForActor).join("") : `<p class="registry-empty">${uiText("No actor entries are tagged to this group for the selected period.", "لا توجد سجلات جهات فاعلة موسومة بهذه المجموعة في الفترة المختارة.")}</p>`}</div>
    </details>`;
  }).join("") : `<p class="registry-empty">${uiText("No named actor entries are tagged to this response period.", "لا توجد سجلات لجهات فاعلة مسماة موسومة بفترة الاستجابة هذه.")}</p>`;

  actionRegistry.innerHTML = activeActions.length ? actionGroups.map(group => {
    const groupedActions = activeActions.filter(action => classifyAction(action).category === group.name);
    const subcategories = group.subcategories.split(" · ");
    const matchingSubcategories = query ? subcategories.filter(subcategory => groupedActions.some(action => classifyAction(action).subcategory === subcategory)) : subcategories;
    return `<details class="catalog-group action-catalog-group"${query ? " open" : ""}>
      <summary><span class="catalog-code">${group.code}</span><span><strong>${translatedText(group.name)}</strong><small>${translatedText(group.note)}</small></span><b>${groupedActions.length}</b></summary>
      <div class="catalog-list action-catalog-list">${matchingSubcategories.length ? matchingSubcategories.map(subcategory => {
        const entries = groupedActions.filter(action => classifyAction(action).subcategory === subcategory);
        return `<section class="catalog-subgroup"><div class="catalog-subgroup-head"><h5>${translatedText(subcategory)}</h5><span>${entries.length}</span></div>${entries.length ? entries.map(catalogEntryForAction).join("") : `<p class="registry-empty">${uiText("No matching entries for the selected period.", "لا توجد سجلات مطابقة للفترة المختارة.")}</p>`}</section>`;
      }).join("") : `<p class="registry-empty">${uiText("No action entries match this search in the selected period.", "لا توجد سجلات إجراءات تطابق هذا البحث في الفترة المختارة.")}</p>`}</div>
    </details>`;
  }).join("") : `<p class="registry-empty">${uiText("No documented action entries are tagged to this response period.", "لا توجد سجلات إجراءات موثقة موسومة بفترة الاستجابة هذه.")}</p>`;

  if (actorCatalogCount) actorCatalogCount.textContent = activeActors.length;
  if (actionCatalogCount) actionCatalogCount.textContent = activeActions.length;
  if (activeLocale === "ar") {
    registryStatus.textContent = activePeriod === "All"
      ? `${actors.length} جهة فاعلة محددة و${actions.length} إجراءً موثقاً، منظّمة حسب المجموعة والنوع. يفتح كل سجل مصدره الأصلي على الإنترنت.`
      : `${activeActors.length} جهة فاعلة محددة و${activeActions.length} إجراءً موثقاً لمسار ${localizedPeriodLabel(activePeriod)}. يفتح كل سجل مصدره الأصلي على الإنترنت.`;
  } else {
    registryStatus.textContent = activePeriod === "All"
      ? `${activeActors.length} named actors and ${activeActions.length} documented actions, organised by group and type. Every entry opens its original online publication.`
      : `${activeActors.length} named actors and ${activeActions.length} documented actions in the ${localizedPeriodLabel(activePeriod)} track. Every entry opens its original online publication.`;
  }
  if (actorsPeriodStatus) {
    actorsPeriodStatus.textContent = activeLocale === "ar"
      ? (activePeriod === "All" ? "تعرض كل سجلات الجهات الفاعلة والإجراءات، بما فيها السجلات العابرة للفترات." : `تعرض سجل الجهات الفاعلة والإجراءات لمسار ${localizedPeriodLabel(activePeriod)}.`)
      : (activePeriod === "All" ? "Showing all actor and action records, including cross-cutting entries." : `Showing the ${localizedPeriodLabel(activePeriod)} actor and action register.`);
  }
  if (catalogSearchStatus) {
    catalogSearchStatus.textContent = activeLocale === "ar"
      ? (query ? `تعرض ${activeActors.length} جهة فاعلة و${activeActions.length} إجراءً يطابقان «${catalogQuery.trim()}».` : "تعرض كل الفئات للفترة المختارة.")
      : (query ? `Showing ${activeActors.length} actors and ${activeActions.length} actions matching “${catalogQuery.trim()}”.` : "Showing all categories for the selected period.");
  }
}

function formatNewsDate(date) {
  return new Intl.DateTimeFormat(activeLocale === "ar" ? "ar-LB" : "en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00Z`));
}

function formatCheckedAt(timestamp) {
  return new Intl.DateTimeFormat(activeLocale === "ar" ? "ar-LB" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(timestamp));
}

function newsCheckLabel(item) {
  if (item.check) return item.check.state === "reachable" ? uiText(`Source checked ${formatCheckedAt(item.check.checkedAt)}`, `فُحص المصدر ${formatCheckedAt(item.check.checkedAt)}`) : uiText("Live source check unavailable", "فحص المصدر المباشر غير متاح");
  if (item.snapshot?.state === "reachable") return uiText(`Python scrape ${item.snapshot.status} · ${formatCheckedAt(item.snapshot.checkedAt)}`, `فحص بايثون ${item.snapshot.status} · ${formatCheckedAt(item.snapshot.checkedAt)}`);
  if (item.snapshot) return uiText("Python scrape unavailable", "فحص بايثون غير متاح");
  return uiText("Ready for source check", "جاهز لفحص المصدر");
}

function renderNews() {
  if (!newsList) return;
  const filteredNews = [...news]
    .filter(item => activeNewsFilter === "All" || item.category === activeNewsFilter)
    .sort((left, right) => right.date.localeCompare(left.date));
  newsList.innerHTML = filteredNews.length ? filteredNews.map(item => `
    <article class="news-card" data-news-category="${item.category}">
      <div class="news-card-top"><span>${translatedText(item.category)}</span><time datetime="${item.date}">${formatNewsDate(item.date)}</time></div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="news-card-bottom"><small><i class="${item.check && item.check.state === "reachable" ? "checked" : ""}"></i>${newsCheckLabel(item)}</small><a href="${item.href}" target="_blank" rel="noreferrer">${item.publisher} <span>↗</span></a></div>
    </article>`).join("") : `<p class="empty-state">${uiText("No monitored updates match this category.", "لا توجد تحديثات مراقبة تطابق هذه الفئة.")}</p>`;
}


function escapeCsv(value) {
  const safe = String(value).replace(/^([=+\-@])/, "'$1");
  return `"${safe.replaceAll("\"", "\"\"")}"`;
}

function downloadRecords() {
  if (apiAvailable) {
    const params = new URLSearchParams({ filter: activeFilter, period: activePeriod, q: projectSearch.value.trim(), sort: recordSort.value });
    const link = document.createElement("a");
    link.href = apiUrl(`/api/export.csv?${params.toString()}`);
    link.download = "lebanon-reconstruction-observatory-records.csv";
    link.style.display = "none";
    document.body.append(link);
    link.click();
    link.remove();
    showToast(uiText(`Server export requested for ${visibleRecords.length} visible source records`, `طُلب تصدير ${visibleRecords.length} سجل مصدر ظاهر.`));
    return;
  }
  const header = ["Record", "Response period", "Type", "Publisher / partner", "Location / coverage", "Headline measure", "Supporting detail", "Publication date", "Primary source"];
  const rows = visibleRecords.map(record => [record.name, record.period, record.filter, record.status, record.place, record.funding, record.marker, record.date, record.href]);
  const csv = [header, ...rows].map(row => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "lebanon-reconstruction-observatory-records.csv";
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 0);
  showToast(uiText(`Downloaded ${visibleRecords.length} visible source records as CSV`, `نُزّل ${visibleRecords.length} سجل مصدر ظاهر بصيغة CSV.`));
}

projectSearch.addEventListener("input", renderRecords);
recordSort.addEventListener("change", renderRecords);
recordAreaFilter?.addEventListener("change", () => {
  activeRecordArea = recordAreaFilter.value;
  renderRecords();
});
catalogSearch?.addEventListener("input", () => {
  catalogQuery = catalogSearch.value;
  renderRegistries();
});
document.querySelectorAll("[data-catalog-details]").forEach(button => button.addEventListener("click", () => {
  const shouldOpen = button.dataset.catalogDetails === "expand";
  document.querySelectorAll(".classified-catalog .catalog-group").forEach(group => { group.open = shouldOpen; });
}));
document.querySelectorAll(".filter-chip").forEach(chip => chip.addEventListener("click", () => {
  activeFilter = chip.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach(item => item.classList.toggle("active", item === chip));
  renderRecords();
}));
document.querySelectorAll(".period-filter-button").forEach(button => button.addEventListener("click", () => setPeriodFilter(button.dataset.period)));
document.querySelectorAll(".library-period-button").forEach(button => button.addEventListener("click", () => setPeriodFilter(button.dataset.libraryPeriod)));
document.querySelectorAll(".news-filter").forEach(button => button.addEventListener("click", () => {
  activeNewsFilter = button.dataset.newsFilter;
  document.querySelectorAll(".news-filter").forEach(item => item.classList.toggle("active", item === button));
  renderNews();
}));
document.querySelector("[data-download]")?.addEventListener("click", downloadRecords);

async function refreshSources() {
  if (!apiAvailable) {
    showToast(uiText("Start the local application server to run live source checks", "شغّل خادم التطبيق المحلي لإجراء فحوصات المصادر المباشرة."));
    return;
  }
  sourceRefresh.disabled = true;
  sourceRefresh.classList.add("checking");
  sourceRefresh.innerHTML = `<span>↻</span> ${uiText("Checking…", "جارٍ الفحص…")}`;
  try {
    const response = await fetch(apiUrl("/api/refresh"), { method: "POST" });
    if (!response.ok) throw new Error("Refresh request failed");
    const payload = await response.json();
    sources = payload.sources;
    renderSources();
    const remoteChecks = payload.checks.filter(check => check.state !== "local");
    const reachable = remoteChecks.filter(check => check.state === "reachable").length;
    const timestamp = formatCheckedAt(payload.checkedAt);
    if (sourceReview) sourceReview.innerHTML = activeLocale === "ar"
      ? `<i></i> فحص مباشر: ${reachable}/${remoteChecks.length} مصدر عام متاح • ${timestamp}`
      : `<i></i> Live check: ${reachable}/${remoteChecks.length} public sources reachable • ${timestamp}`;
    showToast(uiText(`Live source check complete: ${reachable}/${remoteChecks.length} public sources reachable`, `اكتمل فحص المصادر المباشر: ${reachable}/${remoteChecks.length} مصدر عام متاح.`));
  } catch (error) {
    if (sourceReview) sourceReview.innerHTML = `<i></i> ${uiText("Live source check could not complete", "تعذر إكمال فحص المصدر المباشر")}`;
    showToast(uiText("Source check failed; cached records remain available", "فشل فحص المصدر؛ تبقى السجلات المخزنة متاحة."));
  } finally {
    sourceRefresh.disabled = false;
    sourceRefresh.classList.remove("checking");
    sourceRefresh.innerHTML = `<span>↻</span> ${uiText("Check sources", "تحقق من المصادر")}`;
  }
}

sourceRefresh?.addEventListener("click", refreshSources);

async function refreshNews() {
  if (!apiAvailable) {
    showToast(uiText("Start the local application server to check monitored updates", "شغّل خادم التطبيق المحلي لفحص التحديثات المراقبة."));
    return;
  }
  newsRefresh.disabled = true;
  newsRefresh.innerHTML = `<span>↻</span> ${uiText("Checking…", "جارٍ الفحص…")}`;
  try {
    const response = await fetch(apiUrl("/api/news/refresh"), { method: "POST" });
    if (!response.ok) throw new Error("News refresh failed");
    const payload = await response.json();
    news = payload.news;
    renderNews();
    const reachable = payload.checks.filter(check => check.state === "reachable").length;
    newsStatus.innerHTML = activeLocale === "ar"
      ? `<i></i> آخر فحص للمصادر الرسمية: ${reachable}/${payload.checks.length} صفحة متاحة • ${formatCheckedAt(payload.checkedAt)}`
      : `<i></i> Last official-source check: ${reachable}/${payload.checks.length} pages reachable • ${formatCheckedAt(payload.checkedAt)}`;
    showToast(uiText(`Checked ${reachable}/${payload.checks.length} monitored update pages`, `فُحصت ${reachable}/${payload.checks.length} صفحة تحديث مراقبة.`));
  } catch (error) {
    newsStatus.innerHTML = `<i></i> ${uiText("Live update check could not complete; curated links remain available.", "تعذر إكمال فحص التحديثات المباشر؛ وتبقى الروابط المنتقاة متاحة.")}`;
    showToast(uiText("Live update check failed; showing cached updates", "فشل فحص التحديثات المباشر؛ تعرض التحديثات المخزنة."));
  } finally {
    newsRefresh.disabled = false;
    newsRefresh.innerHTML = `<span>↻</span> ${uiText("Refresh source status", "تحديث حالة المصدر")}`;
  }
}

newsRefresh.addEventListener("click", refreshNews);

async function loadApplicationData() {
  try {
    const [recordsResponse, sectorsResponse, sourcesResponse, healthResponse] = await Promise.all([
      fetch(apiUrl("/api/records")),
      fetch(apiUrl("/api/sectors")),
      fetch(apiUrl("/api/sources")),
      fetch(apiUrl("/api/health"))
    ]);
    if (![recordsResponse, sectorsResponse, sourcesResponse, healthResponse].every(response => response.ok)) throw new Error("API unavailable");
    const [recordsPayload, sectorsPayload, sourcesPayload, healthPayload] = await Promise.all([
      recordsResponse.json(), sectorsResponse.json(), sourcesResponse.json(), healthResponse.json()
    ]);
    records = recordsPayload.records;
    sectors = sectorsPayload.sectors;
    sources = sourcesPayload.sources;
    apiAvailable = true;
    renderSectors();
    renderSources();
    renderPeriodComparison();
    renderAftermathBoard();
    renderAftermathDetails();
    renderRecords();
    const snapshots = sourcesPayload.snapshotCount ? (activeLocale === "ar" ? ` • ${sourcesPayload.snapshotCount} لقطة بيانات وصفية من بايثون` : ` • ${sourcesPayload.snapshotCount} Python metadata snapshots`) : "";
    if (sourceReview) sourceReview.innerHTML = activeLocale === "ar"
      ? `<i></i> واجهة التطبيق المحلية متصلة • ${healthPayload.recordCount} سجل${snapshots} • آخر مراجعة ${healthPayload.reviewedAt}`
      : `<i></i> Local API connected • ${healthPayload.recordCount} records${snapshots} • reviewed ${healthPayload.reviewedAt}`;
    updateFreshness(healthPayload.reviewedAt);
  } catch (error) {
    if (sourceReview) sourceReview.innerHTML = `<i></i> ${uiText("Local fallback dataset • start server.js for live checks", "مجموعة بيانات محلية بديلة • شغّل server.js لإجراء الفحوصات المباشرة")}`;
    updateFreshness(seedData.reviewedAt);
  }
}

async function loadNews() {
  try {
    const response = await fetch(apiUrl("/api/news"));
    if (!response.ok) throw new Error("News API unavailable");
    const payload = await response.json();
    news = payload.news;
    renderNews();
    if (payload.checkedAt) newsStatus.innerHTML = activeLocale === "ar"
      ? `<i></i> آخر فحص للمصادر الرسمية: ${formatCheckedAt(payload.checkedAt)} • حدّث لإعادة الفحص.`
      : `<i></i> Last official-source check: ${formatCheckedAt(payload.checkedAt)} • refresh to check again.`;
    else if (payload.snapshotCount) newsStatus.innerHTML = activeLocale === "ar"
      ? `<i></i> حُمّل مراقب البيانات الوصفية من بايثون لـ ${payload.snapshotCount} صفحة رسمية. حدّث لإجراء فحص مباشر.`
      : `<i></i> Python metadata monitor loaded for ${payload.snapshotCount} official pages. Refresh to run a live status check.`;
  } catch (error) {
    renderNews();
  }
}

const occupationSource = {
  source: "Open UN Security Council report",
  href: "https://digitallibrary.un.org/record/4106088/files/S_2026_160-EN.pdf"
};

const southLebanonDamageSource = {
  source: "Open UNDP South Lebanon damage assessment",
  href: "https://www.undp.org/lebanon/press-releases/building-damage-assessment-estimates-over-usd-138-billion-across-south-lebanon-until-april-2026"
};

const beirutMountLebanonDamageSource = {
  source: "Open UNDP Beirut & Mount Lebanon damage assessment",
  href: "https://www.undp.org/lebanon/press-releases/rapid-damage-assessment-estimates-over-us365-million-building-damage-across-beirut-and-mount-lebanon"
};

const municipalRecovery2024Source = {
  source: "Open UNDP municipal recovery-priorities source",
  href: "https://www.undp.org/lebanon/press-releases/undp-and-republic-korea-increase-support-south-lebanon-communities-affected-recent-conflict"
};

// These are deliberately limited to locations the cited UNDP releases name. They are
// nearby-town locators, not boundary polygons and not a complete damage inventory.
const townEvidenceLocations2026 = [
  { id: "aaitaroun-damage", name: "Aaitaroun", nameAr: "عيترون", lon: 35.4701, lat: 33.1034, area: "south", kind: "destroyed", count: 1658, labelDx: 18, labelDy: -14, source: southLebanonDamageSource, detail: "1,658 buildings completely destroyed" },
  { id: "bint-jbeil-damage", name: "Bint Jbeil", nameAr: "بنت جبيل", lon: 35.4282, lat: 33.1194, area: "south", kind: "destroyed", count: 1076, labelDx: -18, labelDy: 26, source: southLebanonDamageSource, detail: "1,076 buildings completely destroyed" },
  { id: "meiss-el-jabal-damage", name: "Meiss El Jabal", nameAr: "ميس الجبل", lon: 35.5512, lat: 33.1318, area: "south", kind: "destroyed", count: 969, labelDx: 18, labelDy: 18, source: southLebanonDamageSource, detail: "969 buildings completely destroyed" },
  { id: "taybeh-damage", name: "Taybeh", nameAr: "الطيبة", lon: 35.5364, lat: 33.2172, area: "south", kind: "destroyed", count: 824, labelDx: 18, labelDy: -10, source: southLebanonDamageSource, detail: "824 buildings completely destroyed" },
  { id: "borj-ech-chemali-damage", name: "Borj Ech Chemali", nameAr: "برج الشمالي", lon: 35.2242, lat: 33.2515, area: "south", kind: "destroyed", count: 370, labelDx: 18, labelDy: 20, source: southLebanonDamageSource, detail: "370 buildings completely destroyed" },
  { id: "borj-en-naqoura-damage", name: "Borj En-Naqoura", nameAr: "برج الناقورة", lon: 35.1575, lat: 33.1231, area: "south", kind: "destroyed", count: 216, labelDx: -18, labelDy: -14, source: southLebanonDamageSource, detail: "216 buildings completely destroyed" },
  { id: "haret-hreik-hotspot", name: "Haret Hreik", nameAr: "حارة حريك", lon: 35.533, lat: 33.8405, area: "metro", kind: "hotspot", labelDx: 18, labelDy: 24, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" },
  { id: "hadath-hotspot", name: "Hadath", nameAr: "الحدث", lon: 35.5362, lat: 33.8361, area: "metro", kind: "hotspot", labelDx: 58, labelDy: -12, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" },
  { id: "chiyah-hotspot", name: "Chiyah", nameAr: "الشياح", lon: 35.5239, lat: 33.8429, area: "metro", kind: "hotspot", labelDx: -64, labelDy: -24, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" },
  { id: "borj-el-barajneh-hotspot", name: "Burj El Barajneh", nameAr: "برج البراجنة", lon: 35.5381, lat: 33.844, area: "metro", kind: "hotspot", labelDx: 76, labelDy: 26, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" },
  { id: "laylaki-hotspot", name: "Laylaki", nameAr: "الليلكي", lon: 35.5437, lat: 33.8422, area: "metro", kind: "hotspot", labelDx: -70, labelDy: 45, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" },
  { id: "choueifat-amroussieh-hotspot", name: "Choueifat–Amroussieh", nameAr: "الشويفات–العمروسية", lon: 35.536, lat: 33.8101, area: "metro", kind: "hotspot", labelDx: 25, labelDy: 68, source: beirutMountLebanonDamageSource, detail: "Named UNDP damage concentration; no town-specific building count published" }
];

// UNDP names these eight municipalities as the locations where post-2024 recovery
// priorities were developed. The source does not publish town-level damage totals.
const townEvidenceLocations2024 = [
  { id: "abbasiyeh-recovery", name: "Abbasiyeh", nameAr: "العباسية", lon: 35.2831, lat: 33.2971, area: "tyre", kind: "recovery", labelDx: 20, labelDy: -22, source: municipalRecovery2024Source },
  { id: "borghliyeh-recovery", name: "Borghliyeh", nameAr: "برغلية", lon: 35.2407, lat: 33.3121, area: "tyre", kind: "recovery", labelDx: -20, labelDy: 18, source: municipalRecovery2024Source },
  { id: "borj-rahal-recovery", name: "Borj Rahal", nameAr: "برج رحال", lon: 35.2799, lat: 33.3109, area: "tyre", kind: "recovery", labelDx: 22, labelDy: 20, source: municipalRecovery2024Source },
  { id: "tayer-debba-recovery", name: "Tayer Debba", nameAr: "طير دبّا", lon: 35.2772, lat: 33.2741, area: "tyre", kind: "recovery", labelDx: -24, labelDy: 28, source: municipalRecovery2024Source },
  { id: "naqoura-recovery", name: "Naqoura", nameAr: "الناقورة", lon: 35.1298, lat: 33.1183, area: "tyre", kind: "recovery", labelDx: -20, labelDy: -16, source: municipalRecovery2024Source },
  { id: "deir-qanoun-en-nahr-recovery", name: "Deir Qanoun En Nahr", nameAr: "دير قانون النهر", lon: 35.3061, lat: 33.3031, area: "tyre", kind: "recovery", labelDx: 25, labelDy: -34, source: municipalRecovery2024Source },
  { id: "tebnin-recovery", name: "Tebnin", nameAr: "تبنين", lon: 35.4050, lat: 33.1930, area: "tyre", kind: "recovery", labelDx: 22, labelDy: 12, source: municipalRecovery2024Source },
  { id: "rcheif-recovery", name: "Rcheif", nameAr: "رشاف", lon: 35.3611, lat: 33.1442, area: "tyre", kind: "recovery", labelDx: -22, labelDy: -18, source: municipalRecovery2024Source }
];

function townEvidenceLocationsForPeriod() {
  return activeMapPeriod === "2024" ? townEvidenceLocations2024 : townEvidenceLocations2026;
}

function townEvidenceLocationsForFocus() {
  return townEvidenceLocationsForPeriod();
}

const occupiedAreaLocations2026 = [
  { id: "labbouneh", name: "Labbouneh", nearby: "Alma al-Shaab", lon: 35.176, lat: 33.090, area: "south" },
  { id: "jabal-blat", name: "Jabal Blat", nearby: "Ramyah", lon: 35.604, lat: 33.104, area: "south" },
  { id: "jal-al-deir", name: "Jal al-Deir", nearby: "Aitaroun", lon: 35.477, lat: 33.093, area: "south" },
  { id: "markaba-houla", name: "Markaba-Houla road", nearby: "Markaba and Houla", lon: 35.535, lat: 33.242, area: "south" },
  { id: "hamames", name: "Hamames Hill", nearby: "Khiam", lon: 35.567, lat: 33.313, area: "south" }
];

function occupiedAreaLayerForPeriod() {
  if (activeMapPeriod !== "2026") return null;
  return {
    label: "Reported occupied-area locator",
    labelAr: "مؤشر موقع لمنطقة محتلة مُبلّغ عنها",
    context: "The UN report records Israeli presence in five positions and two buffer zones north of the Blue Line. This map marks the five source-locatable positions only; it does not draw unverified buffer-zone boundaries.",
    contextAr: "يوثق تقرير الأمم المتحدة وجوداً إسرائيلياً في خمسة مواقع ومنطقتي عزل شمال الخط الأزرق. تضع هذه الخريطة علامات للمواقع الخمسة القابلة للتحديد من المصدر فقط، ولا ترسم حدود منطقتي العزل غير المنشورة.",
    source: occupationSource,
    locations: occupiedAreaLocations2026
  };
}

function occupiedAreaLayerLabel(layer) {
  return activeLocale === "ar" ? layer.labelAr : layer.label;
}

function occupiedAreaLayerContext(layer) {
  return activeLocale === "ar" ? layer.contextAr : layer.context;
}

function occupiedAreaLocationsForFocus(layer) {
  return layer?.locations || [];
}

function updateRegionPanel({ kicker, name, topic, score, context, labels, values, source }) {
  const panel = document.querySelector("#regionPanel");
  if (!panel) return;
  document.querySelector("#regionKicker").textContent = kicker;
  document.querySelector(".region-name").textContent = name;
  document.querySelector("#regionTopic").textContent = topic;
  document.querySelector("#regionScore").textContent = score;
  document.querySelector("#regionContext").textContent = context;
  document.querySelector("#regionStatOneLabel").textContent = labels[0];
  document.querySelector("#regionStatTwoLabel").textContent = labels[1];
  document.querySelector("#regionStatThreeLabel").textContent = labels[2];
  document.querySelector("#regionProjects").textContent = values[0];
  document.querySelector("#regionGap").textContent = values[1];
  document.querySelector("#regionProgress").textContent = values[2];
  const sourceLink = document.querySelector("#regionSource");
  sourceLink.href = source.href;
  sourceLink.textContent = source.source;
  sourceLink.insertAdjacentHTML("beforeend", " <span>↗</span>");
  localizeTextTree(panel);
}

function showRegion(region) {
  const profile = mapProfileForPeriod(region);
  const data = profile?.[activeMap];
  if (!profile || !data) return;
  selectedRegion = region;
  updateRegionPanel({
    kicker: mapTopics[activeMap].label,
    name: profile.name,
    topic: data.topic,
    score: data.signal,
    context: data.context,
    labels: mapStatLabels[activeMap],
    values: [data.assessment, data.lens, data.evidence],
    source: data
  });
}

function showDistrict(district, governorate) {
  const profile = mapProfileForPeriod(governorate);
  const data = profile?.[activeMap];
  if (!profile || !data) return;
  selectedRegion = governorate;
  updateRegionPanel({
    kicker: "DISTRICT VIEW",
    name: district,
    topic: data.topic,
    score: data.signal,
    context: `This is the official ${district} district boundary. ${data.context} The colour reflects the documented ${profile.name} context and is not inferred as a district-specific metric.`,
    labels: ["District", "Governorate context", "Primary source"],
    values: [district, profile.name, data.evidence],
    source: data
  });
}

const geoMap = document.querySelector("#geoMap");
const mapStatus = document.querySelector("#mapStatus");
const mapLegend = document.querySelector("#mapLegend");
const mapContextStatus = document.querySelector("#mapContextStatus");
const townEvidencePanel = document.querySelector("#townEvidencePanel");
let activeMap = "severity";
let activeMapPeriod = "2026";
let occupationOverlayVisible = false;
let selectedRegion = "South";
let officialMapFeatures = [];
let officialDistrictFeatures = [];
let municipalBoundariesAvailable = true;
const regionAliases = { "Baalbek-El Hermel": "Baalbek-Hermel", "El Nabatieh": "Nabatieh", "Bekaa": "Beqaa", "El Beqaa": "Beqaa" };
const MAP_WIDTH = 640;
const MAP_HEIGHT = 660;

const nationalReferenceLocations = [
  { name: "Beirut", nameAr: "بيروت", lon: 35.5018, lat: 33.8938, labelDx: 10, labelDy: -8 },
  { name: "Baalbek", nameAr: "بعلبك", lon: 36.2181, lat: 34.0058, labelDx: 10, labelDy: -8 },
  { name: "Saida", nameAr: "صيدا", lon: 35.3711, lat: 33.5617, labelDx: -10, labelDy: -8 },
  { name: "Nabatieh", nameAr: "النبطية", lon: 35.4839, lat: 33.377, labelDx: 10, labelDy: -8 },
  { name: "Sour", nameAr: "صور", lon: 35.2012, lat: 33.2700, labelDx: -10, labelDy: -8 }
];

function normalizedRegion(name) {
  return regionAliases[name] || name;
}

function mapCoordinates(geometry) {
  const coordinates = [];
  const walk = value => {
    if (typeof value[0] === "number") coordinates.push(value);
    else value.forEach(walk);
  };
  walk(geometry.coordinates);
  return coordinates;
}

function polygonRings(geometry) {
  return geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat();
}

function pathForGeometry(geometry, project) {
  return polygonRings(geometry).map(ring => ring.map(([longitude, latitude], index) => {
    const point = project(longitude, latitude);
    return `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ") + " Z").join(" ");
}

function createMapProjection(features) {
  const points = features.flatMap(feature => mapCoordinates(feature.geometry));
  const longitudes = points.map(point => point[0]);
  const latitudes = points.map(point => point[1]);
  const longitudeSpan = Math.max(...longitudes) - Math.min(...longitudes);
  const latitudeSpan = Math.max(...latitudes) - Math.min(...latitudes);
  const longitudePad = Math.max(longitudeSpan * 0.045, 0.008);
  const latitudePad = Math.max(latitudeSpan * 0.045, 0.006);
  const minLongitude = Math.min(...longitudes) - longitudePad;
  const maxLongitude = Math.max(...longitudes) + longitudePad;
  const minLatitude = Math.min(...latitudes) - latitudePad;
  const maxLatitude = Math.max(...latitudes) + latitudePad;
  const padding = 18;
  const scale = Math.min((MAP_WIDTH - padding * 2) / (maxLongitude - minLongitude), (MAP_HEIGHT - padding * 2) / (maxLatitude - minLatitude));
  const offsetX = (MAP_WIDTH - (maxLongitude - minLongitude) * scale) / 2;
  const offsetY = (MAP_HEIGHT - (maxLatitude - minLatitude) * scale) / 2;
  return (longitude, latitude) => ({ x: offsetX + (longitude - minLongitude) * scale, y: MAP_HEIGHT - offsetY - (latitude - minLatitude) * scale });
}

function markerRadius(location) {
  return location.count ? Math.min(17, 5 + Math.log10(location.count) * 4.2) : 6;
}

function mapMarkerText(location) {
  if (location.kind === "recovery") return activeLocale === "ar" ? "أولوية تعافٍ بلدية" : "municipal recovery priority";
  if (location.count) return activeLocale === "ar" ? `${location.count.toLocaleString("en-US")} مبانٍ مدمّرة` : `${location.count.toLocaleString("en-US")} destroyed`;
  return activeLocale === "ar" ? "تركيز ضرر موثق" : "documented damage concentration";
}

function renderEvidenceMarkers(project) {
  return townEvidenceLocationsForFocus().map(location => {
    const point = project(location.lon, location.lat);
    const isMetroCluster = activeMapPeriod === "2026" && location.kind === "hotspot";
    const showLabel = !isMetroCluster || location.id === "haret-hreik-hotspot";
    const label = isMetroCluster && location.id === "haret-hreik-hotspot"
      ? (activeLocale === "ar" ? "ضاحية بيروت الجنوبية · 6 مناطق" : "Beirut southern suburbs · 6 named areas")
      : (activeLocale === "ar" ? location.nameAr : location.name);
    const metric = showLabel && !isMetroCluster ? mapMarkerText(location) : "";
    const labelX = point.x + location.labelDx;
    const labelY = point.y + location.labelDy;
    const textAnchor = location.labelDx < 0 ? "end" : "start";
    const marker = location.kind === "destroyed"
      ? `<circle class="town-dot town-marker-destroyed" cx="${point.x}" cy="${point.y}" r="${markerRadius(location).toFixed(1)}" />`
      : location.kind === "recovery"
        ? `<rect class="town-dot town-marker-recovery" x="${point.x - 5.5}" y="${point.y - 5.5}" width="11" height="11" rx="2" />`
        : `<rect class="town-dot town-marker-concentration" x="${point.x - 5.5}" y="${point.y - 5.5}" width="11" height="11" transform="rotate(45 ${point.x} ${point.y})" />`;
    const markerLabel = activeLocale === "ar" ? `اعرض دليل ${label}` : `Show evidence for ${label}`;
    const callout = showLabel ? `<line class="town-callout-line" x1="${point.x}" y1="${point.y}" x2="${labelX}" y2="${labelY - 5}" />` : "";
    const text = showLabel ? `<text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}"><tspan>${label}</tspan><tspan class="town-marker-metric" x="${labelX}" dy="12">${metric}</tspan></text>` : "";
    return `<g class="town-location town-${location.kind}" data-town-evidence="${location.id}" role="button" tabindex="0" aria-label="${markerLabel}"><rect class="location-hit" x="${point.x - 18}" y="${point.y - 18}" width="36" height="36" rx="18" />${marker}${callout}${text}</g>`;
  }).join("");
}

function renderNationalReferenceLabels(project) {
  return `<g class="national-reference-layer">${nationalReferenceLocations.map(location => {
    const point = project(location.lon, location.lat);
    const label = activeLocale === "ar" ? location.nameAr : location.name;
    const textAnchor = location.labelDx < 0 ? "end" : "start";
    return `<g class="national-reference"><circle class="national-reference-dot" cx="${point.x}" cy="${point.y}" r="3.2" /><text x="${point.x + location.labelDx}" y="${point.y + location.labelDy}" text-anchor="${textAnchor}">${label}</text></g>`;
  }).join("")}</g>`;
}

function renderOccupationMarkers(project) {
  const layer = occupationOverlayVisible ? occupiedAreaLayerForPeriod() : null;
  if (!layer) return "";
  return occupiedAreaLocationsForFocus(layer).map(location => {
    const point = project(location.lon, location.lat);
    const label = `${location.name} · ${location.nearby}`;
    const marker = `<circle class="occupation-area-ring" cx="${point.x}" cy="${point.y}" r="8" /><circle class="occupation-area-dot" cx="${point.x}" cy="${point.y}" r="3" />`;
    const hitWidth = Math.max(34, label.length * 6 + 20);
    const layerLabel = occupiedAreaLayerLabel(layer);
    const ariaLabel = activeLocale === "ar" ? `اعرض ${layerLabel} قرب ${location.nearby}` : `Show ${layerLabel} near ${location.nearby}`;
    return `<g class="occupation-location" data-location="${location.id}" role="button" tabindex="0" aria-label="${ariaLabel}"><rect class="location-hit" x="${point.x - 12}" y="${point.y - 25}" width="${hitWidth}" height="32" rx="3" />${marker}<text x="${point.x + 10}" y="${point.y - 8}">${label}</text></g>`;
  }).join("");
}

function renderTownLayer(project) {
  return `<g class="town-layer">${renderEvidenceMarkers(project)}${renderOccupationMarkers(project)}</g>`;
}

function renderTownEvidenceSummary() {
  if (!townEvidencePanel) return;
  const locations = townEvidenceLocationsForFocus();
  if (activeMapPeriod === "2024") {
    const title = activeLocale === "ar" ? "أولويات تعافٍ بلدية بعد 2024" : "Post-2024 municipal recovery priorities";
    const summary = activeLocale === "ar"
      ? `تظهر ${locations.length} بلديات فقط في قضاء صور، وهي البلديات التي سُميت في عملية تحديد أولويات التعافي المحلية لبرنامج الأمم المتحدة الإنمائي.`
      : `The map shows ${locations.length} municipalities in Tyre Caza, the locations named in UNDP’s local recovery-priority process.`;
    const boundary = activeLocale === "ar"
      ? "هذه علامات لأولويات التعافي، وليست أعداد أضرار بالمباني. لا ينشر المصدر أرقاماً قابلة للمقارنة للأضرار على مستوى البلدة."
      : "These are recovery-priority locators, not building-damage counts. The source does not publish comparable town-level damage figures.";
    townEvidencePanel.innerHTML = `<p class="town-panel-kicker">${activeLocale === "ar" ? "مسار ما بعد 2024" : "POST-2024 TRACK"}</p><h3>${title}</h3><p>${summary}</p><p class="town-panel-boundary">${boundary}</p><div class="town-panel-sources"><a href="${municipalRecovery2024Source.href}" target="_blank" rel="noreferrer">${activeLocale === "ar" ? "مصدر أولويات التعافي البلدي لبرنامج الأمم المتحدة الإنمائي" : "UNDP municipal recovery-priorities source"} ↗</a></div>`;
    return;
  }
  const countLocations = locations.filter(location => location.count).length;
  const hotspotLocations = locations.length - countLocations;
  const title = activeLocale === "ar" ? "ماذا تُظهر الخريطة" : "What this map shows";
  const summary = activeLocale === "ar"
    ? `تعرض الخريطة الوطنية ${locations.length} محددات مواقع فقط: ${countLocations} بلدات نشر المصدر لها أعداد مبانٍ مدمّرة، و${hotspotLocations} مناطق سماها المصدر كمناطق تركز للضرر من دون أعداد قابلة للمقارنة على مستوى البلدة.`
    : `This national map shows ${locations.length} source-named locators: ${countLocations} towns with published destroyed-building counts and ${hotspotLocations} named damage concentrations without comparable town-level counts.`;
  const boundary = activeLocale === "ar"
    ? "عدم ظهور بلدة لا يعني عدم وجود ضرر فيها؛ بل يعني أن المصدر المستخدم هنا لا ينشر لها علامة قابلة للمقارنة على مستوى البلدة."
    : "An unmarked town is not a no-damage designation; it means the cited source does not publish a comparable town-level marker for it.";
  const southLabel = activeLocale === "ar" ? "تقييم برنامج الأمم المتحدة الإنمائي لجنوب لبنان" : "UNDP South Lebanon assessment";
  const metroLabel = activeLocale === "ar" ? "تقييم برنامج الأمم المتحدة الإنمائي لبيروت وجبل لبنان" : "UNDP Beirut & Mount Lebanon assessment";
  townEvidencePanel.innerHTML = `<p class="town-panel-kicker">${activeLocale === "ar" ? "أدلة على مستوى البلدة" : "TOWN-LEVEL EVIDENCE"}</p><h3>${title}</h3><p>${summary}</p><p class="town-panel-boundary">${boundary}</p><div class="town-panel-sources"><a href="${southLebanonDamageSource.href}" target="_blank" rel="noreferrer">${southLabel} ↗</a><a href="${beirutMountLebanonDamageSource.href}" target="_blank" rel="noreferrer">${metroLabel} ↗</a></div>`;
}

function showTownEvidence(location) {
  if (!townEvidencePanel) return;
  const label = activeLocale === "ar" ? location.nameAr : location.name;
  const isRecovery = location.kind === "recovery";
  const markerType = isRecovery
    ? (activeLocale === "ar" ? "أولوية تعافٍ بلدية" : "Municipal recovery priority")
    : location.count
    ? (activeLocale === "ar" ? "عدد منشور للمباني المدمّرة" : "Published destroyed-building count")
    : (activeLocale === "ar" ? "منطقة تركز ضرر مسماة" : "Named damage concentration");
  const detail = isRecovery
    ? (activeLocale === "ar" ? "سُمّيت هذه البلدية في عملية تحديد أولويات التعافي لبرنامج الأمم المتحدة الإنمائي في قضاء صور. ولا ينشر المصدر أرقام أضرار بالمباني على مستوى البلدة." : "UNDP names this municipality in its Tyre Caza recovery-priority process. The source does not publish a town-level building-damage figure.")
    : location.count
    ? (activeLocale === "ar" ? `${location.count.toLocaleString("en-US")} مبانٍ مدمّرة بالكامل في هذا المحدد.` : `${location.count.toLocaleString("en-US")} buildings completely destroyed at this locator.`)
    : (activeLocale === "ar" ? "سمّى التقييم هذه المنطقة ضمن تركزات الضرر، لكنه لا ينشر لها عدداً منفصلاً للمباني على مستوى البلدة." : "The assessment names this area as a damage concentration but does not publish a separate town-level building count.");
  const locatorNote = activeLocale === "ar"
    ? "الموضع مؤشر تقريبي لموقع البلدة، وليس حدوداً إدارية أو تقديراً شاملاً للضرر."
    : "The point is an approximate town locator, not an administrative boundary or a complete damage inventory.";
  const figure = location.count ? `<p class="town-panel-figure">${location.count.toLocaleString("en-US")}</p>` : "";
  townEvidencePanel.innerHTML = `<p class="town-panel-kicker">${markerType}</p><h3>${label}</h3>${figure}<p>${detail}</p><p class="town-panel-boundary">${locatorNote}</p><a class="town-panel-source" href="${location.source.href}" target="_blank" rel="noreferrer">${location.source.source} <span>↗</span></a>`;
}

function showOccupationLocation(location) {
  const layer = occupiedAreaLayerForPeriod();
  if (!layer || !townEvidencePanel) return;
  const label = activeLocale === "ar" ? "منطقة محتلة مُبلّغ عنها" : "Reported occupied area";
  const description = activeLocale === "ar"
    ? `منطقة مُبلّغ عنها قرب ${location.nearby}. هذه علامة موقع للمكان الذي يوثقه المصدر، وليست حدوداً مرسومة للسيطرة الإقليمية أو لمنطقة عزل.`
    : `A reported occupied area near ${location.nearby}. This is a locator for the place documented in the source, not a drawn boundary of territorial control or a buffer zone.`;
  townEvidencePanel.innerHTML = `<p class="town-panel-kicker">${label}</p><h3>${location.name}</h3><p>${description}</p><p class="town-panel-boundary">${occupiedAreaLayerContext(layer)}</p><a class="town-panel-source" href="${(location.source || layer.source).href}" target="_blank" rel="noreferrer">${(location.source || layer.source).source} <span>↗</span></a>`;
}

function bindMapInteractions() {
  document.querySelectorAll(".town-location").forEach(marker => {
    const activate = () => {
      const location = townEvidenceLocationsForFocus().find(item => item.id === marker.dataset.townEvidence);
      if (location) showTownEvidence(location);
    };
    marker.addEventListener("click", activate);
    marker.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
  document.querySelectorAll(".occupation-location").forEach(marker => {
    const activate = () => {
      const location = occupiedAreaLocationsForFocus(occupiedAreaLayerForPeriod()).find(item => item.id === marker.dataset.location);
      if (location) showOccupationLocation(location);
    };
    marker.addEventListener("click", activate);
    marker.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
}

function applyMapPalette() {
  const candidateLayer = occupationOverlayVisible ? occupiedAreaLayerForPeriod() : null;
  const layer = occupiedAreaLocationsForFocus(candidateLayer).length ? candidateLayer : null;
  const metricLegend = activeMapPeriod === "2024"
    ? (activeLocale === "ar"
      ? `<span class="legend-item"><i class="town-recovery-legend"></i>بلدية سُمّيت كأولوية للتعافي</span>`
      : `<span class="legend-item"><i class="town-recovery-legend"></i>Municipality named for recovery priorities</span>`)
    : activeLocale === "ar"
    ? `<span class="legend-item"><i class="town-count-legend"></i>بلدة لديها عدد منشور للمباني المدمّرة</span><span class="legend-item"><i class="town-hotspot-legend"></i>تركيز ضرر مسمى في المصدر</span>`
    : `<span class="legend-item"><i class="town-count-legend"></i>Town with published destroyed-building count</span><span class="legend-item"><i class="town-hotspot-legend"></i>Source-named damage concentration</span>`;
  const occupationLegend = layer ? `<span class="legend-item occupation-legend"><i aria-hidden="true"></i>${occupiedAreaLayerLabel(layer)}</span>` : "";
  mapLegend.innerHTML = `${metricLegend}${occupationLegend}`;
  renderTownEvidenceSummary();
}

function renderOfficialMap(features, districtFeatures = officialDistrictFeatures) {
  const candidateLayer = occupationOverlayVisible ? occupiedAreaLayerForPeriod() : null;
  const occupiedLocations = occupiedAreaLocationsForFocus(candidateLayer);
  const project = createMapProjection(features);
  const layer = occupiedLocations.length ? candidateLayer : null;
  const occupationDescriptor = layer ? ` ${occupiedAreaLayerContext(layer)}` : "";
  const boundaryDescription = municipalBoundariesAvailable
    ? (activeLocale === "ar" ? "بحدود بلدية محلية" : "with local municipal boundaries")
    : (activeLocale === "ar" ? "بحدود إدارية وطنية" : "with national administrative boundaries");
  const descriptor = activeMapPeriod === "2024"
    ? (activeLocale === "ar"
      ? `خريطة وطنية ${boundaryDescription}. تعرض فقط البلديات الثماني التي سماها برنامج الأمم المتحدة الإنمائي ضمن أولويات التعافي بعد 2024. لا تُلوّن الأقضية ولا تمثل العلامات أرقام أضرار للمباني.${occupationDescriptor}`
      : `A national map ${boundaryDescription}. It shows only the eight municipalities named by UNDP for post-2024 recovery priorities. Districts are not shaded and the markers do not represent building-damage counts.${occupationDescriptor}`)
    : (activeLocale === "ar"
      ? `خريطة وطنية ${boundaryDescription}. تعرض فقط الأماكن التي سُميت في تقييمات برنامج الأمم المتحدة الإنمائي لعام 2026؛ لا تُلوّن الأقضية ولا تفسر المناطق غير المعلمة على أنها خالية من الضرر.${occupationDescriptor}`
      : `A national map ${boundaryDescription}. It shows only places named in the cited 2026 UNDP assessments; districts are not shaded and unmarked places are not treated as undamaged.${occupationDescriptor}`);
  const title = activeMapPeriod === "2024"
    ? (activeLocale === "ar" ? "خريطة أولويات التعافي البلدية بعد 2024" : "Post-2024 municipal recovery-priorities map")
    : (activeLocale === "ar" ? "خريطة أدلة موثقة على مستوى البلدة" : "Documented town-level evidence map");
  geoMap.innerHTML = `<title id="mapTitle">${title}</title><desc id="mapDesc">${descriptor}</desc><g class="boundary-layer">${features.map(feature => {
    return `<path class="region official-region base-region" d="${pathForGeometry(feature.geometry, project)}" fill-rule="evenodd" aria-hidden="true" />`;
  }).join("")}</g><g class="district-boundary-layer">${districtFeatures.map(feature => `<path class="district-outline" d="${pathForGeometry(feature.geometry, project)}" fill-rule="evenodd" aria-hidden="true" />`).join("")}</g>${renderNationalReferenceLabels(project)}${renderTownLayer(project)}`;
  applyMapPalette();
  bindMapInteractions();
}

async function loadOfficialMap() {
  try {
    const districtResponse = await fetch(apiUrl("/api/map/districts"));
    if (!districtResponse.ok) throw new Error("Boundary data unavailable");
    const districts = await districtResponse.json();
    officialDistrictFeatures = (districts.data?.features || []).filter(feature => feature?.geometry && ["Polygon", "MultiPolygon"].includes(feature.geometry.type));
    if (!officialDistrictFeatures.length) throw new Error("District boundary data incomplete");
    officialMapFeatures = officialDistrictFeatures;
    municipalBoundariesAvailable = false;
    renderOfficialMap(officialMapFeatures, officialDistrictFeatures);
    mapStatus.innerHTML = "";
    mapStatus.classList.add("ready");
    try {
      const municipalityResponse = await fetch(apiUrl("/api/map/municipalities"));
      if (!municipalityResponse.ok) throw new Error("Municipality boundary data unavailable");
      const municipalities = await municipalityResponse.json();
      const municipalityFeatures = (municipalities.data?.features || []).filter(feature => feature?.geometry && ["Polygon", "MultiPolygon"].includes(feature.geometry.type));
      if (municipalityFeatures.length < 1000) throw new Error("Municipality boundary data incomplete");
      officialMapFeatures = municipalityFeatures;
      municipalBoundariesAvailable = true;
      renderOfficialMap(officialMapFeatures, officialDistrictFeatures);
    } catch (municipalityError) {
      officialMapFeatures = officialDistrictFeatures;
      municipalBoundariesAvailable = false;
      renderOfficialMap(officialMapFeatures, officialDistrictFeatures);
    }
  } catch (error) {
    mapStatus.innerHTML = `<span></span>${uiText("Source-backed place map unavailable", "خريطة المواقع المدعومة بالمصادر غير متاحة")}`;
  }
}

document.querySelectorAll(".occupation-toggle").forEach(toggle => toggle.addEventListener("click", () => {
  if (toggle.disabled) return;
  occupationOverlayVisible = !occupationOverlayVisible;
  toggle.classList.toggle("active", occupationOverlayVisible);
  toggle.setAttribute("aria-pressed", String(occupationOverlayVisible));
  if (officialMapFeatures.length) renderOfficialMap(officialMapFeatures);
}));

document.querySelectorAll(".map-period-button").forEach(button => button.addEventListener("click", () => {
  const period = button.dataset.mapPeriod;
  if (period !== "2024" && period !== "2026") return;
  activeMapPeriod = period;
  updateMapPeriodControls();
  if (officialMapFeatures.length) renderOfficialMap(officialMapFeatures);
}));

function updateOccupiedAreaControls() {
  const hasOccupiedAreaLayer = activeMapPeriod === "2026";
  if (!hasOccupiedAreaLayer) occupationOverlayVisible = false;
  document.querySelectorAll(".occupation-toggle").forEach(toggle => {
    const label = hasOccupiedAreaLayer
      ? (activeLocale === "ar" ? "المناطق المحتلة" : "Occupied areas")
      : (activeLocale === "ar" ? "المناطق المحتلة (بيانات 2026)" : "Occupied areas (2026 data)");
    toggle.textContent = label;
    toggle.disabled = !hasOccupiedAreaLayer;
    toggle.classList.toggle("active", hasOccupiedAreaLayer && occupationOverlayVisible);
    toggle.setAttribute("aria-pressed", String(hasOccupiedAreaLayer && occupationOverlayVisible));
    toggle.setAttribute("aria-disabled", String(!hasOccupiedAreaLayer));
  });
}

function updateMapPeriodControls() {
  document.querySelectorAll(".map-period-button").forEach(button => {
    const selected = button.dataset.mapPeriod === activeMapPeriod;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  updateOccupiedAreaControls();
  if (mapContextStatus) {
    mapContextStatus.textContent = activeMapPeriod === "2024"
      ? (activeLocale === "ar"
        ? "عرض 2024: أولويات تعافٍ بلدية بعد 2024 في قضاء صور، لا أرقام أضرار بالمباني على مستوى البلدة."
        : "2024 view: post-2024 municipal recovery priorities in Tyre Caza, not town-level building-damage counts.")
      : (activeLocale === "ar"
        ? "عرض 2026: محددات بلدات ومناطق سُميت في تقييمات برنامج الأمم المتحدة الإنمائي. وعدم ظهور مكان لا يعني عدم وجود ضرر فيه."
        : "2026 view: town and area locators named in the cited UNDP assessments. Unmarked places are not a no-damage designation.");
  }
}

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll("[data-toast]").forEach(element => element.addEventListener("click", () => showToast(element.dataset.toast)));
document.querySelector(".menu-button")?.addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));

const tabPanels = [...document.querySelectorAll("[data-tab-panel]")];
const tabLinks = [...document.querySelectorAll("[data-tab-link]")];
const tabNames = {
  overview: "Overview",
  response: "Response tracker",
  actors: "Actors & actions",
  evidence: "Evidence briefs",
  projects: "Data library",
  funding: "Funding flows",
  leap: "LEAP dossier",
  updates: "Source monitor",
  sources: "Sources"
};

const tabNamesArabic = {
  overview: "نظرة عامة",
  response: "متابعة الاستجابة",
  actors: "الجهات الفاعلة والإجراءات",
  evidence: "موجزات الأدلة",
  projects: "مكتبة البيانات",
  funding: "مسارات التمويل",
  leap: "ملف ليب",
  updates: "متابعة المصادر",
  sources: "المصادر"
};

function resolveTab(hash = window.location.hash) {
  const view = hash.replace(/^#/, "");
  return Object.hasOwn(tabNames, view) ? view : "overview";
}

function activateTab(view, { resetScroll = true } = {}) {
  const activeView = resolveTab(`#${view}`);
  tabPanels.forEach(panel => { panel.hidden = panel.dataset.tabPanel !== activeView; });
  tabLinks.forEach(link => {
    const isActive = link.dataset.tabLink === activeView;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-selected", String(isActive));
    if (link.classList.contains("nav-link")) link.toggleAttribute("aria-current", isActive);
  });
  const currentView = document.querySelector("[data-current-view]");
  if (currentView) currentView.textContent = activeLocale === "ar" ? tabNamesArabic[activeView] : tabNames[activeView].toUpperCase();
  const pageName = activeLocale === "ar" ? tabNamesArabic[activeView] : tabNames[activeView];
  const siteName = activeLocale === "ar" ? "مرصد إعادة إعمار لبنان" : "Rebuild Lebanon";
  document.title = `${pageName} | ${siteName}`;
  document.body.dataset.activeTab = activeView;
  if (resetScroll) window.scrollTo({ top: 0, behavior: "auto" });
}

tabLinks.forEach(link => link.addEventListener("click", event => {
  const view = link.dataset.tabLink;
  event.preventDefault();
  document.querySelector(".sidebar").classList.remove("open");
  if (window.location.hash === `#${view}`) activateTab(view);
  else window.location.hash = view;
}));

window.addEventListener("hashchange", () => activateTab(resolveTab()));

const languageToggle = document.querySelector("#languageToggle");

function updateLocaleControls() {
  const isArabic = activeLocale === "ar";
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("is-arabic", isArabic);
  languageToggle.textContent = isArabic ? "English" : "العربية";
  languageToggle.setAttribute("aria-label", isArabic ? "Switch website language to English" : "Switch website language to Arabic");
  projectSearch.placeholder = isArabic ? "ابحث في السجلات أو البرامج أو المصادر" : "Search records, programs, or sources";
  recordSort.options[0].textContent = isArabic ? "الأحدث أولاً" : "Latest first";
  recordSort.options[1].textContent = isArabic ? "أكبر قيمة مالية" : "Largest financial scale";
  recordSort.options[2].textContent = isArabic ? "أبجدياً" : "A–Z";
  document.querySelector(".menu-button")?.setAttribute("aria-label", isArabic ? "فتح التنقل" : "Open navigation");
}

function applyLocale(locale, { persist = true } = {}) {
  activeLocale = locale === "ar" ? "ar" : "en";
  if (persist) {
    try {
      window.localStorage.setItem("observatory-language", activeLocale);
    } catch (error) {
      // Continue without storage when the browser blocks local persistence.
    }
  }
  updateLocaleControls();
  updateFreshness();
  renderSectors();
  renderSources();
  renderFramework();
  renderPeriodComparison();
  renderAftermathBoard();
  renderAftermathDetails();
  renderRegistries();
  renderRecords();
  renderNews();
  if (geoMap) {
    updateMapPeriodControls();
    if (officialMapFeatures.length) renderOfficialMap(officialMapFeatures);
  }
  activateTab(resolveTab(), { resetScroll: false });
  localizeTextTree();
}

const localeObserver = new MutationObserver(mutations => {
  if (activeLocale !== "ar") return;
  mutations.forEach(mutation => mutation.addedNodes.forEach(localizeTextTree));
});
localeObserver.observe(document.body, { childList: true, subtree: true });

languageToggle.addEventListener("click", () => applyLocale(activeLocale === "ar" ? "en" : "ar"));

const initialTab = resolveTab();
if (window.location.hash !== `#${initialTab}`) history.replaceState(null, "", `#${initialTab}`);
activateTab(initialTab, { resetScroll: false });

renderSectors();
renderSources();
renderRecords();
renderFramework();
renderPeriodComparison();
renderAftermathBoard();
renderAftermathDetails();
renderRegistries();
renderNews();
loadApplicationData();
loadNews();
if (geoMap && mapStatus && mapLegend) loadOfficialMap();
applyLocale(activeLocale, { persist: false });
