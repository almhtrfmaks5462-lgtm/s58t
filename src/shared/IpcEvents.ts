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

export const enum IpcEvents {
    INIT_FILE_WATCHERS = "S7CordInitFileWatchers",
    QUICK_CSS_UPDATE = "S7CordQuickCssUpdate",
    OPEN_QUICKCSS = "S7CordOpenQuickCss",
    GET_QUICK_CSS = "S7CordGetQuickCss",
    SET_QUICK_CSS = "S7CordSetQuickCss",
    UPLOAD_THEME = "S7CordUploadTheme",
    DELETE_THEME = "S7CordDeleteTheme",
    GET_THEMES_DIR = "S7CordGetThemesDir",
    GET_THEMES_LIST = "S7CordGetThemesList",
    GET_THEME_DATA = "S7CordGetThemeData",
    GET_THEME_SYSTEM_VALUES = "S7CordGetThemeSystemValues",
    GET_SETTINGS_DIR = "S7CordGetSettingsDir",
    GET_SETTINGS = "S7CordGetSettings",
    SET_SETTINGS = "S7CordSetSettings",
    THEME_UPDATE = "S7CordThemeUpdate",
    OPEN_EXTERNAL = "S7CordOpenExternal",
    GET_UPDATES = "S7CordGetUpdates",
    GET_REPO = "S7CordGetRepo",
    UPDATE = "S7CordUpdate",
    BUILD = "S7CordBuild",
    OPEN_MONACO_EDITOR = "S7CordOpenMonacoEditor",
    GET_MONACO_THEME = "S7CordGetMonacoTheme",

    GET_PLUGIN_IPC_METHOD_MAP = "S7CordGetPluginIpcMethodMap",

    CSP_IS_DOMAIN_ALLOWED = "S7CordCspIsDomainAllowed",
    CSP_REMOVE_OVERRIDE = "S7CordCspRemoveOverride",
    CSP_REQUEST_ADD_OVERRIDE = "S7CordCspRequestAddOverride",

    OPEN_THEMES_FOLDER = "S7CordOpenThemesFolder",
    OPEN_SETTINGS_FOLDER = "S7CordOpenSettingsFolder",
    GET_RENDERER_CSS = "S7CordGetRendererCss",
    RENDERER_CSS_UPDATE = "S7CordRendererCssUpdate",
    PRELOAD_GET_RENDERER_JS = "S7CordPreloadGetRendererJs",

    SET_TRAY_UPDATE_STATE = "S7CordSetTrayUpdateState",
    TRAY_REPAIR = "S7CordTrayRepair",
    TRAY_CHECK_UPDATES = "S7CordTrayCheckUpdates",
    TRAY_ABOUT = "S7CordTrayAbout",

    GET_DESKTOP_SOURCES = "S7CordGetDesktopSources",

    SET_WINDOW_BACKGROUND_MATERIAL = "S7CordSetWindowBackgroundMaterial",

    // SoundCord Player â€” thumbnail toolbar Windows
    SET_THUMBAR_BUTTONS = "SoundCordSetThumbarButtons",
    THUMBAR_BUTTON_CLICK = "SoundCordThumbarButtonClick",

    // S7Cord Updater â€” tÃ©lÃ©charge un exe depuis une URL et le lance
    S7Cord_DOWNLOAD_AND_RUN = "S7CordDownloadAndRun",

    // VB-Audio Virtual Cable (Windows only)
    CHECK_VB_CABLE = "S7CordCheckVBCable",
    INSTALL_VB_CABLE = "S7CordInstallVBCable",

    // Relaunch de l'app Electron
    RELAUNCH_APP = "S7CordRelaunchApp",

    // WorldBomb â€” Simulation Clavier/Souris Native
    WORLD_BOMB_TYPE = "WorldBombType",
    WORLD_BOMB_PRESS_ENTER = "WorldBombPressEnter",
    WORLD_BOMB_PRESS_BACKSPACE = "WorldBombPressBackspace",
    WORLD_BOMB_CLICK = "WorldBombClick",
    // SÃ©quence complÃ¨te en un seul appel systÃ¨me (clic + frappe + enter)
    WORLD_BOMB_SEQUENCE = "WorldBombSequence",
    // Position actuelle du curseur souris (pour calibration)
    WORLD_BOMB_GET_CURSOR_POS = "WorldBombGetCursorPos",
    // Ouvre la fenÃªtre externe Stream Proof
    WORLD_BOMB_OPEN_WINDOW = "WorldBombOpenWindow"
}


