import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Trophy, ChevronRight, 
  Lock, CheckCircle, Circle, Sparkles 
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  progress: number;
  status: "completed" | "in-progress" | "locked";
  msrReward: number;
}

const courses: Course[] = [
  { id: "crypto-1", title: "Criptografía Caótica I", progress: 100, status: "completed", msrReward: 50 },
  { id: "korima-1", title: "Justicia Korima", progress: 65, status: "in-progress", msrReward: 75 },
  { id: "dreamspace-1", title: "Manifestación 4D", progress: 0, status: "locked", msrReward: 100 },
];

export const UniversitySidebar = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        className="card-sovereign rounded-3xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl gold-metallic flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-orbitron text-[10px] text-gold-3d tracking-[0.15em]">
              UNIVERSIDAD TAMV
            </h3>
            <p className="text-[9px] text-muted-foreground">Nivel 3 · Guardián</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground">Progreso Global</span>
            <span className="text-[10px] font-orbitron text-gold-3d font-bold">55%</span>
          </div>
          <div className="progress-sovereign">
            <motion.div 
              className="progress-sovereign-bar"
              initial={{ width: 0 }}
              animate={{ width: "55%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          {courses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <CourseItem course={course} />
            </motion.div>
          ))}
        </div>

        <motion.button whileHover={{ x: 5 }} className="flex items-center gap-2 mt-5 text-[10px] text-primary hover:text-primary/80 transition-colors">
          <BookOpen className="w-3 h-3" /><span>Ver todos los cursos</span><ChevronRight className="w-3 h-3" />
        </motion.button>
      </motion.div>

      {/* Achievements */}
      <motion.div className="card-sovereign rounded-3xl p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="font-orbitron text-[10px] text-foreground tracking-[0.15em]">LOGROS RECIENTES</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["🛡️", "⚡", "🌟", "🔐", "💫"].map((emoji, i) => (
            <motion.div key={i} className="w-11 h-11 rounded-xl glass-sovereign flex items-center justify-center text-lg hover:border-primary/30 transition-colors cursor-pointer" whileHover={{ scale: 1.1 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
              {emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const CourseItem = ({ course }: { course: Course }) => {
  const StatusIcon = { completed: CheckCircle, "in-progress": Circle, locked: Lock }[course.status];
  const statusColor = { completed: "text-accent", "in-progress": "text-primary", locked: "text-muted-foreground" }[course.status];

  return (
    <motion.div whileHover={{ x: 3 }} className={`flex items-center gap-3 p-3 rounded-xl glass-sovereign transition-all cursor-pointer ${course.status === "locked" ? "opacity-50" : "hover:border-primary/20"}`}>
      <StatusIcon className={`w-4 h-4 ${statusColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-foreground truncate">{course.title}</p>
        {course.status === "in-progress" && (
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 progress-sovereign h-1">
              <div className="progress-sovereign-bar h-1" style={{ width: `${course.progress}%` }} />
            </div>
            <span className="text-[9px] text-muted-foreground">{course.progress}%</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 text-[9px] text-gold-3d font-orbitron font-bold">
        <Sparkles className="w-3 h-3 text-primary" />{course.msrReward}
      </div>
    </motion.div>
  );
};

export default UniversitySidebar;
