/**
 * 🛒 TAMV MARKETPLACE - Economía Soberana Inmersiva
 * 75% visual / 25% texto — Cards cinematográficas con glassmorphism
 */
import { motion } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import { ShoppingBag, Star, TrendingUp, Filter, Search, Grid, List, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ParticleField3D } from "@/components/omniverso/ParticleField3D";

const categories = [
  { id: "art", label: "Arte Digital", count: 234, emoji: "🎨", color: "280, 75%, 60%" },
  { id: "music", label: "Música", count: 156, emoji: "🎵", color: "200, 80%, 55%" },
  { id: "courses", label: "Cursos", count: 89, emoji: "🎓", color: "168, 84%, 48%" },
  { id: "services", label: "Servicios", count: 167, emoji: "⚡", color: "45, 92%, 58%" },
  { id: "nfts", label: "NFTs Utilitarios", count: 445, emoji: "💎", color: "350, 75%, 55%" },
  { id: "dreamspaces", label: "DreamSpaces", count: 78, emoji: "🌌", color: "220, 60%, 60%" },
];

const mockProducts = [
  { id: 1, title: "Curso de Desarrollo XR", price: 150, category: "courses", rating: 4.8, sales: 234, creator: "Dr. Villaseñor" },
  { id: 2, title: "Paquete de Sonidos KAOS", price: 45, category: "music", rating: 4.9, sales: 567, creator: "KAOS Audio" },
  { id: 3, title: "Arte Generativo Isabella", price: 80, category: "art", rating: 5.0, sales: 123, creator: "Isabella AI" },
  { id: 4, title: "DreamSpace: Templo Azteca", price: 200, category: "dreamspaces", rating: 4.7, sales: 89, creator: "Anubis Studio" },
  { id: 5, title: "Mascota Digital: Quetzal", price: 35, category: "nfts", rating: 4.6, sales: 445, creator: "QuantumPets" },
  { id: 6, title: "Consultoría Blockchain", price: 500, category: "services", rating: 5.0, sales: 34, creator: "TAMV Enterprise" },
];

const Marketplace = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory ? mockProducts.filter(p => p.category === selectedCategory) : mockProducts;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Immersive background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-12"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-10"
          style={{ background: 'radial-gradient(circle, hsla(168, 84%, 48%, 0.3) 0%, transparent 70%)' }} />
        <ParticleField3D count={30} />
        <div className="absolute inset-0 grid-pattern opacity-15" />
      </div>

      <SovereignNav />

      <main className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4"
              animate={{ rotateY: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <ShoppingBag className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">MARKETPLACE SOBERANO</h1>
            <p className="text-muted-foreground">Economía creativa con reparto justo <span className="text-accent font-medium">75/25</span></p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar productos, arte, cursos..."
                className="pl-12 py-6 text-base rounded-2xl glass-sovereign border-primary/15 focus:border-primary/40" />
            </div>
          </motion.div>

          {/* Category orbs */}
          <motion.div className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {categories.map((cat, i) => (
              <motion.button key={cat.id}
                className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-full transition-all ${selectedCategory === cat.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                style={{
                  background: selectedCategory === cat.id
                    ? `linear-gradient(135deg, hsl(${cat.color}), hsla(${cat.color}, 0.7))`
                    : `radial-gradient(circle at 35% 35%, hsla(${cat.color}, 0.15), rgba(0,0,0,0.5))`,
                  border: `1px solid hsla(${cat.color}, ${selectedCategory === cat.id ? 0.8 : 0.2})`,
                  boxShadow: selectedCategory === cat.id ? `0 0 30px hsla(${cat.color}, 0.4)` : `0 4px 20px rgba(0,0,0,0.3)`,
                }}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.05, type: "spring" }}>
                <span className="text-xl mb-0.5">{cat.emoji}</span>
                <span className={`text-[7px] font-orbitron font-bold ${selectedCategory === cat.id ? 'text-primary-foreground' : 'text-foreground/70'}`}>
                  {cat.label.split(" ")[0]}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="group relative">
                <motion.div className="card-sovereign rounded-3xl overflow-hidden relative"
                  whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  {/* Visual header with gradient */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(135deg, hsla(${categories.find(c => c.id === product.category)?.color || '45, 92%, 58%'}, 0.3), hsla(220, 15%, 8%, 0.9))`,
                    }} />
                    {/* Floating particles inside card */}
                    {[...Array(5)].map((_, j) => (
                      <motion.div key={j} className="absolute w-1 h-1 rounded-full bg-primary/50"
                        style={{ left: `${20 + j * 15}%`, top: `${20 + (j % 3) * 25}%` }}
                        animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3 + j, repeat: Infinity, delay: j * 0.5 }} />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl">{categories.find(c => c.id === product.category)?.emoji || "📦"}</span>
                    </div>
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full msr-badge">
                      <span className="font-orbitron text-xs font-bold text-gold-3d">{product.price} MSR</span>
                    </div>
                    {/* Creator badge */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 glass-sovereign rounded-lg">
                      <span className="text-[9px] text-foreground/80">{product.creator}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-orbitron text-sm font-bold text-foreground mb-3 group-hover:text-gold-3d transition-all">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="text-xs text-foreground">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-xs">{product.sales}</span>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }}
                      className="w-full mt-4 py-3 rounded-xl gold-metallic font-orbitron text-xs font-bold tracking-wider">
                      ADQUIRIR
                    </motion.button>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${categories.find(c => c.id === product.category)?.color || '45, 92%, 58%'}), transparent)` }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
