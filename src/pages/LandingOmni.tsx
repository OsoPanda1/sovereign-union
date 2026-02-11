/**
 * 🌌 LANDING OMNIVERSO - TAMV Portal Principal
 * Página de entrada con experiencia inmersiva 4D cinematográfica
 */
import HeroPortal from "@/components/omniverso/HeroPortal";
import LayerNavigator from "@/components/omniverso/LayerNavigator";
import StatsShowcase from "@/components/omniverso/StatsShowcase";
import FeatureGrid from "@/components/omniverso/FeatureGrid";
import FooterOmni from "@/components/omniverso/FooterOmni";
import { motion } from "framer-motion";

const LandingOmni = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Persistent ambient effects between sections */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Hero Portal - Entry Point */}
      <HeroPortal />

      {/* Cinematic transition divider */}
      <div className="relative h-24 overflow-hidden">
        <motion.div className="absolute inset-x-0 top-1/2 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(45, 92%, 58%), transparent)' }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }} />
      </div>

      {/* Stats Showcase */}
      <StatsShowcase />

      {/* Layer Navigator - 7 Capas */}
      <LayerNavigator />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Footer */}
      <FooterOmni />
    </div>
  );
};

export default LandingOmni;
