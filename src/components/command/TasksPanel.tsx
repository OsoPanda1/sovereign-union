/**
 * ✅ TASKS PANEL - Gestión de tareas técnicas
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Pause,
  Search,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";
type TaskPriority = "critical" | "high" | "medium" | "low";

const statusConfig: Record<TaskStatus, { label: string; icon: typeof Circle; color: string }> = {
  todo: { label: "Por hacer", icon: Circle, color: "text-gray-400" },
  in_progress: { label: "En progreso", icon: Clock, color: "text-blue-400" },
  review: { label: "En revisión", icon: AlertTriangle, color: "text-amber-400" },
  done: { label: "Completada", icon: CheckCircle2, color: "text-emerald-400" },
  blocked: { label: "Bloqueada", icon: Pause, color: "text-rose-400" },
};

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  critical: { label: "Crítica", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  high: { label: "Alta", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  medium: { label: "Media", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  low: { label: "Baja", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

export const TasksPanel = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", filterStatus],
    queryFn: async () => {
      let query = supabase
        .from("tasks")
        .select("*, modules(name)")
        .order("priority", { ascending: true })
        .order("created_at", { ascending: false });
      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: modules } = useQuery({
    queryKey: ["modules-for-tasks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("modules").select("id, name");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTask: any) => {
      const { data, error } = await supabase.from("tasks").insert([newTask]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsCreateOpen(false);
      toast.success("Tarea creada");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const updates: any = { status };
      if (status === "done") {
        updates.completed_at = new Date().toISOString();
      }
      const { error } = await supabase.from("tasks").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Estado actualizado");
    },
  });

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      title: formData.get("title"),
      description: formData.get("description") || null,
      module_id: formData.get("module_id") || null,
      priority: formData.get("priority") || "medium",
      status: "todo",
      due_date: formData.get("due_date") || null,
    });
  };

  // Group tasks by status for Kanban-like view
  const tasksByStatus = {
    todo: filteredTasks?.filter((t) => t.status === "todo") || [],
    in_progress: filteredTasks?.filter((t) => t.status === "in_progress") || [],
    review: filteredTasks?.filter((t) => t.status === "review") || [],
    done: filteredTasks?.filter((t) => t.status === "done") || [],
    blocked: filteredTasks?.filter((t) => t.status === "blocked") || [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Tareas</h1>
          <p className="text-sm text-muted-foreground">Gestión de tareas técnicas del proyecto</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Crear Tarea</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Título *</Label>
                <Input name="title" required placeholder="Título de la tarea" />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input name="description" placeholder="Descripción detallada" />
              </div>
              <div className="space-y-2">
                <Label>Módulo</Label>
                <Select name="module_id">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar módulo" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules?.map((mod) => (
                      <SelectItem key={mod.id} value={mod.id}>{mod.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select name="priority" defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">🔴 Crítica</SelectItem>
                    <SelectItem value="high">🟠 Alta</SelectItem>
                    <SelectItem value="medium">🔵 Media</SelectItem>
                    <SelectItem value="low">⚪ Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha límite</Label>
                <Input type="date" name="due_date" />
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creando..." : "Crear Tarea"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar tareas..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as TaskStatus | "all")}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {(Object.keys(statusConfig) as TaskStatus[]).map((status) => (
              <SelectItem key={status} value={status}>{statusConfig[status].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(Object.keys(statusConfig) as TaskStatus[]).map((status) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            const statusTasks = tasksByStatus[status];

            return (
              <div key={status} className="space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50">
                  <Icon className={cn("w-4 h-4", config.color)} />
                  <span className="text-sm font-medium text-foreground">{config.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {statusTasks.length}
                  </span>
                </div>

                <div className="space-y-2 min-h-[200px]">
                  {statusTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-3 rounded-lg bg-card border border-border/50 hover:border-border transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-medium text-foreground line-clamp-2">{task.title}</h4>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-medium border shrink-0",
                          priorityConfig[task.priority as TaskPriority].color
                        )}>
                          {priorityConfig[task.priority as TaskPriority].label}
                        </span>
                      </div>

                      {task.modules?.name && (
                        <p className="text-xs text-muted-foreground mb-2">{task.modules.name}</p>
                      )}

                      {task.due_date && (
                        <p className="text-xs text-muted-foreground">
                          📅 {new Date(task.due_date).toLocaleDateString()}
                        </p>
                      )}

                      {/* Quick status change */}
                      <div className="flex gap-1 mt-2 pt-2 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        {(Object.keys(statusConfig) as TaskStatus[])
                          .filter((s) => s !== status)
                          .slice(0, 3)
                          .map((newStatus) => {
                            const NewIcon = statusConfig[newStatus].icon;
                            return (
                              <button
                                key={newStatus}
                                onClick={() => updateStatusMutation.mutate({ id: task.id, status: newStatus })}
                                className={cn(
                                  "p-1 rounded hover:bg-muted transition-colors",
                                  statusConfig[newStatus].color
                                )}
                                title={statusConfig[newStatus].label}
                              >
                                <NewIcon className="w-3 h-3" />
                              </button>
                            );
                          })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
