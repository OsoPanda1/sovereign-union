/**
 * 📦 REPOSITORIES PANEL - CRUD de repositorios TAMV
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TamvLayer } from "@/pages/CommandCenter";
import { 
  GitBranch, 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2,
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

interface RepositoriesPanelProps {
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

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  archived: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export const RepositoriesPanel = ({ selectedLayer }: RepositoriesPanelProps) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterLayer, setFilterLayer] = useState<TamvLayer | "all">(selectedLayer || "all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<any>(null);

  const { data: repos, isLoading } = useQuery({
    queryKey: ["repositories", filterLayer],
    queryFn: async () => {
      let query = supabase.from("repositories").select("*").order("created_at", { ascending: false });
      if (filterLayer !== "all") {
        query = query.eq("layer", filterLayer);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newRepo: any) => {
      const { data, error } = await supabase.from("repositories").insert([newRepo]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
      setIsCreateOpen(false);
      toast.success("Repositorio creado exitosamente");
    },
    onError: (error: any) => {
      toast.error("Error al crear repositorio: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase.from("repositories").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
      setEditingRepo(null);
      toast.success("Repositorio actualizado");
    },
    onError: (error: any) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("repositories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
      toast.success("Repositorio eliminado");
    },
    onError: (error: any) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const filteredRepos = repos?.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    repo.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      name: formData.get("name"),
      url: formData.get("url") || null,
      layer: formData.get("layer"),
      description: formData.get("description") || null,
      stack: formData.get("stack") ? (formData.get("stack") as string).split(",").map(s => s.trim()) : [],
      status: formData.get("status") || "active",
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate({
      id: editingRepo.id,
      name: formData.get("name"),
      url: formData.get("url") || null,
      layer: formData.get("layer"),
      description: formData.get("description") || null,
      stack: formData.get("stack") ? (formData.get("stack") as string).split(",").map(s => s.trim()) : [],
      status: formData.get("status"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Repositorios</h1>
          <p className="text-sm text-muted-foreground">Gestión de repositorios del ecosistema TAMV</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Repositorio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Crear Repositorio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input id="name" name="name" required placeholder="tamv-module-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL GitHub</Label>
                <Input id="url" name="url" placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="layer">Capa *</Label>
                <Select name="layer" required defaultValue={selectedLayer || undefined}>
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
                <Label htmlFor="stack">Stack (separado por comas)</Label>
                <Input id="stack" name="stack" placeholder="TypeScript, React, Supabase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" name="description" placeholder="Descripción del repositorio" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creando..." : "Crear Repositorio"}
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
            placeholder="Buscar repositorios..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterLayer} onValueChange={(v) => setFilterLayer(v as TamvLayer | "all")}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
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

      {/* Repositories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos?.map((repo) => (
            <div
              key={repo.id}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-border transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{repo.name}</h3>
                    <span className="text-xs text-muted-foreground">{layerLabels[repo.layer as TamvLayer]}</span>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                  statusColors[repo.status]
                )}>
                  {repo.status}
                </span>
              </div>

              {repo.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>
              )}

              {repo.stack && repo.stack.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {repo.stack.slice(0, 4).map((tech: string) => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {repo.stack.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                      +{repo.stack.length - 4}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                {repo.url ? (
                  <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    GitHub
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">Sin URL</span>
                )}
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setEditingRepo(repo)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm("¿Eliminar este repositorio?")) {
                        deleteMutation.mutate(repo.id);
                      }
                    }}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingRepo} onOpenChange={(open) => !open && setEditingRepo(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-orbitron">Editar Repositorio</DialogTitle>
          </DialogHeader>
          {editingRepo && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre *</Label>
                <Input id="edit-name" name="name" required defaultValue={editingRepo.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-url">URL GitHub</Label>
                <Input id="edit-url" name="url" defaultValue={editingRepo.url || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-layer">Capa *</Label>
                <Select name="layer" defaultValue={editingRepo.layer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {layers.map((layer) => (
                      <SelectItem key={layer} value={layer}>{layerLabels[layer]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stack">Stack</Label>
                <Input id="edit-stack" name="stack" defaultValue={editingRepo.stack?.join(", ") || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Input id="edit-description" name="description" defaultValue={editingRepo.description || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select name="status" defaultValue={editingRepo.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
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
