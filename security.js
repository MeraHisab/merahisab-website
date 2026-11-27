/* MeraHisab website helpers — version 2.0.0
 * Save as /security.js beside index.html.
 * Official website: https://merahisab.store/
 * Client-side helpers only: not an HTML sanitizer, server audit or APK scanner.
 */
(function () {
  "use strict";
  if (window.MeraHisabSecurity) return;

  const CONFIG = Object.freeze({
    version: "2.0.0",
    officialOrigin: "https://merahisab.store",
    cachePrefix: "merahisab-pwa-",
    maxTextLength: 10000,
    maxURLLength: 4096,
    maxHashFileSize: 100 * 1024 * 1024
  });
  const state = { initialized: false, observer: null, activationGuard: false };
  const linkSelector = "a[href], area[href]";
  const isHTTPS = () => window.location.protocol === "https:";
  const isSecureContext = () => window.isSecureContext === true;
  const isOfficialOrigin = () => window.location.origin === CONFIG.officialOrigin;

  // Text helpers. escapeHTML is for HTML text, not JavaScript/CSS/URL contexts.
  function normalizeText(value, maxLength) {
    const limit = Number.isInteger(maxLength)
      ? Math.max(0, Math.min(maxLength, CONFIG.maxTextLength))
      : CONFIG.maxTextLength;
    return String(value ?? "").replace(/\u0000/g, "").slice(0, limit);
  }

  function setSafeText(element, value) {
    if (!(element instanceof HTMLElement) ||
        element.matches("script, style, iframe, object, embed")) return false;
    element.textContent = normalizeText(value);
    return true;
  }

  function escapeHTML(value) {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return normalizeText(value).replace(/[&<>"']/g, character => entities[character]);
  }

  function parseURL(value) {
    if (typeof value !== "string" || !value.trim() ||
        value.length > CONFIG.maxURLLength || /[\u0000-\u001F\u007F]/.test(value)) return null;
    try {
      const url = new URL(value, document.baseURI || window.location.href);
      return url.username || url.password ? null : url;
    } catch {
      return null;
    }
  }

  // Validates destination syntax/origin, not the trustworthiness of its contents.
  // Blob URLs require explicit opt-in and must belong to this website's origin.
  function isSafeURL(value, options = {}) {
    const settings = options && typeof options === "object" ? options : {};
    const url = parseURL(value);
    if (!url) return false;
    const sameOrigin = url.origin === window.location.origin && url.origin !== "null";
    if (settings.sameOrigin === true && !sameOrigin) return false;
    if (url.protocol === "https:") return true;
    // Preserve local/HTTP same-origin navigation; HTTPS is enforced by hosting.
    if (url.protocol === "http:") return sameOrigin && window.location.protocol === "http:";
    if (url.protocol === "blob:") return settings.allowBlob === true && sameOrigin;
    if (url.protocol === "mailto:") return settings.allowMail === true;
    if (url.protocol === "tel:") return settings.allowTelephone === true;
    return false;
  }

  function isExternalURL(value) {
    const url = parseURL(value);
    return Boolean(url && ["https:", "http:"].includes(url.protocol) &&
      url.origin !== window.location.origin);
  }

  function isLink(element) {
    return element instanceof Element && element.matches("a, area");
  }

  function blockLink(link) {
    link.removeAttribute("href");
    link.setAttribute("data-mh-security-blocked", "true");
    return false;
  }

  function protectLink(link) {
    if (!isLink(link) || !link.hasAttribute("href")) return false;
    if (!isSafeURL(link.getAttribute("href"), {
      allowMail: true,
      allowTelephone: true,
      allowBlob: link.hasAttribute("download")
    })) return blockLink(link);

    link.removeAttribute("data-mh-security-blocked");
    const target = (link.getAttribute("target") || "").toLowerCase();
    if (target && !["_self", "_parent", "_top"].includes(target)) {
      const rel = new Set((link.getAttribute("rel") || "")
        .toLowerCase().split(/\s+/).filter(Boolean));
      rel.delete("opener");
      rel.add("noopener");
      rel.add("noreferrer");
      const value = Array.from(rel).join(" ");
      if (link.getAttribute("rel") !== value) link.setAttribute("rel", value);
    }
    return true;
  }

  // For a Blob download, set the anchor's download attribute first and pass
  // { allowBlob: true }. Normal navigation to Blob documents stays disabled.
  function setSafeLink(element, value, options = {}) {
    if (!isLink(element)) return false;
    const settings = options && typeof options === "object" ? options : {};
    const allowed = isSafeURL(value, {
      ...settings,
      allowBlob: settings.allowBlob === true && element.hasAttribute("download")
    });
    if (!allowed) return blockLink(element);
    element.setAttribute("href", value);
    return protectLink(element);
  }

  function protectLinks(root = document) {
    if (!root || typeof root.querySelectorAll !== "function") return 0;
    let count = 0;
    if (isLink(root) && root.hasAttribute("href") && protectLink(root)) count++;
    root.querySelectorAll(linkSelector).forEach(link => {
      if (protectLink(link)) count++;
    });
    return count;
  }

  // This guards link activation; it does not sanitize arbitrary DOM/HTML.
  function guardActivation(event) {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    let link = path.find(node => isLink(node) && node.hasAttribute("href"));
    if (!link && event.target instanceof Element) link = event.target.closest(linkSelector);
    if (link && !protectLink(link)) event.preventDefault();
  }

  function watchLinks() {
    if (!state.activationGuard) {
      document.addEventListener("click", guardActivation, true);
      document.addEventListener("auxclick", guardActivation, true);
      state.activationGuard = true;
    }
    if (state.observer || !document.documentElement || typeof MutationObserver === "undefined") return;
    state.observer = new MutationObserver(records => {
      const roots = new Set();
      records.forEach(record => {
        if (record.type === "attributes") {
          if (isLink(record.target)) roots.add(record.target);
        } else {
          record.addedNodes.forEach(node => {
            if (node instanceof Element) roots.add(node);
          });
        }
      });
      roots.forEach(root => {
        if (root.isConnected) protectLinks(root);
      });
    });
    state.observer.observe(document.documentElement, {
      subtree: true, childList: true, attributes: true,
      attributeFilter: ["href", "target", "rel", "download"]
    });
  }

  // Diagnostic probes run only when requested. No user records are read.
  function checkStorage(type) {
    try {
      const storage = window[type];
      const key = "__mh_probe_" + Date.now() + "_" + Math.random().toString(36).slice(2);
      try {
        storage.setItem(key, "1");
        return storage.getItem(key) === "1";
      } finally {
        storage.removeItem(key);
      }
    } catch {
      return false;
    }
  }

  function getBrowserCapabilities() {
    return {
      https: isHTTPS(), secureContext: isSecureContext(), officialOrigin: isOfficialOrigin(),
      webCrypto: Boolean(window.crypto && window.crypto.subtle),
      secureRandom: Boolean(window.crypto && typeof window.crypto.getRandomValues === "function"),
      localStorage: checkStorage("localStorage"), sessionStorage: checkStorage("sessionStorage"),
      indexedDB: "indexedDB" in window, serviceWorker: "serviceWorker" in navigator,
      cacheStorage: "caches" in window, clipboard: Boolean(navigator.clipboard),
      online: navigator.onLine, cookiesEnabled: navigator.cookieEnabled
    };
  }

  async function getServiceWorkerStatus() {
    const result = {
      supported: "serviceWorker" in navigator, registered: false, controlling: false,
      active: false, waiting: false, installing: false, error: false
    };
    if (!result.supported) return result;
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      result.registered = Boolean(registration);
      result.controlling = Boolean(navigator.serviceWorker.controller);
      if (registration) {
        result.active = Boolean(registration.active);
        result.waiting = Boolean(registration.waiting);
        result.installing = Boolean(registration.installing);
      }
    } catch { result.error = true; }
    return result;
  }

  async function getCacheStatus() {
    const result = { supported: "caches" in window, cacheCount: 0, totalEntries: 0, caches: [], error: false };
    if (!result.supported) return result;
    try {
      const names = (await window.caches.keys()).filter(name => name.startsWith(CONFIG.cachePrefix));
      for (const name of names) {
        const cache = await window.caches.open(name);
        const entries = (await cache.keys()).length;
        result.caches.push({ name, entries });
        result.totalEntries += entries;
      }
      result.cacheCount = result.caches.length;
    } catch { result.error = true; }
    return result;
  }

  async function getStorageStatus() {
    const result = { supported: Boolean(navigator.storage), usage: null, quota: null, persistent: null, error: false };
    if (!result.supported) return result;
    try {
      if (typeof navigator.storage.estimate === "function") {
        const estimate = await navigator.storage.estimate();
        result.usage = estimate.usage ?? null;
        result.quota = estimate.quota ?? null;
      }
      if (typeof navigator.storage.persisted === "function") {
        result.persistent = await navigator.storage.persisted();
      }
    } catch { result.error = true; }
    return result;
  }

  // SHA-256 compares bytes against a trusted reference. It is not a virus scan.
  function isValidSHA256(value) {
    return typeof value === "string" && /^[a-fA-F0-9]{64}$/.test(value.trim());
  }

  async function calculateSHA256(data) {
    if (!isSecureContext() || !window.crypto || !window.crypto.subtle) {
      throw new Error("Secure Web Crypto API unavailable.");
    }
    let bytes;
    if (data instanceof Blob) {
      if (data.size > CONFIG.maxHashFileSize) throw new RangeError("File exceeds 100 MiB.");
      bytes = await data.arrayBuffer();
    } else if (typeof data === "string") {
      if (data.length > CONFIG.maxTextLength) throw new RangeError("Text exceeds allowed length.");
      bytes = new TextEncoder().encode(data);
    } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      bytes = data;
    } else {
      throw new TypeError("Use a Blob, string, ArrayBuffer or typed array.");
    }
    if (bytes.byteLength > CONFIG.maxHashFileSize) throw new RangeError("Data exceeds 100 MiB.");
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function compareSHA256(first, second) {
    return isValidSHA256(first) && isValidSHA256(second) &&
      first.trim().toLowerCase() === second.trim().toLowerCase();
  }

  async function verifyFile(file, expectedHash) {
    if (!(file instanceof Blob)) throw new TypeError("Invalid file.");
    if (!isValidSHA256(expectedHash)) throw new TypeError("Invalid expected SHA-256 checksum.");
    const actualHash = await calculateSHA256(file);
    return {
      algorithm: "SHA-256", fileSize: file.size,
      expectedHash: expectedHash.trim().toLowerCase(), actualHash,
      matches: compareSHA256(actualHash, expectedHash)
    };
  }

  function createSecureID() {
    const crypto = window.crypto;
    if (!crypto || typeof crypto.getRandomValues !== "function") {
      throw new Error("Secure random generator unavailable.");
    }
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }

  // Optional hints only. Does not inspect forms, redact data or upload reports.
  function detectSensitiveInformation(value) {
    const text = normalizeText(value);
    const patterns = [
      ["password", /(?:\bpassword\b|\bpasswd\b|\bpwd\b|पासवर्ड)\s*[:=]\s*\S+/i],
      ["otp", /(?:\bOTP\b|ओटीपी)\s*[:=]\s*[0-9०-९]{4,8}(?![0-9०-९])/i],
      ["pin", /(?:\bPIN\b|पिन)\s*[:=]\s*[0-9०-९]{4,8}(?![0-9०-९])/i],
      ["recovery-key", /(?:\brecovery[\s_-]*key|रिकवरी\s*(?:की|कुंजी))\s*[:=]\s*\S+/i],
      ["access-token", /\b(?:access|auth|api)[\s_-]*(?:token|key)\s*[:=]\s*\S+/i],
      ["private-key", /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/],
      ["authorization", /\bBearer\s+[A-Za-z0-9._~+\/-]+=*/i]
    ];
    const categories = patterns.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
    return { detected: categories.length > 0, categories };
  }

  async function runDiagnostics() {
    const [serviceWorker, cache, storage] = await Promise.all([
      getServiceWorkerStatus(), getCacheStatus(), getStorageStatus()
    ]);
    const browser = getBrowserCapabilities();
    const warnings = [];
    if (!browser.https) warnings.push("HTTPS_NOT_ACTIVE");
    if (!browser.secureContext) warnings.push("INSECURE_CONTEXT");
    if (!browser.officialOrigin) warnings.push("UNVERIFIED_ORIGIN");
    if (!browser.webCrypto) warnings.push("WEB_CRYPTO_UNAVAILABLE");
    if (!browser.localStorage) warnings.push("LOCAL_STORAGE_UNAVAILABLE");
    if (!browser.online) warnings.push("DEVICE_OFFLINE");
    if (serviceWorker.error) warnings.push("SERVICE_WORKER_CHECK_FAILED");
    if (cache.error) warnings.push("CACHE_CHECK_FAILED");
    if (storage.error) warnings.push("STORAGE_CHECK_FAILED");
    return {
      version: CONFIG.version, checkedAt: new Date().toISOString(), browser,
      serviceWorker, cache, storage, warnings, scope: "CLIENT_SIDE_DIAGNOSTICS_ONLY"
    };
  }

  function getStatus() {
    return {
      version: CONFIG.version, initialized: state.initialized,
      https: isHTTPS(), secureContext: isSecureContext(), officialOrigin: isOfficialOrigin(),
      linkProtectionActive: state.activationGuard, observerActive: Boolean(state.observer)
    };
  }

  function initialize() {
    if (state.initialized) return true;
    protectLinks(document);
    watchLinks();
    state.initialized = true;
    window.dispatchEvent(new CustomEvent("merahisab:securityready", { detail: getStatus() }));
    return true;
  }

  window.MeraHisabSecurity = Object.freeze({
    version: CONFIG.version, initialize, getStatus, isHTTPS, isSecureContext, isOfficialOrigin,
    normalizeText, setSafeText, escapeHTML, isSafeURL, isExternalURL, setSafeLink, protectLinks,
    getBrowserCapabilities, getServiceWorkerStatus, getCacheStatus, getStorageStatus,
    isValidSHA256, calculateSHA256, compareSHA256, verifyFile, createSecureID,
    detectSensitiveInformation, runDiagnostics
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
