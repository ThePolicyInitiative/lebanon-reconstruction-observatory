/* Presentation metadata only. Original records, amounts and source URLs stay unchanged.
 * Keys are exact record titles, never array positions or keyword-derived claims.
 * Arabic titles are reading aids, not official translations of source publications.
 */
(function (root) {
  const titles = Object.freeze({
    "Lebanon Rapid Damage & Needs Assessment (RDNA)": "التقييم السريع للأضرار والاحتياجات في لبنان",
    "Lebanon Emergency Assistance Project (LEAP)": "مشروع المساعدة الطارئة للبنان (LEAP)",
    "LEAP Project Design and Safeguards": "تصميم مشروع ليب وضماناته البيئية والاجتماعية",
    "LEAP Procurement Plan": "خطة المشتريات لمشروع ليب",
    "LEAP Public-Building Framework Procurement": "طلب إبداء اهتمام لخدمات المباني العامة ضمن ليب",
    "LEAP Environmental and Social Services Framework Procurement": "طلب إبداء اهتمام للخدمات البيئية والاجتماعية ضمن ليب",
    "Norway Additional Support for the Lebanese Armed Forces": "دعم نرويجي إضافي للجيش اللبناني",
    "Stabilization in Southern Lebanon": "دعم الاستقرار في جنوب لبنان",
    "Socioeconomic Impacts of the 2024 War": "الآثار الاجتماعية والاقتصادية لحرب 2024",
    "Lebanon Response Plan 2026": "خطة الاستجابة للبنان لعام 2026",
    "Women’s Economic Empowerment Project": "مشروع التمكين الاقتصادي للنساء",
    "South Lebanon Municipal Recovery Support": "دعم التعافي البلدي في جنوب لبنان",
    "Lebanon Host Communities Support Project: Phase 2": "مشروع دعم المجتمعات المضيفة في لبنان: المرحلة 2",
    "EU Support to Lebanese Armed Forces Recovery Role": "دعم الاتحاد الأوروبي لدور الجيش اللبناني في التعافي",
    "Karantina Area-Based Urban Recovery": "التعافي الحضري المتكامل في الكرنتينا",
    "Rapid Building Damage Assessment: Beirut & Mount Lebanon": "التقييم السريع لأضرار المباني في بيروت وجبل لبنان",
    "Building-Level Damage Assessment: South Lebanon": "تقييم أضرار المباني في جنوب لبنان",
    "School Rehabilitation & Learning Continuity Alert": "تنبيه بشأن تأهيل المدارس واستمرارية التعليم",
    "Local Authorities Post-War Rapid Impact Assessment": "تقييم سريع لآثار الحرب بالتعاون مع السلطات المحلية",
    "National Response Operations & Essential Services": "عمليات الاستجابة الوطنية والخدمات الأساسية",
    "MSME & Cooperative Stabilization Micro-Grants": "منح صغيرة لدعم استقرار المؤسسات والتعاونيات",
    "Solar Public Services Partnership": "شراكة لتزويد الخدمات العامة بالطاقة الشمسية",
    "Justice Palace Energy Resilience": "تعزيز استمرارية الطاقة في قصر العدل",
    "Local Development Platforms & Municipal Observatories": "منصات التنمية المحلية والمراصد البلدية",
    "Municipal Preparedness & Community Coordination": "الجهوزية البلدية والتنسيق المجتمعي",
    "National Waste Management Planning & GIS Platform": "التخطيط الوطني لإدارة النفايات ومنصة المعلومات الجغرافية",
    "Emergency Water & Wastewater Service Continuity": "استمرارية خدمات المياه والصرف الصحي في الطوارئ",
    "School Rehabilitation & Shelter Decommissioning": "تأهيل المدارس وإعادتها من الإيواء إلى التعليم",
    "Urban Crisis Response, Recovery & Reconstruction Framework": "إطار الاستجابة للأزمات الحضرية والتعافي وإعادة الإعمار",
    "France–UNDP Cooperative Recovery Support": "دعم فرنسي وبرنامج الأمم المتحدة الإنمائي لتعافي التعاونيات",
    "Lebanon Economic Monitor: Reconstruction Finance Context": "المرصد الاقتصادي للبنان: سياق تمويل إعادة الإعمار",
    "Agricultural Damage and Recovery Assessment": "تقييم الأضرار الزراعية واحتياجات التعافي",
    "South Lebanon Agrifood Recovery and Resilience": "تعافي النظم الزراعية والغذائية وصمودها في جنوب لبنان",
    "Water and Food Sector Resilience Project": "مشروع تعزيز صمود قطاعَي المياه والغذاء",
    "Post-War Sustainable Land-Use Planning Guide": "دليل التخطيط المستدام لاستخدام الأراضي بعد الحرب",
    "Food Security & Rural Livelihoods Coordination": "تنسيق الأمن الغذائي وسبل العيش الريفية",
    "UNICEF 2024 Emergency Response and Return Support": "استجابة اليونيسف للطوارئ ودعم العودة في 2024",
    "Mobile Health and Public Health Service Continuity": "الخدمات الصحية المتنقلة واستمرارية الصحة العامة",
    "Post-War WASH Repair and Shelter Water Support": "إصلاح المياه والصرف الصحي ودعم مياه مراكز الإيواء بعد الحرب",
    "School Reopening and Learning Continuity After the 2024 War": "إعادة فتح المدارس واستمرارية التعليم بعد حرب 2024",
    "Child Protection, Risk Education and Family Reunification": "حماية الأطفال والتوعية بالمخاطر ولمّ شمل الأسر",
    "South Lebanon Disability-Inclusive Cash and WASH Support": "دعم نقدي وخدمات مياه وصرف صحي دامجة للإعاقة في الجنوب",
    "Food Security and Agriculture Cluster Emergency Coordination": "تنسيق طوارئ مجموعة الأمن الغذائي والزراعة",
    "Rapid Agricultural Needs Assessment After the 2024 War": "تقييم سريع للاحتياجات الزراعية بعد حرب 2024",
    "Government and Local-Authority Recovery Support": "دعم التعافي للحكومة والسلطات المحلية",
    "UNICEF 2024 Humanitarian Action Appeal": "نداء اليونيسف للعمل الإنساني لعام 2024",
    "National Emergency Operations Room Activation": "تفعيل غرفة العمليات الوطنية للطوارئ",
    "UNICEF Rapid Response Teams and Shelter Support": "فرق الاستجابة السريعة لليونيسف ودعم مراكز الإيواء",
    "Mobile Healthcare and Essential Medicines Response": "الرعاية الصحية المتنقلة والاستجابة لاحتياجات الأدوية الأساسية",
    "Shelter and Core Relief Items Coordination": "تنسيق الإيواء ومواد الإغاثة الأساسية",
    "Protection Sector and Emergency Cash Coordination": "تنسيق قطاع الحماية والمساعدات النقدية الطارئة",
    "Community Development Centre Protection Response": "استجابة مراكز التنمية المجتمعية لاحتياجات الحماية",
    "Refugee Displacement Tracking and Protection Referrals": "تتبّع نزوح اللاجئين والإحالات إلى خدمات الحماية",
    "Saida Collective Shelter Partnership": "شراكة لدعم مراكز الإيواء الجماعي في صيدا",
    "Civil Defense Preparedness and Frontline Response": "جهوزية الدفاع المدني والاستجابة الميدانية",
    "UNDP National Systems Support During the 2026 Escalation": "دعم البرنامج الإنمائي للأنظمة الوطنية خلال تصعيد 2026",
    "UNICEF 2026 Humanitarian Flash Update Library": "مكتبة التحديثات الإنسانية العاجلة لليونيسف لعام 2026",
    "Public Health Emergency Operations Centre Coordination": "تنسيق مركز عمليات طوارئ الصحة العامة",
    "WHO Trauma, Cholera and Mental-Health Supply Support": "دعم منظمة الصحة العالمية لمستلزمات الإصابات والكوليرا والصحة النفسية",
    "WFP Emergency Food and Cash Response": "استجابة برنامج الأغذية العالمي بالمساعدات الغذائية والنقدية الطارئة",
    "UNHCR 2024 Collective-Shelter Upgrades": "تحسين مراكز الإيواء الجماعي بدعم مفوضية اللاجئين في 2024",
    "UNHCR 2024 Core Relief Items and Emergency Cash": "مواد إغاثة أساسية ومساعدات نقدية طارئة من مفوضية اللاجئين في 2024",
    "UNHCR Community Development Centre Continuity": "استمرارية مراكز التنمية المجتمعية بدعم مفوضية اللاجئين",
    "UNHCR National Call-Centre and Referral Route": "مركز الاتصال الوطني ومسار الإحالات لدى مفوضية اللاجئين",
    "Qatar and UNHCR Emergency Airlift": "جسر جوي طارئ من قطر ومفوضية اللاجئين",
    "Lebanon Response Plan 2024 Inter-Agency Coordination": "التنسيق بين الوكالات ضمن خطة الاستجابة للبنان لعام 2024",
    "UNICEF 2024 Child-Focused Emergency and Return Support": "دعم اليونيسف للأطفال في الطوارئ والعودة خلال 2024",
    "Food Security and Agriculture Cluster Activation": "تفعيل مجموعة الأمن الغذائي والزراعة",
    "Government-Allocated Refugee Shelter Sites": "مواقع إيواء للاجئين خصّصتها الحكومة",
    "UNHCR Inter-Agency Convoy Support": "دعم مفوضية اللاجئين للقوافل المشتركة بين الوكالات",
    "Humanitarian Airbridge for Displaced Families": "جسر جوي إنساني للأسر النازحة",
    "Cash-for-Shelter Capacity Mapping": "حصر قدرات تقديم المساعدات النقدية للإيواء",
    "Emergency Multipurpose Cash for Displaced Refugees": "مساعدات نقدية طارئة متعددة الأغراض للاجئين النازحين",
    "Disability-Inclusive Emergency Cash Partnership": "شراكة للمساعدات النقدية الطارئة الدامجة للأشخاص ذوي الإعاقة",
    "Protection-Cash Partner Training": "تدريب الشركاء على المساعدات النقدية لأغراض الحماية",
    "Disability-Inclusive Shelter and Rehabilitation Support": "دعم الإيواء والتأهيل الدامج للأشخاص ذوي الإعاقة",
    "UNICEF Emergency Medical Supplies for Frontline Care": "إمدادات اليونيسف الطبية الطارئة للرعاية الميدانية",
    "UNICEF Mobile Primary Healthcare Satellite Units": "وحدات اليونيسف المتنقلة للرعاية الصحية الأولية",
    "UNICEF Shelter WASH, Learning and Child-Protection Response": "استجابة اليونيسف للمياه والتعليم وحماية الأطفال في مراكز الإيواء",
    "National Disability Allowance Payment Acceleration": "تسريع صرف البدل النقدي الوطني للأشخاص ذوي الإعاقة",
    "Youth Volunteer Shelter Support": "دعم المتطوعين الشباب لمراكز الإيواء",
    "Tyre Emergency Employment and First-Responder Support": "التشغيل الطارئ ودعم المستجيبين الأوائل في صور",
    "Integrated Post-War Recovery Package": "حزمة متكاملة للتعافي بعد الحرب",
    "Post-War Sustainable Land Use Guidebook": "دليل الاستخدام المستدام للأراضي بعد الحرب",
    "Cooperative Reconstruction and Recovery Packages": "حزم إعادة إعمار التعاونيات وتعافيها",
    "Emergency Municipal Waste-Service Continuity": "استمرارية خدمات النفايات البلدية في الطوارئ",
    "Post-Disaster Rubble Management Procedures": "إجراءات إدارة الركام بعد الكوارث",
    "Municipal Planning and Resilience Tools": "أدوات التخطيط البلدي وتعزيز الصمود",
    "Building Destruction and Debris Assessment Series": "سلسلة تقييمات دمار المباني والركام",
    "National IDP Registry for Early Recovery Targeting": "السجل الوطني للنازحين داخلياً لتوجيه التعافي المبكر",
    "National Disability Allowance Emergency Support 2024": "دعم طارئ عبر البدل النقدي الوطني للإعاقة في 2024",
    "Care for War-Wounded and Affected Children": "رعاية الأطفال الجرحى والمتأثرين بالحرب",
    "Women-Led Humanitarian Response": "استجابة إنسانية بقيادة النساء",
    "EU, UNDP and UNODC Post-Conflict Stability Support": "دعم الاستقرار بعد النزاع من الاتحاد الأوروبي والبرنامج الإنمائي ومكتب مكافحة المخدرات والجريمة",
    "Tyre Caza Municipal Recovery Priorities": "أولويات التعافي البلدي في قضاء صور",
    "Host-Community Services and Livelihoods Recovery": "تعافي الخدمات وسبل العيش في المجتمعات المضيفة",
    "UNFPA Sexual and Reproductive Health and GBV Response": "استجابة صندوق الأمم المتحدة للسكان للصحة الجنسية والإنجابية والعنف القائم على النوع الاجتماعي",
    "GBV and Reproductive Health Coordination Mechanisms": "آليات تنسيق خدمات الصحة الإنجابية والتصدي للعنف القائم على النوع الاجتماعي",
    "Maternal Health Supplies via the Humanitarian Airbridge": "إمدادات صحة الأمهات عبر الجسر الجوي الإنساني",
    "UNESCO Teaching Hubs for Displaced Learners": "مراكز اليونسكو التعليمية للمتعلمين النازحين",
    "UNESCO Emergency Education and Heritage Response": "استجابة اليونسكو الطارئة للتعليم والتراث",
    "Reading and Psychosocial Support in School Shelters": "القراءة والدعم النفسي والاجتماعي في المدارس المستخدمة للإيواء",
    "Beirut Municipal Emergency Fleet Operations": "عمليات أسطول بلدية بيروت في الطوارئ",
    "ICRC Medical-Service Continuity Support": "دعم اللجنة الدولية للصليب الأحمر لاستمرارية الخدمات الطبية",
    "ICRC Water, Wastewater and Hospital Resilience Support": "دعم اللجنة الدولية للصليب الأحمر لصمود خدمات المياه والصرف الصحي والمستشفيات",
    "Emergency WASH and Shelter Quick-Fix Assessments": "تقييم احتياجات الإصلاح العاجل للمياه والصرف الصحي والإيواء",
    "National Mine-Action Agreement and Safe-Recovery Support": "اتفاق وطني للأعمال المتعلقة بالألغام ودعم التعافي الآمن",
    "Ministry of Social Affairs Shelter Coordinator Programme": "برنامج وزارة الشؤون الاجتماعية لمنسّقي مراكز الإيواء",
    "TVET Learning-Continuity Response": "استجابة لاستمرارية التعليم والتدريب المهني والتقني",
    "Pathways Plus TVET Re-entry Initiative": "مبادرة باثوايز بلس للعودة إلى التعليم المهني والتقني",
    "Community Engagement, Youth Support and Safeguarding": "المشاركة المجتمعية ودعم الشباب والحماية من الأذى",
    "POWER4Girls Emergency Shelter Outreach": "أنشطة باور فور غيرلز في مراكز الإيواء الطارئة",
    "Public-Hospital Medicines Support": "دعم المستشفيات الحكومية بالأدوية",
    "MSF Mobile Medical and Mental-Health Response": "استجابة أطباء بلا حدود الطبية والنفسية المتنقلة",
    "Child Protection, Safe Spaces and Learning Support": "حماية الأطفال والمساحات الآمنة ودعم التعلّم",
    "Reconstruction Law Housing and Property Information": "معلومات السكن والملكية المتعلقة بقانون إعادة الإعمار",
    "Agrifood Digital Farmer Training During Access Constraints": "تدريب المزارعين رقمياً خلال قيود الوصول",
    "Accessible Agricultural Guidance for Women Farmers": "إرشادات زراعية ميسّرة للمزارعات",
    "Social Cohesion and Public Information Campaign": "حملة للتماسك الاجتماعي والمعلومات العامة",
    "Organised Voluntary-Return Information and Safeguards": "معلومات وضمانات العودة الطوعية المنظّمة",
    "Rapid Agriculture Needs Assessment": "تقييم سريع للاحتياجات الزراعية",
    "Satellite-Based Agriculture Impact StoryMap": "خريطة تفاعلية للآثار الزراعية استناداً إلى الأقمار الصناعية",
    "Post-Escalation Food-Security Analysis": "تحليل الأمن الغذائي بعد التصعيد",
    "Food Security and Agriculture Coordination": "تنسيق الأمن الغذائي والزراعة",
    "Child-Focused Sector Coordination and Shelter Response": "تنسيق القطاعات والاستجابة في مراكز الإيواء مع التركيز على الأطفال",
    "UNHCR Level 3 Shelter and Protection Response": "استجابة مفوضية اللاجئين للإيواء والحماية من المستوى 3",
    "Collective Shelter Review and Community Feedback": "مراجعة مراكز الإيواء الجماعي وتلقّي الملاحظات المجتمعية",
    "Eight-Municipality Tyre Caza Service Priorities": "أولويات الخدمات في 8 بلديات بقضاء صور",
    "Emergency Cash Assistance with Government Delivery": "مساعدات نقدية طارئة عبر قنوات حكومية",
    "Shared Humanitarian Logistics Operations": "عمليات لوجستية إنسانية مشتركة",
    "National Health Emergency Service Continuity": "استمرارية الخدمات الصحية الوطنية في الطوارئ",
    "Continuity of Care in Collective Shelters": "استمرارية الرعاية في مراكز الإيواء الجماعي",
    "Hospital Operations and Health-Facility Protection Monitoring": "متابعة عمل المستشفيات وحماية المرافق الصحية",
    "IOM Mobility Tracking and Return Monitoring": "تتبّع التنقل ومتابعة العودة لدى المنظمة الدولية للهجرة",
    "Collective-Site Assessment and Coordination": "تقييم مواقع الإيواء الجماعي والتنسيق بشأنها",
    "IOM Relief, Health and Fuel Support": "دعم المنظمة الدولية للهجرة للإغاثة والصحة والوقود",
    "Migrant Protection and Movement Assistance": "حماية المهاجرين ومساعدتهم على التنقل",
    "ILO Emergency Social Protection and Shelter Recovery Plan": "خطة منظمة العمل الدولية للحماية الاجتماعية الطارئة وتعافي الإيواء",
    "Farm Production, Storage and Market-Access Support": "دعم الإنتاج الزراعي والتخزين والوصول إلى الأسواق",
    "Maternal Health and Midwife Network Continuity": "استمرارية صحة الأمهات وشبكة القابلات",
    "Mobile Reproductive Health and GBV Services": "خدمات متنقلة للصحة الإنجابية والتصدي للعنف القائم على النوع الاجتماعي",
    "Collective-Shelter Social Worker Outreach": "أنشطة الأخصائيين الاجتماعيين في مراكز الإيواء الجماعي",
    "Lebanese Red Cross Emergency Operations Rooms": "غرف عمليات الطوارئ للصليب الأحمر اللبناني",
    "Government-Led Interagency Flash Appeal": "نداء عاجل مشترك بين الوكالات بقيادة الحكومة",
    "IOM Mobility Snapshot for Displacement and Returns": "لمحة المنظمة الدولية للهجرة عن النزوح والعودة",
    "IOM Cadastral Mobility Tracking": "تتبّع المنظمة الدولية للهجرة للتنقل على مستوى المناطق العقارية",
    "Lebanese Red Cross Emergency Medical and Rescue Scale-Up": "توسيع الاستجابة الطبية والإنقاذية الطارئة للصليب الأحمر اللبناني",
    "National Employment Protection and Enterprise-Recovery Dialogue": "حوار وطني لحماية العمل وتعافي المؤسسات",
    "Labour Market Recovery Evidence for Private-Sector Workers": "أدلة تعافي سوق العمل للعاملين في القطاع الخاص",
    "Municipal and Union Post-War Rapid Assessment": "تقييم سريع للبلديات واتحاداتها بعد الحرب",
    "Collective-Shelter Inspection and Supply Coordination": "تفقد مراكز الإيواء الجماعي وتنسيق الإمدادات",
    "UNICEF Rapid Response Mechanism for Displacement": "آلية اليونيسف للاستجابة السريعة للنزوح",
    "Mobile Health and Primary Care Continuity": "استمرارية الخدمات الصحية المتنقلة والرعاية الأولية",
    "Water Establishment Damage Repair and Service Continuity": "إصلاح أضرار مؤسسات المياه واستمرارية خدماتها",
    "Collective Shelter WASH and Hygiene Response": "الاستجابة للمياه والصرف الصحي والنظافة في مراكز الإيواء الجماعي",
    "Mother-Baby Corner Nutrition Support": "دعم التغذية عبر مساحات الأم والطفل",
    "Nahno Volunteers Youth Shelter Response": "استجابة متطوعي نحن الشباب في مراكز الإيواء",
    "TVET Centres Prepared for Emergency Response": "تجهيز مراكز التعليم المهني والتقني للاستجابة للطوارئ",
    "Disability-Inclusive Medical-Supply Support": "دعم بالإمدادات الطبية دامج للأشخاص ذوي الإعاقة",
    "Municipality and Community Committee Preparedness": "جهوزية البلديات واللجان المجتمعية",
    "Damour Local Crisis-Response Plan": "خطة الدامور المحلية للاستجابة للأزمات",
    "Maghdouche Community Information and Preparedness": "المعلومات المجتمعية والجهوزية في مغدوشة",
    "Ministry of Social Affairs Shelter Coordinator Capacity": "تعزيز قدرات منسّقي مراكز الإيواء في وزارة الشؤون الاجتماعية",
    "UNICEF Rapid Response Mechanism for 2026 Displacement": "آلية اليونيسف للاستجابة السريعة لنزوح 2026",
    "Accessible WASH Support in Collective Shelters": "خدمات مياه وصرف صحي ميسّرة الوصول في مراكز الإيواء الجماعي",
    "Mobile Primary Health Care Support for Displaced People": "دعم الرعاية الصحية الأولية المتنقلة للنازحين",
    "Community Feedback, Social Listening and Rumour Tracking": "الملاحظات المجتمعية والرصد الاجتماعي وتتبع الشائعات",
    "POWER4Girls Shelter Protection Sessions": "جلسات الحماية ضمن باور فور غيرلز في مراكز الإيواء",
    "Gender-Based Violence Shelter Safety Audits": "تقييم سلامة مراكز الإيواء من مخاطر العنف القائم على النوع الاجتماعي"
  });

  const stages = Object.freeze({
    finance: Object.freeze({
      unknown: ["Not documented in this index", "غير موثّق في هذا الفهرس"],
      needs: ["Needs estimate", "تقدير احتياجات"],
      framework: ["Framework only", "إطار فقط"],
      appeal: ["Funding appeal", "نداء تمويل"],
      announced: ["Announced", "مُعلَن"],
      budgeted: ["Published budget", "موازنة منشورة"],
      approved: ["Approved", "مُوافَق عليه"],
      disbursed: ["Disbursement reported", "إبلاغ عن صرف"],
      spent: ["Expenditure reported", "إبلاغ عن إنفاق"]
    }),
    delivery: Object.freeze({
      unknown: ["Not documented in this index", "غير موثّق في هذا الفهرس"],
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
    const candidate = annotations[record.name];
    const annotation = candidate && record[candidate.field] === candidate.evidence ? candidate : null;
    return {
      titleAr: titles[record.name] || null,
      finance: annotation?.finance || "unknown",
      delivery: annotation?.delivery || "unknown",
      note: annotation?.note || null,
      basis: annotation ? { field:annotation.field, text:annotation.evidence } : null
    };
  }
  const guide = Object.freeze({ titles, stages, annotations, get });
  if (typeof module !== "undefined" && module.exports) module.exports = guide;
  else root.ObservatoryRecordGuide = guide;
})(typeof window !== "undefined" ? window : globalThis);
