/**
 * 🏛️ TAMV COMMAND CENTER - Panel Central de Control
 * Orquestación del ecosistema TAMV y sus 7 capas arquitectónicas
 */
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CommandSidebar } from "@/components/command/CommandSidebar";
import { CommandDashboard } from "@/components/command/CommandDashboard";
import { RepositoriesPanel } from "@/components/command/RepositoriesPanel";
import { ModulesPanel } from "@/components/command/ModulesPanel";
import { TasksPanel } from "@/components/command/TasksPanel";
import { DeploymentsPanel } from "@/components/command/DeploymentsPanel";
import { ConfigPanel } from "@/components/command/ConfigPanel";
import { DocsPanel } from "@/components/command/DocsPanel";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export type CommandView = 
  | "dashboard" 
  | "repositories" 
  | "modules" 
  | "tasks" 
  | "deployments" 
  | "config" 
  | "docs";

export type TamvLayer = 
  | "identity" 
  | "communication" 
  | "information" 
  | "intelligence" 
  | "economy" 
  | "governance" 
  | "documentation";

const CommandCenter = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<CommandView>("dashboard");
  const [selectedLayer, setSelectedLayer] = useState<TamvLayer | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-orbitron">Cargando Command Center...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <CommandDashboard onNavigate={setCurrentView} onSelectLayer={setSelectedLayer} />;
      case "repositories":
        return <RepositoriesPanel selectedLayer={selectedLayer} />;
      case "modules":
        return <ModulesPanel selectedLayer={selectedLayer} />;
      case "tasks":
        return <TasksPanel />;
      case "deployments":
        return <DeploymentsPanel />;
      case "config":
        return <ConfigPanel />;
      case "docs":
        return <DocsPanel />;
      default:
        return <CommandDashboard onNavigate={setCurrentView} onSelectLayer={setSelectedLayer} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CommandSidebar 
          currentView={currentView} 
          onNavigate={setCurrentView}
          selectedLayer={selectedLayer}
          onSelectLayer={setSelectedLayer}
        />
        
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-6 w-px bg-border" />
              <h1 className="font-orbitron text-lg font-bold text-foreground">
                TAMV Command Center
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-400 font-mono">SISTEMA ACTIVO</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {user.email}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {renderView()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CommandCenter;
