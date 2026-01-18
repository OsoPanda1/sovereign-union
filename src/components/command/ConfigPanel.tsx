/**
 * ⚙️ CONFIG PANEL - Variables de entorno
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Plus, Eye, EyeOff, Trash2, Edit2, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Environment = "development" | "staging" | "production";

const envColors: Record<Environment, string> = {
  development: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  staging: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  production: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export const ConfigPanel = () => {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [visibleValues, setVisibleValues] = useState<Set<string>>(new Set());
  const [filterEnv, setFilterEnv] = useState<Environment | "all">("all");

  const { data: configs, isLoading } = useQuery({
    queryKey: ["env-configs", filterEnv],
    queryFn: async () => {
      let query = supabase
        .from("env_configs")
        .select("*, repositories(name)")
        .order("key", { ascending: true });
      if (filterEnv !== "all") {
        query = query.eq("environment", filterEnv);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: repos } = useQuery({
    queryKey: ["repositories-for-config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("repositories").select("id, name");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newConfig: any) => {
      const { data, error } = await supabase.from("env_configs").insert([newConfig]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["env-configs"] });
      setIsCreateOpen(false);
      toast.success("Variable creada");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase.from("env_configs").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["env-configs"] });
      setEditingConfig(null);
      toast.success("Variable actualizada");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("env_configs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["env-configs"] });
      toast.success("Variable eliminada");
    },
  });

  const toggleValueVisibility = (id: string) => {
    setVisibleValues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      key: formData.get("key"),
      value: formData.get("value"),
      environment: formData.get("environment"),
      repository_id: formData.get("repository_id") || null,
      is_secret: formData.get("is_secret") === "on",
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate({
      id: editingConfig.id,
      key: formData.get("key"),
      value: formData.get("value"),
      is_secret: formData.get("is_secret") === "on",
    });
  };

  // Group by environment
  const groupedConfigs = {
    development: configs?.filter((c) => c.environment === "development") || [],
    staging: configs?.filter((c) => c.environment === "staging") || [],
    production: configs?.filter((c) => c.environment === "production") || [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Configuración</h1>
          <p className="text-sm text-muted-foreground">Variables de entorno por ambiente</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={filterEnv} onValueChange={(v) => setFilterEnv(v as Environment | "all")}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Entorno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Variable
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-orbitron">Nueva Variable</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Key *</Label>
                  <Input name="key" required placeholder="API_KEY" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Valor *</Label>
                  <Input name="value" required placeholder="valor..." />
                </div>
                <div className="space-y-2">
                  <Label>Entorno *</Label>
                  <Select name="environment" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar entorno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Repositorio (opcional)</Label>
                  <Select name="repository_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Global (todos)" />
                    </SelectTrigger>
                    <SelectContent>
                      {repos?.map((repo) => (
                        <SelectItem key={repo.id} value={repo.id}>{repo.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <Switch name="is_secret" id="is_secret" />
                  <Label htmlFor="is_secret">Es un secreto (ocultar valor)</Label>
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creando..." : "Crear Variable"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Config List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : filterEnv === "all" ? (
        // Grouped view
        <div className="space-y-6">
          {(Object.keys(groupedConfigs) as Environment[]).map((env) => {
            const envConfigs = groupedConfigs[env];
            if (envConfigs.length === 0) return null;

            return (
              <div key={env}>
                <h3 className={cn(
                  "text-sm font-medium mb-3 px-3 py-1.5 rounded-lg inline-block border",
                  envColors[env]
                )}>
                  {env.toUpperCase()}
                </h3>
                <div className="space-y-2">
                  {envConfigs.map((config, index) => (
                    <ConfigRow
                      key={config.id}
                      config={config}
                      index={index}
                      isVisible={visibleValues.has(config.id)}
                      onToggleVisibility={() => toggleValueVisibility(config.id)}
                      onEdit={() => setEditingConfig(config)}
                      onDelete={() => {
                        if (confirm("¿Eliminar esta variable?")) {
                          deleteMutation.mutate(config.id);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat view for filtered
        <div className="space-y-2">
          {configs?.map((config, index) => (
            <ConfigRow
              key={config.id}
              config={config}
              index={index}
              isVisible={visibleValues.has(config.id)}
              onToggleVisibility={() => toggleValueVisibility(config.id)}
              onEdit={() => setEditingConfig(config)}
              onDelete={() => {
                if (confirm("¿Eliminar esta variable?")) {
                  deleteMutation.mutate(config.id);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingConfig} onOpenChange={(open) => !open && setEditingConfig(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-orbitron">Editar Variable</DialogTitle>
          </DialogHeader>
          {editingConfig && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Key</Label>
                <Input name="key" defaultValue={editingConfig.key} className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input name="value" defaultValue={editingConfig.value} />
              </div>
              <div className="flex items-center gap-3">
                <Switch name="is_secret" id="edit_is_secret" defaultChecked={editingConfig.is_secret} />
                <Label htmlFor="edit_is_secret">Es un secreto</Label>
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

// Config Row Component
interface ConfigRowProps {
  config: any;
  index: number;
  isVisible: boolean;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ConfigRow = ({ config, index, isVisible, onToggleVisibility, onEdit, onDelete }: ConfigRowProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.02 }}
    className="p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-all group"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          {config.is_secret ? (
            <Lock className="w-4 h-4 text-primary" />
          ) : (
            <Unlock className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono font-semibold text-foreground">{config.key}</code>
            {config.repositories?.name && (
              <span className="text-xs text-muted-foreground">({config.repositories.name})</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-xs text-muted-foreground font-mono truncate">
              {config.is_secret && !isVisible 
                ? "••••••••••••" 
                : config.value
              }
            </code>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {config.is_secret && (
          <button
            onClick={onToggleVisibility}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        <button
          onClick={onEdit}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);
