import { motion } from "framer-motion";
import { Ticket, Timer, Users, Zap, Gift, Crown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const LotteryWidget = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="card-sovereign rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header with Premium Gradient */}
      <div className="relative p-6 lottery-glow overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Floating gold particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary"
          style={{ boxShadow: '0 0 15px hsla(45, 92%, 58%, 0.8)' }}
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-accent"
          style={{ boxShadow: '0 0 10px hsla(168, 84%, 48%, 0.8)' }}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Ticket className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              </div>
              <h3 className="font-orbitron text-[11px] text-foreground tracking-[0.15em] uppercase">
                Lotería MSR
              </h3>
            </div>
            <span className="text-[9px] font-orbitron text-accent tracking-widest px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
              CUÁNTICA
            </span>
          </div>

          {/* Jackpot Display */}
          <div className="text-center mb-6">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mb-2">
              Premio Acumulado
            </p>
            <motion.div 
              className="flex items-center justify-center gap-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-orbitron text-4xl font-black msr-value">
                  12,450
                </span>
                <span className="text-lg font-orbitron text-gold-3d font-bold">MSR</span>
              </div>
            </motion.div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <Timer className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <TimeBlock value={timeLeft.hours} label="H" />
              <span className="text-xl font-orbitron text-gold-3d">:</span>
              <TimeBlock value={timeLeft.minutes} label="M" />
              <span className="text-xl font-orbitron text-gold-3d">:</span>
              <TimeBlock value={timeLeft.seconds} label="S" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>2,847 participantes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-medium">12% probabilidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="p-5 bg-card/50">
        <Button 
          variant="sovereign" 
          className="w-full py-6 text-sm"
          size="lg"
        >
          <Ticket className="w-4 h-4 mr-2" />
          Participar · 10 MSR
        </Button>
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-muted-foreground">
          <Crown className="w-3 h-3 text-primary" />
          <span>70% del fondo va a los ganadores · Justicia Korima</span>
        </div>
      </div>
    </motion.div>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <motion.div 
      key={value}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="px-3 py-2 rounded-xl glass-sovereign border border-primary/15 min-w-[3.5rem] text-center"
    >
      <span className="font-orbitron text-xl font-bold text-foreground">
        {value.toString().padStart(2, "0")}
      </span>
    </motion.div>
  </div>
);

export default LotteryWidget;
