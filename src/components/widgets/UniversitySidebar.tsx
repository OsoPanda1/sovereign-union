import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Trophy, ChevronRight, 
  Lock, CheckCircle, Circle, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  progress: number;
  status: "completed" | "in-progress" | "locked";
  msrReward: number;
}

const courses: Course[] = [
  {
    id: "crypto-1",
    title: "Criptografía Caótica I",
    progress: 100,
    status: "completed",
    msrReward: 50,
  },
  {
    id: "korima-1",
    title: "Justicia Korima",
    progress: 65,
    status: "in-progress",
    msrReward: 75,
  },
  {
    id: "dreamspace-1",
    title: "Manifestación 4D",
    progress: 0,
    status: "locked",
    msrReward: 100,
  },
];

export const UniversitySidebar = () => {
  return (
    <div className="space-y-6">
      {/* University Card */}
      <motion.div 
        className="glass-sovereign rounded-3xl p-6 border border-primary/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-orbitron text-[10px] text-primary tracking-widest">
              UNIVERSIDAD TAMV
            </h3>
            <p className="text-[9px] text-muted-foreground">
              Nivel 3 · Guardián
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground">Progreso Global</span>
            <span className="text-[10px] font-orbitron text-primary">55%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "55%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Courses */}
        <div className="space-y-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <CourseItem course={course} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 mt-4 text-[10px] text-primary hover:text-primary/80 transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>Ver todos los cursos</span>
          <ChevronRight className="w-3 h-3" />
        </motion.button>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        className="glass-sovereign rounded-3xl p-6 border border-primary/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="font-orbitron text-[10px] text-foreground tracking-widest">
            LOGROS RECIENTES
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {["🛡️", "⚡", "🌟", "🔐", "💫"].map((emoji, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-lg border border-primary/10"
              whileHover={{ scale: 1.1, borderColor: "rgba(212, 175, 55, 0.4)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const CourseItem = ({ course }: { course: Course }) => {
  const StatusIcon = {
    completed: CheckCircle,
    "in-progress": Circle,
    locked: Lock,
  }[course.status];

  const statusColor = {
    completed: "text-accent",
    "in-progress": "text-primary",
    locked: "text-muted-foreground",
  }[course.status];

  return (
    <motion.div
      whileHover={{ x: 3 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        course.status === "locked" 
          ? "bg-secondary/30 opacity-60" 
          : "bg-secondary/50 hover:bg-secondary/70"
      }`}
    >
      <StatusIcon className={`w-4 h-4 ${statusColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-foreground truncate">{course.title}</p>
        {course.status === "in-progress" && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground">{course.progress}%</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 text-[9px] text-primary font-orbitron">
        <Sparkles className="w-3 h-3" />
        {course.msrReward}
      </div>
    </motion.div>
  );
};

export default UniversitySidebar;
