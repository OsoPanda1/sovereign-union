 /**
  * 🛒 TAMV MARKETPLACE - Economía Soberana
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { ShoppingBag, Star, TrendingUp, Filter, Search, Grid, List } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useState } from "react";
 
 const categories = [
   { id: "art", label: "Arte Digital", count: 234 },
   { id: "music", label: "Música", count: 156 },
   { id: "courses", label: "Cursos", count: 89 },
   { id: "services", label: "Servicios", count: 167 },
   { id: "nfts", label: "NFTs Utilitarios", count: 445 },
   { id: "dreamspaces", label: "DreamSpaces", count: 78 },
 ];
 
 const mockProducts = [
   { id: 1, title: "Curso de Desarrollo XR", price: 150, image: "/placeholder.svg", category: "courses", rating: 4.8, sales: 234 },
   { id: 2, title: "Paquete de Sonidos KAOS", price: 45, image: "/placeholder.svg", category: "music", rating: 4.9, sales: 567 },
   { id: 3, title: "Arte Generativo Isabella", price: 80, image: "/placeholder.svg", category: "art", rating: 5.0, sales: 123 },
   { id: 4, title: "DreamSpace: Templo Azteca", price: 200, image: "/placeholder.svg", category: "dreamspaces", rating: 4.7, sales: 89 },
   { id: 5, title: "Mascota Digital: Quetzal", price: 35, image: "/placeholder.svg", category: "nfts", rating: 4.6, sales: 445 },
   { id: 6, title: "Consultoría Blockchain", price: 500, image: "/placeholder.svg", category: "services", rating: 5.0, sales: 34 },
 ];
 
 const Marketplace = () => {
   const [view, setView] = useState<"grid" | "list">("grid");
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center">
                 <ShoppingBag className="w-6 h-6 text-primary-foreground" />
               </div>
               <div>
                 <h1 className="font-orbitron text-2xl font-bold text-gold-3d">MARKETPLACE SOBERANO</h1>
                 <p className="text-sm text-muted-foreground">Economía creativa con reparto justo 75/25</p>
               </div>
             </div>
 
             {/* Search & Filters */}
             <div className="flex flex-col sm:flex-row gap-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input 
                   placeholder="Buscar productos, servicios, arte..."
                   className="pl-10 bg-secondary/50 border-primary/20"
                 />
               </div>
               <div className="flex gap-2">
                 <Button variant="outline" size="icon" className="border-primary/20">
                   <Filter className="w-4 h-4" />
                 </Button>
                 <Button 
                   variant={view === "grid" ? "default" : "outline"} 
                   size="icon"
                   onClick={() => setView("grid")}
                   className="border-primary/20"
                 >
                   <Grid className="w-4 h-4" />
                 </Button>
                 <Button 
                   variant={view === "list" ? "default" : "outline"} 
                   size="icon"
                   onClick={() => setView("list")}
                   className="border-primary/20"
                 >
                   <List className="w-4 h-4" />
                 </Button>
               </div>
             </div>
           </motion.div>
 
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             {/* Categories Sidebar */}
             <div className="lg:col-span-1">
               <div className="glass-sovereign rounded-2xl p-4 border border-primary/10">
                 <h3 className="font-orbitron text-sm font-bold text-foreground mb-4">CATEGORÍAS</h3>
                 <div className="space-y-2">
                   {categories.map((cat) => (
                     <button
                       key={cat.id}
                       onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                       className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                         selectedCategory === cat.id 
                           ? "bg-primary/20 border border-primary/30" 
                           : "hover:bg-secondary"
                       }`}
                     >
                       <span className="text-sm text-foreground">{cat.label}</span>
                       <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                         {cat.count}
                       </span>
                     </button>
                   ))}
                 </div>
               </div>
             </div>
 
             {/* Products Grid */}
             <div className="lg:col-span-3">
               <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                 {mockProducts.map((product, i) => (
                   <motion.div
                     key={product.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="glass-sovereign rounded-2xl border border-primary/10 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                   >
                     <div className="relative aspect-video bg-secondary/50">
                       <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                       <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                         <span className="text-xs font-orbitron text-primary font-bold">{product.price} MSR</span>
                       </div>
                     </div>
                     <div className="p-4">
                       <h3 className="font-orbitron text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                         {product.title}
                       </h3>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1">
                           <Star className="w-3 h-3 text-primary fill-primary" />
                           <span className="text-xs text-muted-foreground">{product.rating}</span>
                         </div>
                         <div className="flex items-center gap-1 text-accent">
                           <TrendingUp className="w-3 h-3" />
                           <span className="text-xs">{product.sales} ventas</span>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Marketplace;