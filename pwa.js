/* ==================================================
   MERAHISAB ADVANCED PWA ENGINE
   Official Website: https://merahisab.store/
   Engine Version: 1.0.0
   ================================================== */

(() => {

    "use strict";

    // ==================================================
    // 01. PWA CONFIGURATION
    // ==================================================

    const CONFIG = Object.freeze({

        version: "1.0.0",

        serviceWorker: "/sw.js",

        scope: "/",

        manifest: "/manifest.json",

        offlinePage: "/offline.html",

        officialDomain: "merahisab.store",

        cachePrefix: "merahisab-pwa-",

        connectionTimeout: 8000,

        messageTimeout: 5000,

        cacheOperationTimeout: 120000,

        updateCheckInterval: 30 * 60 * 1000

    });

    // ==================================================
    // 02. APPLICATION STATE
    // ==================================================

    const state = {

        registration: null,

        installPrompt: null,

        installed: false,

        online: navigator.onLine,

        reachable: null,

        checkingConnection: false,

        checkingUpdate: false,

        updateAvailable: false,

        updateRequested: false,

        cacheBusy: false,

        initialized: false,

        connectionController: null,

        updateTimer: null,

        lastUpdateCheck: null

    };

    // ==================================================
    // 03. DOM UTILITIES
    // ==================================================

    const get = (id) =>
        document.getElementById(id);

    function setText(id, value) {

        const element = get(id);

        if (element) {

            element.textContent =
                String(value);

        }

    }

    function setDisabled(id, disabled) {

        const element = get(id);

        if (element) {

            element.disabled =
                Boolean(disabled);

        }

    }

    function setHidden(id, hidden) {

        const element = get(id);

        if (element) {

            element.hidden =
                Boolean(hidden);

        }

    }

    function bind(id, handler) {

        const element = get(id);

        if (element) {

            element.addEventListener(
                "click",
                handler
            );

        }

    }

    // ==================================================
    // 04. STATUS MESSAGE ENGINE
    // ==================================================

    function showMessage(
        message,
        type = "info"
    ) {

        const element =
            get("pwaMessage");

        if (!element) {

            return;

        }

        element.textContent =
            String(message);

        element.dataset.type = type;

    }

    // ==================================================
    // 05. BROWSER CAPABILITY DETECTION
    // ==================================================

    function supportsServiceWorker() {

        return (

            window.isSecureContext &&

            "serviceWorker" in navigator

        );

    }

    function supportsCacheStorage() {

        return "caches" in window;

    }

    function supportsStorageManager() {

        return Boolean(

            navigator.storage

        );

    }

    function isIOS() {

        return (

            /iPad|iPhone|iPod/i.test(
                navigator.userAgent
            ) ||

            (

                navigator.platform ===
                    "MacIntel" &&

                navigator.maxTouchPoints > 1

            )

        );

    }

    // ==================================================
    // 06. INSTALLED APP DETECTION
    // ==================================================

    function detectInstalledMode() {

        const displayModes = [

            "standalone",

            "fullscreen",

            "minimal-ui",

            "window-controls-overlay"

        ];

        state.installed =

            navigator.standalone === true ||

            displayModes.some(

                (mode) =>

                    window.matchMedia(

                        "(display-mode: " +
                        mode + ")"

                    ).matches

            );

        return state.installed;

    }

    // ==================================================
    // 07. INSTALL BUTTON INTERFACE
    // ==================================================

    function updateInstallUI() {

        detectInstalledMode();

        const button =
            get("pwaInstallButton");

        if (state.installed) {

            setText(

                "pwaInstallStatus",

                "Running in installed app mode"

            );

            if (button) {

                button.textContent =
                    "Installed App Mode";

                button.disabled = true;

            }

            return;

        }

        if (button) {

            button.disabled = false;

        }

        if (state.installPrompt) {

            setText(

                "pwaInstallButton",

                "Install MeraHisab"

            );

            setText(

                "pwaInstallStatus",

                "Installation available"

            );

        } else {

            setText(

                "pwaInstallButton",

                "Installation Guide"

            );

            setText(

                "pwaInstallStatus",

                "Browser installation options may be available"

            );

        }

    }

    // ==================================================
    // 08. INSTALL PROMPT CAPTURE
    // ==================================================

    window.addEventListener(

        "beforeinstallprompt",

        (event) => {

            event.preventDefault();

            state.installPrompt = event;

            updateInstallUI();

        }

    );

    // ==================================================
    // 09. INSTALLATION COMPLETION
    // ==================================================

    window.addEventListener(

        "appinstalled",

        () => {

            state.installPrompt = null;

            updateInstallUI();

            showMessage(

                "MeraHisab installation completed. Open it from your device home screen or app launcher.",

                "success"

            );

        }

    );

    // ==================================================
    // 10. INSTALLATION GUIDANCE
    // ==================================================

    function showInstallGuide() {

        let instructions;

        if (isIOS()) {

            instructions =

                "On supported iPhone or iPad browsers, open the Share menu and select Add to Home Screen.";

        } else if (

            /Android/i.test(
                navigator.userAgent
            )

        ) {

            instructions =

                "Open your browser menu and look for Install app or Add to Home screen.";

        } else {

            instructions =

                "Look for the installation icon in your browser address bar or an Install app option in the browser menu.";

        }

        setText(

            "pwaInstallInstructions",

            instructions

        );

        setHidden(

            "pwaInstallGuide",

            false

        );

        showMessage(

            "Installation availability depends on your browser and device.",

            "info"

        );

    }

    // ==================================================
    // 11. INSTALL APPLICATION
    // ==================================================

    async function installApplication() {

        if (detectInstalledMode()) {

            showMessage(

                "MeraHisab is running in installed app mode.",

                "info"

            );

            return;

        }

        if (!state.installPrompt) {

            showInstallGuide();

            return;

        }

        const promptEvent =
            state.installPrompt;

        state.installPrompt = null;

        setDisabled(

            "pwaInstallButton",

            true

        );

        try {

            await promptEvent.prompt();

            const result =
                await promptEvent.userChoice;

            if (

                result.outcome === "accepted"

            ) {

                showMessage(

                    "Installation request accepted.",

                    "success"

                );

            } else {

                showMessage(

                    "Installation was cancelled.",

                    "info"

                );

            }

        } catch (error) {

            showInstallGuide();

        } finally {

            updateInstallUI();

        }

    }

    // ==================================================
    // 12. CONNECTION STATUS INTERFACE
    // ==================================================

    function updateConnectionUI() {

        const status =
            get("pwaConnectionStatus");

        let label;

        let statusType;

        if (!state.online) {

            label = "Offline";

            statusType = "offline";

        } else if (

            state.checkingConnection

        ) {

            label = "Checking Connection";

            statusType = "checking";

        } else if (

            state.reachable === true

        ) {

            label = "Online";

            statusType = "online";

        } else if (

            state.reachable === false

        ) {

            label = "Website Unreachable";

            statusType = "offline";

        } else {

            label = "Network Available";

            statusType = "checking";

        }

        if (status) {

            status.textContent = label;

            status.dataset.state =
                statusType;

        }

        setText(

            "pwaNetworkStatus",

            label

        );

    }

    // ==================================================
    // 13. ACTUAL WEBSITE CONNECTION CHECK
    // ==================================================

    async function verifyConnection() {

        if (state.connectionController) {

            state.connectionController.abort();

        }

        state.online =
            navigator.onLine;

        if (!state.online) {

            state.connectionController =
                null;

            state.reachable = false;

            state.checkingConnection =
                false;

            updateConnectionUI();

            return false;

        }

        const controller =
            new AbortController();

        state.connectionController =
            controller;

        state.checkingConnection = true;

        updateConnectionUI();

        const timeout = setTimeout(

            () => controller.abort(),

            CONFIG.connectionTimeout

        );

        try {

            const url = new URL(

                CONFIG.manifest,

                window.location.origin

            );

            url.searchParams.set(

                "connection_check",

                String(Date.now())

            );

            const response = await fetch(

                url.href,

                {

                    cache: "no-store",

                    credentials: "omit",

                    redirect: "error",

                    signal: controller.signal

                }

            );

            if (!response.ok) {

                throw new Error(

                    "Website unavailable"

                );

            }

            const manifest =
                await response.json();

            if (

                manifest.short_name !==
                    "MeraHisab"

            ) {

                throw new Error(

                    "Unexpected manifest"

                );

            }

            if (

                state.connectionController !==
                    controller

            ) {

                return false;

            }

            state.reachable = true;

            return true;

        } catch (error) {

            if (

                state.connectionController ===
                    controller

            ) {

                state.reachable = false;

            }

            return false;

        } finally {

            clearTimeout(timeout);

            if (

                state.connectionController ===
                    controller

            ) {

                state.connectionController =
                    null;

                state.checkingConnection =
                    false;

                updateConnectionUI();

            }

        }

    }

    // ==================================================
    // 14. ONLINE / OFFLINE EVENTS
    // ==================================================

    function initializeConnectionEvents() {

        window.addEventListener(

            "online",

            async () => {

                state.online = true;

                state.reachable = null;

                updateConnectionUI();

                const connected =
                    await verifyConnection();

                if (connected) {

                    showMessage(

                        "Website connection restored.",

                        "success"

                    );

                    checkForUpdates(false);

                }

            }

        );

        window.addEventListener(

            "offline",

            () => {

                if (

                    state.connectionController

                ) {

                    state.connectionController.abort();

                }

                state.connectionController =
                    null;

                state.online = false;

                state.reachable = false;

                state.checkingConnection =
                    false;

                updateConnectionUI();

                showMessage(

                    "You are offline. Previously saved website resources may remain available.",

                    "warning"

                );

            }

        );

    }

    // ==================================================
    // 15. SERVICE WORKER MESSAGING
    // ==================================================

    function sendWorkerMessage(

        type,

        worker = null,

        timeout = CONFIG.messageTimeout

    ) {

        return new Promise(

            (resolve, reject) => {

                if (!supportsServiceWorker()) {

                    reject(

                        new Error(

                            "Service worker unavailable"

                        )

                    );

                    return;

                }

                const target =

                    worker ||

                    navigator.serviceWorker.controller;

                if (!target) {

                    reject(

                        new Error(

                            "No active controller"

                        )

                    );

                    return;

                }

                const channel =
                    new MessageChannel();

                let timer;

                function cleanup() {

                    clearTimeout(timer);

                    channel.port1.close();

                }

                timer = setTimeout(

                    () => {

                        cleanup();

                        reject(

                            new Error(

                                "Worker response timeout"

                            )

                        );

                    },

                    timeout

                );

                channel.port1.onmessage =

                    (event) => {

                        cleanup();

                        const result =
                            event.data;

                        if (

                            !result ||

                            result.success !== true

                        ) {

                            reject(

                                new Error(

                                    "Worker operation failed"

                                )

                            );

                            return;

                        }

                        resolve(result);

                    };

                channel.port1.onmessageerror =

                    () => {

                        cleanup();

                        reject(

                            new Error(

                                "Invalid worker response"

                            )

                        );

                    };

                try {

                    target.postMessage(

                        { type },

                        [channel.port2]

                    );

                } catch (error) {

                    cleanup();

                    reject(error);

                }

            }

        );

    }

    // ==================================================
    // 16. UPDATE NOTIFICATION INTERFACE
    // ==================================================

    function updateAvailableUI() {

        state.updateAvailable = Boolean(

            state.registration &&

            state.registration.waiting

        );

        setHidden(

            "pwaUpdateBanner",

            !state.updateAvailable

        );

        setDisabled(

            "pwaUpdateButton",

            !state.updateAvailable ||

            state.updateRequested ||

            state.cacheBusy

        );

        setText(

            "pwaUpdateStatus",

            state.updateAvailable

                ? "New update available"

                : "No waiting update detected"

        );

    }

    // ==================================================
    // 17. SERVICE WORKER UPDATE OBSERVER
    // ==================================================

    function observeWorker(worker) {

        if (!worker) {

            return;

        }

        function handleState() {

            switch (worker.state) {

                case "installing":

                    setText(

                        "pwaWorkerStatus",

                        "Installing offline resources"

                    );

                    break;

                case "installed":

                    updateAvailableUI();

                    if (

                        navigator.serviceWorker.controller

                    ) {

                        showMessage(

                            "A website update is ready to install.",

                            "info"

                        );

                    }

                    break;

                case "activating":

                    setText(

                        "pwaWorkerStatus",

                        "Activating service worker"

                    );

                    break;

                case "activated":

                    refreshWorkerStatus();

                    updateAvailableUI();

                    break;

                case "redundant":

                    setText(

                        "pwaWorkerStatus",

                        "Worker installation unavailable"

                    );

                    break;

            }

        }

        worker.addEventListener(

            "statechange",

            handleState

        );

        handleState();

    }

    // ==================================================
    // 18. SERVICE WORKER REGISTRATION
    // ==================================================

    async function registerServiceWorker() {

        if (!supportsServiceWorker()) {

            setText(

                "pwaWorkerStatus",

                "Unavailable in this browser or context"

            );

            return;

        }

        try {

            setText(

                "pwaWorkerStatus",

                "Registering service worker"

            );

            state.registration =

                await navigator.serviceWorker.register(

                    CONFIG.serviceWorker,

                    {

                        scope: CONFIG.scope,

                        updateViaCache: "none"

                    }

                );

            state.registration.addEventListener(

                "updatefound",

                () => {

                    observeWorker(

                        state.registration.installing

                    );

                }

            );

            observeWorker(

                state.registration.installing

            );

            updateAvailableUI();

            await refreshWorkerStatus();

        } catch (error) {

            setText(

                "pwaWorkerStatus",

                "Registration failed"

            );

            showMessage(

                "Offline service could not be initialized. Normal website access remains available.",

                "warning"

            );

        }

    }

    // ==================================================
    // 19. SERVICE WORKER STATUS
    // ==================================================

    async function refreshWorkerStatus() {

        if (!supportsServiceWorker()) {

            setText(

                "pwaWorkerStatus",

                "Not supported"

            );

            return;

        }

        const controller =

            navigator.serviceWorker.controller;

        if (!controller) {

            setText(

                "pwaWorkerStatus",

                "Not controlling this page yet"

            );

            setText(

                "pwaWorkerVersion",

                "Not verified"

            );

            return;

        }

        setText(

            "pwaWorkerStatus",

            "Active and controlling page"

        );

        try {

            const result =

                await sendWorkerMessage(

                    "GET_VERSION"

                );

            if (

                result.type === "SW_VERSION" &&

                typeof result.version === "string"

            ) {

                setText(

                    "pwaWorkerVersion",

                    result.version

                );

            } else {

                throw new Error(

                    "Unexpected worker response"

                );

            }

        } catch (error) {

            setText(

                "pwaWorkerVersion",

                "Unable to verify"

            );

        }

    }

    // ==================================================
    // 20. MANUAL / AUTOMATIC UPDATE CHECK
    // ==================================================

    async function checkForUpdates(

        manual = true

    ) {

        if (

            state.checkingUpdate ||

            state.cacheBusy ||

            state.updateRequested

        ) {

            return;

        }

        if (!state.registration) {

            if (manual) {

                showMessage(

                    "Service worker is not registered.",

                    "warning"

                );

            }

            return;

        }

        if (!navigator.onLine) {

            if (manual) {

                showMessage(

                    "Connect to the internet to check for updates.",

                    "warning"

                );

            }

            return;

        }

        state.checkingUpdate = true;

        setDisabled(

            "pwaCheckUpdateButton",

            true

        );

        if (manual) {

            showMessage(

                "Checking for website updates..."

            );

        }

        try {

            await state.registration.update();

            state.lastUpdateCheck =
                new Date();

            setText(

                "pwaLastUpdateCheck",

                state.lastUpdateCheck
                    .toLocaleString("en-IN")

            );

            updateAvailableUI();

            if (manual) {

                showMessage(

                    state.updateAvailable

                        ? "A new update is ready."

                        : "Update check completed. A new version may still be preparing.",

                    "info"

                );

            }

        } catch (error) {

            if (manual) {

                showMessage(

                    "Update check could not be completed.",

                    "warning"

                );

            }

        } finally {

            state.checkingUpdate = false;

            setDisabled(

                "pwaCheckUpdateButton",

                false

            );

        }

    }

    // ==================================================
    // 21. CONTROLLED UPDATE ACTIVATION
    // ==================================================

    async function activateUpdate() {

        if (

            state.updateRequested ||

            state.cacheBusy

        ) {

            return;

        }

        const worker =

            state.registration &&

            state.registration.waiting;

        if (!worker) {

            updateAvailableUI();

            showMessage(

                "No waiting update is available.",

                "info"

            );

            return;

        }

        const approved = window.confirm(

            "Install the website update now? " +

            "This may affect other open MeraHisab website tabs. " +

            "Save any unfinished work before continuing."

        );

        if (!approved) {

            return;

        }

        state.updateRequested = true;

        setDisabled(

            "pwaUpdateButton",

            true

        );

        showMessage(

            "Activating website update..."

        );

        try {

            await sendWorkerMessage(

                "SKIP_WAITING",

                worker,

                15000

            );

            showMessage(

                "Update activation requested. Waiting for the new service worker.",

                "info"

            );

        } catch (error) {

            state.updateRequested = false;

            updateAvailableUI();

            showMessage(

                "Update activation could not be confirmed. Check the current worker status before retrying.",

                "warning"

            );

        }

    }

    // ==================================================
    // 22. SERVICE WORKER CONTROLLER CHANGE
    // ==================================================

    function initializeControllerEvents() {

        if (!supportsServiceWorker()) {

            return;

        }

        navigator.serviceWorker.addEventListener(

            "controllerchange",

            async () => {

                const requested =
                    state.updateRequested;

                state.updateRequested = false;

                updateAvailableUI();

                await refreshWorkerStatus();

                await refreshCacheStatus();

                if (requested) {

                    showMessage(

                        "Website update activated. Reload the page when you are ready.",

                        "success"

                    );

                    setHidden(

                        "pwaReloadButton",

                        false

                    );

                } else {

                    showMessage(

                        "Website service worker changed. Reload when convenient.",

                        "info"

                    );

                    setHidden(

                        "pwaReloadButton",

                        false

                    );

                }

            }

        );

    }

    // ==================================================
    // 23. CACHE STATISTICS
    // ==================================================

    async function refreshCacheStatus() {

        if (!supportsCacheStorage()) {

            setText(

                "pwaCacheStatus",

                "Cache storage unavailable"

            );

            return;

        }

        try {

            const response =

                await sendWorkerMessage(

                    "GET_CACHE_STATUS"

                );

            if (

                response.type !== "CACHE_STATUS" ||

                !response.data

            ) {

                throw new Error(

                    "Invalid cache status"

                );

            }

            const data =
                response.data;

            setText(

                "pwaCacheStatus",

                "Cache information available"

            );

            setText(

                "pwaCacheEntries",

                data.totalEntries

            );

            setText(

                "pwaCacheVersion",

                data.version

            );

            setText(

                "pwaCacheGroups",

                Array.isArray(data.caches)

                    ? data.caches.length

                    : "Unknown"

            );

        } catch (error) {

            setText(

                "pwaCacheStatus",

                "Cache information not verified"

            );

            setText(

                "pwaCacheEntries",

                "Unknown"

            );

            setText(

                "pwaCacheVersion",

                "Unknown"

            );

            setText(

                "pwaCacheGroups",

                "Unknown"

            );

        }

    }

    // ==================================================
    // 24. CACHE OPERATION LOCK
    // ==================================================

    function setCacheBusy(busy) {

        state.cacheBusy = busy;

        setDisabled(

            "pwaRefreshCacheButton",

            busy

        );

        setDisabled(

            "pwaClearCacheButton",

            busy

        );

        setDisabled(

            "pwaCheckUpdateButton",

            busy ||

            state.checkingUpdate

        );

        updateAvailableUI();

    }

    // ==================================================
    // 25. REFRESH OFFLINE RESOURCES
    // ==================================================

    async function refreshOfflineCache() {

        if (

            state.cacheBusy ||

            state.updateRequested

        ) {

            return;

        }

        if (!navigator.onLine) {

            showMessage(

                "Internet connection is required to refresh offline resources.",

                "warning"

            );

            return;

        }

        setCacheBusy(true);

        showMessage(

            "Refreshing approved offline website resources..."

        );

        try {

            const response =

                await sendWorkerMessage(

                    "REFRESH_OFFLINE_CACHE",

                    null,

                    CONFIG.cacheOperationTimeout

                );

            if (

                response.type !==

                    "OFFLINE_CACHE_REFRESHED"

            ) {

                throw new Error(

                    "Unexpected cache response"

                );

            }

            showMessage(

                "Essential offline resources refreshed. Optional resources depend on availability.",

                "success"

            );

        } catch (error) {

            showMessage(

                "Offline refresh could not be confirmed. Some resources may be unavailable or still processing.",

                "warning"

            );

        } finally {

            setCacheBusy(false);

            await refreshCacheStatus();

            await refreshStorageStatus();

        }

    }

    // ==================================================
    // 26. SAFE CACHE RESET
    // ==================================================

    async function clearOfflineCache() {

        if (

            state.cacheBusy ||

            state.updateRequested

        ) {

            return;

        }

        const approved = window.confirm(

            "Clear MeraHisab website offline cache? " +

            "Saved website pages may become unavailable offline. " +

            "Android application financial records will not be deleted by this operation."

        );

        if (!approved) {

            return;

        }

        setCacheBusy(true);

        try {

            const response =

                await sendWorkerMessage(

                    "CLEAR_PWA_CACHE",

                    null,

                    CONFIG.cacheOperationTimeout

                );

            if (

                response.type !== "CACHE_CLEARED"

            ) {

                throw new Error(

                    "Unexpected cache response"

                );

            }

            showMessage(

                "Website offline cache cleared. Refresh offline resources when connected.",

                "success"

            );

        } catch (error) {

            showMessage(

                "Cache clearing could not be confirmed.",

                "warning"

            );

        } finally {

            setCacheBusy(false);

            await refreshCacheStatus();

            await refreshStorageStatus();

        }

    }

    // ==================================================
    // 27. STORAGE SIZE FORMATTER
    // ==================================================

    function formatBytes(bytes) {

        if (

            !Number.isFinite(bytes) ||

            bytes < 0

        ) {

            return "Unknown";

        }

        if (bytes === 0) {

            return "0 B";

        }

        const units = [

            "B",

            "KiB",

            "MiB",

            "GiB",

            "TiB"

        ];

        const index = Math.min(

            units.length - 1,

            Math.max(

                0,

                Math.floor(

                    Math.log(bytes) /

                    Math.log(1024)

                )

            )

        );

        return (

            (

                bytes /

                Math.pow(1024, index)

            ).toFixed(

                index === 0 ? 0 : 2

            ) +

            " " +

            units[index]

        );

    }

    // ==================================================
    // 28. STORAGE USAGE INFORMATION
    // ==================================================

    async function refreshStorageStatus() {

        if (!supportsStorageManager()) {

            setText(

                "pwaStorageStatus",

                "Storage information unavailable"

            );

            return;

        }

        try {

            if (

                typeof navigator.storage.estimate ===
                    "function"

            ) {

                const estimate =

                    await navigator.storage.estimate();

                setText(

                    "pwaStorageUsed",

                    formatBytes(

                        estimate.usage

                    )

                );

                setText(

                    "pwaStorageQuota",

                    formatBytes(

                        estimate.quota

                    )

                );

                if (

                    Number.isFinite(estimate.usage) &&

                    Number.isFinite(estimate.quota) &&

                    estimate.quota > 0

                ) {

                    const percentage = Math.min(

                        100,

                        Math.max(

                            0,

                            estimate.usage /

                            estimate.quota * 100

                        )

                    );

                    setText(

                        "pwaStoragePercentage",

                        percentage.toFixed(2) + "%"

                    );

                }

                setText(

                    "pwaStorageStatus",

                    "Estimated website origin storage"

                );

            }

            if (

                typeof navigator.storage.persisted ===
                    "function"

            ) {

                const persistent =

                    await navigator.storage.persisted();

                setText(

                    "pwaPersistentStorage",

                    persistent

                        ? "Granted"

                        : "Not granted"

                );

            }

        } catch (error) {

            setText(

                "pwaStorageStatus",

                "Unable to verify storage information"

            );

        }

    }

    // ==================================================
    // 29. PERSISTENT STORAGE REQUEST
    // ==================================================

    async function requestPersistentStorage() {

        if (

            !supportsStorageManager() ||

            typeof navigator.storage.persist !==
                "function"

        ) {

            showMessage(

                "Persistent storage is unavailable in this browser.",

                "warning"

            );

            return;

        }

        try {

            const granted =

                await navigator.storage.persist();

            showMessage(

                granted

                    ? "Persistent website storage granted by the browser."

                    : "Persistent storage was not granted by the browser.",

                granted

                    ? "success"

                    : "info"

            );

        } catch (error) {

            showMessage(

                "Persistent storage request could not be completed.",

                "warning"

            );

        }

        await refreshStorageStatus();

    }

    // ==================================================
    // 30. PWA SETTINGS PANEL CREATION
    // ==================================================

    function createPWAInterface() {

        if (get("merahisabPwaPanel")) {

            return;

        }

        const section =
            document.createElement("section");

        section.id =
            "merahisabPwaPanel";

        section.className =
            "pwa-panel upgrade-card";

        section.setAttribute(

            "aria-labelledby",

            "pwaPanelTitle"

        );

        section.innerHTML = `

            <div class="pwa-panel-header">

                <div>

                    <span class="pwa-eyebrow">

                        MERAHISAB WEBSITE

                    </span>

                    <h2 id="pwaPanelTitle">

                        App &amp; Offline Center

                    </h2>

                </div>

                <span id="pwaConnectionStatus"
                      class="pwa-connection-status"
                      data-state="checking"
                      role="status">

                    Checking Connection

                </span>

            </div>

            <p class="pwa-description">

                Install the MeraHisab website,
                manage offline resources and
                check for website updates.

            </p>

            <div class="pwa-action-row">

                <button id="pwaInstallButton"
                        class="pwa-button primary"
                        type="button">

                    Installation Guide

                </button>

                <button id="pwaSettingsButton"
                        class="pwa-button"
                        type="button"
                        aria-expanded="false"
                        aria-controls="pwaSettingsContent">

                    PWA Settings

                </button>

            </div>

            <div id="pwaInstallGuide"
                 class="pwa-notice"
                 hidden>

                <h3>Installation Guide</h3>

                <p id="pwaInstallInstructions"></p>

                <p>

                    This installs the website,
                    not the Android financial
                    management application.

                </p>

                <button id="pwaCloseGuideButton"
                        class="pwa-button"
                        type="button">

                    Close Guide

                </button>

            </div>

            <div id="pwaUpdateBanner"
                 class="pwa-update-banner"
                 hidden>

                <h3>Website Update Available</h3>

                <p>

                    A new service worker
                    is ready for activation.

                </p>

                <button id="pwaUpdateButton"
                        class="pwa-button primary"
                        type="button">

                    Install Update

                </button>

            </div>

            <div id="pwaSettingsContent"
                 class="pwa-settings-content"
                 hidden>

                <h3>Application Information</h3>

                <dl class="pwa-info-grid">

                    <div>

                        <dt>Engine Version</dt>

                        <dd id="pwaEngineVersion">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Installation Status</dt>

                        <dd id="pwaInstallStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Network Status</dt>

                        <dd id="pwaNetworkStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Service Worker</dt>

                        <dd id="pwaWorkerStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Worker Version</dt>

                        <dd id="pwaWorkerVersion">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Update Status</dt>

                        <dd id="pwaUpdateStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Last Update Check</dt>

                        <dd id="pwaLastUpdateCheck">

                            Not checked

                        </dd>

                    </div>

                </dl>

                <h3>Offline Cache Management</h3>

                <dl class="pwa-info-grid">

                    <div>

                        <dt>Cache Status</dt>

                        <dd id="pwaCacheStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Cache Version</dt>

                        <dd id="pwaCacheVersion">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Saved Resources</dt>

                        <dd id="pwaCacheEntries">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Cache Groups</dt>

                        <dd id="pwaCacheGroups">

                            Unknown

                        </dd>

                    </div>

                </dl>

                <div class="pwa-action-row">

                    <button id="pwaRefreshCacheButton"
                            class="pwa-button"
                            type="button">

                        Refresh Offline Cache

                    </button>

                    <button id="pwaClearCacheButton"
                            class="pwa-button danger"
                            type="button">

                        Clear Offline Cache

                    </button>

                    <a class="pwa-button"
                       href="/offline.html">

                        Offline Center

                    </a>

                </div>

                <h3>Website Storage Information</h3>

                <dl class="pwa-info-grid">

                    <div>

                        <dt>Storage Status</dt>

                        <dd id="pwaStorageStatus">

                            Checking...

                        </dd>

                    </div>

                    <div>

                        <dt>Estimated Storage Used</dt>

                        <dd id="pwaStorageUsed">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Estimated Storage Quota</dt>

                        <dd id="pwaStorageQuota">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Storage Usage</dt>

                        <dd id="pwaStoragePercentage">

                            Unknown

                        </dd>

                    </div>

                    <div>

                        <dt>Persistent Storage</dt>

                        <dd id="pwaPersistentStorage">

                            Unknown

                        </dd>

                    </div>

                </dl>

                <div class="pwa-action-row">

                    <button id="pwaPersistentButton"
                            class="pwa-button"
                            type="button">

                        Request Persistent Storage

                    </button>

                    <button id="pwaCheckUpdateButton"
                            class="pwa-button"
                            type="button">

                        Check for Updates

                    </button>

                    <button id="pwaDiagnosticsButton"
                            class="pwa-button"
                            type="button">

                        Refresh Diagnostics

                    </button>

                </div>

                <div class="pwa-notice">

                    <strong>Privacy &amp; Storage</strong>

                    <p>

                        Storage estimates may
                        include all browser
                        storage associated with
                        this website origin.

                        They are not limited
                        to the PWA cache.

                    </p>

                    <p>

                        Persistent storage
                        is subject to browser
                        policies and is not
                        a substitute for backups.

                    </p>

                    <p>

                        Website cache management
                        does not manage financial
                        records stored by the
                        Android applications.

                    </p>

                </div>

            </div>

            <button id="pwaReloadButton"
                    class="pwa-button"
                    type="button"
                    hidden>

                Reload Website

            </button>

            <p id="pwaMessage"
               class="pwa-message"
               role="status"
               aria-live="polite">

            </p>

        `;

        const mount =

            get("pwaMount") ||

            document.querySelector("main");

        if (mount) {

            mount.appendChild(section);

        } else {

            document.body.appendChild(section);

        }

    }

    // ==================================================
    // 31. SETTINGS PANEL TOGGLE
    // ==================================================

    function toggleSettings() {

        const content =
            get("pwaSettingsContent");

        const button =
            get("pwaSettingsButton");

        if (!content || !button) {

            return;

        }

        content.hidden =
            !content.hidden;

        button.setAttribute(

            "aria-expanded",

            String(!content.hidden)

        );

        button.textContent =

            content.hidden

                ? "PWA Settings"

                : "Close PWA Settings";

        if (!content.hidden) {

            refreshDiagnostics();

        }

    }

    // ==================================================
    // 32. FULL DIAGNOSTICS ENGINE
    // ==================================================

    async function refreshDiagnostics() {

        setDisabled(

            "pwaDiagnosticsButton",

            true

        );

        try {

            await Promise.allSettled([

                refreshWorkerStatus(),

                refreshCacheStatus(),

                refreshStorageStatus(),

                verifyConnection()

            ]);

            updateInstallUI();

            updateAvailableUI();

        } finally {

            setDisabled(

                "pwaDiagnosticsButton",

                false

            );

        }

    }

    // ==================================================
    // 33. INTERFACE EVENT BINDINGS
    // ==================================================

    function bindInterfaceEvents() {

        bind(

            "pwaInstallButton",

            installApplication

        );

        bind(

            "pwaSettingsButton",

            toggleSettings

        );

        bind(

            "pwaCloseGuideButton",

            () => setHidden(

                "pwaInstallGuide",

                true

            )

        );

        bind(

            "pwaUpdateButton",

            activateUpdate

        );

        bind(

            "pwaCheckUpdateButton",

            () => checkForUpdates(true)

        );

        bind(

            "pwaRefreshCacheButton",

            refreshOfflineCache

        );

        bind(

            "pwaClearCacheButton",

            clearOfflineCache

        );

        bind(

            "pwaPersistentButton",

            requestPersistentStorage

        );

        bind(

            "pwaDiagnosticsButton",

            refreshDiagnostics

        );

        bind(

            "pwaReloadButton",

            () => {

                const approved =

                    window.confirm(

                        "Reload the website now? Unsaved page inputs may be lost."

                    );

                if (approved) {

                    window.location.reload();

                }

            }

        );

    }

    // ==================================================
    // 34. AUTOMATIC UPDATE SCHEDULER
    // ==================================================

    function startUpdateScheduler() {

        if (state.updateTimer) {

            clearInterval(

                state.updateTimer

            );

        }

        state.updateTimer = setInterval(

            () => {

                if (

                    navigator.onLine &&

                    document.visibilityState ===
                        "visible"

                ) {

                    checkForUpdates(false);

                }

            },

            CONFIG.updateCheckInterval

        );

        document.addEventListener(

            "visibilitychange",

            () => {

                if (

                    document.visibilityState !==
                        "visible" ||

                    !navigator.onLine

                ) {

                    return;

                }

                const lastCheck =

                    state.lastUpdateCheck

                        ? state.lastUpdateCheck.getTime()

                        : 0;

                if (

                    Date.now() - lastCheck >=

                    CONFIG.updateCheckInterval

                ) {

                    checkForUpdates(false);

                }

            }

        );

    }

    // ==================================================
    // 35. DISPLAY MODE CHANGE DETECTION
    // ==================================================

    function observeDisplayMode() {

        const query =

            window.matchMedia(

                "(display-mode: standalone)"

            );

        if (

            typeof query.addEventListener ===
                "function"

        ) {

            query.addEventListener(

                "change",

                updateInstallUI

            );

        }

    }

    // ==================================================
    // 36. MAIN INITIALIZATION
    // ==================================================

    async function initialize() {

        if (state.initialized) {

            return;

        }

        state.initialized = true;

        createPWAInterface();

        bindInterfaceEvents();

        initializeConnectionEvents();

        initializeControllerEvents();

        observeDisplayMode();

        setText(

            "pwaEngineVersion",

            CONFIG.version

        );

        updateInstallUI();

        updateConnectionUI();

        updateAvailableUI();

        await Promise.allSettled([

            registerServiceWorker(),

            verifyConnection(),

            refreshStorageStatus()

        ]);

        await refreshCacheStatus();

        startUpdateScheduler();

    }

    // ==================================================
    // 37. PUBLIC PWA INTERFACE
    // ==================================================

    window.MeraHisabPWA = Object.freeze({

        version: CONFIG.version,

        install: installApplication,

        checkConnection: verifyConnection,

        checkUpdates: checkForUpdates,

        refreshDiagnostics,

        getStatus() {

            return {

                version: CONFIG.version,

                installedMode:

                    detectInstalledMode(),

                online: state.online,

                reachable: state.reachable,

                updateAvailable:

                    state.updateAvailable,

                serviceWorkerSupported:

                    supportsServiceWorker(),

                cacheStorageSupported:

                    supportsCacheStorage()

            };

        }

    });

    // ==================================================
    // 38. SAFE DOM INITIALIZATION
    // ==================================================

    if (

        document.readyState === "loading"

    ) {

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
   END OF MERAHISAB ADVANCED PWA ENGINE
   ================================================== */
