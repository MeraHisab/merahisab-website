/* MeraHisab shared website engine — version 3.0.0
 * Save as /upgrade.js beside index.html.
 * Official website: https://merahisab.store/
 */
(function () {
  "use strict";
  if (window.MeraHisabUpgrade) return;

  const CONFIG = Object.freeze({
    version: "3.0.0", themeKey: "mh-theme", defaultTheme: "dark",
    assetTimeout: 15000, retryDelay: 5000
  });

  const root = document.documentElement;
  const modes = ["dark", "light", "system"];
  const icons = { dark: "🌙", light: "☀️", system: "◐" };
  const assets = new Map();

  const systems = {
    language: {
      status: "pending",
      promise: null,
      error: null,
      attempts: 0
    },
    security: {
      status: "pending",
      promise: null,
      error: null,
      attempts: 0
    }
  };

  const frame = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : callback => setTimeout(callback, 16);

  let initialized = false;
  let layoutFrame = null;
  let headerOffset = 20;
  let header = null;
  let headerObserver = null;
  let retryTimer = null;
  let languageStylesReady = false;
  let languageScriptsReady = false;
  let lastAppearance = "";
  let lastRetry = 0;
  let legacyRender = null;

  let initialRepairAllowed = Boolean(window.location.hash);
  const initialHash = window.location.hash;
  const repairDeadline = Date.now() + 5000;

  let systemQuery = null;

  try {
    systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
  } catch {}

  function readTheme() {
    try {
      return window.localStorage.getItem(CONFIG.themeKey);
    } catch {
      return undefined;
    }
  }

  function normalizeTheme(value) {
    return modes.includes(value) ? value : CONFIG.defaultTheme;
  }

  let currentTheme = normalizeTheme(readTheme());

  function language() {
    const engine = window.MeraHisabLanguage;

    if (engine && typeof engine.getLanguage === "function") {
      return engine.getLanguage();
    }

    return root.dataset.language === "hi" ||
      /^hi(?:-|$)/i.test(root.lang)
      ? "hi"
      : "en";
  }

  function translate(key, english, hindi = english) {
    const fallback = language() === "hi" ? hindi : english;
    const engine = window.MeraHisabLanguage;

    return engine && typeof engine.t === "function"
      ? engine.t(key, fallback)
      : fallback;
  }

  function getResolvedTheme() {
    if (currentTheme !== "system") return currentTheme;

    return systemQuery
      ? (systemQuery.matches ? "dark" : "light")
      : CONFIG.defaultTheme;
  }

  function themeLabel(mode) {
    const labels = {
      dark: ["feature.darkMode", "Dark Mode", "डार्क मोड"],
      light: ["feature.lightMode", "Light Mode", "लाइट मोड"],
      system: ["feature.systemTheme", "System Theme", "सिस्टम थीम"]
    };

    return translate(...labels[mode]);
  }

  function setText(element, value) {
    if (element && element.textContent !== value) {
      element.textContent = value;
    }
  }

  function updateThemeControls() {
    const button = document.getElementById("theme");
    const next = modes[
      (modes.indexOf(currentTheme) + 1) % modes.length
    ];

    if (button) {
      const label = themeLabel(currentTheme);

      const action = language() === "hi"
        ? `थीम: ${label}। ${themeLabel(next)} पर जाएँ।`
        : `Theme: ${label}. Switch to ${themeLabel(next)}.`;

      button.setAttribute("aria-label", action);
      button.setAttribute("title", action);
      button.setAttribute("data-no-translate", "true");
      button.dataset.themeMode = currentTheme;

      if (button.tagName === "BUTTON") {
        button.type = "button";
      }

      const labelNode = button.querySelector("[data-theme-label]");
      const iconNode = button.querySelector("[data-theme-icon]");

      if (labelNode) {
        setText(labelNode, label);
      } else if (!button.children.length) {
        setText(button, icons[currentTheme] + " " + label);
      }

      if (iconNode) {
        if (
          !iconNode.children.length &&
          iconNode.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          setText(iconNode, icons[currentTheme]);
        }

        iconNode.setAttribute("aria-hidden", "true");
      }
    }

    document.querySelectorAll(
      "select[data-theme-select]"
    ).forEach(select => {
      select.value = currentTheme;
    });

    scheduleLayout();
  }

  function applyTheme(notify = true) {
    const resolved = getResolvedTheme();
    const appearance = currentTheme + ":" + resolved;
    const changed = appearance !== lastAppearance;

    lastAppearance = appearance;

    root.dataset.theme = resolved;
    root.dataset.themeMode = currentTheme;
    root.style.colorScheme = resolved;

    if (
      document.body &&
      document.body.hasAttribute("data-theme")
    ) {
      document.body.dataset.theme = resolved;
    }

    document.querySelectorAll(
      'meta[name="theme-color"]'
    ).forEach(meta => {
      meta.setAttribute(
        "content",
        resolved === "dark" ? "#080f20" : "#faf6ed"
      );
    });

    updateThemeControls();

    if (notify && changed) {
      window.dispatchEvent(
        new CustomEvent("merahisab:themechange", {
          detail: {
            mode: currentTheme,
            resolved
          }
        })
      );
    }
  }

  function setTheme(value, persist = true) {
    currentTheme = normalizeTheme(value);

    if (persist) {
      try {
        window.localStorage.setItem(
          CONFIG.themeKey,
          currentTheme
        );
      } catch {}
    }

    applyTheme();
    return currentTheme;
  }

  // Match the shared CSS to the real header,
  // including wrapped Hindi navigation.
  function measureHeader() {
    let offset = 20;

    if (header && header.isConnected) {
      const style = window.getComputedStyle(header);
      const height = header.getBoundingClientRect().height;
      const top = Number.parseFloat(style.top);

      if (
        ["sticky", "fixed"].includes(style.position) &&
        Number.isFinite(top) &&
        height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      ) {
        offset = Math.ceil(
          height + Math.max(0, top) + 16
        );
      }
    }

    headerOffset = offset;

    const value = offset + "px";

    if (
      root.style.getPropertyValue("--mh-scroll-offset") !== value
    ) {
      root.style.setProperty("--mh-scroll-offset", value);
    }

    return offset;
  }

  function scheduleLayout() {
    if (!initialized || layoutFrame !== null) return;

    layoutFrame = frame(() => {
      layoutFrame = null;
      measureHeader();
    });
  }

  function cancelInitialRepair() {
    initialRepairAllowed = false;
  }

  function repairInitialFragment() {
    if (!initialRepairAllowed) return;

    initialRepairAllowed = false;

    if (
      Date.now() > repairDeadline ||
      window.location.hash !== initialHash
    ) {
      return;
    }

    let target;

    try {
      target = document.getElementById(
        decodeURIComponent(initialHash.slice(1))
      );
    } catch {
      return;
    }

    const offset = measureHeader();

    if (
      !target ||
      !target.isConnected ||
      offset <= 20
    ) {
      return;
    }

    const top = target.getBoundingClientRect().top;

    // Correct only an obscured target near the top.
    // Never jump across the page.
    if (top >= -48 && top < offset - 1) {
      window.scrollBy({
        top: top - offset,
        left: 0,
        behavior: "instant"
      });
    }
  }

  function initializeLayout() {
    header = document.querySelector(
      "header.header, header.site"
    );

    measureHeader();

    if (
      header &&
      typeof ResizeObserver === "function"
    ) {
      headerObserver = new ResizeObserver(scheduleLayout);
      headerObserver.observe(header);
    } else if (
      header &&
      typeof MutationObserver === "function"
    ) {
      headerObserver = new MutationObserver(scheduleLayout);

      headerObserver.observe(header, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    window.addEventListener(
      "resize",
      scheduleLayout,
      { passive: true }
    );

    window.addEventListener(
      "load",
      scheduleLayout,
      { once: true }
    );

    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        scheduleLayout,
        { passive: true }
      );
    }

    if (document.fonts) {
      document.fonts.ready
        .then(scheduleLayout)
        .catch(() => {});

      if (document.fonts.addEventListener) {
        document.fonts.addEventListener(
          "loadingdone",
          scheduleLayout
        );
      }
    }

    try {
      const navigation =
        performance.getEntriesByType("navigation")[0];

      if (
        navigation &&
        navigation.type === "back_forward"
      ) {
        cancelInitialRepair();
      }
    } catch {}

    [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown"
    ].forEach(type => {
      window.addEventListener(
        type,
        cancelInitialRepair,
        {
          passive: true,
          once: true
        }
      );
    });

    window.addEventListener("hashchange", () => {
      cancelInitialRepair();
      scheduleLayout();
    });
  }

  // Only these fixed, same-origin assets can be inserted.
  const scriptChecks = {
    "/security.js": () => hasMethods(
      window.MeraHisabSecurity,
      ["initialize", "getStatus"]
    ),

    "/language.js": () => hasMethods(
      window.MeraHisabLanguage,
      [
        "getLanguage",
        "setLanguage",
        "t",
        "apply",
        "addTranslations"
      ]
    ),

    "/language-content.js": () => hasMethods(
      window.MeraHisabLanguageContent,
      [
        "register",
        "getKeys",
        "getTranslation"
      ]
    ),

    "/language-integration.js": () => hasMethods(
      window.MeraHisabLanguageIntegration,
      [
        "initialize",
        "refresh",
        "getStatus"
      ]
    )
  };

  function hasMethods(api, methods) {
    return Boolean(
      api &&
      methods.every(
        name => typeof api[name] === "function"
      )
    );
  }

  function loadAsset(path) {
    const stylesheet = path === "/language.css";

    if (
      !stylesheet &&
      !Object.prototype.hasOwnProperty.call(
        scriptChecks,
        path
      )
    ) {
      return Promise.reject(
        new Error("Asset path not allowed.")
      );
    }

    let url;

    try {
      url = new URL(path, window.location.origin);

      if (
        url.origin !== window.location.origin ||
        !["https:", "http:"].includes(url.protocol)
      ) {
        throw new Error(
          "Use the website through HTTP or HTTPS."
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }

    if (!stylesheet && scriptChecks[path]()) {
      return Promise.resolve(true);
    }

    if (assets.has(url.href)) {
      return assets.get(url.href);
    }

    const selector = stylesheet
      ? 'link[rel="stylesheet"]'
      : "script[src]";

    let element = Array.from(
      document.querySelectorAll(selector)
    ).find(node =>
      (stylesheet ? node.href : node.src) === url.href
    );

    if (
      stylesheet &&
      element &&
      element.sheet &&
      !element.disabled
    ) {
      return Promise.resolve(true);
    }

    if (
      element &&
      (
        element.dataset.mhAssetState === "failed" ||
        element.disabled
      )
    ) {
      element.remove();
      element = null;
    }

    const existing = Boolean(element);

    element = element || document.createElement(
      stylesheet ? "link" : "script"
    );

    const promise = new Promise((resolve, reject) => {
      let settled = false;
      let timer;

      function finish(error) {
        if (settled) return;

        settled = true;
        clearTimeout(timer);

        element.removeEventListener("load", onLoad);
        element.removeEventListener("error", onError);

        element.dataset.mhAssetState =
          error ? "failed" : "ready";

        if (error) {
          element.remove();
          reject(error);
        } else {
          resolve(true);
        }
      }

      function onLoad() {
        const ready = stylesheet
          ? Boolean(element.sheet)
          : scriptChecks[path]();

        finish(
          ready
            ? null
            : new Error(
              "Required asset API unavailable: " + path
            )
        );
      }

      function onError() {
        finish(
          new Error("Unable to load " + path)
        );
      }

      element.addEventListener("load", onLoad);
      element.addEventListener("error", onError);

      timer = setTimeout(
        () => finish(
          new Error("Loading timed out: " + path)
        ),
        CONFIG.assetTimeout
      );

      if (!existing) {
        if (stylesheet) {
          element.rel = "stylesheet";
          element.href = url.href;
        } else {
          element.src = url.href;
          element.async = false;
        }

        try {
          document.head.appendChild(element);
        } catch (error) {
          finish(error);
        }
      }
    });

    assets.set(url.href, promise);

    const removePending = () => {
      if (assets.get(url.href) === promise) {
        assets.delete(url.href);
      }
    };

    promise.then(removePending, removePending);

    return promise;
  }

  function scheduleRetry() {
    if (
      retryTimer !== null ||
      navigator.onLine === false ||
      document.visibilityState === "hidden"
    ) {
      return;
    }

    const retryable = Object.values(systems).some(
      item =>
        !item.promise &&
        item.status !== "ready" &&
        item.attempts < 2
    );

    if (!retryable) return;

    retryTimer = setTimeout(() => {
      retryTimer = null;

      if (
        navigator.onLine === false ||
        document.visibilityState === "hidden"
      ) {
        return;
      }

      if (systems.language.attempts < 2) {
        loadLanguageSystem();
      }

      if (systems.security.attempts < 2) {
        loadSecuritySystem();
      }
    }, CONFIG.retryDelay);
  }

  function runSystem(name, work) {
    const item = systems[name];

    if (item.promise) return item.promise;

    if (item.status === "ready") {
      return Promise.resolve(true);
    }

    item.status = "loading";
    item.error = null;
    item.attempts++;

    item.promise = Promise.resolve()
      .then(work)
      .then(
        ready => {
          item.status = ready ? "ready" : "partial";

          if (!ready) {
            item.error =
              "Language styles unavailable; translation scripts are ready.";
          }

          return ready;
        },
        error => {
          item.status = "unavailable";

          item.error = error instanceof Error
            ? error.message
            : "Module unavailable.";

          return false;
        }
      )
      .then(ready => {
        item.promise = null;

        scheduleLayout();
        scheduleRetry();

        return ready;
      });

    return item.promise;
  }

  function loadSecuritySystem() {
    return runSystem("security", async () => {
      await domReady;
      await loadAsset("/security.js");

      if (
        window.MeraHisabSecurity.initialize() !== true
      ) {
        throw new Error(
          "Security initialization failed."
        );
      }

      return true;
    });
  }

  function loadLanguageSystem() {
    return runSystem("language", async () => {
      await domReady;

      const styles = loadAsset("/language.css").then(
        () => {
          languageStylesReady = true;
          return true;
        },
        () => {
          languageStylesReady = false;
          return false;
        }
      );

      await loadAsset("/language.js");
      await loadAsset("/language-content.js");

      if (
        window.MeraHisabLanguageContent.register() !== true
      ) {
        throw new Error(
          "Language registration failed."
        );
      }

      await loadAsset("/language-integration.js");

      const integration =
        window.MeraHisabLanguageIntegration;

      if (
        integration.initialize() !== true ||
        integration.refresh() !== true
      ) {
        throw new Error(
          "Language integration failed."
        );
      }

      languageScriptsReady = true;
      languageStylesReady = await styles;

      updateThemeControls();

      if (legacyRender) {
        legacyRender();
      }

      if (languageStylesReady) {
        window.dispatchEvent(
          new CustomEvent(
            "merahisab:languageready"
          )
        );
      }

      return languageStylesReady;
    });
  }

  function retryPending() {
    return Promise.all([
      loadLanguageSystem(),
      loadSecuritySystem()
    ]);
  }

  function retryOnConnection() {
    if (
      navigator.onLine === false ||
      Date.now() - lastRetry < CONFIG.retryDelay
    ) {
      return;
    }

    lastRetry = Date.now();
    retryPending();
  }

  function updateCopyrightYear() {
    const year = new Intl.DateTimeFormat("en", {
      timeZone: "Asia/Kolkata",
      year: "numeric"
    }).format(new Date());

    document.querySelectorAll(
      "[data-year], #currentYear, #copyrightYear"
    ).forEach(node => setText(node, year));
  }

  // Compatibility only:
  // current tools.html owns its separate calculator engine.
  function initializeLegacyCalculator() {
    const form = document.getElementById("calc");
    const output = document.getElementById("result");

    if (!form || !output || !form.elements) return;

    const fields = [
      "amount",
      "rate",
      "years",
      "kind"
    ].map(name => form.elements.namedItem(name));

    if (fields.some(field => !field)) return;

    let result = null;
    let invalid = false;

    legacyRender = () => {
      if (invalid) {
        setText(
          output,
          translate(
            "calculator.invalidInput",
            "Please enter valid values.",
            "कृपया सही मान भरें।"
          )
        );
      } else if (result !== null) {
        setText(
          output,
          new Intl.NumberFormat(
            language() === "hi" ? "hi-IN" : "en-IN",
            {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 2
            }
          ).format(result)
        );
      }
    };

    form.addEventListener("submit", event => {
      event.preventDefault();

      const [amount, rate, years, kind] = fields;

      const a = Number(amount.value);
      const r = Number(rate.value) / 100;
      const n = Number(years.value);

      const percentage = [
        "percent",
        "percentage"
      ].includes(kind.value);

      invalid =
        !amount.value.trim() ||
        !rate.value.trim() ||
        !Number.isFinite(a) ||
        !Number.isFinite(r) ||
        a < 0 ||
        r < 0 ||
        (
          !percentage &&
          (
            !years.value.trim() ||
            !Number.isFinite(n) ||
            n <= 0
          )
        );

      result = null;

      if (!invalid) {
        switch (kind.value) {
          case "simple":
            result = a * r * n;
            break;

          case "compound":
            result = a * Math.expm1(
              n * Math.log1p(r)
            );
            break;

          case "emi": {
            const monthly = r / 12;
            const months = n * 12;

            result = monthly === 0
              ? a / months
              : a * monthly /
                -Math.expm1(
                  -months * Math.log1p(monthly)
                );

            break;
          }

          case "percent":
          case "percentage":
            result = a * r;
            break;

          default:
            invalid = true;
        }

        if (!Number.isFinite(result)) {
          invalid = true;
        }
      }

      legacyRender();
    });

    const clearResult = () => {
      result = null;
      invalid = false;
      setText(output, "");
    };

    form.addEventListener("input", clearResult);
    form.addEventListener("change", clearResult);
    form.addEventListener("reset", clearResult);
  }

  const domReady = document.readyState === "loading"
    ? new Promise(resolve => {
      document.addEventListener(
        "DOMContentLoaded",
        resolve,
        { once: true }
      );
    })
    : Promise.resolve();

  function initialize() {
    if (initialized) return true;
    if (!document.body) return false;

    initialized = true;

    updateCopyrightYear();
    initializeLayout();
    applyTheme(false);
    initializeLegacyCalculator();

    document.addEventListener("click", event => {
      if (event.defaultPrevented) return;

      const button = event.target instanceof Element
        ? event.target.closest("#theme")
        : null;

      if (
        !button ||
        button.disabled ||
        button.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      event.preventDefault();

      setTheme(
        modes[
          (modes.indexOf(currentTheme) + 1) %
          modes.length
        ]
      );
    });

    document.addEventListener("change", event => {
      if (
        event.target instanceof Element &&
        event.target.matches(
          "select[data-theme-select]"
        )
      ) {
        setTheme(event.target.value);
      }
    });

    const onSystemChange = () => {
      if (currentTheme === "system") {
        applyTheme();
      }
    };

    if (
      systemQuery &&
      systemQuery.addEventListener
    ) {
      systemQuery.addEventListener(
        "change",
        onSystemChange
      );
    } else if (
      systemQuery &&
      systemQuery.addListener
    ) {
      systemQuery.addListener(onSystemChange);
    }

    window.addEventListener("storage", event => {
      if (
        event.key !== CONFIG.themeKey &&
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

      setTheme(
        event.key === null
          ? CONFIG.defaultTheme
          : event.newValue,
        false
      );
    });

    window.addEventListener(
      "merahisab:languagechange",
      () => {
        updateThemeControls();

        if (legacyRender) {
          legacyRender();
        }
      }
    );

    window.addEventListener(
      "merahisab:languagecontentready",
      scheduleLayout
    );

    window.addEventListener(
      "merahisab:languageready",
      scheduleLayout
    );

    window.addEventListener(
      "online",
      retryOnConnection
    );

    window.addEventListener("pageshow", event => {
      if (event.persisted) {
        cancelInitialRepair();
      }

      const saved = readTheme();

      if (saved !== undefined) {
        setTheme(saved, false);
      }

      updateCopyrightYear();
      scheduleLayout();
    });

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible") {
          updateCopyrightYear();
          scheduleLayout();
          scheduleRetry();
        }
      }
    );

    try {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          retryOnConnection
        );
      }
    } catch {}

    const languageWork = loadLanguageSystem();

    loadSecuritySystem();

    const fonts = document.fonts
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();

    const pageLoaded = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise(resolve => {
        window.addEventListener(
          "load",
          resolve,
          { once: true }
        );
      });

    Promise.all([
      languageWork,
      fonts,
      pageLoaded
    ]).then(() => frame(repairInitialFragment));

    return true;
  }

  window.MeraHisabUpgrade = Object.freeze({
    version: CONFIG.version,

    initialize,

    setTheme,

    getTheme: () => currentTheme,

    getResolvedTheme,

    loadLanguageSystem,

    loadSecuritySystem,

    retryPending,

    refreshLayout: scheduleLayout,

    getStatus: () => ({
      version: CONFIG.version,
      initialized,
      theme: currentTheme,
      resolvedTheme: getResolvedTheme(),

      languageStatus: systems.language.status,
      securityStatus: systems.security.status,

      languageStylesReady,
      languageScriptsReady,

      language: language(),
      headerOffset,

      secureContext: window.isSecureContext === true,
      browserOnline: navigator.onLine,

      errors: {
        language: systems.language.error,
        security: systems.security.error
      }
    })
  });

  applyTheme(false);
  domReady.then(initialize);
})();
