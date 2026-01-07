import { motion } from "framer-motion";
import { Shield, Wallet, Bell, Menu, LogIn, LogOut, User } from "lucide-react";
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
            {/* MSR Balance - Only show when authenticated */}
            {isAuthenticated && (
              <motion.div 
                className="hidden sm:flex items-center gap-2 px-4 py-2 glass-sovereign rounded-xl border border-primary/20"
                whileHover={{ borderColor: "rgba(212, 175, 55, 0.4)" }}
              >
                <Wallet className="w-4 h-4 text-primary" />
                <span className="font-orbitron text-primary text-sm font-bold">
                  {walletBalance?.toLocaleString("es-ES", { minimumFractionDigits: 2 }) ?? "..."}
                </span>
                <span className="text-[9px] text-muted-foreground">MSR</span>
              </motion.div>
            )}

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-3 py-2 glass-sovereign rounded-xl border border-primary/10"
                >
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-[10px] text-foreground/70 font-mono">
                    {user?.email?.split("@")[0]}
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5 text-foreground/70" />
                </motion.button>
              </div>
            ) : (
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-gold rounded-xl text-primary-foreground font-orbitron text-xs font-bold shadow-gold"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">INGRESAR</span>
                </motion.button>
              </Link>
            )}

            {/* Notifications - Only when authenticated */}
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Bell className="w-5 h-5 text-foreground/70" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
              </motion.button>
            )}

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
