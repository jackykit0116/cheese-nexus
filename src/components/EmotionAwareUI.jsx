import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Smile, Zap, Eye } from 'lucide-react';

/**
 * EmotionAwareUI - 情感感知 UI 組件
 *
 * 功能：
 * 1. 檢測用戶情緒（通過交互模式、語氣、點擊速度）
 * 2. 動態調整 UI 密度、顏色、交互風格
 * 3. 提供個性化的無障礙選項
 * 4. 基於用戶狀態的智能響應
 */

export const EmotionAwareUI = ({ children }) => {
  const [userState, setUserState] = useState({
    mood: 'neutral', // neutral, focused, stressed, excited, anxious
    activityLevel: 0, // 0-100, 評估用戶活動密度
    cognitiveLoad: 0, // 0-100, 評估認知負載
    preferredStyle: 'adaptive', // adaptive, minimal, immersive, structured
  });

  const [moodDetected, setMoodDetected] = useState(null);

  // 基於用戶行為模式檢測情緒
  const analyzeUserBehavior = (interactionType) => {
    switch (interactionType) {
      case 'fastClick':
        return { mood: 'excited', cognitiveLoad: 80 };
      case 'slowClick':
        return { mood: 'focused', cognitiveLoad: 40 };
      case 'hesitant':
        return { mood: 'anxious', cognitiveLoad: 90 };
      case 'rapidTyping':
        return { mood: 'stressed', activityLevel: 95 };
      case 'calmTyping':
        return { mood: 'focused', activityLevel: 30 };
      default:
        return { mood: 'neutral', cognitiveLoad: 50 };
    }
  };

  // 動態調整 UI 根據用戶狀態
  const uiConfig = useMemo(() => {
    const config = {
      density: 'normal',
      colors: 'default',
      interactions: 'adaptive',
      notifications: 'subtle',
    };

    switch (userState.mood) {
      case 'focused':
        return {
          density: 'minimal',
          colors: 'high-contrast',
          interactions: 'direct',
          notifications: 'minimal',
        };
      case 'stressed':
        return {
          density: 'structured',
          colors: 'calm',
          interactions: 'guided',
          notifications: 'infrequent',
        };
      case 'excited':
        return {
          density: 'expanded',
          colors: 'vibrant',
          interactions: 'fluid',
          notifications: 'prominent',
        };
      case 'anxious':
        return {
          density: 'structured',
          colors: 'soothing',
          interactions: 'reassuring',
          notifications: 'infrequent',
        };
      default:
        return config;
    }
  }, [userState.mood]);

  // 語氣調整器
  const toneAdjuster = (message, userMood) => {
    const toneModifiers = {
      focused: 'concise, direct, factual',
      stressed: 'calm, reassuring, supportive',
      excited: 'enthusiastic, dynamic, engaging',
      anxious: 'clear, reassuring, patient',
      neutral: 'balanced, helpful',
    };

    return `(${toneModifiers[userMood]}) ${message}`;
  };

  // 情緒指示器
  const MoodIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/10">
        <div className="flex items-center gap-2 text-sm">
          {moodDetected && (
            <>
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300">{userState.mood}</span>
              {moodDetected && (
                <>
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">
                    Load: {Math.round(userState.cognitiveLoad)}%
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  // 動態調整的背景
  const DynamicBackground = () => (
    <AnimatePresence>
      {userState.mood !== 'neutral' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              userState.mood === 'focused'
                ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
                : userState.mood === 'stressed'
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                : userState.mood === 'excited'
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          }}
        />
      )}
    </AnimatePresence>
  );

  // 個性化通知系統
  const SmartNotification = ({ message, type = 'info' }) => {
    const notificationConfig = {
      focused: { color: 'bg-blue-600', icon: Zap },
      stressed: { color: 'bg-green-600', icon: Smile },
      excited: { color: 'bg-purple-600', icon: Activity },
      anxious: { color: 'bg-yellow-600', icon: Eye },
      neutral: { color: 'bg-gray-600', icon: Zap },
    };

    const { color, icon: Icon } = notificationConfig[userState.mood] || notificationConfig.neutral;

    return (
      <AnimatePresence>
        {moodDetected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 ${color} text-white px-4 py-2 rounded-lg shadow-lg`}
          >
            <Icon className="w-4 h-4" />
            <span className="ml-2 text-sm">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="relative">
      <DynamicBackground />
      <MoodIndicator />
      <SmartNotification message={toneAdjuster('系統已適應您的當前狀態', userState.mood)} />
      {children}
    </div>
  );
};

/**
 * EmotionDetectionHook - 情緒檢測 Hook
 */
export const useEmotionDetection = () => {
  const [mood, setMood] = useState('neutral');
  const [cognitiveLoad, setCognitiveLoad] = useState(50);

  useEffect(() => {
    // 模擬情緒檢測（實際應用中會連接到語音分析、鍵盤監控等）
    const detectEmotion = () => {
      // 根據實際應用場景實現
      return {
        mood: Math.random() > 0.7 ? 'focused' : 'neutral',
        cognitiveLoad: Math.floor(Math.random() * 40) + 40,
      };
    };

    // 定期檢測用戶狀態
    const interval = setInterval(detectEmotion, 30000);

    return () => clearInterval(interval);
  }, []);

  return { mood, cognitiveLoad };
};

/**
 * AdaptiveLayout - 自適應佈局組件
 */
export const AdaptiveLayout = ({ children, style = 'adaptive' }) => {
  const adaptiveStyles = {
    adaptive: {
      container: 'max-w-7xl mx-auto px-4',
      spacing: 'space-y-6',
      padding: 'py-8',
    },
    minimal: {
      container: 'max-w-6xl mx-auto px-2',
      spacing: 'space-y-3',
      padding: 'py-4',
    },
    immersive: {
      container: 'max-w-full mx-auto px-0',
      spacing: 'space-y-0',
      padding: 'py-0',
    },
    structured: {
      container: 'max-w-5xl mx-auto px-6',
      spacing: 'space-y-4',
      padding: 'py-10',
    },
  };

  const styleConfig = adaptiveStyles[style] || adaptiveStyles.adaptive;

  return (
    <div className={styleConfig.container}>
      <div className={styleConfig.spacing}>{children}</div>
    </div>
  );
};

export default EmotionAwareUI;
