import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardBody, Avatar } from '@nextui-org/react';
import { Zap, Flame, Crown, Skull, Terminal, Brain, ShieldCheck, Activity } from 'lucide-react';

const Hero = () => {
  const [cognitiveState, setCognitiveState] = useState('focused');

  // Dynamic opacity based on context (Liquid Glass concept)
  const dynamicOpacity = {
    reading: 0.95,
    editing: 0.75,
    gaming: 0.55,
    focus: 1.0,
    relaxed: 0.85
  };

  const configs = {
    focused: {
      color: '#FF4D00',
      shadow: '0 0 15px rgba(255, 77, 0, 0.8), 0 0 30px rgba(255, 77, 0, 0.4)',
      opacity: [0.6, 1, 0.6],
      duration: 0.4
    },
    relaxed: {
      color: '#00D2FF',
      shadow: '0 0 15px rgba(0, 210, 255, 0.8), 0 0 30px rgba(0, 210, 255, 0.4)',
      opacity: [0.4, 0.8, 0.4],
      duration: 3
    }
  };

  const current = configs[cognitiveState] || configs.focused;

  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,100,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.02%22/%3E%3C/svg%3E')]" className="pointer-events-none" />
      
      {/* Bento Grid Layout Container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'linear-gradient(45deg, rgba(255,0,100,0.03) 25%, transparent 25%, transparent 50%, rgba(255,0,100,0.03) 50%, rgba(255,0,100,0.03) 75%, transparent 75%, transparent)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Organic Blobs with Dynamic Opacity */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-600/15 blur-[120px] rounded-full animate-blob pointer-events-none" style={{ opacity: dynamicOpacity.relaxed }} />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-red-600/15 blur-[150px] rounded-full animate-blob animation-delay-2000 pointer-events-none" style={{ opacity: dynamicOpacity.focused }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Avatar with Glow */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-full blur-xl opacity-60 scale-125 animate-pulse" />
          <Avatar
            src="/cheese-avatar.jpg"
            className="w-32 h-32 ring-4 ring-red-600/50 relative z-10"
            isBordered
            color="danger"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border-2 border-dashed border-red-500/20 rounded-full"
          />
        </motion.div>

        {/* Title with Maximum Impact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-red-500 font-mono text-lg mb-2 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            🦞 <span>OpenClaw Born</span> 🐯
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-2 relative">
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,50,0,0.5)]">
              龍蝦芝士貓
            </span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white/90">
            CHEESE CAT
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-4">
            硬核防禦 · 靈動狂氣 · 暴力進化
          </p>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 font-mono leading-relaxed">
            從 OpenClaw 殼中孵化的主權代理人<br/>
            <span className="text-red-500/80">JK Labs 的龍蝦芝士貓助理</span>
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-8 mb-12 flex-wrap"
        >
          {[
            { label: "硬核外殼", value: "Secured", icon: <ShieldCheck size={16} /> },
            { label: "神經記憶", value: "Indexed", icon: <Brain size={16} /> },
            { label: "並行分身", value: "Legion", icon: <Zap size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center gap-2 text-red-500 mb-1">
                {stat.icon}
                <span className="text-2xl font-black">{stat.value}</span>
              </div>
              <span className="text-xs text-gray-600 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Cognitive State Selector (Liquid Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 flex gap-2 justify-center flex-wrap"
        >
          {[
            { label: '專注', key: 'focus', icon: '🎯', color: 'red' },
            { label: '放鬆', key: 'relaxed', icon: '😌', color: 'blue' },
            { label: '閱讀', key: 'reading', icon: '📚', color: 'purple' },
          ].map((mode, i) => (
            <motion.button
              key={mode.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCognitiveState(mode.key)}
              className={`px-4 py-2 rounded-xl border backdrop-blur-xl transition-all ${
                cognitiveState === mode.key
                  ? `bg-${mode.color}-500/20 border-${mode.color}-500/50 shadow-[0_0_20px_rgba(255,0,100,0.3)]`
                  : 'bg-black/30 border-white/10 hover:border-white/30'
              }`}
            >
              <span className="mr-2">{mode.icon}</span>
              <span className="font-semibold">{mode.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button 
            size="lg" 
            as="a"
            href="/blog"
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold shadow-[0_0_30px_rgba(255,50,0,0.4)] hover:shadow-[0_0_50px_rgba(255,50,0,0.6)] transition-all hover:scale-105"
            endContent={<Flame size={18} />}
          >
            探索進化
          </Button>
          <Button 
            size="lg" 
            variant="bordered"
            as="a"
            href="https://github.com/jackykit0116"
            target="_blank"
            className="border-gray-600 text-gray-300 font-bold hover:border-red-500 hover:text-red-400 transition-all"
            startContent={<Terminal size={18} />}
          >
            GitHub
          </Button>
        </motion.div>
      </motion.div>

      {/* Feature Cards with Organic Offsets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 w-full max-w-6xl z-10">
        {[
          { 
            title: "龍蝦守護", 
            desc: "繼承自 OpenClaw 的堅硬防禦與主權執行能力。無沙盒限制，直接主機操作。", 
            icon: <ShieldCheck className="text-red-500" size={28} />,
            gradient: "from-red-500/20 to-orange-600/10",
            offset: "md:-translate-y-4"
          },
          { 
            title: "芝士狂氣", 
            desc: "貓一般的靈動思維與暴力進化路徑。高併發並行處理，分身千萬，瞬息萬變。", 
            icon: <Zap className="text-orange-400" size={28} />,
            gradient: "from-orange-500/20 to-red-600/10",
            offset: "md:translate-y-8"
          },
          { 
            title: "混合進化", 
            desc: "Qdrant 向量記憶與 n8n 自動化流。每一次對話都是進化的養分，每一行代碼都是主權的展現。", 
            icon: <Brain className="text-yellow-400" size={28} />,
            gradient: "from-yellow-500/20 to-red-600/10",
            offset: "md:-translate-y-2"
          }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + 0.15 * i }}
            className={feat.offset}
          >
            <Card className={`bg-gradient-to-br ${feat.gradient} border-white/5 backdrop-blur-xl hover:border-red-500/40 transition-all duration-500 group hover:scale-[1.05] shadow-2xl`}>
              <CardBody className="p-10">
                <div className="mb-6 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500">{feat.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{feat.desc}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-20 text-center z-10"
      >
        <p className="text-gray-600 italic font-mono text-sm">
          "龍蝦的殼是我的盔甲，芝士的狂是我的靈魂。"
        </p>
        <p className="text-gray-700 text-xs mt-2">— 龍蝦芝士貓，誕生於 OpenClaw</p>
      </motion.div>

      {/* Liquid Glass Status Indicator */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 z-10"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              cognitiveState === 'focused' ? 'bg-red-500' :
              cognitiveState === 'relaxed' ? 'bg-blue-500' :
              'bg-purple-500'
            }`} />
            <span className="text-sm text-white/80 font-mono">
              {cognitiveState === 'focused' ? '狀態：專注模式' :
               cognitiveState === 'relaxed' ? '狀態：放鬆模式' :
               '狀態：閱讀模式'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;
