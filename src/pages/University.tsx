 /**
  * 🎓 UNIVERSIDAD TAMV - Centro de Conocimiento Soberano
  */
 import { motion } from "framer-motion";
 import SovereignNav from "@/components/layout/SovereignNav";
 import { GraduationCap, BookOpen, Trophy, Users, Play, Clock, Star, ChevronRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Progress } from "@/components/ui/progress";
 
 const courses = [
   { id: 1, title: "Fundamentos de Blockchain MSR", instructor: "Dr. Villaseñor", duration: "8h", students: 1234, progress: 45, level: "Básico" },
   { id: 2, title: "Desarrollo de DreamSpaces XR", instructor: "Isabella AI", duration: "12h", students: 567, progress: 0, level: "Intermedio" },
   { id: 3, title: "Economía Creativa Soberana", instructor: "Fondo Fénix", duration: "6h", students: 890, progress: 100, level: "Avanzado" },
   { id: 4, title: "Criptografía Caótica 4D", instructor: "Anubis Core", duration: "15h", students: 234, progress: 20, level: "Experto" },
   { id: 5, title: "Gobernanza DAO Híbrida", instructor: "Consejo Korima", duration: "10h", students: 456, progress: 0, level: "Avanzado" },
 ];
 
 const achievements = [
   { id: 1, name: "Ciudadano Ilustrado", description: "Completa 5 cursos", progress: 60, icon: "🎓" },
   { id: 2, name: "Guardián del Conocimiento", description: "100 horas de estudio", progress: 35, icon: "📚" },
   { id: 3, name: "Mentor Korima", description: "Ayuda a 10 ciudadanos", progress: 80, icon: "🌟" },
 ];
 
 const University = () => {
   return (
     <div className="min-h-screen bg-background">
       <SovereignNav />
       
       <main className="pt-24 pb-12">
         <div className="container mx-auto px-4">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 rounded-xl gold-metallic flex items-center justify-center">
                 <GraduationCap className="w-6 h-6 text-primary-foreground" />
               </div>
               <div>
                 <h1 className="font-orbitron text-2xl font-bold text-gold-3d">UNIVERSIDAD TAMV</h1>
                 <p className="text-sm text-muted-foreground">Conocimiento certificado en BookPI™</p>
               </div>
             </div>
           </motion.div>
 
           {/* Stats */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
             <StatCard icon={BookOpen} label="Cursos Activos" value="24" />
             <StatCard icon={Users} label="Estudiantes" value="12.4K" />
             <StatCard icon={Trophy} label="Certificados" value="8.9K" />
             <StatCard icon={Clock} label="Horas Totales" value="156h" />
           </div>
 
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Courses */}
             <div className="lg:col-span-2 space-y-4">
               <h2 className="font-orbitron text-lg font-bold text-foreground">MIS CURSOS</h2>
               {courses.map((course, i) => (
                 <motion.div
                   key={course.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="glass-sovereign rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all group cursor-pointer"
                 >
                   <div className="flex items-start gap-4">
                     <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                       <Play className="w-6 h-6 text-primary" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between mb-1">
                         <h3 className="font-orbitron text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                           {course.title}
                         </h3>
                         <span className={`text-[10px] px-2 py-1 rounded-full ${
                           course.level === "Básico" ? "bg-accent/20 text-accent" :
                           course.level === "Intermedio" ? "bg-primary/20 text-primary" :
                           course.level === "Avanzado" ? "bg-purple-500/20 text-purple-400" :
                           "bg-destructive/20 text-destructive"
                         }`}>
                           {course.level}
                         </span>
                       </div>
                       <p className="text-xs text-muted-foreground mb-2">
                         {course.instructor} · {course.duration} · {course.students} estudiantes
                       </p>
                       <div className="flex items-center gap-3">
                         <Progress value={course.progress} className="h-1.5 flex-1" />
                         <span className="text-xs text-muted-foreground font-mono">{course.progress}%</span>
                       </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                   </div>
                 </motion.div>
               ))}
               <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
                 <BookOpen className="w-4 h-4 mr-2" />
                 Explorar Catálogo Completo
               </Button>
             </div>
 
             {/* Achievements */}
             <div className="space-y-4">
               <h2 className="font-orbitron text-lg font-bold text-foreground">LOGROS</h2>
               <div className="glass-sovereign rounded-2xl p-4 border border-primary/10 space-y-4">
                 {achievements.map((ach) => (
                   <div key={ach.id} className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                       {ach.icon}
                     </div>
                     <div className="flex-1">
                       <h4 className="text-sm font-bold text-foreground">{ach.name}</h4>
                       <p className="text-[10px] text-muted-foreground mb-1">{ach.description}</p>
                       <Progress value={ach.progress} className="h-1" />
                     </div>
                     <span className="text-xs text-muted-foreground font-mono">{ach.progress}%</span>
                   </div>
                 ))}
               </div>
 
               {/* Certificados */}
               <div className="glass-sovereign rounded-2xl p-4 border border-primary/10">
                 <div className="flex items-center gap-2 mb-4">
                   <Trophy className="w-5 h-5 text-primary" />
                   <h3 className="font-orbitron text-sm font-bold text-foreground">CERTIFICADOS BookPI</h3>
                 </div>
                 <div className="text-center py-6">
                   <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                     <GraduationCap className="w-8 h-8 text-primary" />
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Completa tu primer curso para obtener un certificado inmutable en la blockchain MSR
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
   <motion.div 
     className="glass-sovereign rounded-2xl p-4 border border-primary/10"
     whileHover={{ y: -2 }}
   >
     <Icon className="w-5 h-5 text-primary mb-2" />
     <p className="font-orbitron text-xl font-bold text-gold-3d">{value}</p>
     <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
   </motion.div>
 );
 
 export default University;