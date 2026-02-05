 /**
  * 🔍 BÚSQUEDA - Explorar el Omniverso
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Search as SearchIcon, TrendingUp, Users, ShoppingBag, GraduationCap, Sparkles, Hash } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { useState } from "react";
 
 const trendingTopics = [
   { tag: "#DreamSpaces", posts: 1234 },
   { tag: "#IsabellaAI", posts: 890 },
   { tag: "#MSRBlockchain", posts: 567 },
   { tag: "#ArteDigital", posts: 445 },
   { tag: "#UniversidadTAMV", posts: 234 },
 ];
 
 const categories = [
   { icon: Users, label: "Ciudadanos", count: "12.4K" },
   { icon: ShoppingBag, label: "Marketplace", count: "2.3K" },
   { icon: GraduationCap, label: "Cursos", count: "156" },
   { icon: Sparkles, label: "DreamSpaces", count: "89" },
 ];
 
 const Search = () => {
   const [query, setQuery] = useState("");
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4 max-w-3xl">
           {/* Search Input */}
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <div className="relative">
               <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Buscar ciudadanos, contenido, productos..."
                 className="pl-12 py-6 text-lg bg-secondary/50 border-primary/20 rounded-2xl"
               />
             </div>
           </motion.div>
 
           {/* Categories */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="mb-8"
           >
             <h2 className="font-orbitron text-sm text-muted-foreground mb-4 uppercase tracking-wider">
               EXPLORAR POR CATEGORÍA
             </h2>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
               {categories.map((cat) => (
                 <button
                   key={cat.label}
                   className="glass-sovereign rounded-xl p-4 border border-primary/10 hover:border-primary/30 transition-all text-center group"
                 >
                   <cat.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                   <p className="text-sm font-medium text-foreground">{cat.label}</p>
                   <p className="text-xs text-muted-foreground">{cat.count}</p>
                 </button>
               ))}
             </div>
           </motion.div>
 
           {/* Trending */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <div className="flex items-center gap-2 mb-4">
               <TrendingUp className="w-5 h-5 text-primary" />
               <h2 className="font-orbitron text-sm text-muted-foreground uppercase tracking-wider">
                 TENDENCIAS
               </h2>
             </div>
             <div className="glass-sovereign rounded-2xl border border-primary/10 divide-y divide-primary/5">
               {trendingTopics.map((topic, i) => (
                 <motion.button
                   key={topic.tag}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3 + i * 0.05 }}
                   className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                       <Hash className="w-5 h-5 text-primary" />
                     </div>
                     <div className="text-left">
                       <p className="text-sm font-medium text-foreground">{topic.tag}</p>
                       <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} publicaciones</p>
                     </div>
                   </div>
                   <span className="text-xs text-muted-foreground">#{i + 1}</span>
                 </motion.button>
               ))}
             </div>
           </motion.div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Search;