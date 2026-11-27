/* MeraHisab language integration v2.0.0
 * Exact-match local translations; preserve markup, user values and live outputs.
 * Official domain: https://merahisab.store/
 */
(function () {
  "use strict";
  if (window.MeraHisabLanguageIntegration) return;
  const VERSION = "2.0.0";
  const MAX_TEXT = 20000;
  const MAX_BATCH = 100;
  const selector = "h1,h2,h3,h4,h5,h6,p,a,button,label,summary,legend,th,td,li,dt,dd,span,strong,small,option,figcaption";
  const attrs = {placeholder:"data-i18n-placeholder",title:"data-i18n-title","aria-label":"data-i18n-aria",alt:"data-i18n-alt"};
  const combined = selector + "," + Object.keys(attrs).map(a => "["+a+"]").join(",");
  const excluded = [
    "script","style","noscript","template","pre","code","kbd","samp","textarea","svg","canvas","iframe","object","embed",
    "[contenteditable]","[data-no-translate]","[translate='no']","[role='status']","[role='alert']","[aria-live]","output",
    "#theme","#requestPreview","#previewSection","#messageCount","#result","#stopwatchDisplay","#swLapList","#lapList","#liveClock","#liveDate","#istClock","#istDate","#motivationText",
    "#hashOutput","#requestedPath","#expectedHash","#calculatedHash","#selectedSize","#hashMatch","#sizeMatch","#verificationDetails","#apkFileInfo","#selectorResult","#searchResults","#suggestedResults",
    "#networkStatus","#secureStatus","#cryptoStatus","#localStatus","#sessionStatus","#workerStatus","#workerControl","#controllerStatus","#clipboardStatus","#sharingStatus","#cookieStatus","#storageUsage","#storageQuota","#persistentStatus","#cacheCount","#connectionStatusText","#browserNetworkStatus","#websiteReachability","#serviceWorkerSupport","#serviceWorkerStatus","#serviceWorkerVersion","#cacheStorageSupport","#cachedResourceCount","#lastConnectionCheck","#workerSupport","#workerController","#toolCount","#comparisonCount",
    ".ft-result",".ft-error","#merahisabLanguageSwitcher","#mhLanguageAnnouncement"
  ].join(",");
  const generated = "#calculatorGrid,#merahisabPwaPanel";
  const index = new Map(), ambiguous = new Set();
  const textRecords = new WeakMap(), attributeRecords = new WeakMap();
  const pending = new Set();
  let initialized = false, observer = null, timer = null;
  let translatedElements = 0, translatedAttributes = 0;
  const originalTitle = document.title;
  const engine = () => window.MeraHisabLanguage;
  const language = () => engine()?.getLanguage() || "en";
  const normalize = text => String(text ?? "").replace(/\s+/g," ").trim();
const additionalContent = [

  ["integration.returnHomepage",
   "Return to Homepage",
   "होम पेज पर लौटें"],

  ["integration.openHomepage",
   "Open Homepage",
   "होम पेज खोलें"],

  ["integration.openDownloads",
   "Open Downloads",
   "डाउनलोड केंद्र खोलें"],

  ["integration.openTools",
   "Open Tools",
   "उपकरण खोलें"],

  ["integration.openPrivacy",
   "Open Privacy",
   "गोपनीयता जानकारी खोलें"],

  ["integration.openSupport",
   "Open Support",
   "सहायता केंद्र खोलें"],

  ["integration.compareApps",
   "Compare Apps",
   "ऐप्स की तुलना करें"],

  ["integration.exploreApps",
   "Explore Applications",
   "ऐप्स देखें"],

  ["integration.viewMeraHisab",
   "View MeraHisab",
   "MeraHisab देखें"],

  ["integration.viewRoyalKhata",
   "View Royal Khata",
   "Royal Khata देखें"],

  ["integration.aboutUs",
   "About Us",
   "हमारे बारे में"],

  ["integration.prepareRequest",
   "Prepare Request",
   "अनुरोध तैयार करें"],

  ["integration.prepareSupport",
   "Prepare Support Request",
   "सहायता अनुरोध तैयार करें"],

  ["integration.prepareReport",
   "Prepare Report",
   "रिपोर्ट तैयार करें"],

  ["integration.reportIssue",
   "Report Issue",
   "समस्या की रिपोर्ट करें"],

  ["integration.suggestFeature",
   "Suggest Feature",
   "सुविधा का सुझाव दें"],

  ["integration.getGuidance",
   "Get Guidance",
   "मार्गदर्शन प्राप्त करें"],

  ["integration.websiteSupport",
   "Website Support",
   "वेबसाइट सहायता"],

  ["integration.prepareFeedback",
   "Prepare Feedback",
   "सुझाव तैयार करें"],

  ["integration.refreshDiagnostics",
   "Refresh Diagnostics",
   "तकनीकी जांच रिफ्रेश करें"],

  ["integration.copyDiagnostics",
   "Copy Diagnostics",
   "तकनीकी जानकारी कॉपी करें"],

  ["integration.clearSearch",
   "Clear Search",
   "खोज साफ करें"],

  ["integration.findPage",
   "Find a Page",
   "पेज खोजें"],

  ["integration.offlineHelp",
   "Offline Help",
   "ऑफलाइन सहायता"],

  ["integration.searchWebsite",
   "Search Website",
   "वेबसाइट पर खोजें"],

  ["integration.changeTheme",
   "Change website theme",
   "वेबसाइट की थीम बदलें"],

  ["integration.mainNavigation",
   "Main navigation",
   "मुख्य नेविगेशन"],

  ["integration.breadcrumb",
   "Breadcrumb",
   "पेज नेविगेशन"],

  ["integration.checking",
   "Checking...",
   "जांच जारी है..."],

  ["integration.supported",
   "Supported",
   "समर्थित"],

  ["integration.secure",
   "Secure context",
   "सुरक्षित संदर्भ"],

  ["integration.notSecure",
   "Not secure",
   "सुरक्षित नहीं"],

  ["integration.onlineReported",
   "Online reported",
   "ऑनलाइन स्थिति"],

  ["integration.offlineReported",
   "Offline reported",
   "ऑफलाइन स्थिति"],

  ["integration.activeController",
   "Active controller",
   "सक्रिय कंट्रोलर"],

  ["integration.notControlled",
   "Not controlled",
   "कंट्रोलर सक्रिय नहीं"],

  ["integration.apiAvailable",
   "API available",
   "API उपलब्ध है"],

  ["integration.selectApplication",
   "Select application",
   "ऐप चुनें"],

  ["integration.selectCategory",
   "Select category",
   "श्रेणी चुनें"],

  ["integration.enterName",
   "Enter your name",
   "अपना नाम दर्ज करें"],

  ["integration.enterEmail",
   "Enter email if needed",
   "आवश्यक होने पर ईमेल दर्ज करें"],

  ["integration.enterVersion",
   "Enter installed version",
   "इंस्टॉल किया गया संस्करण दर्ज करें"],

  ["integration.other",
   "Other",
   "अन्य"],

  ["integration.noResults",
   "No matching pages found.",
   "कोई मेल खाने वाला पेज नहीं मिला।"],

  ["integration.supportPending",
   "Configuration Pending",
   "कॉन्फिगरेशन लंबित है"],

  ["integration.notAvailable",
   "Not Available",
   "उपलब्ध नहीं"],

  ["integration.downloadSafety",
   "Download Safety",
   "डाउनलोड सुरक्षा"],

  ["integration.installationGuide",
   "Installation Guide",
   "इंस्टॉलेशन गाइड"],

  ["integration.networkStatus",
   "Network Status",
   "नेटवर्क की स्थिति"],

  ["integration.browserNetwork",
   "Browser Network Status",
   "ब्राउजर नेटवर्क की स्थिति"],

  ["integration.websiteDiagnostics",
   "Website Diagnostics",
   "वेबसाइट की तकनीकी जांच"],

  ["integration.contactChannels",
   "Contact Channels",
   "संपर्क के माध्यम"],

  ["integration.supportEmail",
   "Support Email",
   "सहायता ईमेल"],

  ["integration.supportPhone",
   "Support Phone",
   "सहायता फोन"],

  ["integration.ticketSystem",
   "Online Ticket System",
   "ऑनलाइन टिकट प्रणाली"],

  ["integration.liveChat",
   "Live Chat",
   "लाइव चैट"],

  ["integration.protectInformation",
   "Protect Your Information",
   "अपनी जानकारी सुरक्षित रखें"],

  ["integration.quickNavigation",
   "Quick Navigation",
   "त्वरित नेविगेशन"],

  ["integration.errorType",
   "Error Type",
   "त्रुटि का प्रकार"],

  ["integration.officialDomain",
   "Official Domain",
   "आधिकारिक डोमेन"],

  ["integration.pageNotFound",
   "Page Not Found",
   "पेज नहीं मिला"],

  ["integration.requestedInformation",
   "Requested Page Information",
   "अनुरोधित पेज की जानकारी"],

  ["integration.whyHappened",
   "Why Did This Happen?",
   "यह समस्या क्यों हुई?"],

  ["integration.incorrectAddress",
   "Incorrect Address",
   "गलत पता"],

  ["integration.outdatedBookmark",
   "Outdated Bookmark",
   "पुराना बुकमार्क"],

  ["integration.pageMoved",
   "Page Moved or Removed",
   "पेज बदला या हटाया गया"],

  ["integration.serviceWorkerSupport",
   "Service Worker Support",
   "सर्विस वर्कर समर्थन"],

  ["integration.serviceWorkerController",
   "Service Worker Controller",
   "सर्विस वर्कर कंट्रोलर"]

];

const baseDictionary = {

  en: {

    "nav.home": "Home",
    "nav.apps": "Apps",
    "nav.compare": "Compare",
    "nav.features": "Features",
    "nav.tools": "Tools",
    "nav.privacy": "Privacy",
    "nav.about": "About",
    "nav.support": "Support",
    "nav.downloads": "Downloads",
    "nav.contact": "Contact",
    "nav.theme": "Theme",

    "language.label": "Select Language",
    "language.changed": "Language updated",

    "common.home": "Return Home",
    "common.download": "Download",
    "common.learnMore": "Learn More",
    "common.viewDetails": "View Details",
    "common.getStarted": "Get Started",
    "common.readMore": "Read More",
    "common.close": "Close",
    "common.open": "Open",
    "common.copy": "Copy",
    "common.share": "Share",
    "common.reset": "Reset",
    "common.clear": "Clear",
    "common.search": "Search",
    "common.refresh": "Refresh",
    "common.loading": "Loading...",
    "common.available": "Available",
    "common.unavailable": "Unavailable",
    "common.comingSoon": "Coming Soon",
    "common.back": "Go Back",
    "common.retry": "Try Again",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.yes": "Yes",
    "common.no": "No",
    "common.optional": "Optional",
    "common.required": "Required",
    "common.pending": "Pending",

    "home.title": "Manage Your Money with Confidence",

    "home.description":
      "Explore MeraHisab and Royal Khata for personal finance and digital ledger management.",

    "home.apps": "Our Applications",
    "home.features": "Key Features",
    "home.security": "Privacy & Security",
    "home.tools": "Financial Tools",
    "home.faq": "Frequently Asked Questions",

    "app.merahisab": "MeraHisab",
    "app.royalKhata": "Royal Khata",

    "app.personalFinance":
      "Personal Financial Management",

    "app.digitalLedger":
      "Digital Credit & Debit Ledger",

    "app.income": "Income",
    "app.expenses": "Expenses",
    "app.credit": "Credit",
    "app.debit": "Debit",
    "app.balance": "Balance",
    "app.savings": "Savings",
    "app.accounts": "Accounts",
    "app.transactions": "Transactions",
    "app.reports": "Reports",
    "app.backup": "Backup",
    "app.restore": "Restore",
    "app.recovery": "Recovery Key",
    "app.offline": "Offline Access",

    "download.title": "Download Center",
    "download.apk": "Download APK",
    "download.version": "Application Version",
    "download.size": "File Size",
    "download.checksum": "SHA-256 Checksum",
    "download.verify": "Verify APK",
    "download.guide": "Installation Guide",
    "download.pending": "Verification Pending",

    "tools.title": "Financial Tools",
    "tools.emi": "EMI Calculator",
    "tools.sip": "SIP Calculator",
    "tools.fd": "FD Calculator",
    "tools.rd": "RD Calculator",
    "tools.simple": "Simple Interest",
    "tools.compound": "Compound Interest",
    "tools.gst": "GST Calculator",
    "tools.discount": "Discount Calculator",
    "tools.percentage": "Percentage Calculator",
    "tools.savings": "Savings Goal Calculator",
    "tools.inflation": "Inflation Calculator",
    "tools.calculate": "Calculate",
    "tools.result": "Result",
    "tools.amount": "Amount",
    "tools.rate": "Interest Rate",
    "tools.duration": "Duration",
    "tools.months": "Months",
    "tools.years": "Years",
    "tools.clock": "Indian Standard Time",
    "tools.stopwatch": "Stopwatch",
    "tools.start": "Start",
    "tools.pause": "Pause",
    "tools.resume": "Resume",
    "tools.lap": "Lap",

    "privacy.title": "Privacy & Data Protection",
    "privacy.policy": "Privacy Policy",
    "privacy.security": "Data Security",
    "privacy.storage": "Browser Storage",
    "privacy.permissions": "Permissions",
    "privacy.rights": "Your Privacy Rights",

    "about.title": "About MeraHisab",
    "about.mission": "Our Mission",
    "about.vision": "Our Vision",
    "about.values": "Our Values",
    "about.roadmap": "Development Roadmap",

    "support.title": "Contact & Support",
    "support.help": "Help Center",
    "support.feedback": "Feedback",
    "support.bug": "Report a Bug",
    "support.name": "Your Name",
    "support.email": "Email Address",
    "support.subject": "Subject",
    "support.message": "Describe Your Request",
    "support.category": "Request Category",
    "support.preview": "Generate Request Preview",
    "support.local": "Local Draft — Not Submitted",

    "pwa.install": "Install Website",
    "pwa.update": "Check for Updates",
    "pwa.online": "Online",
    "pwa.offline": "Offline",
    "pwa.settings": "Website Settings",
    "pwa.diagnostics": "Diagnostics",
    "pwa.cache": "Offline Cache",
    "pwa.storage": "Storage Management",

    "error.title": "Page Not Found",
    "error.search": "Find the Right Page",
    "error.report": "Report a Broken Link",

    "error.description":
      "The requested page could not be found.",

    "footer.rights": "All rights reserved.",
    "footer.website": "Official Website"

  },

  hi: {

    "nav.home": "होम",
    "nav.apps": "ऐप्स",
    "nav.compare": "तुलना",
    "nav.features": "विशेषताएं",
    "nav.tools": "उपकरण",
    "nav.privacy": "गोपनीयता",
    "nav.about": "हमारे बारे में",
    "nav.support": "सहायता",
    "nav.downloads": "डाउनलोड",
    "nav.contact": "संपर्क",
    "nav.theme": "थीम",

    "language.label": "भाषा चुनें",
    "language.changed": "भाषा बदल दी गई है",

    "common.home": "होम पेज पर जाएं",
    "common.download": "डाउनलोड करें",
    "common.learnMore": "अधिक जानें",
    "common.viewDetails": "विवरण देखें",
    "common.getStarted": "शुरू करें",
    "common.readMore": "और पढ़ें",
    "common.close": "बंद करें",
    "common.open": "खोलें",
    "common.copy": "कॉपी करें",
    "common.share": "शेयर करें",
    "common.reset": "रीसेट करें",
    "common.clear": "साफ करें",
    "common.search": "खोजें",
    "common.refresh": "रिफ्रेश करें",
    "common.loading": "लोड हो रहा है...",
    "common.available": "उपलब्ध",
    "common.unavailable": "उपलब्ध नहीं",
    "common.comingSoon": "जल्द आ रहा है",
    "common.back": "वापस जाएं",
    "common.retry": "पुनः प्रयास करें",
    "common.cancel": "रद्द करें",
    "common.save": "सहेजें",
    "common.yes": "हां",
    "common.no": "नहीं",
    "common.optional": "वैकल्पिक",
    "common.required": "आवश्यक",
    "common.pending": "लंबित",

    "home.title": "आत्मविश्वास के साथ अपने पैसों का प्रबंधन करें",

    "home.description":
      "व्यक्तिगत वित्त और डिजिटल खाते के प्रबंधन के लिए MeraHisab और Royal Khata के बारे में जानें।",

    "home.apps": "हमारे ऐप्स",
    "home.features": "मुख्य विशेषताएं",
    "home.security": "गोपनीयता और सुरक्षा",
    "home.tools": "वित्तीय उपकरण",
    "home.faq": "अक्सर पूछे जाने वाले प्रश्न",

    "app.merahisab": "MeraHisab",
    "app.royalKhata": "Royal Khata",

    "app.personalFinance":
      "व्यक्तिगत वित्त प्रबंधन",

    "app.digitalLedger":
      "डिजिटल जमा एवं उधार खाता",

    "app.income": "आय",
    "app.expenses": "खर्च",
    "app.credit": "क्रेडिट",
    "app.debit": "डेबिट",
    "app.balance": "शेष राशि",
    "app.savings": "बचत",
    "app.accounts": "खाते",
    "app.transactions": "लेनदेन",
    "app.reports": "रिपोर्ट",
    "app.backup": "बैकअप",
    "app.restore": "डेटा पुनर्स्थापित करें",
    "app.recovery": "रिकवरी कुंजी",
    "app.offline": "ऑफलाइन सुविधा",

    "download.title": "डाउनलोड केंद्र",
    "download.apk": "APK डाउनलोड करें",
    "download.version": "ऐप संस्करण",
    "download.size": "फाइल का आकार",
    "download.checksum": "SHA-256 चेकसम",
    "download.verify": "APK सत्यापित करें",
    "download.guide": "इंस्टॉलेशन गाइड",
    "download.pending": "सत्यापन लंबित",

    "tools.title": "वित्तीय उपकरण",
    "tools.emi": "EMI कैलकुलेटर",
    "tools.sip": "SIP कैलकुलेटर",
    "tools.fd": "FD कैलकुलेटर",
    "tools.rd": "RD कैलकुलेटर",
    "tools.simple": "साधारण ब्याज",
    "tools.compound": "चक्रवृद्धि ब्याज",
    "tools.gst": "GST कैलकुलेटर",
    "tools.discount": "छूट कैलकुलेटर",
    "tools.percentage": "प्रतिशत कैलकुलेटर",
    "tools.savings": "बचत लक्ष्य कैलकुलेटर",
    "tools.inflation": "महंगाई कैलकुलेटर",
    "tools.calculate": "गणना करें",
    "tools.result": "परिणाम",
    "tools.amount": "राशि",
    "tools.rate": "ब्याज दर",
    "tools.duration": "अवधि",
    "tools.months": "महीने",
    "tools.years": "वर्ष",
    "tools.clock": "भारतीय मानक समय",
    "tools.stopwatch": "स्टॉपवॉच",
    "tools.start": "शुरू करें",
    "tools.pause": "रोकें",
    "tools.resume": "जारी रखें",
    "tools.lap": "लैप",

    "privacy.title": "गोपनीयता और डेटा संरक्षण",
    "privacy.policy": "गोपनीयता नीति",
    "privacy.security": "डेटा सुरक्षा",
    "privacy.storage": "ब्राउजर स्टोरेज",
    "privacy.permissions": "अनुमतियां",
    "privacy.rights": "आपके गोपनीयता अधिकार",

    "about.title": "MeraHisab के बारे में",
    "about.mission": "हमारा उद्देश्य",
    "about.vision": "हमारी दूरदृष्टि",
    "about.values": "हमारे मूल्य",
    "about.roadmap": "विकास योजना",

    "support.title": "संपर्क और सहायता",
    "support.help": "सहायता केंद्र",
    "support.feedback": "सुझाव",
    "support.bug": "समस्या की रिपोर्ट करें",
    "support.name": "आपका नाम",
    "support.email": "ईमेल पता",
    "support.subject": "विषय",
    "support.message": "अपनी समस्या का विवरण दें",
    "support.category": "अनुरोध की श्रेणी",
    "support.preview": "अनुरोध का पूर्वावलोकन बनाएं",
    "support.local": "स्थानीय ड्राफ्ट — भेजा नहीं गया",

    "pwa.install": "वेबसाइट इंस्टॉल करें",
    "pwa.update": "अपडेट जांचें",
    "pwa.online": "ऑनलाइन",
    "pwa.offline": "ऑफलाइन",
    "pwa.settings": "वेबसाइट सेटिंग्स",
    "pwa.diagnostics": "तकनीकी जांच",
    "pwa.cache": "ऑफलाइन कैश",
    "pwa.storage": "स्टोरेज प्रबंधन",

    "error.title": "पेज नहीं मिला",
    "error.search": "सही पेज खोजें",
    "error.report": "खराब लिंक की रिपोर्ट करें",

    "error.description":
      "आपके द्वारा खोजा गया पेज उपलब्ध नहीं है।",

    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.website": "आधिकारिक वेबसाइट"

  }

};

  function registerAdditional() {
    const en = Object.create(null), hi = Object.create(null);
    for (const [key, english, hindi] of additionalContent) {
      en[key] = english; hi[key] = hindi;
    }
    return engine().addTranslations("en", en) === true &&
      engine().addTranslations("hi", hi) === true;
  }
  function addIndex(key, english, hindi) {
    if (typeof english !== "string" || typeof hindi !== "string") return;
    const text = normalize(english);
    if (!text || !normalize(hindi) || text.length > MAX_TEXT ||
        text === normalize(hindi) || ambiguous.has(text)) return;
    const previous = index.get(text);
    if (previous && normalize(previous.hindi) !== normalize(hindi)) {
      index.delete(text); ambiguous.add(text); return;
    }
    index.set(text, { key, hindi });
  }
  function buildIndex() {
    index.clear(); ambiguous.clear();
    const api = engine(), extended = window.MeraHisabLanguageContent;
    const extra = new Map(additionalContent.map(([key,en,hi]) => [key,{en,hi}]));
    const keys = new Set([...Object.keys(baseDictionary.en), ...extra.keys(),
      ...(api.getKeys?.() || []), ...(extended?.getKeys?.() || [])]);
    const lookup = (lang,key) => api.getTranslation?.(lang,key) ??
      extra.get(key)?.[lang] ?? extended?.getTranslation?.(lang,key) ?? baseDictionary[lang][key];
    for (const key of keys) addIndex(key,lookup("en",key),lookup("hi",key));
  }
  function skip(element) {
    return !element || element.nodeType !== 1 ||
      element.namespaceURI !== "http://www.w3.org/1999/xhtml" ||
      element.isContentEditable || Boolean(element.closest(excluded));
  }
  function localized(record) {
    if (language() === "en") return record.original;
    const match = index.get(normalize(record.original));
    if (!match) return record.original;
    // Preserve leading/trailing layout whitespace from the source.
    const leading = record.original.match(/^\s*/)[0];
    const trailing = record.original.match(/\s*$/)[0];
    return leading + match.hindi.trim() + trailing;
  }
  function recordFor(current, record) {
    if (record && current === record.last) return record;
    if (!index.has(normalize(current))) return null;
    return { original: current, last: current };
  }
  function translateText(element) {
    if (!element.matches(selector) || element.closest("[data-i18n]")) return;
    // Text nodes only: never replace the element, icons, nested links or listeners.
    // Translate a direct text fragment only when the complete fragment is known.
    for (const node of element.childNodes) {
      if (node.nodeType !== 3) continue;
      const current = node.nodeValue;
      const old = textRecords.get(node);
      const record = recordFor(current, old);
      if (!record) { if (old) textRecords.delete(node); continue; }
      // Freeze the implicit option value before changing its visible label.
      if (element.tagName === "OPTION" && !element.hasAttribute("value")) {
        element.setAttribute("value", element.value);
      }
      if (!old) translatedElements++;
      const next = localized(record);
      record.last = next;
      textRecords.set(node,record);
      if (current !== next) node.nodeValue = next;
    }
  }
  function translateAttributes(element) {
    let records = attributeRecords.get(element);
    for (const [attr, hook] of Object.entries(attrs)) {
      if (!element.hasAttribute(attr) || element.hasAttribute(hook)) continue;
      const current = element.getAttribute(attr);
      const old = records?.get(attr);
      const record = recordFor(current, old);
      if (!record) { records?.delete(attr); continue; }
      if (!records) { records = new Map(); attributeRecords.set(element,records); }
      if (!old) translatedAttributes++;
      const next = localized(record);
      record.last = next; records.set(attr,record);
      if (current !== next) element.setAttribute(attr,next);
    }
  }
  function processElement(element) {
    if (skip(element)) return;
    translateText(element); translateAttributes(element);
  }
  function processRoot(root) {
    if (!root?.querySelectorAll || skip(root)) return;
    if (root.matches(combined)) processElement(root);
    root.querySelectorAll(combined).forEach(processElement);
  }
  const titles = {
    "/":"home.title","/index.html":"home.title","/merahisab.html":"merahisab.title",
    "/royal-khata.html":"royal.title","/compare.html":"compare.title","/tools.html":"tools.title",
    "/privacy.html":"privacy.title","/about.html":"about.title","/contact.html":"support.title",
    "/offline.html":"offline.title","/404.html":"error.title"
  };
  function updateTitle() {
    if (language() === "en") { document.title = originalTitle; return; }
    const path = window.location.pathname;
    // Identify the actual page content, including the current swapped download filenames.
    const key = /\/(downloads|download)\.html$/.test(path)
      ? (/Download MeraHisab APK/i.test(originalTitle) ? "download.apk" : "download.title")
      : titles[path];
    const title = key && engine().t(key, originalTitle);
    if (title && title !== key) document.title = title + " | MeraHisab";
  }
  function applyPage() {
    if (!initialized) return;
    processRoot(document.body); updateTitle();
  }
  function flush() {
    timer = null;
    let count = 0;
    for (const node of pending) {
      pending.delete(node);
      if (node.isConnected) processRoot(node);
      if (++count >= MAX_BATCH) break;
    }
    if (pending.size) timer = setTimeout(flush,50);
  }
  function queue(node) {
    if (skip(node)) return;
    // Only translate newly generated UI in known website-owned mounts.
    // Arbitrary user-supplied or live text is never watched.
    if (!node.closest(generated)) return;
    for (const root of pending) {
      if (root.contains(node)) return;
      if (node.contains(root)) pending.delete(root);
    }
    pending.add(node);
    if (timer === null) timer = setTimeout(flush,50);
  }
  function observe() {
    if (observer || !document.body || typeof MutationObserver !== "function") return;
    observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) queue(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  function initialize() {
    if (initialized) return true;
    if (!engine() || !document.body || !registerAdditional()) return false;
    buildIndex(); initialized = true; applyPage(); observe(); return true;
  }
  function refresh() {
    if (!initialized) return initialize();
    buildIndex(); applyPage(); return true;
  }
  window.addEventListener("merahisab:languagechange", applyPage);
  window.addEventListener("merahisab:languagecontentready", () => { if (initialized) refresh(); });
  window.MeraHisabLanguageIntegration = Object.freeze({
    version:VERSION, initialize, refresh,
    getStatus:() => ({version:VERSION,initialized,language:language(),indexedTranslations:index.size,
      ambiguousTranslationsSkipped:ambiguous.size,translatedElements,translatedAttributes,
      dynamicObserverActive:Boolean(observer),pendingNodes:pending.size})
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",initialize,{once:true});
  else initialize();
  window.addEventListener("load",initialize,{once:true});
})();
