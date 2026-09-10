import type { Building } from "@/data/buildings";

export interface LaidOutBuilding extends Building {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
}

const CELL = 5.5;

export function layoutBuildings(buildings: Building[]): LaidOutBuilding[] {
  const cols = Math.max(1, Math.ceil(Math.sqrt(buildings.length)));
  const rows = Math.ceil(buildings.length / cols);

  return buildings.map((b, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const area = Math.max(b.builtUpSqft, 18000);
    const footprint = Math.min(Math.max(Math.sqrt(area) / 165, 1.2), CELL * 0.82);
    const tall = /multi story/i.test(b.name);
    let height = 0.35;
    if (b.status === "completed") height = tall ? 1.9 : 0.85;
    else if (b.status === "wip") height = tall ? 1.6 : 0.65;
    else height = 0.12;

    const x = (col - (cols - 1) / 2) * CELL;
    const z = (row - (rows - 1) / 2) * CELL;
    return { ...b, x, z, width: footprint, depth: footprint * 0.8, height };
  });
}

export function boundaryPoints(laid: LaidOutBuilding[]): [number, number, number][] {
  if (laid.length === 0) return [];
  const pad = 3;
  const minX = Math.min(...laid.map((b) => b.x - b.width / 2)) - pad;
  const maxX = Math.max(...laid.map((b) => b.x + b.width / 2)) + pad;
  const minZ = Math.min(...laid.map((b) => b.z - b.depth / 2)) - pad;
  const maxZ = Math.max(...laid.map((b) => b.z + b.depth / 2)) + pad;
  return [
    [minX, 0.02, minZ],
    [maxX, 0.02, minZ],
    [maxX, 0.02, maxZ],
    [minX, 0.02, maxZ],
    [minX, 0.02, minZ],
  ];
}
