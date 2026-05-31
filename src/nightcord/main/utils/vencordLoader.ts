/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { existsSync } from "fs";
import { join } from "path";

import { USER_AGENT } from "../constants";
import { S7Cord_DIR } from "../S7CordDir";
import { downloadFile, fetchie } from "./http";

const API_BASE = "https://git.S7Cord.su/api/v1";

export interface ReleaseData {
    name: string;
    tag_name: string;
    html_url: string;
    assets: Array<{
        name: string;
        browser_download_url: string;
    }>;
}

export async function githubGet(endpoint: string) {
    const opts: RequestInit = {
        headers: {
            Accept: "application/json",
            "User-Agent": USER_AGENT
        }
    };

    return fetchie(API_BASE + endpoint, opts, { retryOnNetworkError: true });
}

export async function downloadS7CordAsar() {
    await downloadFile(
        "https://git.S7Cord.su/S7Cord/S7Cord/releases/download/latest/S7Cord.asar",
        S7Cord_DIR,
        {},
        { retryOnNetworkError: true }
    );
}

export function isValidS7CordInstall(dir: string) {
    return existsSync(join(dir, "S7Cord/main.js"));
}

export async function ensureS7CordFiles() {
    if (!existsSync(S7Cord_DIR)) {
        console.error("Bundled S7Cord.asar not found at", S7Cord_DIR);
    }
}
