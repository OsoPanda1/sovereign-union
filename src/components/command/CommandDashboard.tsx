/**
 * 📊 COMMAND DASHBOARD - Vista principal con métricas por capa
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CommandView, TamvLayer } from "@/pages/CommandCenter";
import { 
  Fingerprint, 
  MessageSquare, 
  Database, 
  Brain, 
  Coins, 
  Scale, 
  BookOpen,
  GitBranch,
  Puzzle,
  CheckSquare,
  Rocket,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CommandDashboardProps {
  onNavigate: (view: CommandView) => void;
  onSelectLayer: (layer: TamvLayer) => void;
}

const layerConfig: Record<TamvLayer, { icon: typeof Fingerprint; color: string; gradient: string }> = {
  identity: { icon: Fingerprint, color: "text-blue-400", gradient: "from-blue-500/20 to-blue-600/5" },
  communication: { icon: MessageSquare, color: "text-green-400", gradient: "from-green-500/20 to-green-600/5" },
  information: { icon: Database, color: "text-cyan-400", gradient: "from-cyan-500/20 to-cyan-600/5" },
  intelligence: { icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-purple-600/5" },
  economy: { icon: Coins, color: "text-amber-400", gradient: "from-amber-500/20 to-amber-600/5" },
  governance: { icon: Scale, color: "text-rose-400", gradient: "from-rose-500/20 to-rose-600/5" },
  documentation: { icon: BookOpen, color: "text-teal-400", gradient: "from-teal-500/20 to-teal-600/5" },
};

const layerLabels: Record<TamvLayer, string> = {
  identity: "Identidad",
  communication: "Comunicación",
  information: "Información",
  intelligence: "Inteligencia",
  economy: "Economía",
  governance: "Gobernanza",
  documentation: "Documentación",
};

export const CommandDashboard = ({ onNavigate, onSelectLayer }: CommandDashboardProps) => {
  // Fetch repositories count per layer
  const { data: repos } = useQuery({
    queryKey: ["repositories-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("repositories")
        .select("layer, status");
      if (error) throw error;
      return data;
    },
  });

  // Fetch modules with progress
  const { data: modules } = useQuery({
    queryKey: ["modules-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("layer, progress");
      if (error) throw error;
      return data;
    },
  });

  // Fetch tasks count
  const { data: tasks } = useQuery({
    queryKey: ["tasks-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("status");
      if (error) throw error;
      return data;
    },
  });

  // Fetch deployments
  const { data: deployments } = useQuery({
    queryKey: ["deployments-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deployments")
        .select("status, environment");
      if (error) throw error;
      return data;
    },
  });

  // Calculate layer progress
  const getLayerProgress = (layer: TamvLayer) => {
    if (!modules) return 0;
    const layerModules = modules.filter((m) => m.layer === layer);
    if (layerModules.length === 0) return 0;
    const total = layerModules.reduce((sum, m) => sum + (m.progress || 0), 0);
    return Math.round(total / layerModules.length);
  };

  // Calculate overall progress
  const overallProgress = modules 
    ? Math.round(modules.reduce((sum, m) => sum + (m.progress || 0), 0) / Math.max(modules.length, 1))
    : 0;

  const repoCount = repos?.length || 0;
  const moduleCount = modules?.length || 0;
  const tasksPending = tasks?.filter((t) => t.status !== "done").length || 0;
  const deploymentsRecent = deployments?.filter((d) => d.status === "success").length || 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
          onClick={() => onNavigate("repositories")}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-orbitron text-foreground">{repoCount}</p>
          <p className="text-sm text-muted-foreground">Repositorios</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 transition-all cursor-pointer group"
          onClick={() => onNavigate("modules")}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Puzzle className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">{overallProgress}%</span>
          </div>
          <p className="text-2xl font-bold font-orbitron text-foreground">{moduleCount}</p>
          <p className="text-sm text-muted-foreground">Módulos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl bg-card border border-border/50 hover:border-amber-500/30 transition-all cursor-pointer group"
          onClick={() => onNavigate("tasks")}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
              <CheckSquare className="w-5 h-5 text-amber-400" />
            </div>
            {tasksPending > 0 && <AlertCircle className="w-4 h-4 text-amber-400" />}
          </div>
          <p className="text-2xl font-bold font-orbitron text-foreground">{tasksPending}</p>
          <p className="text-sm text-muted-foreground">Tareas Pendientes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 transition-all cursor-pointer group"
          onClick={() => onNavigate("deployments")}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Rocket className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold font-orbitron text-foreground">{deploymentsRecent}</p>
          <p className="text-sm text-muted-foreground">Despliegues Exitosos</p>
        </motion.div>
      </div>

      {/* Layer Progress Grid */}
      <div>
        <h2 className="text-lg font-orbitron font-bold text-foreground mb-4">
          Arquitectura TAMV - Progreso por Capa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(Object.keys(layerConfig) as TamvLayer[]).map((layer, index) => {
            const config = layerConfig[layer];
            const progress = getLayerProgress(layer);
            const Icon = config.icon;
            const repoCountForLayer = repos?.filter((r) => r.layer === layer).length || 0;

            return (
              <motion.div
                key={layer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onSelectLayer(layer);
                  onNavigate("modules");
                }}
                className={cn(
                  "relative p-5 rounded-2xl border border-border/50 cursor-pointer",
                  "bg-gradient-to-br",
                  config.gradient,
                  "hover:border-border hover:shadow-lg transition-all group"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-background/50 backdrop-blur-sm border border-border/50"
                  )}>
                    <Icon className={cn("w-6 h-6", config.color)} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {repoCountForLayer} repos
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-foreground mb-2">
                  {layerLabels[layer]}
                </h3>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={cn(
                        "h-full rounded-full",
                        progress >= 80 ? "bg-emerald-500" :
                        progress >= 50 ? "bg-amber-500" :
                        "bg-rose-500"
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Progreso</span>
                    <span className={cn(
                      "text-sm font-bold font-mono",
                      progress >= 80 ? "text-emerald-400" :
                      progress >= 50 ? "text-amber-400" :
                      "text-rose-400"
                    )}>
                      {progress}%
                    </span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-muted-foreground">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-5 rounded-2xl bg-card border border-border/50">
        <h3 className="font-orbitron font-bold text-foreground mb-4">Acciones Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onNavigate("repositories")}
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            + Nuevo Repositorio
          </button>
          <button 
            onClick={() => onNavigate("tasks")}
            className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors"
          >
            + Nueva Tarea
          </button>
          <button 
            onClick={() => onNavigate("deployments")}
            className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
          >
            Iniciar Despliegue
          </button>
          <button 
            onClick={() => onNavigate("docs")}
            className="px-4 py-2 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-medium hover:bg-teal-500/20 transition-colors"
          >
            Ver Documentación
          </button>
        </div>
      </div>
    </div>
  );
};
