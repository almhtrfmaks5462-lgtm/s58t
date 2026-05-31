/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CommandLine } from "./cli";

if (CommandLine.values.repair) {
    (async () => {
        const { State } = await import("./settings");
        if (State.store.S7CordDir) {
            console.error("Cannot repair: using custom S7Cord directory.");
            process.exit(1);
        }
        console.log("Repairing S7Cord...");
        const { downloadS7CordAsar } = await import("./utils/S7CordLoader");
        await downloadS7CordAsar();
        console.log("Repair complete.");
        process.exit(0);
    })();
} else {
    require("./startup");
}
