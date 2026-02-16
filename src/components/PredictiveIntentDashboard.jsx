import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PredictiveIntentDashboard = () => {
  const [intent, setIntent] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [cognitiveState, setCognitiveState] = useState('focused'); // relaxed, focused, overloaded
  const [actionSuggestion, setActionSuggestion] = useState(null);

  // Demo: Simulate intent detection
  useEffect(() => {
    const intents = [
      { label: '文档编辑', description: '正在撰写文档', type: 'document' },
      { label: '代码编写', description: '编写函数实现', type: 'code' },
      { label: '音乐播放', description: '播放放松音乐', type: 'music' },
      { label: '学习研究', description: '研究 AI 主题', type: 'knowledge' },
    ];

    const cycle = () => {
      const randomIntent = intents[Math.floor(Math.random() * intents.length)];
      setIntent(randomIntent);
      setConfidence(85 + Math.floor(Math.random() * 14)); // 85-99%
      setCognitiveState(['relaxed', 'focused', 'overloaded'][Math.floor(Math.random() * 3)]);
      setActionSuggestion({
        primary: '确认执行',
        secondary: '编辑意图',
        tertiary: '忽略'
      });
    };

    cycle();
    const interval = setInterval(cycle, 5000);
    return () => clearInterval(interval);
  }, []);

  const cognitiveStates = {
    relaxed: {
      label: '放松',
      color: '#4CAF50',
      bg: 'rgba(76, 175, 80, 0.1)',
      border: 'rgba(76, 175, 80, 0.3)',
      icon: '😌'
    },
    focused: {
      label: '专注',
      color: '#2196F3',
      bg: 'rgba(33, 150, 243, 0.1)',
      border: 'rgba(33, 150, 243, 0.3)',
      icon: '🎯'
    },
    overloaded: {
      label: '过载',
      color: '#FF4D00',
      bg: 'rgba(255, 77, 0, 0.1)',
      border: 'rgba(255, 77, 0, 0.3)',
      icon: '🤯'
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      {/* Ambient Intent Card */}
      <AnimatePresence>
        {intent && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            {/* Intent Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{intent.icon || '🤖'}</span>
                <span className="text-white font-semibold">{intent.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">置信度</span>
                <span className={`font-mono text-sm font-bold ${
                  confidence >= 95 ? 'text-green-400' :
                  confidence >= 85 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {confidence}%
                </span>
              </div>
            </div>

            {/* Intent Description */}
            <p className="text-white/70 text-sm mb-3">
              {intent.description}
            </p>

            {/* Cognitive State Indicator */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/60">认知状态</span>
                <span className="text-xs font-semibold">
                  {cognitiveStates[cognitiveState].label}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    cognitiveState === 'relaxed' ? 'bg-green-500' :
                    cognitiveState === 'focused' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cognitiveState === 'relaxed' ? 30 : cognitiveState === 'focused' ? 70 : 95}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Action Suggestions */}
            {actionSuggestion && (
              <div className="grid grid-cols-3 gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs font-medium text-white/90`}
                >
                  {actionSuggestion.primary}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs font-medium text-white/70`}
                >
                  {actionSuggestion.secondary}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs font-medium text-white/70`}
                >
                  {actionSuggestion.tertiary}
                </motion.button>
              </div>
            )}

            {/* Confidence Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>意图置信度</span>
                <span>{confidence}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Monitoring Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[9998] pointer-events-none"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse" />
      </motion.div>
    </div>
  );
};

export default PredictiveIntentDashboard;
