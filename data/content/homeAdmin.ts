import { PROJECTS_SHOWCASE } from "@/data/content/projectsShowcase";
import { TEAM } from "@/data/content/leadership";
import { GALLERY_ITEMS } from "@/data/content/gallery";
import { IMAGES } from "@/data/images";

export type HomeKind = "hero_stat" | "featured" | "leader" | "work";

export type HomeField = { key: string; label: string; type?: "text" | "textarea" | "number" | "select"; options?: string[] };

// Editable fields per home-page block. `image` is handled separately (upload or URL).
export const HOME_KINDS: Record<HomeKind, { title: string; hasImage: boolean; preview: string; fields: HomeField[]; primary: string }> = {
  hero_stat: {
    title: "Hero stats",
    hasImage: false,
    preview: "/",
    primary: "label",
    fields: [
      { key: "value", label: "Value (e.g. 213.06 acres)" },
      { key: "label", label: "Label" },
    ],
  },
  featured: {
    title: "Featured projects",
    hasImage: true,
    preview: "/",
    primary: "name",
    fields: [
      { key: "name", label: "Name" },
      { key: "location", label: "Location" },
      { key: "client", label: "Client" },
      { key: "area", label: "Area (e.g. 4,21,888 sq.ft)" },
      { key: "status", label: "Status", type: "select", options: ["completed", "wip"] },
      { key: "progress", label: "Progress %", type: "number" },
      { key: "href", label: "Link" },
    ],
  },
  leader: {
    title: "Leadership",
    hasImage: true,
    preview: "/",
    primary: "name",
    fields: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "bio", label: "Bio", type: "textarea" },
    ],
  },
  work: {
    title: "Our work",
    hasImage: true,
    preview: "/",
    primary: "title",
    fields: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category (project)" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
};

export type HomeData = Record<string, string>;

export const HERO_STATS_SEED: HomeData[] = [
  { value: "213.06 acres", label: "Under Development" },
  { value: "31,33,500.23", label: "Sq.ft Built-Up" },
  { value: "12", label: "Buildings, Three Parks" },
  { value: "37+ yrs", label: "Engineering Legacy" },
];

export function homeSeed(): Record<HomeKind, HomeData[]> {
  return {
    hero_stat: HERO_STATS_SEED,
    featured: PROJECTS_SHOWCASE.map((p) => ({
      name: p.name, location: p.location, client: p.client, area: p.area, status: p.status,
      progress: String(p.progress), href: p.href, image: IMAGES[p.imageKey]?.src ?? "",
    })),
    leader: TEAM.map((p) => ({ name: p.name, role: p.role, bio: p.bio, image: p.photo })),
    work: GALLERY_ITEMS.map((g) => ({
      title: g.title, category: g.categories[0], description: g.description, image: IMAGES[g.imageKey]?.src ?? "",
    })),
  };
}
