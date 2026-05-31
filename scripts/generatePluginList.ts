/*
 * S7Cord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { readdirSync, writeFileSync } from "fs";
import { getEntryPoint, isPluginFile, parseDevs, parseS7CordDevs, parseFile, PluginData } from "./utils";

(async () => {
    parseDevs();
    parseS7CordDevs();

    const args = process.argv.slice(2);

    const S7CordFlag = args.includes("--S7Cord");
    const S7CordFlag = args.includes("--S7Cord");

    let dirs: string[];

    if (S7CordFlag) {
        dirs = ["src/S7Cordplugins"];
    } else if (S7CordFlag) {
        dirs = ["src/plugins", "src/plugins/_core"];
    } else {
        dirs = ["src/plugins", "src/plugins/_core", "src/S7Cordplugins"];
    }

    const outputPath = args.find(a => !a.startsWith("--")) ?? null;

    const plugins = [] as PluginData[];

    await Promise.all(
        dirs.flatMap(dir =>
            readdirSync(dir, { withFileTypes: true })
                .filter(isPluginFile)
                .map(async dirent => {
                    try {
                        const [data] = await parseFile(await getEntryPoint(dir, dirent));
                        plugins.sort().push(data);
                    } catch (e) {
                        console.warn(`[SKIP] ${dir}/${dirent.name}: ${(e as Error).message}`);
                    }
                })
        )
    );

    const data = JSON.stringify(plugins);

    if (outputPath) {
        writeFileSync(outputPath, data);
    } else {
        console.log(data);
    }
})();
