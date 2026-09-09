/* Presentation metadata only. Original records, amounts and source URLs stay unchanged.
 * Keys are exact record titles, never array positions or keyword-derived claims.
 * Arabic titles are reading aids, not official translations of source publications.
 */
(function (root) {
  const reviews = typeof module !== "undefined" && module.exports
    ? require("./classification-reviews.js") : root.ObservatoryClassificationReviews;
  // IDs are assigned once. Preserve each literal ID if its reading title changes;
  // never renumber this registry when adding, removing or reordering records.
  const readingRecords = Object.freeze({
    "Lebanon Rapid Damage & Needs Assessment (RDNA)": ["rec-0001", "التقييم السريع للأضرار والاحتياجات في لبنان"],
    "Lebanon Emergency Assistance Project (LEAP)": ["rec-0002", "مشروع المساعدة الطارئة للبنان (LEAP)"],
    "LEAP Project Design and Safeguards": ["rec-0003", "تصميم مشروع ليب وضماناته البيئية والاجتماعية"],
    "LEAP Procurement Plan": ["rec-0004", "خطة المشتريات لمشروع ليب"],
    "LEAP Public-Building Framework Procurement": ["rec-0005", "طلب إبداء اهتمام لخدمات المباني العامة ضمن ليب"],
    "LEAP Environmental and Social Services Framework Procurement": ["rec-0006", "طلب إبداء اهتمام للخدمات البيئية والاجتماعية ضمن ليب"],
    "Norway Additional Support for the Lebanese Armed Forces": ["rec-0007", "دعم نرويجي إضافي للجيش اللبناني"],
    "Stabilization in Southern Lebanon": ["rec-0008", "دعم الاستقرار في جنوب لبنان"],
    "Socioeconomic Impacts of the 2024 War": ["rec-0009", "الآثار الاجتماعية والاقتصادية لحرب 2024"],
    "Lebanon Response Plan 2026": ["rec-0010", "خطة الاستجابة للبنان لعام 2026"],
    "Women’s Economic Empowerment Project": ["rec-0011", "مشروع التمكين الاقتصادي للنساء"],
    "South Lebanon Municipal Recovery Support": ["rec-0012", "دعم التعافي البلدي في جنوب لبنان"],
    "Lebanon Host Communities Support Project: Phase 2": ["rec-0013", "مشروع دعم المجتمعات المضيفة في لبنان: المرحلة 2"],
    "EU Support to Lebanese Armed Forces Recovery Role": ["rec-0014", "دعم الاتحاد الأوروبي لدور الجيش اللبناني في التعافي"],
    "Karantina Area-Based Urban Recovery": ["rec-0015", "التعافي الحضري المتكامل في الكرنتينا"],
    "Rapid Building Damage Assessment: Beirut & Mount Lebanon": ["rec-0016", "التقييم السريع لأضرار المباني في بيروت وجبل لبنان"],
    "Building-Level Damage Assessment: South Lebanon": ["rec-0017", "تقييم أضرار المباني في جنوب لبنان"],
    "School Rehabilitation & Learning Continuity Alert": ["rec-0018", "تنبيه بشأن تأهيل المدارس واستمرارية التعليم"],
    "Local Authorities Post-War Rapid Impact Assessment": ["rec-0019", "تقييم سريع لآثار الحرب بالتعاون مع السلطات المحلية"],
    "National Response Operations & Essential Services": ["rec-0020", "عمليات الاستجابة الوطنية والخدمات الأساسية"],
    "MSME & Cooperative Stabilization Micro-Grants": ["rec-0021", "منح صغيرة لدعم استقرار المؤسسات والتعاونيات"],
    "Solar Public Services Partnership": ["rec-0022", "شراكة لتزويد الخدمات العامة بالطاقة الشمسية"],
    "Justice Palace Energy Resilience": ["rec-0023", "تعزيز استمرارية الطاقة في قصر العدل"],
    "Local Development Platforms & Municipal Observatories": ["rec-0024", "منصات التنمية المحلية والمراصد البلدية"],
    "Municipal Preparedness & Community Coordination": ["rec-0025", "الجهوزية البلدية والتنسيق المجتمعي"],
    "National Waste Management Planning & GIS Platform": ["rec-0026", "التخطيط الوطني لإدارة النفايات ومنصة المعلومات الجغرافية"],
    "Emergency Water & Wastewater Service Continuity": ["rec-0027", "استمرارية خدمات المياه والصرف الصحي في الطوارئ"],
    "School Rehabilitation & Shelter Decommissioning": ["rec-0028", "تأهيل المدارس وإعادتها من الإيواء إلى التعليم"],
    "Urban Crisis Response, Recovery & Reconstruction Framework": ["rec-0029", "إطار الاستجابة للأزمات الحضرية والتعافي وإعادة الإعمار"],
    "France–UNDP Cooperative Recovery Support": ["rec-0030", "دعم فرنسي وبرنامج الأمم المتحدة الإنمائي لتعافي التعاونيات"],
    "Lebanon Economic Monitor: Reconstruction Finance Context": ["rec-0031", "المرصد الاقتصادي للبنان: سياق تمويل إعادة الإعمار"],
    "Agricultural Damage and Recovery Assessment": ["rec-0032", "تقييم الأضرار الزراعية واحتياجات التعافي"],
    "South Lebanon Agrifood Recovery and Resilience": ["rec-0033", "تعافي النظم الزراعية والغذائية وصمودها في جنوب لبنان"],
    "Water and Food Sector Resilience Project": ["rec-0034", "مشروع تعزيز صمود قطاعَي المياه والغذاء"],
    "Post-War Sustainable Land-Use Planning Guide": ["rec-0035", "دليل التخطيط المستدام لاستخدام الأراضي بعد الحرب"],
    "Food Security & Rural Livelihoods Coordination": ["rec-0036", "تنسيق الأمن الغذائي وسبل العيش الريفية"],
    "UNICEF 2024 Emergency Response and Return Support": ["rec-0037", "استجابة اليونيسف للطوارئ ودعم العودة في 2024"],
    "Mobile Health and Public Health Service Continuity": ["rec-0038", "الخدمات الصحية المتنقلة واستمرارية الصحة العامة"],
    "Post-War WASH Repair and Shelter Water Support": ["rec-0039", "إصلاح المياه والصرف الصحي ودعم مياه مراكز الإيواء بعد الحرب"],
    "School Reopening and Learning Continuity After the 2024 War": ["rec-0040", "إعادة فتح المدارس واستمرارية التعليم بعد حرب 2024"],
    "Child Protection, Risk Education and Family Reunification": ["rec-0041", "حماية الأطفال والتوعية بالمخاطر ولمّ شمل الأسر"],
    "South Lebanon Disability-Inclusive Cash and WASH Support": ["rec-0042", "دعم نقدي وخدمات مياه وصرف صحي دامجة للإعاقة في الجنوب"],
    "Food Security and Agriculture Cluster Emergency Coordination": ["rec-0043", "تنسيق طوارئ مجموعة الأمن الغذائي والزراعة"],
    "Rapid Agricultural Needs Assessment After the 2024 War": ["rec-0044", "تقييم سريع للاحتياجات الزراعية بعد حرب 2024"],
    "Government and Local-Authority Recovery Support": ["rec-0045", "دعم التعافي للحكومة والسلطات المحلية"],
    "UNICEF 2024 Humanitarian Action Appeal": ["rec-0046", "نداء اليونيسف للعمل الإنساني لعام 2024"],
    "National Emergency Operations Room Activation": ["rec-0047", "تفعيل غرفة العمليات الوطنية للطوارئ"],
    "UNICEF Rapid Response Teams and Shelter Support": ["rec-0048", "فرق الاستجابة السريعة لليونيسف ودعم مراكز الإيواء"],
    "Mobile Healthcare and Essential Medicines Response": ["rec-0049", "الرعاية الصحية المتنقلة والاستجابة لاحتياجات الأدوية الأساسية"],
    "Shelter and Core Relief Items Coordination": ["rec-0050", "تنسيق الإيواء ومواد الإغاثة الأساسية"],
    "Protection Sector and Emergency Cash Coordination": ["rec-0051", "تنسيق قطاع الحماية والمساعدات النقدية الطارئة"],
    "Community Development Centre Protection Response": ["rec-0052", "استجابة مراكز التنمية المجتمعية لاحتياجات الحماية"],
    "Refugee Displacement Tracking and Protection Referrals": ["rec-0053", "تتبّع نزوح اللاجئين والإحالات إلى خدمات الحماية"],
    "Saida Collective Shelter Partnership": ["rec-0054", "شراكة لدعم مراكز الإيواء الجماعي في صيدا"],
    "Civil Defense Preparedness and Frontline Response": ["rec-0055", "جهوزية الدفاع المدني والاستجابة الميدانية"],
    "UNDP National Systems Support During the 2026 Escalation": ["rec-0056", "دعم البرنامج الإنمائي للأنظمة الوطنية خلال تصعيد 2026"],
    "UNICEF 2026 Humanitarian Flash Update Library": ["rec-0057", "مكتبة التحديثات الإنسانية العاجلة لليونيسف لعام 2026"],
    "Public Health Emergency Operations Centre Coordination": ["rec-0058", "تنسيق مركز عمليات طوارئ الصحة العامة"],
    "WHO Trauma, Cholera and Mental-Health Supply Support": ["rec-0059", "دعم منظمة الصحة العالمية لمستلزمات الإصابات والكوليرا والصحة النفسية"],
    "WFP Emergency Food and Cash Response": ["rec-0060", "استجابة برنامج الأغذية العالمي بالمساعدات الغذائية والنقدية الطارئة"],
    "UNHCR 2024 Collective-Shelter Upgrades": ["rec-0061", "تحسين مراكز الإيواء الجماعي بدعم مفوضية اللاجئين في 2024"],
    "UNHCR 2024 Core Relief Items and Emergency Cash": ["rec-0062", "مواد إغاثة أساسية ومساعدات نقدية طارئة من مفوضية اللاجئين في 2024"],
    "UNHCR Community Development Centre Continuity": ["rec-0063", "استمرارية مراكز التنمية المجتمعية بدعم مفوضية اللاجئين"],
    "UNHCR National Call-Centre and Referral Route": ["rec-0064", "مركز الاتصال الوطني ومسار الإحالات لدى مفوضية اللاجئين"],
    "Qatar and UNHCR Emergency Airlift": ["rec-0065", "جسر جوي طارئ من قطر ومفوضية اللاجئين"],
    "Lebanon Response Plan 2024 Inter-Agency Coordination": ["rec-0066", "التنسيق بين الوكالات ضمن خطة الاستجابة للبنان لعام 2024"],
    "UNICEF 2024 Child-Focused Emergency and Return Support": ["rec-0067", "دعم اليونيسف للأطفال في الطوارئ والعودة خلال 2024"],
    "Food Security and Agriculture Cluster Activation": ["rec-0068", "تفعيل مجموعة الأمن الغذائي والزراعة"],
    "Government-Allocated Refugee Shelter Sites": ["rec-0069", "مواقع إيواء للاجئين خصّصتها الحكومة"],
    "UNHCR Inter-Agency Convoy Support": ["rec-0070", "دعم مفوضية اللاجئين للقوافل المشتركة بين الوكالات"],
    "Humanitarian Airbridge for Displaced Families": ["rec-0071", "جسر جوي إنساني للأسر النازحة"],
    "Cash-for-Shelter Capacity Mapping": ["rec-0072", "حصر قدرات تقديم المساعدات النقدية للإيواء"],
    "Emergency Multipurpose Cash for Displaced Refugees": ["rec-0073", "مساعدات نقدية طارئة متعددة الأغراض للاجئين النازحين"],
    "Disability-Inclusive Emergency Cash Partnership": ["rec-0074", "شراكة للمساعدات النقدية الطارئة الدامجة للأشخاص ذوي الإعاقة"],
    "Protection-Cash Partner Training": ["rec-0075", "تدريب الشركاء على المساعدات النقدية لأغراض الحماية"],
    "Disability-Inclusive Shelter and Rehabilitation Support": ["rec-0076", "دعم الإيواء والتأهيل الدامج للأشخاص ذوي الإعاقة"],
    "UNICEF Emergency Medical Supplies for Frontline Care": ["rec-0077", "إمدادات اليونيسف الطبية الطارئة للرعاية الميدانية"],
    "UNICEF Mobile Primary Healthcare Satellite Units": ["rec-0078", "وحدات اليونيسف المتنقلة للرعاية الصحية الأولية"],
    "UNICEF Shelter WASH, Learning and Child-Protection Response": ["rec-0079", "استجابة اليونيسف للمياه والتعليم وحماية الأطفال في مراكز الإيواء"],
    "National Disability Allowance Payment Acceleration": ["rec-0080", "تسريع صرف البدل النقدي الوطني للأشخاص ذوي الإعاقة"],
    "Youth Volunteer Shelter Support": ["rec-0081", "دعم المتطوعين الشباب لمراكز الإيواء"],
    "Tyre Emergency Employment and First-Responder Support": ["rec-0082", "التشغيل الطارئ ودعم المستجيبين الأوائل في صور"],
    "Integrated Post-War Recovery Package": ["rec-0083", "حزمة متكاملة للتعافي بعد الحرب"],
    "Post-War Sustainable Land Use Guidebook": ["rec-0084", "دليل الاستخدام المستدام للأراضي بعد الحرب"],
    "Cooperative Reconstruction and Recovery Packages": ["rec-0085", "حزم إعادة إعمار التعاونيات وتعافيها"],
    "Emergency Municipal Waste-Service Continuity": ["rec-0086", "استمرارية خدمات النفايات البلدية في الطوارئ"],
    "Post-Disaster Rubble Management Procedures": ["rec-0087", "إجراءات إدارة الركام بعد الكوارث"],
    "Municipal Planning and Resilience Tools": ["rec-0088", "أدوات التخطيط البلدي وتعزيز الصمود"],
    "Building Destruction and Debris Assessment Series": ["rec-0089", "سلسلة تقييمات دمار المباني والركام"],
    "National IDP Registry for Early Recovery Targeting": ["rec-0090", "السجل الوطني للنازحين داخلياً لتوجيه التعافي المبكر"],
    "National Disability Allowance Emergency Support 2024": ["rec-0091", "دعم طارئ عبر البدل النقدي الوطني للإعاقة في 2024"],
    "Care for War-Wounded and Affected Children": ["rec-0092", "رعاية الأطفال الجرحى والمتأثرين بالحرب"],
    "Women-Led Humanitarian Response": ["rec-0093", "استجابة إنسانية بقيادة النساء"],
    "EU, UNDP and UNODC Post-Conflict Stability Support": ["rec-0094", "دعم الاستقرار بعد النزاع من الاتحاد الأوروبي والبرنامج الإنمائي ومكتب مكافحة المخدرات والجريمة"],
    "Tyre Caza Municipal Recovery Priorities": ["rec-0095", "أولويات التعافي البلدي في قضاء صور"],
    "Host-Community Services and Livelihoods Recovery": ["rec-0096", "تعافي الخدمات وسبل العيش في المجتمعات المضيفة"],
    "UNFPA Sexual and Reproductive Health and GBV Response": ["rec-0097", "استجابة صندوق الأمم المتحدة للسكان للصحة الجنسية والإنجابية والعنف القائم على النوع الاجتماعي"],
    "GBV and Reproductive Health Coordination Mechanisms": ["rec-0098", "آليات تنسيق خدمات الصحة الإنجابية والتصدي للعنف القائم على النوع الاجتماعي"],
    "Maternal Health Supplies via the Humanitarian Airbridge": ["rec-0099", "إمدادات صحة الأمهات عبر الجسر الجوي الإنساني"],
    "UNESCO Teaching Hubs for Displaced Learners": ["rec-0100", "مراكز اليونسكو التعليمية للمتعلمين النازحين"],
    "UNESCO Emergency Education and Heritage Response": ["rec-0101", "استجابة اليونسكو الطارئة للتعليم والتراث"],
    "Reading and Psychosocial Support in School Shelters": ["rec-0102", "القراءة والدعم النفسي والاجتماعي في المدارس المستخدمة للإيواء"],
    "Beirut Municipal Emergency Fleet Operations": ["rec-0103", "عمليات أسطول بلدية بيروت في الطوارئ"],
    "ICRC Medical-Service Continuity Support": ["rec-0104", "دعم اللجنة الدولية للصليب الأحمر لاستمرارية الخدمات الطبية"],
    "ICRC Water, Wastewater and Hospital Resilience Support": ["rec-0105", "دعم اللجنة الدولية للصليب الأحمر لصمود خدمات المياه والصرف الصحي والمستشفيات"],
    "Emergency WASH and Shelter Quick-Fix Assessments": ["rec-0106", "تقييم احتياجات الإصلاح العاجل للمياه والصرف الصحي والإيواء"],
    "National Mine-Action Agreement and Safe-Recovery Support": ["rec-0107", "اتفاق وطني للأعمال المتعلقة بالألغام ودعم التعافي الآمن"],
    "Ministry of Social Affairs Shelter Coordinator Programme": ["rec-0108", "برنامج وزارة الشؤون الاجتماعية لمنسّقي مراكز الإيواء"],
    "TVET Learning-Continuity Response": ["rec-0109", "استجابة لاستمرارية التعليم والتدريب المهني والتقني"],
    "Pathways Plus TVET Re-entry Initiative": ["rec-0110", "مبادرة باثوايز بلس للعودة إلى التعليم المهني والتقني"],
    "Community Engagement, Youth Support and Safeguarding": ["rec-0111", "المشاركة المجتمعية ودعم الشباب والحماية من الأذى"],
    "POWER4Girls Emergency Shelter Outreach": ["rec-0112", "أنشطة باور فور غيرلز في مراكز الإيواء الطارئة"],
    "Public-Hospital Medicines Support": ["rec-0113", "دعم المستشفيات الحكومية بالأدوية"],
    "MSF Mobile Medical and Mental-Health Response": ["rec-0114", "استجابة أطباء بلا حدود الطبية والنفسية المتنقلة"],
    "Child Protection, Safe Spaces and Learning Support": ["rec-0115", "حماية الأطفال والمساحات الآمنة ودعم التعلّم"],
    "Reconstruction Law Housing and Property Information": ["rec-0116", "معلومات السكن والملكية المتعلقة بقانون إعادة الإعمار"],
    "Agrifood Digital Farmer Training During Access Constraints": ["rec-0117", "تدريب المزارعين رقمياً خلال قيود الوصول"],
    "Accessible Agricultural Guidance for Women Farmers": ["rec-0118", "إرشادات زراعية ميسّرة للمزارعات"],
    "Social Cohesion and Public Information Campaign": ["rec-0119", "حملة للتماسك الاجتماعي والمعلومات العامة"],
    "Organised Voluntary-Return Information and Safeguards": ["rec-0120", "معلومات وضمانات العودة الطوعية المنظّمة"],
    "Rapid Agriculture Needs Assessment": ["rec-0121", "تقييم سريع للاحتياجات الزراعية"],
    "Satellite-Based Agriculture Impact StoryMap": ["rec-0122", "خريطة تفاعلية للآثار الزراعية استناداً إلى الأقمار الصناعية"],
    "Post-Escalation Food-Security Analysis": ["rec-0123", "تحليل الأمن الغذائي بعد التصعيد"],
    "Food Security and Agriculture Coordination": ["rec-0124", "تنسيق الأمن الغذائي والزراعة"],
    "Child-Focused Sector Coordination and Shelter Response": ["rec-0125", "تنسيق القطاعات والاستجابة في مراكز الإيواء مع التركيز على الأطفال"],
    "UNHCR Level 3 Shelter and Protection Response": ["rec-0126", "استجابة مفوضية اللاجئين للإيواء والحماية من المستوى 3"],
    "Collective Shelter Review and Community Feedback": ["rec-0127", "مراجعة مراكز الإيواء الجماعي وتلقّي الملاحظات المجتمعية"],
    "Eight-Municipality Tyre Caza Service Priorities": ["rec-0128", "أولويات الخدمات في 8 بلديات بقضاء صور"],
    "Emergency Cash Assistance with Government Delivery": ["rec-0129", "مساعدات نقدية طارئة عبر قنوات حكومية"],
    "Shared Humanitarian Logistics Operations": ["rec-0130", "عمليات لوجستية إنسانية مشتركة"],
    "National Health Emergency Service Continuity": ["rec-0131", "استمرارية الخدمات الصحية الوطنية في الطوارئ"],
    "Continuity of Care in Collective Shelters": ["rec-0132", "استمرارية الرعاية في مراكز الإيواء الجماعي"],
    "Hospital Operations and Health-Facility Protection Monitoring": ["rec-0133", "متابعة عمل المستشفيات وحماية المرافق الصحية"],
    "IOM Mobility Tracking and Return Monitoring": ["rec-0134", "تتبّع التنقل ومتابعة العودة لدى المنظمة الدولية للهجرة"],
    "Collective-Site Assessment and Coordination": ["rec-0135", "تقييم مواقع الإيواء الجماعي والتنسيق بشأنها"],
    "IOM Relief, Health and Fuel Support": ["rec-0136", "دعم المنظمة الدولية للهجرة للإغاثة والصحة والوقود"],
    "Migrant Protection and Movement Assistance": ["rec-0137", "حماية المهاجرين ومساعدتهم على التنقل"],
    "ILO Emergency Social Protection and Shelter Recovery Plan": ["rec-0138", "خطة منظمة العمل الدولية للحماية الاجتماعية الطارئة وتعافي الإيواء"],
    "Farm Production, Storage and Market-Access Support": ["rec-0139", "دعم الإنتاج الزراعي والتخزين والوصول إلى الأسواق"],
    "Maternal Health and Midwife Network Continuity": ["rec-0140", "استمرارية صحة الأمهات وشبكة القابلات"],
    "Mobile Reproductive Health and GBV Services": ["rec-0141", "خدمات متنقلة للصحة الإنجابية والتصدي للعنف القائم على النوع الاجتماعي"],
    "Collective-Shelter Social Worker Outreach": ["rec-0142", "أنشطة الأخصائيين الاجتماعيين في مراكز الإيواء الجماعي"],
    "Lebanese Red Cross Emergency Operations Rooms": ["rec-0143", "غرف عمليات الطوارئ للصليب الأحمر اللبناني"],
    "Government-Led Interagency Flash Appeal": ["rec-0144", "نداء عاجل مشترك بين الوكالات بقيادة الحكومة"],
    "IOM Mobility Snapshot for Displacement and Returns": ["rec-0145", "لمحة المنظمة الدولية للهجرة عن النزوح والعودة"],
    "IOM Cadastral Mobility Tracking": ["rec-0146", "تتبّع المنظمة الدولية للهجرة للتنقل على مستوى المناطق العقارية"],
    "Lebanese Red Cross Emergency Medical and Rescue Scale-Up": ["rec-0147", "توسيع الاستجابة الطبية والإنقاذية الطارئة للصليب الأحمر اللبناني"],
    "National Employment Protection and Enterprise-Recovery Dialogue": ["rec-0148", "حوار وطني لحماية العمل وتعافي المؤسسات"],
    "Labour Market Recovery Evidence for Private-Sector Workers": ["rec-0149", "أدلة تعافي سوق العمل للعاملين في القطاع الخاص"],
    "Municipal and Union Post-War Rapid Assessment": ["rec-0150", "تقييم سريع للبلديات واتحاداتها بعد الحرب"],
    "Collective-Shelter Inspection and Supply Coordination": ["rec-0151", "تفقد مراكز الإيواء الجماعي وتنسيق الإمدادات"],
    "UNICEF Rapid Response Mechanism for Displacement": ["rec-0152", "آلية اليونيسف للاستجابة السريعة للنزوح"],
    "Mobile Health and Primary Care Continuity": ["rec-0153", "استمرارية الخدمات الصحية المتنقلة والرعاية الأولية"],
    "Water Establishment Damage Repair and Service Continuity": ["rec-0154", "إصلاح أضرار مؤسسات المياه واستمرارية خدماتها"],
    "Collective Shelter WASH and Hygiene Response": ["rec-0155", "الاستجابة للمياه والصرف الصحي والنظافة في مراكز الإيواء الجماعي"],
    "Mother-Baby Corner Nutrition Support": ["rec-0156", "دعم التغذية عبر مساحات الأم والطفل"],
    "Nahno Volunteers Youth Shelter Response": ["rec-0157", "استجابة متطوعي نحن الشباب في مراكز الإيواء"],
    "TVET Centres Prepared for Emergency Response": ["rec-0158", "تجهيز مراكز التعليم المهني والتقني للاستجابة للطوارئ"],
    "Disability-Inclusive Medical-Supply Support": ["rec-0159", "دعم بالإمدادات الطبية دامج للأشخاص ذوي الإعاقة"],
    "Municipality and Community Committee Preparedness": ["rec-0160", "جهوزية البلديات واللجان المجتمعية"],
    "Damour Local Crisis-Response Plan": ["rec-0161", "خطة الدامور المحلية للاستجابة للأزمات"],
    "Maghdouche Community Information and Preparedness": ["rec-0162", "المعلومات المجتمعية والجهوزية في مغدوشة"],
    "Ministry of Social Affairs Shelter Coordinator Capacity": ["rec-0163", "تعزيز قدرات منسّقي مراكز الإيواء في وزارة الشؤون الاجتماعية"],
    "UNICEF Rapid Response Mechanism for 2026 Displacement": ["rec-0164", "آلية اليونيسف للاستجابة السريعة لنزوح 2026"],
    "Accessible WASH Support in Collective Shelters": ["rec-0165", "خدمات مياه وصرف صحي ميسّرة الوصول في مراكز الإيواء الجماعي"],
    "Mobile Primary Health Care Support for Displaced People": ["rec-0166", "دعم الرعاية الصحية الأولية المتنقلة للنازحين"],
    "Community Feedback, Social Listening and Rumour Tracking": ["rec-0167", "الملاحظات المجتمعية والرصد الاجتماعي وتتبع الشائعات"],
    "POWER4Girls Shelter Protection Sessions": ["rec-0168", "جلسات الحماية ضمن باور فور غيرلز في مراكز الإيواء"],
    "Gender-Based Violence Shelter Safety Audits": ["rec-0169", "تقييم سلامة مراكز الإيواء من مخاطر العنف القائم على النوع الاجتماعي"],
    "LEAP Water-Infrastructure Repair Framework Procurement": ["rec-0170", "طلب إبداء اهتمام لخدمات تصميم إصلاح البنية التحتية للمياه والإشراف عليها ضمن ليب"],
    "EU and UNDP Municipal Waste-Service Equipment Delivery": ["rec-0171", "تسليم معدات لخدمات النفايات البلدية بدعم الاتحاد الأوروبي وبرنامج الأمم المتحدة الإنمائي"]
  });
  const titles = Object.freeze(Object.fromEntries(Object.entries(readingRecords).map(([name, entry]) => [name, entry[1]])));
  const identities = Object.freeze(Object.fromEntries(Object.entries(readingRecords).map(([name, entry]) => [name, entry[0]])));

  const stages = Object.freeze({
    finance: Object.freeze({
      unknown: ["Not documented in this index", "غير موثّق في هذا الفهرس"],
      not_stated: ["Source does not state stage", "لا يحدد المصدر المرحلة"],
      not_applicable: ["Not a financing record", "ليس سجل تمويل"],
      damage: ["Damage estimate", "تقدير أضرار"],
      needs: ["Needs estimate", "تقدير احتياجات"],
      framework: ["Framework only", "إطار فقط"],
      appeal: ["Funding appeal", "نداء تمويل"],
      announced: ["Announced", "مُعلَن"],
      budgeted: ["Published budget", "موازنة منشورة"],
      approved: ["Approved", "مُوافَق عليه"],
      committed: ["Signed commitment", "التزام موقّع"],
      disbursed: ["Disbursement reported", "إبلاغ عن صرف"],
      spent: ["Expenditure reported", "إبلاغ عن إنفاق"]
    }),
    delivery: Object.freeze({
      unknown: ["Not documented in this index", "غير موثّق في هذا الفهرس"],
      not_stated: ["Source does not state stage", "لا يحدد المصدر المرحلة"],
      not_applicable: ["Evidence / information only", "أدلة / معلومات فقط"],
      planning: ["Planning / coordination", "تخطيط / تنسيق"],
      procurement: ["Pre-award procurement", "مشتريات قبل الإرساء"],
      contracted: ["Contract award reported", "إبلاغ عن إرساء عقد"],
      in_progress: ["Implementation reported", "إبلاغ عن تنفيذ جارٍ"],
      reported_complete: ["Completion reported", "إبلاغ عن إنجاز"]
    })
  });

  // Evidence is tied to exact wording in a named record. A changed record fails
  // closed to unknown, rather than inheriting an outdated or inferred stage.
  const annotations = Object.freeze({
    "Lebanon Rapid Damage & Needs Assessment (RDNA)": {
      finance:"needs", field:"funding", evidence:"$11B needs",
      note:["A national needs estimate, not committed or spent funds.", "تقدير وطني للاحتياجات، وليس أموالاً ملتزماً بها أو منفقة."]
    },
    "Lebanon Emergency Assistance Project (LEAP)": {
      finance:"approved", field:"funding", evidence:"$250M approved",
      note:["$250M approved within a $1B scalable framework. This record does not establish disbursement, spending or completed works.", "تمت الموافقة على $250M ضمن إطار قابل للتوسع بقيمة $1B. لا يثبت هذا السجل صرف الأموال أو إنفاقها أو إنجاز الأعمال."]
    },
    "LEAP Project Design and Safeguards": {
      finance:"framework", delivery:"planning", field:"funding", evidence:"Project design, governance and safeguards",
      note:["Project design and safeguards describe the framework; they do not establish financed delivery.", "يصف تصميم المشروع وضماناته الإطار المعتمد؛ ولا يثبتان تنفيذاً ممولاً."]
    },
    "LEAP Procurement Plan": {
      delivery:"planning", field:"funding", evidence:"Disclosed procurement-planning record",
      note:["A procurement plan is not a tender award or completed works.", "خطة المشتريات ليست إرساءً لمناقصة ولا أعمالاً منجزة."]
    },
    "LEAP Public-Building Framework Procurement": {
      delivery:"procurement", field:"marker", evidence:"Expression of interest only; no award or completed works reported",
      note:["An expression of interest for technical services. No award or completed works is reported in this record.", "طلب إبداء اهتمام بخدمات فنية. لا يتضمن هذا السجل إبلاغاً عن إرساء عقد أو إنجاز أعمال."]
    },
    "LEAP Environmental and Social Services Framework Procurement": {
      delivery:"procurement", field:"marker", evidence:"Expression of interest only; no award or completed safeguard work reported",
      note:["An expression of interest for environmental and social services; no contract award or completed services is reported.", "طلب إبداء اهتمام بخدمات بيئية واجتماعية؛ لا يتضمن إبلاغاً عن إرساء عقد أو إنجاز الخدمات."]
    },
    "Norway Additional Support for the Lebanese Armed Forces": {
      finance:"announced", field:"funding", evidence:"US$1.5M announced",
      note:["US$1.5M announced for institutional readiness and safe return. An announcement does not establish spending or completed works.", "إعلان عن US$1.5M للجهوزية المؤسسية والعودة الآمنة. لا يثبت الإعلان إنفاقاً أو أعمالاً منجزة."]
    },
    "Stabilization in Southern Lebanon": {
      finance:"budgeted", field:"funding", evidence:"$3.26M budget",
      note:["The record states a $3.26M budget, not verified expenditure.", "يورد السجل موازنة بقيمة $3.26M، وليس إنفاقاً متحققاً منه."]
    },
    "Lebanon Response Plan 2026": {
      finance:"appeal", field:"funding", evidence:"$1.62B appeal",
      note:["The $1.62B appeal targets 1.5M people. An appeal is a request for funding, not evidence that the money was received.", "يستهدف النداء البالغ $1.62B دعم 1.5M شخص. النداء طلب للتمويل، وليس دليلاً على تلقي الأموال."]
    },
    "Lebanon Host Communities Support Project: Phase 2": {
      finance:"budgeted", field:"funding", evidence:"$80.1M budget",
      note:["A published project budget does not establish disbursement or expenditure.", "لا تثبت موازنة المشروع المنشورة صرف الأموال أو إنفاقها."]
    },
    "School Rehabilitation & Shelter Decommissioning": {
      delivery:"reported_complete", field:"funding", evidence:"Completed education-recovery support",
      note:["The record reports completed education-recovery support. This is a reported result, not independent verification of works or spending.", "يفيد السجل بإنجاز دعم لتعافي التعليم. هذه نتيجة مُبلّغ عنها وليست تحققاً مستقلاً من الأعمال أو الإنفاق."]
    },
    "Karantina Area-Based Urban Recovery": {
      delivery:"reported_complete", field:"funding", evidence:"161 households rehabilitated",
      note:["The record reports rehabilitation covering 161 households. The label applies to this reported output, not completion of the entire programme.", "يفيد السجل بتأهيل يشمل 161 أسرة. يخص التصنيف هذه النتيجة المُبلّغ عنها، وليس إنجاز البرنامج بأكمله."]
    },
    "Urban Crisis Response, Recovery & Reconstruction Framework": {
      finance:"framework", delivery:"planning", field:"funding", evidence:"Urban recovery and planning framework",
      note:["A recovery planning framework; no financing amount or completed work is established by this label.", "إطار للتخطيط والتعافي؛ لا يثبت هذا التصنيف مبلغاً ممولاً أو عملاً منجزاً."]
    },
    "UNICEF 2024 Humanitarian Action Appeal": {
      finance:"appeal", field:"marker", evidence:"Public appeal setting out a child-focused multi-sector response for the 2024 escalation",
      note:["A humanitarian funding appeal, not a record of funds received.", "نداء تمويل إنساني، وليس سجلاً بأموال تم تلقيها."]
    },
    "Government-Led Interagency Flash Appeal": {
      finance:"appeal", delivery:"planning", field:"funding", evidence:"Coordinated resource mobilisation for urgent humanitarian assistance",
      note:["Resource mobilisation and coordination do not establish disbursement or delivery.", "لا تثبت تعبئة الموارد والتنسيق صرف أموال أو تنفيذ أعمال."]
    }
  });

  function get(record) {
    const id = Object.hasOwn(identities, record.name) ? identities[record.name] : null;
    const titleAr = Object.hasOwn(titles, record.name) ? titles[record.name] : null;
    const entry = id && reviews?.records[id];
    if (entry) {
      // A later API update must not inherit this review silently. Every relevant
      // field, including source URL and publication date, has to match.
      const current = Object.entries(entry.snapshot).every(([field, value]) => record[field] === value);
      if (!current) return {
        id, titleAr, finance:"unknown", delivery:"unknown", basis:null,
        note:["This record changed after its source review and needs reclassification.", "تغيّر هذا السجل بعد مراجعة مصدره ويحتاج إلى إعادة تصنيف."],
        review:{ status:"stale", checkedAt:null }
      };
      const source = reviews.sources[entry.source];
      const reviewed = source.status === "reviewed";
      return {
        id, titleAr, finance:reviewed ? entry.finance : "unknown", delivery:reviewed ? entry.delivery : "unknown",
        note:source.note,
        basis:reviewed ? { field:"source_review", text:source.note[0] } : null,
        review:{ status:source.status, checkedAt:source.checkedAt || reviews.checkedAt, sourceUrl:source.url, access:source.access, locator:source.locator }
      };
    }
    const candidate = Object.hasOwn(annotations, record.name) ? annotations[record.name] : null;
    const annotation = candidate && record[candidate.field] === candidate.evidence ? candidate : null;
    return {
      id, titleAr,
      finance: annotation?.finance || "unknown",
      delivery: annotation?.delivery || "unknown",
      note: annotation?.note || null,
      basis: annotation ? { field:annotation.field, text:annotation.evidence } : null,
      review:{ status:annotation ? "record_only" : "not_reviewed", checkedAt:null }
    };
  }
  const guide = Object.freeze({ titles, identities, stages, annotations, get });
  if (typeof module !== "undefined" && module.exports) module.exports = guide;
  else root.ObservatoryRecordGuide = guide;
})(typeof window !== "undefined" ? window : globalThis);
