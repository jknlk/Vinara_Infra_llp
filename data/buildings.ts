export type BuildingStatus = "completed" | "wip" | "upcoming";

export interface Building {
  id: string;
  name: string;
  builtUpSqft: number;
  status: BuildingStatus;
  statusLabel: string;
}

export interface ProjectSite {
  slug: "nela-1" | "nela-2" | "bikaner-house";
  shortName: string;
  name: string;
  client: string;
  plotAcres: number;
  builtUpSqft: number;
  buildingsCount: number;
  groundCoverage: number;
  completed: number;
  wip: number;
  upcoming: number;
  description: string;
  buildings: Building[];
}

export const STATUS_COLOR: Record<BuildingStatus, string> = {
  completed: "var(--color-green-500)",
  wip: "var(--color-sky-400)",
  upcoming: "var(--color-orange-500)",
};

export const STATUS_LABEL: Record<BuildingStatus, string> = {
  completed: "Handed over",
  wip: "Work in progress",
  upcoming: "Yet to start",
};

export const PROJECTS: ProjectSite[] = [
  {
    slug: "nela-1",
    shortName: "NELA 1",
    name: "NELA 1",
    client: "Assetz Industrial Park Pvt Ltd",
    plotAcres: 113.01,
    builtUpSqft: 1215085.00,
    buildingsCount: 4,
    groundCoverage: 51.76,
    completed: 2,
    wip: 2,
    upcoming: 0,
    description:
      "A well-planned industrial & logistics park designed for efficient movement, optimum land utilization and seamless operations.",
    buildings: [
      { id: "B400", name: "B400", builtUpSqft: 359754.09, status: "wip", statusLabel: "Work in progress" },
      { id: "B500", name: "B500 — Amazon", builtUpSqft: 421888.63, status: "completed", statusLabel: "Handed over" },
      { id: "B900", name: "B900", builtUpSqft: 271608.55, status: "completed", statusLabel: "Handed over" },
      { id: "B1000", name: "B1000", builtUpSqft: 161833.73, status: "wip", statusLabel: "Work in progress" },
    ],
  },
  {
    slug: "nela-2",
    shortName: "NELA 2",
    name: "NELA 2",
    client: "Brit Logistics Pvt Ltd",
    plotAcres: 47.50,
    builtUpSqft: 1020842.69,
    buildingsCount: 5,
    groundCoverage: 47.34,
    completed: 3,
    wip: 2,
    upcoming: 0,
    description:
      "A well-planned industrial & logistics park designed for efficient movement, optimum land utilization and seamless operations.",
    buildings: [
      { id: "B100", name: "B100", builtUpSqft: 204233.98, status: "completed", statusLabel: "Completed (by another vendor)" },
      { id: "B200", name: "B200", builtUpSqft: 222472.50, status: "completed", statusLabel: "Completed — handed over" },
      { id: "B300", name: "B300", builtUpSqft: 238426.91, status: "completed", statusLabel: "Completed — handed over" },
      { id: "B400", name: "B400", builtUpSqft: 110031.76, status: "wip", statusLabel: "Work in progress" },
      { id: "B600", name: "B600", builtUpSqft: 245677.54, status: "wip", statusLabel: "Work in progress" },
    ],
  },
  {
    slug: "bikaner-house",
    shortName: "Bikaner House",
    name: "Bikaner House",
    client: "Industrial & Logistics Park",
    plotAcres: 52.55,
    builtUpSqft: 897572.54,
    buildingsCount: 3,
    groundCoverage: 42.57,
    completed: 1,
    wip: 2,
    upcoming: 0,
    description:
      "Access: 45m wide road to the south, 30m to the west, 18m to the north.",
    buildings: [
      { id: "A", name: "Block A", builtUpSqft: 300334.32, status: "completed", statusLabel: "Handed over — finishing works only" },
      { id: "B", name: "Block B", builtUpSqft: 293216.86, status: "wip", statusLabel: "WIP (full package)" },
      { id: "C", name: "Block C", builtUpSqft: 304021.36, status: "wip", statusLabel: "WIP (full package)" },
    ],
  },
];

export const PORTFOLIO_TOTALS = {
  plotAcres: 213.06,
  builtUpSqft: 3133500.23,
  buildings: 12,
  fsi: 0.54,
  groundCoverage: 47.34,
  completed: 6,
  wip: 6,
  upcoming: 0,
};

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
