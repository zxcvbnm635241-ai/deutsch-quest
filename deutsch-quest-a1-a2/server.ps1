# ==============================================================================
# DeutschQuest (0 -> A2) 本地後端 API 與靜態網站伺服器 (PowerShell Native)
# ==============================================================================
param(
    [int]$Port = 8080,
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PublicDir = $RootDir
$DataDir = Join-Path $RootDir "data"
$BackupDir = Join-Path $DataDir "backups"
$ProgressFile = Join-Path $DataDir "user_progress.json"

if (-not (Test-Path $DataDir)) { New-Item -ItemType Directory -Path $DataDir -Force | Out-Null }
if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }

# 預設初始學習資料
$DefaultProgress = @{
    profile = @{
        username = "德語探險家"
        avatar = "🥨"
        currentLevel = "A1.1"
        targetLevel = "A2.2"
        xp = 120
        streak = 1
        lastStudyDate = (Get-Date).ToString("yyyy-MM-dd")
        dailyGoalXp = 100
        todayXp = 40
    }
    completedNodes = @("n-0-alphabet", "n-0-pronounce")
    masteredWords = @("w-hallo", "w-danke", "w-wasser", "w-brot")
    favoriteResources = @("res-dw-niko", "res-easy-german")
    gameScores = @{
        derdiedas = @{ highScore = 80; playedCount = 2 }
        matching  = @{ bestTimeSec = 35; playedCount = 1 }
        satzbau   = @{ highScore = 60; playedCount = 1 }
        listening = @{ highScore = 70; playedCount = 1 }
    }
    quizHistory = @(
        @{
            date = (Get-Date).AddDays(-2).ToString("yyyy-MM-dd HH:mm")
            score = 45
            maxScore = 100
            assessedLevel = "A1.1 初階起步"
            weakness = "名詞性別 (der/die/das) 與動詞第二位 (V2)"
        }
    )
    studyLogs = @(
        @{
            id = "log-init-1"
            date = (Get-Date).ToString("yyyy-MM-dd HH:mm")
            category = "發音與字母"
            durationMin = 20
            xpEarned = 40
            note = "學會了 ä, ö, ü 變音母音與 ß 的發音規則，原來 ch 在 a/o/u 後面發音像喝水清喉嚨！"
        }
    )
    badges = @(
        @{ id = "b-first-step"; unlocked = $true; unlockedAt = (Get-Date).ToString("yyyy-MM-dd") }
        @{ id = "b-vocab-10"; unlocked = $false; unlockedAt = "" }
        @{ id = "b-gender-master"; unlocked = $false; unlockedAt = "" }
        @{ id = "b-satzbau-pro"; unlocked = $false; unlockedAt = "" }
        @{ id = "b-streak-3"; unlocked = $false; unlockedAt = "" }
        @{ id = "b-a2-ready"; unlocked = $false; unlockedAt = "" }
    )
}

if (-not (Test-Path $ProgressFile)) {
    $DefaultProgress | ConvertTo-Json -Depth 10 | Set-Content -Path $ProgressFile -Encoding UTF8
}

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

$Listener = New-Object System.Net.HttpListener
$Prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($Prefix)
$Listener.Start()

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 🥨 DeutschQuest (0 到 A2 德語學習中心) 伺服器已啟動！" -ForegroundColor Green
Write-Host " 🌐 請在瀏覽器開啟: $Prefix" -ForegroundColor Yellow
Write-Host " 💾 本地資料庫路徑: $ProgressFile" -ForegroundColor Gray
Write-Host " (按 Ctrl+C 可停止伺服器)" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $NoBrowser) {
    Start-Process $Prefix
}

try {
    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        # CORS headers
        $Response.AddHeader("Access-Control-Allow-Origin", "*")
        $Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $Response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($Request.HttpMethod -eq "OPTIONS") {
            $Response.StatusCode = 200
            $Response.Close()
            continue
        }

        $UrlPath = $Request.Url.LocalPath
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($Request.HttpMethod) $UrlPath" -ForegroundColor DarkCyan

        try {
            # API: 讀取學習紀錄
            if ($UrlPath -eq "/api/progress" -and $Request.HttpMethod -eq "GET") {
                if (Test-Path $ProgressFile) {
                    $JsonContent = Get-Content -Path $ProgressFile -Raw -Encoding UTF8
                } else {
                    $JsonContent = $DefaultProgress | ConvertTo-Json -Depth 10
                }
                $Buffer = [System.Text.Encoding]::UTF8.GetBytes($JsonContent)
                $Response.ContentType = "application/json; charset=utf-8"
                $Response.ContentLength64 = $Buffer.Length
                $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
                $Response.Close()
                continue
            }

            # API: 儲存學習紀錄至本地 JSON 檔案
            if ($UrlPath -eq "/api/progress" -and $Request.HttpMethod -eq "POST") {
                $Reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
                $Body = $Reader.ReadToEnd()
                $Reader.Close()

                if (-not [string]::IsNullOrWhiteSpace($Body)) {
                    Set-Content -Path $ProgressFile -Value $Body -Encoding UTF8
                }

                $ResObj = @{ ok = $true; savedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss"); file = $ProgressFile } | ConvertTo-Json
                $Buffer = [System.Text.Encoding]::UTF8.GetBytes($ResObj)
                $Response.ContentType = "application/json; charset=utf-8"
                $Response.ContentLength64 = $Buffer.Length
                $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
                $Response.Close()
                continue
            }

            # API: 建立本地時間戳記備份檔
            if ($UrlPath -eq "/api/backup" -and $Request.HttpMethod -eq "POST") {
                $Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
                $BackupFile = Join-Path $BackupDir "user_progress_$Stamp.json"
                if (Test-Path $ProgressFile) {
                    Copy-Item -Path $ProgressFile -Destination $BackupFile -Force
                }
                $BackupsList = Get-ChildItem -Path $BackupDir -Filter "*.json" | Sort-Object LastWriteTime -Descending | Select-Object -First 10 | ForEach-Object {
                    @{ name = $_.Name; time = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss"); sizeKb = [math]::Round($_.Length / 1KB, 1) }
                }
                $ResObj = @{ ok = $true; backupFile = $BackupFile; backups = @($BackupsList) } | ConvertTo-Json -Depth 5
                $Buffer = [System.Text.Encoding]::UTF8.GetBytes($ResObj)
                $Response.ContentType = "application/json; charset=utf-8"
                $Response.ContentLength64 = $Buffer.Length
                $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
                $Response.Close()
                continue
            }

            # API: 查詢所有本地備份檔清單
            if ($UrlPath -eq "/api/backups" -and $Request.HttpMethod -eq "GET") {
                $BackupsList = @()
                if (Test-Path $BackupDir) {
                    $BackupsList = Get-ChildItem -Path $BackupDir -Filter "*.json" | Sort-Object LastWriteTime -Descending | Select-Object -First 15 | ForEach-Object {
                        @{ name = $_.Name; time = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss"); sizeKb = [math]::Round($_.Length / 1KB, 1) }
                    }
                }
                $ResObj = @{ ok = $true; dataPath = $ProgressFile; backups = @($BackupsList) } | ConvertTo-Json -Depth 5
                $Buffer = [System.Text.Encoding]::UTF8.GetBytes($ResObj)
                $Response.ContentType = "application/json; charset=utf-8"
                $Response.ContentLength64 = $Buffer.Length
                $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
                $Response.Close()
                continue
            }

            # 靜態檔案服務
            if ($UrlPath -eq "/") { $UrlPath = "/index.html" }
            $SafeRelPath = $UrlPath.TrimStart('/').Replace('/', '\')
            $FilePath = Join-Path $PublicDir $SafeRelPath

            if (Test-Path $FilePath -PathType Leaf) {
                $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
                $ContentType = if ($MimeTypes.ContainsKey($Ext)) { $MimeTypes[$Ext] } else { "application/octet-stream" }
                $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
                $Response.ContentType = $ContentType
                $Response.ContentLength64 = $Bytes.Length
                $Response.StatusCode = 200
                $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            } else {
                $Response.StatusCode = 404
                $Msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $UrlPath")
                $Response.OutputStream.Write($Msg, 0, $Msg.Length)
            }
        } catch {
            $Response.StatusCode = 500
            $ErrMsg = [System.Text.Encoding]::UTF8.GetBytes((@{ ok = $false; error = $_.Exception.Message } | ConvertTo-Json))
            $Response.ContentType = "application/json; charset=utf-8"
            $Response.OutputStream.Write($ErrMsg, 0, $ErrMsg.Length)
        } finally {
            $Response.Close()
        }
    }
} finally {
    $Listener.Stop()
    $Listener.Close()
}
