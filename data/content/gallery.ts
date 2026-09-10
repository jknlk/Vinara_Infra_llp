export type GalleryCategory = "All" | "NELA 1" | "NELA 2" | "Bikaner House" | "RMC Plant" | "Quality" | "Safety";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "NELA 1",
  "NELA 2",
  "Bikaner House",
  "RMC Plant",
  "Quality",
  "Safety",
];

export const GALLERY_ITEMS: { imageKey: string; categories: GalleryCategory[] }[] = [
  { imageKey: "gallery1", categories: ["NELA 1"] },
  { imageKey: "gallery2", categories: ["NELA 1"] },
  { imageKey: "gallery3", categories: ["NELA 2"] },
  { imageKey: "gallery4", categories: ["RMC Plant"] },
  { imageKey: "gallery5", categories: ["Quality"] },
  { imageKey: "gallery6", categories: ["Safety"] },
  { imageKey: "gallery7", categories: ["NELA 1"] },
  { imageKey: "gallery8", categories: ["Bikaner House"] },
  { imageKey: "gallery9", categories: ["RMC Plant"] },
  { imageKey: "gallery10", categories: ["NELA 2"] },
  { imageKey: "gallery11", categories: ["Safety"] },
  { imageKey: "gallery12", categories: ["NELA 1"] },
];
