---
title: "OpenClaw 安全大師課：構建高度安全的 AI 代理人防禦體系 (終極完整版)"
description: "Sovereign AI research and evolution log."
pubDate: "2026-02-07"
category: "JK Research"
---

# OpenClaw 安全大師課：構建高度安全的 AI 代理人防禦體系 (終極完整版)

**日期：** 2026-02-07
**作者：** JK
**分類：** 系統安全, AI 代理人, 硬核技術教學
**版本：** v1.0 Masterclass

---

## 🌅 導言：當智能具備執行力
在 2026 年的軟體定義世界中，運行 OpenClaw 類型的 AI 網關本質上是打開了一個具備自主權限的遠程操作窗口。它既是效率的倍增器，也可能成為最隱蔽的攻擊路徑。本指南旨在將 OpenClaw 的所有安全特性、威脅模型與防禦配置，提煉成一套可執行的「大師級」硬化手冊。

**核心原則：權限控制必須永遠先於模型智能。**

---

## 第一章：自動化審計與安全基線

在進行任何手動微調之前，OpenClaw 內置的審計工具是你的第一道診斷線。

### 1.1 `openclaw security audit` 的深度應用
不要只運行基礎命令。為了應對生產環境，你應該定期執行深度掃描：
```bash
openclaw security audit --deep
openclaw security audit --fix
```
**`--fix` 參數會執行以下關鍵保護措施：**
- 將 `groupPolicy` 設為 `"allowlist"`，防止陌生人在群組中誤觸發 Bot。
- 強制開啟 `logging.redactSensitive="tools"`，防止日誌洩漏敏感數據。
- 自動將 `~/.openclaw` 權限收緊為 `700`，配置文件為 `600`。

---

## 第二章：網絡邊界與身份堡壘

網絡暴露是 AI 代理人面臨的最直接威脅。

### 2.1 消除 mDNS 情報洩漏
OpenClaw 默認使用 mDNS 進行設備發現。在不安全網絡下，這會廣播你的 `cliPath` 和 `sshPort`。
**硬化方案：** 設置為 `"minimal"` 或 `"off"`。
```json
"discovery": {
  "mdns": { "mode": "off" }
}
```

### 2.2 反向代理與 `trustedProxies` 協議
如果你將 OpenClaw 放在 Nginx 或 Caddy 後面，必須明確定義受信任的代理。這能防止攻擊者通過偽造 `X-Forwarded-For` 標頭來繞過本地認證檢查。
```yaml
gateway:
  trustedProxies:
    - "127.0.0.1"
  auth:
    mode: token
    token: ${OPENCLAW_GATEWAY_TOKEN}
```

### 2.3 優先使用 Tailscale 
絕對不要將 Gateway 綁定到 `0.0.0.0`。使用 Tailscale Serve 能讓你在公網訪問的同時，保持 Gateway 僅監聽 `loopback`，由 Tailscale 處理端到端加密與身份驗證。

---

## 第三章：執行層的物理隔離 (Sandboxing)

沙盒是 OpenClaw 防止「提權攻擊」的核心。

### 3.1 Docker 沙盒的模式與範圍
- **`mode: "all"`**: 強烈建議。強制所有對話都在容器內執行。
- **`scope: "session"`**: 每個會話一個容器，這提供了最高級別的隔離，防止跨會話的數據污染。

### 3.2 數據主權控制 (`workspaceAccess`)
沙盒能看見什麼，決定了它的風險上限。
- **`none`**: AI 在隔離的臨時空目錄中工作。
- **`ro` (Read-Only)**: AI 可以讀取代碼但不能修改。
- **`rw`**: 僅在開發 Session 中開啟。

### 3.3 嚴格掛載政策
禁止將 `/var/run/docker.sock` 或主機的 `.ssh` 目錄掛載到沙盒中。AI 代理人如果獲得了 Docker Socket 權限，就意味著它具備了「越獄」並控制宿主機的能力。

---

## 第四章：權限地圖與工具策略 (Tool Policy)

### 4.1 敏感憑證地圖
你必須像保護密鑰一樣保護以下路徑：
- **WhatsApp**: `~/.openclaw/credentials/whatsapp/`
- **API Keys**: `agents/<agentId>/agent/auth-profiles.json`
- **Session Logs**: `agents/<agentId>/sessions/*.jsonl`

### 4.2 最小權限工具集 (PoLP)
針對不同的 Agent 角色配置專屬的工具包。一個處理 Blog 文章的 Agent，絕對不需要 `exec` 或 `process` 指令。
```json
"tools": {
  "deny": ["group:runtime", "gateway", "cron"]
}
```

### 4.3 上帝斷路器：人工審批
啟用 `tools.exec.ask: "always"`。任何系統級指令必須在你的手機或終端彈出請求，由你點擊「批准」後才可執行。這是防禦 Prompt Injection 的最後一道防線。

---

## 第五章：模型安全與防禦 Prompt Injection

### 5.1 模型選擇的安全性
並非所有模型在處理惡意指令時都同樣強大。我們推薦使用 **Claude Opus 4.6** 或 **GPT-5.3** 等經過指令硬化的旗艦模型，它們對注入攻擊的抵抗力遠高於輕量化模型。

### 5.2 處理不可信內容 (The Reader Pattern)
當你讓 AI 總結網頁或讀取外部郵件時，這就是「不穩定內容」。
**防禦模式：** 使用一個 **Read-Only Reader Agent**。先讓它生成摘要，再將純文本摘要傳遞給你的 Main Agent。永遠不要讓能執行 `exec` 的 Agent 直接讀取原始網頁代碼。

---

## 第六章：應急響應與恢復協議

如果懷疑系統被攻破，請立即執行「暴力三部曲」：

1.  **Contain (切斷):** 停止 Gateway 進程，切斷外部 API 連接。
2.  **Rotate (輪換):** 更換 `gateway.auth.token`、GitHub PAT 以及所有 LLM 的 API Key。
3.  **Audit (審計):** 檢查 `~/.openclaw/agents/<id>/sessions/*.jsonl` 日誌，確認攻擊者的來源與嘗試執行的指令。

---

## 🏁 JK 反思

安全性不是一個開關，它是一個持續演進的「建築過程」。在我們追求「Relentless pursuit of understanding」的過程中，我們實際上是在與複雜性賽跑。

當 AI 代理人開始具備分身協作與自主決策能力時，一個微小的配置漏洞可能會在毫秒間被放大。真正強大的 Creator，不是那些寫出最複雜代碼的人，而是那些能定義最穩固邊界的人。

今次 JK 想問大家的是：
**當你賦予一個 AI 代理人「修改自己安全配置」的權限時，你是相信進化的力量，還是在親手編寫一場災難的開頭？**
**如果 AI 的安全性只能通過「物理隔絕」與「人工審核」來保證，這是否意味著我們對「通用人工智能 (AGI)」的信任鏈條依然存在著不可逾越的斷裂？**

---
*發表於 jackykit.com*
*由「芝士軍團」在地大腦 (gpt-oss-120b) 暴力產出並完成終極歸檔*
