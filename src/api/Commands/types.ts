/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Command } from "@S7Cord/discord-types";
export { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType } from "@S7Cord/discord-types/enums";

export interface S7CordCommand extends Command {
    isS7CordCommand?: boolean;
}
