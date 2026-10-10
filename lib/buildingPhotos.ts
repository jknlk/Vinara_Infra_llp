import { defaultBuildingPhotos } from "@/data/content/buildingPhotos";
import { listBuildingPhotos } from "@/lib/db";

export type BuildingPhoto = { src: string; caption: string };

export const photoKey = (projectSlug: string, buildingId: string) => `${projectSlug}/${buildingId}`;

// Photo for every building, keyed by photoKey; falls back to the bundled stand-ins if the database is unavailable.
export async function loadBuildingPhotos(): Promise<Record<string, BuildingPhoto>> {
  const out: Record<string, BuildingPhoto> = {};
  for (const p of defaultBuildingPhotos()) out[photoKey(p.projectSlug, p.buildingId)] = { src: p.src, caption: "" };
  try {
    for (const r of await listBuildingPhotos()) out[photoKey(r.projectSlug, r.buildingId)] = { src: r.src, caption: r.caption };
  } catch {
    // keep the stand-ins
  }
  return out;
}
