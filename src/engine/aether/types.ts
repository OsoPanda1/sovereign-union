/**
 * ⚡ TAMV ÆTHER ENGINE v1.0 - Type Definitions
 * Core types for the 3D/4D hyperreal engine
 */

// ═══ 4D Geometry Types ═══
export interface HyperVertex4D {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface HyperMesh4D {
  vertices: HyperVertex4D[];
  edges: [number, number][];
  name: string;
  symmetryGroup?: string;
}

export type ProjectionMode = "perspective" | "orthographic" | "stereographic";

export interface ProjectionParams {
  mode: ProjectionMode;
  distance: number; // 4D viewpoint distance
  fov4D: number;    // field of view in 4D
}

// ═══ Scene & Entity Types ═══
export interface AetherSceneConfig {
  theme: ThemeId;
  enablePostProcessing: boolean;
  enableParticles: boolean;
  enablePolytopes: boolean;
  maxFPS: number;
  quality: "low" | "medium" | "high" | "ultra";
}

export type ThemeId =
  | "neo-tokio"
  | "santuario-ancestral"
  | "ciudad-solar"
  | "espacio-politopo"
  | "obsidiana-imperial"
  | "turquesa-viva";

export interface ThemeDescriptor {
  id: ThemeId;
  name: string;
  ambientColor: string;
  fogColor: string;
  fogDensity: number;
  bloomIntensity: number;
  bloomThreshold: number;
  particleColor: string;
  groundColor: string;
  skyColors: [string, string, string];
  emissiveIntensity: number;
}

// ═══ Effect System ═══
export interface EffectTrigger {
  event: string;
  effect: "particle_burst" | "light_shift" | "camera_shake" | "distortion" | "glow_pulse";
  params: Record<string, number | string>;
  duration: number;
}

// ═══ Integration Layer ═══
export interface AetherEngineAPI {
  loadScene: (config: AetherSceneConfig) => void;
  applyTheme: (themeId: ThemeId) => void;
  addPolytope: (type: PolytopeType, position: [number, number, number]) => void;
  triggerEffect: (effect: EffectTrigger) => void;
  setQuality: (quality: AetherSceneConfig["quality"]) => void;
}

export type PolytopeType =
  | "tesseract"      // Hipercubo / 8-cell
  | "pentachoron"    // 5-cell / Simplex 4D
  | "hexadecachoron" // 16-cell
  | "icositetrachoron" // 24-cell
  | "hecatonicosachoron" // 120-cell
  | "hexacosichoron";   // 600-cell

// ═══ Performance Metrics ═══
export interface PerformanceMetrics {
  fps: number;
  drawCalls: number;
  triangles: number;
  frameTime: number;
  gpuMemory: number;
}
