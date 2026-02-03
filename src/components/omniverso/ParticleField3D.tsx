/**
 * ✨ PARTICLE FIELD 3D - TAMV Omniverso
 * Campo de partículas doradas/turquesas flotantes con efecto 4D
 */
import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: "gold" | "turquoise";
  delay: number;
  duration: number;
  opacity: number;
}

interface ParticleField3DProps {
  count?: number;
  className?: string;
}

export const ParticleField3D = ({ count = 40, className = "" }: ParticleField3DProps) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: Math.random() > 0.7 ? "turquoise" : "gold",
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.6,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color === "gold" 
              ? `radial-gradient(circle, hsla(45, 100%, 70%, ${p.opacity}) 0%, hsla(45, 92%, 58%, ${p.opacity * 0.5}) 50%, transparent 100%)`
              : `radial-gradient(circle, hsla(168, 84%, 60%, ${p.opacity}) 0%, hsla(168, 84%, 48%, ${p.opacity * 0.5}) 50%, transparent 100%)`,
            boxShadow: p.color === "gold"
              ? `0 0 ${p.size * 3}px hsla(45, 92%, 58%, ${p.opacity * 0.8})`
              : `0 0 ${p.size * 3}px hsla(168, 84%, 48%, ${p.opacity * 0.8})`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.5, 1],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Orbes grandes de energía */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: 80 + i * 20,
            height: 80 + i * 20,
            background: i % 2 === 0
              ? `radial-gradient(circle, hsla(45, 92%, 58%, 0.08) 0%, transparent 70%)`
              : `radial-gradient(circle, hsla(168, 84%, 48%, 0.06) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField3D;
