import { motion } from "framer-motion";
import { 
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, 
  ArrowDownRight, RefreshCw, Send, QrCode 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: "earning" | "spending" | "transfer";
  description: string;
  amount: number;
  timestamp: string;
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    type: "earning",
    description: "Recompensa de publicación",
    amount: 12.5,
    timestamp: "Hace 2h",
  },
  {
    id: "2",
    type: "spending",
    description: "Lotería Cuántica",
    amount: -10.0,
    timestamp: "Hace 4h",
  },
  {
    id: "3",
    type: "earning",
    description: "Justicia 70% - Curso completado",
    amount: 35.0,
    timestamp: "Hace 1d",
  },
];

export const MSRWallet = () => {
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
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-[10px] font-orbitron text-muted-foreground tracking-widest">
              BALANCE SOBERANO
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <motion.span 
              className="font-orbitron text-4xl font-black text-primary text-shadow-gold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              1,240.00
            </motion.span>
            <span className="text-lg text-primary font-orbitron">MSR</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1 text-accent">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5% esta semana</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>≈ $248.00 USD</span>
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
        <div className="space-y-2">
          {recentTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <TransactionItem transaction={tx} />
            </motion.div>
          ))}
        </div>

        <Button variant="glass" className="w-full mt-4" size="sm">
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
          <p className="text-[11px] text-foreground">{transaction.description}</p>
          <p className="text-[9px] text-muted-foreground">{transaction.timestamp}</p>
        </div>
      </div>
      <span className={`font-orbitron text-sm font-bold ${
        isPositive ? "text-accent" : "text-destructive"
      }`}>
        {isPositive ? "+" : ""}{transaction.amount.toFixed(1)} MSR
      </span>
    </motion.div>
  );
};

export default MSRWallet;
