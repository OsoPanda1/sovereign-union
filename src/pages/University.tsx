/**
 * 🎓 UNIVERSIDAD TAMV - Centro de Conocimiento Soberano Inmersivo
 * 75% visual / 25% texto
 */
import { motion } from "framer-motion";
import SovereignNav from "@/components/layout/SovereignNav";
import { GraduationCap, BookOpen, Trophy, Users, Play, Clock, Star, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ParticleField3D } from "@/components/omniverso/ParticleField3D";

const courses = [
  { id: 1, title: "Fundamentos de Blockchain MSR", instructor: "Dr. Villaseñor", duration: "8h", students: 1234, progress: 45, level: "Básico", color: "168, 84%, 48%" },
  { id: 2, title: "Desarrollo de DreamSpaces XR", instructor: "Isabella AI", duration: "12h", students: 567, progress: 0, level: "Intermedio", color: "280, 75%, 60%" },
  { id: 3, title: "Economía Creativa Soberana", instructor: "Fondo Fénix", duration: "6h", students: 890, progress: 100, level: "Avanzado", color: "45, 92%, 58%" },
  { id: 4, title: "Criptografía Caótica 4D", instructor: "Anubis Core", duration: "15h", students: 234, progress: 20, level: "Experto", color: "0, 70%, 55%" },
  { id: 5, title: "Gobernanza DAO Híbrida", instructor: "Consejo Korima", duration: "10h", students: 456, progress: 0, level: "Avanzado", color: "200, 80%, 55%" },
];

const achievements = [
  { id: 1, name: "Ciudadano Ilustrado", progress: 60, icon: "🎓" },
  { id: 2, name: "Guardián del Conocimiento", progress: 35, icon: "📚" },
  { id: 3, name: "Mentor Korima", progress: 80, icon: "🌟" },
];

const University = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Immersive background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(circle, hsla(168, 84%, 48%, 0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.3) 0%, transparent 70%)' }} />
        <ParticleField3D count={25} />
        <div className="absolute inset-0 grid-pattern opacity-15" />
      </div>

      <SovereignNav />

      <main className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-metallic mb-4"
              animate={{ rotateY: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="font-orbitron text-3xl font-bold text-gold-3d mb-2">UNIVERSIDAD TAMV</h1>
            <p className="text-muted-foreground">Conocimiento certificado en <span className="text-accent font-medium">BookPI™ Blockchain</span></p>
          </motion.div>

          {/* Stats Orbs */}
          <motion.div className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {[
              { icon: BookOpen, value: "24", label: "CURSOS", color: "168, 84%, 48%" },
              { icon: Users, value: "12.4K", label: "ALUMNOS", color: "45, 92%, 58%" },
              { icon: Trophy, value: "8.9K", label: "CERTIFICADOS", color: "280, 75%, 60%" },
              { icon: Clock, value: "156h", label: "CONTENIDO", color: "200, 80%, 55%" },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer"
                style={{
                  background: `radial-gradient(circle at 35% 35%, hsla(${stat.color}, 0.2), rgba(0,0,0,0.5))`,
                  border: `1px solid hsla(${stat.color}, 0.3)`,
                  boxShadow: `0 0 25px hsla(${stat.color}, 0.15), inset 0 0 15px rgba(0,0,0,0.5)`,
                }}
                whileHover={{ scale: 1.1, y: -5, boxShadow: `0 0 40px hsla(${stat.color}, 0.4)` }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1, type: "spring" }}>
                <stat.icon className="w-4 h-4 mb-1" style={{ color: `hsl(${stat.color})` }} />
                <span className="font-orbitron text-sm font-black" style={{ color: `hsl(${stat.color})` }}>{stat.value}</span>
                <span className="text-[6px] text-muted-foreground tracking-[0.15em]">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Courses */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-orbitron text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> MIS CURSOS
              </h2>
              {courses.map((course, i) => (
                <motion.div key={course.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="card-sovereign rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ y: -3 }}>
                  <div className="flex items-stretch">
                    {/* Visual side */}
                    <div className="w-20 flex-shrink-0 flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, hsla(${course.color}, 0.2), rgba(0,0,0,0.3))` }}>
                      <Play className="w-6 h-6" style={{ color: `hsl(${course.color})` }} />
                      {course.progress === 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                          <span className="text-lg">✅</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-orbitron text-sm font-bold text-foreground group-hover:text-gold-3d transition-colors">
                          {course.title}
                        </h3>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-orbitron font-bold"
                          style={{ background: `hsla(${course.color}, 0.15)`, color: `hsl(${course.color})`, border: `1px solid hsla(${course.color}, 0.3)` }}>
                          {course.level}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {course.instructor} · {course.duration} · {course.students} estudiantes
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(45,45,60,0.5)' }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, hsl(${course.color}), hsla(${course.color}, 0.6))`, boxShadow: `0 0 8px hsla(${course.color}, 0.5)` }}
                            initial={{ width: 0 }} animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{course.progress}%</span>
                      </div>
                    </div>
                    <div className="flex items-center pr-3">
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              {/* Achievements as visual orbs */}
              <h2 className="font-orbitron text-lg font-bold text-foreground">LOGROS</h2>
              <div className="card-sovereign rounded-2xl p-5 space-y-4">
                {achievements.map((ach) => (
                  <div key={ach.id} className="flex items-center gap-3">
                    <motion.div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, hsla(45, 92%, 58%, 0.15), rgba(0,0,0,0.4))`,
                        border: '1px solid hsla(45, 92%, 58%, 0.2)',
                        boxShadow: '0 0 15px hsla(45, 92%, 58%, 0.1)',
                      }}
                      whileHover={{ scale: 1.15, rotate: 5 }}>
                      {ach.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-foreground">{ach.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(45,45,60,0.5)' }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: 'var(--gradient-gold-3d)', backgroundSize: '200% 200%', boxShadow: '0 0 6px hsla(45, 92%, 58%, 0.5)' }}
                            initial={{ width: 0 }} animate={{ width: `${ach.progress}%` }}
                            transition={{ duration: 1.2 }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{ach.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificate visual */}
              <motion.div className="card-sovereign rounded-2xl p-5 text-center relative overflow-hidden"
                whileHover={{ y: -3 }}>
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                    style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.08) 0%, transparent 70%)' }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }} />
                </div>
                <div className="relative z-10">
                  <motion.div className="w-16 h-16 mx-auto mb-3 rounded-full gold-metallic flex items-center justify-center"
                    animate={{ rotateY: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                    <Trophy className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="font-orbitron text-sm font-bold text-gold-3d mb-2">CERTIFICADOS BookPI</h3>
                  <p className="text-xs text-muted-foreground">
                    Completa tu primer curso para obtener un certificado inmutable
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default University;
