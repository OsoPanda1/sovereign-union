 /**
  * 💰 NUBIWALLET - Billetera Soberana MSR
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Wallet, Send, Download, History, TrendingUp, Shield, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useProfile } from "@/hooks/useProfile";
 import { useAuth } from "@/hooks/useAuth";
 import { useEffect, useState } from "react";
 import { supabase } from "@/integrations/supabase/client";
 
 interface Transaction {
   id: string;
   amount: number;
   type: string;
   description: string | null;
   created_at: string;
 }
 
 const WalletPage = () => {
   const { wallet, loading } = useProfile();
   const { user, isAuthenticated } = useAuth();
   const [transactions, setTransactions] = useState<Transaction[]>([]);
 
   useEffect(() => {
     if (user) {
       supabase
         .from("msr_ledger")
         .select("*")
         .eq("user_id", user.id)
         .order("created_at", { ascending: false })
         .limit(10)
         .then(({ data }) => {
           if (data) setTransactions(data);
         });
     }
   }, [user]);
 
   if (!isAuthenticated) {
     return (
       <div className="min-h-screen bg-background">
         <SovereignNav />
         <main className="pt-24 pb-12 flex items-center justify-center">
           <div className="text-center">
             <Wallet className="w-16 h-16 text-primary/30 mx-auto mb-4" />
             <h2 className="font-orbitron text-xl text-foreground mb-2">Acceso Requerido</h2>
             <p className="text-muted-foreground">Inicia sesión para acceder a tu billetera MSR</p>
           </div>
         </main>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4 max-w-4xl">
           {/* Main Balance Card */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-sovereign rounded-3xl p-8 border border-primary/20 mb-8 relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center">
                   <Wallet className="w-6 h-6 text-primary-foreground" />
                 </div>
                 <div>
                   <h1 className="font-orbitron text-lg font-bold text-foreground">NUBIWALLET</h1>
                   <p className="text-xs text-muted-foreground">Billetera Soberana MSR</p>
                 </div>
                 <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full">
                   <Shield className="w-3 h-3 text-accent" />
                   <span className="text-[10px] text-accent font-mono">ANUBIS PROTECTED</span>
                 </div>
               </div>
 
               <div className="mb-8">
                 <p className="text-sm text-muted-foreground mb-1">BALANCE DISPONIBLE</p>
                 <motion.p 
                   className="font-orbitron text-5xl font-black text-gold-3d"
                   initial={{ scale: 0.9 }}
                   animate={{ scale: 1 }}
                 >
                   {loading ? "..." : wallet?.balance.toLocaleString("es-MX", { minimumFractionDigits: 2 })} 
                   <span className="text-xl ml-2">MSR</span>
                 </motion.p>
                 {wallet?.locked_balance && wallet.locked_balance > 0 && (
                   <p className="text-xs text-muted-foreground mt-2">
                     + {wallet.locked_balance.toLocaleString()} MSR bloqueados
                   </p>
                 )}
               </div>
 
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                 <ActionButton icon={Send} label="Enviar" />
                 <ActionButton icon={Download} label="Recibir" />
                 <ActionButton icon={CreditCard} label="Tarjeta" />
                 <ActionButton icon={TrendingUp} label="Invertir" />
               </div>
             </div>
           </motion.div>
 
           {/* Quick Stats */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
             <StatCard label="Ingresos (7d)" value="+234.50" positive />
             <StatCard label="Gastos (7d)" value="-89.20" positive={false} />
             <StatCard label="Propinas Dadas" value="45.00" />
             <StatCard label="Recompensas" value="+156.30" positive />
           </div>
 
           {/* Transaction History */}
           <div className="glass-sovereign rounded-2xl p-6 border border-primary/10">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <History className="w-5 h-5 text-primary" />
                 <h2 className="font-orbitron text-lg font-bold text-foreground">HISTORIAL</h2>
               </div>
               <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                 Ver Todo
               </Button>
             </div>
 
             {transactions.length === 0 ? (
               <div className="text-center py-8">
                 <History className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                 <p className="text-sm text-muted-foreground">Sin transacciones recientes</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {transactions.map((tx, i) => (
                   <motion.div
                     key={tx.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                   >
                     <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                         tx.amount > 0 ? "bg-accent/20" : "bg-destructive/20"
                       }`}>
                         {tx.amount > 0 ? (
                           <ArrowDownLeft className="w-5 h-5 text-accent" />
                         ) : (
                           <ArrowUpRight className="w-5 h-5 text-destructive" />
                         )}
                       </div>
                       <div>
                         <p className="text-sm font-medium text-foreground">{tx.description || tx.type}</p>
                         <p className="text-[10px] text-muted-foreground">
                           {new Date(tx.created_at).toLocaleDateString("es-MX")}
                         </p>
                       </div>
                     </div>
                     <p className={`font-orbitron font-bold ${tx.amount > 0 ? "text-accent" : "text-foreground"}`}>
                       {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} MSR
                     </p>
                   </motion.div>
                 ))}
               </div>
             )}
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 const ActionButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
   <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 border-primary/20 hover:bg-primary/10">
     <Icon className="w-5 h-5 text-primary" />
     <span className="text-xs">{label}</span>
   </Button>
 );
 
 const StatCard = ({ label, value, positive }: { label: string; value: string; positive?: boolean }) => (
   <div className="glass-sovereign rounded-xl p-4 border border-primary/10">
     <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
     <p className={`font-orbitron text-lg font-bold ${
       positive === true ? "text-accent" : positive === false ? "text-destructive" : "text-foreground"
     }`}>
       {value} MSR
     </p>
   </div>
 );
 
 export default WalletPage;