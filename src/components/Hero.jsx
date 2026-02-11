import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardBody, Avatar } from '@nextui-org/react';
import { Zap, Flame, Crown, Skull, Terminal, Brain, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden min-h-screen">
      {/* Flowing Geometric Blocks (Lobster Shell Inspired) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-[-5%] w-[40%] h-[30%] bg-red-600/20 blur-3xl rotate-12 organic-blob" style={{ clipPath: 'polygon(0% 0%, 100% 20%, 80% 100%, 20% 80%)' }} />
        <div className="absolute bottom-20 right-[-10%] w-[50%] h-[40%] bg-orange-600/20 blur-3xl -rotate-12 organic-blob" style={{ clipPath: 'polygon(20% 0%, 100% 40%, 70% 100%, 0% 70%)' }} />
      </div>

      {/* Intense Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,100,0.15),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')]" />
      
      {/* Organic Blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />

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
    </section>
  );
};

export default Hero;
