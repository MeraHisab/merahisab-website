/* ==================================================
   MERAHISAB ADVANCED SERVICE WORKER
   Official Website: https://merahisab.store/
   Service Worker Version: 1.0.0
   ================================================== */

"use strict";

// ==================================================
// 01. SERVICE WORKER CONFIGURATION
// ==================================================

const SW_VERSION = "1.0.0";

const CACHE_PREFIX = "merahisab-pwa-";

const STATIC_CACHE =
    CACHE_PREFIX + "static-" + SW_VERSION;

const PAGE_CACHE =
    CACHE_PREFIX + "pages-" + SW_VERSION;

const ACTIVE_CACHES = [
    STATIC_CACHE,
    PAGE_CACHE
];

const OFFLINE_PAGE = "/offline.html";

const MAX_PAGE_CACHE_ENTRIES = 20;

const MAX_STATIC_CACHE_ENTRIES = 60;

const MAX_RESOURCE_BYTES =
    5 * 1024 * 1024;

// ==================================================
// 02. PUBLIC WEBSITE PAGE ALLOWLIST
// ==================================================

const PUBLIC_PAGES = new Set([

    "/",

    "/index.html",

    "/merahisab.html",

    "/royal-khata.html",

    "/downloads.html",

    "/compare.html",

    "/tools.html",

    "/privacy.html",

    "/about.html",

    "/404.html",

    "/offline.html"

]);

// ==================================================
// 03. STATIC RESOURCE ALLOWLIST
// ==================================================

const STATIC_RESOURCES = new Set([

    "/upgrade.css",

    "/upgrade.js",

    "/pwa.css",

    "/pwa.js",

    "/manifest.json",

    "/favicon.ico",

    "/icons/icon-192.png",

    "/icons/icon-512.png",

    "/icons/maskable-192.png",

    "/icons/maskable-512.png",

    "/icons/shortcut-merahisab.png",

    "/icons/shortcut-royal-khata.png",

    "/icons/shortcut-tools.png",

    "/icons/shortcut-downloads.png"

]);

// ==================================================
// 04. ESSENTIAL OFFLINE RESOURCES
// ==================================================

const CORE_RESOURCES = [

    "/offline.html",

    "/upgrade.css",

    "/upgrade.js"

];

// ==================================================
// 05. OPTIONAL OFFLINE RESOURCES
// ==================================================

const OPTIONAL_RESOURCES = [

    "/",

    "/index.html",

    "/merahisab.html",

    "/royal-khata.html",

    "/downloads.html",

    "/compare.html",

    "/tools.html",

    "/privacy.html",

    "/about.html",

    "/404.html",

    "/manifest.json",

    "/pwa.css",

    "/pwa.js",

    "/icons/icon-192.png",

    "/icons/icon-512.png",

    "/icons/maskable-192.png",

    "/icons/maskable-512.png",

    "/icons/shortcut-merahisab.png",

    "/icons/shortcut-royal-khata.png",

    "/icons/shortcut-tools.png",

    "/icons/shortcut-downloads.png"

];

// ==================================================
// 06. SENSITIVE RESOURCE PROTECTION
// ==================================================

const BLOCKED_PATH_PATTERN =

    /(?:^|\/)(?:api|auth|account|accounts|login|logout|admin|private|backup|backups|recovery|uploads|support|payment|payments|session|token|tokens)(?:\/|$)/i;

const BLOCKED_FILE_PATTERN =

    /\.(?:apk|aab|zip|rar|7z|tar|gz|db|sqlite|sqlite3|csv|xlsx|pdf|key|pem|p12|pfx|bak|enc|log)$/i;

const EXCLUDED_PAGES = new Set([

    "/contact.html",

    "/download.html"

]);

// ==================================================
// 07. SAFE URL VALIDATION
// ==================================================

function isSafePublicURL(url) {

    if (
        url.origin !== self.location.origin
    ) {

        return false;

    }

    if (url.search) {

        return false;

    }

    if (
        BLOCKED_PATH_PATTERN.test(
            url.pathname
        )
    ) {

        return false;

    }

    if (
        BLOCKED_FILE_PATTERN.test(
            url.pathname
        )
    ) {

        return false;

    }

    if (
        EXCLUDED_PAGES.has(
            url.pathname
        )
    ) {

        return false;

    }

    return (

        PUBLIC_PAGES.has(url.pathname) ||

        STATIC_RESOURCES.has(url.pathname)

    );

}

// ==================================================
// 08. REQUEST CACHE ELIGIBILITY
// ==================================================

function isCacheableRequest(request) {

    if (request.method !== "GET") {

        return false;

    }

    if (
        request.headers.has(
            "Authorization"
        )
    ) {

        return false;

    }

    if (
        request.headers.has("Range")
    ) {

        return false;

    }

    if (
        request.cache === "no-store"
    ) {

        return false;

    }

    const cacheControl =

        request.headers.get(
            "Cache-Control"
        ) || "";

    if (
        /\bno-store\b/i.test(cacheControl)
    ) {

        return false;

    }

    try {

        const url = new URL(
            request.url
        );

        return isSafePublicURL(url);

    } catch (error) {

        return false;

    }

}

// ==================================================
// 09. RESPONSE VALIDATION
// ==================================================

function isCacheableResponse(
    response,
    requestURL
) {

    if (!response) {

        return false;

    }

    if (
        !response.ok ||
        response.status !== 200
    ) {

        return false;

    }

    if (
        response.type !== "basic"
    ) {

        return false;

    }

    if (response.redirected) {

        return false;

    }

    try {

        const responseURL = new URL(
            response.url
        );

        if (
            !isSafePublicURL(responseURL)
        ) {

            return false;

        }

        if (
            responseURL.href !== requestURL
        ) {

            return false;

        }

    } catch (error) {

        return false;

    }

    const cacheControl =

        response.headers.get(
            "Cache-Control"
        ) || "";

    if (
        /\b(?:no-store|private|no-cache|must-revalidate)\b/i.test(
            cacheControl
        )
    ) {

        return false;

    }

    const vary =

        response.headers.get("Vary") || "";

    if (
        /(?:^|,)\s*(?:\*|cookie|authorization)\s*(?:,|$)/i.test(
            vary
        )
    ) {

        return false;

    }

    const contentLength = Number(

        response.headers.get(
            "Content-Length"
        ) || 0

    );

    if (
        contentLength > MAX_RESOURCE_BYTES
    ) {

        return false;

    }

    return true;

}

// ==================================================
// 10. CONTENT TYPE VALIDATION
// ==================================================

function hasExpectedContentType(
    url,
    response
) {

    const contentType = (

        response.headers.get(
            "Content-Type"
        ) || ""

    ).toLowerCase();

    const path = url.pathname;

    if (PUBLIC_PAGES.has(path)) {

        return contentType.includes(
            "text/html"
        );

    }

    if (path.endsWith(".css")) {

        return contentType.includes(
            "text/css"
        );

    }

    if (path.endsWith(".js")) {

        return (

            contentType.includes(
                "javascript"
            ) ||

            contentType.includes(
                "ecmascript"
            )

        );

    }

    if (path.endsWith(".json")) {

        return (

            contentType.includes("json")

        );

    }

    if (path.endsWith(".png")) {

        return contentType.includes(
            "image/png"
        );

    }

    if (path.endsWith(".ico")) {

        return contentType.startsWith(
            "image/"
        );

    }

    return false;

}

// ==================================================
// 11. CACHE ENTRY LIMIT MANAGEMENT
// ==================================================

async function trimCache(
    cacheName,
    maximumEntries
) {

    const cache = await caches.open(
        cacheName
    );

    const keys = await cache.keys();

    let excess =

        keys.length - maximumEntries;

    if (excess <= 0) {

        return;

    }

    for (const request of keys) {

        if (excess <= 0) {

            break;

        }

        const path = new URL(
            request.url
        ).pathname;

        if (
            CORE_RESOURCES.includes(path)
        ) {

            continue;

        }

        const deleted = await cache.delete(
            request
        );

        if (deleted) {

            excess--;

        }

    }

}

// ==================================================
// 12. SAFE CACHE WRITE ENGINE
// ==================================================

async function safeCachePut(
    cacheName,
    request,
    response
) {

    try {

        if (
            !isCacheableRequest(request)
        ) {

            return false;

        }

        if (
            !isCacheableResponse(
                response,
                request.url
            )
        ) {

            return false;

        }

        const url = new URL(
            request.url
        );

        if (
            !hasExpectedContentType(
                url,
                response
            )
        ) {

            return false;

        }

        // Validate actual response size,
        // including responses without
        // Content-Length headers.

        const sizeCheck = response.clone();

        const reader =

            sizeCheck.body &&
            sizeCheck.body.getReader();

        if (!reader) {

            return false;

        }

        let totalBytes = 0;

        try {

            while (true) {

                const chunk =
                    await reader.read();

                if (chunk.done) {

                    break;

                }

                totalBytes +=
                    chunk.value.byteLength;

                if (
                    totalBytes >
                    MAX_RESOURCE_BYTES
                ) {

                    // Do not wait for the other
                    // cloned stream to finish.

                    reader.cancel().catch(
                        () => {}
                    );

                    return false;

                }

            }

        } finally {

            reader.releaseLock();

        }

        const cache = await caches.open(
            cacheName
        );

        await cache.put(
            request,
            response
        );

        await trimCache(

            cacheName,

            cacheName === PAGE_CACHE

                ? MAX_PAGE_CACHE_ENTRIES

                : MAX_STATIC_CACHE_ENTRIES

        );

        return true;

    } catch (error) {

        return false;

    }

}

// ==================================================
// 13. PUBLIC RESOURCE PRECACHING
// ==================================================

async function precacheResource(path) {

    const url = new URL(
        path,
        self.location.origin
    );

    if (!isSafePublicURL(url)) {

        return false;

    }

    const request = new Request(

        url.href,

        {

            method: "GET",

            credentials: "omit",

            cache: "reload",

            redirect: "error"

        }

    );

    const response = await fetch(
        request
    );

    const cacheName =

        PUBLIC_PAGES.has(url.pathname)

            ? PAGE_CACHE

            : STATIC_CACHE;

    return safeCachePut(

        cacheName,

        request,

        response

    );

}

// ==================================================
// 14. CORE CACHE INSTALLATION
// ==================================================

async function installCoreResources() {

    for (const path of CORE_RESOURCES) {

        const saved = await precacheResource(
            path
        );

        if (!saved) {

            throw new Error(

                "Essential resource unavailable: " +

                path

            );

        }

    }

}

// ==================================================
// 15. OPTIONAL CACHE INSTALLATION
// ==================================================

async function installOptionalResources() {

    const batchSize = 4;

    for (

        let index = 0;

        index < OPTIONAL_RESOURCES.length;

        index += batchSize

    ) {

        const batch =

            OPTIONAL_RESOURCES.slice(

                index,

                index + batchSize

            );

        await Promise.allSettled(

            batch.map(

                (path) =>
                    precacheResource(path)

            )

        );

    }

}

// ==================================================
// 16. SERVICE WORKER INSTALL EVENT
// ==================================================

self.addEventListener(

    "install",

    (event) => {

        event.waitUntil(

            (async () => {

                await installCoreResources();

                await installOptionalResources();

                // Do not automatically activate
                // updates over an existing worker.
                // Activation is controlled by
                // the website update interface.

            })()

        );

    }

);

// ==================================================
// 17. OLD CACHE CLEANUP
// ==================================================

async function cleanupOldCaches() {

    const cacheNames = await caches.keys();

    const obsoleteCaches =

        cacheNames.filter(

            (name) =>

                name.startsWith(
                    CACHE_PREFIX
                ) &&

                !ACTIVE_CACHES.includes(
                    name
                )

        );

    await Promise.all(

        obsoleteCaches.map(

            (name) => caches.delete(name)

        )

    );

}

// ==================================================
// 18. SERVICE WORKER ACTIVATE EVENT
// ==================================================

self.addEventListener(

    "activate",

    (event) => {

        event.waitUntil(

            (async () => {

                await cleanupOldCaches();

                await self.clients.claim();

            })()

        );

    }

);

// ==================================================
// 19. EMERGENCY OFFLINE RESPONSE
// ==================================================

function emergencyOfflineResponse() {

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width,initial-scale=1">
<title>MeraHisab - Offline</title>
</head>
<body style="
    background:#081321;
    color:#f5f5f7;
    font-family:Arial,sans-serif;
    padding:30px;
    text-align:center;
">
    <main>
        <h1 style="color:#d4af37">
            MeraHisab
        </h1>

        <h2>You are offline</h2>

        <p>
            This page is currently unavailable.
        </p>

        <p>
            Connect to the internet and try again.
        </p>

        <p>
            Official website: merahisab.store
        </p>

        <a href="/"
           style="color:#e5c788">
            Return to Home
        </a>
    </main>
</body>
</html>`;

    return new Response(

        html,

        {

            status: 503,

            statusText: "Service Unavailable",

            headers: {

                "Content-Type":
                    "text/html; charset=UTF-8",

                "Cache-Control":
                    "no-store",

                "X-Content-Type-Options":
                    "nosniff"

            }

        }

    );

}

// ==================================================
// 20. OFFLINE PAGE FALLBACK
// ==================================================

async function getOfflinePage() {

    try {

        const cache = await caches.open(
            PAGE_CACHE
        );

        const offline = await cache.match(
            OFFLINE_PAGE
        );

        if (offline) {

            return new Response(

                offline.body,

                {

                    status: 503,

                    statusText:
                        "Service Unavailable",

                    headers: offline.headers

                }

            );

        }

    } catch (error) {

        // Emergency fallback remains available.

    }

    return emergencyOfflineResponse();

}

// ==================================================
// 21. NETWORK-FIRST PAGE STRATEGY
// ==================================================

async function networkFirstPage(
    request
) {

    try {

        const response = await fetch(
            request
        );

        if (
            response.status >= 500
        ) {

            throw new Error(
                "Temporary server error"
            );

        }

        if (
            response.ok &&
            isCacheableRequest(request)
        ) {

            await safeCachePut(

                PAGE_CACHE,

                request,

                response.clone()

            );

        }

        // Preserve actual server responses,
        // including HTTP 404 and access errors.

        return response;

    } catch (error) {

        try {

            const cache = await caches.open(
                PAGE_CACHE
            );

            const cached = await cache.match(
                request
            );

            if (cached) {

                return cached;

            }

        } catch (cacheError) {

            // Continue to offline fallback.

        }

        return getOfflinePage();

    }

}

// ==================================================
// 22. CACHE-FIRST STATIC RESOURCE STRATEGY
// ==================================================

async function cacheFirstStatic(
    request
) {

    try {

        const cache = await caches.open(
            STATIC_CACHE
        );

        const cached = await cache.match(
            request
        );

        if (cached) {

            return cached;

        }

    } catch (error) {

        // Network fallback.

    }

    try {

        const response = await fetch(
            request
        );

        if (response.ok) {

            await safeCachePut(

                STATIC_CACHE,

                request,

                response.clone()

            );

        }

        return response;

    } catch (error) {

        return new Response(

            "Resource unavailable offline.",

            {

                status: 503,

                headers: {

                    "Content-Type":
                        "text/plain; charset=UTF-8",

                    "Cache-Control":
                        "no-store"

                }

            }

        );

    }

}

// ==================================================
// 23. UNCACHED NAVIGATION STRATEGY
// ==================================================

async function networkOnlyNavigation(
    request
) {

    try {

        return await fetch(request);

    } catch (error) {

        return getOfflinePage();

    }

}

// ==================================================
// 24. FETCH EVENT ROUTING
// ==================================================

self.addEventListener(

    "fetch",

    (event) => {

        const request = event.request;

        if (request.method !== "GET") {

            return;

        }

        let url;

        try {

            url = new URL(request.url);

        } catch (error) {

            return;

        }

        // External resources are never
        // intercepted or stored.

        if (
            url.origin !==
            self.location.origin
        ) {

            return;

        }

        // APK files, archives, database
        // files and other excluded downloads
        // are handled by the browser.

        if (

            BLOCKED_FILE_PATTERN.test(
                url.pathname
            ) ||

            request.headers.has("Range")

        ) {

            return;

        }

        // Sensitive or unapproved URLs
        // must not enter PWA caches.

        if (
            !isCacheableRequest(request)
        ) {

            if (
                request.mode === "navigate"
            ) {

                event.respondWith(

                    networkOnlyNavigation(
                        request
                    )

                );

            }

            return;

        }

        // Public HTML pages:
        // Prefer current network content.

        if (

            request.mode === "navigate" &&

            PUBLIC_PAGES.has(url.pathname)

        ) {

            event.respondWith(

                networkFirstPage(request)

            );

            return;

        }

        // Approved CSS, JavaScript,
        // manifest and application icons.

        if (
            STATIC_RESOURCES.has(
                url.pathname
            )
        ) {

            event.respondWith(

                cacheFirstStatic(request)

            );

        }

    }

);

// ==================================================
// 25. CACHE STATUS INFORMATION
// ==================================================

async function getCacheStatus() {

    const result = [];

    for (const name of ACTIVE_CACHES) {

        if (!(await caches.has(name))) {

            continue;

        }

        const cache = await caches.open(
            name
        );

        const entries = await cache.keys();

        result.push({

            name,

            entries: entries.length

        });

    }

    return {

        version: SW_VERSION,

        caches: result,

        totalEntries: result.reduce(

            (total, item) =>

                total + item.entries,

            0

        )

    };

}

// ==================================================
// 26. MANUAL PWA CACHE RESET
// ==================================================

async function resetPWACaches() {

    // Clear only this worker version's caches.
    // Preserve unrelated caches and any
    // pending service worker update.

    await Promise.all(

        ACTIVE_CACHES.map(

            (name) => caches.delete(name)

        )

    );

    return true;

}

// ==================================================
// 27. TRUSTED CLIENT VALIDATION
// ==================================================

function isTrustedClient(source) {

    if (
        !source ||
        typeof source.url !== "string"
    ) {

        return false;

    }

    try {

        return (

            new URL(source.url).origin ===

            self.location.origin

        );

    } catch (error) {

        return false;

    }

}

// ==================================================
// 28. CLIENT RESPONSE HANDLER
// ==================================================

function replyToClient(
    event,
    message
) {

    try {

        if (
            event.ports &&
            event.ports[0]
        ) {

            event.ports[0].postMessage(
                message
            );

        } else if (
            event.source
        ) {

            event.source.postMessage(
                message
            );

        }

    } catch (error) {

        // Client may have closed.

    }

}

// ==================================================
// 29. SERVICE WORKER MESSAGE ENGINE
// ==================================================

self.addEventListener(

    "message",

    (event) => {

        if (
            !isTrustedClient(event.source)
        ) {

            return;

        }

        const data = event.data;

        if (

            !data ||

            typeof data !== "object" ||

            typeof data.type !== "string"

        ) {

            return;

        }

        event.waitUntil(

            (async () => {

                try {

                    switch (data.type) {

                        // Controlled update.

                        case "SKIP_WAITING":

                            await self.skipWaiting();

                            replyToClient(

                                event,

                                {

                                    type:
                                        "UPDATE_ACTIVATION_REQUESTED",

                                    success: true,

                                    version:
                                        SW_VERSION

                                }

                            );

                            break;

                        // Worker version.

                        case "GET_VERSION":

                            replyToClient(

                                event,

                                {

                                    type:
                                        "SW_VERSION",

                                    success: true,

                                    version:
                                        SW_VERSION

                                }

                            );

                            break;

                        // Cache status.

                        case "GET_CACHE_STATUS":

                            replyToClient(

                                event,

                                {

                                    type:
                                        "CACHE_STATUS",

                                    success: true,

                                    data:
                                        await getCacheStatus()

                                }

                            );

                            break;

                        // Manual cache reset.

                        case "CLEAR_PWA_CACHE":

                            await resetPWACaches();

                            replyToClient(

                                event,

                                {

                                    type:
                                        "CACHE_CLEARED",

                                    success: true

                                }

                            );

                            break;

                        // Restore offline files.

                        case "REFRESH_OFFLINE_CACHE":

                            await installCoreResources();

                            await installOptionalResources();

                            replyToClient(

                                event,

                                {

                                    type:
                                        "OFFLINE_CACHE_REFRESHED",

                                    success: true,

                                    data:
                                        await getCacheStatus()

                                }

                            );

                            break;

                        default:

                            replyToClient(

                                event,

                                {

                                    type:
                                        "UNKNOWN_COMMAND",

                                    success: false

                                }

                            );

                    }

                } catch (error) {

                    replyToClient(

                        event,

                        {

                            type:
                                "SW_OPERATION_ERROR",

                            success: false,

                            message:
                                "The requested operation could not be completed."

                        }

                    );

                }

            })()

        );

    }

);

/* ==================================================
   END OF MERAHISAB SERVICE WORKER
   ================================================== */
