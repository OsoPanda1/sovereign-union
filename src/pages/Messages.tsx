 /**
  * 💬 MENSAJES - Chat Privado Cifrado
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { MessageCircle, Search, Edit, Shield, Lock, Check, CheckCheck } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/hooks/useAuth";
 
 const mockChats = [
   { id: 1, name: "Isabella AI", lastMessage: "¡Hola! ¿En qué puedo ayudarte?", time: "Ahora", unread: 2, avatar: "🤖", online: true },
   { id: 2, name: "Comunidad Korima", lastMessage: "Nueva actualización disponible", time: "5m", unread: 0, avatar: "🌐", online: true },
   { id: 3, name: "Soporte TAMV", lastMessage: "Tu ticket ha sido resuelto", time: "1h", unread: 0, avatar: "🛡️", online: false },
   { id: 4, name: "Canal de Creadores", lastMessage: "Nuevo tutorial de DreamSpaces", time: "3h", unread: 5, avatar: "🎨", online: true },
 ];
 
 const Messages = () => {
   const { isAuthenticated } = useAuth();
 
   if (!isAuthenticated) {
     return (
       <div className="min-h-screen bg-background">
         <SovereignNav />
         <main className="pt-24 pb-12 flex items-center justify-center">
           <div className="text-center">
             <MessageCircle className="w-16 h-16 text-primary/30 mx-auto mb-4" />
             <h2 className="font-orbitron text-xl text-foreground mb-2">Acceso Requerido</h2>
             <p className="text-muted-foreground">Inicia sesión para ver tus mensajes</p>
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
             className="flex items-center justify-between mb-6"
           >
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center">
                 <MessageCircle className="w-6 h-6 text-primary-foreground" />
               </div>
               <div>
                 <h1 className="font-orbitron text-2xl font-bold text-gold-3d">MENSAJES</h1>
                 <p className="text-sm text-muted-foreground flex items-center gap-1">
                   <Lock className="w-3 h-3" />
                   Chat cifrado E2E
                 </p>
               </div>
             </div>
             <Button variant="outline" size="icon" className="border-primary/20">
               <Edit className="w-5 h-5" />
             </Button>
           </motion.div>
 
           {/* Search */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="mb-6"
           >
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input
                 placeholder="Buscar conversaciones..."
                 className="pl-10 bg-secondary/50 border-primary/20"
               />
             </div>
           </motion.div>
 
           {/* Chat List */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-sovereign rounded-2xl border border-primary/10 divide-y divide-primary/5"
           >
             {mockChats.map((chat, i) => (
               <motion.button
                 key={chat.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 + i * 0.05 }}
                 className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
               >
                 <div className="relative">
                   <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                     {chat.avatar}
                   </div>
                   {chat.online && (
                     <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                   )}
                 </div>
                 <div className="flex-1 text-left min-w-0">
                   <div className="flex items-center justify-between mb-1">
                     <p className="font-medium text-foreground truncate">{chat.name}</p>
                     <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.time}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                     {chat.unread > 0 ? (
                       <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                         {chat.unread}
                       </span>
                     ) : (
                       <CheckCheck className="w-4 h-4 text-accent flex-shrink-0" />
                     )}
                   </div>
                 </div>
               </motion.button>
             ))}
           </motion.div>
 
           {/* Security Notice */}
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2"
           >
             <Shield className="w-3 h-3" />
             Todas las conversaciones están protegidas con cifrado caótico 4D
           </motion.p>
         </div>
       </main>
     </div>
   );
 };
 
 export default Messages;