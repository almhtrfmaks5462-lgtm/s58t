@echo off
:: Wrapper .bat pour lancer S7Cord-uninstall.ps1 facilement (double-clic)
title S7Cord — Désinstallation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0S7Cord-uninstall.ps1"
if %errorlevel% neq 0 pause
