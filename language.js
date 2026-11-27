
/* ==========================================
   MERAHISAB LANGUAGE ENGINE
   Version: 1.0.0
   Official: https://merahisab.store/
========================================== */

(function () {

"use strict";

if (window.MeraHisabLanguage) {
  return;
}

const CONFIG = Object.freeze({

  version: "1.0.0",

  storageKey: "merahisab-language",

  defaultLanguage: "en",

  supportedLanguages: ["en", "hi"]

});

/* ==========================================
   TRANSLATION DICTIONARY
========================================== */

const translations = {

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

/* ==========================================
   LANGUAGE VALIDATION
========================================== */

function normalizeLanguage(language) {

  const normalized = String(language || "")
    .toLowerCase()
    .split("-")[0]
    .trim();

  return CONFIG.supportedLanguages.includes(normalized)
    ? normalized
    : CONFIG.defaultLanguage;

}

/* ==========================================
   STORAGE MANAGEMENT
========================================== */

function getSavedLanguage() {

  try {

    const saved =
      localStorage.getItem(CONFIG.storageKey);

    if (saved) {
      return normalizeLanguage(saved);
    }

  } catch (error) {

    // Continue without persistent storage.

  }

  return CONFIG.defaultLanguage;

}

function saveLanguage(language) {

  try {

    localStorage.setItem(
      CONFIG.storageKey,
      language
    );

    return true;

  } catch (error) {

    return false;

  }

}

let currentLanguage = getSavedLanguage();

/* ==========================================
   TRANSLATION LOOKUP
========================================== */

function translate(key, fallback) {

  const dictionary =
    translations[currentLanguage];

  if (
    Object.prototype.hasOwnProperty.call(
      dictionary,
      key
    )
  ) {

    return dictionary[key];

  }

  if (
    Object.prototype.hasOwnProperty.call(
      translations.en,
      key
    )
  ) {

    return translations.en[key];

  }

  return typeof fallback === "string"
    ? fallback
    : key;

}

/* ==========================================
   SAFE ELEMENT TRANSLATION
========================================== */

function translateElement(element) {

  const textKey =
    element.getAttribute("data-i18n");

  if (textKey) {

    const translated =
      translate(textKey, element.textContent);

    if (element.textContent !== translated) {

      element.textContent = translated;

    }

  }

  const placeholderKey =
    element.getAttribute("data-i18n-placeholder");

  if (placeholderKey) {

    element.setAttribute(

      "placeholder",

      translate(
        placeholderKey,
        element.getAttribute("placeholder") || ""
      )

    );

  }

  const titleKey =
    element.getAttribute("data-i18n-title");

  if (titleKey) {

    element.setAttribute(

      "title",

      translate(
        titleKey,
        element.getAttribute("title") || ""
      )

    );

  }

  const ariaKey =
    element.getAttribute("data-i18n-aria");

  if (ariaKey) {

    element.setAttribute(

      "aria-label",

      translate(
        ariaKey,
        element.getAttribute("aria-label") || ""
      )

    );

  }

}

/* ==========================================
   NAVIGATION TRANSLATION
========================================== */

const navigationMap = {

  "home": "nav.home",
  "apps": "nav.apps",
  "compare": "nav.compare",
  "features": "nav.features",
  "tools": "nav.tools",
  "privacy": "nav.privacy",
  "about": "nav.about",
  "support": "nav.support",
  "downloads": "nav.downloads",
  "contact": "nav.contact",

  "होम": "nav.home",
  "ऐप्स": "nav.apps",
  "तुलना": "nav.compare",
  "विशेषताएं": "nav.features",
  "उपकरण": "nav.tools",
  "गोपनीयता": "nav.privacy",
  "हमारे बारे में": "nav.about",
  "सहायता": "nav.support",
  "डाउनलोड": "nav.downloads",
  "संपर्क": "nav.contact"

};

function prepareNavigation() {

  document.querySelectorAll(
    "header nav a, footer a"
  ).forEach(function (link) {

    if (
      link.hasAttribute("data-i18n") ||
      link.children.length > 0
    ) {

      return;

    }

    const text = link.textContent
      .trim()
      .toLowerCase();

    const key = navigationMap[text];

    if (key) {

      link.setAttribute("data-i18n", key);

    }

  });

}

/* ==========================================
   LANGUAGE SWITCHER
========================================== */

function createLanguageSwitcher() {

  if (
    document.getElementById(
      "merahisabLanguageSwitcher"
    )
  ) {

    return;

  }

  const wrapper =
    document.createElement("div");

  wrapper.id =
    "merahisabLanguageSwitcher";

  wrapper.className =
    "mh-language-switcher";

  const label =
    document.createElement("label");

  label.htmlFor =
    "merahisabLanguageSelect";

  label.className =
    "mh-language-label";

  label.setAttribute(
    "data-i18n",
    "language.label"
  );

  label.textContent =
    translate("language.label");

  const select =
    document.createElement("select");

  select.id =
    "merahisabLanguageSelect";

  select.className =
    "mh-language-select";

  select.setAttribute(
    "data-i18n-aria",
    "language.label"
  );

  const english =
    document.createElement("option");

  english.value = "en";
  english.textContent = "English";
  english.lang = "en";

  const hindi =
    document.createElement("option");

  hindi.value = "hi";
  hindi.textContent = "हिन्दी";
  hindi.lang = "hi";

  select.appendChild(english);
  select.appendChild(hindi);

  select.value = currentLanguage;

  select.addEventListener(
    "change",
    function () {

      setLanguage(select.value);

    }
  );

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  const mount =
    document.getElementById("languageMount") ||
    document.querySelector("header nav") ||
    document.querySelector("header") ||
    document.body;

  mount.appendChild(wrapper);

}

/* ==========================================
   ACCESSIBILITY ANNOUNCEMENT
========================================== */

function announceLanguageChange() {

  let announcement =
    document.getElementById(
      "mhLanguageAnnouncement"
    );

  if (!announcement) {

    announcement =
      document.createElement("div");

    announcement.id =
      "mhLanguageAnnouncement";

    announcement.className =
      "mh-language-announcement";

    announcement.setAttribute(
      "role",
      "status"
    );

    announcement.setAttribute(
      "aria-live",
      "polite"
    );

    document.body.appendChild(announcement);

  }

  announcement.textContent =
    translate("language.changed");

}

/* ==========================================
   APPLY LANGUAGE
========================================== */

const translationSelector = [

  "[data-i18n]",
  "[data-i18n-placeholder]",
  "[data-i18n-title]",
  "[data-i18n-aria]"

].join(",");

function applyLanguage(root) {

  const target = root || document;

  document.documentElement.lang =
    currentLanguage === "hi"
      ? "hi-IN"
      : "en-IN";

  document.documentElement.dataset.language =
    currentLanguage;

  prepareNavigation();

  if (
    target.nodeType === 1 &&
    target.matches(translationSelector)
  ) {

    translateElement(target);

  }

  target.querySelectorAll(
    translationSelector
  ).forEach(translateElement);

  const select =
    document.getElementById(
      "merahisabLanguageSelect"
    );

  if (select) {

    select.value = currentLanguage;

  }

}

/* ==========================================
   SET LANGUAGE
========================================== */

function setLanguage(language, options) {

  const settings = options || {};

  const previousLanguage =
    currentLanguage;

  currentLanguage =
    normalizeLanguage(language);

  if (settings.persist !== false) {

    saveLanguage(currentLanguage);

  }

  applyLanguage(document);

  if (settings.announce !== false) {

    announceLanguageChange();

  }

  if (previousLanguage !== currentLanguage) {

    window.dispatchEvent(

      new CustomEvent(
        "merahisab:languagechange",
        {
          detail: {

            language: currentLanguage,

            previousLanguage:
              previousLanguage,

            locale:
              getLocale()

          }
        }
      )

    );

  }

  return currentLanguage;

}

/* ==========================================
   LOCALE MANAGEMENT
========================================== */

function getLocale() {

  return currentLanguage === "hi"
    ? "hi-IN"
    : "en-IN";

}

function formatNumber(number, options) {

  const value = Number(number);

  if (!Number.isFinite(value)) {

    return "—";

  }

  return new Intl.NumberFormat(
    getLocale(),
    options || {}
  ).format(value);

}

function formatCurrency(amount, options) {

  return formatNumber(

    amount,

    Object.assign(

      {
        style: "currency",
        currency: "INR"
      },

      options || {}

    )

  );

}

function formatDate(date, options) {

  const value =
    date instanceof Date
      ? date
      : new Date(date);

  if (!Number.isFinite(value.getTime())) {

    return "—";

  }

  return new Intl.DateTimeFormat(

    getLocale(),

    Object.assign(

      {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata"
      },

      options || {}

    )

  ).format(value);

}

/* ==========================================
   EXTEND TRANSLATION DICTIONARY
========================================== */

function addTranslations(language, entries) {

  if (
    !CONFIG.supportedLanguages.includes(language) ||
    !entries ||
    typeof entries !== "object"
  ) {

    return false;

  }

  Object.keys(entries).forEach(function (key) {

    if (
      /^[a-zA-Z0-9_.-]+$/.test(key) &&
      key !== "__proto__" &&
      key !== "constructor" &&
      key !== "prototype" &&
      typeof entries[key] === "string"
    ) {

      translations[language][key] =
        entries[key];

    }

  });

  if (language === currentLanguage) {

    applyLanguage(document);

  }

  return true;

}

/* ==========================================
   CROSS-TAB SYNCHRONIZATION
========================================== */

window.addEventListener(
  "storage",
  function (event) {

    if (event.key !== CONFIG.storageKey) {

      return;

    }

    setLanguage(

      event.newValue ||
        CONFIG.defaultLanguage,

      {
        persist: false,
        announce: false
      }

    );

  }
);

/* ==========================================
   DYNAMIC CONTENT SUPPORT
========================================== */

let observer = null;

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

        mutation.addedNodes.forEach(
          function (node) {

            if (node.nodeType !== 1) {

              return;

            }

            if (
              node.matches(translationSelector) ||
              node.querySelector(translationSelector)
            ) {

              applyLanguage(node);

            }

          }
        );

      });

    }
  );

  observer.observe(
    document.body,
    {
      childList: true,
      subtree: true
    }
  );

}

/* ==========================================
   PUBLIC LANGUAGE API
========================================== */

window.MeraHisabLanguage = Object.freeze({

  version: CONFIG.version,

  getLanguage: function () {

    return currentLanguage;

  },

  getLocale: getLocale,

  setLanguage: setLanguage,

  translate: translate,

  t: translate,

  apply: applyLanguage,

  addTranslations: addTranslations,

  formatNumber: formatNumber,

  formatCurrency: formatCurrency,

  formatDate: formatDate,

  reset: function () {

    return setLanguage(
      CONFIG.defaultLanguage
    );

  },

  getSupportedLanguages: function () {

    return CONFIG.supportedLanguages.slice();

  }

});

/* ==========================================
   INITIALIZATION
========================================== */

function initialize() {

  createLanguageSwitcher();

  applyLanguage(document);

  observeDynamicContent();

}

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initialize,
    {once: true}
  );

} else {

  initialize();

}

})();

/* ==========================================
   END OF MERAHISAB LANGUAGE ENGINE
========================================== */
