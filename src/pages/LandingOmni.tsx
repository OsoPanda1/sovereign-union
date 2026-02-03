/**
 * 🌌 LANDING OMNIVERSO - TAMV Portal Principal
 * Página de entrada con experiencia inmersiva 4D
 */
import HeroPortal from "@/components/omniverso/HeroPortal";
import LayerNavigator from "@/components/omniverso/LayerNavigator";
import StatsShowcase from "@/components/omniverso/StatsShowcase";
import FeatureGrid from "@/components/omniverso/FeatureGrid";
import FooterOmni from "@/components/omniverso/FooterOmni";

const LandingOmni = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Portal - Entry Point */}
      <HeroPortal />
      
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
