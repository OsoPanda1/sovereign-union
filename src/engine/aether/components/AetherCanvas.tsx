/**
 * ⚡ AETHER CANVAS - TAMV Æther Engine v1.0
 * Main canvas wrapper for the 3D engine with performance monitoring
 */
import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import AetherScene from "./AetherScene";
import Polytope4DVisualizer from "./Polytope4DVisualizer";
import { getTheme } from "../themes";
import type { ThemeId, PolytopeType } from "../types";

interface AetherCanvasProps {
  themeId?: ThemeId;
  polytopes?: Array<{
    type: PolytopeType;
    position?: [number, number, number];
    color?: string;
    scale?: number;
  }>;
  showControls?: boolean;
  className?: string;
  onPerformanceChange?: (factor: number) => void;
}

const Loader3D = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#d4af37" wireframe />
  </mesh>
);

export const AetherCanvas = ({
  themeId = "obsidiana-imperial",
  polytopes = [{ type: "tesseract", position: [0, 0, 0], scale: 1.5 }],
  showControls = true,
  className = "",
  onPerformanceChange,
}: AetherCanvasProps) => {
  const theme = getTheme(themeId);
  const [dpr, setDpr] = useState(1.5);

  const handleIncline = useCallback(() => {
    setDpr(Math.min(2, dpr + 0.25));
    onPerformanceChange?.(1);
  }, [dpr, onPerformanceChange]);

  const handleDecline = useCallback(() => {
    setDpr(Math.max(0.75, dpr - 0.25));
    onPerformanceChange?.(-1);
  }, [dpr, onPerformanceChange]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 2, 8], fov: 60, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        shadows
      >
        <Suspense fallback={<Loader3D />}>
          <PerformanceMonitor onIncline={handleIncline} onDecline={handleDecline}>
            <AdaptiveDpr pixelated />

            {/* Scene environment */}
            <AetherScene theme={theme} />

            {/* 4D Polytopes */}
            {polytopes.map((p, i) => (
              <Polytope4DVisualizer
                key={`${p.type}-${i}`}
                type={p.type}
                position={p.position}
                color={p.color ?? theme.particleColor}
                emissiveColor={p.color ?? theme.particleColor}
                scale={p.scale ?? 1.5}
                rotationSpeed={0.25 + i * 0.1}
              />
            ))}

            {/* Camera Controls */}
            {showControls && (
              <OrbitControls
                enablePan
                enableZoom
                enableRotate
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI * 0.85}
                minDistance={3}
                maxDistance={25}
                dampingFactor={0.05}
                enableDamping
              />
            )}
          </PerformanceMonitor>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AetherCanvas;
