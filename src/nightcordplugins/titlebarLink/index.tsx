/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { PluginNative } from "@utils/types";

const Native = S7CordNative.pluginHelpers.TitlebarLink as PluginNative<typeof import("./native")>;

const TARGET_URL = "https://S7Cord.su";

const CSS = `
#S7Cord-titlebar-btn {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 15px;
    width: 40px;
    z-index: 9999;
    cursor: pointer !important;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;
    pointer-events: all;
    background: transparent;
    border: none;
    padding: 0;
}


`;

function inject() {
    if (document.getElementById("S7Cord-titlebar-btn")) return;

    const style = document.createElement("style");
    style.id = "S7Cord-titlebar-link-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    const btn = document.createElement("div");
    btn.id = "S7Cord-titlebar-btn";

    btn.addEventListener("click", () => {
        Native.openUrl(TARGET_URL);
    });

    document.body.appendChild(btn);
}

function remove() {
    document.getElementById("S7Cord-titlebar-btn")?.remove();
    document.getElementById("S7Cord-titlebar-link-style")?.remove();
}

export default definePlugin({
    name: "TitlebarLink",
    enabledByDefault: true,
    description: "Click on the central Discord title to open S7Cord.su",
    authors: [{ name: "S7Cord", id: 0n }],
    required: true,
    patches: [],

    start() {
        if (document.body) {
            inject();
        } else {
            document.addEventListener("DOMContentLoaded", inject, { once: true });
        }
    },

    stop() {
        remove();
    },
} as any);

