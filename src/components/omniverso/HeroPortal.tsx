/**
 * 🌐 HERO PORTAL - TAMV Omniverso Entry Point
 * Portal cinematográfico 4D — 75% visual / 25% texto
 */
import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Zap, ChevronDown, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParticleField3D } from "./ParticleField3D";

export const HeroPortal = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ═══ MULTI-LAYER CINEMATIC BACKGROUND ═══ */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

        {/* Central rotating vortex */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
          animate={{ rotate: 360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }}>
          <div className="absolute inset-0 rounded-full blur-[120px] opacity-15"
            style={{ background: `conic-gradient(from 0deg, hsla(45, 92%, 58%, 0.5), hsla(280, 70%, 50%, 0.2), hsla(168, 84%, 48%, 0.3), hsla(0, 70%, 55%, 0.15), hsla(45, 92%, 58%, 0.5))` }} />
        </motion.div>

        {/* Secondary vortex counter-rotating */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
          <div className="absolute inset-0 rounded-full blur-[80px] opacity-10"
            style={{ background: `conic-gradient(from 180deg, hsla(168, 84%, 48%, 0.4), transparent 40%, hsla(45, 92%, 58%, 0.3), transparent 80%, hsla(168, 84%, 48%, 0.4))` }} />
        </motion.div>

        {/* Radial energy bursts */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <motion.div key={deg} className="absolute top-1/2 left-1/2 h-[2px] origin-left"
            style={{ width: '50vw', transform: `rotate(${deg}deg)`, background: `linear-gradient(90deg, hsla(45, 92%, 58%, 0.15), transparent 60%)` }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: deg * 0.01 }} />
        ))}

        <div className="absolute inset-0 grid-pattern opacity-20" />
        <ParticleField3D count={80} />

        {/* Floating hexagons */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={`hex-${i}`}
            className="absolute border border-primary/10 w-20 h-20 rotate-45"
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], rotate: [45, 55, 45], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.5 }} />
        ))}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Animated Logo */}
        <motion.div className="relative inline-block mb-8"
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}>
          {/* Triple rotating rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div key={ring}
              className="absolute rounded-full"
              style={{
                inset: `${-12 - ring * 10}px`,
                border: `1px solid hsla(${ring === 0 ? '45, 92%, 58%' : ring === 1 ? '168, 84%, 48%' : '280, 70%, 50%'}, ${0.3 - ring * 0.08})`,
              }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 15 + ring * 5, repeat: Infinity, ease: "linear" }} />
          ))}

          {/* Core orb */}
          <div className="relative w-32 h-32 rounded-full gold-metallic flex items-center justify-center">
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle, hsla(45, 100%, 70%, 0.6) 0%, transparent 70%)` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }} />
            <span className="font-orbitron text-4xl font-black text-primary-foreground z-10">T</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black mb-4"
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <span className="text-gold-3d">TAMV</span>
        </motion.h1>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="mb-6">
          <span className="text-xl md:text-3xl font-orbitron font-bold bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            CIVILIZACIÓN DIGITAL SOBERANA
          </span>
        </motion.div>

        <motion.p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          El primer <span className="text-accent font-medium">ecosistema XR-IA</span> del mundo.
          <span className="block text-sm text-muted-foreground/60 mt-1">
            Antifragil · 7 Capas Federadas · MSR Blockchain · Isabella AI™
          </span>
        </motion.p>

        {/* Floating feature orbs instead of text pills */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          {[
            { icon: Globe, label: "Federación Triple", color: "45, 92%, 58%" },
            { icon: Shield, label: "Zero Knowledge", color: "168, 84%, 48%" },
            { icon: Zap, label: "Baja Latencia", color: "280, 70%, 55%" },
            { icon: Sparkles, label: "Isabella AI™", color: "168, 84%, 48%" },
          ].map((item, i) => (
            <motion.div key={item.label}
              className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer"
              style={{
                background: `radial-gradient(circle at 35% 35%, hsla(${item.color}, 0.2), rgba(0,0,0,0.5))`,
                border: `1px solid hsla(${item.color}, 0.3)`,
                boxShadow: `0 0 25px hsla(${item.color}, 0.2), inset 0 0 15px rgba(0,0,0,0.5)`,
              }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.15, y: -5, boxShadow: `0 0 40px hsla(${item.color}, 0.5)` }}>
              <item.icon className="w-5 h-5 mb-1" style={{ color: `hsl(${item.color})` }} />
              <span className="text-[7px] font-orbitron text-foreground/70 text-center leading-tight px-1">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
          <motion.button className="btn-sovereign px-10 py-5 rounded-2xl text-sm min-w-[220px] flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/auth")}>
            <Play className="w-4 h-4" /> ENTRAR AL NEXO
          </motion.button>
          <motion.button
            className="px-10 py-5 rounded-2xl text-sm glass-sovereign border border-accent/25 font-orbitron hover:border-accent/50 transition-all min-w-[220px]"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/nexus")}>
            <span className="text-accent">EXPLORAR</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-primary/40" />
        </motion.div>
      </div>

      {/* Corner decorations */}
      {["top-0 left-0 border-l-2 border-t-2 border-primary/10 rounded-tl-3xl",
        "top-0 right-0 border-r-2 border-t-2 border-primary/10 rounded-tr-3xl",
        "bottom-0 left-0 border-l-2 border-b-2 border-accent/10 rounded-bl-3xl",
        "bottom-0 right-0 border-r-2 border-b-2 border-accent/10 rounded-br-3xl",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-48 h-48 ${cls}`} />
      ))}
    </section>
  );
};

export default HeroPortal;
