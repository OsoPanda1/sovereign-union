 /**
  * 🎰 LOTERÍA CUÁNTICA MSR - Redistribución Justa
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Ticket, Trophy, Clock, Users, Sparkles, History, AlertCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useState, useEffect } from "react";
 import { supabase } from "@/integrations/supabase/client";
 
 const Lottery = () => {
   const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });
   const [currentRound, setCurrentRound] = useState<any>(null);
 
   useEffect(() => {
     // Fetch current lottery round
     supabase
       .from("lottery_rounds")
       .select("*")
       .eq("status", "active")
       .order("created_at", { ascending: false })
       .limit(1)
       .single()
       .then(({ data }) => {
         if (data) setCurrentRound(data);
       });
 
     // Countdown timer
     const timer = setInterval(() => {
       setTimeLeft(prev => {
         if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
         if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
         if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
         return prev;
       });
     }, 1000);
 
     return () => clearInterval(timer);
   }, []);
 
   const pastWinners = [
     { id: 1, name: "Ciudadano_4521", prize: 15000, date: "2024-01-15" },
     { id: 2, name: "KorimaCreator", prize: 8500, date: "2024-01-14" },
     { id: 3, name: "XR_Developer", prize: 12000, date: "2024-01-13" },
   ];
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-12"
           >
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4">
               <Ticket className="w-8 h-8 text-primary-foreground" />
             </div>
             <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">LOTERÍA CUÁNTICA MSR</h1>
             <p className="text-muted-foreground max-w-md mx-auto">
               Redistribución justa de riqueza mediante entropía caótica verificable
             </p>
           </motion.div>
 
           {/* Current Round Card */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="max-w-2xl mx-auto mb-12"
           >
             <div className="glass-sovereign rounded-3xl p-8 border border-primary/20 relative overflow-hidden">
               {/* Animated Background */}
               <div className="absolute inset-0 opacity-10">
                 <motion.div
                   className="absolute top-0 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl"
                   animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                 />
                 <motion.div
                   className="absolute bottom-0 right-1/4 w-24 h-24 bg-accent rounded-full blur-2xl"
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 3, repeat: Infinity }}
                 />
               </div>
 
               <div className="relative z-10">
                 <div className="flex items-center justify-center gap-2 mb-6">
                   <Sparkles className="w-5 h-5 text-primary" />
                   <span className="text-sm font-orbitron text-primary">RONDA ACTIVA</span>
                   <Sparkles className="w-5 h-5 text-primary" />
                 </div>
 
                 {/* Prize Pool */}
                 <div className="text-center mb-8">
                   <p className="text-sm text-muted-foreground mb-2">PREMIO ACUMULADO</p>
                   <motion.p 
                     className="font-orbitron text-5xl font-black text-gold-3d"
                     animate={{ scale: [1, 1.02, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   >
                     {currentRound?.prize_pool?.toLocaleString() || "25,847"} MSR
                   </motion.p>
                 </div>
 
                 {/* Countdown */}
                 <div className="flex items-center justify-center gap-4 mb-8">
                   <TimeBlock value={timeLeft.hours} label="HORAS" />
                   <span className="text-2xl text-primary font-bold">:</span>
                   <TimeBlock value={timeLeft.minutes} label="MINS" />
                   <span className="text-2xl text-primary font-bold">:</span>
                   <TimeBlock value={timeLeft.seconds} label="SEGS" />
                 </div>
 
                 {/* Stats */}
                 <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="text-center p-3 rounded-xl bg-secondary/50">
                     <Users className="w-5 h-5 text-accent mx-auto mb-1" />
                     <p className="font-orbitron text-lg font-bold text-foreground">
                       {currentRound?.participants_count || 1247}
                     </p>
                     <p className="text-[10px] text-muted-foreground">PARTICIPANTES</p>
                   </div>
                   <div className="text-center p-3 rounded-xl bg-secondary/50">
                     <Ticket className="w-5 h-5 text-primary mx-auto mb-1" />
                     <p className="font-orbitron text-lg font-bold text-foreground">
                       {currentRound?.ticket_price || 1} MSR
                     </p>
                     <p className="text-[10px] text-muted-foreground">POR TICKET</p>
                   </div>
                   <div className="text-center p-3 rounded-xl bg-secondary/50">
                     <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                     <p className="font-orbitron text-lg font-bold text-foreground">70%</p>
                     <p className="text-[10px] text-muted-foreground">AL GANADOR</p>
                   </div>
                 </div>
 
                 {/* Buy Tickets */}
                 <Button className="w-full gold-metallic font-orbitron text-lg py-6">
                   <Ticket className="w-5 h-5 mr-2" />
                   COMPRAR TICKETS
                 </Button>
 
                 <p className="text-center text-xs text-muted-foreground mt-4">
                   <AlertCircle className="w-3 h-3 inline mr-1" />
                   Selección por VRF (Verifiable Random Function) en blockchain MSR
                 </p>
               </div>
             </div>
           </motion.div>
 
           {/* Past Winners */}
           <div className="max-w-2xl mx-auto">
             <div className="flex items-center gap-2 mb-4">
               <History className="w-5 h-5 text-primary" />
               <h2 className="font-orbitron text-lg font-bold text-foreground">GANADORES RECIENTES</h2>
             </div>
             <div className="space-y-3">
               {pastWinners.map((winner, i) => (
                 <motion.div
                   key={winner.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="glass-sovereign rounded-xl p-4 border border-primary/10 flex items-center justify-between"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                       <Trophy className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <p className="font-orbitron text-sm font-bold text-foreground">{winner.name}</p>
                       <p className="text-xs text-muted-foreground">{winner.date}</p>
                     </div>
                   </div>
                   <p className="font-orbitron text-lg font-bold text-gold-3d">+{winner.prize.toLocaleString()} MSR</p>
                 </motion.div>
               ))}
             </div>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 const TimeBlock = ({ value, label }: { value: number; label: string }) => (
   <div className="text-center">
     <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-1">
       <span className="font-orbitron text-2xl font-black text-foreground">
         {value.toString().padStart(2, '0')}
       </span>
     </div>
     <span className="text-[9px] text-muted-foreground">{label}</span>
   </div>
 );
 
 export default Lottery;