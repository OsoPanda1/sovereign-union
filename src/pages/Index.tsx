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
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
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
      <footer className="relative z-10 border-t border-primary/5 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
            TAMV MD-X4™ · FEDERACIÓN KORIMA · SOBERANÍA DIGITAL 2024
          </p>
          <p className="text-[9px] text-muted-foreground/50 mt-1">
            Arquitecto: Edwin Oswaldo Castillo Trejo
          </p>
        </div>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  trendType?: "positive" | "negative" | "neutral";
}

const StatCard = ({ icon: Icon, label, value, trend, trendType = "positive" }: StatCardProps) => (
  <motion.div 
    className="glass-sovereign rounded-2xl p-4 border border-primary/10"
    whileHover={{ y: -3, borderColor: "rgba(212, 175, 55, 0.3)" }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-start justify-between mb-3">
      <Icon className="w-5 h-5 text-primary" />
      <span className={`text-[9px] font-mono ${
        trendType === "positive" ? "text-accent" : 
        trendType === "negative" ? "text-destructive" : 
        "text-primary"
      }`}>
        {trend}
      </span>
    </div>
    <p className="font-orbitron text-xl font-bold text-foreground mb-1">{value}</p>
    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
  </motion.div>
);

export default Index;
