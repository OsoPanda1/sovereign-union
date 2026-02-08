/**
 * 🌌 AETHER SCENE - TAMV Æther Engine v1.0
 * Complete 3D scene with environment, particles, and effects
 */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import type { ThemeDescriptor } from "../types";

interface Props {
  theme: ThemeDescriptor;
  showParticles?: boolean;
  particleCount?: number;
}

// Floating energy orbs
const EnergyOrb = ({ color, position, size = 0.5, speed = 1 }: {
  color: string; position: [number, number, number]; size?: number; speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
};

// Particle field
const ParticleField = ({ count, color }: { count: number; color: string }) => {
  const ref = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      sz[i] = Math.random() * 3 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Ground plane with grid
const SovereignGround = ({ color }: { color: string }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
    <planeGeometry args={[100, 100, 50, 50]} />
    <meshStandardMaterial
      color={color}
      wireframe
      transparent
      opacity={0.15}
      emissive={color}
      emissiveIntensity={0.2}
    />
  </mesh>
);

export const AetherScene = ({ theme, showParticles = true, particleCount = 500 }: Props) => {
  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.15} color={theme.ambientColor} />
      <directionalLight position={[10, 15, 5]} intensity={0.4} color="#ffeedd" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color={theme.particleColor} distance={20} />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#2dd4bf" distance={15} />

      {/* Stars / Deep Space */}
      <Stars radius={50} depth={60} count={2000} factor={3} saturation={0.2} fade speed={0.5} />

      {/* Fog */}
      <fog attach="fog" color={theme.fogColor} near={8} far={40} />

      {/* Energy Orbs */}
      <EnergyOrb color={theme.particleColor} position={[-4, 2, -3]} size={0.4} speed={0.8} />
      <EnergyOrb color="#2dd4bf" position={[5, 1, -4]} size={0.3} speed={1.2} />
      <EnergyOrb color="#d4af37" position={[0, 3, -6]} size={0.5} speed={0.6} />
      <EnergyOrb color="#ff006e" position={[-3, 0, 4]} size={0.25} speed={1.5} />

      {/* Particle Field */}
      {showParticles && <ParticleField count={particleCount} color={theme.particleColor} />}

      {/* Ground */}
      <SovereignGround color={theme.groundColor} />
    </>
  );
};

export default AetherScene;
