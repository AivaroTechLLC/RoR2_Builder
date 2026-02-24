@echo off
:: ── RoR2 Build Reference Launcher ──────────────────────────────────
:: Double-click this file to start the app and open it in your browser
title RoR2 Meta Build Reference

:: Use portable Node if available, otherwise system Node
if exist "%~dp0.node\node-v20.11.1-win-x64\node.exe" (
    set "PATH=%~dp0.node\node-v20.11.1-win-x64;%PATH%"
)

cd /d "%~dp0"

:: Install deps if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo   Starting RoR2 Meta Build Reference...
echo   Your browser will open automatically.
echo   Keep this window open while using the app.
echo.

:: Open browser after a short delay
start "" /b cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Start the server
node server.js
