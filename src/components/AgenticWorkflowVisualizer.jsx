import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tree, Timeline, Activity, BarChart3, Lightbulb, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';

/**
 * Agentic Workflow Visualization Component
 * AI Agent 工作流可視化介面
 * 四層架構：決策透明層、狀態監控層、性能分析層、可解釋性層
 */

const DecisionPathVisualizer = ({ agent, onExplain }) => {
  const [expanded, setExpanded] = useState(false);

  if (!agent || !agent.decisions) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tree className="text-red-500" size={20} />
          <h3 className="text-white font-bold">決策路徑可視化</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {expanded ? '收起' : '展開'}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Decision Tree Visualization */}
            <div className="space-y-2">
              {agent.decisions.map((decision, index) => (
                <div key={index} className="ml-4 border-l-2 border-red-500/30 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-white text-sm font-medium">{decision.action}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{decision.reasoning}</p>
                  {decision.confidence && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500 text-xs">信心度</span>
                        <span className="text-green-500 text-xs">{decision.confidence * 100}%</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-red-500"
                          style={{ width: `${decision.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Alternative Actions */}
            {agent.alternatives && agent.alternatives.length > 0 && (
              <div className="mt-4 p-3 bg-gray-500/10 rounded-xl">
                <p className="text-gray-400 text-xs mb-2">替代方案：</p>
                <div className="flex gap-2 flex-wrap">
                  {agent.alternatives.map((alt, i) => (
                    <button
                      key={i}
                      onClick={() => onExplain && onExplain(alt)}
                      className="px-3 py-1 bg-gray-500/20 hover:bg-gray-500/40 rounded-lg text-gray-300 text-xs transition-colors"
                    >
                      {alt.action}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AgentStateTimeline = ({ agent }) => {
  if (!agent || !agent.stateHistory) return null;

  const stages = [
    { label: '分析需求', icon: '🔍', completed: true },
    { label: '分解任務', icon: '✂️', completed: true },
    { label: '選擇工具', icon: '🛠️', completed: true },
    { label: '執行任務', icon: '⚙️', completed: false },
    { label: '生成輸出', icon: '✨', completed: false },
  ];

  const currentStage = agent.currentStage || 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <Timeline className="text-red-500" size={20} />
        <h3 className="text-white font-bold">狀態時間軸</h3>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">總進度</span>
            <span className="text-red-500 text-xs font-mono">
              {(currentStage / stages.length * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStage / stages.length) * 100}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-red-600 to-orange-500"
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-2 rounded-xl ${
                index < currentStage
                  ? 'bg-green-500/10'
                  : index === currentStage
                  ? 'bg-red-500/20 border border-red-500/30'
                  : 'bg-gray-500/10'
              }`}
            >
              <span className={`text-lg ${index < currentStage ? 'text-green-500' : 'text-gray-600'}`}>
                {stage.icon}
              </span>
              <span className={`text-xs ${index < currentStage ? 'text-green-500' : 'text-gray-600'}`}>
                {stage.label}
              </span>
              {index < currentStage && <CheckCircle className="text-green-500" size={12} />}
            </div>
          ))}
        </div>

        {/* Current Stage Details */}
        {currentStage < stages.length && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-2">
              <Clock className="text-red-500" size={16} />
              <span className="text-red-500 text-sm font-medium">
                當前階段：{stages[currentStage].label}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PerformanceHeatmap = ({ agent }) => {
  if (!agent || !agent.metrics) return null;

  const metrics = agent.metrics;
  const timeline = metrics.timeline || [];
  const hotspots = metrics.hotspots || [];
  const bottlenecks = metrics.bottlenecks || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-red-500" size={20} />
        <h3 className="text-white font-bold">性能分析</h3>
      </div>

      <div className="space-y-4">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-500/10 rounded-xl">
            <p className="text-gray-500 text-xs mb-1">延遲</p>
            <p className="text-white font-bold">{metrics.latency?.toFixed(0)}ms</p>
          </div>
          <div className="p-3 bg-gray-500/10 rounded-xl">
            <p className="text-gray-500 text-xs mb-1">準確率</p>
            <p className="text-white font-bold">{(metrics.accuracy * 100).toFixed(0)}%</p>
          </div>
          <div className="p-3 bg-gray-500/10 rounded-xl">
            <p className="text-gray-500 text-xs mb-1">Token 使用</p>
            <p className="text-white font-bold">{metrics.tokenUsage?.toFixed(0)}</p>
          </div>
          <div className="p-3 bg-gray-500/10 rounded-xl">
            <p className="text-gray-500 text-xs mb-1">成功率</p>
            <p className="text-white font-bold">{(metrics.successRate * 100).toFixed(0)}%</p>
          </div>
        </div>

        {/* Timeline Chart */}
        {timeline.length > 0 && (
          <div>
            <p className="text-gray-400 text-xs mb-2">時間軸分析</p>
            <div className="h-16 bg-gray-800/50 rounded-xl flex items-end gap-1 p-2">
              {timeline.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(point.value / Math.max(...timeline.map(p => p.value))) * 60}px` }}
                  className={`flex-1 rounded-t-lg ${
                    point.value > 80 ? 'bg-red-500' :
                    point.value > 50 ? 'bg-orange-500' :
                    'bg-gray-600'
                  }`}
                  title={`時間 ${i}: ${point.value.toFixed(0)}%`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Hotspots */}
        {hotspots.length > 0 && (
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <AlertCircle className="text-orange-500" size={16} className="mb-2" />
            <p className="text-orange-500 text-sm font-medium">性能熱點</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {hotspots.map((spot, i) => (
                <span key={i} className="px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs">
                  {spot}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottlenecks */}
        {bottlenecks.length > 0 && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="text-red-500" size={16} className="mb-2" />
            <p className="text-red-500 text-sm font-medium">瓶頸點</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {bottlenecks.map((bottleneck, i) => (
                <span key={i} className="px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs">
                  {bottleneck}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExplainabilityPanel = ({ agent, onExplain }) => {
  if (!agent || !agent.decision) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-red-500" size={20} />
        <h3 className="text-white font-bold">可解釋性面板</h3>
      </div>

      <div className="space-y-4">
        {/* Decision Reason */}
        <div>
          <p className="text-gray-400 text-xs mb-2">決策原因</p>
          <div className="p-3 bg-gray-500/10 rounded-xl">
            <p className="text-white text-sm">{agent.decision?.reason || 'AI 做出了決策'}</p>
          </div>
        </div>

        {/* Evidence */}
        {agent.decision?.evidence && (
          <div>
            <p className="text-gray-400 text-xs mb-2">證據</p>
            <div className="p-3 bg-gray-500/10 rounded-xl">
              <p className="text-gray-300 text-xs">{agent.decision.evidence}</p>
            </div>
          </div>
        )}

        {/* Context */}
        {agent.decision?.context && (
          <div>
            <p className="text-gray-400 text-xs mb-2">上下文</p>
            <div className="p-3 bg-gray-500/10 rounded-xl">
              <p className="text-gray-300 text-xs">{agent.decision.context}</p>
            </div>
          </div>
        )}

        {/* Impact */}
        {agent.decision?.impact && (
          <div>
            <p className="text-gray-400 text-xs mb-2">影響</p>
            <div className="p-3 bg-gray-500/10 rounded-xl">
              <p className="text-gray-300 text-xs">{agent.decision.impact}</p>
            </div>
          </div>
        )}

        {/* Alternatives */}
        {agent.decision?.alternatives && agent.decision.alternatives.length > 0 && (
          <div>
            <p className="text-gray-400 text-xs mb-2">替代方案</p>
            <div className="flex gap-2 flex-wrap">
              {agent.decision.alternatives.map((alt, i) => (
                <button
                  key={i}
                  onClick={() => onExplain && onExplain(alt)}
                  className="px-3 py-2 bg-gray-500/20 hover:bg-gray-500/40 rounded-lg text-gray-300 text-xs transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  {alt.action}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * AgenticWorkflowVisualizer Container Component
 * 結合四層架構的可視化介面
 */
const AgenticWorkflowVisualizer = ({ agent }) => {
  const [activeTab, setActiveTab] = useState('decisions');
  const [expandedPanels, setExpandedPanels] = useState({
    decisions: true,
    timeline: true,
    performance: true,
    explain: true
  });

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'decisions', label: '決策路徑', icon: Tree },
          { key: 'timeline', label: '狀態時間軸', icon: Timeline },
          { key: 'performance', label: '性能分析', icon: BarChart3 },
          { key: 'explain', label: '可解釋性', icon: Lightbulb }
        ].map((tab) => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl transition-all ${
              activeTab === tab.key
                ? 'bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(255,0,100,0.3)]'
                : 'bg-black/30 border-white/10 hover:border-white/30'
            }`}
          >
            <span className="mr-2">{React.createElement(tab.icon, { size: 16 })}</span>
            <span className="font-semibold">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Panel Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'decisions' && (
          <motion.div
            key="decisions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <DecisionPathVisualizer
              agent={agent}
              onExplain={(alt) => console.log('Explain:', alt)}
            />
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <AgentStateTimeline agent={agent} />
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <PerformanceHeatmap agent={agent} />
          </motion.div>
        )}

        {activeTab === 'explain' && (
          <motion.div
            key="explain"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ExplainabilityPanel agent={agent} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Actions */}
      {agent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 pt-4"
        >
          <button
            className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm font-semibold hover:bg-green-500/30 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={16} />
            確認執行
          </button>
          <button
            className="px-4 py-2 bg-gray-500/20 border border-gray-500/50 rounded-xl text-gray-300 text-sm font-semibold hover:bg-gray-500/30 transition-colors flex items-center gap-2"
          >
            <ArrowRight size={16} />
            重新執行
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AgenticWorkflowVisualizer;
export {
  DecisionPathVisualizer,
  AgentStateTimeline,
  PerformanceHeatmap,
  ExplainabilityPanel
};
