/**
 * 🏛️ FOOTER OMNI - TAMV Omniverso
 * Footer premium con información del ecosistema
 */
import { motion } from "framer-motion";
import { Github, Globe, Shield, Sparkles } from "lucide-react";

export const FooterOmni = () => {
  return (
    <footer className="relative border-t border-primary/10 pt-16 pb-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-10"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.3), transparent)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center">
                <span className="font-orbitron font-black text-primary-foreground">T</span>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-foreground">TAMV</h3>
                <p className="text-[10px] text-muted-foreground">MD-X4™ OMNIVERSO</p>
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-4">
              El primer ecosistema digital soberano del mundo. Donde la memoria limita al poder.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com/OsoPanda1/ecosistema-nextgen-tamv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-sovereign flex items-center justify-center hover:border-primary/40 transition-colors"
              >
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg glass-sovereign flex items-center justify-center hover:border-primary/40 transition-colors"
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-primary mb-4 tracking-wider">ECOSISTEMA</h4>
            <ul className="space-y-2">
              {["Social XR", "Universidad", "Marketplace", "Lotería", "Gaming"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs font-bold text-primary mb-4 tracking-wider">TECNOLOGÍA</h4>
            <ul className="space-y-2">
              {["Isabella AI", "MSR Blockchain", "DreamSpaces", "BookPI", "APIs"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs font-bold text-primary mb-4 tracking-wider">RECURSOS</h4>
            <ul className="space-y-2">
              {["Documentación", "Whitepaper", "DevHub", "Seguridad", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Status & Version */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] text-accent font-mono">SISTEMA ACTIVO</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">v4.0.0-beta</span>
            </div>

            {/* Center Credits */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary glow-gold-pulse" />
                <span className="text-[10px] text-primary font-orbitron tracking-[0.3em]">
                  FEDERACIÓN KORIMA
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-accent glow-turquoise" />
              </div>
              <p className="text-[9px] text-muted-foreground">
                SOBERANÍA DIGITAL 2024–2040
              </p>
            </div>

            {/* Right Info */}
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-accent" />
                Zero Knowledge
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                Isabella AI
              </span>
            </div>
          </div>

          {/* Architect Credit */}
          <p className="text-center text-[9px] text-muted-foreground/50 mt-6">
            Arquitecto: Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOmni;
