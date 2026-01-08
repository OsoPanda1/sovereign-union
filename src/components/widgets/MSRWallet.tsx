/**
 * 🛰️ TAMV MSR Wallet Widget - MD-X4™ HYPERREAL
 * Wallet conectada a la base de datos con transacciones reales
 */
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  RefreshCw, Send, QrCode, Shield, Sparkles,
  ChevronRight, History, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Transaction {
  id: string;
  type: string;
  description: string | null;
  amount: number;
  created_at: string;
}

export const MSRWallet = () => {
  const { isAuthenticated, user } = useAuth();
  const { wallet, profile, loading } = useProfile();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoadingTx(false);
      return;
    }

    const fetchTransactions = async () => {
      const { data } = await supabase
        .from("msr_ledger")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setTransactions(data || []);
      setLoadingTx(false);
    };

    fetchTransactions();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <motion.div 
        className="card-sovereign rounded-3xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gold-metallic flex items-center justify-center opacity-40">
          <Wallet className="w-8 h-8 text-primary-foreground" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Inicia sesión para ver tu wallet
        </p>
        <Button variant="sovereign" size="sm" asChild>
          <a href="/auth">Acceder a la Federación</a>
        </Button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div 
        className="card-sovereign rounded-3xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </motion.div>
    );
  }

  const balance = wallet?.balance ?? 0;
  const lockedBalance = wallet?.locked_balance ?? 0;

  return (
    <motion.div 
      className="card-sovereign rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Balance Header with Premium Gold Gradient */}
      <div className="relative p-6 wallet-header overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-orbitron text-muted-foreground tracking-[0.2em]">
                BALANCE SOBERANO
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="p-2.5 rounded-xl glass-sovereign hover:border-primary/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </div>

          {/* Main Balance Display */}
          <div className="flex items-baseline gap-2 mb-3">
            <motion.span 
              className="font-orbitron text-5xl font-black msr-value"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {balance.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.span>
            <span className="text-xl font-orbitron text-gold-3d font-bold">MSR</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <div className="flex items-center gap-1.5 text-accent">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-medium">+12.5% esta semana</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>≈ ${(balance * 0.2).toFixed(2)} USD</span>
            </div>
          </div>

          {/* Mini Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-4 rounded-2xl glass-sovereign">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Bloqueado</span>
              </div>
              <p className="font-orbitron text-sm font-bold text-foreground">
                {lockedBalance.toFixed(2)} <span className="text-xs text-muted-foreground">MSR</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-sovereign">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Reputación</span>
              </div>
              <p className="font-orbitron text-sm font-bold text-foreground">
                {profile?.reputation_score ?? 0} <span className="text-xs text-muted-foreground">pts</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 p-4 border-b border-primary/10">
        <QuickAction icon={Send} label="Enviar" />
        <QuickAction icon={QrCode} label="Recibir" />
        <QuickAction icon={RefreshCw} label="Swap" />
      </div>

      {/* Transactions */}
      <div className="p-4">
        <h4 className="text-[10px] font-orbitron text-muted-foreground tracking-[0.2em] mb-4">
          MOVIMIENTOS RECIENTES
        </h4>
        
        {loadingTx ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-[11px] text-muted-foreground">Sin movimientos aún</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <TransactionItem transaction={tx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Button variant="glass" className="w-full mt-4" size="sm">
          <History className="w-4 h-4 mr-2" />
          Ver historial completo
        </Button>
      </div>
    </motion.div>
  );
};

const QuickAction = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2.5 p-4 rounded-xl glass-sovereign hover:border-primary/20 transition-all group"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
  </motion.button>
);

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isPositive = transaction.amount > 0;
  const typeLabels: Record<string, string> = {
    EARNING: "Ganancia",
    RESILIENCE: "Fondo Fénix",
    INFRASTRUCTURE: "Infraestructura",
    TRANSFER: "Transferencia",
    LOTTERY_TICKET: "Ticket Lotería",
    LOTTERY_WIN: "Premio Lotería",
    COURSE_REWARD: "Recompensa Curso",
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return `Hace ${diffDays}d`;
  };

  return (
    <motion.div 
      className="flex items-center justify-between p-3.5 rounded-xl glass-sovereign hover:border-primary/20 transition-all cursor-pointer"
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          isPositive ? "bg-accent/15" : "bg-destructive/15"
        }`}>
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-accent" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-destructive" />
          )}
        </div>
        <div>
          <p className="text-[12px] text-foreground font-medium">
            {transaction.description || typeLabels[transaction.type] || transaction.type}
          </p>
          <p className="text-[10px] text-muted-foreground">{formatDate(transaction.created_at)}</p>
        </div>
      </div>
      <span className={`font-orbitron text-sm font-bold ${
        isPositive ? "text-accent" : "text-destructive"
      }`}>
        {isPositive ? "+" : ""}{transaction.amount.toFixed(2)} MSR
      </span>
    </motion.div>
  );
};

export default MSRWallet;
