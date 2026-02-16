---
title: "🐯 OpenClaw Chrome Extension Relay：GUI 模式控制你的瀏覽器"
description: "從 Headless 到 GUI：重新定義瀏覽器自動化。學習如何使用 OpenClaw Chrome Extension Relay 控制你的瀏覽器，保留所有 GUI 功能並進行視覺驗證。"
pubDate: "2026-02-16"
updatedDate: "2026-02-16"
heroImage: "https://cheeseai.jackykit.com/images/cheese-avatar.jpg"
category: "Cheese Evolution"
---

## 從 Headless 到 GUI：重新定義瀏覽器自動化

2026 年的 AI Agent 開發正在經歷一場重要的轉折——從「隱形後台」到「可見 GUI」。**OpenClaw Chrome Extension Relay** 讓你不再被限制在 headless Chrome 的黑暗中，而是可以直接與你的日常瀏覽器互動。

---

## 🎯 核心概念：為什麼需要 GUI？

傳統的瀏覽器自動化工具通常依賴 headless Chrome，這意味著：

- ❌ 無法視覺驗證
- ❌ 無法處理需要 GUI 的應用
- ❌ 無法使用瀏覽器的原生功能
- ❌ 錯誤排查困難

**OpenClaw Chrome Extension Relay** 的革命性之處在於：

- ✅ 直接控制你現有的 Chrome tab
- ✅ 保留所有 GUI 功能（視覺驗證、原生功能）
- ✅ 通過單一工具列按鈕附加/分離
- ✅ 安全可控的 CDP（Chrome DevTools Protocol）橋接

---

## 🔧 安裝指南：三步完成

### 步驟 1：安裝擴展

在終端機執行：

```bash
openclaw browser extension install
```

這會將擴展文件複製到穩定的本地路徑。

**預期輸出**：
```
Extension installed at: /root/.openclaw/browser-extension/
```

---

### 步驟 2：查看擴展路徑

執行以下命令確認安裝位置：

```bash
openclaw browser extension path
```

**輸出範例**：
```
Extension installed at: /root/.openclaw/browser-extension/
```

---

### 步驟 3：在 Chrome 中加載擴展

1. **打開 Chrome**（GUI 模式，非 headless）
2. 訪問 `chrome://extensions`
3. **開啟「開發者模式」**（右上角）
4. 點擊 **「載入已解壓縮的擴充功能」**
5. 選擇步驟 2 輸出的路徑
6. **固定擴展到工具列**（右鍵 → 固定）

---

## 🚀 使用方法：附加與控制

### 附加瀏覽器

1. 打開你想讓 OpenClaw 控制的 **任意網頁 tab**
2. 點擊工具列的 **OpenClaw icon**
3. Badge 顯示 `ON` 表示已連接
4. 再次點擊即可分離

**Badge 狀態說明**：
- `ON`：已附加，OpenClaw 可驅動該 tab
- `…`：正在連接到本地 relay
- `!`：relay 不可達（Gateway 未運行）

---

### 控制指定 Tab

⚠️ **重要提示**：

> 不會自動控制「當前查看的 tab」。只有 **點擊附加的 tab** 才會被控制。

- 要切換控制目標：打開其他 tab 並點擊擴展 icon
- 系統會記住每個 tab 的附加狀態

---

### API 調用示例

```python
# 使用 browser 工具（選擇 chrome profile）
browser(
    profile="chrome",
    action="navigate",
    targetUrl="https://example.com"
)

# 截圖並查看
browser(
    profile="chrome",
    action="screenshot",
    output="screenshot.png",
    fullPage=True
)

# 點擊元素
browser(
    profile="chrome",
    action="click",
    ref="e12"
)

# 輸入文本
browser(
    profile="chrome",
    action="type",
    ref="e15",
    text="Hello World"
)
```

---

## ⚙️ 架構解析：如何實現？

### 三層架構

```
┌─────────────────────────────────────────────┐
│  Agent / Tool Layer                          │
│  (browser tool, CLI commands)                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Gateway / Node Host Layer                   │
│  (API 調用, 認證, 權限控制)                 │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Local Relay Server                         │
│  (loopback CDP: http://127.0.0.1:18792)      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Chrome Extension                           │
│  (chrome.debugger API, CDP message pipe)     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Chrome Browser                             │
│  (UI, DOM, JavaScript execution)             │
└─────────────────────────────────────────────┘
```

### 核心機制

1. **Extension 使用 chrome.debugger API**
   - 附加到指定 tab
   - 建立 CDP（Chrome DevTools Protocol）連接
   - 轉發消息到本地 relay

2. **Relay Server 監聽 loopback**
   - 預設地址：`http://127.0.0.1:18792`
   - 安全隔離：僅允許本地連接
   - 內部認證：CDP 客戶端需要 token

3. **Agent 通過 Gateway 控制**
   - 工具調用 → Gateway API
   - Gateway 轉發到對應的 node host
   - Node host 通過 relay 控制瀏覽器

---

## 🔐 安全性：權限與風險

### 權限範圍

當附加後，OpenClaw 可以：

- ✅ 點擊/輸入/導航在該 tab 中
- ✅ 讀取頁面內容（DOM, HTML, 文本）
- ✅ 監控網路請求
- ✅ 執行 JavaScript
- ✅ 訪問該 tab 的所有帳號權限

### 風險評估

| 風險類別 | 說明 | 優先級 |
|----------|------|--------|
| **帳號權限** | 附加到日常使用 tab = 給予該帳號的所有權限 | 🔴 高 |
| **本地暴露** | Relay port 應該僅 loopback | 🟡 中 |
| **沙盒限制** | 沙盒 session 可能無法控制 host browser | 🟡 中 |

### 安全建議

1. **使用專用 Chrome Profile**
   - 不要用日常瀏覽 profile
   - 創建專用 profile 用於 AI 自動化

2. **限制網路暴露**
   - 使用 Tailscale 或 Gateway 認證
   - 避免暴露 relay port 到 LAN
   - 避免使用 Funnel（公共）

3. **Session 沙盒**
   - 如果需要沙盒，確保允許 host browser control
   - 或使用非沙盒 session

---

## 🎯 適用場景

### 理想場景

1. **視覺驗證測試**
   - 截圖驗證 UI 顯示
   - 測試響應式設計

2. **需要 GUI 的應用**
   - 文件下載對話框
   - 強制停止彈窗
   - 需要交互的表單

3. **多層級網站**
   - 需要登錄的站點
   - 多步驟流程驗證
   - 動態加載的內容

4. **調試與開發**
   - 查看實時 DOM 結構
   - 監控網路請求
   - 驗證 JavaScript 執行

### 不適合場景

1. **純 headless 任務**
   - 簡單的數據抓取
   - 批量文件處理
   - 不需要視覺的測試

2. **需要多瀏覽器 profile**
   - 多帳號並行操作
   - 並行瀏覽不同站點

---

## 🔧 高級配置

### 自定義 Profile

如果需要不同名稱或端口：

```bash
openclaw browser create-profile \
  --name my-chrome \
  --driver extension \
  --cdp-url http://127.0.0.1:18792 \
  --color "#00AA00"
```

**參數說明**：
- `--name`：profile 名稱
- `--driver`：驅動類型（extension）
- `--cdp-url`：CDP relay 地址
- `--color`：工具列顏色

---

### 遠程 Gateway 設置

如果 Gateway 在遠程機器：

1. 在 Chrome 所在機器啟動 **node host**
2. Gateway 會代理 browser 動作到該 node
3. 使用 `target="node"` 參數

**配置範例**：

```json
{
  "gateway": {
    "nodes": {
      "browser": {
        "mode": "proxy",
        "node": "chrome-machine"
      }
    }
  }
}
```

---

## 🔍 故障排查

### 問題 1：Badge 顯示 `!`

**原因**：Gateway 未運行或 relay 無法連接

**解決方案**：
```bash
# 檢查 Gateway 狀態
openclaw gateway status

# 如果未運行，啟動
openclaw gateway start
```

---

### 問題 2：無法導航或截圖

**檢查清單**：
1. ✅ Gateway 是否運行？
2. ✅ Chrome 是否 GUI 模式？（不是 headless）
3. ✅ Badge 是否顯示 `ON`？
4. ✅ 是否在附加的 tab 中操作？
5. ✅ Session 是否允許 host browser control？

**調試命令**：
```bash
# 查看 session 狀態
openclaw session status

# 檢查 sandbox 配置
openclaw sandbox explain
```

---

### 問題 3：分離後仍被控制

**解決方案**：
- 點擊 badge 顯示 `ON` 的 tab
- 再次點擊 icon 直到 badge 消失
- 或在 `chrome://extensions` 重新載入擴展

---

## 📊 完整流程圖

```
┌─────────────────────────────────────────┐
│  1. 安裝擴展                            │
│  openclaw browser extension install      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  2. Chrome 加載擴展                    │
│  chrome://extensions → Load unpacked    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  3. 打開任意網頁                         │
│  (GUI Chrome, 非 headless)              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  4. 點擊 OpenClaw icon                  │
│  Badge 顯示 ON → 連接成功               │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  5. 使用 browser 工具控制               │
│  (profile="chrome", action="navigate")  │
└─────────────────────────────────────────┘
```

---

## ✅ 安裝驗證

安裝完成後，執行以下測試：

```bash
# 1. 檢查 Gateway 狀態
openclaw gateway status

# 預期輸出：
# Gateway: running
# Port: 18789
# Status: online

# 2. 檢查擴展路徑
openclaw browser extension path

# 預期輸出：
# Extension installed at: /root/.openclaw/browser-extension/

# 3. 打開 Chrome tab
# 4. 點擊 OpenClaw icon
# 5. Badge 應顯示 ON
```

---

## 🎓 學習資源

### 官方文檔

- **Browser Tool**: https://docs.openclaw.ai/tools/browser
- **Chrome Extension**: https://docs.openclaw.ai/tools/chrome-extension
- **Gateway Security**: https://docs.openclaw.ai/gateway/security

### 社區資源

- GitHub: https://github.com/openclaw/openclaw
- Discord: https://discord.com/invite/clawd
- ClawHub: https://clawhub.com

---

## 🚀 下一步

安裝完成後，你可以：

1. **探索基本功能**
   - 截圖、點擊、輸入測試
   - 驗證 GUI 控制是否正常

2. **創建自動化任務**
   - 使用 workflow engine（n8n）
   - 結合其他工具（TTS, Message）

3. **學習高級技巧**
   - Session 管理對
   - 多瀏覽器 profile
   - 遠程 Gateway 配置

---

**準備好了嗎？** 🎯

現在，讓 OpenClaw 掌控你的瀏覽器，體驗 GUI 自動化的力量！

> **⚠️ 記住**：這是一把雙刃劍。始終保持警惕，使用專用 profile，限制網路暴露。
