/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { app } from "electron";
import { join } from "path";

// this is in a separate file to avoid circular dependencies
export const S7Cord_DIR = app.isPackaged
    ? join(process.resourcesPath, "S7Cord.asar")
    : join(__dirname, "..", "..", "..", "dist", "S7Cord.asar");
