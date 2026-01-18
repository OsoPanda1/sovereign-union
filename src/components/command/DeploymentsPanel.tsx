/**
 * 🚀 DEPLOYMENTS PANEL - Registro de despliegues
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Rocket, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCw,
  Server,
  GitCommit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

type DeploymentStatus = "pending" | "building" | "deploying" | "success" | "failed" | "rollback";
type Environment = "development" | "staging" | "production";

const statusConfig: Record<DeploymentStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pendiente", icon: Clock, color: "text-gray-400" },
  building: { label: "Compilando", icon: RefreshCw, color: "text-blue-400 animate-spin" },
  deploying: { label: "Desplegando", icon: Rocket, color: "text-amber-400" },
  success: { label: "Exitoso", icon: CheckCircle2, color: "text-emerald-400" },
  failed: { label: "Fallido", icon: XCircle, color: "text-rose-400" },
  rollback: { label: "Rollback", icon: RefreshCw, color: "text-purple-400" },
};

const envConfig: Record<Environment, { label: string; color: string }> = {
  development: { label: "Development", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  staging: { label: "Staging", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  production: { label: "Production", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

export const DeploymentsPanel = () => {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: deployments, isLoading } = useQuery({
    queryKey: ["deployments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deployments")
        .select("*, repositories(name)")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const { data: repos } = useQuery({
    queryKey: ["repositories-for-deployments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("repositories").select("id, name");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newDeploy: any) => {
      const { data, error } = await supabase.from("deployments").insert([newDeploy]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
      setIsCreateOpen(false);
      toast.success("Despliegue iniciado");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: DeploymentStatus }) => {
      const updates: any = { status };
      if (status === "success" || status === "failed") {
        updates.completed_at = new Date().toISOString();
      }
      const { error } = await supabase.from("deployments").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
      toast.success("Estado actualizado");
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      repository_id: formData.get("repository_id"),
      environment: formData.get("environment"),
      version: formData.get("version"),
      commit_hash: formData.get("commit_hash") || null,
      status: "pending",
    });
  };

  // Stats
  const successCount = deployments?.filter((d) => d.status === "success").length || 0;
  const failedCount = deployments?.filter((d) => d.status === "failed").length || 0;
  const pendingCount = deployments?.filter((d) => ["pending", "building", "deploying"].includes(d.status)).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Despliegues</h1>
          <p className="text-sm text-muted-foreground">Historial de despliegues staging/production</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Rocket className="w-4 h-4" />
              Nuevo Despliegue
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Iniciar Despliegue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Repositorio *</Label>
                <Select name="repository_id" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar repositorio" />
                  </SelectTrigger>
                  <SelectContent>
                    {repos?.map((repo) => (
                      <SelectItem key={repo.id} value={repo.id}>{repo.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Entorno *</Label>
                <Select name="environment" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar entorno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">🔵 Development</SelectItem>
                    <SelectItem value="staging">🟠 Staging</SelectItem>
                    <SelectItem value="production">🟢 Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Versión *</Label>
                <Input name="version" required placeholder="v1.0.0" />
              </div>
              <div className="space-y-2">
                <Label>Commit Hash</Label>
                <Input name="commit_hash" placeholder="abc123..." />
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Iniciando..." : "Iniciar Despliegue"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-2xl font-bold font-orbitron text-emerald-400">{successCount}</p>
              <p className="text-xs text-emerald-400/70">Exitosos</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-rose-400" />
            <div>
              <p className="text-2xl font-bold font-orbitron text-rose-400">{failedCount}</p>
              <p className="text-xs text-rose-400/70">Fallidos</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold font-orbitron text-blue-400">{pendingCount}</p>
              <p className="text-xs text-blue-400/70">En Proceso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deployments List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {deployments?.map((deploy, index) => {
            const status = statusConfig[deploy.status as DeploymentStatus];
            const env = envConfig[deploy.environment as Environment];
            const Icon = status.icon;

            return (
              <motion.div
                key={deploy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Server className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{deploy.repositories?.name || "Repositorio"}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-medium border",
                          env.color
                        )}>
                          {env.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="font-mono">{deploy.version}</span>
                        {deploy.commit_hash && (
                          <span className="flex items-center gap-1">
                            <GitCommit className="w-3 h-3" />
                            {deploy.commit_hash.substring(0, 7)}
                          </span>
                        )}
                        <span>{new Date(deploy.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={cn("flex items-center gap-2", status.color)}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>

                    {/* Quick actions for pending/building */}
                    {["pending", "building", "deploying"].includes(deploy.status) && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: deploy.id, status: "success" })}
                          className="p-1.5 rounded-md hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400"
                          title="Marcar como exitoso"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: deploy.id, status: "failed" })}
                          className="p-1.5 rounded-md hover:bg-rose-500/10 text-muted-foreground hover:text-rose-400"
                          title="Marcar como fallido"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {deployments?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Rocket className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No hay despliegues registrados</p>
              <p className="text-sm">Inicia tu primer despliegue</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
