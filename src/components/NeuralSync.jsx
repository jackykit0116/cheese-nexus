import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralSync = () => {
  const [status, setStatus] = useState('thinking'); // low, thinking, error

  // Demo effect: cycle through states every 10 seconds or based on "activity"
  // For now, we'll keep it on "thinking" to represent Cheese's active state
  
  const configs = {
    low: {
      color: '#00D2FF',
      shadow: '0 0 10px rgba(0, 210, 255, 0.5)',
      duration: 3,
      opacity: [0.3, 0.7, 0.3],
    },
    thinking: {
      color: '#FF4D00',
      shadow: '0 0 15px rgba(255, 77, 0, 0.8), 0 0 30px rgba(255, 77, 0, 0.4)',
      duration: 0.4,
      opacity: [0.6, 1, 0.6],
    },
    error: {
      color: '#FF0033',
      shadow: '0 0 20px rgba(255, 0, 51, 0.9)',
      duration: 1.5,
      opacity: [0.4, 1, 0.4],
    }
  };

  const current = configs[status] || configs.low;

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[10000] pointer-events-none overflow-hidden bg-black/20">
      <motion.div
        animate={{
          backgroundColor: current.color,
          boxShadow: current.shadow,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full h-full relative"
      >
        <motion.div
          animate={{
            opacity: current.opacity,
          }}
          transition={{
            duration: current.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-current"
          style={{ backgroundColor: current.color }}
        />
        
        {/* Scanning Glint for Thinking State */}
        <AnimatePresence>
          {status === 'thinking' && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-30deg] z-10"
            />
          )}
        </AnimatePresence>

        {/* Moire/Interference Pattern for Thinking */}
        {status === 'thinking' && (
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" 
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, #fff 1px, #fff 2px)',
              backgroundSize: '4px 100%',
              animation: 'moire-scroll 0.2s linear infinite'
            }}
          />
        )}
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes moire-scroll {
          from { background-position: 0 0; }
          to { background-position: 4px 0; }
        }
      `}} />
    </div>
  );
};

export default NeuralSync;
