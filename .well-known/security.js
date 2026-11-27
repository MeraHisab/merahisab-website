
/* ==================================================
   MERAHISAB ADVANCED WEBSITE SECURITY MODULE
   Official Website: https://merahisab.store/
   Version: 1.0.0
   ================================================== */

(function () {

    "use strict";

    if (window.MeraHisabSecurity) {
        return;
    }

    // ==================================================
    // 01. SECURITY CONFIGURATION
    // ==================================================

    const CONFIG = Object.freeze({

        version: "1.0.0",

        officialOrigin: "https://merahisab.store",

        cachePrefix: "merahisab-pwa-",

        maxTextLength: 10000,

        maxURLLength: 4096,

        maxHashFileSize: 100 * 1024 * 1024,

        observerDelay: 100

    });

    const state = {

        initialized: false,

        observer: null,

        timer: null,

        pendingNodes: new Set()

    };

    // ==================================================
    // 02. SECURE CONTEXT VERIFICATION
    // ==================================================

    function isHTTPS() {

        return window.location.protocol === "https:";

    }

    function isSecureContext() {

        return window.isSecureContext === true;

    }

    function isOfficialOrigin() {

        return window.location.origin ===
            CONFIG.officialOrigin;

    }

    // ==================================================
    // 03. SAFE TEXT HANDLING
    // ==================================================

    function normalizeText(value, maxLength) {

        const limit = Number.isInteger(maxLength)
            ? Math.max(
                0,
                Math.min(maxLength, CONFIG.maxTextLength)
            )
            : CONFIG.maxTextLength;

        return String(value ?? "")
            .replace(/\u0000/g, "")
            .slice(0, limit);

    }

    function setSafeText(element, value) {

        if (!(element instanceof HTMLElement)) {

            return false;

        }

        if (element.matches(
            "script, style, iframe, object, embed"
        )) {

            return false;

        }

        element.textContent = normalizeText(value);

        return true;

    }

    function escapeHTML(value) {

        return normalizeText(value)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#39;");

    }

    // ==================================================
    // 04. URL VALIDATION
    // ==================================================

    function parseURL(value) {

        if (typeof value !== "string") {

            return null;

        }

        if (
            !value.trim() ||
            value.length > CONFIG.maxURLLength ||
            /[\u0000-\u001F\u007F]/.test(value)
        ) {

            return null;

        }

        try {

            const url = new URL(
                value,
                window.location.href
            );

            if (url.username || url.password) {

                return null;

            }

            return url;

        } catch {

            return null;

        }

    }

    function isSafeURL(value, options = {}) {

        const url = parseURL(value);

        if (!url) {

            return false;

        }

        if (url.protocol === "https:") {

            if (options.sameOrigin === true) {

                return url.origin ===
                    window.location.origin;

            }

            return true;

        }

        if (options.sameOrigin === true) {

            return false;

        }

        if (
            options.allowMail === true &&
            url.protocol === "mailto:"
        ) {

            return true;

        }

        if (
            options.allowTelephone === true &&
            url.protocol === "tel:"
        ) {

            return true;

        }

        return false;

    }

    function isExternalURL(value) {

        const url = parseURL(value);

        return Boolean(

            url &&

            url.protocol === "https:" &&

            url.origin !== window.location.origin

        );

    }

    function setSafeLink(element, value, options = {}) {

        if (!(element instanceof HTMLAnchorElement)) {

            return false;

        }

        if (!isSafeURL(value, options)) {

            element.removeAttribute("href");

            return false;

        }

        element.setAttribute("href", value);

        protectLink(element);

        return true;

    }

    // ==================================================
    // 05. EXTERNAL LINK PROTECTION
    // ==================================================

    function protectLink(link) {

        if (!(link instanceof HTMLAnchorElement)) {

            return false;

        }

        const href = link.getAttribute("href");

        if (!href) {

            return false;

        }

        if (
            !isSafeURL(href, {
                allowMail: true,
                allowTelephone: true
            })
        ) {

            link.removeAttribute("href");

            link.setAttribute(
                "data-mh-security-blocked",
                "true"
            );

            return false;

        }

        link.removeAttribute(
            "data-mh-security-blocked"
        );

        const target = (
            link.getAttribute("target") || ""
        ).toLowerCase();

        if (
            target &&
            !["_self", "_parent", "_top"].includes(target)
        ) {

            const rel = new Set(

                (link.getAttribute("rel") || "")

                    .split(/\s+/)

                    .filter(Boolean)

                    .map(value => value.toLowerCase())

            );

            rel.delete("opener");

            rel.add("noopener");

            rel.add("noreferrer");

            const newRel = Array.from(rel).join(" ");

            if (link.getAttribute("rel") !== newRel) {

                link.setAttribute("rel", newRel);

            }

        }

        return true;

    }

    function protectLinks(root = document) {

        if (!root || !root.querySelectorAll) {

            return;

        }

        if (
            root instanceof HTMLAnchorElement &&
            root.hasAttribute("href")
        ) {

            protectLink(root);

        }

        root.querySelectorAll("a[href]").forEach(

            protectLink

        );

    }

    // ==================================================
    // 06. DYNAMIC LINK PROTECTION
    // ==================================================

    function flushPendingNodes() {

        state.timer = null;

        const nodes = Array.from(state.pendingNodes);

        state.pendingNodes.clear();

        nodes.forEach(node => {

            if (node.isConnected) {

                protectLinks(node);

            }

        });

    }

    function queueNode(node) {

        if (!(node instanceof Element)) {

            return;

        }

        state.pendingNodes.add(node);

        if (state.timer === null) {

            state.timer = window.setTimeout(

                flushPendingNodes,

                CONFIG.observerDelay

            );

        }

    }

    function startObserver() {

        if (
            state.observer ||
            !document.documentElement ||
            typeof MutationObserver === "undefined"
        ) {

            return;

        }

        state.observer = new MutationObserver(records => {

            records.forEach(record => {

                if (record.type === "attributes") {

                    if (
                        record.target instanceof
                        HTMLAnchorElement
                    ) {

                        queueNode(record.target);

                    }

                    return;

                }

                record.addedNodes.forEach(queueNode);

            });

        });

        state.observer.observe(

            document.documentElement,

            {

                childList: true,

                subtree: true,

                attributes: true,

                attributeFilter: [
                    "href",
                    "target",
                    "rel"
                ]

            }

        );

    }

    // ==================================================
    // 07. STORAGE AVAILABILITY DIAGNOSTICS
    // ==================================================

    function checkStorage(type) {

        if (
            type !== "localStorage" &&
            type !== "sessionStorage"
        ) {

            return false;

        }

        try {

            const storage = window[type];

            const key = "__mh_security_test_" +

                Date.now() + "_" +

                Math.random().toString(36).slice(2);

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

    // ==================================================
    // 08. BROWSER SECURITY CAPABILITIES
    // ==================================================

    function getBrowserCapabilities() {

        return {

            https: isHTTPS(),

            secureContext: isSecureContext(),

            officialOrigin: isOfficialOrigin(),

            webCrypto: Boolean(
                window.crypto &&
                window.crypto.subtle
            ),

            secureRandom: Boolean(
                window.crypto &&
                typeof window.crypto.getRandomValues
                    === "function"
            ),

            localStorage: checkStorage("localStorage"),

            sessionStorage: checkStorage("sessionStorage"),

            indexedDB: "indexedDB" in window,

            serviceWorker: "serviceWorker" in navigator,

            cacheStorage: "caches" in window,

            clipboard: Boolean(navigator.clipboard),

            online: navigator.onLine,

            cookiesEnabled: navigator.cookieEnabled

        };

    }

    // ==================================================
    // 09. SERVICE WORKER DIAGNOSTICS
    // ==================================================

    async function getServiceWorkerStatus() {

        const result = {

            supported: "serviceWorker" in navigator,

            registered: false,

            controlling: false,

            active: false,

            waiting: false,

            installing: false,

            error: false

        };

        if (!result.supported) {

            return result;

        }

        try {

            const registration =

                await navigator.serviceWorker

                    .getRegistration();

            result.registered = Boolean(registration);

            result.controlling = Boolean(

                navigator.serviceWorker.controller

            );

            if (registration) {

                result.active = Boolean(
                    registration.active
                );

                result.waiting = Boolean(
                    registration.waiting
                );

                result.installing = Boolean(
                    registration.installing
                );

            }

        } catch {

            result.error = true;

        }

        return result;

    }

    // ==================================================
    // 10. WEBSITE CACHE DIAGNOSTICS
    // ==================================================

    async function getCacheStatus() {

        const result = {

            supported: "caches" in window,

            cacheCount: 0,

            totalEntries: 0,

            caches: [],

            error: false

        };

        if (!result.supported) {

            return result;

        }

        try {

            const names = await window.caches.keys();

            const approvedNames = names.filter(name =>

                name.startsWith(CONFIG.cachePrefix)

            );

            result.cacheCount = approvedNames.length;

            for (const name of approvedNames) {

                const cache = await window.caches.open(name);

                const entries = await cache.keys();

                result.totalEntries += entries.length;

                result.caches.push({

                    name: name,

                    entries: entries.length

                });

            }

        } catch {

            result.error = true;

        }

        return result;

    }

    // ==================================================
    // 11. STORAGE CAPACITY DIAGNOSTICS
    // ==================================================

    async function getStorageStatus() {

        const result = {

            supported: Boolean(navigator.storage),

            usage: null,

            quota: null,

            persistent: null,

            error: false

        };

        if (!result.supported) {

            return result;

        }

        try {

            if (
                typeof navigator.storage.estimate
                    === "function"
            ) {

                const estimate =

                    await navigator.storage.estimate();

                result.usage = estimate.usage ?? null;

                result.quota = estimate.quota ?? null;

            }

            if (
                typeof navigator.storage.persisted
                    === "function"
            ) {

                result.persistent =

                    await navigator.storage.persisted();

            }

        } catch {

            result.error = true;

        }

        return result;

    }

    // ==================================================
    // 12. SHA-256 CHECKSUM UTILITIES
    // ==================================================

    function isValidSHA256(value) {

        return (

            typeof value === "string" &&

            /^[a-fA-F0-9]{64}$/.test(value.trim())

        );

    }

    function bufferToHex(buffer) {

        return Array.from(new Uint8Array(buffer))

            .map(byte =>

                byte.toString(16).padStart(2, "0")

            )

            .join("");

    }

    async function calculateSHA256(data) {

        if (
            !isSecureContext() ||
            !window.crypto ||
            !window.crypto.subtle
        ) {

            throw new Error(
                "Secure Web Crypto API unavailable."
            );

        }

        let buffer;

        if (data instanceof Blob) {

            if (
                data.size === 0 ||
                data.size > CONFIG.maxHashFileSize
            ) {

                throw new Error(
                    "Invalid file size."
                );

            }

            buffer = await data.arrayBuffer();

        } else if (typeof data === "string") {

            if (data.length > CONFIG.maxTextLength) {

                throw new Error(
                    "Text exceeds allowed length."
                );

            }

            buffer = new TextEncoder().encode(data);

        } else if (data instanceof ArrayBuffer) {

            if (
                data.byteLength >
                CONFIG.maxHashFileSize
            ) {

                throw new Error(
                    "Data exceeds allowed size."
                );

            }

            buffer = data;

        } else {

            throw new TypeError(
                "Unsupported input type."
            );

        }

        const digest = await window.crypto.subtle.digest(

            "SHA-256",

            buffer

        );

        return bufferToHex(digest);

    }

    function compareSHA256(first, second) {

        if (
            !isValidSHA256(first) ||
            !isValidSHA256(second)
        ) {

            return false;

        }

        return first.trim().toLowerCase() ===

            second.trim().toLowerCase();

    }

    async function verifyFile(file, expectedHash) {

        if (!(file instanceof Blob)) {

            throw new TypeError("Invalid file.");

        }

        if (!isValidSHA256(expectedHash)) {

            throw new Error(
                "Invalid expected SHA-256 checksum."
            );

        }

        const actualHash = await calculateSHA256(file);

        return {

            algorithm: "SHA-256",

            fileSize: file.size,

            expectedHash: expectedHash.trim().toLowerCase(),

            actualHash: actualHash,

            matches: compareSHA256(

                actualHash,

                expectedHash

            )

        };

    }

    // ==================================================
    // 13. SECURE RANDOM IDENTIFIER
    // ==================================================

    function createSecureID() {

        if (!window.crypto) {

            throw new Error(
                "Secure random generator unavailable."
            );

        }

        if (
            typeof window.crypto.randomUUID === "function"
        ) {

            return window.crypto.randomUUID();

        }

        if (
            typeof window.crypto.getRandomValues
                !== "function"
        ) {

            throw new Error(
                "Secure random generator unavailable."
            );

        }

        const bytes = new Uint8Array(16);

        window.crypto.getRandomValues(bytes);

        return Array.from(bytes)

            .map(byte =>

                byte.toString(16).padStart(2, "0")

            )

            .join("");

    }

    // ==================================================
    // 14. SENSITIVE INFORMATION DETECTION
    // ==================================================

    function detectSensitiveInformation(value) {

        const text = normalizeText(value);

        const patterns = [

            {

                type: "password",

                regex: /\b(?:password|passwd|pwd)\s*[:=]\s*\S+/i

            },

            {

                type: "otp",

                regex: /\bOTP\s*[:=]\s*\d{4,8}\b/i

            },

            {

                type: "pin",

                regex: /\bPIN\s*[:=]\s*\d{4,8}\b/i

            },

            {

                type: "recovery-key",

                regex: /\brecovery[\s_-]*key\s*[:=]\s*\S+/i

            },

            {

                type: "access-token",

                regex: /\b(?:access|auth|api)[\s_-]*(?:token|key)\s*[:=]\s*\S+/i

            },

            {

                type: "private-key",

                regex: /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/

            },

            {

                type: "authorization",

                regex: /\bBearer\s+[A-Za-z0-9._~-]+/i

            }

        ];

        const detected = patterns

            .filter(item => item.regex.test(text))

            .map(item => item.type);

        return {

            detected: detected.length > 0,

            categories: detected

        };

    }

    // ==================================================
    // 15. SECURITY DIAGNOSTICS
    // ==================================================

    async function runDiagnostics() {

        const [

            serviceWorker,

            cache,

            storage

        ] = await Promise.all([

            getServiceWorkerStatus(),

            getCacheStatus(),

            getStorageStatus()

        ]);

        const browser = getBrowserCapabilities();

        const warnings = [];

        if (!browser.https) {

            warnings.push("HTTPS_NOT_ACTIVE");

        }

        if (!browser.secureContext) {

            warnings.push("INSECURE_CONTEXT");

        }

        if (!browser.officialOrigin) {

            warnings.push("UNVERIFIED_ORIGIN");

        }

        if (!browser.webCrypto) {

            warnings.push("WEB_CRYPTO_UNAVAILABLE");

        }

        if (!browser.localStorage) {

            warnings.push("LOCAL_STORAGE_UNAVAILABLE");

        }

        if (!browser.online) {

            warnings.push("DEVICE_OFFLINE");

        }

        if (serviceWorker.error) {

            warnings.push("SERVICE_WORKER_CHECK_FAILED");

        }

        if (cache.error) {

            warnings.push("CACHE_CHECK_FAILED");

        }

        if (storage.error) {

            warnings.push("STORAGE_CHECK_FAILED");

        }

        return {

            version: CONFIG.version,

            checkedAt: new Date().toISOString(),

            browser: browser,

            serviceWorker: serviceWorker,

            cache: cache,

            storage: storage,

            warnings: warnings,

            scope: "CLIENT_SIDE_DIAGNOSTICS_ONLY"

        };

    }

    // ==================================================
    // 16. SECURITY STATUS
    // ==================================================

    function getStatus() {

        return {

            version: CONFIG.version,

            initialized: state.initialized,

            https: isHTTPS(),

            secureContext: isSecureContext(),

            officialOrigin: isOfficialOrigin(),

            linkProtectionActive: Boolean(

                state.observer

            )

        };

    }

    // ==================================================
    // 17. INITIALIZATION
    // ==================================================

    function initialize() {

        if (state.initialized) {

            return true;

        }

        protectLinks(document);

        startObserver();

        state.initialized = true;

        window.dispatchEvent(

            new CustomEvent(

                "merahisab:securityready",

                {

                    detail: getStatus()

                }

            )

        );

        return true;

    }

    // ==================================================
    // 18. PUBLIC SECURITY API
    // ==================================================

    window.MeraHisabSecurity = Object.freeze({

        version: CONFIG.version,

        initialize: initialize,

        getStatus: getStatus,

        isHTTPS: isHTTPS,

        isSecureContext: isSecureContext,

        isOfficialOrigin: isOfficialOrigin,

        normalizeText: normalizeText,

        setSafeText: setSafeText,

        escapeHTML: escapeHTML,

        isSafeURL: isSafeURL,

        isExternalURL: isExternalURL,

        setSafeLink: setSafeLink,

        protectLinks: protectLinks,

        getBrowserCapabilities: getBrowserCapabilities,

        getServiceWorkerStatus: getServiceWorkerStatus,

        getCacheStatus: getCacheStatus,

        getStorageStatus: getStorageStatus,

        isValidSHA256: isValidSHA256,

        calculateSHA256: calculateSHA256,

        compareSHA256: compareSHA256,

        verifyFile: verifyFile,

        createSecureID: createSecureID,

        detectSensitiveInformation:

            detectSensitiveInformation,

        runDiagnostics: runDiagnostics

    });

    // ==================================================
    // 19. AUTOMATIC STARTUP
    // ==================================================

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

/* ==================================================
   END OF MERAHISAB SECURITY MODULE
   ================================================== */
