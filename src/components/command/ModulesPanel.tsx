/**
 * 🧩 MODULES PANEL - Gestión de módulos por capa
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TamvLayer } from "@/pages/CommandCenter";
import { Puzzle, Plus, Edit2, Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ModulesPanelProps {
  selectedLayer: TamvLayer | null;
}

const layers: TamvLayer[] = ["identity", "communication", "information", "intelligence", "economy", "governance", "documentation"];
const layerLabels: Record<TamvLayer, string> = {
  identity: "Identidad",
  communication: "Comunicación",
  information: "Información",
  intelligence: "Inteligencia",
  economy: "Economía",
  governance: "Gobernanza",
  documentation: "Documentación",
};

export const ModulesPanel = ({ selectedLayer }: ModulesPanelProps) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterLayer, setFilterLayer] = useState<TamvLayer | "all">(selectedLayer || "all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [newProgress, setNewProgress] = useState(0);

  const { data: modules, isLoading } = useQuery({
    queryKey: ["modules", filterLayer],
    queryFn: async () => {
      let query = supabase
        .from("modules")
        .select("*, repositories(name)")
        .order("created_at", { ascending: false });
      if (filterLayer !== "all") {
        query = query.eq("layer", filterLayer);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: repos } = useQuery({
    queryKey: ["repositories-for-modules"],
    queryFn: async () => {
      const { data, error } = await supabase.from("repositories").select("id, name, layer");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newModule: any) => {
      const { data, error } = await supabase.from("modules").insert([newModule]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      setIsCreateOpen(false);
      toast.success("Módulo creado exitosamente");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase.from("modules").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      setEditingModule(null);
      toast.success("Módulo actualizado");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("modules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      toast.success("Módulo eliminado");
    },
  });

  const filteredModules = modules?.filter((mod) =>
    mod.name.toLowerCase().includes(search.toLowerCase()) ||
    mod.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const repoId = formData.get("repository_id") as string;
    const selectedRepo = repos?.find(r => r.id === repoId);
    
    createMutation.mutate({
      name: formData.get("name"),
      description: formData.get("description") || null,
      repository_id: repoId || null,
      layer: selectedRepo?.layer || formData.get("layer"),
      progress: newProgress,
      status: formData.get("status") || "active",
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate({
      id: editingModule.id,
      name: formData.get("name"),
      description: formData.get("description") || null,
      progress: parseInt(formData.get("progress") as string) || 0,
      status: formData.get("status"),
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Módulos</h1>
          <p className="text-sm text-muted-foreground">Seguimiento de progreso por módulo</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Crear Módulo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input name="name" required placeholder="Nombre del módulo" />
              </div>
              <div className="space-y-2">
                <Label>Repositorio</Label>
                <Select name="repository_id">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar repositorio" />
                  </SelectTrigger>
                  <SelectContent>
                    {repos?.map((repo) => (
                      <SelectItem key={repo.id} value={repo.id}>
                        {repo.name} ({layerLabels[repo.layer as TamvLayer]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Capa (si no hay repositorio)</Label>
                <Select name="layer" defaultValue={selectedLayer || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar capa" />
                  </SelectTrigger>
                  <SelectContent>
                    {layers.map((layer) => (
                      <SelectItem key={layer} value={layer}>{layerLabels[layer]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input name="description" placeholder="Descripción del módulo" />
              </div>
              <div className="space-y-2">
                <Label>Progreso: {newProgress}%</Label>
                <Slider
                  value={[newProgress]}
                  onValueChange={([val]) => setNewProgress(val)}
                  max={100}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creando..." : "Crear Módulo"}
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
            placeholder="Buscar módulos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterLayer} onValueChange={(v) => setFilterLayer(v as TamvLayer | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por capa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las capas</SelectItem>
            {layers.map((layer) => (
              <SelectItem key={layer} value={layer}>{layerLabels[layer]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Modules Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules?.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-border transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Puzzle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{mod.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {mod.repositories?.name || layerLabels[mod.layer as TamvLayer]}
                    </span>
                  </div>
                </div>
              </div>

              {mod.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mod.description}</p>
              )}

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Progreso</span>
                  <span className={cn(
                    "text-sm font-bold font-mono",
                    mod.progress >= 80 ? "text-emerald-400" :
                    mod.progress >= 50 ? "text-amber-400" :
                    "text-rose-400"
                  )}>
                    {mod.progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mod.progress}%` }}
                    transition={{ duration: 0.8 }}
                    className={cn("h-full rounded-full", getProgressColor(mod.progress))}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingModule(mod)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => {
                    if (confirm("¿Eliminar este módulo?")) {
                      deleteMutation.mutate(mod.id);
                    }
                  }}
                  className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingModule} onOpenChange={(open) => !open && setEditingModule(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-orbitron">Editar Módulo</DialogTitle>
          </DialogHeader>
          {editingModule && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input name="name" required defaultValue={editingModule.name} />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input name="description" defaultValue={editingModule.description || ""} />
              </div>
              <div className="space-y-2">
                <Label>Progreso: {editingModule.progress}%</Label>
                <Input 
                  type="number" 
                  name="progress" 
                  min={0} 
                  max={100} 
                  defaultValue={editingModule.progress} 
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select name="status" defaultValue={editingModule.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
