export type GalleryCategory = "All" | "NELA 1" | "NELA 2" | "Bikaner House";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "NELA 1",
  "NELA 2",
  "Bikaner House",
];

export const GALLERY_ITEMS: {
  imageKey: string;
  categories: GalleryCategory[];
  title: string;
  description: string;
}[] = [
  {
    imageKey: "gallery1",
    categories: ["NELA 1"],
    title: "NELA 1 Master Plan",
    description:
      "A phased industrial park masterplan sequencing warehousing blocks, internal roads and utility corridors across the Nelamangala site.",
  },
  {
    imageKey: "gallery2",
    categories: ["NELA 1"],
    title: "Block B1000 Rising",
    description:
      "Structural steel and precast panels come together on B1000, with cladding sequenced tower by tower along the erection front.",
  },
  {
    imageKey: "gallery3",
    categories: ["NELA 2"],
    title: "NELA 2 Structural Works",
    description:
      "Reinforced concrete slabs and columns take shape as the site team advances the structural frame ahead of roofing.",
  },
  {
    imageKey: "gallery4",
    categories: ["NELA 1"],
    title: "RMC Batching Yard",
    description:
      "Our in-house ready-mix plant keeps pour schedules on time, batching to spec for every active tower on site.",
  },
  {
    imageKey: "gallery5",
    categories: ["NELA 2"],
    title: "Reinforcement Inspection",
    description:
      "Every reinforcement layout is checked against drawing before pour — a quality gate that runs on every slab, every time.",
  },
  {
    imageKey: "gallery6",
    categories: ["NELA 1"],
    title: "PPE Compliance",
    description:
      "Full protective gear is non-negotiable on active work fronts, enforced through daily site walks and toolbox talks.",
  },
  {
    imageKey: "gallery7",
    categories: ["NELA 1"],
    title: "Block B500 Handover",
    description:
      "A completed warehouse exterior with dock-levelled loading bays, ready for fit-out and handover to occupier.",
  },
  {
    imageKey: "gallery8",
    categories: ["Bikaner House"],
    title: "Bikaner House Block B",
    description:
      "Steel frame and scaffold erection progressing on Block B, with the structural grid locked ahead of envelope works.",
  },
  {
    imageKey: "gallery9",
    categories: ["NELA 1"],
    title: "Fleet & Logistics",
    description:
      "Transit mixers and heavy plant staged for round-the-clock material movement between the batching yard and pour fronts.",
  },
  {
    imageKey: "gallery10",
    categories: ["NELA 2"],
    title: "Precast Installation",
    description:
      "Precast elements are lifted and set to line and level, cutting cycle time on the NELA 2 structural programme.",
  },
  {
    imageKey: "gallery11",
    categories: ["Bikaner House"],
    title: "Safety Awareness Rally",
    description:
      "Site-wide awareness drives keep every worker and subcontractor aligned on EHS standards and emergency response.",
  },
  {
    imageKey: "gallery12",
    categories: ["NELA 1"],
    title: "Block B900 Handover",
    description:
      "High-bay racking-ready interiors on B900, completed and handed over on programme with full QA sign-off.",
  },
];
