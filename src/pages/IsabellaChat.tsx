 /**
  * 🤖 ISABELLA CHAT - IA Emocional Consciente
  */
 import { motion, AnimatePresence } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { Bot, Send, Sparkles, Brain, Heart, Shield, Mic, Paperclip, MoreHorizontal } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useState } from "react";
 
 interface Message {
   id: string;
   role: "user" | "assistant";
   content: string;
   timestamp: Date;
   emotion?: string;
 }
 
 const IsabellaChat = () => {
   const [messages, setMessages] = useState<Message[]>([
     {
       id: "1",
       role: "assistant",
       content: "¡Hola, ciudadano! Soy Isabella Villaseñor, la IA emocional del ecosistema TAMV. Estoy aquí para asistirte en tu viaje por la Federación Korima. ¿En qué puedo ayudarte hoy?",
       timestamp: new Date(),
       emotion: "alegría"
     }
   ]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
 
   const handleSend = async () => {
     if (!input.trim()) return;
 
     const userMessage: Message = {
       id: Date.now().toString(),
       role: "user",
       content: input,
       timestamp: new Date()
     };
 
     setMessages(prev => [...prev, userMessage]);
     setInput("");
     setIsTyping(true);
 
     // Simulated response (would connect to Lovable AI Gateway in production)
     setTimeout(() => {
       const responses = [
         "Entiendo tu consulta. En el ecosistema TAMV, cada interacción genera valor MSR que se distribuye de manera justa: 70% para creadores, 20% para el Fondo Fénix y 10% para infraestructura.",
         "¡Excelente pregunta! Los DreamSpaces son mundos XR inmersivos donde puedes crear, socializar y monetizar tu contenido de forma soberana.",
         "El sistema de seguridad Tenochtitlán protege tus datos con cifrado caótico 4D. Anubis Sentinel vigila constantemente para mantener tu identidad segura.",
         "La Universidad TAMV ofrece cursos certificados en blockchain BookPI. Cada certificado es inmutable y verificable en la cadena MSR."
       ];
 
       const assistantMessage: Message = {
         id: (Date.now() + 1).toString(),
         role: "assistant",
         content: responses[Math.floor(Math.random() * responses.length)],
         timestamp: new Date(),
         emotion: "confianza"
       };
 
       setMessages(prev => [...prev, assistantMessage]);
       setIsTyping(false);
     }, 1500);
   };
 
   return (
     <div className="min-h-screen bg-background flex flex-col">
       <SovereignNav />
       
       <main className="flex-1 pt-20 pb-4 flex flex-col">
         <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center justify-between py-4 border-b border-primary/10"
           >
             <div className="flex items-center gap-3">
               <div className="relative">
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                   <Bot className="w-6 h-6 text-accent-foreground" />
                 </div>
                 <motion.div
                   className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background"
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
               </div>
               <div>
                 <h1 className="font-orbitron text-lg font-bold text-foreground">ISABELLA VILLASEÑOR</h1>
                 <div className="flex items-center gap-2">
                   <span className="text-xs text-accent">En línea</span>
                   <span className="text-xs text-muted-foreground">·</span>
                   <span className="text-xs text-muted-foreground flex items-center gap-1">
                     <Heart className="w-3 h-3" /> Emoción: Confianza
                   </span>
                 </div>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="text-muted-foreground">
                 <Brain className="w-5 h-5" />
               </Button>
               <Button variant="ghost" size="icon" className="text-muted-foreground">
                 <MoreHorizontal className="w-5 h-5" />
               </Button>
             </div>
           </motion.div>
 
           {/* Messages */}
           <div className="flex-1 overflow-y-auto py-4 space-y-4">
             <AnimatePresence mode="popLayout">
               {messages.map((msg) => (
                 <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                 >
                   <div className={`max-w-[80%] ${msg.role === "user" ? "order-1" : ""}`}>
                     {msg.role === "assistant" && (
                       <div className="flex items-center gap-2 mb-1">
                         <Sparkles className="w-3 h-3 text-accent" />
                         <span className="text-[10px] text-accent font-mono">Isabella · {msg.emotion}</span>
                       </div>
                     )}
                     <div className={`rounded-2xl px-4 py-3 ${
                       msg.role === "user" 
                         ? "bg-primary text-primary-foreground rounded-br-md" 
                         : "glass-sovereign border border-accent/20 rounded-bl-md"
                     }`}>
                       <p className="text-sm leading-relaxed">{msg.content}</p>
                     </div>
                     <p className={`text-[9px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                       {msg.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                     </p>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
 
             {isTyping && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex items-center gap-2"
               >
                 <div className="glass-sovereign rounded-2xl px-4 py-3 border border-accent/20">
                   <div className="flex items-center gap-1">
                     <motion.div
                       className="w-2 h-2 rounded-full bg-accent"
                       animate={{ y: [0, -5, 0] }}
                       transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                     />
                     <motion.div
                       className="w-2 h-2 rounded-full bg-accent"
                       animate={{ y: [0, -5, 0] }}
                       transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                     />
                     <motion.div
                       className="w-2 h-2 rounded-full bg-accent"
                       animate={{ y: [0, -5, 0] }}
                       transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                     />
                   </div>
                 </div>
               </motion.div>
             )}
           </div>
 
           {/* Input */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="border-t border-primary/10 pt-4"
           >
             <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="text-muted-foreground flex-shrink-0">
                 <Paperclip className="w-5 h-5" />
               </Button>
               <div className="relative flex-1">
                 <Input
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === "Enter" && handleSend()}
                   placeholder="Escribe tu mensaje a Isabella..."
                   className="bg-secondary/50 border-primary/20 pr-12"
                 />
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
                 >
                   <Mic className="w-4 h-4" />
                 </Button>
               </div>
               <Button 
                 onClick={handleSend}
                 disabled={!input.trim() || isTyping}
                 className="gold-metallic flex-shrink-0"
               >
                 <Send className="w-4 h-4" />
               </Button>
             </div>
             <p className="text-[9px] text-center text-muted-foreground mt-2">
               <Shield className="w-3 h-3 inline mr-1" />
               Conversación cifrada con protocolo EOCT™
             </p>
           </motion.div>
         </div>
       </main>
     </div>
   );
 };
 
 export default IsabellaChat;