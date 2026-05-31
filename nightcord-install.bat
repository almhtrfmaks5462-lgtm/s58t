@echo off
:: Wrapper .bat pour lancer S7Cord-install.ps1 facilement (double-clic)
title S7Cord — Installation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0S7Cord-install.ps1"
if %errorlevel% neq 0 pause
