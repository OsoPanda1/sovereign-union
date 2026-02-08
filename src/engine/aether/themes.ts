/**
 * 🎨 THEME SYSTEM - TAMV Æther Engine v1.0
 * Hyperreal visual themes for immersive environments
 */
import type { ThemeDescriptor, ThemeId } from "./types";

export const AETHER_THEMES: Record<ThemeId, ThemeDescriptor> = {
  "obsidiana-imperial": {
    id: "obsidiana-imperial",
    name: "Obsidiana Imperial",
    ambientColor: "#1a1520",
    fogColor: "#0a0810",
    fogDensity: 0.015,
    bloomIntensity: 1.5,
    bloomThreshold: 0.6,
    particleColor: "#d4af37",
    groundColor: "#0d0d12",
    skyColors: ["#020208", "#0a0815", "#050510"],
    emissiveIntensity: 0.8,
  },
  "neo-tokio": {
    id: "neo-tokio",
    name: "Neo-Tokio Húmedo",
    ambientColor: "#1a0828",
    fogColor: "#0d0418",
    fogDensity: 0.025,
    bloomIntensity: 2.0,
    bloomThreshold: 0.5,
    particleColor: "#ff006e",
    groundColor: "#0a0612",
    skyColors: ["#0d0020", "#1a0035", "#05000f"],
    emissiveIntensity: 1.2,
  },
  "santuario-ancestral": {
    id: "santuario-ancestral",
    name: "Santuario Ancestral",
    ambientColor: "#2a1a0a",
    fogColor: "#1a1005",
    fogDensity: 0.02,
    bloomIntensity: 1.2,
    bloomThreshold: 0.7,
    particleColor: "#ff8c00",
    groundColor: "#1a1008",
    skyColors: ["#0a0500", "#1a0f05", "#050200"],
    emissiveIntensity: 0.6,
  },
  "ciudad-solar": {
    id: "ciudad-solar",
    name: "Ciudad Solar",
    ambientColor: "#f0e6d0",
    fogColor: "#e8dcc0",
    fogDensity: 0.008,
    bloomIntensity: 1.0,
    bloomThreshold: 0.8,
    particleColor: "#ffd700",
    groundColor: "#d4c5a0",
    skyColors: ["#87ceeb", "#ffd700", "#ff8c00"],
    emissiveIntensity: 0.4,
  },
  "espacio-politopo": {
    id: "espacio-politopo",
    name: "Espacio Polítopo",
    ambientColor: "#050510",
    fogColor: "#020208",
    fogDensity: 0.005,
    bloomIntensity: 2.5,
    bloomThreshold: 0.3,
    particleColor: "#2dd4bf",
    groundColor: "#020205",
    skyColors: ["#000005", "#050515", "#000008"],
    emissiveIntensity: 1.5,
  },
  "turquesa-viva": {
    id: "turquesa-viva",
    name: "Turquesa Viva – Isabella",
    ambientColor: "#0a1a1a",
    fogColor: "#051515",
    fogDensity: 0.012,
    bloomIntensity: 1.8,
    bloomThreshold: 0.5,
    particleColor: "#2dd4bf",
    groundColor: "#081212",
    skyColors: ["#001a1a", "#002a2a", "#000f0f"],
    emissiveIntensity: 1.0,
  },
};

export function getTheme(id: ThemeId): ThemeDescriptor {
  return AETHER_THEMES[id] ?? AETHER_THEMES["obsidiana-imperial"];
}
