/*
 * S7Cord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@S7Cord/types/components";
import { React, useRef,useState } from "react";

import { cl } from "./Settings";

function detectSource(json: any): "S7Cord" | "S7Cord" | "S7Cord" | "unknown" {
    // Heuristiques basées sur les clés présentes dans le JSON
    if (!json || typeof json !== "object") return "unknown";

    const { settings } = json;
    if (!settings) return "unknown";

    const plugins = settings.plugins || {};
    const pluginNames = Object.keys(plugins);

    // Plugins spécifiques à S7Cord
    if (pluginNames.some(p => ["S7CordHelper", "S7CordCSS"].includes(p))) return "S7Cord";
    // Plugins spécifiques à S7Cord
    if (pluginNames.some(p => ["S7CordHelper", "S7CordHelper"].includes(p))) return "S7Cord";
    // Fallback : si le fichier contient des clés S7Cord communes
    if (pluginNames.length > 0) return "S7Cord";

    return "unknown";
}

function cleanForS7Cord(json: any): any {
    if (!json || typeof json !== "object") return json;

    const cleaned = JSON.parse(JSON.stringify(json));
    const { settings } = cleaned;

    if (!settings?.plugins) return cleaned;

    // Supprimer les plugins propres à S7Cord/S7Cord qui n'existent pas dans S7Cord
    const legacyOnlyPlugins = ["S7CordHelper", "S7CordCSS", "S7CordHelper"];
    for (const name of legacyOnlyPlugins) {
        delete settings.plugins[name];
    }

    return cleaned;
}

export function ImportLegacySettingsButton({ settings }: { settings: any; }) {
    const [dragging, setDragging] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error" | "loading">(null);
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function processFile(file: File) {
        setStatus("loading");
        setMessage("Analyse du fichier...");

        try {
            const text = await file.text();
            const json = JSON.parse(text);
            const source = detectSource(json);

            const sourceLabel =
                source === "S7Cord" ? "S7Cord" :
                source === "S7Cord" ? "S7Cord" :
                source === "S7Cord" ? "S7Cord" : "inconnu";

            const cleaned = cleanForS7Cord(json);

            // Envoie au main process via IPC pour écrire les settings
            await S7CordNative.settings.set(cleaned.settings ?? {});

            if (cleaned.quickCss) {
                await S7CordNative.quickCss.set(cleaned.quickCss);
            }

            setStatus("success");
            setMessage(`✅ Settings ${sourceLabel} importés avec succès ! Redémarre S7Cord pour appliquer.`);
        } catch (err: any) {
            setStatus("error");
            setMessage(`❌ Erreur : ${err?.message ?? String(err)}`);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    }

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }

    return (
        <div className={cl("category")}>
            <BaseText size="lg" weight="semibold" tag="h3" className={cl("category-title")}>
                Import S7Cord / S7Cord Settings
            </BaseText>

            <BaseText size="sm" style={{ marginBottom: "12px", opacity: 0.7 }}>
                Drag & drop your S7Cord or S7Cord backup JSON file here to import your settings into S7Cord.
                Plugin-specific settings that don't exist in S7Cord will be automatically removed.
            </BaseText>

            <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                style={{
                    border: `2px dashed ${dragging ? "#FF0000" : "#4e5058"}`,
                    borderRadius: "8px",
                    padding: "28px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: dragging ? "rgba(88,101,242,0.08)" : "rgba(255,255,255,0.03)",
                    transition: "all 0.15s ease",
                    marginBottom: "12px"
                }}
            >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>📂</div>
                <BaseText size="sm" style={{ opacity: 0.6 }}>
                    {dragging
                        ? "Relâche pour importer..."
                        : "Drag & drop ton fichier JSON ici, ou clique pour parcourir"}
                </BaseText>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,application/json"
                    style={{ display: "none" }}
                    onChange={handleFileInput}
                />
            </div>

            {status && (
                <BaseText
                    size="sm"
                    style={{
                        padding: "10px 14px",
                        borderRadius: "6px",
                        background: status === "success" ? "rgba(59,165,93,0.15)" :
                            status === "error" ? "rgba(237,66,69,0.15)" :
                                "rgba(88,101,242,0.1)",
                        color: status === "success" ? "#3ba55d" :
                            status === "error" ? "#ed4245" : "#FF0000",
                        marginTop: "4px"
                    }}
                >
                    {message}
                </BaseText>
            )}
        </div>
    );
}
