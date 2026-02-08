/**
 * 🌌 DREAMSPACES - Mundos XR Inmersivos con Æther Engine v1.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import { AetherCanvas } from "@/engine/aether";
import { AETHER_THEMES } from "@/engine/aether/themes";
import { Sparkles, Users, Globe, Play, Lock, Star, Compass, Settings2, Maximize, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ThemeId, PolytopeType } from "@/engine/aether/types";

const spaces = [
  { id: 1, name: "Templo de Anubis", type: "Santuario", users: 234, rating: 4.9, premium: false, theme: "santuario-ancestral" as ThemeId, polytope: "pentachoron" as PolytopeType },
  { id: 2, name: "Plaza Korima Central", type: "Social", users: 1567, rating: 4.8, premium: false, theme: "obsidiana-imperial" as ThemeId, polytope: "tesseract" as PolytopeType },
  { id: 3, name: "Laboratorio Isabella", type: "Educativo", users: 89, rating: 5.0, premium: true, theme: "turquesa-viva" as ThemeId, polytope: "icositetrachoron" as PolytopeType },
  { id: 4, name: "Arena de Gladiadores", type: "Gaming", users: 456, rating: 4.7, premium: false, theme: "neo-tokio" as ThemeId, polytope: "hexadecachoron" as PolytopeType },
  { id: 5, name: "Galería Eterna", type: "Arte", users: 123, rating: 4.9, premium: true, theme: "ciudad-solar" as ThemeId, polytope: "tesseract" as PolytopeType },
  { id: 6, name: "Ciudad Tenochtitlán 4D", type: "Histórico", users: 789, rating: 5.0, premium: true, theme: "espacio-politopo" as ThemeId, polytope: "icositetrachoron" as PolytopeType },
];

const DreamSpaces = () => {
  const [activeSpace, setActiveSpace] = useState<typeof spaces[0] | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  if (activeSpace && fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <AetherCanvas
          themeId={activeSpace.theme}
          polytopes={[
            { type: activeSpace.polytope, position: [0, 0, 0], scale: 2 },
            { type: "pentachoron", position: [-4, 1, -3], scale: 1, color: "#2dd4bf" },
            { type: "hexadecachoron", position: [4, -1, -2], scale: 0.8, color: "#ff006e" },
          ]}
          className="w-full h-full"
        />
        {/* HUD Overlay */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10">
          <Button variant="outline" size="sm" className="glass-sovereign border-primary/20" onClick={() => setFullscreen(false)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Salir
          </Button>
          <div className="glass-sovereign rounded-full px-4 py-2 flex items-center gap-3">
            <span className="font-orbitron text-sm text-gold-3d">{activeSpace.name}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <Users className="w-3 h-3 text-accent" />
            <span className="text-xs text-foreground">{activeSpace.users}</span>
          </div>
          <div className="glass-sovereign rounded-full px-3 py-2">
            <span className="text-xs font-orbitron text-accent">ÆTHER v1.0</span>
          </div>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center">
          <div className="glass-sovereign rounded-2xl px-6 py-3 flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Tema: {AETHER_THEMES[activeSpace.theme].name}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-muted-foreground">Polítopo: {activeSpace.polytope}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-accent">Click + arrastrar para orbitar</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SovereignNav />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">DREAMSPACES</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Mundos inmersivos XR/VR/3D/4D con <span className="text-accent font-medium">ÆTHER Engine v1.0</span>
            </p>
          </motion.div>

          {/* Stats Banner */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-sovereign rounded-3xl p-6 border border-primary/20 mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div><p className="font-orbitron text-2xl font-bold text-gold-3d">156</p><p className="text-xs text-muted-foreground">Espacios Activos</p></div>
              <div><p className="font-orbitron text-2xl font-bold text-accent">12.4K</p><p className="text-xs text-muted-foreground">Usuarios Online</p></div>
              <div><p className="font-orbitron text-2xl font-bold text-gold-3d">847</p><p className="text-xs text-muted-foreground">Eventos Hoy</p></div>
              <div><p className="font-orbitron text-2xl font-bold text-accent">4D</p><p className="text-xs text-muted-foreground">Render Activo</p></div>
            </div>
          </motion.div>

          {/* Featured Space with Live 3D Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden mb-8 border border-primary/20"
          >
            <div className="aspect-[21/9] relative">
              <AetherCanvas
                themeId="espacio-politopo"
                polytopes={[
                  { type: "tesseract", position: [0, 0, 0], scale: 2, color: "#d4af37" },
                  { type: "pentachoron", position: [-3, 1, -2], scale: 1.2, color: "#2dd4bf" },
                ]}
                showControls={false}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-8">
                <div>
                  <h2 className="font-orbitron text-2xl font-bold text-foreground mb-2">SANTUARIO REINA TREJO</h2>
                  <p className="text-muted-foreground mb-4">Memorial 3D Interactivo — Polítopo Tesseract 4D</p>
                  <Button className="gold-metallic font-orbitron" onClick={() => { setActiveSpace(spaces[5]); setFullscreen(true); }}>
                    <Play className="w-4 h-4 mr-2" /> ENTRAR AL ESPACIO
                  </Button>
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 rounded-full">
                <span className="text-xs font-orbitron text-primary-foreground font-bold">DESTACADO</span>
              </div>
            </div>
          </motion.div>

          {/* Spaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space, i) => (
              <motion.div key={space.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-sovereign rounded-2xl border border-primary/10 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                onClick={() => setActiveSpace(space)}
              >
                {/* 3D Mini Preview */}
                <div className="relative aspect-video">
                  <AetherCanvas
                    themeId={space.theme}
                    polytopes={[{ type: space.polytope, position: [0, 0, 0], scale: 1.5 }]}
                    showControls={false}
                    className="w-full h-full"
                  />
                  {space.premium && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 rounded-lg flex items-center gap-1">
                      <Lock className="w-3 h-3 text-primary-foreground" />
                      <span className="text-[10px] font-bold text-primary-foreground">PREMIUM</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/60 backdrop-blur-sm rounded-lg flex items-center gap-1">
                    <Users className="w-3 h-3 text-accent" />
                    <span className="text-xs text-foreground">{space.users}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-orbitron text-sm font-bold text-foreground group-hover:text-primary transition-colors">{space.name}</h3>
                      <p className="text-xs text-muted-foreground">{space.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-xs text-muted-foreground">{space.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/10" onClick={(e) => { e.stopPropagation(); setActiveSpace(space); setFullscreen(true); }}>
                      <Maximize className="w-3 h-3 mr-1" /> Inmersivo
                    </Button>
                    <Button variant="outline" size="sm" className="border-accent/20 hover:bg-accent/10">
                      <Settings2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DreamSpaces;
