import { IMAGES } from "@/data/images";
import { PROJECTS, type BuildingStatus } from "@/data/buildings";

// Stand-in photography until the real drone shots are uploaded from the admin panel.
const PLACEHOLDERS: Record<BuildingStatus, string[]> = {
  completed: ["showcaseWarehouseAerial2", "heroAerial", "aboutInterior"],
  wip: ["showcaseScaffold2", "showcaseCrane", "showcaseRebar", "showcaseSiteTeam"],
  upcoming: ["showcaseBuildingFacade"],
};

export type BuildingPhotoSeed = { projectSlug: string; buildingId: string; src: string };

// One photo per building on every site, in page order.
export function defaultBuildingPhotos(): BuildingPhotoSeed[] {
  const used: Record<BuildingStatus, number> = { completed: 0, wip: 0, upcoming: 0 };
  return PROJECTS.flatMap((p) =>
    p.buildings.map((b) => {
      const pool = PLACEHOLDERS[b.status];
      const key = pool[used[b.status]++ % pool.length];
      return { projectSlug: p.slug, buildingId: b.id, src: IMAGES[key]?.src ?? "" };
    })
  );
}
