import type { Building } from "@/data/buildings";

export interface LaidOutBuilding extends Building {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
}

export interface SiteRect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

// real warehouses are long sheds, roughly 2.4 : 1 on plan
const ASPECT = 2.4;
// one scene unit is roughly 36 m; eaves are drawn a little tall so the elevations read
const EAVE = 0.58;
// clear space between neighbours: side road + office annex, and truck court + rear road
const GAP_X = 1.7;
const GAP_Z = 2.1;

export function layoutBuildings(buildings: Building[]): LaidOutBuilding[] {
  const cols = Math.max(1, Math.ceil(Math.sqrt(buildings.length)));
  const rows = Math.ceil(buildings.length / cols);

  const sized = buildings.map((b) => {
    const area = Math.max(b.builtUpSqft, 18000);
    const width = Math.min(Math.max(Math.sqrt(area) / 120, 2.4), 7.5);
    const tall = /multi story/i.test(b.name);
    const height = b.status === "upcoming" ? 0.12 : tall ? EAVE * 2.2 : EAVE;
    return { b, width, depth: width / ASPECT, height };
  });

  const pitchX = Math.max(...sized.map((s) => s.width)) + GAP_X;
  const pitchZ = Math.max(...sized.map((s) => s.depth)) + GAP_Z;

  return sized.map(({ b, width, depth, height }, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // a short last row is centred instead of leaving an empty plot
    const inRow = row === rows - 1 ? sized.length - row * cols : cols;
    const x = (col - (inRow - 1) / 2) * pitchX;
    const z = (row - (rows - 1) / 2) * pitchZ;
    return { ...b, x, z, width, depth, height };
  });
}

// compound boundary: tight at the rear, room for the truck court at the front (+z)
export function siteRect(laid: LaidOutBuilding[]): SiteRect {
  if (laid.length === 0) return { minX: -4, maxX: 4, minZ: -4, maxZ: 4 };
  return {
    minX: Math.min(...laid.map((b) => b.x - b.width / 2)) - 1.2,
    maxX: Math.max(...laid.map((b) => b.x + b.width / 2)) + 1.6,
    minZ: Math.min(...laid.map((b) => b.z - b.depth / 2)) - 1.1,
    maxZ: Math.max(...laid.map((b) => b.z + b.depth / 2)) + 1.9,
  };
}
