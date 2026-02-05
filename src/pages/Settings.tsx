 /**
  * ⚙️ CONFIGURACIÓN - Panel de Control Ciudadano
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Settings as SettingsIcon, User, Shield, Bell, Palette, Globe, Lock, CreditCard, LogOut } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Switch } from "@/components/ui/switch";
 import { useAuth } from "@/hooks/useAuth";
 import { useNavigate } from "react-router-dom";
 
 const settingsSections = [
   {
     title: "Cuenta",
     items: [
       { icon: User, label: "Información Personal", description: "Nombre, email, avatar" },
       { icon: Lock, label: "Seguridad", description: "Contraseña, 2FA, sesiones activas" },
       { icon: Shield, label: "Privacidad", description: "Visibilidad de perfil, datos" },
     ]
   },
   {
     title: "Preferencias",
     items: [
       { icon: Bell, label: "Notificaciones", description: "Alertas, emails, push" },
       { icon: Palette, label: "Apariencia", description: "Tema, idioma, accesibilidad" },
       { icon: Globe, label: "Idioma y Región", description: "Español (México)" },
     ]
   },
   {
     title: "Economía",
     items: [
       { icon: CreditCard, label: "Métodos de Pago", description: "Tarjetas, crypto, MSR" },
     ]
   }
 ];
 
 const Settings = () => {
   const { signOut, isAuthenticated } = useAuth();
   const navigate = useNavigate();
 
   const handleSignOut = async () => {
     await signOut();
     navigate("/auth");
   };
 
   if (!isAuthenticated) {
     return (
       <div className="min-h-screen bg-background">
         <SovereignNav />
         <main className="pt-24 pb-12 flex items-center justify-center">
           <div className="text-center">
             <SettingsIcon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
             <h2 className="font-orbitron text-xl text-foreground mb-2">Acceso Requerido</h2>
             <p className="text-muted-foreground">Inicia sesión para acceder a configuración</p>
           </div>
         </main>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4 max-w-3xl">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center">
                 <SettingsIcon className="w-6 h-6 text-primary-foreground" />
               </div>
               <div>
                 <h1 className="font-orbitron text-2xl font-bold text-gold-3d">CONFIGURACIÓN</h1>
                 <p className="text-sm text-muted-foreground">Panel de control ciudadano</p>
               </div>
             </div>
           </motion.div>
 
           {/* Settings Sections */}
           <div className="space-y-6">
             {settingsSections.map((section, sectionIndex) => (
               <motion.div
                 key={section.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: sectionIndex * 0.1 }}
               >
                 <h2 className="font-orbitron text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                   {section.title}
                 </h2>
                 <div className="glass-sovereign rounded-2xl border border-primary/10 divide-y divide-primary/5">
                   {section.items.map((item, itemIndex) => (
                     <button
                       key={item.label}
                       className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                     >
                       <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                         <item.icon className="w-5 h-5 text-primary" />
                       </div>
                       <div className="flex-1 text-left">
                         <p className="text-sm font-medium text-foreground">{item.label}</p>
                         <p className="text-xs text-muted-foreground">{item.description}</p>
                       </div>
                       <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                     </button>
                   ))}
                 </div>
               </motion.div>
             ))}
 
             {/* Quick Toggles */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="glass-sovereign rounded-2xl border border-primary/10 p-4 space-y-4"
             >
               <h2 className="font-orbitron text-sm text-muted-foreground uppercase tracking-wider">
                 Accesos Rápidos
               </h2>
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-foreground">Notificaciones Push</p>
                   <p className="text-xs text-muted-foreground">Recibir alertas en tiempo real</p>
                 </div>
                 <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-foreground">Modo Privado</p>
                   <p className="text-xs text-muted-foreground">Ocultar actividad del feed</p>
                 </div>
                 <Switch />
               </div>
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-foreground">Sonidos KAOS</p>
                   <p className="text-xs text-muted-foreground">Audio 3D en notificaciones</p>
                 </div>
                 <Switch defaultChecked />
               </div>
             </motion.div>
 
             {/* Sign Out */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               <Button 
                 variant="outline" 
                 className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                 onClick={handleSignOut}
               >
                 <LogOut className="w-4 h-4 mr-2" />
                 Cerrar Sesión
               </Button>
             </motion.div>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Settings;