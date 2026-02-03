/**
 * 🔮 LAYER NAVIGATOR - TAMV 7 Capas Arquitectónicas
 * Navegación por orbes de las capas del ecosistema federal
 */
import { motion } from "framer-motion";
import { 
  User, 
  MessageCircle, 
  Database, 
  Brain, 
  Coins, 
  Building2, 
  BookOpen,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

interface Layer {
  id: string;
  name: string;
  nameEs: string;
  icon: React.ElementType;
  color: string;
  description: string;
  modules: string[];
}

const layers: Layer[] = [
  {
    id: "identity",
    name: "Identity",
    nameEs: "Identidad",
    icon: User,
    color: "hsl(45, 92%, 58%)",
    description: "Identidad soberana, perfiles, verificación KYC, credenciales",
    modules: ["ID-NVIDA", "Verificación", "Credenciales", "Perfiles"]
  },
  {
    id: "communication",
    name: "Communication",
    nameEs: "Comunicación",
    icon: MessageCircle,
    color: "hsl(168, 84%, 48%)",
    description: "Mensajería cifrada, DreamSpaces, grupos, canales",
    modules: ["Chat Soberano", "DreamSpaces", "Canales", "Streaming"]
  },
  {
    id: "information",
    name: "Information",
    nameEs: "Información",
    icon: Database,
    color: "hsl(200, 80%, 55%)",
    description: "Almacenamiento descentralizado, CDN, archivos cifrados",
    modules: ["BookPI", "Storage", "CDN", "Archivos"]
  },
  {
    id: "intelligence",
    name: "Intelligence",
    nameEs: "Inteligencia",
    icon: Brain,
    color: "hsl(280, 75%, 60%)",
    description: "Isabella AI, procesamiento ético, inferencia local",
    modules: ["Isabella Core", "Study Helper", "Pen2PDF", "Spatial AI"]
  },
  {
    id: "economy",
    name: "Economy",
    nameEs: "Economía",
    icon: Coins,
    color: "hsl(45, 100%, 65%)",
    description: "MSR Token, Nubiwallet, Marketplace, Lotería",
    modules: ["MSR Blockchain", "Nubiwallet", "Alamexa", "Lotería TAMV"]
  },
  {
    id: "governance",
    name: "Governance",
    nameEs: "Gobernanza",
    icon: Building2,
    color: "hsl(0, 70%, 55%)",
    description: "DAOs, votación, constitución digital, federación",
    modules: ["Dekateotl DAO", "Votación", "Constitución", "Federación"]
  },
  {
    id: "documentation",
    name: "Documentation",
    nameEs: "Documentación",
    icon: BookOpen,
    color: "hsl(220, 60%, 60%)",
    description: "Whitepapers, APIs, guías, DevHub completo",
    modules: ["DevHub", "APIs", "Whitepapers", "Guías"]
  }
];

export const LayerNavigator = () => {
  const [activeLayer, setActiveLayer] = useState<Layer | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section Title */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-orbitron font-bold text-gold-3d mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ARQUITECTURA FEDERAL
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          7 capas soberanas que forman el ecosistema civilizatorio
        </motion.p>
      </div>

      {/* Layer Orbs */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {layers.map((layer, index) => (
            <motion.button
              key={layer.id}
              className="relative group"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              onMouseEnter={() => setHoveredId(layer.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setActiveLayer(activeLayer?.id === layer.id ? null : layer)}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle, ${layer.color}40 0%, transparent 70%)`
                }}
                animate={hoveredId === layer.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Main orb */}
              <motion.div
                className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                  activeLayer?.id === layer.id 
                    ? "ring-2 ring-offset-2 ring-offset-background ring-primary" 
                    : ""
                }`}
                style={{
                  background: activeLayer?.id === layer.id
                    ? `linear-gradient(135deg, ${layer.color}, ${layer.color}80)`
                    : `linear-gradient(135deg, rgba(30,30,40,0.9), rgba(20,20,28,0.8))`,
                  border: `1px solid ${hoveredId === layer.id || activeLayer?.id === layer.id ? layer.color : `${layer.color}30`}`,
                  boxShadow: hoveredId === layer.id || activeLayer?.id === layer.id
                    ? `0 0 30px ${layer.color}50, inset 0 2px 4px rgba(255,255,255,0.1)`
                    : `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.05)`
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <layer.icon 
                  className="w-6 h-6 mb-1" 
                  style={{ 
                    color: activeLayer?.id === layer.id ? "hsl(220, 15%, 8%)" : layer.color 
                  }} 
                />
                <span 
                  className="text-[9px] font-orbitron font-bold uppercase tracking-wider"
                  style={{ 
                    color: activeLayer?.id === layer.id ? "hsl(220, 15%, 8%)" : layer.color 
                  }}
                >
                  {layer.nameEs.slice(0, 5)}
                </span>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Active Layer Detail */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={false}
          animate={{ 
            height: activeLayer ? "auto" : 0,
            opacity: activeLayer ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          {activeLayer && (
            <div 
              className="card-sovereign rounded-3xl p-8 text-center"
              style={{ borderColor: `${activeLayer.color}30` }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <activeLayer.icon className="w-8 h-8" style={{ color: activeLayer.color }} />
                <h3 
                  className="text-2xl font-orbitron font-bold"
                  style={{ color: activeLayer.color }}
                >
                  {activeLayer.nameEs}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6">{activeLayer.description}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {activeLayer.modules.map((module) => (
                  <span
                    key={module}
                    className="px-3 py-1.5 rounded-full text-xs font-mono"
                    style={{
                      background: `${activeLayer.color}15`,
                      color: activeLayer.color,
                      border: `1px solid ${activeLayer.color}30`
                    }}
                  >
                    {module}
                  </span>
                ))}
              </div>

              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-orbitron text-sm transition-colors"
                style={{
                  background: activeLayer.color,
                  color: "hsl(220, 15%, 8%)"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explorar {activeLayer.nameEs}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LayerNavigator;
