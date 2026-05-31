// S7Cord preload — globalPaths fix + S7Cord avec contextBridge
"use strict";
(function () {
    const Module = require("module");
    const path = require("path");
    const fs = require("fs");

    const appData = process.env.APPDATA || path.join(process.env.USERPROFILE || "", "AppData", "Roaming");
    const moduleDataPath = path.join(appData, "discord", "module_data");

    function addGlobalPath(p) {
        if (!Module.globalPaths.includes(p)) Module.globalPaths.push(p);
    }
    addGlobalPath(moduleDataPath);
    try {
        for (const modName of fs.readdirSync(moduleDataPath)) {
            const modDir = path.join(moduleDataPath, modName);
            try {
                if (!fs.statSync(modDir).isDirectory()) continue;
                for (const ver of fs.readdirSync(modDir)) {
                    const verDir = path.join(modDir, ver);
                    if (fs.statSync(verDir).isDirectory()) addGlobalPath(verDir);
                }
            } catch (_) { }
        }
    } catch (e) { }

    const _orig = Module._resolveLookupPaths;
    Module._resolveLookupPaths = function (request, parent) {
        const len = parent?.paths?.length;
        if (len != null && len !== 0) parent.paths = parent.paths.concat(Module.globalPaths);
        else if (parent) parent.paths = [...Module.globalPaths];
        return _orig.call(this, request, parent);
    };
})();

// ─── S7Cord preload avec contextBridge ─────────────────────────────────────
"use strict";
const { ipcRenderer, contextBridge, webFrame } = require("electron");

function r(e, ...o) { return ipcRenderer.invoke(e, ...o); }
function T(e, ...o) { return ipcRenderer.sendSync(e, ...o); }

var S = {};
try {
    const m = T("S7CordGetPluginIpcMethodMap") || {};
    for (const [e, o] of Object.entries(m)) {
        const t = S[e] = {};
        for (const [s, R] of Object.entries(o)) t[s] = (...C) => r(R, ...C);
    }
} catch (e) { }

const S7CordNative = {
    themes: {
        uploadTheme: async () => { throw new Error("uploadTheme is WEB only"); },
        deleteTheme: e => r("S7CordDeleteTheme", e),
        getThemesDir: () => r("S7CordGetThemesDir"),
        getThemesList: () => r("S7CordGetThemesList"),
        getThemeData: e => r("S7CordGetThemeData", e),
        getSystemValues: () => r("S7CordGetThemeSystemValues"),
        openFolder: () => r("S7CordOpenThemesFolder")
    },
    updater: {
        getUpdates: () => r("S7CordGetUpdates"),
        update: () => r("S7CordUpdate"),
        rebuild: () => r("S7CordBuild"),
        getRepo: () => r("S7CordGetRepo")
    },
    settings: {
        get: () => T("S7CordGetSettings"),
        set: (e, o) => r("S7CordSetSettings", e, o),
        getSettingsDir: () => r("S7CordGetSettingsDir"),
        openFolder: () => r("S7CordOpenSettingsFolder")
    },
    quickCss: {
        get: () => r("S7CordGetQuickCss"),
        set: e => r("S7CordSetQuickCss", e),
        addChangeListener(e) { ipcRenderer.on("S7CordQuickCssUpdate", (o, t) => e(t)); },
        addThemeChangeListener(e) { ipcRenderer.on("S7CordThemeUpdate", () => e()); },
        openFile: () => r("S7CordOpenQuickCss"),
        openEditor: () => r("S7CordOpenMonacoEditor"),
        getEditorTheme: () => T("S7CordGetMonacoTheme")
    },
    native: {
        getVersions: () => process.versions,
        openExternal: e => r("S7CordOpenExternal", e),
        getRendererCss: () => r("S7CordGetRendererCss"),
        onRendererCssUpdate: () => { }
    },
    csp: {
        isDomainAllowed: (e, o) => r("S7CordCspIsDomainAllowed", e, o),
        removeOverride: e => r("S7CordCspRemoveOverride", e),
        requestAddOverride: (e, o, t) => r("S7CordCspRequestAddOverride", e, o, t)
    },
    tray: {
        setUpdateState: e => ipcRenderer.send("S7CordSetTrayUpdateState", e),
        onCheckUpdates: e => { ipcRenderer.on("S7CordTrayCheckUpdates", e); },
        onRepair: e => { ipcRenderer.on("S7CordTrayRepair", e); }
    },
    desktopCapture: { getSources: () => r("S7CordGetDesktopSources") },
    pluginHelpers: S,
    worldBomb: {
        sequence: (word, lps, humanChance, targetX = -1, targetY = -1) =>
            r("WorldBombSequence", word, lps, humanChance, targetX, targetY),
        getCursorPos: () => r("WorldBombGetCursorPos"),
    },
    window: {
        setBackgroundMaterial: e => r("S7CordSetWindowBackgroundMaterial", e),
        setThumbarButtons: e => r("SoundCordSetThumbarButtons", e),
        onThumbarClick: e => { ipcRenderer.on("SoundCordThumbarButtonClick", (o, t) => e(t)); },
        removeThumbarClickListener: () => { ipcRenderer.removeAllListeners("SoundCordThumbarButtonClick"); }
    }
};

try {
    contextBridge.exposeInMainWorld("S7CordNative", S7CordNative);
} catch (e) {
    if (typeof window !== "undefined") window.S7CordNative = S7CordNative;
}

if (location.protocol !== "data:") {
    try { r("S7CordInitFileWatchers"); } catch (e) { }

    // Injection du renderer.js via webFrame.executeJavaScript
    // Identique à l'original S7Cord — c'est la méthode qui fonctionne
    try {
        const rendererJs = T("S7CordPreloadGetRendererJs");
        if (rendererJs) {
            webFrame.executeJavaScript(rendererJs).catch(e => {
                console.error("[S7Cord] renderer inject failed:", e?.message);
            });
        }
    } catch (e) {
        console.error("[S7Cord] S7CordPreloadGetRendererJs failed:", e);
    }

    if (process.env.DISCORD_PRELOAD) {
        try { require(process.env.DISCORD_PRELOAD); } catch (e) { }
    }
} else {
    if (typeof window !== "undefined") {
        window["setCss"] = (() => { let t; return e => { clearTimeout(t); t = setTimeout(() => S7CordNative.quickCss.set(e), 300); }; })();
        window["getCurrentCss"] = S7CordNative.quickCss.get;
        window["getTheme"] = S7CordNative.quickCss.getEditorTheme;
    }
}
//# sourceURL=file:///S7CordPreload
