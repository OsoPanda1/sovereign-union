 /**
  * 🌌 DREAMSPACES - Mundos XR Inmersivos
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Sparkles, Users, Globe, Play, Lock, Star, Compass } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const spaces = [
   { id: 1, name: "Templo de Anubis", type: "Santuario", users: 234, rating: 4.9, premium: false, image: "/placeholder.svg" },
   { id: 2, name: "Plaza Korima Central", type: "Social", users: 1567, rating: 4.8, premium: false, image: "/placeholder.svg" },
   { id: 3, name: "Laboratorio Isabella", type: "Educativo", users: 89, rating: 5.0, premium: true, image: "/placeholder.svg" },
   { id: 4, name: "Arena de Gladiadores", type: "Gaming", users: 456, rating: 4.7, premium: false, image: "/placeholder.svg" },
   { id: 5, name: "Galería Eterna", type: "Arte", users: 123, rating: 4.9, premium: true, image: "/placeholder.svg" },
   { id: 6, name: "Ciudad Tenochtitlán 4D", type: "Histórico", users: 789, rating: 5.0, premium: true, image: "/placeholder.svg" },
 ];
 
 const DreamSpaces = () => {
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-12"
           >
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4">
               <Sparkles className="w-8 h-8 text-primary-foreground" />
             </div>
             <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">DREAMSPACES</h1>
             <p className="text-muted-foreground max-w-md mx-auto">
               Mundos inmersivos XR/VR/3D/4D. Habita, no solo navegues.
             </p>
           </motion.div>
 
           {/* Stats Banner */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="glass-sovereign rounded-3xl p-6 border border-primary/20 mb-8"
           >
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
               <div>
                 <p className="font-orbitron text-2xl font-bold text-gold-3d">156</p>
                 <p className="text-xs text-muted-foreground">Espacios Activos</p>
               </div>
               <div>
                 <p className="font-orbitron text-2xl font-bold text-accent">12.4K</p>
                 <p className="text-xs text-muted-foreground">Usuarios Online</p>
               </div>
               <div>
                 <p className="font-orbitron text-2xl font-bold text-gold-3d">847</p>
                 <p className="text-xs text-muted-foreground">Eventos Hoy</p>
               </div>
               <div>
                 <p className="font-orbitron text-2xl font-bold text-accent">4D</p>
                 <p className="text-xs text-muted-foreground">Render Activo</p>
               </div>
             </div>
           </motion.div>
 
           {/* Featured Space */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="relative rounded-3xl overflow-hidden mb-8 group cursor-pointer"
           >
             <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 via-secondary to-accent/10">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <Globe className="w-16 h-16 text-primary mb-4 mx-auto opacity-50" />
                   <h2 className="font-orbitron text-2xl font-bold text-foreground mb-2">
                     SANTUARIO REINA TREJO
                   </h2>
                   <p className="text-muted-foreground mb-4">Memorial 3D Interactivo</p>
                   <Button className="gold-metallic font-orbitron">
                     <Play className="w-4 h-4 mr-2" />
                     ENTRAR AL ESPACIO
                   </Button>
                 </div>
               </div>
             </div>
             <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 rounded-full">
               <span className="text-xs font-orbitron text-primary-foreground font-bold">DESTACADO</span>
             </div>
           </motion.div>
 
           {/* Spaces Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {spaces.map((space, i) => (
               <motion.div
                 key={space.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-sovereign rounded-2xl border border-primary/10 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
               >
                 <div className="relative aspect-video bg-secondary/50">
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Compass className="w-12 h-12 text-primary/30" />
                   </div>
                   {space.premium && (
                     <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 rounded-lg flex items-center gap-1">
                       <Lock className="w-3 h-3 text-primary-foreground" />
                       <span className="text-[10px] font-bold text-primary-foreground">PREMIUM</span>
                     </div>
                   )}
                   <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-1">
                     <Users className="w-3 h-3 text-accent" />
                     <span className="text-xs text-foreground">{space.users}</span>
                   </div>
                 </div>
                 <div className="p-4">
                   <div className="flex items-start justify-between mb-2">
                     <div>
                       <h3 className="font-orbitron text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                         {space.name}
                       </h3>
                       <p className="text-xs text-muted-foreground">{space.type}</p>
                     </div>
                     <div className="flex items-center gap-1">
                       <Star className="w-3 h-3 text-primary fill-primary" />
                       <span className="text-xs text-muted-foreground">{space.rating}</span>
                     </div>
                   </div>
                   <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/10">
                     <Play className="w-3 h-3 mr-2" />
                     Explorar
                   </Button>
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