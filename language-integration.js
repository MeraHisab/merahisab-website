
/* ==========================================
   MERAHISAB LANGUAGE INTEGRATION
   Version: 1.1.0
   Official: https://merahisab.store/
========================================== */

(function () {

"use strict";

if (window.MeraHisabLanguageIntegration) {
  return;
}

const CONFIG = Object.freeze({

  version: "1.1.0",

  maxTextLength: 500,

  batchDelay: 80,

  maxBatchSize: 250

});

/* ==========================================
   INTEGRATION STATE
========================================== */

let initialized = false;

let observer = null;

let scheduled = false;

let timer = null;

let translatedElements = 0;

let translatedAttributes = 0;

const pendingNodes = new Set();

const textIndex = new Map();

const ambiguousTexts = new Set();

const originalTexts = new WeakMap();

const originalAttributes = new WeakMap();

/* ==========================================
   SUPPORTED ELEMENTS
========================================== */

const supportedSelector = [

  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "a",
  "button",
  "label",
  "summary",
  "legend",
  "th",
  "td",
  "li",
  "dt",
  "dd",
  "span",
  "strong",
  "small",
  "option",
  "figcaption"

].join(",");

const attributeSelector = [

  "[placeholder]",
  "[title]",
  "[aria-label]"

].join(",");

const combinedSelector =

  supportedSelector + "," +
  attributeSelector;

/* ==========================================
   EXCLUDED CONTENT
========================================== */

const excludedSelector = [

  "script",
  "style",
  "code",
  "pre",
  "kbd",
  "samp",
  "textarea",
  "svg",
  "canvas",
  "[contenteditable]",
  "[data-no-translate]",
  "[translate='no']",
  "#requestPreview",
  "#requestForm input",
  "#requestForm textarea",
  "[role='status']",
  "[role='alert']",
  "[aria-live]",
  "output",
  "#result",
  "#stopwatchDisplay",
  "#swLapList",
  "#lapList",
  "#liveClock",
  "#istClock",
  "#hashOutput",
  "#requestedPath",
  "#merahisabLanguageSwitcher",
  "#mhLanguageAnnouncement"

].join(",");

/* ==========================================
   BASE TRANSLATION KEYS
========================================== */

const baseKeys = [

  "nav.home",
  "nav.apps",
  "nav.compare",
  "nav.features",
  "nav.tools",
  "nav.privacy",
  "nav.about",
  "nav.support",
  "nav.downloads",
  "nav.contact",
  "nav.theme",

  "common.home",
  "common.download",
  "common.learnMore",
  "common.viewDetails",
  "common.getStarted",
  "common.readMore",
  "common.close",
  "common.open",
  "common.copy",
  "common.share",
  "common.reset",
  "common.clear",
  "common.search",
  "common.refresh",
  "common.loading",
  "common.available",
  "common.unavailable",
  "common.comingSoon",
  "common.back",
  "common.retry",
  "common.cancel",
  "common.save",
  "common.yes",
  "common.no",
  "common.optional",
  "common.required",
  "common.pending",

  "home.title",
  "home.description",
  "home.apps",
  "home.features",
  "home.security",
  "home.tools",
  "home.faq",

  "app.merahisab",
  "app.royalKhata",
  "app.personalFinance",
  "app.digitalLedger",
  "app.income",
  "app.expenses",
  "app.credit",
  "app.debit",
  "app.balance",
  "app.savings",
  "app.accounts",
  "app.transactions",
  "app.reports",
  "app.backup",
  "app.restore",
  "app.recovery",
  "app.offline",

  "download.title",
  "download.apk",
  "download.version",
  "download.size",
  "download.checksum",
  "download.verify",
  "download.guide",
  "download.pending",

  "tools.title",
  "tools.emi",
  "tools.sip",
  "tools.fd",
  "tools.rd",
  "tools.simple",
  "tools.compound",
  "tools.gst",
  "tools.discount",
  "tools.percentage",
  "tools.savings",
  "tools.inflation",
  "tools.calculate",
  "tools.result",
  "tools.amount",
  "tools.rate",
  "tools.duration",
  "tools.months",
  "tools.years",
  "tools.clock",
  "tools.stopwatch",
  "tools.start",
  "tools.pause",
  "tools.resume",
  "tools.lap",

  "privacy.title",
  "privacy.policy",
  "privacy.security",
  "privacy.storage",
  "privacy.permissions",
  "privacy.rights",

  "about.title",
  "about.mission",
  "about.vision",
  "about.values",
  "about.roadmap",

  "support.title",
  "support.help",
  "support.feedback",
  "support.bug",
  "support.name",
  "support.email",
  "support.subject",
  "support.message",
  "support.category",
  "support.preview",
  "support.local",

  "pwa.install",
  "pwa.update",
  "pwa.online",
  "pwa.offline",
  "pwa.settings",
  "pwa.diagnostics",
  "pwa.cache",
  "pwa.storage",

  "error.title",
  "error.search",
  "error.report",
  "error.description",

  "footer.rights",
  "footer.website"

];

/* ==========================================
   ADDITIONAL EXACT TEXT TRANSLATIONS
========================================== */

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

/* ==========================================
   LANGUAGE ENGINE ACCESS
========================================== */

function getEngine() {

  return window.MeraHisabLanguage || null;

}

function getLanguage() {

  const engine = getEngine();

  return engine
    ? engine.getLanguage()
    : "en";

}

function normalize(text) {

  return String(text || "")
    .replace(/\s+/g," ")
    .trim();

}

/* ==========================================
   REGISTER ADDITIONAL CONTENT
========================================== */

function registerAdditionalContent() {

  const engine = getEngine();

  if (!engine) {
    return false;
  }

  const en = Object.create(null);

  const hi = Object.create(null);

  additionalContent.forEach(function (entry) {

    en[entry[0]] = entry[1];

    hi[entry[0]] = entry[2];

  });

  engine.addTranslations("en",en);

  engine.addTranslations("hi",hi);

  return true;

}

/* ==========================================
   BUILD EXACT TRANSLATION INDEX
========================================== */

function addIndexEntry(english,key,hindi) {

  if (typeof english !== "string" || typeof hindi !== "string") return;
  const text = normalize(english);

  if (
    !text ||
    !hindi ||
    text.length > CONFIG.maxTextLength ||
    text === normalize(hindi)
  ) {

    return;

  }

  if (ambiguousTexts.has(text)) {

    return;

  }

  const existing = textIndex.get(text);

  if (
    existing &&
    existing.hindi !== hindi
  ) {

    textIndex.delete(text);

    ambiguousTexts.add(text);

    return;

  }

  textIndex.set(text,{

    key: key,

    hindi: hindi

  });

}

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

function buildIndex() {
  textIndex.clear();
  ambiguousTexts.clear();
  const extended = window.MeraHisabLanguageContent;
  const keys = new Set([...Object.keys(baseDictionary.en),
    ...(extended ? extended.getKeys() : [])]);
  for (const key of keys) {
    const en = extended?.getTranslation("en", key) || baseDictionary.en[key];
    const hi = extended?.getTranslation("hi", key) || baseDictionary.hi[key];
    addIndexEntry(en, key, hi);
  }
  additionalContent.forEach(([key,en,hi]) => addIndexEntry(en,key,hi));
  return true;
}

/* ==========================================
   SAFE ELEMENT CHECK
========================================== */

function isExcluded(element) {

  if (
    !element ||
    element.nodeType !== 1
  ) {

    return true;

  }

  return Boolean(

    element.closest(excludedSelector)

  );

}

function isTextElement(element) {

  return (

    element.matches(supportedSelector) &&

    element.children.length === 0 &&

    !element.hasAttribute("data-i18n") &&

    (element.tagName !== "OPTION" || element.hasAttribute("value")) &&
    !element.isContentEditable &&
    !element.closest("[data-i18n]")

  );

}

/* ==========================================
   SAFE TEXT TRANSLATION
========================================== */

function translateText(element) {

  if (
    isExcluded(element) ||
    !isTextElement(element)
  ) {

    return;

  }

  const engine = getEngine();

  if (!engine) {
    return;
  }

  const currentText =
    normalize(element.textContent);

  if (
    !currentText ||
    currentText.length > CONFIG.maxTextLength
  ) {

    return;

  }

  let record = originalTexts.get(element);

  if (
    record &&
    currentText !== normalize(record.lastValue) &&
    currentText !== normalize(record.original)
  ) {

    originalTexts.delete(element);

    record = null;

  }

  if (!record) {

    const match = textIndex.get(currentText);

    if (!match) {
      return;
    }

    /*
      Preserve option values so that
      translations cannot change form logic.
    */

    if (
      element.tagName === "OPTION" &&
      !element.hasAttribute("value")
    ) {

      element.setAttribute(

        "value",

        element.value

      );

    }

    record = {

      original: element.textContent,

      key: match.key,

      lastValue: element.textContent

    };

    originalTexts.set(element,record);

    translatedElements++;

  }

  const translated = getLanguage() === "en"

    ? record.original

    : engine.t(
        record.key,
        record.original
      );

  record.lastValue = translated;

  if (element.textContent !== translated) {

    element.textContent = translated;

  }

}

/* ==========================================
   ATTRIBUTE TRANSLATION
========================================== */

const attributes = [

  {
    name: "placeholder",
    explicit: "data-i18n-placeholder"
  },

  {
    name: "title",
    explicit: "data-i18n-title"
  },

  {
    name: "aria-label",
    explicit: "data-i18n-aria"
  }

];

function translateAttributes(element) {

  if (isExcluded(element)) {
    return;
  }

  const engine = getEngine();

  if (!engine) {
    return;
  }

  let records =
    originalAttributes.get(element);

  attributes.forEach(function (attribute) {

    if (

      !element.hasAttribute(attribute.name) ||

      element.hasAttribute(attribute.explicit)

    ) {

      return;

    }

    const current =
      element.getAttribute(attribute.name);

    let record = records
      ? records[attribute.name]
      : null;

    if (
      record &&
      current !== record.lastValue &&
      current !== record.original
    ) {

      delete records[attribute.name];

      record = null;

    }

    if (!record) {

      const match =
        textIndex.get(normalize(current));

      if (!match) {
        return;
      }

      if (!records) {

        records = Object.create(null);

        originalAttributes.set(

          element,

          records

        );

      }

      record = {

        original: current,

        key: match.key,

        lastValue: current

      };

      records[attribute.name] = record;

      translatedAttributes++;

    }

    const translated = getLanguage() === "en"

      ? record.original

      : engine.t(
          record.key,
          record.original
        );

    record.lastValue = translated;

    if (current !== translated) {

      element.setAttribute(

        attribute.name,

        translated

      );

    }

  });

}

/* ==========================================
   PROCESS INDIVIDUAL ELEMENT
========================================== */

function processElement(element) {

  if (isExcluded(element)) {
    return;
  }

  translateText(element);

  translateAttributes(element);

}

/* ==========================================
   PROCESS PAGE SECTION
========================================== */

function processRoot(root) {

  if (!root) {
    return;
  }

  if (
    root.nodeType === 1 &&
    root.matches(combinedSelector)
  ) {

    processElement(root);

  }

  if (
    typeof root.querySelectorAll !== "function"
  ) {

    return;

  }

  root.querySelectorAll(

    combinedSelector

  ).forEach(processElement);

}

/* ==========================================
   PAGE TITLE TRANSLATION
========================================== */

const pageTitles = {

  "/": "home.title",

  "/index.html": "home.title",

  "/merahisab.html": "merahisab.title",

  "/royal-khata.html": "royal.title",

  "/downloads.html": "download.title",

  "/download.html": "download.apk",

  "/compare.html": "compare.title",

  "/tools.html": "tools.title",

  "/privacy.html": "privacy.title",

  "/about.html": "about.title",

  "/contact.html": "support.title",

  "/offline.html": "offline.title",

  "/404.html": "error.title"

};

const originalTitle = document.title;

function updatePageTitle() {

  const engine = getEngine();

  if (!engine) {
    return;
  }

  if (getLanguage() === "en") {

    document.title = originalTitle;

    return;

  }

  const key =
    pageTitles[window.location.pathname];

  if (key) {

    const translated = engine.t(key,"");

    if (translated) {

      document.title =

        translated + " | MeraHisab";

    }

  }

}

/* ==========================================
   APPLY COMPLETE PAGE TRANSLATION
========================================== */

function applyPage() {

  if (!initialized) {
    return;
  }

  processRoot(document.body);

  updatePageTitle();

}

/* ==========================================
   BATCH PROCESS DYNAMIC CONTENT
========================================== */

function flushQueue() {

  scheduled = false;

  timer = null;

  let processed = 0;

  for (const node of pendingNodes) {

    pendingNodes.delete(node);

    if (node.isConnected) {

      processRoot(node);

    }

    processed++;

    if (processed >= CONFIG.maxBatchSize) {

      break;

    }

  }

  if (pendingNodes.size > 0) {

    scheduleProcessing();

  }

}

function scheduleProcessing() {

  if (scheduled) {
    return;
  }

  scheduled = true;

  timer = window.setTimeout(

    flushQueue,

    CONFIG.batchDelay

  );

}

function queueNode(node) {

  if (!node) {
    return;
  }

  if (node.nodeType === 3) {

    node = node.parentElement;

  }

  if (
    !node ||
    node.nodeType !== 1 ||
    isExcluded(node)
  ) {

    return;

  }

  pendingNodes.add(node);

  scheduleProcessing();

}

/* ==========================================
   DYNAMIC CONTENT OBSERVER
========================================== */

function observeDynamicContent() {

  if (
    observer ||
    typeof MutationObserver !== "function"
  ) {

    return;

  }

  observer = new MutationObserver(

    function (mutations) {

      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) queueNode(node);
        });
      });

    }

  );

  observer.observe(document.body,{

    childList: true,

    subtree: true
  });

}

/* ==========================================
   LANGUAGE CHANGE EVENT
========================================== */

window.addEventListener(

  "merahisab:languagechange",

  function () {

    if (initialized) {

      applyPage();

    }

  }

);

/* ==========================================
   EXTENDED DICTIONARY READY EVENT
========================================== */

window.addEventListener(

  "merahisab:languagecontentready",

  function () {

    if (initialized) {

      initialized = false;

      buildIndex();

      initialized = true;

      applyPage();

    }

  }

);

/* ==========================================
   INITIALIZATION
========================================== */

function initialize() {

  if (initialized) {

    return true;

  }

  if (!getEngine()) {

    return false;

  }

  registerAdditionalContent();

  buildIndex();

  initialized = true;

  applyPage();

  observeDynamicContent();

  return true;

}

/* ==========================================
   PUBLIC INTEGRATION API
========================================== */

window.MeraHisabLanguageIntegration =

  Object.freeze({

    version: CONFIG.version,

    initialize: initialize,

    refresh: function () {

      if (!initialized) {

        return initialize();

      }

      applyPage();

      return true;

    },

    getStatus: function () {

      return {

        version: CONFIG.version,

        initialized: initialized,

        language: getLanguage(),

        indexedTranslations: textIndex.size,

        ambiguousTranslationsSkipped:
          ambiguousTexts.size,

        translatedElements:
          translatedElements,

        translatedAttributes:
          translatedAttributes,

        dynamicObserverActive:
          Boolean(observer),

        pendingNodes:
          pendingNodes.size

      };

    }

  });

/* ==========================================
   START INTEGRATION
========================================== */

if (document.readyState === "loading") {

  document.addEventListener(

    "DOMContentLoaded",

    initialize,

    {once: true}

  );

} else {

  initialize();

}

window.addEventListener(

  "load",

  initialize,

  {once: true}

);

/* ==========================================
   END OF LANGUAGE INTEGRATION
========================================== */

})();
