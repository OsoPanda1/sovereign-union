import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TAMVChaoticEngine } from "@/crypto/chaotic-engine";
import { Shield, Activity, Lock } from "lucide-react";

const engine = new TAMVChaoticEngine();

export const ChaosVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    let animationId: number;
    let xPos = 0;

    const draw = () => {
      // Fade effect
      ctx.fillStyle = "rgba(2, 2, 2, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Generate chaotic values
      const sequence = engine.generateSequence(3);
      
      // Draw chaotic line
      const y = height * 0.5 + (sequence[0] - 0.5) * height * 0.8;
      
      // Gold color with varying opacity
      const opacity = 0.3 + sequence[1] * 0.7;
      ctx.beginPath();
      ctx.arc(xPos, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.fill();

      // Turquoise accent
      if (sequence[2] > 0.8) {
        ctx.beginPath();
        ctx.arc(xPos, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.5)";
        ctx.fill();
      }

      xPos = (xPos + 1) % width;

      if (isActive) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <motion.div 
      className="glass-sovereign rounded-3xl overflow-hidden border border-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-orbitron text-foreground tracking-widest">
            ANUBIS SHIELD
          </span>
        </div>
        <motion.div 
          className="flex items-center gap-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Activity className="w-3 h-3 text-accent" />
          <span className="text-[9px] text-accent font-mono">ENCRYPTING</span>
        </motion.div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="w-full h-24 bg-obsidian"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian via-transparent to-obsidian opacity-50" />
      </div>

      {/* Status */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-primary" />
          <span className="text-[9px] text-muted-foreground">Cifrado Caótico 4D</span>
        </div>
        <span className="text-[9px] font-mono text-primary">
          λ = 3.9999
        </span>
      </div>
    </motion.div>
  );
};

export default ChaosVisualizer;
