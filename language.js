/* MeraHisab Language Engine v2.0.0
   Official website: https://merahisab.store/
   Local English/Hindi UI translations. No remote translation requests.
*/
(function () {
  "use strict";
  if (window.MeraHisabLanguage) return;

  const VERSION = "2.0.0";
  const STORAGE_KEY = "merahisab-language";
  const SUPPORTED = Object.freeze(["en", "hi"]);
  const dictionaries = { en: Object.create(null), hi: Object.create(null) };

  // [key, English, Hindi]. Keep app names unchanged in both languages.
  const baseTranslations = [
    ["nav.home", "Home", "होम"],
    ["nav.apps", "Apps", "ऐप्स"],
    ["nav.compare", "Compare", "तुलना"],
    ["nav.features", "Features", "विशेषताएं"],
    ["nav.tools", "Tools", "उपकरण"],
    ["nav.privacy", "Privacy", "गोपनीयता"],
    ["nav.about", "About", "हमारे बारे में"],
    ["nav.support", "Support", "सहायता"],
    ["nav.downloads", "Downloads", "डाउनलोड"],
    ["nav.contact", "Contact", "संपर्क"],
    ["nav.theme", "Theme", "थीम"],
    ["language.label", "Select Language", "भाषा चुनें"],
    ["language.changed", "Language updated", "भाषा बदल दी गई है"],
    ["common.home", "Return Home", "होम पेज पर जाएं"],
    ["common.download", "Download", "डाउनलोड करें"],
    ["common.learnMore", "Learn More", "अधिक जानें"],
    ["common.viewDetails", "View Details", "विवरण देखें"],
    ["common.getStarted", "Get Started", "शुरू करें"],
    ["common.readMore", "Read More", "और पढ़ें"],
    ["common.close", "Close", "बंद करें"],
    ["common.open", "Open", "खोलें"],
    ["common.copy", "Copy", "कॉपी करें"],
    ["common.share", "Share", "शेयर करें"],
    ["common.reset", "Reset", "रीसेट करें"],
    ["common.clear", "Clear", "साफ करें"],
    ["common.search", "Search", "खोजें"],
    ["common.refresh", "Refresh", "रिफ्रेश करें"],
    ["common.loading", "Loading...", "लोड हो रहा है..."],
    ["common.available", "Available", "उपलब्ध"],
    ["common.unavailable", "Unavailable", "उपलब्ध नहीं"],
    ["common.comingSoon", "Coming Soon", "जल्द आ रहा है"],
    ["common.back", "Go Back", "वापस जाएं"],
    ["common.retry", "Try Again", "पुनः प्रयास करें"],
    ["common.cancel", "Cancel", "रद्द करें"],
    ["common.save", "Save", "सहेजें"],
    ["common.yes", "Yes", "हां"],
    ["common.no", "No", "नहीं"],
    ["common.optional", "Optional", "वैकल्पिक"],
    ["common.required", "Required", "आवश्यक"],
    ["common.pending", "Pending", "लंबित"],
    ["home.title", "Manage Your Money with Confidence", "आत्मविश्वास के साथ अपने पैसों का प्रबंधन करें"],
    ["home.description", "Explore MeraHisab and Royal Khata for personal finance and digital ledger management.", "व्यक्तिगत वित्त और डिजिटल खाते के प्रबंधन के लिए MeraHisab और Royal Khata के बारे में जानें।"],
    ["home.apps", "Our Applications", "हमारे ऐप्स"],
    ["home.features", "Key Features", "मुख्य विशेषताएं"],
    ["home.security", "Privacy & Security", "गोपनीयता और सुरक्षा"],
    ["home.tools", "Financial Tools", "वित्तीय उपकरण"],
    ["home.faq", "Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न"],
    ["app.merahisab", "MeraHisab", "MeraHisab"],
    ["app.royalKhata", "Royal Khata", "Royal Khata"],
    ["app.personalFinance", "Personal Financial Management", "व्यक्तिगत वित्त प्रबंधन"],
    ["app.digitalLedger", "Digital Credit & Debit Ledger", "डिजिटल जमा एवं उधार खाता"],
    ["app.income", "Income", "आय"],
    ["app.expenses", "Expenses", "खर्च"],
    ["app.credit", "Credit", "क्रेडिट"],
    ["app.debit", "Debit", "डेबिट"],
    ["app.balance", "Balance", "शेष राशि"],
    ["app.savings", "Savings", "बचत"],
    ["app.accounts", "Accounts", "खाते"],
    ["app.transactions", "Transactions", "लेनदेन"],
    ["app.reports", "Reports", "रिपोर्ट"],
    ["app.backup", "Backup", "बैकअप"],
    ["app.restore", "Restore", "डेटा पुनर्स्थापित करें"],
    ["app.recovery", "Recovery Key", "रिकवरी कुंजी"],
    ["app.offline", "Offline Access", "ऑफलाइन सुविधा"],
    ["download.title", "Download Center", "डाउनलोड केंद्र"],
    ["download.apk", "Download APK", "APK डाउनलोड करें"],
    ["download.version", "Application Version", "ऐप संस्करण"],
    ["download.size", "File Size", "फाइल का आकार"],
    ["download.checksum", "SHA-256 Checksum", "SHA-256 चेकसम"],
    ["download.verify", "Verify APK", "APK सत्यापित करें"],
    ["download.guide", "Installation Guide", "इंस्टॉलेशन गाइड"],
    ["download.pending", "Verification Pending", "सत्यापन लंबित"],
    ["tools.title", "Financial Tools", "वित्तीय उपकरण"],
    ["tools.emi", "EMI Calculator", "EMI कैलकुलेटर"],
    ["tools.sip", "SIP Calculator", "SIP कैलकुलेटर"],
    ["tools.fd", "FD Calculator", "FD कैलकुलेटर"],
    ["tools.rd", "RD Calculator", "RD कैलकुलेटर"],
    ["tools.simple", "Simple Interest", "साधारण ब्याज"],
    ["tools.compound", "Compound Interest", "चक्रवृद्धि ब्याज"],
    ["tools.gst", "GST Calculator", "GST कैलकुलेटर"],
    ["tools.discount", "Discount Calculator", "छूट कैलकुलेटर"],
    ["tools.percentage", "Percentage Calculator", "प्रतिशत कैलकुलेटर"],
    ["tools.savings", "Savings Goal Calculator", "बचत लक्ष्य कैलकुलेटर"],
    ["tools.inflation", "Inflation Calculator", "महंगाई कैलकुलेटर"],
    ["tools.calculate", "Calculate", "गणना करें"],
    ["tools.result", "Result", "परिणाम"],
    ["tools.amount", "Amount", "राशि"],
    ["tools.rate", "Interest Rate", "ब्याज दर"],
    ["tools.duration", "Duration", "अवधि"],
    ["tools.months", "Months", "महीने"],
    ["tools.years", "Years", "वर्ष"],
    ["tools.clock", "Indian Standard Time", "भारतीय मानक समय"],
    ["tools.stopwatch", "Stopwatch", "स्टॉपवॉच"],
    ["tools.start", "Start", "शुरू करें"],
    ["tools.pause", "Pause", "रोकें"],
    ["tools.resume", "Resume", "जारी रखें"],
    ["tools.lap", "Lap", "लैप"],
    ["privacy.title", "Privacy & Data Protection", "गोपनीयता और डेटा संरक्षण"],
    ["privacy.policy", "Privacy Policy", "गोपनीयता नीति"],
    ["privacy.security", "Data Security", "डेटा सुरक्षा"],
    ["privacy.storage", "Browser Storage", "ब्राउजर स्टोरेज"],
    ["privacy.permissions", "Permissions", "अनुमतियां"],
    ["privacy.rights", "Your Privacy Rights", "आपके गोपनीयता अधिकार"],
    ["about.title", "About MeraHisab", "MeraHisab के बारे में"],
    ["about.mission", "Our Mission", "हमारा उद्देश्य"],
    ["about.vision", "Our Vision", "हमारी दूरदृष्टि"],
    ["about.values", "Our Values", "हमारे मूल्य"],
    ["about.roadmap", "Development Roadmap", "विकास योजना"],
    ["support.title", "Contact & Support", "संपर्क और सहायता"],
    ["support.help", "Help Center", "सहायता केंद्र"],
    ["support.feedback", "Feedback", "सुझाव"],
    ["support.bug", "Report a Bug", "समस्या की रिपोर्ट करें"],
    ["support.name", "Your Name", "आपका नाम"],
    ["support.email", "Email Address", "ईमेल पता"],
    ["support.subject", "Subject", "विषय"],
    ["support.message", "Describe Your Request", "अपनी समस्या का विवरण दें"],
    ["support.category", "Request Category", "अनुरोध की श्रेणी"],
    ["support.preview", "Generate Request Preview", "अनुरोध का पूर्वावलोकन बनाएं"],
    ["support.local", "Local Draft — Not Submitted", "स्थानीय ड्राफ्ट — भेजा नहीं गया"],
    ["pwa.install", "Install Website", "वेबसाइट इंस्टॉल करें"],
    ["pwa.update", "Check for Updates", "अपडेट जांचें"],
    ["pwa.online", "Online", "ऑनलाइन"],
    ["pwa.offline", "Offline", "ऑफलाइन"],
    ["pwa.settings", "Website Settings", "वेबसाइट सेटिंग्स"],
    ["pwa.diagnostics", "Diagnostics", "तकनीकी जांच"],
    ["pwa.cache", "Offline Cache", "ऑफलाइन कैश"],
    ["pwa.storage", "Storage Management", "स्टोरेज प्रबंधन"],
    ["error.title", "Page Not Found", "पेज नहीं मिला"],
    ["error.search", "Find the Right Page", "सही पेज खोजें"],
    ["error.report", "Report a Broken Link", "खराब लिंक की रिपोर्ट करें"],
    ["error.description", "The requested page could not be found.", "आपके द्वारा खोजा गया पेज उपलब्ध नहीं है।"],
    ["footer.rights", "All rights reserved.", "सर्वाधिकार सुरक्षित।"],
    ["footer.website", "Official Website", "आधिकारिक वेबसाइट"]
  ];

  baseTranslations.forEach(([key, english, hindi]) => {
    dictionaries.en[key] = english;
    dictionaries.hi[key] = hindi;
  });

  const attributeHooks = Object.freeze({
    "data-i18n-placeholder": "placeholder",
    "data-i18n-title": "title",
    "data-i18n-aria": "aria-label",
    "data-i18n-alt": "alt"
  });

  const hookNames = ["data-i18n", ...Object.keys(attributeHooks)];
  const selector = hookNames.map(name => "[" + name + "]").join(",");

  const excluded = "script,style,noscript,template,iframe,object,embed," +
    "pre,code,kbd,samp,[data-no-translate],[translate='no']";

  const originalValues = new WeakMap();
  const boundSwitchers = new WeakSet();
  const pendingRoots = new Set();

  let observer = null;
  let initialized = false;
  let flushScheduled = false;
  let fullApplyPending = false;

  function canonicalLanguage(value) {
    if (typeof value !== "string") return null;

    const language = value
      .trim()
      .toLowerCase()
      .replace(/_/g, "-")
      .split("-")[0];

    return SUPPORTED.includes(language) ? language : null;
  }

  function normalizeLanguage(value) {
    return canonicalLanguage(value) || "en";
  }

  function readLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return undefined;
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selection still works for this page.
    }
  }

  let currentLanguage = normalizeLanguage(readLanguage());

  function getLocale() {
    return currentLanguage === "hi" ? "hi-IN" : "en-IN";
  }

  function validKey(key) {
    return typeof key === "string" &&
      key.length <= 128 &&
      /^[a-zA-Z0-9_.-]+$/.test(key) &&
      !key.split(/[.-]/).some(part =>
        part === "__proto__" ||
        part === "constructor" ||
        part === "prototype"
      );
  }

  function getTranslation(language, key) {
    const normalized = canonicalLanguage(language);

    if (!normalized || !validKey(key)) return null;

    const dictionary = dictionaries[normalized];

    return Object.prototype.hasOwnProperty.call(dictionary, key)
      ? dictionary[key]
      : null;
  }

  function translate(key, fallback) {
    const localized = getTranslation(currentLanguage, key);

    if (localized !== null) return localized;

    const english = getTranslation("en", key);

    if (english !== null) return english;

    return typeof fallback === "string"
      ? fallback
      : (typeof key === "string" ? key : "");
  }

  function setText(element, value) {
    if (element.textContent !== value) {
      element.textContent = value;
    }
  }

  function setAttribute(element, name, value) {
    if (element.getAttribute(name) !== value) {
      element.setAttribute(name, value);
    }
  }

  function isExcluded(element) {
    if (
      !element ||
      element.nodeType !== 1 ||
      element.namespaceURI !== "http://www.w3.org/1999/xhtml"
    ) {
      return true;
    }

    if (element.closest(excluded) || element.isContentEditable) {
      return true;
    }

    for (let node = element; node; node = node.parentElement) {
      const editable = node.getAttribute("contenteditable");

      if (
        editable !== null &&
        editable.toLowerCase() !== "false"
      ) {
        return true;
      }

      const translateSetting = node.getAttribute("translate");

      if (
        translateSetting &&
        translateSetting.toLowerCase() === "no"
      ) {
        return true;
      }
    }

    return false;
  }

  function originalValue(element, field, key, value) {
    let saved = originalValues.get(element);

    if (!saved) {
      saved = new Map();
      originalValues.set(element, saved);
    }

    const identity = field + ":" + key;

    if (!saved.has(identity)) {
      saved.set(identity, value);
    }

    return saved.get(identity);
  }

  function translateElement(element) {
    if (isExcluded(element)) return;

    const key = element.getAttribute("data-i18n");

    if (
      key &&
      element.children.length === 0 &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
    ) {
      const fallback = originalValue(
        element,
        "text",
        key,
        element.textContent
      );

      const text = translate(key, fallback);

      if (
        element.tagName === "OPTION" &&
        !element.hasAttribute("value")
      ) {
        // Preserve the browser-normalized value before changing its label.
        element.setAttribute("value", element.value);
      }

      setText(element, text);
    }

    Object.entries(attributeHooks).forEach(([hook, attribute]) => {
      const attributeKey = element.getAttribute(hook);

      if (!attributeKey) return;

      const fallback = originalValue(
        element,
        attribute,
        attributeKey,
        element.getAttribute(attribute) || ""
      );

      setAttribute(
        element,
        attribute,
        translate(attributeKey, fallback)
      );
    });
  }

  function translateTree(target) {
    if (
      !target ||
      typeof target.querySelectorAll !== "function"
    ) {
      return;
    }

    if (
      target.nodeType === 1 &&
      target.matches(selector)
    ) {
      translateElement(target);
    }

    target.querySelectorAll(selector).forEach(translateElement);
  }

  function prepareNavigation(target) {
    if (
      !target ||
      typeof target.querySelectorAll !== "function"
    ) {
      return;
    }

    const links = Array.from(
      target.querySelectorAll("header nav a, footer a")
    );

    if (
      target.nodeType === 1 &&
      target.matches("header nav a, footer a")
    ) {
      links.unshift(target);
    }

    links.forEach(link => {
      if (
        isExcluded(link) ||
        link.hasAttribute("data-i18n") ||
        link.children.length
      ) {
        return;
      }

      const text = link.textContent.trim().toLowerCase();

      const names = [
        "home",
        "apps",
        "compare",
        "features",
        "tools",
        "privacy",
        "about",
        "support",
        "downloads",
        "contact"
      ];

      const match = names.find(name =>
        SUPPORTED.some(language =>
          dictionaries[language]["nav." + name].toLowerCase() === text
        )
      );

      if (match) {
        link.setAttribute("data-i18n", "nav." + match);
      }
    });
  }

  function syncDocumentLanguage() {
    const root = document.documentElement;

    if (!root) return;

    setAttribute(root, "lang", getLocale());
    setAttribute(root, "data-language", currentLanguage);
  }

  function syncSwitcher() {
    const wrapper = document.getElementById(
      "merahisabLanguageSwitcher"
    );

    const select = document.getElementById(
      "merahisabLanguageSelect"
    );

    if (wrapper) {
      const label = wrapper.querySelector(".mh-language-label");

      if (label) {
        setText(label, translate("language.label"));
      }
    }

    if (select && select.tagName === "SELECT") {
      select.value = currentLanguage;

      setAttribute(
        select,
        "aria-label",
        translate("language.label")
      );
    }
  }

  function createLanguageSwitcher() {
    if (!document.body) return;

    let wrapper = document.getElementById(
      "merahisabLanguageSwitcher"
    );

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "merahisabLanguageSwitcher";
      wrapper.className = "mh-language-switcher";

      const label = document.createElement("label");
      label.htmlFor = "merahisabLanguageSelect";
      label.className = "mh-language-label";

      const select = document.createElement("select");
      select.id = "merahisabLanguageSelect";
      select.className = "mh-language-select";

      [
        ["en", "English"],
        ["hi", "हिन्दी"]
      ].forEach(([value, text]) => {
        const option = document.createElement("option");

        option.value = value;
        option.lang = value;
        option.textContent = text;

        select.appendChild(option);
      });

      wrapper.append(label, select);

      const mount =
        document.getElementById("languageMount") ||
        document.querySelector("header nav") ||
        document.querySelector("header") ||
        document.body;

      mount.appendChild(wrapper);
    }

    // This widget owns its labels; heuristic translators should skip it.
    setAttribute(wrapper, "data-no-translate", "true");

    const select = document.getElementById(
      "merahisabLanguageSelect"
    );

    if (
      select &&
      select.tagName === "SELECT" &&
      !boundSwitchers.has(select)
    ) {
      select.addEventListener("change", () => {
        setLanguage(select.value);
      });

      boundSwitchers.add(select);
    }

    syncSwitcher();
  }

  function getAnnouncement() {
    if (!document.body) return null;

    let element = document.getElementById(
      "mhLanguageAnnouncement"
    );

    if (!element) {
      element = document.createElement("div");
      element.id = "mhLanguageAnnouncement";
      element.className = "mh-language-announcement";

      document.body.appendChild(element);
    }

    setAttribute(element, "role", "status");
    setAttribute(element, "aria-live", "polite");
    setAttribute(element, "aria-atomic", "true");
    setAttribute(element, "data-no-translate", "true");

    return element;
  }

  function applyLanguage(root) {
    const target = root || document;

    syncDocumentLanguage();
    prepareNavigation(target);
    translateTree(target);
    syncSwitcher();
  }

  function setLanguage(language, options) {
    const settings =
      options && typeof options === "object"
        ? options
        : {};

    const previousLanguage = currentLanguage;

    currentLanguage = normalizeLanguage(language);

    if (settings.persist !== false) {
      saveLanguage(currentLanguage);
    }

    applyLanguage(document);

    if (previousLanguage !== currentLanguage) {
      if (settings.announce !== false) {
        const announcement = getAnnouncement();

        if (announcement) {
          setAttribute(announcement, "lang", getLocale());

          setText(
            announcement,
            translate("language.changed")
          );
        }
      }

      window.dispatchEvent(
        new CustomEvent("merahisab:languagechange", {
          detail: {
            language: currentLanguage,
            previousLanguage,
            locale: getLocale()
          }
        })
      );
    }

    return currentLanguage;
  }

  // Batch explicit translation work; ordinary clocks and user text are ignored.
  function scheduleFlush() {
    if (flushScheduled) return;

    flushScheduled = true;

    Promise.resolve().then(() => {
      flushScheduled = false;

      const full = fullApplyPending;
      fullApplyPending = false;

      const roots = Array.from(pendingRoots);
      pendingRoots.clear();

      if (full) {
        applyLanguage(document);
      } else {
        roots.forEach(root => {
          if (root.isConnected) {
            translateTree(root);
          }
        });
      }
    });
  }

  function queueRoot(root) {
    if (
      !root ||
      root.nodeType !== 1 ||
      isExcluded(root)
    ) {
      return;
    }

    if (
      !root.matches(selector) &&
      !root.querySelector(selector)
    ) {
      return;
    }

    if (!fullApplyPending) {
      for (const pending of pendingRoots) {
        if (pending.contains(root)) return;

        if (root.contains(pending)) {
          pendingRoots.delete(pending);
        }
      }

      pendingRoots.add(root);
    }

    scheduleFlush();
  }

  function observeDynamicContent() {
    if (
      observer ||
      !document.body ||
      typeof MutationObserver !== "function"
    ) {
      return;
    }

    observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === "attributes") {
          queueRoot(record.target);
        } else if (record.type === "characterData") {
          const parent = record.target.parentElement;

          if (
            parent &&
            parent.hasAttribute("data-i18n")
          ) {
            queueRoot(parent);
          }
        } else {
          if (
            record.target.nodeType === 1 &&
            record.target.hasAttribute("data-i18n")
          ) {
            queueRoot(record.target);
          }

          record.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              queueRoot(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: hookNames
    });
  }

  function addTranslations(language, entries) {
    const normalized = canonicalLanguage(language);

    if (
      !normalized ||
      !entries ||
      typeof entries !== "object" ||
      Array.isArray(entries)
    ) {
      return false;
    }

    let descriptors;

    try {
      descriptors = Object.getOwnPropertyDescriptors(entries);
    } catch {
      return false;
    }

    let changed = false;

    Object.keys(descriptors).forEach(key => {
      const descriptor = descriptors[key];

      if (
        !descriptor.enumerable ||
        !validKey(key) ||
        !Object.prototype.hasOwnProperty.call(descriptor, "value") ||
        typeof descriptor.value !== "string" ||
        descriptor.value.length > 20000
      ) {
        return;
      }

      if (dictionaries[normalized][key] !== descriptor.value) {
        dictionaries[normalized][key] = descriptor.value;
        changed = true;
      }
    });

    if (
      changed &&
      (normalized === currentLanguage || normalized === "en")
    ) {
      fullApplyPending = true;
      scheduleFlush();
    }

    return true;
  }

  function formatNumber(number, options) {
    try {
      const value =
        typeof number === "bigint"
          ? number
          : Number(number);

      if (
        typeof value !== "bigint" &&
        !Number.isFinite(value)
      ) {
        return "—";
      }

      return new Intl.NumberFormat(
        getLocale(),
        options || {}
      ).format(value);
    } catch {
      return "—";
    }
  }

  function formatCurrency(amount, options) {
    try {
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
    } catch {
      return "—";
    }
  }

  function formatDateTime(date, options, timeOnly) {
    try {
      if (
        date === null ||
        date === undefined ||
        date === ""
      ) {
        return "—";
      }

      const value = new Date(date);

      if (!Number.isFinite(value.getTime())) {
        return "—";
      }

      const supplied = Object.assign({}, options || {});

      let defaults = {
        timeZone: "Asia/Kolkata"
      };

      if (
        supplied.dateStyle === undefined &&
        supplied.timeStyle === undefined
      ) {
        defaults = Object.assign(
          defaults,
          timeOnly
            ? {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23"
              }
            : {
                day: "numeric",
                month: "long",
                year: "numeric"
              }
        );
      }

      return new Intl.DateTimeFormat(
        getLocale(),
        Object.assign(defaults, supplied)
      ).format(value);
    } catch {
      return "—";
    }
  }

  function initialize() {
    if (!document.body) return false;

    createLanguageSwitcher();
    getAnnouncement();
    applyLanguage(document);
    observeDynamicContent();

    initialized = true;

    return true;
  }

  window.addEventListener("storage", event => {
    if (
      event.key !== STORAGE_KEY &&
      event.key !== null
    ) {
      return;
    }

    try {
      if (
        event.storageArea &&
        event.storageArea !== window.localStorage
      ) {
        return;
      }
    } catch {
      return;
    }

    setLanguage(
      event.key === null ? "en" : event.newValue,
      {
        persist: false,
        announce: false
      }
    );
  });

  window.addEventListener("pageshow", () => {
    const saved = readLanguage();

    if (
      saved !== undefined &&
      normalizeLanguage(saved) !== currentLanguage
    ) {
      setLanguage(saved, {
        persist: false,
        announce: false
      });
    }
  });

  window.MeraHisabLanguage = Object.freeze({
    version: VERSION,

    getLanguage: () => currentLanguage,

    getLocale,

    setLanguage,

    translate,

    t: translate,

    apply: applyLanguage,

    addTranslations,

    getTranslation,

    getKeys: language => {
      if (language === undefined) {
        return Array.from(
          new Set([
            ...Object.keys(dictionaries.en),
            ...Object.keys(dictionaries.hi)
          ])
        );
      }

      const normalized = canonicalLanguage(language);

      return normalized
        ? Object.keys(dictionaries[normalized])
        : [];
    },

    formatNumber,

    formatCurrency,

    formatDate: (date, options) => {
      return formatDateTime(date, options, false);
    },

    formatTime: (date, options) => {
      return formatDateTime(date, options, true);
    },

    reset: () => setLanguage("en"),

    getSupportedLanguages: () => SUPPORTED.slice(),

    initialize,

    getStatus: () => ({
      version: VERSION,
      language: currentLanguage,
      locale: getLocale(),
      initialized,
      observing: observer !== null,
      keys: {
        en: Object.keys(dictionaries.en).length,
        hi: Object.keys(dictionaries.hi).length
      }
    })
  });

  syncDocumentLanguage();

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }
})();
