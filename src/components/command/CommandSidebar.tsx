/**
 * 🎛️ COMMAND SIDEBAR - Navegación por capas TAMV
 */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  GitBranch, 
  Puzzle, 
  CheckSquare, 
  Rocket, 
  Settings, 
  FileText,
  Fingerprint,
  MessageSquare,
  Database,
  Brain,
  Coins,
  Scale,
  BookOpen,
  LogOut,
  Shield
} from "lucide-react";
import { CommandView, TamvLayer } from "@/pages/CommandCenter";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface CommandSidebarProps {
  currentView: CommandView;
  onNavigate: (view: CommandView) => void;
  selectedLayer: TamvLayer | null;
  onSelectLayer: (layer: TamvLayer | null) => void;
}

const mainNavItems = [
  { id: "dashboard" as CommandView, label: "Dashboard", icon: LayoutDashboard },
  { id: "repositories" as CommandView, label: "Repositorios", icon: GitBranch },
  { id: "modules" as CommandView, label: "Módulos", icon: Puzzle },
  { id: "tasks" as CommandView, label: "Tareas", icon: CheckSquare },
  { id: "deployments" as CommandView, label: "Despliegues", icon: Rocket },
  { id: "config" as CommandView, label: "Configuración", icon: Settings },
  { id: "docs" as CommandView, label: "Documentación", icon: FileText },
];

const layerItems: { id: TamvLayer; label: string; icon: typeof Fingerprint; color: string }[] = [
  { id: "identity", label: "Identidad", icon: Fingerprint, color: "text-blue-400" },
  { id: "communication", label: "Comunicación", icon: MessageSquare, color: "text-green-400" },
  { id: "information", label: "Información", icon: Database, color: "text-cyan-400" },
  { id: "intelligence", label: "Inteligencia", icon: Brain, color: "text-purple-400" },
  { id: "economy", label: "Economía", icon: Coins, color: "text-amber-400" },
  { id: "governance", label: "Gobernanza", icon: Scale, color: "text-rose-400" },
  { id: "documentation", label: "Documentación", icon: BookOpen, color: "text-teal-400" },
];

export const CommandSidebar = ({ 
  currentView, 
  onNavigate, 
  selectedLayer, 
  onSelectLayer 
}: CommandSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <Sidebar className="border-r border-border/50 bg-card/30 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-foreground text-sm">TAMV</h2>
            <p className="text-[10px] text-muted-foreground">Command Center v1.0</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Navegación Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground font-mono uppercase tracking-wider px-2">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      onNavigate(item.id);
                      if (item.id === "dashboard") onSelectLayer(null);
                    }}
                    className={cn(
                      "w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all",
                      currentView === item.id
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Capas TAMV */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs text-muted-foreground font-mono uppercase tracking-wider px-2">
            Arquitectura (7 Capas)
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {layerItems.map((layer) => (
                <SidebarMenuItem key={layer.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      onSelectLayer(layer.id);
                      onNavigate("modules");
                    }}
                    className={cn(
                      "w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all",
                      selectedLayer === layer.id
                        ? "bg-muted/80 border border-border"
                        : "hover:bg-muted/30"
                    )}
                  >
                    <layer.icon className={cn("w-4 h-4", layer.color)} />
                    <span className="text-sm text-muted-foreground">{layer.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/30">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};
