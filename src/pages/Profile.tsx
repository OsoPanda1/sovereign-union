 /**
  * 👤 PERFIL CIUDADANO - Identidad Soberana
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { User, Edit2, Shield, Award, Calendar, MapPin, Link as LinkIcon, Settings, Camera } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useProfile } from "@/hooks/useProfile";
 import { useAuth } from "@/hooks/useAuth";
 import { Progress } from "@/components/ui/progress";
 
 const Profile = () => {
   const { profile, wallet, loading } = useProfile();
   const { user, isAuthenticated } = useAuth();
 
   if (!isAuthenticated) {
     return (
       <div className="min-h-screen bg-background">
         <SovereignNav />
         <main className="pt-24 pb-12 flex items-center justify-center">
           <div className="text-center">
             <User className="w-16 h-16 text-primary/30 mx-auto mb-4" />
             <h2 className="font-orbitron text-xl text-foreground mb-2">Acceso Requerido</h2>
             <p className="text-muted-foreground">Inicia sesión para ver tu perfil</p>
           </div>
         </main>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4 max-w-4xl">
           {/* Profile Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-sovereign rounded-3xl p-8 border border-primary/20 mb-6"
           >
             <div className="flex flex-col sm:flex-row items-start gap-6">
               {/* Avatar */}
               <div className="relative group">
                 <div className="w-24 h-24 rounded-2xl gold-metallic flex items-center justify-center overflow-hidden">
                   {profile?.avatar_url ? (
                     <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <span className="font-orbitron text-2xl font-bold text-primary-foreground">
                       {profile?.display_name?.charAt(0) || "?"}
                     </span>
                   )}
                 </div>
                 <button className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Camera className="w-6 h-6 text-white" />
                 </button>
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background">
                   <Shield className="w-4 h-4 text-accent-foreground" />
                 </div>
               </div>
 
               {/* Info */}
               <div className="flex-1">
                 <div className="flex items-start justify-between mb-4">
                   <div>
                     <h1 className="font-orbitron text-2xl font-bold text-foreground mb-1">
                       {profile?.display_name || "Ciudadano Korima"}
                     </h1>
                     <p className="text-sm text-muted-foreground">{user?.email}</p>
                   </div>
                   <Button variant="outline" size="sm" className="border-primary/20">
                     <Edit2 className="w-4 h-4 mr-2" />
                     Editar
                   </Button>
                 </div>
 
                 <p className="text-sm text-foreground/80 mb-4">
                   {profile?.bio || "Sin biografía. Añade una descripción sobre ti."}
                 </p>
 
                 <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                   <span className="flex items-center gap-1">
                     <Calendar className="w-3 h-3" />
                     Desde {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("es-MX", { month: "long", year: "numeric" }) : "..."}
                   </span>
                   <span className="flex items-center gap-1">
                     <MapPin className="w-3 h-3" />
                     Federación Korima
                   </span>
                 </div>
               </div>
             </div>
           </motion.div>
 
           {/* Stats Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
             <StatCard label="Reputación" value={profile?.reputation_score || 0} suffix="pts" icon={Award} />
             <StatCard label="Balance MSR" value={wallet?.balance || 0} suffix="MSR" icon={Shield} />
             <StatCard label="Posts" value={0} icon={User} />
             <StatCard label="Conexiones" value={0} icon={LinkIcon} />
           </div>
 
           {/* Reputation Progress */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-sovereign rounded-2xl p-6 border border-primary/10 mb-6"
           >
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-orbitron text-sm font-bold text-foreground">NIVEL DE CIUDADANÍA</h3>
               <span className="text-xs text-muted-foreground">
                 {profile?.reputation_score || 0} / 1000 pts
               </span>
             </div>
             <Progress value={(profile?.reputation_score || 0) / 10} className="h-2 mb-4" />
             <div className="grid grid-cols-4 gap-2">
               {["Ciudadano", "Guardián", "Arquitecto", "Soberano"].map((level, i) => (
                 <div 
                   key={level}
                   className={`text-center p-2 rounded-lg ${
                     (profile?.reputation_score || 0) >= (i * 250) 
                       ? "bg-primary/20 text-primary" 
                       : "bg-secondary text-muted-foreground"
                   }`}
                 >
                   <p className="text-[10px] font-mono">{level}</p>
                 </div>
               ))}
             </div>
           </motion.div>
 
           {/* Settings Quick Access */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="glass-sovereign rounded-2xl p-6 border border-primary/10"
           >
             <div className="flex items-center gap-2 mb-4">
               <Settings className="w-5 h-5 text-primary" />
               <h3 className="font-orbitron text-sm font-bold text-foreground">CONFIGURACIÓN RÁPIDA</h3>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <Button variant="outline" className="justify-start border-primary/20">
                 <Shield className="w-4 h-4 mr-2" />
                 Seguridad
               </Button>
               <Button variant="outline" className="justify-start border-primary/20">
                 <User className="w-4 h-4 mr-2" />
                 Privacidad
               </Button>
             </div>
           </motion.div>
         </div>
       </main>
     </div>
   );
 };
 
 const StatCard = ({ label, value, suffix, icon: Icon }: { label: string; value: number; suffix?: string; icon: any }) => (
   <motion.div 
     className="glass-sovereign rounded-xl p-4 border border-primary/10"
     whileHover={{ y: -2 }}
   >
     <Icon className="w-5 h-5 text-primary mb-2" />
     <p className="font-orbitron text-xl font-bold text-gold-3d">
       {typeof value === "number" ? value.toLocaleString() : value}
       {suffix && <span className="text-xs text-muted-foreground ml-1">{suffix}</span>}
     </p>
     <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
   </motion.div>
 );
 
 export default Profile;