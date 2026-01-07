import { motion } from "framer-motion";
import { Shield, Zap, Wallet, Bell, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { TAMVChaoticEngine } from "@/crypto/chaotic-engine";

const engine = new TAMVChaoticEngine();

export const SovereignNav = () => {
  const [entropy, setEntropy] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const state = engine.getCurrentState();
      setEntropy(Math.round(state.entropy));
      engine.generateSequence(1); // Advance chaos
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-sovereign border-b border-primary/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="font-orbitron text-primary text-sm font-bold tracking-[0.15em]">
                TAMV MD-X4
              </h1>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase">
                Federación Korima
              </p>
            </div>
          </motion.div>

          {/* Center Status */}
          <div className="hidden md:flex items-center gap-8">
            <StatusIndicator 
              label="ISABELLA" 
              value="ACTIVE" 
              color="turquoise" 
            />
            <StatusIndicator 
              label="ANUBIS" 
              value="GUARDING" 
              color="gold" 
            />
            <StatusIndicator 
              label="ENTROPY" 
              value={`${entropy}%`} 
              color="turquoise"
              animate 
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* MSR Balance */}
            <motion.div 
              className="hidden sm:flex items-center gap-2 px-4 py-2 glass-sovereign rounded-xl border border-primary/20"
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.4)" }}
            >
              <Wallet className="w-4 h-4 text-primary" />
              <span className="font-orbitron text-primary text-sm font-bold">
                1,240.00
              </span>
              <span className="text-[9px] text-muted-foreground">MSR</span>
            </motion.div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground/70" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </motion.button>

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground/70" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface StatusIndicatorProps {
  label: string;
  value: string;
  color: "gold" | "turquoise";
  animate?: boolean;
}

const StatusIndicator = ({ label, value, color, animate }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <motion.div
      className={`w-2 h-2 rounded-full ${
        color === "gold" ? "bg-primary" : "bg-accent"
      }`}
      animate={animate ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <div className="flex flex-col">
      <span className="text-[8px] text-muted-foreground tracking-widest">
        {label}
      </span>
      <span className={`text-[10px] font-mono font-bold ${
        color === "gold" ? "text-primary" : "text-accent"
      }`}>
        {value}
      </span>
    </div>
  </div>
);

export default SovereignNav;
