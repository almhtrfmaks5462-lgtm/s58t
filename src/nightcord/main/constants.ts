/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { app } from "electron";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";

import { CommandLine } from "./cli";

const S7CordDir = dirname(process.execPath);

export const PORTABLE =
    process.platform === "win32" &&
    !process.execPath.toLowerCase().endsWith("electron.exe") &&
    !existsSync(join(S7CordDir, "Uninstall S7Cord.exe"));

export const DATA_DIR =
    process.env.S7Cord_USER_DATA_DIR || (PORTABLE ? join(S7CordDir, "Data") : join(app.getPath("userData")));

mkdirSync(DATA_DIR, { recursive: true });

export const SESSION_DATA_DIR = join(DATA_DIR, "sessionData");
app.setPath("sessionData", SESSION_DATA_DIR);

export const S7Cord_SETTINGS_DIR = join(DATA_DIR, "settings");
mkdirSync(S7Cord_SETTINGS_DIR, { recursive: true });
export const S7Cord_QUICKCSS_FILE = join(S7Cord_SETTINGS_DIR, "quickCss.css");
export const S7Cord_SETTINGS_FILE = join(S7Cord_SETTINGS_DIR, "settings.json");
export const S7Cord_THEMES_DIR = join(DATA_DIR, "themes");

export const USER_AGENT = `S7Cord/${app.getVersion()} (https://git.S7Cord.su/S7Cord/S7Cord)`;

// dimensions shamelessly stolen from Discord Desktop :3
export const MIN_WIDTH = 940;
export const MIN_HEIGHT = 500;
export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const DISCORD_HOSTNAMES = ["discord.com", "canary.discord.com", "ptb.discord.com"];

const VersionString = `AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome.split(".")[0]}.0.0.0 Safari/537.36`;
const BrowserUserAgents = {
    darwin: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ${VersionString}`,
    linux: `Mozilla/5.0 (X11; Linux x86_64) ${VersionString}`,
    windows: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) ${VersionString}`
};

export const BrowserUserAgent =
    CommandLine.values["user-agent"] ||
    BrowserUserAgents[CommandLine.values["user-agent-os"] || process.platform] ||
    BrowserUserAgents.windows;

export const enum MessageBoxChoice {
    Default,
    Cancel
}

export const IS_FLATPAK = process.env.FLATPAK_ID !== undefined;
export const isWayland =
    process.platform === "linux" && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
export const isLinux = process.platform === "linux";

