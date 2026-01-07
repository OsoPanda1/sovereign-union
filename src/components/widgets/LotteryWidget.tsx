import { motion } from "framer-motion";
import { Ticket, Timer, Users, Zap, Gift } from "lucide-react";
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
      className="rounded-3xl overflow-hidden border border-primary/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header Gradient */}
      <div className="relative p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Ticket className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="font-orbitron text-[11px] text-foreground tracking-widest uppercase">
                Lotería MSR
              </h3>
            </div>
            <span className="text-[9px] font-mono text-accent">CUÁNTICA</span>
          </div>

          {/* Jackpot */}
          <div className="text-center mb-4">
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">
              Premio Acumulado
            </p>
            <motion.div 
              className="flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Gift className="w-6 h-6 text-primary" />
              <span className="font-orbitron text-3xl font-black text-primary text-shadow-gold">
                12,450
              </span>
              <span className="text-sm text-primary font-orbitron">MSR</span>
            </motion.div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Timer className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <TimeBlock value={timeLeft.hours} label="H" />
              <span className="text-primary font-orbitron">:</span>
              <TimeBlock value={timeLeft.minutes} label="M" />
              <span className="text-primary font-orbitron">:</span>
              <TimeBlock value={timeLeft.seconds} label="S" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mb-4 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>2,847 participantes</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-accent">12% probabilidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-4 bg-card/50">
        <Button 
          variant="sovereign" 
          className="w-full"
          size="lg"
        >
          <Ticket className="w-4 h-4 mr-2" />
          Participar · 10 MSR
        </Button>
        <p className="text-[9px] text-center text-muted-foreground mt-3">
          70% del fondo va a los ganadores · Justicia Korima
        </p>
      </div>
    </motion.div>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <motion.span 
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="font-orbitron text-lg font-bold text-foreground bg-secondary/50 px-2 py-1 rounded-lg min-w-[2.5rem] text-center"
    >
      {value.toString().padStart(2, "0")}
    </motion.span>
  </div>
);

export default LotteryWidget;
