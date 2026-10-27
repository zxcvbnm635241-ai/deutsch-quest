/* ============================================================================
   DeutschQuest (0 -> A2) 前端核心控制器與遊戲引擎 (支援公開網站獨立訪客紀錄 + 本地後端雙模式)
============================================================================ */

const STORAGE_KEY = "deutschquest_progress_v1";
const AVATARS = ["🥨", "🦉", "🍺", "🏰", "🦅", "🐻", "🚀"];
const DAILY_QUOTES = [
  { de: "Übung macht den Meister!", zh: "熟能生巧！每天練習一點點就會變大師！" },
  { de: "Aller Anfang ist schwer.", zh: "萬事起頭難，跨出第一步你就贏了一半！" },
  { de: "Schritt für Schritt zum Ziel!", zh: "一步一腳印，從 0 穩穩邁向 A2！" },
  { de: "Aus Fehlern lernt man.", zh: "從錯誤中學習！不用害怕講錯冠詞喔！" }
];

function getDefaultState() {
  return {
    profile: {
      username: "德語探險家",
      avatar: "🥨",
      currentLevel: "A1.1",
      targetLevel: "A2.2",
      xp: 120,
      streak: 1,
      lastStudyDate: new Date().toISOString().slice(0, 10),
      dailyGoalXp: 100,
      todayXp: 40
    },
    completedNodes: ["n-0-alphabet", "n-0-pronounce"],
    masteredWords: ["w-apfel", "w-kaffee", "w-wasser", "w-brot"],
    favoriteResources: ["res-dw-niko", "res-easy-german", "res-verbformen"],
    gameScores: {
      derdiedas: { highScore: 80, playedCount: 2 },
      matching: { bestTimeSec: 35, playedCount: 1 },
      satzbau: { highScore: 60, playedCount: 1 },
      listening: { highScore: 70, playedCount: 1 }
    },
    quizHistory: [],
    studyLogs: [
      {
        id: "log-welcome",
        date: new Date().toLocaleString("zh-TW", { hour12: false }),
        category: "破冰啟航",
        durationMin: 15,
        xpEarned: 40,
        note: "歡迎來到 DeutschQuest！這裡會記錄你每一天的德語進步軌跡！"
      }
    ],
    badges: [
      { id: "b-first-step", unlocked: true, unlockedAt: new Date().toISOString().slice(0, 10) }
    ]
  };
}

let state = getDefaultState();
let isLocalBackendConnected = false;
let currentFilter = "all";
let currentVocabFilter = "all";
let activeModalNodeId = null;

// ==================== 1. 德語語音合成 (Web Speech API) ====================
function speakGerman(text, rate = 0.92) {
  if (!("speechSynthesis" in window)) {
    showToast("⚠️ 您的瀏覽器不支援語音合成功能");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const deVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("de"));
  if (deVoice) utter.voice = deVoice;

  window.speechSynthesis.speak(utter);
}
window.speakGerman = speakGerman;

// ==================== 2. 智慧雙模式載入（公開網站訪客獨立 LocalStorage + 本地伺服器同步） ====================
async function loadProgress() {
  const syncBadge = document.getElementById("syncStatusBadge");
  const syncText = document.getElementById("syncStatusText");
  const pathText = document.getElementById("serverDataPathText");

  // 優先檢查是否為本地開發環境 (localhost / 127.0.0.1)
  const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (isLocalhost) {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const serverData = await res.json();
        state = Object.assign(getDefaultState(), serverData);
        isLocalBackendConnected = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        syncBadge.style.background = "#EFFAF0";
        syncText.textContent = "本地伺服器已連線 (JSON 同步中)";
        if (pathText) pathText.textContent = "本地硬碟 data/user_progress.json + 瀏覽器雙重備份";
        loadServerBackupsList();
        checkAndUnlockBadges();
        renderAll();
        return;
      }
    } catch (_) {}
  }

  // 公開網站模式（Netlify / GitHub Pages / Vercel）或直接開啟 HTML：每位訪客獨立儲存在自己的瀏覽器中
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      state = Object.assign(getDefaultState(), JSON.parse(cached));
    } catch (_) {
      state = getDefaultState();
    }
  } else {
    state = getDefaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  syncBadge.style.background = "#EFFAF0";
  syncBadge.style.color = "#2B8A0E";
  syncText.textContent = "個人學習進度自動保存中 (本機獨立記憶)";
  if (pathText) pathText.textContent = "每位訪客獨立儲存於自己的瀏覽器 (支援 JSON 匯出/匯入)";

  checkAndUnlockBadges();
  renderAll();
}

async function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (isLocalBackendConnected) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state, null, 2)
      });
    } catch (_) {}
  }
}

function addStudyXp(amount, reason = "") {
  state.profile.xp = (state.profile.xp || 0) + amount;
  state.profile.todayXp = (state.profile.todayXp || 0) + amount;

  const today = new Date().toISOString().slice(0, 10);
  if (state.profile.lastStudyDate !== today) {
    state.profile.streak = (state.profile.streak || 1) + 1;
    state.profile.lastStudyDate = today;
  }

  checkAndUnlockBadges();
  saveProgress();
  renderHeaderStats();
  if (reason) {
    showToast(`🎉 +${amount} XP！(${reason})`);
  }
}
window.addStudyXp = addStudyXp;

function showToast(msg) {
  const container = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast-msg";
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 250);
  }, 3000);
}

// ==================== 3. 檢查並解鎖成就徽章 ====================
function checkAndUnlockBadges() {
  if (!Array.isArray(state.badges)) state.badges = [];
  const unlock = (id) => {
    let found = state.badges.find(b => b.id === id);
    if (!found) {
      found = { id, unlocked: true, unlockedAt: new Date().toISOString().slice(0, 10) };
      state.badges.push(found);
      const meta = window.DEUTSCH_DATA.badgeCatalog.find(c => c.id === id);
      if (meta) showToast(`🏅 解鎖新徽章：【${meta.name}】！`);
    } else if (!found.unlocked) {
      found.unlocked = true;
      found.unlockedAt = new Date().toISOString().slice(0, 10);
      const meta = window.DEUTSCH_DATA.badgeCatalog.find(c => c.id === id);
      if (meta) showToast(`🏅 解鎖新徽章：【${meta.name}】！`);
    }
  };

  if ((state.completedNodes || []).length >= 1) unlock("b-first-step");
  if ((state.masteredWords || []).length >= 10) unlock("b-vocab-10");
  if (state.gameScores?.derdiedas?.highScore >= 100) unlock("b-gender-master");
  if (state.gameScores?.satzbau?.highScore >= 80) unlock("b-satzbau-pro");
  if ((state.studyLogs || []).length >= 3 || state.profile.todayXp >= 100) unlock("b-streak-3");
  if (state.profile.xp >= 500 || (state.profile.currentLevel || "").startsWith("A2")) unlock("b-a2-ready");
}

// ==================== 4. 渲染頂部與側欄數據 ====================
function renderHeaderStats() {
  document.getElementById("avatarDisplay").textContent = state.profile.avatar || "🥨";
  document.getElementById("sidebarLevelBadge").textContent = state.profile.currentLevel || "A1.1";
  document.getElementById("sidebarUsername").textContent = `${state.profile.username || "德語探險家"} ✏️`;
  document.getElementById("sidebarTotalXp").textContent = state.profile.xp || 0;

  const xpPercent = Math.min(100, Math.round(((state.profile.xp || 0) % 200) / 2));
  document.getElementById("sidebarXpFill").style.width = `${xpPercent}%`;

  document.getElementById("todayXpText").textContent = `${state.profile.todayXp || 0} / ${state.profile.dailyGoalXp || 100} XP`;
  document.getElementById("statStreak").textContent = state.profile.streak || 1;
  document.getElementById("statVocabCount").textContent = (state.masteredWords || []).length;
  document.getElementById("statXp").textContent = state.profile.xp || 0;
}

// ==================== 5. 渲染 TAB 1: 0 -> A2 循序漸進闖關地圖 ====================
function renderRoadmap() {
  const container = document.getElementById("roadmapContainer");
  const stages = window.DEUTSCH_DATA.roadmap;
  let totalNodes = 0;
  let doneNodes = 0;

  container.innerHTML = stages.map(stage => {
    const nodesHtml = stage.nodes.map(node => {
      totalNodes++;
      const isDone = (state.completedNodes || []).includes(node.id);
      if (isDone) doneNodes++;

      return `
        <div class="node-card ${isDone ? "completed" : ""}" data-node-id="${node.id}">
          <div>
            <div class="node-top-row">
              <span class="node-type-tag">${node.type}</span>
              <span class="node-xp-tag">+${node.xp} XP</span>
            </div>
            <h4>${node.title}</h4>
            <p>${node.summary}</p>
          </div>
          <div class="node-status-bar">
            <span>${isDone ? "✅ 已通關完成" : "👉 點擊開始學習"}</span>
            <span>📖 重點與例句 ➔</span>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="stage-block">
        <div class="stage-header">
          <div>
            <span class="stage-badge" style="background:${stage.color}">${stage.badge}</span>
            <h3>${stage.title}</h3>
            <p>${stage.subtitle}</p>
          </div>
        </div>
        <div class="nodes-grid">${nodesHtml}</div>
      </div>
    `;
  }).join("");

  const pct = totalNodes > 0 ? Math.round((doneNodes / totalNodes) * 100) : 0;
  document.getElementById("roadmapPercentText").textContent = `${pct}% (${doneNodes} / ${totalNodes} 關卡)`;
  document.getElementById("roadmapProgressFill").style.width = `${pct}%`;

  container.querySelectorAll(".node-card").forEach(card => {
    card.addEventListener("click", () => openNodeModal(card.dataset.nodeId));
  });
}

function openNodeModal(nodeId) {
  activeModalNodeId = nodeId;
  let foundNode = null;
  let foundStage = null;

  for (const st of window.DEUTSCH_DATA.roadmap) {
    const n = st.nodes.find(x => x.id === nodeId);
    if (n) {
      foundNode = n;
      foundStage = st;
      break;
    }
  }
  if (!foundNode) return;

  document.getElementById("modalStageBadge").textContent = foundStage.badge;
  document.getElementById("modalStageBadge").style.background = foundStage.color;
  document.getElementById("modalNodeTitle").textContent = foundNode.title;
  document.getElementById("modalNodeSummary").textContent = foundNode.summary;

  document.getElementById("modalKeyPoints").innerHTML = foundNode.keyPoints
    .map(kp => `<li>${kp}</li>`).join("");

  document.getElementById("modalSentences").innerHTML = foundNode.sampleSentences
    .map(s => `
      <div class="dialogue-box">
        <div class="dialogue-de">„${s.de}“</div>
        <div class="dialogue-zh">${s.zh}</div>
        <button class="btn-mini-tts" onclick="window.speakGerman('${s.de.replace(/'/g, "\\'")}')">🔊 聽句子發音</button>
      </div>
    `).join("");

  const recResources = (foundNode.recommendedResourceIds || [])
    .map(rid => window.DEUTSCH_DATA.resources.find(r => r.id === rid))
    .filter(Boolean);

  document.getElementById("modalResources").innerHTML = recResources
    .map(r => `
      <a href="${r.url}" target="_blank" rel="noopener" class="btn-game btn-blue" onclick="window.addStudyXp(10, '前往 ${r.name}')">
        ${r.icon} 搭配練習：${r.name} ↗
      </a>
    `).join("");

  const isDone = (state.completedNodes || []).includes(nodeId);
  const btnComplete = document.getElementById("btnToggleNodeComplete");
  if (isDone) {
    btnComplete.textContent = "✅ 已完成此關卡（點擊可取消標記）";
    btnComplete.className = "btn-game btn-gray full-width";
  } else {
    btnComplete.textContent = `🎉 標記為「已完成此關卡」並領取 +${foundNode.xp} XP！`;
    btnComplete.className = "btn-game btn-green full-width";
  }

  document.getElementById("nodeModalBackdrop").classList.remove("hidden");
}

// ==================== 6. 渲染 TAB 2: 各大德語學習網站整合導航 ====================
function renderResources() {
  const grid = document.getElementById("resourceGrid");
  const favs = state.favoriteResources || [];

  let list = window.DEUTSCH_DATA.resources.slice();
  if (currentFilter === "favorite") {
    list = list.filter(r => favs.includes(r.id));
  } else if (currentFilter !== "all") {
    list = list.filter(r => r.category === currentFilter);
  }

  list.sort((a, b) => (favs.includes(b.id) ? 1 : 0) - (favs.includes(a.id) ? 1 : 0));

  if (list.length === 0) {
    grid.innerHTML = `<div class="section-header-card"><p>尚未釘選任何網站，請點擊卡片右上角的 ⭐ 加入最愛！</p></div>`;
    return;
  }

  grid.innerHTML = list.map(r => {
    const isFav = favs.includes(r.id);
    return `
      <div class="resource-card">
        <div>
          <div class="res-top">
            <div style="display:flex; gap:12px; align-items:center;">
              <div class="res-icon-box">${r.icon}</div>
              <div>
                <span class="level-pill" style="background:${r.badgeColor}">${r.level}</span>
                <h3 style="margin-top:6px; font-size:1.1rem;">${r.name}</h3>
              </div>
            </div>
            <button class="btn-fav-star ${isFav ? "favorited" : ""}" data-fav-id="${r.id}" title="釘選至我的最愛">
              ${isFav ? "⭐ 已釘選" : "☆ 釘選"}
            </button>
          </div>

          <div class="res-badges">
            <span class="res-tag">📂 ${r.categoryLabel}</span>
            <span class="res-tag">💎 ${r.isFree}</span>
          </div>

          <p style="font-size:0.9rem; color:#475569; margin-bottom:10px;">${r.description}</p>
          <div class="res-howto"><strong>💡 推薦怎麼用：</strong>${r.howToUse}</div>
        </div>

        <a href="${r.url}" target="_blank" rel="noopener" class="btn-game btn-green full-width" onclick="window.addStudyXp(10, '開啟學習資源：${r.name}')">
          🚀 點此前往網站學習 (+10 XP) ↗
        </a>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".btn-fav-star").forEach(btn => {
    btn.addEventListener("click", () => {
      const rid = btn.dataset.favId;
      if (!Array.isArray(state.favoriteResources)) state.favoriteResources = [];
      if (state.favoriteResources.includes(rid)) {
        state.favoriteResources = state.favoriteResources.filter(x => x !== rid);
      } else {
        state.favoriteResources.push(rid);
      }
      saveProgress();
      renderResources();
    });
  });
}

// ==================== 7. 渲染 TAB 3: 影音・文化・最新資訊 ====================
function renderCulture() {
  const grid = document.getElementById("cultureGrid");
  grid.innerHTML = window.DEUTSCH_DATA.cultureFeed.map(item => {
    const kwHtml = item.germanKeywords.map(k => `
      <span class="kw-chip" onclick="window.speakGerman('${k.word.replace(/'/g, "\\'")}')" title="點擊聽德語發音">
        🔊 <strong>${k.word}</strong>：${k.zh}
      </span>
    `).join("");

    return `
      <div class="culture-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="section-tag">${item.tag}</span>
          <span style="font-size:0.82rem; font-weight:800; color:#64748B;">⏱️ 閱讀時間 ${item.readTime}</span>
        </div>
        <h3>${item.icon} ${item.title}</h3>
        <p style="font-size:0.92rem; color:#334155;">${item.summary}</p>

        <div>
          <strong style="font-size:0.84rem; display:block; margin-bottom:6px;">🔑 必學文化關鍵字（點擊聽發音）：</strong>
          <div class="kw-chips">${kwHtml}</div>
        </div>

        <div class="dialogue-box">
          <div class="dialogue-de">🗣️ „${item.miniDialogue.de}“</div>
          <div class="dialogue-zh">${item.miniDialogue.zh}</div>
          <button class="btn-mini-tts" onclick="window.speakGerman('${item.miniDialogue.de.replace(/'/g, "\\'")}')">🔊 朗讀情境對話</button>
        </div>

        <a href="${item.linkUrl}" target="_blank" rel="noopener" class="btn-game btn-blue" onclick="window.addStudyXp(15, '探索德國文化專欄')">
          ${item.linkText} (+15 XP) ↗
        </a>
      </div>
    `;
  }).join("");
}

// ==================== 8. 四大互動小遊戲引擎 (TAB 4) ====================
let dddDeck = [];
let dddIndex = 0;
let dddScore = 0;
let dddStreak = 0;
let dddAnswered = false;

function initDerDieDasGame() {
  const pool = window.DEUTSCH_DATA.vocabulary.slice();
  dddDeck = pool.sort(() => Math.random() - 0.5).slice(0, 10);
  dddIndex = 0;
  dddScore = 0;
  dddStreak = 0;
  renderDddQuestion();
}

function renderDddQuestion() {
  dddAnswered = false;
  const item = dddDeck[dddIndex];
  document.getElementById("dddHighScore").textContent = state.gameScores?.derdiedas?.highScore || 0;
  document.getElementById("dddStreak").textContent = dddStreak;
  document.getElementById("dddScore").textContent = dddScore;
  document.getElementById("dddProgress").textContent = `${dddIndex + 1} / ${dddDeck.length}`;

  document.getElementById("dddCategory").textContent = `${item.level} · ${item.category}`;
  document.getElementById("dddNoun").textContent = `___ ${item.noun}`;
  document.getElementById("dddNoun").style.color = "#3C3C3C";
  document.getElementById("dddZh").textContent = `（${item.zh}）`;

  document.getElementById("dddFeedback").className = "game-feedback-box hidden";
  document.getElementById("dddNextBtn").classList.add("hidden");
}

function handleDddChoice(choice) {
  if (dddAnswered) return;
  dddAnswered = true;
  const item = dddDeck[dddIndex];
  const fb = document.getElementById("dddFeedback");
  const fullWord = `${item.article} ${item.noun}`;
  speakGerman(fullWord);

  document.getElementById("dddNoun").textContent = fullWord;

  if (choice === item.article) {
    dddStreak++;
    const pts = 10 + (dddStreak >= 3 ? 5 : 0);
    dddScore += pts;
    fb.className = "game-feedback-box correct";
    fb.innerHTML = `✅ <strong>太準了！是 ${fullWord}（複數：${item.plural}）！</strong><br>💡 記憶秘訣：${item.hint}<br>🗣️ 例句：<em>${item.example}</em>`;
  } else {
    dddStreak = 0;
    fb.className = "game-feedback-box wrong";
    fb.innerHTML = `❌ <strong>差一點點！正確冠詞是【${fullWord}】（複數：${item.plural}）</strong><br>💡 記憶秘訣：${item.hint}<br>🗣️ 例句：<em>${item.example}</em>`;
  }

  document.getElementById("dddStreak").textContent = dddStreak;
  document.getElementById("dddScore").textContent = dddScore;

  const nextBtn = document.getElementById("dddNextBtn");
  nextBtn.textContent = dddIndex < dddDeck.length - 1 ? "下一題 ➔" : "🎉 結算本局成績 & 再玩一局";
  nextBtn.classList.remove("hidden");
}

// --- 遊戲 2: 單字記憶配對 (Matching) ---
let matchTiles = [];
let firstSelectedTile = null;
let matchedCount = 0;
let matchSeconds = 0;
let matchInterval = null;

function initMatchingGame() {
  if (matchInterval) clearInterval(matchInterval);
  matchSeconds = 0;
  matchedCount = 0;
  firstSelectedTile = null;
  document.getElementById("matchTimer").textContent = "0";
  document.getElementById("matchPairs").textContent = "0 / 6";
  document.getElementById("matchBestTime").textContent = state.gameScores?.matching?.bestTimeSec || "--";

  const picked = window.DEUTSCH_DATA.vocabulary.slice().sort(() => Math.random() - 0.5).slice(0, 6);
  matchTiles = [];
  picked.forEach(w => {
    matchTiles.push({
      uid: `${w.id}-de`,
      pairId: w.id,
      lang: "de",
      text: `${w.article} ${w.noun}`,
      article: w.article,
      tts: `${w.article} ${w.noun}`
    });
    matchTiles.push({
      uid: `${w.id}-zh`,
      pairId: w.id,
      lang: "zh",
      text: w.zh,
      article: w.article,
      tts: `${w.article} ${w.noun}`
    });
  });
  matchTiles.sort(() => Math.random() - 0.5);

  const board = document.getElementById("matchingBoard");
  board.innerHTML = matchTiles.map(t => `
    <div class="match-tile" data-uid="${t.uid}" data-pair="${t.pairId}" data-tts="${t.tts}">
      ${t.text}
    </div>
  `).join("");

  matchInterval = setInterval(() => {
    matchSeconds++;
    document.getElementById("matchTimer").textContent = matchSeconds;
  }, 1000);

  board.querySelectorAll(".match-tile").forEach(tileEl => {
    tileEl.addEventListener("click", () => onMatchTileClick(tileEl));
  });
}

function onMatchTileClick(tileEl) {
  if (tileEl.classList.contains("matched") || tileEl === firstSelectedTile) return;
  tileEl.classList.add("selected");

  if (!firstSelectedTile) {
    firstSelectedTile = tileEl;
    return;
  }

  const isMatch = firstSelectedTile.dataset.pair === tileEl.dataset.pair;
  if (isMatch) {
    speakGerman(tileEl.dataset.tts);
    firstSelectedTile.classList.remove("selected");
    tileEl.classList.remove("selected");
    firstSelectedTile.classList.add("matched");
    tileEl.classList.add("matched");
    firstSelectedTile = null;
    matchedCount++;
    document.getElementById("matchPairs").textContent = `${matchedCount} / 6`;

    if (matchedCount === 6) {
      clearInterval(matchInterval);
      const prevBest = state.gameScores.matching.bestTimeSec || 999;
      if (matchSeconds < prevBest) {
        state.gameScores.matching.bestTimeSec = matchSeconds;
      }
      state.gameScores.matching.playedCount = (state.gameScores.matching.playedCount || 0) + 1;
      addStudyXp(25, `完成單字配對 (${matchSeconds}秒)`);
      document.getElementById("matchBestTime").textContent = state.gameScores.matching.bestTimeSec;
    }
  } else {
    const prev = firstSelectedTile;
    firstSelectedTile = null;
    prev.classList.add("wrong-shake");
    tileEl.classList.add("wrong-shake");
    setTimeout(() => {
      prev.classList.remove("selected", "wrong-shake");
      tileEl.classList.remove("selected", "wrong-shake");
    }, 550);
  }
}

// --- 遊戲 3: Satzbau 句子重組挑戰 ---
let sbIndex = 0;
let sbScore = 0;
let sbSelectedTokens = [];
let sbAvailableTokens = [];

function initSatzbauGame() {
  sbIndex = 0;
  sbScore = 0;
  renderSatzbauQuestion();
}

function renderSatzbauQuestion() {
  const q = window.DEUTSCH_DATA.satzbauQuestions[sbIndex];
  document.getElementById("sbHighScore").textContent = state.gameScores?.satzbau?.highScore || 0;
  document.getElementById("sbScore").textContent = sbScore;
  document.getElementById("sbProgress").textContent = `${sbIndex + 1} / ${window.DEUTSCH_DATA.satzbauQuestions.length}`;
  document.getElementById("sbRuleBadge").textContent = `${q.level} · ${q.ruleTag}`;
  document.getElementById("sbPromptZh").textContent = q.zh;

  sbSelectedTokens = [];
  sbAvailableTokens = q.tokens.map((t, idx) => ({ id: `tk-${idx}`, text: t })).sort(() => Math.random() - 0.5);

  document.getElementById("sbFeedback").className = "game-feedback-box hidden";
  document.getElementById("sbNextBtn").classList.add("hidden");
  document.getElementById("sbCheckBtn").classList.remove("hidden");
  renderSatzbauTokensUI();
}

function renderSatzbauTokensUI() {
  const ansZone = document.getElementById("sbAnswerZone");
  const bankZone = document.getElementById("sbWordBank");

  ansZone.innerHTML = sbSelectedTokens.map(tk => `
    <span class="sb-token" data-tkid="${tk.id}">${tk.text}</span>
  `).join("");

  bankZone.innerHTML = sbAvailableTokens.map(tk => `
    <span class="sb-token" data-tkid="${tk.id}">${tk.text}</span>
  `).join("");

  ansZone.querySelectorAll(".sb-token").forEach(el => {
    el.addEventListener("click", () => {
      const idx = sbSelectedTokens.findIndex(x => x.id === el.dataset.tkid);
      if (idx > -1) {
        const [removed] = sbSelectedTokens.splice(idx, 1);
        sbAvailableTokens.push(removed);
        renderSatzbauTokensUI();
      }
    });
  });

  bankZone.querySelectorAll(".sb-token").forEach(el => {
    el.addEventListener("click", () => {
      const idx = sbAvailableTokens.findIndex(x => x.id === el.dataset.tkid);
      if (idx > -1) {
        const [picked] = sbAvailableTokens.splice(idx, 1);
        sbSelectedTokens.push(picked);
        speakGerman(picked.text);
        renderSatzbauTokensUI();
      }
    });
  });
}

function checkSatzbauAnswer() {
  const q = window.DEUTSCH_DATA.satzbauQuestions[sbIndex];
  const userSentence = sbSelectedTokens.map(x => x.text).join(" ");
  const correctSentence = q.tokens.join(" ");
  const fb = document.getElementById("sbFeedback");

  speakGerman(correctSentence);

  if (userSentence === correctSentence) {
    sbScore += 15;
    fb.className = "game-feedback-box correct";
    fb.innerHTML = `✅ <strong>完美語序！</strong> „${correctSentence}“<br>💡 文法解析：${q.explanation}`;
  } else {
    fb.className = "game-feedback-box wrong";
    fb.innerHTML = `❌ <strong>語序需要調整喔！</strong><br>✔️ 正確造句：<strong>„${correctSentence}“</strong><br>💡 文法解析：${q.explanation}`;
  }

  document.getElementById("sbScore").textContent = sbScore;
  document.getElementById("sbCheckBtn").classList.add("hidden");
  const nextBtn = document.getElementById("sbNextBtn");
  nextBtn.textContent = sbIndex < window.DEUTSCH_DATA.satzbauQuestions.length - 1 ? "下一題 ➔" : "🎉 結算成績 & 再練一次";
  nextBtn.classList.remove("hidden");
}

// --- 遊戲 4: 聽力發音選字 (Listening) ---
let listenDeck = [];
let listenIndex = 0;
let listenScore = 0;
let listenAnswered = false;

function initListeningGame() {
  listenDeck = window.DEUTSCH_DATA.vocabulary.slice().sort(() => Math.random() - 0.5).slice(0, 8);
  listenIndex = 0;
  listenScore = 0;
  renderListeningQuestion();
}

function renderListeningQuestion() {
  listenAnswered = false;
  const target = listenDeck[listenIndex];
  document.getElementById("listenHighScore").textContent = state.gameScores?.listening?.highScore || 0;
  document.getElementById("listenScore").textContent = listenScore;
  document.getElementById("listenProgress").textContent = `${listenIndex + 1} / ${listenDeck.length}`;
  document.getElementById("listenExampleHint").textContent = "💡 點擊上方藍色喇叭播放德語發音，選出正確詞彙！";

  const distractors = window.DEUTSCH_DATA.vocabulary
    .filter(w => w.id !== target.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [target, ...distractors].sort(() => Math.random() - 0.5);
  const grid = document.getElementById("listenOptionsGrid");
  grid.innerHTML = options.map(opt => `
    <button class="listen-opt-btn" data-wid="${opt.id}">
      ${opt.article} ${opt.noun} — ${opt.zh}
    </button>
  `).join("");

  document.getElementById("listenFeedback").className = "game-feedback-box hidden";
  document.getElementById("listenNextBtn").classList.add("hidden");

  grid.querySelectorAll(".listen-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => onListenOptionClick(btn.dataset.wid));
  });
}

function onListenOptionClick(chosenId) {
  if (listenAnswered) return;
  listenAnswered = true;
  const target = listenDeck[listenIndex];
  const fb = document.getElementById("listenFeedback");

  speakGerman(`${target.article} ${target.noun}. ${target.example}`);

  if (chosenId === target.id) {
    listenScore += 15;
    fb.className = "game-feedback-box correct";
    fb.innerHTML = `✅ <strong>聽力敏銳！正是【${target.article} ${target.noun} (${target.zh})】！</strong><br>🗣️ 完整例句：<em>${target.example}</em>`;
  } else {
    fb.className = "game-feedback-box wrong";
    fb.innerHTML = `❌ <strong>正確答案是【${target.article} ${target.noun} (${target.zh})】</strong><br>🗣️ 完整例句：<em>${target.example}</em>`;
  }

  document.getElementById("listenScore").textContent = listenScore;
  const nextBtn = document.getElementById("listenNextBtn");
  nextBtn.textContent = listenIndex < listenDeck.length - 1 ? "下一題 ➔" : "🎉 完成聽力挑戰 & 重新開局";
  nextBtn.classList.remove("hidden");
}

// ==================== 9. 渲染 TAB 5: 三性單字閃卡庫 ====================
function renderVocabulary() {
  const grid = document.getElementById("vocabGrid");
  const mastered = state.masteredWords || [];

  let list = window.DEUTSCH_DATA.vocabulary.slice();
  if (["der", "die", "das"].includes(currentVocabFilter)) {
    list = list.filter(w => w.article === currentVocabFilter);
  } else if (["A1", "A2"].includes(currentVocabFilter)) {
    list = list.filter(w => w.level === currentVocabFilter);
  } else if (currentVocabFilter === "unmastered") {
    list = list.filter(w => !mastered.includes(w.id));
  }

  grid.innerHTML = list.map(w => {
    const isMastered = mastered.includes(w.id);
    return `
      <div class="vocab-card gender-${w.article}">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="res-tag">${w.level} · ${w.category}</span>
            <button class="btn-mini-tts" onclick="window.speakGerman('${w.article} ${w.noun}. ${w.example.replace(/'/g, "\\'")}')">🔊 發音</button>
          </div>
          <div class="vocab-word-title ${w.article}" style="margin-top:8px;">${w.article} ${w.noun}</div>
          <div class="vocab-plural">複數：${w.plural}</div>
          <div class="vocab-zh" style="margin:6px 0;">${w.zh}</div>
          <div class="vocab-hint">💡 ${w.hint}</div>
          <div class="vocab-example" style="margin-top:8px;">„${w.example}“</div>
        </div>
        <div class="vocab-actions">
          <button class="btn-master ${isMastered ? "mastered" : ""}" data-word-id="${w.id}">
            ${isMastered ? "✅ 已熟記單字" : "☆ 標記為已熟記 (+5 XP)"}
          </button>
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".btn-master").forEach(btn => {
    btn.addEventListener("click", () => {
      const wid = btn.dataset.wordId;
      if (!Array.isArray(state.masteredWords)) state.masteredWords = [];
      if (state.masteredWords.includes(wid)) {
        state.masteredWords = state.masteredWords.filter(x => x !== wid);
        saveProgress();
      } else {
        state.masteredWords.push(wid);
        addStudyXp(5, "熟記新德語單字");
      }
      renderHeaderStats();
      renderVocabulary();
    });
  });
}

// ==================== 10. 渲染 TAB 6: 級別診斷測驗系統 ====================
let quizIndex = 0;
let quizCorrectCount = 0;
let quizStageStats = { "A1.1": 0, "A1.2": 0, "A2.1": 0, "A2.2": 0 };
let lastAssessedLevelCode = "A1.1";

function initPlacementQuiz() {
  quizIndex = 0;
  quizCorrectCount = 0;
  quizStageStats = { "A1.1": 0, "A1.2": 0, "A2.1": 0, "A2.2": 0 };
  document.getElementById("quizActiveBox").classList.remove("hidden");
  document.getElementById("quizResultBox").classList.add("hidden");
  renderQuizQuestion();
  renderQuizHistory();
}

function renderQuizQuestion() {
  const questions = window.DEUTSCH_DATA.placementQuiz;
  const q = questions[quizIndex];
  const pct = Math.round(((quizIndex + 1) / questions.length) * 100);

  document.getElementById("quizStepBadge").textContent = `第 ${quizIndex + 1} / ${questions.length} 題 · ${q.stage} 檢測`;
  document.getElementById("quizBarInner").style.width = `${pct}%`;
  document.getElementById("quizSkillLabel").textContent = `考察核心：${q.skill}`;
  document.getElementById("quizQuestionText").textContent = q.question;

  const list = document.getElementById("quizOptionsList");
  list.innerHTML = q.options.map((opt, idx) => `
    <button class="quiz-opt-btn" data-opt-idx="${idx}">${opt}</button>
  `).join("");

  document.getElementById("quizFeedbackBox").className = "game-feedback-box hidden";
  document.getElementById("btnQuizNext").classList.add("hidden");

  list.querySelectorAll(".quiz-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => onQuizAnswer(parseInt(btn.dataset.optIdx, 10)));
  });
}

function onQuizAnswer(chosenIdx) {
  const questions = window.DEUTSCH_DATA.placementQuiz;
  const q = questions[quizIndex];
  const buttons = document.querySelectorAll("#quizOptionsList .quiz-opt-btn");
  buttons.forEach(b => (b.disabled = true));

  const fb = document.getElementById("quizFeedbackBox");
  if (chosenIdx === q.correctIndex) {
    quizCorrectCount++;
    quizStageStats[q.stage] = (quizStageStats[q.stage] || 0) + 1;
    buttons[chosenIdx].classList.add("correct-choice");
    fb.className = "game-feedback-box correct";
    fb.innerHTML = `✅ <strong>回答正確！</strong><br>💡 解析：${q.explanation}`;
  } else {
    buttons[chosenIdx].classList.add("wrong-choice");
    buttons[q.correctIndex].classList.add("correct-choice");
    fb.className = "game-feedback-box wrong";
    fb.innerHTML = `❌ <strong>這題答錯囉！</strong><br>💡 解析：${q.explanation}`;
  }

  const nextBtn = document.getElementById("btnQuizNext");
  nextBtn.textContent = quizIndex < questions.length - 1 ? "下一題 ➔" : "📊 查看我的 CEFR 級別診斷報告";
  nextBtn.classList.remove("hidden");
}

function finishPlacementQuiz() {
  const total = window.DEUTSCH_DATA.placementQuiz.length;
  const score100 = Math.round((quizCorrectCount / total) * 100);

  let assessedTitle = "";
  let advice = "";
  if (score100 < 35) {
    lastAssessedLevelCode = "A1.1";
    assessedTitle = "A1.1 破冰起步階段";
    advice = "建議從本站【Step 0 發音王國】與【Step 1 A1.1 動詞變化與名詞三性】開始，並搭配《DW Nicos Weg A1》每天看 1 小節！";
  } else if (score100 < 65) {
    lastAssessedLevelCode = "A1.2";
    assessedTitle = "A1.2 初階進階階段";
    advice = "你已經掌握基礎問候與現在式！接下來請重點攻克【Step 2：第四格 Akkusativ、情態動詞框型結構與現在完成式 Perfekt】。";
  } else if (score100 < 85) {
    lastAssessedLevelCode = "A2.1";
    assessedTitle = "A2.1 中級預備探險家";
    advice = "你的 A1 基礎非常扎實！建議立即進入【Step 3：第三格 Dativ 與 weil/wenn/dass 從屬子句動詞置尾】，並開始收聽 Slow German Podcast！";
  } else {
    lastAssessedLevelCode = "A2.2";
    assessedTitle = "A2.2 準 B1 德語達人";
    advice = "太強了！你對格位變化、完成式、從屬子句與禮貌虛擬式都有極高掌握度！建議挑戰《歌德學院 A2 官方模擬試題》與閱讀《Nachrichtenleicht 簡易新聞》！";
  }

  document.getElementById("quizActiveBox").classList.add("hidden");
  const resBox = document.getElementById("quizResultBox");
  resBox.classList.remove("hidden");

  document.getElementById("resultLevelBadge").textContent = lastAssessedLevelCode;
  document.getElementById("resultTitle").textContent = `診斷結果：${assessedTitle}`;
  document.getElementById("resultScoreText").textContent = `${score100} / 100（答對 ${quizCorrectCount} / ${total} 題）`;
  document.getElementById("resultAdviceText").textContent = advice;

  document.getElementById("resultStageBreakdown").innerHTML = Object.entries(quizStageStats).map(([st, cnt]) => `
    <div style="margin-bottom:8px; font-weight:800;">
      <span>${st} 階段題目：</span>
      <strong style="color:${cnt >= 2 ? "#16A34A" : "#D97706"}">答對 ${cnt} / 3 題</strong>
    </div>
  `).join("");

  if (!Array.isArray(state.quizHistory)) state.quizHistory = [];
  state.quizHistory.unshift({
    date: new Date().toLocaleString("zh-TW", { hour12: false }),
    score: score100,
    maxScore: 100,
    assessedLevel: assessedTitle,
    weakness: advice.slice(0, 42) + "..."
  });

  addStudyXp(50, `完成級別診斷測驗 (${lastAssessedLevelCode})`);
  renderQuizHistory();
}

function renderQuizHistory() {
  const box = document.getElementById("quizHistoryList");
  const hist = state.quizHistory || [];
  if (hist.length === 0) {
    box.innerHTML = `<p style="color:#64748B;">尚無測驗紀錄，立即完成上方 12 題測驗吧！</p>`;
    return;
  }
  box.innerHTML = hist.map(h => `
    <div class="log-entry">
      <div>
        <strong>🎯 評定級別：${h.assessedLevel}</strong>
        <div style="font-size:0.84rem; color:#64748B;">🕒 ${h.date} ｜ 建議：${h.weakness}</div>
      </div>
      <span class="level-pill" style="background:#58CC02;">${h.score} 分</span>
    </div>
  `).join("");
}

// ==================== 11. 渲染 TAB 7: 學習紀錄與備份系統 ====================
function renderTracker() {
  const bGrid = document.getElementById("badgesGrid");
  bGrid.innerHTML = window.DEUTSCH_DATA.badgeCatalog.map(cat => {
    const userBadge = (state.badges || []).find(b => b.id === cat.id && b.unlocked);
    return `
      <div class="badge-item ${userBadge ? "unlocked" : ""}">
        <div class="badge-icon">${cat.icon}</div>
        <h4 style="margin:6px 0 4px;">${cat.name}</h4>
        <p style="font-size:0.78rem; color:#64748B;">${cat.desc}</p>
        ${userBadge ? `<small style="color:#D97706; font-weight:800;">✓ 解鎖於 ${userBadge.unlockedAt}</small>` : `<small>🔒 尚未解鎖</small>`}
      </div>
    `;
  }).join("");

  const logsBox = document.getElementById("studyLogsList");
  const logs = state.studyLogs || [];
  if (logs.length === 0) {
    logsBox.innerHTML = `<p style="color:#64748B;">還沒有學習日誌，在上方寫下今天的第一筆德語筆記吧！</p>`;
  } else {
    logsBox.innerHTML = logs.map(l => `
      <div class="log-entry">
        <div>
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
            <span class="res-tag">📌 ${l.category}</span>
            <span style="font-size:0.8rem; color:#64748B;">🕒 ${l.date} · 學習 ${l.durationMin} 分鐘</span>
          </div>
          <p style="font-weight:700;">${l.note}</p>
        </div>
        <span class="node-xp-tag">+${l.xpEarned || 30} XP</span>
      </div>
    `).join("");
  }
}

async function loadServerBackupsList() {
  if (!isLocalBackendConnected) return;
  try {
    const res = await fetch("/api/backups");
    if (!res.ok) return;
    const data = await res.json();
    renderBackupsListUI(data.backups || []);
  } catch (_) {}
}

function renderBackupsListUI(backups) {
  const box = document.getElementById("serverBackupsList");
  if (!box) return;
  if (!backups || backups.length === 0) {
    box.innerHTML = `<p style="font-size:0.84rem; color:#64748B;">可隨時點擊上方「⬇️ 下載我的學習紀錄 (.json 備份檔)」將進度保存在你的手機或電腦中！</p>`;
    return;
  }
  box.innerHTML = backups.map(b => `
    <div class="backup-entry">
      <span>📄 <strong>${b.name}</strong></span>
      <span style="font-size:0.8rem; color:#64748B;">${b.time} (${b.sizeKb} KB)</span>
    </div>
  `).join("");
}

async function triggerServerBackup() {
  await saveProgress();
  if (isLocalBackendConnected) {
    try {
      const res = await fetch("/api/backup", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        renderBackupsListUI(data.backups || []);
        showToast("💾 已在本地 data/backups/ 建立最新 JSON 備份檔！");
        return;
      }
    } catch (_) {}
  }
  downloadJsonBackup();
}

function downloadJsonBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `deutschquest_backup_${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("⬇️ 已下載你的個人學習紀錄 (.json 備份檔)！");
}

// ==================== 12. 綁定全域事件與初始化 ====================
function renderAll() {
  renderHeaderStats();
  renderRoadmap();
  renderResources();
  renderCulture();
  renderVocabulary();
  renderTracker();
  renderBackupsListUI([]);
}

document.addEventListener("DOMContentLoaded", () => {
  const q = DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)];
  document.getElementById("dailyQuoteDe").textContent = `„${q.de}“`;
  document.getElementById("dailyQuoteZh").textContent = q.zh;
  document.getElementById("btnSpeakQuote").addEventListener("click", () => speakGerman(q.de));

  // 點頭像切換吉祥物
  document.getElementById("avatarDisplay").addEventListener("click", () => {
    const idx = AVATARS.indexOf(state.profile.avatar);
    state.profile.avatar = AVATARS[(idx + 1) % AVATARS.length];
    saveProgress();
    renderHeaderStats();
  });

  // 點擊名稱可修改個人暱稱（讓每位訪客都能改成自己的名字）
  document.getElementById("sidebarUsername").addEventListener("click", () => {
    const newName = prompt("請輸入你的專屬學習暱稱：", state.profile.username || "德語探險家");
    if (newName && newName.trim()) {
      state.profile.username = newName.trim().slice(0, 16);
      saveProgress();
      renderHeaderStats();
      showToast(`👋 歡迎你，${state.profile.username}！`);
    }
  });

  // 分享網站連結按鈕
  const btnShare = document.getElementById("btnShareSite");
  if (btnShare) {
    btnShare.addEventListener("click", async () => {
      const shareData = {
        title: "DeutschQuest 🥨 德語從 0 到 A2 遊戲化學習基地",
        text: "分享這個超好玩的 A1-A2 德語學習網站給你！有各大網站導航、發音例句、四款小遊戲跟級別測驗！",
        url: window.location.href
      };
      if (navigator.share && window.location.protocol.startsWith("http")) {
        try { await navigator.share(shareData); return; } catch (_) {}
      }
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("🔗 已複製網站連結！快貼給朋友一起學德語吧！");
      } catch (_) {
        showToast("🔗 請直接複製瀏覽器上方網址列分享給朋友！");
      }
    });
  }

  // 重置此裝置進度按鈕
  const btnReset = document.getElementById("btnResetProgress");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (confirm("確定要將這台裝置上的學習紀錄重置（從 0 開始）嗎？建議重置前可先下載 JSON 備份檔喔！")) {
        state = getDefaultState();
        state.completedNodes = [];
        state.masteredWords = [];
        state.profile.xp = 0;
        state.profile.todayXp = 0;
        saveProgress();
        renderAll();
        showToast("🌱 已重置為全新的 0 基礎學習狀態！");
      }
    });
  }

  // 左側主選單切換
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });

  // 關卡詳情 Modal 關閉與完成切換
  document.getElementById("btnCloseModal").addEventListener("click", () => {
    document.getElementById("nodeModalBackdrop").classList.add("hidden");
  });
  document.getElementById("nodeModalBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "nodeModalBackdrop") {
      document.getElementById("nodeModalBackdrop").classList.add("hidden");
    }
  });
  document.getElementById("btnToggleNodeComplete").addEventListener("click", () => {
    if (!activeModalNodeId) return;
    if (!Array.isArray(state.completedNodes)) state.completedNodes = [];
    const idx = state.completedNodes.indexOf(activeModalNodeId);
    if (idx > -1) {
      state.completedNodes.splice(idx, 1);
      saveProgress();
      showToast("已取消關卡完成標記");
    } else {
      state.completedNodes.push(activeModalNodeId);
      addStudyXp(45, "完成學習地圖關卡");
    }
    renderRoadmap();
    openNodeModal(activeModalNodeId);
  });

  // 網站資源篩選列
  document.querySelectorAll("#resourceFilterBar .filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#resourceFilterBar .filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.dataset.filter;
      renderResources();
    });
  });

  // 單字庫篩選列
  document.querySelectorAll("#vocabFilterBar .filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#vocabFilterBar .filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentVocabFilter = chip.dataset.vfilter;
      renderVocabulary();
    });
  });

  // 四大遊戲子分頁切換
  document.querySelectorAll(".game-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".game-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".game-arena").forEach(a => a.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`arena-${btn.dataset.game}`).classList.add("active");
      if (btn.dataset.game === "matching" && matchTiles.length === 0) {
        initMatchingGame();
      }
    });
  });

  // 遊戲 1 事件綁定
  document.querySelectorAll("#arena-derdiedas .btn-gender").forEach(btn => {
    btn.addEventListener("click", () => handleDddChoice(btn.dataset.choice));
  });
  document.getElementById("dddSpeakBtn").addEventListener("click", () => {
    const item = dddDeck[dddIndex];
    if (item) speakGerman(item.noun);
  });
  document.getElementById("dddNextBtn").addEventListener("click", () => {
    if (dddIndex < dddDeck.length - 1) {
      dddIndex++;
      renderDddQuestion();
    } else {
      if (dddScore > (state.gameScores.derdiedas.highScore || 0)) {
        state.gameScores.derdiedas.highScore = dddScore;
      }
      addStudyXp(30, `完成三性冠詞挑戰 (${dddScore}分)`);
      initDerDieDasGame();
    }
  });

  // 遊戲 2 重新洗牌
  document.getElementById("btnRestartMatch").addEventListener("click", initMatchingGame);

  // 遊戲 3 事件綁定
  document.getElementById("sbSpeakBtn").addEventListener("click", () => {
    const q = window.DEUTSCH_DATA.satzbauQuestions[sbIndex];
    if (q) speakGerman(q.tokens.join(" "));
  });
  document.getElementById("sbClearBtn").addEventListener("click", renderSatzbauQuestion);
  document.getElementById("sbCheckBtn").addEventListener("click", checkSatzbauAnswer);
  document.getElementById("sbNextBtn").addEventListener("click", () => {
    if (sbIndex < window.DEUTSCH_DATA.satzbauQuestions.length - 1) {
      sbIndex++;
      renderSatzbauQuestion();
    } else {
      if (sbScore > (state.gameScores.satzbau.highScore || 0)) {
        state.gameScores.satzbau.highScore = sbScore;
      }
      addStudyXp(35, `完成 Satzbau 句子重組 (${sbScore}分)`);
      initSatzbauGame();
    }
  });

  // 遊戲 4 事件綁定
  document.getElementById("btnListenPlayNormal").addEventListener("click", () => {
    const item = listenDeck[listenIndex];
    if (item) speakGerman(`${item.article} ${item.noun}`, 0.95);
  });
  document.getElementById("btnListenPlaySlow").addEventListener("click", () => {
    const item = listenDeck[listenIndex];
    if (item) speakGerman(`${item.article} ${item.noun}`, 0.6);
  });
  document.getElementById("listenNextBtn").addEventListener("click", () => {
    if (listenIndex < listenDeck.length - 1) {
      listenIndex++;
      renderListeningQuestion();
    } else {
      if (listenScore > (state.gameScores.listening.highScore || 0)) {
        state.gameScores.listening.highScore = listenScore;
      }
      addStudyXp(30, `完成聽力辨字挑戰 (${listenScore}分)`);
      initListeningGame();
    }
  });

  // 級別診斷測驗事件
  document.getElementById("btnQuizNext").addEventListener("click", () => {
    if (quizIndex < window.DEUTSCH_DATA.placementQuiz.length - 1) {
      quizIndex++;
      renderQuizQuestion();
    } else {
      finishPlacementQuiz();
    }
  });
  document.getElementById("btnApplyAssessedLevel").addEventListener("click", () => {
    state.profile.currentLevel = lastAssessedLevelCode;
    saveProgress();
    renderHeaderStats();
    showToast(`🎉 已將你的目前等級更新為【${lastAssessedLevelCode}】！`);
  });
  document.getElementById("btnRetakeQuiz").addEventListener("click", initPlacementQuiz);

  // 學習日誌表單提交
  document.getElementById("studyLogForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const category = document.getElementById("logCategory").value;
    const durationMin = parseInt(document.getElementById("logDuration").value, 10) || 20;
    const note = document.getElementById("logNote").value.trim();
    if (!note) return;

    if (!Array.isArray(state.studyLogs)) state.studyLogs = [];
    state.studyLogs.unshift({
      id: "log-" + Date.now(),
      date: new Date().toLocaleString("zh-TW", { hour12: false }),
      category,
      durationMin,
      xpEarned: 30,
      note
    });

    document.getElementById("logNote").value = "";
    addStudyXp(30, "新增學習打卡筆記");
    renderTracker();
  });

  // 備份與匯入還原按鈕
  document.getElementById("btnTopBackup").addEventListener("click", triggerServerBackup);
  document.getElementById("btnCreateServerBackup").addEventListener("click", triggerServerBackup);
  document.getElementById("btnDownloadJson").addEventListener("click", downloadJsonBackup);
  document.getElementById("inputRestoreJson").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        state = Object.assign(getDefaultState(), imported);
        saveProgress();
        renderAll();
        showToast("✅ 成功匯入並還原 JSON 學習紀錄！");
      } catch (_) {
        showToast("❌ JSON 檔案格式不正確，無法還原");
      }
    };
    reader.readAsText(file);
  });

  // 初始化所有遊戲與測驗並載入資料
  initDerDieDasGame();
  initMatchingGame();
  initSatzbauGame();
  initListeningGame();
  initPlacementQuiz();
  loadProgress();
});
