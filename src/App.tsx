 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { lazy, Suspense } from "react";
 
 // Pages
 import LandingOmni from "./pages/LandingOmni";
 import Index from "./pages/Index";
 import Auth from "./pages/Auth";
 
 // Lazy loaded pages for performance
 const CommandCenter = lazy(() => import("./pages/CommandCenter"));
 const Marketplace = lazy(() => import("./pages/Marketplace"));
 const University = lazy(() => import("./pages/University"));
 const DreamSpaces = lazy(() => import("./pages/DreamSpaces"));
 const Lottery = lazy(() => import("./pages/Lottery"));
 const WalletPage = lazy(() => import("./pages/Wallet"));
 const Profile = lazy(() => import("./pages/Profile"));
 const IsabellaChat = lazy(() => import("./pages/IsabellaChat"));
 const Settings = lazy(() => import("./pages/Settings"));
 const Search = lazy(() => import("./pages/Search"));
 const Messages = lazy(() => import("./pages/Messages"));
 const Encyclopedia = lazy(() => import("./pages/Encyclopedia"));
 const NotFound = lazy(() => import("./pages/NotFound"));
 
 const queryClient = new QueryClient();
 
 // Loading fallback
 const PageLoader = () => (
   <div className="min-h-screen bg-background flex items-center justify-center">
     <div className="text-center">
       <div className="w-12 h-12 rounded-xl gold-metallic mx-auto mb-4 animate-pulse" />
       <p className="text-sm text-muted-foreground font-orbitron">Cargando...</p>
     </div>
   </div>
 );
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <TooltipProvider>
       <Toaster />
       <Sonner />
       <BrowserRouter>
         <Suspense fallback={<PageLoader />}>
           <Routes>
             {/* Main */}
             <Route path="/" element={<LandingOmni />} />
             <Route path="/nexus" element={<Index />} />
             <Route path="/auth" element={<Auth />} />
             
             {/* Core Features */}
             <Route path="/marketplace" element={<Marketplace />} />
             <Route path="/university" element={<University />} />
             <Route path="/dreamspaces" element={<DreamSpaces />} />
             <Route path="/lottery" element={<Lottery />} />
             <Route path="/wallet" element={<WalletPage />} />
             
             {/* User */}
             <Route path="/profile" element={<Profile />} />
             <Route path="/settings" element={<Settings />} />
             <Route path="/search" element={<Search />} />
             <Route path="/messages" element={<Messages />} />
             
             {/* AI & Special */}
             <Route path="/isabella" element={<IsabellaChat />} />
             <Route path="/encyclopedia" element={<Encyclopedia />} />
             
             {/* Admin */}
             <Route path="/command" element={<CommandCenter />} />
             
             {/* 404 */}
             <Route path="*" element={<NotFound />} />
           </Routes>
         </Suspense>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
