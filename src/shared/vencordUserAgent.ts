/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import gitHash from "~git-hash";
import gitRemote from "~git-remote";

export { gitHash, gitRemote };

export const gitHashShort = gitHash.slice(0, 7);
export const S7Cord_USER_AGENT = `S7Cord/${gitHash}${gitRemote ? ` (https://github.com/${gitRemote})` : ""}`;
export const S7Cord_USER_AGENT_HASHLESS = `S7Cord${gitRemote ? ` (https://github.com/${gitRemote})` : ""}`;
