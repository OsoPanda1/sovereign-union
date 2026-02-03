/**
 * 🌐 HERO PORTAL - TAMV Omniverso Entry Point
 * Portal de entrada 4D con efectos cinematográficos
 */
import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Zap, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParticleField3D } from "./ParticleField3D";

export const HeroPortal = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        
        {/* Central golden vortex */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full blur-[100px] opacity-20"
            style={{
              background: `conic-gradient(from 0deg, 
                hsla(45, 92%, 58%, 0.4),
                hsla(168, 84%, 48%, 0.2),
                hsla(45, 92%, 58%, 0.1),
                hsla(168, 84%, 48%, 0.3),
                hsla(45, 92%, 58%, 0.4)
              )`
            }}
          />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Particle field */}
        <ParticleField3D count={60} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Animated Logo Container */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
        >
          {/* Rotating outer ring */}
          <motion.div
            className="absolute -inset-6 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, 
                hsla(45, 100%, 65%, 0.3),
                transparent 25%,
                hsla(168, 84%, 48%, 0.3),
                transparent 50%,
                hsla(45, 100%, 65%, 0.3),
                transparent 75%,
                hsla(168, 84%, 48%, 0.3)
              )`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner glowing orb */}
          <div className="relative w-28 h-28 rounded-full gold-metallic flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, hsla(45, 100%, 70%, 0.5) 0%, transparent 70%)`
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-orbitron text-3xl font-black text-primary-foreground z-10">T</span>
          </div>
        </motion.div>

        {/* Title with 3D effect */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-gold-3d">TAMV</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            OMNIVERSO
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          El primer <span className="text-accent font-medium">ecosistema digital soberano</span> del mundo.
          <br />
          <span className="text-sm text-muted-foreground/70">
            Civilización antifragil · XR nativo · MSR Blockchain
          </span>
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: Globe, label: "Federación Triple" },
            { icon: Shield, label: "Zero Knowledge" },
            { icon: Zap, label: "Baja Latencia" },
            { icon: Sparkles, label: "Isabella AI" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-sovereign"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, borderColor: "hsla(45, 92%, 58%, 0.4)" }}
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-xs font-orbitron text-foreground/90">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="btn-sovereign px-8 py-4 rounded-2xl text-sm min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/auth")}
          >
            ENTRAR AL NEXO
          </motion.button>
          
          <motion.button
            className="px-8 py-4 rounded-2xl text-sm glass-sovereign border border-accent/20 font-orbitron hover:border-accent/40 transition-colors min-w-[200px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/nexus")}
          >
            <span className="text-accent">NEXO SOCIAL</span>
          </motion.button>
          
          <motion.button
            className="px-8 py-4 rounded-2xl text-sm glass-sovereign border border-primary/20 font-orbitron hover:border-primary/40 transition-colors min-w-[200px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/command")}
          >
            <span className="text-muted-foreground">COMMAND CENTER</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-primary/10 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-primary/10 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-accent/10 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-accent/10 rounded-br-3xl" />
    </section>
  );
};

export default HeroPortal;
