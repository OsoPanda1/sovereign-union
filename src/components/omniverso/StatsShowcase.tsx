/**
 * 📊 STATS SHOWCASE - TAMV Omniverso
 * Estadísticas con efectos 3D y animaciones premium
 */
import { motion } from "framer-motion";
import { Users, Zap, Shield, Sparkles, Globe, Database } from "lucide-react";
import { useEffect, useState } from "react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { icon: Users, value: 12847, suffix: "", label: "Ciudadanos Activos", color: "hsl(45, 92%, 58%)" },
  { icon: Zap, value: 45239, suffix: "", label: "Transacciones Hoy", color: "hsl(168, 84%, 48%)" },
  { icon: Shield, value: 2.4, suffix: "TB", label: "Datos Cifrados", color: "hsl(200, 80%, 55%)" },
  { icon: Sparkles, value: 847.5, suffix: "K", label: "MSR Circulando", color: "hsl(280, 75%, 60%)" },
  { icon: Globe, value: 7, suffix: "", label: "Capas Federadas", color: "hsl(0, 70%, 55%)" },
  { icon: Database, value: 99.9, suffix: "%", label: "Uptime", color: "hsl(120, 60%, 50%)" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = value >= 1000 
    ? count.toLocaleString('es-MX', { maximumFractionDigits: 1 })
    : count.toFixed(value % 1 === 0 ? 0 : 1);

  return <>{formatted}{suffix}</>;
};

export const StatsShowcase = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: 'hsla(45, 92%, 58%, 0.3)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: 'hsla(168, 84%, 48%, 0.3)' }} />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-gold-3d mb-3">
            MÉTRICAS EN TIEMPO REAL
          </h2>
          <p className="text-muted-foreground">
            El pulso del ecosistema civilizatorio
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Card */}
              <motion.div
                className="card-sovereign rounded-2xl p-5 text-center h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon container with glow */}
                <div 
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: `0 0 20px ${stat.color}50` }}
                  />
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>

                {/* Value with counter animation */}
                <motion.div
                  className="text-2xl md:text-3xl font-orbitron font-black mb-2"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.div>

                {/* Label */}
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;
