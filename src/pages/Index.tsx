/**
 * 🌌 TAMV NEXUS - Experiencia Visual Inmersiva MD-X4™
 * 75% visual / 25% texto - Feed civilizacional con partículas 3D
 */
import { motion } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import SocialNexus from "@/components/social/SocialNexus";
import { NexusSidebar } from "@/components/nexus/NexusSidebar";
import { ParticleField3D } from "@/components/omniverso/ParticleField3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* ═══ IMMERSIVE 3D BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep space radial glows */}
        <div className="absolute top-[-15%] left-[10%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-15"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.5) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-12"
          style={{ background: 'radial-gradient(circle, hsla(168, 84%, 48%, 0.4) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
          style={{ background: 'radial-gradient(circle, hsla(280, 70%, 50%, 0.3) 0%, transparent 70%)' }} />

        {/* Particle Field */}
        <ParticleField3D count={50} />

        {/* Animated energy lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(45, 92%, 58%)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[20, 35, 55, 70, 85].map((y) => (
            <motion.line
              key={y}
              x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke="url(#lineGold)" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: y * 0.05 }}
            />
          ))}
        </svg>
      </div>

      {/* Navigation */}
      <SovereignNav />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Floating energy orbs as stats - replaces text stat cards */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EnergyOrb value="12.8K" label="MSR" color="gold" />
            <EnergyOrb value="87" label="ACTIVOS" color="turquoise" />
            <EnergyOrb value="2.4TB" label="CIFRADO" color="fuchsia" />
            <EnergyOrb value="78%" label="KÓRIMA" color="gold" />
          </motion.div>

          {/* Main Grid - Visual First */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Compact Visual Widgets */}
            <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
              <NexusSidebar />
            </div>

            {/* Center - Visual Social Feed */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SocialNexus />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-4 order-3">
              <NexusSidebarRight />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/** Floating energy orb - replaces boring stat cards */
const EnergyOrb = ({ value, label, color }: { value: string; label: string; color: "gold" | "turquoise" | "fuchsia" }) => {
  const colorMap = {
    gold: { bg: 'hsla(45, 92%, 58%, 0.15)', glow: 'hsla(45, 92%, 58%, 0.6)', text: 'text-gold-3d' },
    turquoise: { bg: 'hsla(168, 84%, 48%, 0.15)', glow: 'hsla(168, 84%, 48%, 0.6)', text: 'text-accent' },
    fuchsia: { bg: 'hsla(280, 70%, 55%, 0.15)', glow: 'hsla(280, 70%, 55%, 0.5)', text: 'text-foreground' },
  };
  const c = colorMap[color];

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer"
      whileHover={{ scale: 1.15, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: c.bg }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Core orb */}
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border border-primary/20"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${c.bg}, rgba(0,0,0,0.6))`,
          boxShadow: `0 0 25px ${c.glow}, inset 0 0 15px rgba(0,0,0,0.5)`,
        }}
      >
        <span className={`font-orbitron text-sm md:text-base font-black ${c.text}`}>{value}</span>
        <span className="text-[7px] md:text-[8px] text-muted-foreground tracking-[0.2em]">{label}</span>
      </div>
    </motion.div>
  );
};

/** Right sidebar with visual widgets */
const NexusSidebarRight = () => {
  return (
    <div className="space-y-4">
      {/* Wallet Orb */}
      <motion.div
        className="card-sovereign rounded-3xl p-5 relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px]"
            style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 flex items-center gap-4 mb-4">
          <motion.div
            className="w-14 h-14 rounded-2xl gold-metallic flex items-center justify-center"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-xl">💰</span>
          </motion.div>
          <div>
            <p className="font-orbitron text-2xl font-black msr-value">847.5</p>
            <p className="text-[9px] text-muted-foreground tracking-[0.2em]">MSR BALANCE</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Enviar", "Recibir", "Swap"].map((a) => (
            <motion.button
              key={a}
              whileHover={{ scale: 1.05 }}
              className="py-2.5 rounded-xl glass-sovereign text-[9px] font-orbitron text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              {a}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lottery Visual */}
      <motion.div
        className="card-sovereign rounded-3xl p-5 relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
            style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.1) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              style={{
                left: `${20 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                boxShadow: '0 0 6px hsla(45, 92%, 58%, 0.8)',
              }}
              animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <p className="text-[8px] text-muted-foreground tracking-[0.3em] mb-2">LOTERÍA CUÁNTICA</p>
          <motion.p
            className="font-orbitron text-3xl font-black msr-value mb-3"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            12,450
          </motion.p>
          <p className="text-[9px] text-muted-foreground mb-4">MSR ACUMULADO</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-2xl gold-metallic font-orbitron text-xs font-bold tracking-wider"
          >
            ✦ PARTICIPAR
          </motion.button>
        </div>
      </motion.div>

      {/* Anubis Shield Visual */}
      <motion.div
        className="card-sovereign rounded-3xl p-4 relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, hsla(168, 84%, 48%, 0.05) 4px, hsla(168, 84%, 48%, 0.05) 5px)' }} />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, hsla(168, 84%, 48%, 0.2), hsla(168, 84%, 48%, 0.05))', border: '1px solid hsla(168, 84%, 48%, 0.3)' }}
            animate={{ boxShadow: ['0 0 10px hsla(168, 84%, 48%, 0.3)', '0 0 20px hsla(168, 84%, 48%, 0.6)', '0 0 10px hsla(168, 84%, 48%, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🛡️
          </motion.div>
          <div className="flex-1">
            <p className="text-[10px] font-orbitron text-foreground tracking-wider">ANUBIS SHIELD</p>
            <div className="flex items-center gap-2 mt-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[8px] text-accent font-mono">CIFRADO ACTIVO · λ3.999</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
