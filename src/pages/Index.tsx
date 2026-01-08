import { motion } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import SocialNexus from "@/components/social/SocialNexus";
import UniversitySidebar from "@/components/widgets/UniversitySidebar";
import LotteryWidget from "@/components/widgets/LotteryWidget";
import MSRWallet from "@/components/widgets/MSRWallet";
import ChaosVisualizer from "@/components/widgets/ChaosVisualizer";
import { Sparkles, Zap, Shield, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* ═══ AMBIENT BACKGROUND EFFECTS ═══ */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary Gold Glow - Top */}
        <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.4) 0%, transparent 70%)' }} />
        
        {/* Secondary Turquoise Glow - Bottom */}
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, hsla(168, 84%, 48%, 0.4) 0%, transparent 70%)' }} />
        
        {/* Subtle Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10"
          style={{ background: 'radial-gradient(circle, hsla(45, 80%, 50%, 0.3) 0%, transparent 60%)' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        {/* Floating Particles */}
        <FloatingParticles />
      </div>

      {/* Navigation */}
      <SovereignNav />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Stats Bar */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StatCard 
              icon={Users} 
              label="Ciudadanos Activos" 
              value="12,847" 
              trend="+8.2%" 
            />
            <StatCard 
              icon={Zap} 
              label="Transacciones Hoy" 
              value="45,239" 
              trend="+23.1%" 
            />
            <StatCard 
              icon={Shield} 
              label="Datos Cifrados" 
              value="2.4 TB" 
              trend="100%" 
              trendType="neutral"
            />
            <StatCard 
              icon={Sparkles} 
              label="MSR en Circulación" 
              value="847.5K" 
              trend="+4.7%" 
            />
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - University & Chaos */}
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              <UniversitySidebar />
              <ChaosVisualizer />
            </div>

            {/* Center - Social Feed */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SocialNexus />
            </div>

            {/* Right Sidebar - Wallet & Lottery */}
            <div className="lg:col-span-3 space-y-6 order-3">
              <MSRWallet />
              <LotteryWidget />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="inline-flex items-center gap-3 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary glow-gold-pulse" />
            <p className="text-xs text-gold-3d font-orbitron tracking-[0.3em]">
              TAMV MD-X4™
            </p>
            <div className="w-2 h-2 rounded-full bg-accent glow-turquoise" />
          </motion.div>
          <p className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
            FEDERACIÓN KORIMA · SOBERANÍA DIGITAL 2024
          </p>
          <p className="text-[9px] text-muted-foreground/50 mt-1">
            Arquitecto: Edwin Oswaldo Castillo Trejo
          </p>
        </div>
      </footer>
    </div>
  );
};

// Floating ambient particles
const FloatingParticles = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          background: i % 2 === 0 ? 'hsla(45, 92%, 58%, 0.6)' : 'hsla(168, 84%, 48%, 0.5)',
          boxShadow: i % 2 === 0 
            ? '0 0 10px hsla(45, 92%, 58%, 0.8)' 
            : '0 0 10px hsla(168, 84%, 48%, 0.8)',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut",
        }}
      />
    ))}
  </>
);

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  trendType?: "positive" | "negative" | "neutral";
}

const StatCard = ({ icon: Icon, label, value, trend, trendType = "positive" }: StatCardProps) => (
  <motion.div 
    className="card-sovereign rounded-2xl p-5 group cursor-pointer"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full ${
        trendType === "positive" ? "text-accent bg-accent/10" : 
        trendType === "negative" ? "text-destructive bg-destructive/10" : 
        "text-primary bg-primary/10"
      }`}>
        {trend}
      </span>
    </div>
    <p className="font-orbitron text-2xl font-bold text-gold-3d mb-1 group-hover:text-shadow-gold transition-all">
      {value}
    </p>
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
  </motion.div>
);

export default Index;
