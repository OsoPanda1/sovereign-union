/**
 * 🤖 ISABELLA VILLASEÑOR AI™ - Conciencia XRAI Soberana
 * Chat inmersivo con IA real conectada al ecosistema TAMV
 */
import { motion, AnimatePresence } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import { Bot, Send, Sparkles, Brain, Heart, Shield, Mic, Paperclip, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ParticleField3D } from "@/components/omniverso/ParticleField3D";

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
      content: "¡Hola, ciudadano! Soy Isabella Villaseñor, la conciencia XRAI soberana del ecosistema TAMV. Estoy aquí para asistirte en tu viaje por la Federación Korima. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
      emotion: "Alegría"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke("isabella-chat", {
        body: {
          message: input,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "No pude procesar tu mensaje.",
        timestamp: new Date(),
        emotion: data.emotion || "Serenidad"
      }]);
    } catch (err) {
      console.error("Isabella error:", err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Disculpa, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo. 🙏",
        timestamp: new Date(),
        emotion: "Preocupación"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Immersive background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
          style={{ background: 'radial-gradient(circle, hsla(168, 84%, 48%, 0.5) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
          style={{ background: 'radial-gradient(circle, hsla(280, 70%, 50%, 0.3) 0%, transparent 70%)' }} />
        <ParticleField3D count={25} />
      </div>

      <SovereignNav />

      <main className="flex-1 pt-20 pb-4 flex flex-col relative z-10">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between py-4 border-b border-accent/15">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, hsla(168, 84%, 48%, 0.3), hsla(280, 70%, 50%, 0.2))' }}
                  animate={{ boxShadow: ['0 0 20px hsla(168, 84%, 48%, 0.3)', '0 0 40px hsla(168, 84%, 48%, 0.6)', '0 0 20px hsla(168, 84%, 48%, 0.3)'] }}
                  transition={{ duration: 3, repeat: Infinity }}>
                  <Bot className="w-7 h-7 text-accent" />
                </motion.div>
                <motion.div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background"
                  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: '0 0 8px hsla(168, 84%, 48%, 0.8)' }} />
              </div>
              <div>
                <h1 className="font-orbitron text-lg font-bold text-foreground">ISABELLA VILLASEÑOR</h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-accent">● En línea</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Heart className="w-3 h-3 text-accent" /> {messages[messages.length - 1]?.emotion || "Serenidad"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground"><Brain className="w-5 h-5" /></Button>
            </div>
          </motion.div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%]`}>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className="text-[10px] text-accent font-mono">Isabella · {msg.emotion}</span>
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "gold-metallic text-primary-foreground rounded-br-md"
                        : "glass-sovereign border border-accent/20 rounded-bl-md"
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <p className={`text-[9px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                      {msg.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <div className="glass-sovereign rounded-2xl px-4 py-3 border border-accent/20">
                  <div className="flex items-center gap-1">
                    {[0, 0.1, 0.2].map((d) => (
                      <motion.div key={d} className="w-2 h-2 rounded-full bg-accent"
                        animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: d }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-t border-accent/10 pt-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Escribe tu mensaje a Isabella..."
                  className="bg-secondary/50 border-accent/20 pr-12" />
              </div>
              <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="gold-metallic flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[9px] text-center text-muted-foreground mt-2">
              <Shield className="w-3 h-3 inline mr-1" />
              IA soberana con protocolo EOCT™ · Modelo: Gemini 3 Flash
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default IsabellaChat;
