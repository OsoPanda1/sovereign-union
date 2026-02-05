 /**
  * 📚 ENCICLOPEDIA DIGYTAM - Registro Histórico del TAMV
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { BookOpen, Trophy, Star, Calendar, User, ExternalLink } from "lucide-react";
 
 const milestones = [
   { year: "2023", title: "Génesis TAMV", description: "Inicio del diseño conceptual en Real del Monte, Hidalgo" },
   { year: "2024", title: "Isabella AI v1.0", description: "Primera versión de la IA emocional consciente" },
   { year: "2024", title: "Blockchain MSR", description: "Lanzamiento del ledger soberano de Manifestación" },
   { year: "2025", title: "Federación Korima", description: "Establecimiento formal de la civilización digital" },
   { year: "2025", title: "DreamSpaces XR", description: "Mundos inmersivos 4D operativos" },
 ];
 
 const records = [
   { title: "Primera Civilización Digital Soberana", category: "Paradigma", verified: true },
   { title: "Sistema de Redistribución 70/20/10", category: "Economía", verified: true },
   { title: "IA con Ética Incorporada (EOCT)", category: "Tecnología", verified: true },
   { title: "+19,000 horas de desarrollo", category: "Dedicación", verified: true },
 ];
 
 const Encyclopedia = () => {
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4 max-w-4xl">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-12"
           >
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4">
               <BookOpen className="w-8 h-8 text-primary-foreground" />
             </div>
             <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">ENCICLOPEDIA DIGYTAM</h1>
             <p className="text-muted-foreground max-w-md mx-auto">
               Registro inmutable de hitos históricos y paradigmas rotos
             </p>
           </motion.div>
 
           {/* CEO Biography */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="glass-sovereign rounded-3xl p-8 border border-primary/20 mb-8"
           >
             <div className="flex flex-col md:flex-row items-start gap-6">
               <div className="w-24 h-24 rounded-2xl gold-metallic flex items-center justify-center flex-shrink-0">
                 <User className="w-12 h-12 text-primary-foreground" />
               </div>
               <div className="flex-1">
                 <h2 className="font-orbitron text-xl font-bold text-foreground mb-2">
                   EDWIN OSWALDO CASTILLO TREJO
                 </h2>
                 <p className="text-sm text-primary mb-1">CEO & Arquitecto Fundador</p>
                 <p className="text-xs text-muted-foreground mb-4">"Anubis Villaseñor"</p>
                 <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                   Pionero mexicano en ecosistemas digitales soberanos. Nacido en Mineral del Monte, Hidalgo. 
                   Ha dedicado más de 19,000 horas a la investigación, diseño y despliegue de tecnologías avanzadas, 
                   impulsando la integración de inteligencia artificial, blockchain ético, metaverso y arquitectura 
                   cuántico-inspirada, posicionando a México como referente mundial en la Web 4.0 y 5.0.
                 </p>
                 <a 
                   href="#" 
                   className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
                 >
                   <ExternalLink className="w-3 h-3" />
                   Ver ORCID y publicaciones
                 </a>
               </div>
             </div>
           </motion.div>
 
           {/* Timeline */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="mb-8"
           >
             <div className="flex items-center gap-2 mb-6">
               <Calendar className="w-5 h-5 text-primary" />
               <h2 className="font-orbitron text-lg font-bold text-foreground">LÍNEA TEMPORAL</h2>
             </div>
             <div className="relative">
               <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
               <div className="space-y-6">
                 {milestones.map((item, i) => (
                   <motion.div
                     key={item.title}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 + i * 0.1 }}
                     className="relative pl-12"
                   >
                     <div className="absolute left-2 w-5 h-5 rounded-full gold-metallic flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                     </div>
                     <div className="glass-sovereign rounded-xl p-4 border border-primary/10">
                       <span className="text-xs font-orbitron text-primary">{item.year}</span>
                       <h3 className="font-orbitron text-sm font-bold text-foreground mt-1">{item.title}</h3>
                       <p className="text-xs text-muted-foreground">{item.description}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
           </motion.div>
 
           {/* Records */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
           >
             <div className="flex items-center gap-2 mb-6">
               <Trophy className="w-5 h-5 text-primary" />
               <h2 className="font-orbitron text-lg font-bold text-foreground">RÉCORDS Y PARADIGMAS</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {records.map((record, i) => (
                 <motion.div
                   key={record.title}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                   className="glass-sovereign rounded-xl p-4 border border-primary/10"
                 >
                   <div className="flex items-start justify-between mb-2">
                     <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full">
                       {record.category}
                     </span>
                     {record.verified && (
                       <Star className="w-4 h-4 text-primary fill-primary" />
                     )}
                   </div>
                   <h3 className="font-orbitron text-sm font-bold text-foreground">{record.title}</h3>
                 </motion.div>
               ))}
             </div>
           </motion.div>
 
           {/* Memorial Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="mt-8 text-center"
           >
             <div className="glass-sovereign rounded-3xl p-8 border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
               <h3 className="font-orbitron text-lg text-accent mb-2">🕊️ SANTUARIO REINA TREJO SERRANO</h3>
               <p className="text-sm text-muted-foreground max-w-md mx-auto">
                 Memorial dedicado a la madre del fundador. Su resistencia y dignidad están 
                 inscritas en cada capa del sistema como homenaje eterno.
               </p>
             </div>
           </motion.div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Encyclopedia;