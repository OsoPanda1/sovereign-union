/**
 * ✨ FEATURE GRID - TAMV Omniverso
 * Grid de características principales con efectos premium
 */
import { motion } from "framer-motion";
import { 
  Shield, 
  Brain, 
  Coins, 
  GraduationCap, 
  Gamepad2, 
  Vote,
  Heart,
  Globe,
  Lock
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "Isabella AI",
    description: "IA ética con 3 niveles de explicación. Nunca una caja negra.",
    tag: "INTELIGENCIA",
    color: "hsl(280, 75%, 60%)"
  },
  {
    icon: Coins,
    title: "MSR Blockchain",
    description: "Economía justa 70/20/10. El crecimiento beneficia a todos.",
    tag: "ECONOMÍA",
    color: "hsl(45, 92%, 58%)"
  },
  {
    icon: Shield,
    title: "Cámara de la Muerte v3.0",
    description: "Seguridad antifrágil que se fortalece con cada ataque.",
    tag: "SEGURIDAD",
    color: "hsl(0, 70%, 55%)"
  },
  {
    icon: GraduationCap,
    title: "Universidad TAMV",
    description: "Certificaciones inmutables. Nadie puede revocar tu conocimiento.",
    tag: "EDUCACIÓN",
    color: "hsl(168, 84%, 48%)"
  },
  {
    icon: Globe,
    title: "DreamSpaces XR",
    description: "Espacios virtuales donde TÚ decides las reglas.",
    tag: "METAVERSO",
    color: "hsl(200, 80%, 55%)"
  },
  {
    icon: Vote,
    title: "Democracia Real",
    description: "Vota en decisiones que se implementan automáticamente.",
    tag: "GOBERNANZA",
    color: "hsl(30, 80%, 55%)"
  },
  {
    icon: Heart,
    title: "Salud Soberana",
    description: "Tus datos médicos bajo tu control criptográfico.",
    tag: "SALUD",
    color: "hsl(350, 75%, 55%)"
  },
  {
    icon: Gamepad2,
    title: "Gaming Ético",
    description: "Juegos donde los creadores reciben lo que merecen.",
    tag: "GAMING",
    color: "hsl(270, 70%, 55%)"
  },
  {
    icon: Lock,
    title: "Zero Knowledge",
    description: "Never Reveal, Only Prove. Privacidad absoluta.",
    tag: "PRIVACIDAD",
    color: "hsl(220, 60%, 60%)"
  }
];

export const FeatureGrid = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-gold-3d mb-4">
            SERVICIOS SOBERANOS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tecnología que te sirve a ti, no al revés
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className="card-sovereign rounded-3xl p-6 h-full relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Background gradient on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${feature.color}10, transparent 70%)`
                  }}
                />

                {/* Tag */}
                <span 
                  className="inline-block px-3 py-1 rounded-full text-[9px] font-orbitron font-bold tracking-wider mb-4"
                  style={{
                    background: `${feature.color}15`,
                    color: feature.color,
                    border: `1px solid ${feature.color}30`
                  }}
                >
                  {feature.tag}
                </span>

                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`,
                    border: `1px solid ${feature.color}25`,
                    boxShadow: `0 4px 20px ${feature.color}10`
                  }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-orbitron font-bold text-foreground mb-2 group-hover:text-gold-3d transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover line effect */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
