
/* ==========================================
   MERAHISAB SHARED WEBSITE ENGINE
   Version: 2.0.0
   Official: https://merahisab.store/
========================================== */

(function () {

"use strict";

if (window.MeraHisabUpgrade) {
  return;
}

/* ==========================================
   WEBSITE CONFIGURATION
========================================== */

const CONFIG = Object.freeze({

  version: "2.0.0",

  themeStorageKey: "mh-theme",

  defaultTheme: "dark",

  languageStylesheet: "/language.css",

  languageScripts: [

    "/language.js",

    "/language-content.js",

    "/language-integration.js"

  ]

});

let languageStatus = "pending";

let languagePromise = null;

let initialized = false;

/* ==========================================
   SAFE LOCAL STORAGE
========================================== */

function readStorage(key) {

  try {

    return localStorage.getItem(key);

  } catch (error) {

    return null;

  }

}

function writeStorage(key,value) {

  try {

    localStorage.setItem(key,value);

    return true;

  } catch (error) {

    return false;

  }

}

/* ==========================================
   THEME MANAGEMENT
========================================== */

const supportedThemes = [

  "dark",

  "light",

  "system"

];

const systemTheme = window.matchMedia(

  "(prefers-color-scheme: dark)"

);

function normalizeTheme(theme) {

  return supportedThemes.includes(theme)

    ? theme

    : CONFIG.defaultTheme;

}

let currentTheme = normalizeTheme(

  readStorage(CONFIG.themeStorageKey)

);

function getResolvedTheme() {

  if (currentTheme === "system") {

    return systemTheme.matches

      ? "dark"

      : "light";

  }

  return currentTheme;

}

function applyTheme() {

  const resolved = getResolvedTheme();

  document.documentElement.dataset.theme =
    resolved;

  document.documentElement.dataset.themeMode =
    currentTheme;

  document.documentElement.style.colorScheme =
    resolved;

  const meta = document.querySelector(

    'meta[name="theme-color"]'

  );

  if (meta) {

    meta.setAttribute(

      "content",

      resolved === "dark"

        ? "#080f20"

        : "#faf6ed"

    );

  }

  updateThemeControls();

}

function setTheme(theme,persist = true) {

  currentTheme = normalizeTheme(theme);

  if (persist) {

    writeStorage(

      CONFIG.themeStorageKey,

      currentTheme

    );

  }

  applyTheme();

  window.dispatchEvent(

    new CustomEvent(

      "merahisab:themechange",

      {

        detail: {

          mode: currentTheme,

          resolved: getResolvedTheme()

        }

      }

    )

  );

  return currentTheme;

}

function translate(key,fallback) {

  const engine = window.MeraHisabLanguage;

  if (

    engine &&

    typeof engine.t === "function"

  ) {

    return engine.t(key,fallback);

  }

  return fallback;

}

/* ==========================================
   THEME CONTROL LABELS
========================================== */

function getThemeLabel(theme) {

  const labels = {

    dark: translate(

      "feature.darkMode",

      "Dark Mode"

    ),

    light: translate(

      "feature.lightMode",

      "Light Mode"

    ),

    system: translate(

      "feature.systemTheme",

      "System Theme"

    )

  };

  return labels[theme];

}

function updateThemeControls() {

  const button = document.getElementById(

    "theme"

  );

  if (button) {

    const label = getThemeLabel(

      currentTheme

    );

    button.setAttribute(

      "aria-label",

      label

    );

    button.setAttribute(

      "title",

      label

    );

    button.dataset.themeMode =
      currentTheme;

    if (button.children.length === 0) {

      const icons = {

        dark: "🌙",

        light: "☀️",

        system: "◐"

      };

      button.textContent =

        icons[currentTheme] + " " + label;

    }

  }

  document.querySelectorAll(

    "[data-theme-select]"

  ).forEach(function (control) {

    if (control.tagName === "SELECT") {

      control.value = currentTheme;

    }

  });

}

/* ==========================================
   THEME SWITCHING
========================================== */

function cycleTheme() {

  const index = supportedThemes.indexOf(

    currentTheme

  );

  const next = supportedThemes[

    (index + 1) % supportedThemes.length

  ];

  setTheme(next);

}

function initializeThemeControls() {

  const button = document.getElementById(

    "theme"

  );

  if (button) {

    button.onclick = cycleTheme;

    if (button.tagName === "BUTTON") {

      button.type = "button";

    }

  }

  document.querySelectorAll(

    "[data-theme-select]"

  ).forEach(function (control) {

    if (control.tagName === "SELECT") {

      control.addEventListener(

        "change",

        function () {

          setTheme(control.value);

        }

      );

    }

  });

  updateThemeControls();

}

/* ==========================================
   SYSTEM THEME DETECTION
========================================== */

function handleSystemThemeChange() {

  if (currentTheme === "system") {

    applyTheme();

  }

}

if (

  typeof systemTheme.addEventListener ===
  "function"

) {

  systemTheme.addEventListener(

    "change",

    handleSystemThemeChange

  );

} else if (

  typeof systemTheme.addListener ===
  "function"

) {

  systemTheme.addListener(

    handleSystemThemeChange

  );

}

/* ==========================================
   CROSS TAB THEME SYNCHRONIZATION
========================================== */

window.addEventListener(

  "storage",

  function (event) {

    if (

      event.key === CONFIG.themeStorageKey

    ) {

      setTheme(

        event.newValue ||
        CONFIG.defaultTheme,

        false

      );

    }

  }

);

/* APPLY THEME AS EARLY AS POSSIBLE */

applyTheme();

/* ==========================================
   COPYRIGHT YEAR
========================================== */

function updateCopyrightYear() {

  const year = new Date().getFullYear();

  document.querySelectorAll(

    "[data-year]"

  ).forEach(function (element) {

    element.textContent = year;

  });

}

/* ==========================================
   STYLESHEET LOADER
========================================== */

function loadStylesheet(path) {

  return new Promise(function (resolve,reject) {

    const absoluteURL = new URL(

      path,

      window.location.origin

    ).href;

    const existing = Array.from(

      document.querySelectorAll(

        'link[rel="stylesheet"]'

      )

    ).find(function (link) {

      return link.href === absoluteURL;

    });

    if (existing && existing.sheet) {

      resolve();

      return;

    }

    const link = existing ||

      document.createElement("link");

    const timeout = window.setTimeout(

      function () {

        cleanup();

        reject(

          new Error("Stylesheet timeout")

        );

      },

      15000

    );

    function cleanup() {

      clearTimeout(timeout);

      link.removeEventListener(

        "load",

        handleLoad

      );

      link.removeEventListener(

        "error",

        handleError

      );

    }

    function handleLoad() {

      cleanup();

      resolve();

    }

    function handleError() {

      cleanup();

      reject(

        new Error("Stylesheet unavailable")

      );

    }

    link.addEventListener(

      "load",

      handleLoad

    );

    link.addEventListener(

      "error",

      handleError

    );

    if (!existing) {

      link.rel = "stylesheet";

      link.href = absoluteURL;

      document.head.appendChild(link);

    }

  });

}

/* ==========================================
   SCRIPT AVAILABILITY CHECK
========================================== */

function isScriptReady(path) {

  if (path === "/language.js") {

    return Boolean(

      window.MeraHisabLanguage

    );

  }

  if (path === "/language-content.js") {

    return Boolean(

      window.MeraHisabLanguageContent

    );

  }

  if (path === "/language-integration.js") {

    return Boolean(

      window.MeraHisabLanguageIntegration

    );

  }

  return false;

}

/* ==========================================
   SAFE SEQUENTIAL SCRIPT LOADER
========================================== */

function loadScript(path) {

  return new Promise(function (resolve,reject) {

    if (isScriptReady(path)) {

      resolve();

      return;

    }

    const absoluteURL = new URL(

      path,

      window.location.origin

    ).href;

    const existing = Array.from(

      document.querySelectorAll("script[src]")

    ).find(function (script) {

      return script.src === absoluteURL;

    });

    const script = existing ||

      document.createElement("script");

    const timeout = window.setTimeout(

      function () {

        cleanup();

        reject(

          new Error("Script loading timeout")

        );

      },

      15000

    );

    function cleanup() {

      clearTimeout(timeout);

      script.removeEventListener(

        "load",

        handleLoad

      );

      script.removeEventListener(

        "error",

        handleError

      );

    }

    function handleLoad() {

      cleanup();

      if (isScriptReady(path)) {

        resolve();

      } else {

        reject(

          new Error("Language API unavailable")

        );

      }

    }

    function handleError() {

      cleanup();

      reject(

        new Error("Unable to load " + path)

      );

    }

    script.addEventListener(

      "load",

      handleLoad

    );

    script.addEventListener(

      "error",

      handleError

    );

    if (!existing) {

      script.src = absoluteURL;

      script.async = false;

      document.head.appendChild(script);

    }

  });

}

/* ==========================================
   SHARED LANGUAGE SYSTEM
========================================== */

function loadLanguageSystem() {

  if (languagePromise) {

    return languagePromise;

  }

  languageStatus = "loading";

  languagePromise = (async function () {

    try {

      await loadStylesheet(

        CONFIG.languageStylesheet

      );

      for (

        const path of CONFIG.languageScripts

      ) {

        await loadScript(path);

      }

      const content =

        window.MeraHisabLanguageContent;

      const integration =

        window.MeraHisabLanguageIntegration;

      if (

        !content.register() ||

        !integration.initialize()

      ) {

        throw new Error(

          "Language initialization failed"

        );

      }

      languageStatus = "ready";

      updateThemeControls();

      window.dispatchEvent(

        new CustomEvent(

          "merahisab:languageready"

        )

      );

      return true;

    } catch (error) {

      languageStatus = "unavailable";

      console.warn(

        "MeraHisab language system:",

        error.message

      );

      return false;

    }

  })();

  return languagePromise;

}

/* ==========================================
   LANGUAGE CHANGE SUPPORT
========================================== */

window.addEventListener(

  "merahisab:languagechange",

  function () {

    updateThemeControls();

  }

);

/* ==========================================
   LEGACY CALCULATOR COMPATIBILITY
========================================== */

function initializeLegacyCalculator() {

  const form = document.querySelector(

    "#calc"

  );

  const result = document.querySelector(

    "#result"

  );

  if (!form || !result) {

    return;

  }

  const amount = form.elements.namedItem(

    "amount"

  );

  const rate = form.elements.namedItem(

    "rate"

  );

  const years = form.elements.namedItem(

    "years"

  );

  const kind = form.elements.namedItem(

    "kind"

  );

  if (

    !amount ||

    !rate ||

    !years ||

    !kind

  ) {

    return;

  }

  form.onsubmit = function (event) {

    event.preventDefault();

    const a = Number(amount.value);

    const r = Number(rate.value) / 100;

    const n = Number(years.value);

    const k = kind.value;

    if (

      amount.value.trim() === "" ||

      rate.value.trim() === "" ||

      years.value.trim() === "" ||

      !Number.isFinite(a) ||

      !Number.isFinite(r) ||

      !Number.isFinite(n) ||

      a < 0 ||

      r < 0 ||

      n <= 0

    ) {

      result.textContent = translate(

        "calculator.invalidInput",

        "Please enter valid values."

      );

      return;

    }

    let value;

    switch (k) {

      case "simple":

        value = a * r * n;

        break;

      case "compound":

        value = a *

          (Math.pow(1 + r,n) - 1);

        break;

      case "emi":

        const monthlyRate = r / 12;

        const months = n * 12;

        value = monthlyRate === 0

          ? a / months

          : a * monthlyRate /

            (1 - Math.pow(

              1 + monthlyRate,

              -months

            ));

        break;

      case "percentage":

        value = a * r;

        break;

      default:

        value = NaN;

    }

    if (!Number.isFinite(value)) {

      result.textContent = translate(

        "calculator.invalidInput",

        "Please enter valid values."

      );

      return;

    }

    const engine = window.MeraHisabLanguage;

    result.textContent = engine

      ? engine.formatCurrency(value)

      : new Intl.NumberFormat(

          "en-IN",

          {

            style: "currency",

            currency: "INR"

          }

        ).format(value);

  };

}

/* ==========================================
   PUBLIC WEBSITE API
========================================== */

window.MeraHisabUpgrade = Object.freeze({

  version: CONFIG.version,

  setTheme: setTheme,

  getTheme: function () {

    return currentTheme;

  },

  getResolvedTheme: getResolvedTheme,

  loadLanguageSystem: loadLanguageSystem,

  getStatus: function () {

    return {

      version: CONFIG.version,

      initialized: initialized,

      theme: currentTheme,

      resolvedTheme: getResolvedTheme(),

      languageStatus: languageStatus,

      language:

        window.MeraHisabLanguage

          ? window.MeraHisabLanguage.getLanguage()

          : "en",

      secureContext:

        window.isSecureContext === true,

      browserOnline:

        navigator.onLine

    };

  }

});

/* ==========================================
   WEBSITE INITIALIZATION
========================================== */

function initialize() {

  if (initialized) {

    return;

  }

  initialized = true;

  updateCopyrightYear();

  initializeThemeControls();

  initializeLegacyCalculator();

  loadLanguageSystem();

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
   END OF MERAHISAB SHARED WEBSITE ENGINE
========================================== */
