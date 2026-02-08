/**
 * 🔮 4D POLYTOPE GENERATOR - TAMV Æther Engine
 * Generates vertices and edges for 4D regular polytopes
 * and projects them into 3D space
 */
import type { HyperVertex4D, HyperMesh4D, ProjectionParams, PolytopeType } from "./types";

// ═══ Polytope Generators ═══

function generateTesseract(): HyperMesh4D {
  const vertices: HyperVertex4D[] = [];
  for (let i = 0; i < 16; i++) {
    vertices.push({
      x: (i & 1 ? 1 : -1),
      y: (i & 2 ? 1 : -1),
      z: (i & 4 ? 1 : -1),
      w: (i & 8 ? 1 : -1),
    });
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = i ^ j;
      if (diff && (diff & (diff - 1)) === 0) {
        edges.push([i, j]);
      }
    }
  }
  return { vertices, edges, name: "Tesseract (8-cell)", symmetryGroup: "B4" };
}

function generatePentachoron(): HyperMesh4D {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices: HyperVertex4D[] = [
    { x: 1, y: 1, z: 1, w: -1 / Math.sqrt(5) },
    { x: 1, y: -1, z: -1, w: -1 / Math.sqrt(5) },
    { x: -1, y: 1, z: -1, w: -1 / Math.sqrt(5) },
    { x: -1, y: -1, z: 1, w: -1 / Math.sqrt(5) },
    { x: 0, y: 0, z: 0, w: 4 / Math.sqrt(5) },
  ];
  const edges: [number, number][] = [];
  for (let i = 0; i < 5; i++)
    for (let j = i + 1; j < 5; j++)
      edges.push([i, j]);
  return { vertices, edges, name: "Pentachoron (5-cell)", symmetryGroup: "A4" };
}

function generateHexadecachoron(): HyperMesh4D {
  const vertices: HyperVertex4D[] = [
    { x: 1, y: 0, z: 0, w: 0 }, { x: -1, y: 0, z: 0, w: 0 },
    { x: 0, y: 1, z: 0, w: 0 }, { x: 0, y: -1, z: 0, w: 0 },
    { x: 0, y: 0, z: 1, w: 0 }, { x: 0, y: 0, z: -1, w: 0 },
    { x: 0, y: 0, z: 0, w: 1 }, { x: 0, y: 0, z: 0, w: -1 },
  ];
  const edges: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if (Math.floor(i / 2) !== Math.floor(j / 2)) {
        edges.push([i, j]);
      }
    }
  }
  return { vertices, edges, name: "Hexadecachoron (16-cell)", symmetryGroup: "B4" };
}

function generateIcositetrachoron(): HyperMesh4D {
  const vertices: HyperVertex4D[] = [];
  // Permutations of (±1, ±1, 0, 0)
  const coords = [1, -1];
  for (let a = 0; a < 2; a++)
    for (let b = 0; b < 2; b++) {
      vertices.push({ x: coords[a], y: coords[b], z: 0, w: 0 });
      vertices.push({ x: coords[a], y: 0, z: coords[b], w: 0 });
      vertices.push({ x: coords[a], y: 0, z: 0, w: coords[b] });
      vertices.push({ x: 0, y: coords[a], z: coords[b], w: 0 });
      vertices.push({ x: 0, y: coords[a], z: 0, w: coords[b] });
      vertices.push({ x: 0, y: 0, z: coords[a], w: coords[b] });
    }
  const targetDist = Math.sqrt(2);
  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const d = Math.sqrt(
        (vertices[i].x - vertices[j].x) ** 2 +
        (vertices[i].y - vertices[j].y) ** 2 +
        (vertices[i].z - vertices[j].z) ** 2 +
        (vertices[i].w - vertices[j].w) ** 2
      );
      if (Math.abs(d - targetDist) < 0.01) edges.push([i, j]);
    }
  }
  return { vertices, edges, name: "Icositetrachoron (24-cell)", symmetryGroup: "F4" };
}

export function generatePolytope(type: PolytopeType): HyperMesh4D {
  switch (type) {
    case "tesseract": return generateTesseract();
    case "pentachoron": return generatePentachoron();
    case "hexadecachoron": return generateHexadecachoron();
    case "icositetrachoron": return generateIcositetrachoron();
    case "hecatonicosachoron": return generateTesseract(); // Simplified fallback
    case "hexacosichoron": return generateHexadecachoron(); // Simplified fallback
    default: return generateTesseract();
  }
}

// ═══ 4D Rotation ═══
export function rotate4D(
  vertex: HyperVertex4D,
  angleXW: number,
  angleYW: number,
  angleZW: number,
  angleXY: number = 0,
  angleXZ: number = 0,
  angleYZ: number = 0
): HyperVertex4D {
  let { x, y, z, w } = vertex;

  // XW rotation
  let cos = Math.cos(angleXW), sin = Math.sin(angleXW);
  [x, w] = [x * cos - w * sin, x * sin + w * cos];

  // YW rotation
  cos = Math.cos(angleYW); sin = Math.sin(angleYW);
  [y, w] = [y * cos - w * sin, y * sin + w * cos];

  // ZW rotation
  cos = Math.cos(angleZW); sin = Math.sin(angleZW);
  [z, w] = [z * cos - w * sin, z * sin + w * cos];

  // XY rotation
  cos = Math.cos(angleXY); sin = Math.sin(angleXY);
  [x, y] = [x * cos - y * sin, x * sin + y * cos];

  // XZ rotation
  cos = Math.cos(angleXZ); sin = Math.sin(angleXZ);
  [x, z] = [x * cos - z * sin, x * sin + z * cos];

  // YZ rotation
  cos = Math.cos(angleYZ); sin = Math.sin(angleYZ);
  [y, z] = [y * cos - z * sin, y * sin + z * cos];

  return { x, y, z, w };
}

// ═══ Projection 4D → 3D ═══
export function projectTo3D(
  vertex: HyperVertex4D,
  params: ProjectionParams
): [number, number, number] {
  const { mode, distance } = params;

  switch (mode) {
    case "perspective": {
      const scale = distance / (distance - vertex.w);
      return [vertex.x * scale, vertex.y * scale, vertex.z * scale];
    }
    case "orthographic":
      return [vertex.x, vertex.y, vertex.z];
    case "stereographic": {
      const denom = distance - vertex.w;
      if (Math.abs(denom) < 0.001) return [vertex.x * 100, vertex.y * 100, vertex.z * 100];
      return [
        (vertex.x * distance) / denom,
        (vertex.y * distance) / denom,
        (vertex.z * distance) / denom,
      ];
    }
    default:
      return [vertex.x, vertex.y, vertex.z];
  }
}
