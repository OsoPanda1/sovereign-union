/**
 * 📚 DOCS PANEL - Documentación integrada (BookPI, Whitepapers)
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TamvLayer } from "@/pages/CommandCenter";
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  BookOpen,
  Search,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

const docTypes = [
  { value: "whitepaper", label: "Whitepaper" },
  { value: "api", label: "API Docs" },
  { value: "guide", label: "Guía" },
  { value: "readme", label: "README" },
  { value: "changelog", label: "Changelog" },
  { value: "general", label: "General" },
];

export const DocsPanel = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<any>(null);
  const [editingDoc, setEditingDoc] = useState<any>(null);

  const { data: docs, isLoading } = useQuery({
    queryKey: ["documentation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documentation")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newDoc: any) => {
      const { data, error } = await supabase.from("documentation").insert([newDoc]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentation"] });
      setIsCreateOpen(false);
      toast.success("Documento creado");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase.from("documentation").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentation"] });
      setEditingDoc(null);
      toast.success("Documento actualizado");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("documentation").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentation"] });
      toast.success("Documento eliminado");
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase.from("documentation").update({ is_published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentation"] });
      toast.success("Estado de publicación actualizado");
    },
  });

  const filteredDocs = docs?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.content?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      title: formData.get("title"),
      content: formData.get("content") || null,
      layer: formData.get("layer") || null,
      doc_type: formData.get("doc_type") || "general",
      version: formData.get("version") || "1.0.0",
      is_published: formData.get("is_published") === "on",
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate({
      id: editingDoc.id,
      title: formData.get("title"),
      content: formData.get("content") || null,
      layer: formData.get("layer") || null,
      doc_type: formData.get("doc_type"),
      version: formData.get("version"),
      is_published: formData.get("is_published") === "on",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-foreground">Documentación</h1>
          <p className="text-sm text-muted-foreground">BookPI, Whitepapers y guías del ecosistema</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Crear Documento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título *</Label>
                  <Input name="title" required placeholder="Título del documento" />
                </div>
                <div className="space-y-2">
                  <Label>Versión</Label>
                  <Input name="version" defaultValue="1.0.0" placeholder="1.0.0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select name="doc_type" defaultValue="general">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {docTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Capa</Label>
                  <Select name="layer">
                    <SelectTrigger>
                      <SelectValue placeholder="Ninguna (general)" />
                    </SelectTrigger>
                    <SelectContent>
                      {layers.map((layer) => (
                        <SelectItem key={layer} value={layer}>{layerLabels[layer]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Contenido (Markdown)</Label>
                <Textarea 
                  name="content" 
                  placeholder="# Título&#10;&#10;Contenido del documento en Markdown..." 
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch name="is_published" id="is_published" />
                <Label htmlFor="is_published">Publicar inmediatamente</Label>
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creando..." : "Crear Documento"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar documentos..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Docs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs?.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-border transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">{doc.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground font-mono">v{doc.version}</span>
                      {doc.layer && (
                        <span className="text-xs text-muted-foreground">
                          • {layerLabels[doc.layer as TamvLayer]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                  {docTypes.find((t) => t.value === doc.doc_type)?.label || doc.doc_type}
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium",
                  doc.is_published 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-gray-500/20 text-gray-400"
                )}>
                  {doc.is_published ? "Publicado" : "Borrador"}
                </span>
              </div>

              {doc.content && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {doc.content.substring(0, 100)}...
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {new Date(doc.updated_at).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setViewingDoc(doc)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Ver"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => togglePublish.mutate({ id: doc.id, is_published: !doc.is_published })}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                    title={doc.is_published ? "Despublicar" : "Publicar"}
                  >
                    {doc.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  </button>
                  <button 
                    onClick={() => setEditingDoc(doc)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm("¿Eliminar este documento?")) {
                        deleteMutation.mutate(doc.id);
                      }
                    }}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredDocs?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No hay documentos</p>
              <p className="text-sm">Crea tu primer documento</p>
            </div>
          )}
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={!!viewingDoc} onOpenChange={(open) => !open && setViewingDoc(null)}>
        <DialogContent className="bg-card border-border max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-orbitron">{viewingDoc?.title}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
              {viewingDoc?.content || "Sin contenido"}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingDoc} onOpenChange={(open) => !open && setEditingDoc(null)}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-orbitron">Editar Documento</DialogTitle>
          </DialogHeader>
          {editingDoc && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título *</Label>
                  <Input name="title" required defaultValue={editingDoc.title} />
                </div>
                <div className="space-y-2">
                  <Label>Versión</Label>
                  <Input name="version" defaultValue={editingDoc.version} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select name="doc_type" defaultValue={editingDoc.doc_type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {docTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Capa</Label>
                  <Select name="layer" defaultValue={editingDoc.layer || undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ninguna" />
                    </SelectTrigger>
                    <SelectContent>
                      {layers.map((layer) => (
                        <SelectItem key={layer} value={layer}>{layerLabels[layer]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Contenido (Markdown)</Label>
                <Textarea 
                  name="content" 
                  defaultValue={editingDoc.content || ""}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch name="is_published" id="edit_is_published" defaultChecked={editingDoc.is_published} />
                <Label htmlFor="edit_is_published">Publicado</Label>
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
