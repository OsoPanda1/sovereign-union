/**
 * 🎓 NEXUS LEFT SIDEBAR - Visual-First Widgets
 * Compact, image-dominant, minimal text
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const NexusSidebar = () => {
  return (
    <div className="space-y-4">
      {/* University Progress - Visual Ring */}
      <motion.div
        className="card-sovereign rounded-3xl p-5 relative overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[50px]"
            style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.5) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            {/* Circular progress ring */}
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsla(45, 92%, 58%, 0.1)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#progressGrad)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 * 0.45 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(45, 92%, 68%)" />
                    <stop offset="100%" stopColor="hsl(38, 85%, 45%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-orbitron text-lg font-black text-gold-3d">55%</span>
                <span className="text-[7px] text-muted-foreground tracking-[0.2em]">NIVEL 3</span>
              </div>
            </div>
          </div>
          <p className="text-center text-[9px] font-orbitron text-muted-foreground tracking-[0.15em]">UNIVERSIDAD TAMV</p>

          {/* Course pills - visual, not text lists */}
          <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
            <CoursePill label="Cripto I" done />
            <CoursePill label="Kórima" progress={65} />
            <CoursePill label="4D" locked />
          </div>

          <Link to="/university">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full mt-4 py-2 rounded-xl glass-sovereign text-[9px] font-orbitron text-primary hover:border-primary/30 transition-all"
            >
              EXPLORAR CURSOS →
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Achievements Visual Grid */}
      <motion.div
        className="card-sovereign rounded-3xl p-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-[8px] font-orbitron text-muted-foreground tracking-[0.2em] mb-3 text-center">LOGROS</p>
        <div className="grid grid-cols-5 gap-1.5">
          {["🛡️", "⚡", "🌟", "🔐", "💫", "🔥", "👑", "💎", "🌀", "✨"].map((e, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl glass-sovereign flex items-center justify-center text-sm cursor-pointer hover:border-primary/30 transition-all"
              whileHover={{ scale: 1.15, rotate: 5 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={i >= 7 ? { opacity: 0.3, filter: 'grayscale(1)' } : {}}
            >
              {e}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* DreamSpaces Preview */}
      <Link to="/dreamspaces">
        <motion.div
          className="card-sovereign rounded-3xl p-4 relative overflow-hidden group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -3 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, hsla(280, 70%, 50%, 0.1), hsla(168, 84%, 48%, 0.1), hsla(45, 92%, 58%, 0.1), hsla(280, 70%, 50%, 0.1))',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative z-10 text-center">
            <motion.span
              className="text-3xl block mb-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌌
            </motion.span>
            <p className="text-[9px] font-orbitron text-foreground tracking-[0.15em]">DREAMSPACES</p>
            <p className="text-[7px] text-muted-foreground mt-1">3 mundos activos</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

const CoursePill = ({ label, done, progress, locked }: { label: string; done?: boolean; progress?: number; locked?: boolean }) => (
  <div className={`px-2.5 py-1 rounded-full text-[8px] font-mono border transition-all ${
    done ? "bg-accent/15 border-accent/30 text-accent" :
    locked ? "bg-secondary/30 border-border/20 text-muted-foreground/40" :
    "bg-primary/10 border-primary/25 text-primary"
  }`}>
    {done && "✓ "}{label}{progress ? ` ${progress}%` : ""}
  </div>
);

export default NexusSidebar;
