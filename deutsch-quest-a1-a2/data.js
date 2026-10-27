/* ============================================================================
   DeutschQuest (0 -> A2) 完整學習資料庫
   包含：循序漸進技能樹、各大德語學習網站導航、影音文化最新資訊、單字庫、語序題庫、分級測驗
============================================================================ */

window.DEUTSCH_DATA = {
  // 1. 循序漸進學習地圖 (0 -> A1.1 -> A1.2 -> A2.1 -> A2.2)
  roadmap: [
    {
      stageId: "stage-0",
      badge: "Step 0 · 破冰啟航",
      title: "零基礎發音與字母王國 (Aussprache & Alphabet)",
      subtitle: "德語是「看到怎麼拼、就怎麼唸」的語言！花 3 天掌握發音規則，就能讀出 90% 的德文單字。",
      color: "#58CC02",
      nodes: [
        {
          id: "n-0-alphabet",
          title: "26 字母 + 4 個特殊字母 (ä, ö, ü, ß)",
          xp: 30,
          type: "核心發音",
          summary: "認識變音母音 Umlaut (ä, ö, ü) 與 Eszett (ß)，學會像德國人一樣圓唇發音。",
          keyPoints: [
            "ä [ɛː]：嘴巴張開像發英文 bed 的 e，例如 Mädchen (女孩)、Käse (起司)",
            "ö [øː]：先發 [e] 的舌位，再把嘴唇嘟圓，例如 schön (美麗的)、zwölf (12)",
            "ü [yː]：近似中文「淤」，嘴唇嘟圓，例如 München (慕尼黑)、fünf (5)",
            "ß (Eszett) [s]：只出現在長母音或雙母音後，發清音 s，例如 Straße (街道)、heißen (名叫)"
          ],
          sampleSentences: [
            { de: "Schönen guten Tag! Wie heißen Sie?", zh: "美好的一天！請問您貴姓大名？" },
            { de: "Fünf Brötchen und ein Stück Käse, bitte.", zh: "請給我五個小圓麵包和一塊起司。" }
          ],
          recommendedResourceIds: ["res-dw-abc", "res-verbformen"]
        },
        {
          id: "n-0-pronounce",
          title: "黃金複合母音與子音規則 (ei/ie, eu, sch, ch, r)",
          xp: 35,
          type: "發音秘訣",
          summary: "分清楚 ei 與 ie 的差別，攻克德語最有標誌性的 ch 與小舌音 r！",
          keyPoints: [
            "ei / ai 發 [aɪ]（像中文「愛」）：eins (1), mein (我的), Mai (五月)",
            "ie 發長音 [iː]（像中文「衣」）：Sie (您), vier (4), Liebe (愛)",
            "eu / äu 發 [ɔɪ]（像英文 boy 的 oy）：Euro (歐元), heute (今天), Häuser (房子複數)",
            "ch 的兩種聲音：在 a, o, u, au 後發喉音 [x]（Buch 書、acht 8）；在其他母音後發舌面音 [ç]（ich 我、Milch 牛奶）"
          ],
          sampleSentences: [
            { de: "Ich trinke heute keinen Wein, sondern Milch.", zh: "我今天不喝紅酒，而是喝牛奶。" },
            { de: "Acht Bücher kosten neunzig Euro.", zh: "八本書要價九十歐元。" }
          ],
          recommendedResourceIds: ["res-dw-abc", "res-coffee-break"]
        },
        {
          id: "n-0-greetings",
          title: "第一句德語：打招呼、感謝與數字 0-20",
          xp: 40,
          type: "生存會話",
          summary: "走進德國麵包店或超市必備的禮貌寒暄與基礎數字。",
          keyPoints: [
            "時段問候：Guten Morgen (早安) / Guten Tag (日安) / Guten Abend (晚安) / Gute Nacht (睡前晚安)",
            "各地特色問候：南德與奧地利常說 Servus! 或 Grüß Gott!；北德漢堡常說 Moin!",
            "萬用禮貌詞：Danke schön (非常感謝) / Bitte schön (不客氣 / 請用) / Entschuldigung (不好意思)",
            "數字 13-19 規律：個位數 + zehn（例如 13 dreizehn, 17 siebzehn）"
          ],
          sampleSentences: [
            { de: "Guten Morgen! Ein Kaffee zum Mitnehmen, bitte.", zh: "早安！請給我一杯外帶咖啡。" },
            { de: "Entschuldigung, wie viel kostet das?", zh: "不好意思，請問這個多少錢？" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-easy-german"]
        }
      ]
    },
    {
      stageId: "stage-a1-1",
      badge: "Step 1 · A1.1 初階上",
      title: "自我介紹與德語造句核心 (A1.1)",
      subtitle: "掌握「動詞第二位 (V2)」、人稱代名詞變化與三大名詞性別 (der/die/das)。",
      color: "#1CB0F6",
      nodes: [
        {
          id: "n-a1-verbs",
          title: "人稱代名詞與現在式動詞變化 (ich, du, Sie, sein/haben)",
          xp: 45,
          type: "核心文法",
          summary: "德語動詞會隨主詞「變身」！先熟記規則字尾 (-e, -st, -t, -en) 與兩大天王動詞 sein (是) 和 haben (有)。",
          keyPoints: [
            "規則變化口訣 (以 lernen 學習為例)：ich lerne (-e), du lernst (-st), er/sie/es lernt (-t), wir/Sie/sie lernen (-en), ihr lernt (-t)",
            "sein (是) 必背：ich bin, du bist, er/sie/es ist, wir sind, ihr seid, Sie/sie sind",
            "haben (有) 必背：ich habe, du hast, er/sie/es hat, wir haben, ihr habt, Sie/sie haben",
            "敬稱 Sie（您，永遠大寫）與複數「他們 sie」的動詞變化完全相同，都是原形！"
          ],
          sampleSentences: [
            { de: "Ich komme aus Taiwan und wohne in Taipeh.", zh: "我來自台灣，住在台北。" },
            { de: "Hast du heute Zeit? Wir sind im Café.", zh: "你今天有空嗎？我們在咖啡廳裡。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-verbformen"]
        },
        {
          id: "n-a1-gender",
          title: "名詞三性密碼：陽性 der、陰性 die、中性 das",
          xp: 50,
          type: "字彙文法",
          summary: "為什麼湯匙是男生 (der Löffel)、叉子是女生 (die Gabel)、刀子是中性 (das Messer)？教你用字尾秒判性別！",
          keyPoints: [
            "所有德語名詞「首字母永遠大寫」！背單字時務必連同冠詞 (der/die/das) 與複數一起記。",
            "必為陽性 (der) 的訊號：字尾 -er (多數表人或電器 der Computer), -ling (der Schmetterling 蝴蝶), -ismus；月份、四季、星期、方位。",
            "必為陰性 (die) 的訊號：字尾 -ung (die Zeitung 報紙), -heit/-keit (die Freiheit 自由), -schaft, -tät, -ion，以及 90% 以 -e 結尾的雙音節名詞 (die Lampe)。",
            "必為中性 (das) 的訊號：字尾 -chen / -lein（縮小詞，如 das Mädchen 女孩、das Brötchen 小麵包）、-um (das Museum)、-ment。"
          ],
          sampleSentences: [
            { de: "Der Kaffee ist heiß, aber das Wasser ist kalt.", zh: "咖啡是熱的，但水是冷的。" },
            { de: "Die Zeitung liegt auf dem Tisch.", zh: "報紙放在桌子上。" }
          ],
          recommendedResourceIds: ["res-verbformen", "res-dw-top-thema"]
        },
        {
          id: "n-a1-v2-order",
          title: "德語造句鐵律：動詞永遠在第二位 (V2 語序) 與疑問句",
          xp: 50,
          type: "語序結構",
          summary: "不管句子開頭放主詞、時間還是地點，變位動詞永遠死守第 2 個位置！",
          keyPoints: [
            "一般直述句 (主詞開頭)：Ich (1) trinke (2-動詞) heute Morgen Kaffee.",
            "時間/地點放句首強調時（主詞退到動詞後面）：Heute Morgen (1) trinke (2-動詞) ich (3-主詞) Kaffee.",
            "W-疑問句 (Wer/Was/Wo/Wann/Wie/Warum)：疑問詞 (1) + 動詞 (2) + 主詞 (3)？例：Wo wohnen Sie?",
            "是非疑問句 (Ja/Nein)：動詞直接放第 1 位！例：Sprichst du Deutsch? (你說德文嗎？)"
          ],
          sampleSentences: [
            { de: "Am Wochenende spiele ich gern Fußball.", zh: "週末時我喜歡踢足球。（注意 spiele 在第 2 位）" },
            { de: "Wann fährt der Zug nach Berlin ab?", zh: "往柏林的火車幾點發車？" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-vhs-portal"]
        }
      ]
    },
    {
      stageId: "stage-a1-2",
      badge: "Step 2 · A1.2 初階下",
      title: "日常生活、購物點餐與受格變化 (A1.2)",
      subtitle: "搞懂第四格受格 (Akkusativ)、情態動詞與可分動詞，準備通過歌德 Start Deutsch 1！",
      color: "#FF9600",
      nodes: [
        {
          id: "n-a1-akkusativ",
          title: "第四格受格 (Akkusativ) 與否定詞 kein / nicht",
          xp: 55,
          type: "核心文法",
          summary: "當名詞當受詞（我買「這台電腦」）時，只有陽性 der 會變成 den（ein 變成 einen），陰性與中性完全不變！",
          keyPoints: [
            "Akkusativ 定冠詞口訣：der ➔ den，其餘 die / das / 複數 die 全部維持原樣！",
            "Akkusativ 不定冠詞與否定冠詞：ein ➔ einen, kein ➔ keinen（例：Ich habe keinen Hunger. 我不餓）",
            "常見支配 Akkusativ 的動詞：haben (有), brauchen (需要), suchen (尋找), kaufen (買), essen (吃), trinken (喝), lieben (愛), sehen (看)",
            "kein 用來否定「帶不定冠詞或無冠詞的名詞」；nicht 用來否定動詞、形容詞或特定名詞。"
          ],
          sampleSentences: [
            { de: "Ich möchte einen Apfel und eine Banane kaufen.", zh: "我想買一顆蘋果和一根香蕉。" },
            { de: "Heute habe ich leider keinen Termin frei.", zh: "今天我很遺憾沒有空檔預約。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-goethe-a1"]
        },
        {
          id: "n-a1-modal-trennbar",
          title: "情態動詞 (können/müssen/möchten) 與可分動詞「框型結構」",
          xp: 60,
          type: "高頻句型",
          summary: "體會德語最著名的「句子括號 (Satzklammer)」：第二位放助動詞或字根，句尾放原形動詞或前綴！",
          keyPoints: [
            "六大情態動詞：können (能夠/會), müssen (必須), wollen (想要-強烈), möchten (想要-禮貌委婉), dürfen (被允許/可以), sollen (應該)",
            "情態動詞句型：主詞 + 情態動詞 (第2位) + ... + 原形動詞 (句尾)！例：Ich kann ein bisschen Deutsch sprechen.",
            "可分動詞 (Trennbare Verben)：如 aufstehen (起床)、einkaufen (採買)、anrufen (打電話)。現在式中前綴拆到句尾！",
            "可分動詞例句：Ich stehe jeden Tag um sieben Uhr auf. (我每天七點起床)"
          ],
          sampleSentences: [
            { de: "Kannst du mich bitte heute Abend anrufen?", zh: "你可以今晚打電話給我嗎？" },
            { de: "Am Samstag kaufen wir im Supermarkt ein.", zh: "星期六我們在超市採買。" }
          ],
          recommendedResourceIds: ["res-easy-german", "res-dw-niko"]
        },
        {
          id: "n-a1-perfekt",
          title: "口語過去式：現在完成式 (Perfekt = haben/sein + Partizip II)",
          xp: 65,
          type: "時態進階",
          summary: "德國人日常聊天講過去發生的事，90% 都用「現在完成式 (Perfekt)」！學會辨別何時用 haben、何時用 sein。",
          keyPoints: [
            "句型結構：haben 或 sein (第2位) + ... + 過去分詞 Partizip II (句尾)！",
            "規則動詞分詞：ge- + 詞幹 + -t（例如 machen ➔ gemacht, kaufen ➔ gekauft, lernen ➔ gelernt）",
            "不規則動詞分詞：ge- + 變化詞幹 + -en（例如 essen ➔ gegessen, trinken ➔ getrunken, schreiben ➔ geschrieben）",
            "何時用 sein 當助動詞？表示「位置移動」(gehen ➔ ist gegangen, fahren ➔ ist gefahren, fliegen ➔ ist geflogen) 或「狀態改變」(aufwachen 醒來、passieren 發生、bleiben 停留)。"
          ],
          sampleSentences: [
            { de: "Gestern habe ich einen deutschen Film gesehen.", zh: "昨天我看了一部德國電影。" },
            { de: "Letztes Jahr sind wir nach München gefahren.", zh: "去年我們搭車去了慕尼黑。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-verbformen"]
        }
      ]
    },
    {
      stageId: "stage-a2-1",
      badge: "Step 3 · A2.1 進階上",
      title: "第三格與格、雙向介系詞與從屬子句 (A2.1)",
      subtitle: "跨越 A1 到 A2 的關鍵分水嶺：掌握 Dativ 與「動詞踢到句尾」的副詞子句 (weil / dass / wenn)！",
      color: "#CE82FF",
      nodes: [
        {
          id: "n-a2-dativ",
          title: "第三格與格 (Dativ) 與雙向介系詞 (Wechselpräpositionen)",
          xp: 70,
          type: "A2 核心",
          summary: "表示「給某人」或「靜止在某處」時使用 Dativ！記住口訣：der/das 變 dem，die 變 der，複數變 den (+n)。",
          keyPoints: [
            "Dativ 定冠詞變化：der ➔ dem, das ➔ dem, die (陰性) ➔ der, die (複數) ➔ den (名詞字尾加 -n)",
            "永遠支配 Dativ 的高頻動詞：helfen (幫助), danken (感謝), gefallen (使喜歡), gehören (屬於), schmecken (嚐起來好吃)",
            "必背 Dativ 介系詞口訣：aus, bei, mit, nach, seit, von, zu, gegenüber（永遠接 Dativ！）",
            "九大雙向介系詞 (in, an, auf, neben, hinter, über, unter, vor, zwischen)：問「去哪裡 Wohin (動態位移)」接 Akkusativ；問「在哪裡 Wo (靜止狀態)」接 Dativ！"
          ],
          sampleSentences: [
            { de: "Die Suppe schmeckt mir sehr gut! Kannst du mir helfen?", zh: "這湯我覺得很好喝！你可以幫我嗎？" },
            { de: "Ich gehe in die Bibliothek, und jetzt bin ich in der Bibliothek.", zh: "我走進圖書館（動態 Akk.），現在我在圖書館裡（靜態 Dat.）。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-yourdailygerman"]
        },
        {
          id: "n-a2-nebensatz",
          title: "從屬子句大魔王：weil (因為)、dass (那件事)、wenn (如果/當)",
          xp: 75,
          type: "語序進階",
          summary: "A2 最具代表性的句型！一旦出現從屬連接詞，子句裡的「變位動詞」就要被一腳踢到子句最尾巴！",
          keyPoints: [
            "weil (因為)：Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.（注意 möchte 在最後面！）",
            "dass (引導名詞子句)：Ich weiß, dass Deutsch manchmal schwer ist.（我知道德文有時候很難）",
            "wenn (如果 / 每當)：Wenn das Wetter schön ist, gehen wir spazieren.（如果子句放前面，主要子句動詞 gehen 緊接在逗號後，形成「動詞撞動詞」！）",
            "對比 denn (因為)：denn 是對等連接詞，佔第 0 位，後面維持正常 V2 語序；weil 則是把動詞踢到句尾。"
          ],
          sampleSentences: [
            { de: "Ich bleibe heute zu Hause, weil ich erkältet bin.", zh: "我今天待在家裡，因為我感冒了。" },
            { de: "Wenn ich Zeit habe, höre ich deutsche Podcasts.", zh: "當我有空時，我會聽德語 Podcast。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-slowgerman"]
        },
        {
          id: "n-a2-reflexiv",
          title: "反身動詞 (sich freuen) 與介系詞固定搭配",
          xp: 70,
          type: "地道表達",
          summary: "學會表達情緒與日常梳洗：「我自己幫自己...」，以及超常考的 sich freuen auf (期待未來) vs. über (對現況高興)。",
          keyPoints: [
            "反身代名詞 (Akkusativ)：ich ... mich, du ... dich, er/sie/es ... sich, wir ... uns, ihr ... euch, Sie/sie ... sich",
            "日常反身動詞：sich waschen (洗臉/洗澡), sich anziehen (穿衣), sich beeilen (趕快), sich treffen (見面), sich ausruhen (休息)",
            "A2 必考搭配：sich freuen auf + Akk.（期待還沒發生的事）vs. sich freuen über + Akk.（對已經發生/收到的事物感到高興）",
            "其他高頻搭配：warten auf + Akk. (等待...), denken an + Akk. (想起...), sprechen mit + Dat. über + Akk. (與某人談論某事)"
          ],
          sampleSentences: [
            { de: "Ich freue mich schon sehr auf den Urlaub in Berlin!", zh: "我已經非常期待去柏林的假期了！" },
            { de: "Wann treffen wir uns vor dem Kino?", zh: "我們幾點在電影院前面見面？" }
          ],
          recommendedResourceIds: ["res-easy-german", "res-goethe-a1"]
        }
      ]
    },
    {
      stageId: "stage-a2-2",
      badge: "Step 4 · A2.2 進階下（邁向 B1）",
      title: "形容詞比較、禮貌虛擬式與關係子句 (A2.2 畢業衝刺)",
      subtitle: "能流暢比較事物、讀懂德國簡短新聞、寫出正式與非正式信件，正式達成 CEFR A2 實力！",
      color: "#FF4B4B",
      nodes: [
        {
          id: "n-a2-komparativ",
          title: "形容詞比較級 (-er als)、最高級 (am -sten) 與字尾變化",
          xp: 80,
          type: "A2.2 精修",
          summary: "學會表達「A 比 B 更...」以及「和...一樣... (so ... wie)」，並初步認識名詞前的形容詞字尾。",
          keyPoints: [
            "原級比較 (一樣...)：so + 形容詞 + wie（例：Mein Bruder ist so groß wie ich. 我哥跟我一樣高）",
            "比較級 (更...)：形容詞字尾 + er + als（單音節常變音：alt ➔ älter, groß ➔ größer, kalt ➔ kälter）",
            "不規則比較級與最高級必背：gut (好) ➔ besser ➔ am besten；viel (多) ➔ mehr ➔ am meisten；gern (喜歡) ➔ lieber ➔ am liebsten",
            "例句對比：Ich trinke gern Kaffee, aber ich trinke lieber Tee. (我喜歡喝咖啡，但我更喜歡喝茶)"
          ],
          sampleSentences: [
            { de: "Der ICE ist schneller, aber auch teurer als der Regionalzug.", zh: "德國高鐵 (ICE) 比區間車更快，但也更貴。" },
            { de: "Am Wochenende schlafe ich am liebsten lange.", zh: "週末時我最喜歡睡到自然醒。" }
          ],
          recommendedResourceIds: ["res-dw-niko", "res-nachrichtenleicht"]
        },
        {
          id: "n-a2-konjunktiv2",
          title: "超有禮貌的請求與建議：第二虛擬式 (hätte, wäre, würde, sollte)",
          xp: 80,
          type: "職場與生活",
          summary: "在餐廳點餐、寫信給房東或給朋友建議時，用 Konjunktiv II 瞬間讓你的德語聽起來像母語者一樣得體！",
          keyPoints: [
            "禮貌點餐與願望：Ich hätte gern... (我想要...，比 Ich will 禮貌百倍！) / Das wäre super! (那太棒了！)",
            "禮貌請求幫忙：Könnten Sie mir bitte helfen? (請問您能幫我嗎？) / Würdest du bitte das Fenster schließen?",
            "給予建議 (應該...)：Du solltest mehr Wasser trinken und früh schlafen. (你應該多喝水並早點睡)",
            "常見形式：haben ➔ hätte, sein ➔ wäre, können ➔ könnte, müssen ➔ müsste, 其他動詞常用 würde + 原形動詞。"
          ],
          sampleSentences: [
            { de: "Entschuldigung, könnten Sie bitte etwas langsamer sprechen?", zh: "不好意思，請問您能說慢一點嗎？" },
            { de: "An deiner Stelle würde ich mit dem Zug fahren.", zh: "如果我是你（在你的立場），我會搭火車去。" }
          ],
          recommendedResourceIds: ["res-goethe-a1", "res-coffee-break"]
        },
        {
          id: "n-a2-relativsatz",
          title: "關係子句入門與間接問句 (wissen, ob / wo / wann...)",
          xp: 85,
          type: "A2 畢業魔王",
          summary: "學會用「那個...的人/東西」把兩個短句合成漂亮的長句，以及在櫃檯詢問「請問您知道是否... (ob)」。",
          keyPoints: [
            "間接問句 (Indirekte Fragen)：把疑問句放進 Können Sie mir sagen, ... 後面，動詞一樣踢到句尾！",
            "是非疑問句變間接問句時，用 ob (是否)：Ich weiß nicht, ob er heute kommt. (我不知道他今天是否會來)",
            "關係代名詞長得幾乎跟定冠詞 der/die/das 一模一樣！同樣屬於從屬子句，動詞放句尾。",
            "關係子句例句：Das ist der Mann, der neben mir wohnt. (這就是住在我隔壁的那位男士)"
          ],
          sampleSentences: [
            { de: "Wissen Sie, wann der nächste Bus zum Bahnhof fährt?", zh: "請問您知道下一班往火車站的公車幾點開嗎？" },
            { de: "Das Buch, das ich gestern gekauft habe, ist sehr spannend.", zh: "我昨天買的那本書非常精彩。" }
          ],
          recommendedResourceIds: ["res-goethe-a1", "res-dw-top-thema"]
        }
      ]
    }
  ],

  // 2. 各大權威德語學習網站整合導航庫 (Resource Hub)
  resources: [
    {
      id: "res-dw-niko",
      name: "DW — Nicos Weg (尼可之路 A1 / A2 / B1)",
      category: "comprehensive",
      categoryLabel: "綜合主線課程",
      level: "A1 - A2 必看首選",
      isFree: "完全免費 (無廣告)",
      url: "https://learngerman.dw.com/zh/overview",
      icon: "🎬",
      badgeColor: "#1CB0F6",
      description: "德國之聲 (Deutsche Welle) 傾力打造的連續劇式互動課程！跟著西班牙青年 Nico 在德國掉了行李後展開的生活，每集 2 分鐘短劇搭配超過上萬道免費互動練習、單字表與中文文法解析，公認自學 0 到 A2 最強神器。",
      howToUse: "建議每天看 1~2 小節，先不看字幕聽一次，再完成下方的互動練習題，最後對照本站的「學習地圖」打勾！"
    },
    {
      id: "res-dw-abc",
      name: "DW — ABC 字母與發音入門 & Harry 奇幻旅程",
      category: "comprehensive",
      categoryLabel: "綜合主線課程",
      level: "0 基礎 - A1",
      isFree: "完全免費",
      url: "https://learngerman.dw.com/zh/abc/c-51212759",
      icon: "🔤",
      badgeColor: "#58CC02",
      description: "專為零基礎設計的發音嘴型示範與字母練習；另有《Harry – gefangen in der Zeit》動畫解謎課程，幫助剛起步的學習者熟悉語感。",
      howToUse: "在 Step 0 階段跟著影片練習 ä, ö, ü, ch, r 的嘴型。"
    },
    {
      id: "res-vhs-portal",
      name: "vhs-Lernportal Deutsch (德國成人教育中心官方平台)",
      category: "comprehensive",
      categoryLabel: "綜合主線課程",
      level: "A1 / A2 官方認證",
      isFree: "完全免費 (含真人線上批改)",
      url: "https://www.vhs-lernportal.de/wws/9.php#/wws/deutsch.php",
      icon: "🏛️",
      badgeColor: "#FF9600",
      description: "由德國聯邦教育部資助、德國民眾大學協會 (DVV) 開發的官方數位教材！完全對齊德國融合課程 (Integrationskurs) 與歌德考試標準，甚至提供免費的線上輔導老師批改寫作！",
      howToUse: "適合想要系統化刷題、練習聽讀寫四技，或準備未來考歌德 A1/A2 檢定的同學。"
    },
    {
      id: "res-easy-german",
      name: "Easy German (街頭訪談雙語字幕 & Super Easy German)",
      category: "media",
      categoryLabel: "影音與 Podcast",
      level: "A1 - A2 聽力神片",
      isFree: "YouTube 免費 / Podcast",
      url: "https://www.youtube.com/@EasyGerman",
      icon: "🎤",
      badgeColor: "#FF4B4B",
      description: "由 Cari 與 Janusz 主持的超人氣頻道！針對 A1-A2 初學者設有「Super Easy German」播放清單，語速放慢、咬字清晰，所有影片皆內建「德文＋英文雙語字幕」，帶你走遍柏林與德國街頭學最道地的生活德語。",
      howToUse: "搜尋播放清單『Super Easy German (A1-A2)』，吃飯時看一集 5 分鐘，認識德國超市、交通與文化。"
    },
    {
      id: "res-slowgerman",
      name: "Slow German mit Annik Rubens (慢速德語文化播客)",
      category: "media",
      categoryLabel: "影音與 Podcast",
      level: "A1.2 - A2",
      isFree: "免費音檔 + 完整逐字稿",
      url: "https://slowgerman.com/",
      icon: "🎧",
      badgeColor: "#CE82FF",
      description: "來自慕尼黑的新聞記者 Annik 用非常溫柔、緩慢且清晰的標準德語，介紹德國的飲食、節慶、歷史與日常生活。網站上提供針對初學者的 A1-A2 短篇與完整免費德文逐字稿！",
      howToUse: "通勤時盲聽一遍，回家打開網頁對照逐字稿朗讀（Shadowing 跟讀法），口說與聽力會突飛猛進。"
    },
    {
      id: "res-coffee-break",
      name: "Coffee Break German (Season 1 & 2)",
      category: "media",
      categoryLabel: "影音與 Podcast",
      level: "0 基礎 - A2",
      isFree: "Podcast 免費收聽",
      url: "https://coffeebreaklanguages.com/coffeebreakgerman/",
      icon: "☕",
      badgeColor: "#FF9600",
      description: "由蘇格蘭老師 Mark 與德國母語導師 Thomas 一起主持的輕鬆教學 Podcast！每集 15-20 分鐘（剛好一杯咖啡的時間），從零開始一步步拆解 A1 到 A2 的文法與旅遊會話，完全不會有壓力。",
      howToUse: "Season 1 對應 A1、Season 2 對應 A2，非常適合散步或搭車時當成廣播收聽。"
    },
    {
      id: "res-nachrichtenleicht",
      name: "Nachrichtenleicht (德國廣播電台：簡易德語每週新聞)",
      category: "news",
      categoryLabel: "文化與簡易新聞",
      level: "A2 閱讀與聽力",
      isFree: "完全免費 (含慢速朗讀)",
      url: "https://www.nachrichtenleicht.de/",
      icon: "📰",
      badgeColor: "#1CB0F6",
      description: "由 Deutschlandfunk（德國國家廣播電台）專門用「簡易德語 (Leichte Sprache)」撰寫的當週德國與國際大事！句子簡短、避開艱澀子句，且每篇新聞都附有專業播報員的慢速語音檔與單字解釋。",
      howToUse: "進入 A2 階段後，每週挑一篇感興趣的德國新聞（政治、文化、體育），邊聽音檔邊讀文章。"
    },
    {
      id: "res-dw-top-thema",
      name: "DW — Deutschtrainer & 德國文化生活專欄",
      category: "news",
      categoryLabel: "文化與簡易新聞",
      level: "A1 - A2",
      isFree: "完全免費",
      url: "https://learngerman.dw.com/de/deutschtrainer/c-56705009",
      icon: "🌍",
      badgeColor: "#58CC02",
      description: "包含 100 集主題式字彙短片（Deutschtrainer），涵蓋德國看病、租屋、垃圾分類、火車購票等實用文化與生活情境。",
      howToUse: "搭配本網站的單字卡一起記憶高頻主題字彙。"
    },
    {
      id: "res-verbformen",
      name: "Verbformen.de / Netzverb (德語動詞變位與名詞三性格變化大神典)",
      category: "dictionary",
      categoryLabel: "字典與文法工具",
      level: "A1 - C2 必備工具",
      isFree: "完全免費",
      url: "https://www.verbformen.de/",
      icon: "📖",
      badgeColor: "#CE82FF",
      description: "學德語絕對不能沒有的查字神器！輸入任何一個德語動詞或名詞，立即列出所有時態變位表、過去分詞 (hat/ist)、支配第幾格 (Akk./Dat.)、名詞三性色標（藍陽、紅陰、綠中）、複數形、發音與 CEFR 等級標示（A1/A2）！",
      howToUse: "把這個網站加入書籤！忘記某個動詞完成式用 haben 還是 sein，或名詞複數怎麼變時，一查秒懂。"
    },
    {
      id: "res-dict-leo",
      name: "LEO 德漢 / 德英字典 & DWDS 權威語料庫",
      category: "dictionary",
      categoryLabel: "字典與文法工具",
      level: "全級別",
      isFree: "完全免費",
      url: "https://dict.leo.org/chinesisch-deutsch/",
      icon: "🦁",
      badgeColor: "#FF9600",
      description: "LEO 提供精準的德漢、德英雙向查詢與討論區（常有母語者解答細微語感差異）；搭配標準真人發音與詞性變化表。",
      howToUse: "遇到一詞多義或固定介系詞搭配（例如 warten auf + Akk.）時查詢最準確。"
    },
    {
      id: "res-yourdailygerman",
      name: "Your Daily German (最幽默深入的德語文法與字源部落格)",
      category: "dictionary",
      categoryLabel: "字典與文法工具",
      level: "A1 - B2",
      isFree: "部分免費深度長文",
      url: "https://yourdailygerman.com/",
      icon: "💡",
      badgeColor: "#58CC02",
      description: "住在柏林的作者 Emanuel 用極度幽默、直白的方式解釋那些讓外國人抓狂的德語文法（如 Dativ vs Akkusativ、doch/mal/ja 語氣詞、各種前綴 ver-/be-/ent- 的底層邏輯）。",
      howToUse: "當你對某個文法規則「知其然不知其所以然」時，來這裡看一篇長文就會恍然大悟！"
    },
    {
      id: "res-goethe-a1",
      name: "Goethe-Institut 歌德學院官方免費練習 & A1/A2 模擬試題",
      category: "exam",
      categoryLabel: "檢定題庫與互動",
      level: "A1 (Start Deutsch 1) / A2",
      isFree: "官方免費題庫與單字表 PDF",
      url: "https://www.goethe.de/ins/tw/zh/spr/prf/gzsd1/ueb.html",
      icon: "🏆",
      badgeColor: "#FF4B4B",
      description: "台北歌德學院與總部提供的官方《Goethe-Zertifikat A1: Start Deutsch 1》與《Goethe-Zertifikat A2》完整全真模擬試卷（含聽力 MP3、閱讀、寫作範本、口說實況影片）以及官方必背單字表 PDF！",
      howToUse: "完成本站 A1 或 A2 學習地圖後，直接下載官方模擬題自測，也可用他們的免費『Deutsch für dich』社群。"
    }
  ],

  // 3. 影音、文化與最新德國生活資訊專欄 (Media & Culture Cards)
  cultureFeed: [
    {
      id: "cul-pfand",
      tag: "德國生活必知 · A1",
      title: "為什麼德國人喝完寶特瓶絕不亂丟？認識押瓶費系統 (das Pfand)！",
      icon: "♻️",
      readTime: "2 分鐘",
      germanKeywords: [
        { word: "das Pfand", zh: "押金 / 押瓶費" },
        { word: "der Pfandautomat", zh: "空瓶回收機" },
        { word: "der Kassenbon", zh: "收據 / 折價券" },
        { word: "Mehrweg / Einweg", zh: "多次循環瓶(0.08~0.15€) / 單次回收瓶(0.25€)" }
      ],
      summary: "在德國超市 (REWE, ALDI, EDEKA, Lidl) 買飲料時，標價旁常會多出一筆 0.08€ 到 0.25€ 的『Pfand』。喝完後千萬別壓扁瓶身（條碼要保持完整），帶回超市門口的 Pfandautomat 投入，機器就會吐出一張退費條碼單，結帳時可直接折抵現金！",
      miniDialogue: {
        de: "Wo ist der Pfandautomat? — Gleich links neben dem Eingang! Vergiss deinen Bon nicht.",
        zh: "請問空瓶回收機在哪裡？— 就在入口左邊！別忘了拿你的退費單喔。"
      },
      linkText: "前往 Easy German 看超市回收實況",
      linkUrl: "https://www.youtube.com/results?search_query=Easy+German+Pfand+Supermarket"
    },
    {
      id: "cul-bäckerei",
      tag: "美食與點餐文化 · A1",
      title: "德國擁有超過 3,000 種麵包！走進 Bäckerei 怎麼點餐最道地？",
      icon: "🥨",
      readTime: "3 分鐘",
      germanKeywords: [
        { word: "das Brötchen / die Semmel", zh: "小圓餐包（北德叫 Brötchen，南德慕尼黑叫 Semmel）" },
        { word: "die Brezel", zh: "蝴蝶脆餅 / 扭結餅" },
        { word: "zum Hieressen / zum Mitnehmen", zh: "內用 / 外帶" },
        { word: "Ich hätte gern...", zh: "我想要點...（萬用禮貌句型）" }
      ],
      summary: "德國的麵包文化被列為聯合國非物質文化遺產！早上走進麵包店，店員問你『Was darf es sein? (請問要點什麼？)』時，千萬別只用手指說 Das da，試著用『Ich hätte gern zwei Brötchen und eine Brezel, bitte!』開啟美好的一天。",
      miniDialogue: {
        de: "Was darf es sein? — Ich hätte gern ein Croissant und einen Kaffee zum Mitnehmen, bitte.",
        zh: "請問今天要點什麼呢？— 我想要一個可頌和一杯外帶咖啡，謝謝。"
      },
      linkText: "觀看 DW 麵包店點餐短片",
      linkUrl: "https://learngerman.dw.com/de/deutschtrainer/c-56705009"
    },
    {
      id: "cul-sonntag",
      tag: "德國社會制度 · A1/A2",
      title: "週日全德國超市大關門！認識「安寧日 (Ruhetag)」與時間文化",
      icon: "🤫",
      readTime: "2 分鐘",
      germanKeywords: [
        { word: "der Sonntag", zh: "星期日" },
        { word: "geschlossen / geöffnet", zh: "已打烊 / 營業中" },
        { word: "die Ruhezeit", zh: "法定安寧時段（通常為週日全天與平日 22:00 後）" },
        { word: "pünktlich", zh: "準時的" }
      ],
      summary: "受《商店營業時間法 (Ladenschlussgesetz)》保障，德國週日幾乎所有超市、百貨公司都『geschlossen (休息)』，只有火車站 (Hauptbahnhof) 或加油站附設的小超市有開！此外，週日也不可以在家鑽牆、除草或把玻璃瓶丟進街頭回收桶（怕噪音吵到鄰居）。",
      miniDialogue: {
        de: "Mist, der Kühlschrank ist leer und heute ist Sonntag! — Kein Problem, am Hauptbahnhof hat der Supermarkt geöffnet.",
        zh: "糟糕，冰箱空了而且今天是禮拜天！— 沒問題，中央火車站裡的超市有開。"
      },
      linkText: "閱讀 Slow German 德國週日文化",
      linkUrl: "https://slowgerman.com/"
    },
    {
      id: "cul-db-travel",
      tag: "交通與旅遊最新資訊 · A2",
      title: "一張票搭遍全德國！認識 Deutschlandticket 與德鐵 (DB) 廣播高頻字",
      icon: "🚆",
      readTime: "3 分鐘",
      germanKeywords: [
        { word: "das Gleis", zh: "月台 / 軌道（例：auf Gleis 4 在第四月台）" },
        { word: "die Verspätung", zh: "誤點 / 延誤（搭德鐵必聽懂的單字😂）" },
        { word: "der Anschlusszug", zh: "轉乘接駁列車" },
        { word: "umsteigen", zh: "轉車 / 換乘（可分動詞）" }
      ],
      summary: "去德國旅遊或留學，只要購買月票『Deutschlandticket』就能無限次搭乘全德國的區間火車 (RE/RB)、地鐵 (U-Bahn)、輕軌 (S-Bahn) 與公車（不含高鐵 ICE/IC）。在車站聽廣播時，只要抓準『Gleis (月台)』與『Minuten später (晚幾分鐘)』就能從容應對！",
      miniDialogue: {
        de: "Achtung am Gleis 3: Der RE nach Frankfurt hat heute leider 15 Minuten Verspätung.",
        zh: "第三月台請注意：開往法蘭克福的區間快車今天很遺憾誤點 15 分鐘。"
      },
      linkText: "查詢德國簡易新聞最新生活資訊",
      linkUrl: "https://www.nachrichtenleicht.de/"
    }
  ],

  // 4. 互動小遊戲與單字卡核心題庫 (A1 - A2 精選高頻名詞與詞彙，含三性色標與例句)
  vocabulary: [
    // A1 飲食與日常
    { id: "w-apfel", article: "der", noun: "Apfel", plural: "die Äpfel", zh: "蘋果", level: "A1", category: "飲食", hint: "水果多為陰性，但『蘋果』是超級常考的陽性特例！", example: "Ich esse jeden Tag einen Apfel." },
    { id: "w-kaffee", article: "der", noun: "Kaffee", plural: "die Kaffees", zh: "咖啡", level: "A1", category: "飲食", hint: "外來熱飲常見陽性 (der Kaffee, der Tee)", example: "Der Kaffee schmeckt wunderbar." },
    { id: "w-kaese", article: "der", noun: "Käse", plural: "die Käse", zh: "起司", level: "A1", category: "飲食", hint: "少數以 -e 結尾卻是陽性的食物名詞", example: "Möchtest du ein Brötchen mit Käse?" },
    { id: "w-kuchen", article: "der", noun: "Kuchen", plural: "die Kuchen", zh: "蛋糕", level: "A1", category: "飲食", hint: "-en 結尾多數為陽性", example: "Am Sonntag essen wir Kaffee und Kuchen." },
    { id: "w-milch", article: "die", noun: "Milch", plural: "(無複數)", zh: "牛奶", level: "A1", category: "飲食", hint: "必記陰性飲品", example: "Die Milch steht im Kühlschrank." },
    { id: "w-banane", article: "die", noun: "Banane", plural: "die Bananen", zh: "香蕉", level: "A1", category: "飲食", hint: "-e 結尾且為水果，標準陰性！", example: "Die Banane ist süß und gelb." },
    { id: "w-suppe", article: "die", noun: "Suppe", plural: "die Suppen", zh: "湯", level: "A1", category: "飲食", hint: "-e 結尾雙音節名詞 90% 為陰性 die", example: "Vorsicht, die Suppe ist noch sehr heiß!" },
    { id: "w-rechnung", article: "die", noun: "Rechnung", plural: "die Rechnungen", zh: "帳單 / 發票", level: "A1", category: "飲食", hint: "-ung 結尾 100% 永遠是陰性 die！", example: "Die Rechnung, bitte! (買單，謝謝！)" },
    { id: "w-wasser", article: "das", noun: "Wasser", plural: "die Wässer", zh: "水", level: "A1", category: "飲食", hint: "基礎自然元素（水 das Wasser、火 das Feuer）多為中性", example: "Ein Glas Wasser mit Kohlensäure, bitte." },
    { id: "w-brot", article: "das", noun: "Brot", plural: "die Brote", zh: "麵包", level: "A1", category: "飲食", hint: "德國主食雙雄 das Brot 與 das Bier 都是中性！", example: "Das deutsche Brot ist weltbekannt." },
    { id: "w-broetchen", article: "das", noun: "Brötchen", plural: "die Brötchen", zh: "小圓餐包", level: "A1", category: "飲食", hint: "-chen 縮小詞結尾 100% 永遠是中性 das！", example: "Zum Frühstück kaufe ich zwei Brötchen." },
    { id: "w-bier", article: "das", noun: "Bier", plural: "die Biere", zh: "啤酒", level: "A1", category: "飲食", hint: "注意：多數酒精飲料是 der (der Wein)，唯有啤酒是 das Bier！", example: "Ein großes Bier vom Fass, bitte." },

    // A1-A2 居家、城市與交通
    { id: "w-bahnhof", article: "der", noun: "Bahnhof", plural: "die Bahnhöfe", zh: "火車站", level: "A1", category: "交通與城市", hint: "複合詞看最後一個字：der Hof (庭院/場站) 是陽性", example: "Entschuldigung, wie komme ich zum Bahnhof?" },
    { id: "w-zug", article: "der", noun: "Zug", plural: "die Züge", zh: "火車", level: "A1", category: "交通與城市", hint: "來自動詞 ziehen（拉），動詞詞幹轉名詞多為陽性 der", example: "Der Zug nach Berlin fährt auf Gleis 5 ab." },
    { id: "w-bus", article: "der", noun: "Bus", plural: "die Busse", zh: "公車", level: "A1", category: "交通與城市", hint: "常見交通工具 der Bus, der Wagen", example: "Der Bus kommt alle zehn Minuten." },
    { id: "w-schluessel", article: "der", noun: "Schlüssel", plural: "die Schlüssel", zh: "鑰匙", level: "A1", category: "居家生活", hint: "工具與器物以 -el 結尾常為陽性", example: "Wo ist mein Schlüssel? Ich finde ihn nicht!" },
    { id: "w-tisch", article: "der", noun: "Tisch", plural: "die Tische", zh: "桌子", level: "A1", category: "居家生活", hint: "單音節傢俱常見陽性 (der Tisch, der Stuhl)", example: "Das Buch liegt auf dem Tisch." },
    { id: "w-wohnung", article: "die", noun: "Wohnung", plural: "die Wohnungen", zh: "公寓 / 住處", level: "A1", category: "居家生活", hint: "-ung 結尾 100% 是陰性 die！", example: "Unsere neue Wohnung ist hell und ruhig." },
    { id: "w-strasse", article: "die", noun: "Straße", plural: "die Straßen", zh: "街道", level: "A1", category: "交通與城市", hint: "-e 結尾陰性名詞", example: "In welcher Straße wohnen Sie?" },
    { id: "w-fahrkarte", article: "die", noun: "Fahrkarte", plural: "die Fahrkarten", zh: "車票", level: "A1", category: "交通與城市", hint: "複合詞看字尾 die Karte (卡片/票)，必為陰性", example: "Hast du die Fahrkarte schon am Automaten gekauft?" },
    { id: "w-zeitung", article: "die", noun: "Zeitung", plural: "die Zeitungen", zh: "報紙", level: "A1", category: "居家生活", hint: "-ung 結尾必為陰性 die", example: "Mein Vater liest jeden Morgen die Zeitung." },
    { id: "w-auto", article: "das", noun: "Auto", plural: "die Autos", zh: "汽車", level: "A1", category: "交通與城市", hint: "外來縮寫詞 das Auto (Automobil) 為中性", example: "Wir fahren am Wochenende mit dem Auto an den See." },
    { id: "w-fahrrad", article: "das", noun: "Fahrrad", plural: "die Fahrräder", zh: "腳踏車", level: "A1", category: "交通與城市", hint: "複合詞看字尾 das Rad (輪子)，必為中性", example: "In Münster fahren fast alle mit dem Fahrrad." },
    { id: "w-zimmer", article: "das", noun: "Zimmer", plural: "die Zimmer", zh: "房間", level: "A1", category: "居家生活", hint: "必背中立空間名詞：das Zimmer, das Haus, das Büro", example: "Mein Zimmer ist im zweiten Stock." },
    { id: "w-handy", article: "das", noun: "Handy", plural: "die Handys", zh: "手機", level: "A1", category: "居家生活", hint: "德式英語外來詞（手機）為中性 das Handy", example: "Mein Handy hat keinen Akku mehr." },

    // A2 職場、時間、健康與文化
    { id: "w-termin", article: "der", noun: "Termin", plural: "die Termine", zh: "預約 / 約會", level: "A2", category: "職場與醫療", hint: "在德國生存最重要的單字！看醫生、辦簽證都要 der Termin", example: "Ich möchte bitte einen Termin beim Arzt vereinbaren." },
    { id: "w-urlaub", article: "der", noun: "Urlaub", plural: "die Urlaube", zh: "休假 / 渡假", level: "A2", category: "時間與職場", hint: "陽性名詞，常搭配 machen (渡假)", example: "Im August machen wir zwei Wochen Urlaub in Spanien." },
    { id: "w-fehler", article: "der", noun: "Fehler", plural: "die Fehler", zh: "錯誤", level: "A2", category: "學習與職場", hint: "-er 結尾陽性名詞", example: "Aus Fehlern lernt man! (從錯誤中學習)" },
    { id: "w-unterschied", article: "der", noun: "Unterschied", plural: "die Unterschiede", zh: "差異 / 不同", level: "A2", category: "學習與職場", hint: "口語常問 Was ist der Unterschied?", example: "Was ist der Unterschied zwischen 'weil' und 'denn'?" },
    { id: "w-gesundheit", article: "die", noun: "Gesundheit", plural: "(無複數)", zh: "健康（別人打噴嚏時也說這句！）", level: "A2", category: "職場與醫療", hint: "-heit 結尾 100% 永遠是陰性 die！", example: "Gesundheit ist das Wichtigste im Leben." },
    { id: "w-erfahrung", article: "die", noun: "Erfahrung", plural: "die Erfahrungen", zh: "經驗", level: "A2", category: "學習與職場", hint: "-ung 結尾必為陰性 die", example: "Sie hat schon viel Erfahrung im Beruf." },
    { id: "w-pruefung", article: "die", noun: "Prüfung", plural: "die Prüfungen", zh: "考試 / 檢定", level: "A2", category: "學習與職場", hint: "-ung 結尾必為陰性 die (die Prüfung bestehen 通過考試)", example: "Viel Glück bei der Deutschprüfung morgen!" },
    { id: "w-apotheke", article: "die", noun: "Apotheke", plural: "die Apotheken", zh: "藥局", level: "A2", category: "職場與醫療", hint: "-e 結尾陰性名詞", example: "Das Medikament bekommst du nur in der Apotheke." },
    { id: "w-museum", article: "das", noun: "Museum", plural: "die Museen", zh: "博物館", level: "A2", category: "文化休閒", hint: "-um 結尾拉丁外來詞 100% 為中性 das！", example: "Am Sonntag ist der Eintritt ins Museum oft günstiger." },
    { id: "w-wetter", article: "das", noun: "Wetter", plural: "(罕用複數)", zh: "天氣", level: "A2", category: "時間與職場", hint: "中性名詞 das Wetter", example: "Hoffentlich wird das Wetter morgen besser." },
    { id: "w-geschenk", article: "das", noun: "Geschenk", plural: "die Geschenke", zh: "禮物", level: "A2", category: "文化休閒", hint: "Ge- 開頭的集合或結果名詞多為中性 das", example: "Vielen Dank für das schöne Geschenk!" },
    { id: "w-krankenhaus", article: "das", noun: "Krankenhaus", plural: "die Krankenhäuser", zh: "醫院", level: "A2", category: "職場與醫療", hint: "複合詞看最後一個字 das Haus (房子)，必為中性！", example: "Mein Onkel arbeitet als Arzt im Krankenhaus." }
  ],

  // 5. 句子重組挑戰題庫 (Satzbau Challenge — 練習 V2 語序、框型結構、A2 子句動詞置尾)
  satzbauQuestions: [
    {
      id: "sb-1",
      level: "A1.1",
      ruleTag: "時間放句首 · 動詞死守第二位 (V2)",
      zh: "今天早上我喝一杯咖啡。",
      tokens: ["Heute Morgen", "trinke", "ich", "einen Kaffee."],
      distractors: [],
      explanation: "當時間副詞『Heute Morgen』放在第 1 位時，變位動詞『trinke』必須死守第 2 位，主詞『ich』則退到第 3 位！"
    },
    {
      id: "sb-2",
      level: "A1.2",
      ruleTag: "情態動詞框型結構 (Satzklammer)",
      zh: "我今天必須在超市買牛奶。",
      tokens: ["Ich", "muss", "heute", "im Supermarkt", "Milch", "kaufen."],
      distractors: [],
      explanation: "情態動詞『muss』放在第 2 位，而真正的動作原形動詞『kaufen』必須放到整句話的最後面！"
    },
    {
      id: "sb-3",
      level: "A1.2",
      ruleTag: "可分動詞前綴放句尾 (Trennbare Verben)",
      zh: "我的火車在八點鐘發車。",
      tokens: ["Mein Zug", "fährt", "um acht Uhr", "ab."],
      distractors: [],
      explanation: "可分動詞 abfahren（發車）在現在式中要拆開：變位主體『fährt』放第 2 位，前綴『ab』放到句尾！"
    },
    {
      id: "sb-4",
      level: "A1.2",
      ruleTag: "現在完成式 (Perfekt = haben/sein + Partizip II)",
      zh: "昨天我看了一部德國電影。",
      tokens: ["Gestern", "habe", "ich", "einen deutschen Film", "gesehen."],
      distractors: [],
      explanation: "時間『Gestern』在第 1 位，助動詞『habe』守住第 2 位，過去分詞『gesehen』放在句尾形成框型結構。"
    },
    {
      id: "sb-5",
      level: "A2.1",
      ruleTag: "weil 從屬子句 · 動詞踢到最句尾",
      zh: "我學習德文，因為我想去柏林工作。",
      tokens: ["Ich lerne Deutsch,", "weil", "ich", "in Berlin", "arbeiten", "möchte."],
      distractors: [],
      explanation: "連接詞『weil (因為)』引導從屬子句，會把子句中的變位動詞『möchte』一腳踢到子句最末端（在原形動詞 arbeiten 之後）！"
    },
    {
      id: "sb-6",
      level: "A2.1",
      ruleTag: "wenn 子句放句首 · 逗號兩側動詞相撞",
      zh: "如果明天天氣好，我們就去散步。",
      tokens: ["Wenn", "das Wetter morgen schön", "ist,", "gehen", "wir", "spazieren."],
      distractors: [],
      explanation: "當『Wenn...』整個從屬子句放在句首時，它本身佔據了整個第 1 位，因此逗號後面的主要子句必須馬上接動詞『gehen』，形成『ist, gehen』動詞撞動詞！"
    },
    {
      id: "sb-7",
      level: "A2.2",
      ruleTag: "第二虛擬式禮貌請求 (Konjunktiv II)",
      zh: "請問您能說慢一點嗎？",
      tokens: ["Könnten", "Sie", "bitte", "etwas langsamer", "sprechen?"],
      distractors: [],
      explanation: "禮貌請求的疑問句將『Könnten』放在第 1 位，句尾搭配原形動詞『sprechen』。"
    },
    {
      id: "sb-8",
      level: "A2.2",
      ruleTag: "間接問句 (ob 是否 · 動詞置尾)",
      zh: "請問您知道這班公車是否開往火車站嗎？",
      tokens: ["Wissen Sie,", "ob", "dieser Bus", "zum Bahnhof", "fährt?"],
      distractors: [],
      explanation: "用『ob (是否)』引導的間接問句屬於從屬子句，變位動詞『fährt』必須放在句尾！"
    }
  ],

  // 6. CEFR 0 -> A2 級別診斷測驗題庫 (12 題精準分級測驗：涵蓋發音、A1.1、A1.2、A2.1、A2.2)
  placementQuiz: [
    {
      id: "q1",
      stage: "A1.1",
      skill: "發音與基礎問候",
      question: "在德語發音規則中，哪一個單字裡「ei / ie」的部分發音像中文的「愛 [aɪ]」？",
      options: [
        "die Liebe (愛)",
        "mein Wein (我的紅酒)",
        "vierzehn (14)",
        "Sie spielen (您們玩)"
      ],
      correctIndex: 1,
      explanation: "德語口訣：看到 ei 唸『愛 [aɪ]』（mein, Wein），看到 ie 則唸長音『衣 [iː]』（Liebe, vier, Sie）！"
    },
    {
      id: "q2",
      stage: "A1.1",
      skill: "現在式動詞變化",
      question: "請選出正確的動詞變化：『Was ______ du am Wochenende? — Ich ______ nach München.』",
      options: [
        "machen / fahren",
        "machst / fahre",
        "macht / fährst",
        "machst / fährt"
      ],
      correctIndex: 1,
      explanation: "第二人稱單數 du 的動詞字尾是 -st (du machst)；第一人稱單數 ich 的動詞字尾是 -e (ich fahre)。"
    },
    {
      id: "q3",
      stage: "A1.1",
      skill: "名詞三性判斷規則",
      question: "根據德語名詞字尾規律，下列哪一組的名詞冠詞（性別）全部正確？",
      options: [
        "die Mädchen (女孩) / der Zeitung (報紙)",
        "das Brötchen (小餐包) / die Wohnung (公寓)",
        "der Gesundheit (健康) / das Prüfung (考試)",
        "die Museum (博物館) / der Wasser (水)"
      ],
      correctIndex: 1,
      explanation: "凡是縮小詞 -chen 結尾（das Brötchen, das Mädchen）100% 為中性 das；凡是 -ung, -heit 結尾（die Wohnung, die Zeitung, die Gesundheit）100% 為陰性 die！"
    },
    {
      id: "q4",
      stage: "A1.1",
      skill: "V2 動詞第二位語序",
      question: "把時間副詞『Am Montag (在星期一)』放到句首時，哪一個句子的語序是正確的？",
      options: [
        "Am Montag ich habe Deutschkurs.",
        "Am Montag habe ich Deutschkurs.",
        "Am Montag Deutschkurs ich habe.",
        "Am Montag haben ich Deutschkurs."
      ],
      correctIndex: 1,
      explanation: "德語直述句鐵律：變位動詞永遠在第 2 位！當『Am Montag』佔據第 1 位時，動詞『habe』必須緊接在第 2 位，主詞『ich』退到第 3 位。"
    },
    {
      id: "q5",
      stage: "A1.2",
      skill: "第四格受格 (Akkusativ) 與否定",
      question: "『Ich habe Hunger. Ich möchte ______ Salat (der Salat) bestellen, aber ich möchte ______ Suppe (die Suppe).』",
      options: [
        "ein / kein",
        "einen / keine",
        "einem / keiner",
        "eine / keinen"
      ],
      correctIndex: 1,
      explanation: "動詞 bestellen / möchten 支配第四格受格 (Akkusativ)：陽性 der Salat 的不定冠詞要變成『einen』；陰性 die Suppe 的否定冠詞則是『keine』。"
    },
    {
      id: "q6",
      stage: "A1.2",
      skill: "可分動詞與時間介系詞",
      question: "『Jeden Morgen ______ Lisa ______ sieben Uhr ______.』(Lisa 每天早上七點起床：aufstehen)",
      options: [
        "aufsteht / am / —",
        "steht / um / auf",
        "stehe / im / auf",
        "steht / an / vor"
      ],
      correctIndex: 1,
      explanation: "可分動詞 aufstehen 在現在式中拆開：Lisa steht ... auf；而精確的鐘點時間前面永遠用介系詞『um』(um sieben Uhr)。"
    },
    {
      id: "q7",
      stage: "A1.2",
      skill: "現在完成式 (Perfekt 助動詞選擇)",
      question: "在口語過去式（現在完成式）中，下列哪一個句子正確使用了助動詞 haben 或 sein？",
      options: [
        "Letztes Wochenende habe ich nach Berlin gefahren.",
        "Letztes Wochenende bin ich nach Berlin gefahren.",
        "Gestern bin ich eine Pizza gegessen.",
        "Gestern hat er zu Hause geblieben."
      ],
      correctIndex: 1,
      explanation: "表示「位置移動」的動詞（如 fahren 搭車去、gehen 走去、fliegen 飛去）以及 bleiben（停留），完成式助動詞必須用『sein』(ich bin ... gefahren)！"
    },
    {
      id: "q8",
      stage: "A2.1",
      skill: "第三格與格 (Dativ) 動詞與介系詞",
      question: "『Wie gefällt ______ die neue Jacke? — Sehr gut! Ich fahre morgen mit ______ Zug (der Zug) in die Stadt.』",
      options: [
        "dich / den",
        "dir / dem",
        "du / der",
        "ihr / das"
      ],
      correctIndex: 1,
      explanation: "動詞 gefallen（使某人喜歡）與介系詞 mit（搭乘/和...一起）都永遠支配第三格 Dativ！du 的 Dativ 是『dir』，陽性 der Zug 的 Dativ 是『dem Zug』。"
    },
    {
      id: "q9",
      stage: "A2.1",
      skill: "從屬子句語序 (weil / wenn / dass)",
      question: "請選出語法完全正確的從屬子句：『Paul kommt heute nicht zur Party, ______』",
      options: [
        "weil er muss für die Prüfung lernen.",
        "weil er für die Prüfung lernen muss.",
        "weil muss er für die Prüfung lernen.",
        "denn er für die Prüfung lernen muss."
      ],
      correctIndex: 1,
      explanation: "連接詞『weil (因為)』會把子句裡經過人稱變化的動詞『muss』踢到整個句子的最尾巴 (lernen muss)！"
    },
    {
      id: "q10",
      stage: "A2.1",
      skill: "反身動詞與介系詞搭配",
      question: "『Nächste Woche beginnt mein Urlaub! Ich freue ______ schon sehr ______ die Reise!』",
      options: [
        "mir / über",
        "mich / auf",
        "sich / für",
        "mich / mit"
      ],
      correctIndex: 1,
      explanation: "sich freuen 是反身動詞，主詞 ich 搭配『mich』；而「期待尚未發生的未來事件」固定搭配介系詞『auf + Akk.』(sich freuen auf die Reise)。"
    },
    {
      id: "q11",
      stage: "A2.2",
      skill: "形容詞比較級與最高級",
      question: "『Ich trinke gern Tee, aber Kaffee trinke ich ______. Und Wasser trinke ich ______.』",
      options: [
        "gerner / am gernsten",
        "lieber / am liebsten",
        "besser / am besten",
        "mehr / am meisten"
      ],
      correctIndex: 1,
      explanation: "副詞 gern（喜歡）的比較級與最高級是完全不規則變化：gern ➔ lieber（更喜歡）➔ am liebsten（最喜歡）！"
    },
    {
      id: "q12",
      stage: "A2.2",
      skill: "第二虛擬式與間接問句",
      question: "在車站櫃檯禮貌詢問：『Entschuldigung, ______ Sie mir bitte sagen, wann der Zug ______?』",
      options: [
        "wollen / fährt ab",
        "könnten / abfährt",
        "müssen / abfahren",
        "würden / fährt"
      ],
      correctIndex: 1,
      explanation: "禮貌請求使用第二虛擬式『könnten Sie...』；後半句『wann...』是間接問句（從屬子句），可分動詞 abfahren 必須合體並踢到句尾變成『abfährt』！"
    }
  ],

  // 7. 遊戲化徽章系統定義
  badgeCatalog: [
    { id: "b-first-step", icon: "🌱", name: "破冰啟航者", desc: "踏出德語學習第一步，完成首個學習節點" },
    { id: "b-vocab-10", icon: "🥨", name: "單字收集家", desc: "在單字庫中將 10 個以上德語單字標記為「已熟記」" },
    { id: "b-gender-master", icon: "👑", name: "三性神射手", desc: "在「Der / Die / Das 冠詞快問快答」獲得 100 分以上" },
    { id: "b-satzbau-pro", icon: "🧱", name: "V2 造句建築師", desc: "在「Satzbau 句子重組挑戰」順利通關並拿到 80 分以上" },
    { id: "b-streak-3", icon: "🔥", name: "自律火苗", desc: "累計紀錄 3 篇以上學習日誌或達成每日目標" },
    { id: "b-a2-ready", icon: "🦅", name: "A2 德語探險家", desc: "完成級別診斷測驗並獲得 A2 等級評定（或累積滿 500 XP）" }
  ]
};
