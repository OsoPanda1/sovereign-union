/**
 * 🛰️ TAMV MSR Wallet Widget - MD-X4™
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

  // Fetch recent transactions
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
        className="glass-sovereign rounded-3xl border border-primary/10 p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Wallet className="w-12 h-12 text-primary/30 mx-auto mb-4" />
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
        className="glass-sovereign rounded-3xl border border-primary/10 overflow-hidden"
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
      className="glass-sovereign rounded-3xl border border-primary/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Balance Header */}
      <div className="relative p-6 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-orbitron text-muted-foreground tracking-widest">
                BALANCE SOBERANO
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <motion.span 
              className="font-orbitron text-4xl font-black text-primary text-shadow-gold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {balance.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.span>
            <span className="text-lg text-primary font-orbitron">MSR</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1 text-accent">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5% esta semana</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>≈ ${(balance * 0.2).toFixed(2)} USD</span>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-2xl bg-secondary/30 border border-primary/5">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-3 h-3 text-accent" />
                <span className="text-[9px] text-muted-foreground uppercase">Bloqueado</span>
              </div>
              <p className="font-orbitron text-sm text-foreground">
                {lockedBalance.toFixed(2)} MSR
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-secondary/30 border border-primary/5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[9px] text-muted-foreground uppercase">Reputación</span>
              </div>
              <p className="font-orbitron text-sm text-foreground">
                {profile?.reputation_score ?? 0} pts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-primary/5">
        <QuickAction icon={Send} label="Enviar" />
        <QuickAction icon={QrCode} label="Recibir" />
        <QuickAction icon={RefreshCw} label="Swap" />
      </div>

      {/* Transactions */}
      <div className="p-4">
        <h4 className="text-[10px] font-orbitron text-muted-foreground tracking-widest mb-3">
          MOVIMIENTOS RECIENTES
        </h4>
        
        {loadingTx ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6">
            <History className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-[10px] text-muted-foreground">Sin movimientos aún</p>
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
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/20"
  >
    <Icon className="w-5 h-5 text-primary" />
    <span className="text-[9px] text-muted-foreground">{label}</span>
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
      className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors"
      whileHover={{ x: 3 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isPositive ? "bg-accent/20" : "bg-destructive/20"
        }`}>
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-accent" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-destructive" />
          )}
        </div>
        <div>
          <p className="text-[11px] text-foreground">
            {transaction.description || typeLabels[transaction.type] || transaction.type}
          </p>
          <p className="text-[9px] text-muted-foreground">{formatDate(transaction.created_at)}</p>
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
