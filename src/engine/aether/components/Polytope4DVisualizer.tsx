/**
 * 🔮 POLYTOPE 4D VISUALIZER - TAMV Æther Engine
 * Real-time 4D polytope rendering with rotation and projection
 */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generatePolytope, rotate4D, projectTo3D } from "../polytopes";
import type { PolytopeType, ProjectionParams } from "../types";

interface Props {
  type: PolytopeType;
  projection?: ProjectionParams;
  color?: string;
  emissiveColor?: string;
  rotationSpeed?: number;
  scale?: number;
  position?: [number, number, number];
}

export const Polytope4DVisualizer = ({
  type,
  projection = { mode: "perspective", distance: 3, fov4D: 90 },
  color = "#d4af37",
  emissiveColor = "#d4af37",
  rotationSpeed = 0.3,
  scale = 1,
  position = [0, 0, 0],
}: Props) => {
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);
  const mesh4D = useMemo(() => generatePolytope(type), [type]);

  // Vertex spheres refs
  const vertexPositions = useRef<THREE.Vector3[]>([]);
  const edgeGeometries = useRef<THREE.BufferGeometry[]>([]);

  useFrame((_, delta) => {
    timeRef.current += delta * rotationSpeed;
    const t = timeRef.current;

    // Compute rotated + projected vertices
    const projected = mesh4D.vertices.map((v) => {
      const rotated = rotate4D(v, t * 0.7, t * 0.5, t * 0.3, t * 0.2, t * 0.15, t * 0.1);
      return projectTo3D(rotated, projection);
    });

    // Update vertex positions
    const group = groupRef.current;
    if (!group) return;

    const children = group.children;
    const numVerts = mesh4D.vertices.length;

    // Update vertex spheres
    for (let i = 0; i < numVerts && i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      if (child && projected[i]) {
        child.position.set(
          projected[i][0] * scale,
          projected[i][1] * scale,
          projected[i][2] * scale
        );
      }
    }

    // Update edges (lines)
    for (let e = 0; e < mesh4D.edges.length; e++) {
      const lineIdx = numVerts + e;
      if (lineIdx >= children.length) break;
      const line = children[lineIdx] as THREE.Line;
      if (!line || !line.geometry) continue;

      const [a, b] = mesh4D.edges[e];
      const pa = projected[a];
      const pb = projected[b];
      if (!pa || !pb) continue;

      const positions = line.geometry.attributes.position as THREE.BufferAttribute;
      if (positions) {
        positions.setXYZ(0, pa[0] * scale, pa[1] * scale, pa[2] * scale);
        positions.setXYZ(1, pb[0] * scale, pb[1] * scale, pb[2] * scale);
        positions.needsUpdate = true;
      }
    }
  });

  const vertexMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: 2,
      metalness: 0.9,
      roughness: 0.1,
    }),
    [color, emissiveColor]
  );

  const edgeMaterial = useMemo(
    () => new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    }),
    [color]
  );

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.06, 12, 12), []);

  return (
    <group ref={groupRef} position={position}>
      {/* Vertices */}
      {mesh4D.vertices.map((_, i) => (
        <mesh key={`v-${i}`} geometry={sphereGeo} material={vertexMaterial} />
      ))}

      {/* Edges */}
      {mesh4D.edges.map((_, i) => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(6);
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        return <primitive key={`e-${i}`} object={new THREE.Line(geo, edgeMaterial)} />;
      })}
    </group>
  );
};

export default Polytope4DVisualizer;
