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
    builtUpSqft: 2648787.64,
    buildingsCount: 14,
    groundCoverage: 51.76,
    completed: 2,
    wip: 2,
    upcoming: 10,
    description:
      "A well-planned industrial & logistics park designed for efficient movement, optimum land utilization and seamless operations.",
    buildings: [
      { id: "B400", name: "B400", builtUpSqft: 359754.09, status: "wip", statusLabel: "Work in progress" },
      { id: "B500", name: "B500 — Amazon", builtUpSqft: 421888.63, status: "completed", statusLabel: "Handed over" },
      { id: "B600", name: "B600", builtUpSqft: 0, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B700", name: "B700", builtUpSqft: 303654.81, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B800", name: "B800", builtUpSqft: 299061.06, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B900", name: "B900", builtUpSqft: 271608.55, status: "completed", statusLabel: "Handed over" },
      { id: "B1000", name: "B1000", builtUpSqft: 161833.73, status: "wip", statusLabel: "Work in progress" },
      { id: "B1100", name: "B1100", builtUpSqft: 123408.72, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1200", name: "B1200", builtUpSqft: 134400.70, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1300", name: "B1300", builtUpSqft: 32982.73, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1500", name: "B1500", builtUpSqft: 77254.73, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1600", name: "B1600", builtUpSqft: 83687.09, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1700", name: "B1700 — Future Multi Story", builtUpSqft: 39804.84, status: "upcoming", statusLabel: "Yet to start" },
      { id: "B1900", name: "B1900 — Cold Storage / Restaurant", builtUpSqft: 22214.21, status: "upcoming", statusLabel: "Yet to start" },
    ],
  },
  {
    slug: "nela-2",
    shortName: "NELA 2",
    name: "NELA 2",
    client: "Brit Logistics Pvt Ltd",
    plotAcres: 47.50,
    builtUpSqft: 1124567.20,
    buildingsCount: 6,
    groundCoverage: 47.34,
    completed: 3,
    wip: 2,
    upcoming: 1,
    description:
      "A well-planned industrial & logistics park designed for efficient movement, optimum land utilization and seamless operations.",
    buildings: [
      { id: "B100", name: "B100", builtUpSqft: 204233.98, status: "completed", statusLabel: "Completed (by another vendor)" },
      { id: "B200", name: "B200", builtUpSqft: 222472.50, status: "completed", statusLabel: "Completed — handed over" },
      { id: "B300", name: "B300", builtUpSqft: 238426.91, status: "completed", statusLabel: "Completed — handed over" },
      { id: "B400", name: "B400", builtUpSqft: 110031.76, status: "wip", statusLabel: "Work in progress" },
      { id: "B500", name: "B500", builtUpSqft: 50173.70, status: "upcoming", statusLabel: "Upcoming" },
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
  builtUpSqft: 4230930.54,
  buildings: 23,
  fsi: 0.54,
  groundCoverage: 47.34,
  completed: 6,
  wip: 6,
  upcoming: 11,
};

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
