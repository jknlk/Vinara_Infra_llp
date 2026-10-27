export type GalleryCategory = "All" | "NELA 1" | "NELA 2" | "Bikaner House";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "NELA 1",
  "NELA 2",
  "Bikaner House",
];

export type GalleryItem = {
  imageKey: string;
  categories: GalleryCategory[];
  title: string;
  description: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
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

// Warehouse set added after launch. Kept apart from GALLERY_ITEMS so it seeds
// under its own flag and leaves the home page seed untouched.
export const WAREHOUSE_GALLERY_ITEMS: GalleryItem[] = [
  {
    imageKey: "galleryWarehouse1",
    categories: ["NELA 1"],
    title: "High-Bay Storage Aisle",
    description:
      "Narrow-aisle racking loaded to full height, on a floor slab built to the flatness tolerance high-bay storage demands.",
  },
  {
    imageKey: "galleryWarehouse2",
    categories: ["NELA 2"],
    title: "Mezzanine & Racking Fit-Out",
    description:
      "Racking, small-parts storage and floor staging laid out under a clear-span roof with continuous LED lighting.",
  },
  {
    imageKey: "galleryWarehouse3",
    categories: ["NELA 1"],
    title: "Selective Pallet Racking",
    description:
      "Selective pallet racking set out on a column grid planned around aisle widths and forklift turning circles.",
  },
  {
    imageKey: "galleryWarehouse4",
    categories: ["NELA 2"],
    title: "Central Warehouse Aisle",
    description:
      "A long central aisle with clear sightlines end to end, lit evenly from roof-mounted fittings.",
  },
  {
    imageKey: "galleryWarehouse5",
    categories: ["NELA 1"],
    title: "Operations Floor",
    description:
      "A wide operations floor with marked pedestrian routes separating foot traffic from material handling.",
  },
  {
    imageKey: "galleryWarehouse6",
    categories: ["NELA 2"],
    title: "Pallet Storage Bay",
    description:
      "Heavy-duty pallet bays served by forklift access, with rack protection at every upright.",
  },
  {
    imageKey: "galleryWarehouse7",
    categories: ["NELA 1"],
    title: "Reach Truck Aisle",
    description:
      "Reach-truck aisles sized for high-level picking, on a jointless slab that keeps handling equipment running smoothly.",
  },
  {
    imageKey: "galleryWarehouse8",
    categories: ["NELA 1"],
    title: "Distribution Centre Aerial",
    description:
      "A large-format distribution building with truck courts, car parking and internal roads planned as one site.",
  },
  {
    imageKey: "galleryWarehouse9",
    categories: ["NELA 2"],
    title: "Roof Structure & Skylights",
    description:
      "Steel portal frames and roof skylights bring daylight deep into the storage floor and cut lighting loads.",
  },
  {
    imageKey: "galleryWarehouse10",
    categories: ["NELA 1"],
    title: "Rooftop Solar & Loading Docks",
    description:
      "A rooftop solar array above a row of dock doors, with trailers staged in the truck court below.",
  },
  {
    imageKey: "galleryWarehouse11",
    categories: ["NELA 2"],
    title: "Full-Height Racking Hall",
    description:
      "A bright racking hall stacked to full clear height, with wide aisles for two-way equipment movement.",
  },
  {
    imageKey: "galleryWarehouse12",
    categories: ["NELA 2"],
    title: "Logistics Park Overview",
    description:
      "The full logistics plot from above: building, yards, stormwater drainage and access roads working together.",
  },
  {
    imageKey: "galleryWarehouse13",
    categories: ["NELA 1"],
    title: "Dispatch Lanes",
    description:
      "Numbered dispatch lanes with floor markings guide pallets from racking to the loading docks.",
  },
  {
    imageKey: "galleryWarehouse14",
    categories: ["NELA 2"],
    title: "Deep Racking Structure",
    description:
      "Multi-level racking seen end on, showing the load clearances and bracing that keep deep storage stable.",
  },
  {
    imageKey: "galleryWarehouse15",
    categories: ["NELA 1"],
    title: "Clear-Span Shell Handover",
    description:
      "A column-free warehouse shell at handover: steel frame, insulated envelope and a power-floated concrete floor.",
  },
  {
    imageKey: "galleryWarehouse16",
    categories: ["NELA 1"],
    title: "Site & Yard Layout",
    description:
      "Building footprint, hardstand and landscaping set out to keep truck and car movements fully separated.",
  },
  {
    imageKey: "galleryWarehouse17",
    categories: ["NELA 2"],
    title: "Racking Portal Aisle",
    description:
      "Racking portals line a pedestrian aisle, with column guards and end-of-aisle protection throughout.",
  },
  {
    imageKey: "galleryWarehouse18",
    categories: ["NELA 1"],
    title: "Material Handling Bay",
    description:
      "A material handling bay with charging and parking space set aside for the forklift fleet.",
  },
];

// What a photo shows, stored as a gallery item's second category. The gallery page opens with
// the first (finished warehouses) as a collage, then a section for each activity in this order.
export const GALLERY_ACTIVITIES = [
  "Finished warehouses",
  "Ancillary buildings",
  "Retaining walls",
  "Roads",
  "Pavers & landscaping",
  "Hume pipes & drainage",
  "Work in progress",
] as const;
