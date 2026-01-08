import { motion } from "framer-motion";
import { Shield, Wallet, Bell, Menu, LogIn, LogOut, User, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TAMVChaoticEngine } from "@/crypto/chaotic-engine";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const engine = new TAMVChaoticEngine();

export const SovereignNav = () => {
  const [entropy, setEntropy] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const state = engine.getCurrentState();
      setEntropy(Math.round(state.entropy));
      engine.generateSequence(1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Fetch wallet balance when authenticated
  useEffect(() => {
    if (user) {
      supabase
        .from("msr_wallets")
        .select("balance")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setWalletBalance(Number(data.balance));
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-sovereign border-b border-primary/15"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              {/* 3D Gold Logo Container */}
              <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center relative overflow-hidden">
                <Shield className="w-6 h-6 text-primary-foreground relative z-10" />
                {/* Shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              {/* Status indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ boxShadow: '0 0 10px hsla(168, 84%, 48%, 0.8)' }}
              />
            </div>
            <div>
              <h1 className="font-orbitron text-sm font-black tracking-[0.2em] text-gold-3d">
                TAMV MD-X4
              </h1>
              <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase">
                Federación Korima
              </p>
            </div>
          </motion.div>

          {/* Center Status Indicators */}
          <div className="hidden lg:flex items-center gap-10">
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
          <div className="flex items-center gap-3">
            {/* MSR Balance Card */}
            {isAuthenticated && (
              <motion.div 
                className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl msr-badge"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-8 h-8 rounded-lg gold-metallic flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-orbitron text-base font-bold text-gold-3d">
                    {walletBalance?.toLocaleString("es-MX", { minimumFractionDigits: 2 }) ?? "..."}
                  </span>
                  <span className="text-[9px] text-muted-foreground ml-1">MSR</span>
                </div>
              </motion.div>
            )}

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-3 py-2 glass-sovereign rounded-xl"
                  whileHover={{ borderColor: 'hsla(168, 84%, 48%, 0.3)' }}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[10px] text-foreground/80 font-mono">
                    {user?.email?.split("@")[0]}
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'hsla(0, 72%, 51%, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="p-2.5 rounded-xl transition-colors border border-transparent hover:border-destructive/30"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5 text-foreground/70" />
                </motion.button>
              </div>
            ) : (
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-metallic font-orbitron text-xs font-bold tracking-wider"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">INGRESAR</span>
                </motion.button>
              </Link>
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl glass-sovereign border border-transparent hover:border-primary/20"
              >
                <Bell className="w-5 h-5 text-foreground/70" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent" 
                  style={{ boxShadow: '0 0 8px hsla(168, 84%, 48%, 0.8)' }} />
              </motion.button>
            )}

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl glass-sovereign"
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
  <div className="flex items-center gap-3">
    <div className="relative">
      <motion.div
        className={`w-2.5 h-2.5 rounded-full ${
          color === "gold" ? "bg-primary" : "bg-accent"
        }`}
        style={{
          boxShadow: color === "gold" 
            ? '0 0 12px hsla(45, 92%, 58%, 0.8)' 
            : '0 0 12px hsla(168, 84%, 48%, 0.8)'
        }}
        animate={animate ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {animate && (
        <motion.div
          className={`absolute inset-0 rounded-full ${color === "gold" ? "bg-primary" : "bg-accent"}`}
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
    <div className="flex flex-col">
      <span className="text-[8px] text-muted-foreground tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className={`text-[11px] font-mono font-bold ${
        color === "gold" ? "text-gold-3d" : "text-accent"
      }`}>
        {value}
      </span>
    </div>
  </div>
);

export default SovereignNav;
