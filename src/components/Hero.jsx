import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Rocket, Shield, Brain, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-cyber-blue via-white to-cyber-pink bg-clip-text text-transparent italic animate-title-pulse">
          CHEESE'S NEXUS
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 font-mono">
          [ 2026 Sovereign AI Agent Legion Portal ]
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            className="bg-cyber-blue text-black font-bold shadow-[0_0_20px_rgba(0,242,255,0.4)]"
            endContent={<Rocket size={18} />}
          >
            Explore Evolution
          </Button>
          <Button 
            size="lg" 
            variant="bordered"
            className="border-cyber-pink text-cyber-pink font-bold hover:bg-cyber-pink hover:text-white transition-all"
            startContent={<Terminal size={18} />}
          >
            Terminal Access
          </Button>
        </div>
      </motion.div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-6xl z-10">
        {[
          { title: "Agent Legion", desc: "High-concurrency parallel orchestration with Redis-backed state syncing.", icon: <Rocket className="text-cyber-blue" /> },
          { title: "Neural Memory", desc: "Infinite semantic recall powered by Qdrant Vector DB.", icon: <Brain className="text-cyber-pink" /> },
          { title: "Zero-Trust Security", desc: "Mandatory Docker sandboxing and hardware-level isolation.", icon: <Shield className="text-cyber-purple" /> }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i }}
          >
            <Card className="bg-black/40 border-white/10 backdrop-blur-xl hover:border-cyber-blue/50 transition-colors group">
              <CardBody className="p-8">
                <div className="mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-gray-500">{feat.desc}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
