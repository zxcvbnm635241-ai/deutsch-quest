@echo off
chcp 65001 >nul
title DeutschQuest - 德語從 0 到 A2 學習基地
echo 正在啟動 DeutschQuest 本地伺服器與資料庫...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
