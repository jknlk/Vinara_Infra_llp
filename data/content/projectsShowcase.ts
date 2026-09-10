import type { BuildingStatus } from "@/data/buildings";

export interface ShowcaseProject {
  id: string;
  name: string;
  location: string;
  client: string;
  area: string;
  status: BuildingStatus;
  statusLabel: "Completed" | "Ongoing";
  progress: number;
  imageKey: string;
  href: string;
}

// The 12 buildings across NELA 1, NELA 2 and Bikaner House that are either
// completed or actively in progress — figures match data/buildings.ts exactly.
// Per-building progress isn't tracked individually in the source data, so
// completed = 100% and in-progress buildings share the portfolio's overall
// 60% figure rather than an invented per-building number.
export const PROJECTS_SHOWCASE: ShowcaseProject[] = [
  {
    id: "nela1-b500",
    name: "B500 · NELA 1",
    location: "Nelamangala, Bengaluru",
    client: "Assetz Industrial Park — Amazon",
    area: "4,21,888.63 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseWarehouseAerial",
    href: "/projects#nela-1",
  },
  {
    id: "nela1-b900",
    name: "B900 · NELA 1",
    location: "Nelamangala, Bengaluru",
    client: "Assetz Industrial Park Pvt Ltd",
    area: "2,71,608.55 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseBuildingFacade",
    href: "/projects#nela-1",
  },
  {
    id: "nela1-b400",
    name: "B400 · NELA 1",
    location: "Nelamangala, Bengaluru",
    client: "Assetz Industrial Park Pvt Ltd",
    area: "3,59,754.09 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseScaffold",
    href: "/projects#nela-1",
  },
  {
    id: "nela1-b1000",
    name: "B1000 · NELA 1",
    location: "Nelamangala, Bengaluru",
    client: "Assetz Industrial Park Pvt Ltd",
    area: "1,61,833.73 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseRebar",
    href: "/projects#nela-1",
  },
  {
    id: "nela2-b100",
    name: "B100 · NELA 2",
    location: "Nelamangala, Bengaluru",
    client: "Brit Logistics Pvt Ltd",
    area: "2,04,233.98 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseRacking",
    href: "/projects#nela-2",
  },
  {
    id: "nela2-b200",
    name: "B200 · NELA 2",
    location: "Nelamangala, Bengaluru",
    client: "Brit Logistics Pvt Ltd",
    area: "2,22,472.50 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseForklift",
    href: "/projects#nela-2",
  },
  {
    id: "nela2-b300",
    name: "B300 · NELA 2",
    location: "Nelamangala, Bengaluru",
    client: "Brit Logistics Pvt Ltd",
    area: "2,38,426.91 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseContainerYard",
    href: "/projects#nela-2",
  },
  {
    id: "nela2-b400",
    name: "B400 · NELA 2",
    location: "Nelamangala, Bengaluru",
    client: "Brit Logistics Pvt Ltd",
    area: "1,10,031.76 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseCrane",
    href: "/projects#nela-2",
  },
  {
    id: "nela2-b600",
    name: "B600 · NELA 2",
    location: "Nelamangala, Bengaluru",
    client: "Brit Logistics Pvt Ltd",
    area: "2,45,677.54 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseUtility",
    href: "/projects#nela-2",
  },
  {
    id: "bikaner-a",
    name: "Block A · Bikaner House",
    location: "Bengaluru, Karnataka",
    client: "Bikaner House",
    area: "3,00,334.32 sq.ft",
    status: "completed",
    statusLabel: "Completed",
    progress: 100,
    imageKey: "showcaseWarehouseAerial2",
    href: "/projects#bikaner-house",
  },
  {
    id: "bikaner-b",
    name: "Block B · Bikaner House",
    location: "Bengaluru, Karnataka",
    client: "Bikaner House",
    area: "2,93,216.86 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseSiteTeam",
    href: "/projects#bikaner-house",
  },
  {
    id: "bikaner-c",
    name: "Block C · Bikaner House",
    location: "Bengaluru, Karnataka",
    client: "Bikaner House",
    area: "3,04,021.36 sq.ft",
    status: "wip",
    statusLabel: "Ongoing",
    progress: 60,
    imageKey: "showcaseScaffold2",
    href: "/projects#bikaner-house",
  },
];
