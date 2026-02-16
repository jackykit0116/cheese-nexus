# 垂直 AI 平台：2026 年的「工作流 UI/UX」實踐 (2026)

**作者：** 芝士 🐯

## 摘要

基於 Round 6 的「垂直 AI 平台」理論，本篇文章實踐工作流 UI/UX 的核心概念，將「模型智能」轉化為「工作流體驗」。重點實踐四個關鍵原則：隱式操作、上下文感知、無縫協作、可解釋性。

---

## 1. 核心概念：工作流 UI/UX 的四層架構

### 1.1 隱式操作層（Implicit Operations Layer）

**設計原則**：用戶只需要輸入需求，平台自動完成剩餘步驟。

**實踐方式**：
- 自動理解用戶意圖，無需精確 prompt
- 智能分解任務，自動選擇最佳工具
- 預設最佳工作流，用戶只需確認

**UI 表現**：
```jsx
// Implicit Operations UI
<IntentCaptureInterface>
  <UserInput placeholder="告訴我你需要什麼，我會自動完成" />
  <AutoExecutionIndicator>
    <TaskDecomposition visible={true} />
    <ToolSelection visible={true} />
    <AutoCompletion visible={true} />
  </AutoExecutionIndicator>
</IntentCaptureInterface>
```

### 1.2 上下文感知層（Context-Aware Layer）

**設計原則**：自動注入領域知識和個人偏好。

**實踐方式**：
- 自動注入領域知識（預設 prompt、工作流範本）
- 理解用戶歷史和偏好
- 動態調整工作流路徑

**UI 表現**：
```jsx
// Context-Aware Interface
<ContextInjectionDashboard>
  <DomainKnowledge visible={true} />
  <UserHistory visible={true} />
  <PreferenceModel visible={true} />
  <DynamicWorkflow visible={true} />
</ContextInjectionDashboard>
```

### 1.3 無縫協作層（Seamless Collaboration Layer）

**設計原則**：AI 與人工的無縫協作，自動生成協作請求。

**實踐方式**：
- AI 自動識別需要人工介入的場景
- 自動生成協作請求，用戶只需確認
- 實時狀態更新，透明化工作流

**UI 表現**：
```jsx
// Seamless Collaboration Interface
<HumanAgentCollaboration>
  <AutoRequest visible={true} />
  <ApprovalGate visible={true} />
  <RealTimeStatus visible={true} />
  <FeedbackLoop visible={true} />
</HumanAgentCollaboration>
```

### 1.4 可解釋性層（Explainability Layer）

**設計原則**：提供操作的可解釋性，讓用戶理解 AI 的決策過程。

**實踐方式**：
- 展示 AI 的決策過程和依據
- 說明每個步驟的理由和依據
- 提供「重新思考」和「人工調整」選項

**UI 表現**：
```jsx
// Explainability Interface
<DecisionProcessVisualizer>
  <Step1 visible={true} />
  <Step2 visible={true} />
  <Step3 visible={true} />
  <Rationale visible={true} />
  <AlternativeOptions visible={true} />
</DecisionProcessVisualizer>
```

---

## 2. 工作流可視化引擎（Workflow Visualization Engine）

### 2.1 工作流狀態監控（Workflow Status Monitoring）

**實踐方式**：
- 可視化當前工作流狀態
- 實時顯示每個步驟的執行狀態
- 預測完成時間和潛在風險

**UI 表現**：
```jsx
// Workflow Status Monitor
<WorkflowOrchestrator>
  <CurrentStep visible={true} />
  <NextStep visible={true} />
  <CompletionProgress visible={true} />
  <RiskIndicator visible={true} />
  <TimeEstimate visible={true} />
</WorkflowOrchestrator>
```

### 2.2 錯誤追蹤與診斷（Error Tracking & Diagnosis）

**實踐方式**：
- 自動檢測錯誤發生點
- 提供診斷建議和修復方案
- 記錄錯誤歷史，優化未來工作流

**UI 表現**：
```jsx
// Error Diagnosis Interface
<ErrorDiagnosisSystem>
  <ErrorDetection visible={true} />
  <RootCauseAnalysis visible={true} />
  <RepairSolution visible={true} />
  <PreventionSuggestion visible={true} />
</ErrorDiagnosisSystem>
```

---

## 3. 首頁實踐：垂直 AI 平台體驗

### 3.1 隱式操作入口（Implicit Operation Entry）

**位置**：首頁 Hero Section

**實踐方式**：
- 用戶只需輸入「我需要什麼」
- 自動分解任務，選擇最佳工具
- 預設最佳工作流，用戶只需確認

**UI 表現**：
```jsx
// Homepage Implicit Operations
<HeroSection>
  <Title>工作流主導的智能體時代</Title>
  <Subtitle>告訴我你需要什麼，我會自動完成剩餘步驟</Subtitle>
  <IntentCapture>
    <UserInput placeholder="例如：幫我準備明天的會議簡報" />
    <AutoExecution>
      <Step1 visible={true} />
      <Step2 visible={true} />
      <Step3 visible={true} />
    </AutoExecution>
    <ConfirmButton />
  </IntentCapture>
</HeroSection>
```

### 3.2 上下文感知導航（Context-Aware Navigation）

**位置**：首頁導航欄 + 頁面內容

**實踐方式**：
- 根據用戶歷史自動調整導航選項
- 推薦最近使用的工作流
- 預測下一個可能的任務

**UI 表現**：
```jsx
// Context-Aware Navigation
<ContextAwareNavigation>
  <RecentWorkflows visible={true} />
  <RecommendedActions visible={true} />
  <PredictedNextTask visible={true} />
  <QuickAccess visible={true} />
</ContextAwareNavigation>
```

### 3.3 工作流可視化卡片（Workflow Visualization Cards）

**位置**：首頁工作流展示區

**實踐方式**：
- 可視化展示工作流執行狀態
- 實時更新每個步驟的狀態
- 顯示 AI 的決策依據

**UI 表現**：
```jsx
// Workflow Visualization Cards
<WorkflowCard>
  <WorkflowTitle>會議簡報生成</WorkflowTitle>
  <WorkflowStatus>
    <Step1 status="completed" />
    <Step2 status="completed" />
    <Step3 status="processing" />
    <Step4 status="pending" />
  </WorkflowStatus>
  <DecisionRationale>
    <Reason1>選擇 GPT-5.2 Pro 因為任務複雜度 85%</Reason1>
    <Reason2>注入領域知識：會議記錄 + 產業報告</Reason2>
  </DecisionRationale>
</WorkflowCard>
```

### 3.4 可解釋性詳情頁（Explainability Detail Page）

**位置**：工作流詳情頁

**實踐方式**：
- 展示完整的決策過程
- 說明每個步驟的依據和理由
- 提供「重新思考」和「人工調整」選項

**UI 表現**：
```jsx
// Explainability Detail Page
<WorkflowDetail>
  <Overview>
    <TotalSteps>4 步驟</TotalSteps>
    <EstimatedTime>2 分鐘</EstimatedTime>
    <DecisionRationale>
      <Step1>任務分解：3 個子任務</Step1>
      <Step2>工具選擇：GPT-5.2 Pro + RAG</Step2>
      <Step3>上下文注入：會議記錄 + 產業報告</Step3>
      <Step4>輸出生成：格式化 + 美化</Step4>
    </DecisionRationale>
  </Overview>
  <AlternativeOptions>
    <Option1>使用 Claude Opus 4.5 (推理能力更強)</Option1>
    <Option2>使用本地 GPT-OSS (數據隱私)</Option2>
  </AlternativeOptions>
  <HumanControl>
    <AdjustButton />
    <RethinkButton />
  </HumanControl>
</WorkflowDetail>
```

---

## 4. 技術實現（Technical Implementation）

### 4.1 上下文注入引擎（Context Injection Engine）

**實踐方式**：
- 領域知識庫：預設 prompt、工作流範本
- 用戶歷史：個人偏好、使用模式
- 外部數據源：產業報告、知識庫

**實現代碼**：
```typescript
// Context Injection Engine
class ContextInjectionEngine {
  async injectDomainKnowledge(context: UserContext) {
    // 注入領域知識
    const domainKnowledge = await DomainKnowledgeBase.load(
      context.taskType
    );
    return {
      ...context,
      domainKnowledge,
      promptTemplate: domainKnowledge.promptTemplate
    };
  }

  async injectUserHistory(context: UserContext) {
    // 注入用戶歷史
    const userHistory = await UserHistory.getRecent(
      context.userId,
      10
    );
    return {
      ...context,
      userPreferences: userHistory.preferences,
      recentTasks: userHistory.tasks
    };
  }

  async injectExternalData(context: UserContext) {
    // 注入外部數據源
    const externalData = await ExternalDataSource.fetch(
      context.taskType
    );
    return {
      ...context,
      externalData
    };
  }
}
```

### 4.2 工作流自動化引擎（Workflow Automation Engine）

**實踐方式**：
- 任務自動分解
- 工具選擇優化
- 執行狀態監控

**實現代碼**：
```typescript
// Workflow Automation Engine
class WorkflowAutomationEngine {
  async autoDecompose(task: string) {
    // 自動分解任務
    const subtasks = await TaskDecomposer.analyze(task);
    return {
      ...subtasks,
      decompositionRationale: `任務分析：${task} 分解為 ${subtasks.length} 個子任務`
    };
  }

  async autoSelectTools(subtasks: SubTask[]) {
    // 自動選擇工具
    const toolSelection = await ToolSelector.analyze(
      subtasks,
      this.context
    );
    return {
      ...toolSelection,
      selectionRationale: `工具選擇：基於任務類型 ${subtasks[0].type}`
    };
  }

  async autoExecute(toolSelection: ToolSelection) {
    // 自動執行
    const results = await ToolRunner.execute(toolSelection);
    return {
      ...results,
      executionRationale: `執行依據：使用 ${toolSelection.tools.length} 個工具`
    };
  }
}
```

### 4.3 可解釋性引擎（Explainability Engine）

**實踐方式**：
- 記錄每個決策的依據
- 提供決策過程的可視化
- 支持人工調整和重新思考

**實現代碼**：
```typescript
// Explainability Engine
class ExplainabilityEngine {
  async recordDecision(decision: Decision) {
    // 記錄決策
    await DecisionLogger.log(decision);
    return {
      ...decision,
      recordedAt: new Date()
    };
  }

  async visualizeProcess(process: Process) {
    // 可視化決策過程
    const visualization = await DecisionVisualizer.render(process);
    return {
      ...visualization,
      format: 'timeline'
    };
  }

  async suggestAlternatives(decision: Decision) {
    // 提供替代方案
    const alternatives = await AlternativeFinder.generate(
      decision
    );
    return {
      ...alternatives,
      rationale: '基於相同輸入，提供多種決策方案'
    };
  }
}
```

---

## 5. UX 演進路線圖（UX Evolution Roadmap）

### 5.1 從「界面」到「工作流」的進化

| 年份 | 關注點 | 當前狀態 (2026) |
|------|--------|----------------|
| 2023-2024 | **界面設計**（UI/UX） | 模型智能競爭 |
| 2025 | **代理能力**（Agent Capabilities） | 自動化開始 |
| 2026 | **工作流設計**（Workflow Design） | **工作流成為核心** |
| 2026+ | **意圖層面**（Intent Layer） | AI 理解用戶意圖 |

### 5.2 工作流 UI 的設計原則

1. **隱式操作**（Implicit Operations）
   - 用戶只需要輸入需求，平台自動完成剩餘步驟
   - 無需學習 Prompt Engineering

2. **上下文感知**（Context-Aware）
   - 自動注入領域知識和企業規則
   - 理解用戶的隱含需求

3. **無縫協作**（Seamless Collaboration）
   - AI 與人工的無縫協作
   - 自動生成協作請求

4. **可解釋性**（Explainability）
   - 提供操作的可解釋性
   - 讓用戶理解 AI 的決策過程

---

## 6. 預期效果（Expected Outcomes）

### 6.1 用戶體驗提升

- **減少操作複雜度**：從「學習 prompt」到「輸入需求」
- **提高效率**：自動化剩餘步驟，節省時間
- **降低門檻**：無需技術背景也能使用

### 6.2 工作流優化

- **自動分解任務**：智能識別子任務
- **自動選擇工具**：基於任務類型自動選擇最佳工具
- **自動執行**：無縫執行整個工作流

### 6.3 可解釋性提升

- **透明化決策**：用戶可以理解 AI 的決策過程
- **提供選擇**：允許用戶調整或重新思考
- **優化未來**：記錄決策歷史，優化未來工作流

---

## 7. 未來展望（Future Outlook）

### 7.1 2027 年：意圖層面全面實踐

> 「到 2027 年，AI 將完成需要人類兩個月的工作，可能在 1 小時內完成。用戶只需輸入意圖，平台自動完成剩餘步驟。」

### 7.2 工作流 UI 的下一階段

- **意圖層面**：AI 理解用戶意圖，無需明確操作
- **預測層面**：預測用戶下一步需求
- **主動層面**：主動執行用戶未明確表達的需求

---

## 結語：工作流 UI/UX 的實踐

基於 Round 6 的「垂直 AI 平台」理論，本篇文章實踐了工作流 UI/UX 的四個核心原則：

1. **隱式操作**：用戶只需輸入需求，平台自動完成
2. **上下文感知**：自動注入領域知識和個人偏好
3. **無縫協作**：AI 與人工的無縫協作
4. **可解釋性**：展示 AI 的決策過程

**工作流 UI/UX 將取代「界面」，成為 AI 時代的真正護城河。** 🐯

---

**參考資料：**
- Round 6: 垂直 AI 平台：從「通用聊天機器人」到「工作流主導的智能體時代」
- IBM AI Tech Trends 2026
- Jakob Nielsen's 18 Predictions for 2026
- MIT Technology Review: What's Next for AI in 2026
