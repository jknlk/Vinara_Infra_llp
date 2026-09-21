export type ImageSlot = {
  src?: string;
  alt: string;
  caption?: string;
};

// Every image URL used on the site lives here. Swap `src` for real project
// photography without touching any layout code. Unsplash / Pexels only —
// both permit commercial use without attribution.
export const IMAGES: Record<string, ImageSlot> = {
  galleryCraneSunset: {
    src: "https://images.unsplash.com/photo-1689264337786-11efb44e298c?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Construction crane silhouetted against a setting sun",
    caption: "Tower crane at dusk",
  },
  galleryPrecastLift: {
    src: "https://images.unsplash.com/photo-1751054554594-85de2fe63e6b?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Crane lifting a precast concrete tilt-up wall panel while a site engineer supervises",
    caption: "Precast panel erection",
  },
  galleryCityCranes: {
    src: "https://images.unsplash.com/photo-1742185193142-896ae1a8c15d?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Multiple tower cranes on a large multi-building construction site",
    caption: "Multi-tower construction site",
  },
  showcaseWarehouseAerial: {
    src: "https://images.unsplash.com/photo-1715026323282-073e1a65576a?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Aerial view of a large warehouse building",
  },
  showcaseWarehouseAerial2: {
    src: "https://images.unsplash.com/photo-1715026323282-073e1a65576a?q=80&w=1600&auto=format&fit=crop",
    alt: "Aerial view of a large warehouse building",
  },
  showcaseBuildingFacade: {
    src: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
    alt: "Upward view of a completed modern building facade",
  },
  showcaseScaffold: {
    src: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Steel frame and scaffold construction of a multi-storey building",
  },
  showcaseScaffold2: {
    src: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1600&auto=format&fit=crop",
    alt: "Steel frame and scaffold construction of a multi-storey building",
  },
  showcaseRebar: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    alt: "Overhead view of reinforcement work on an active construction site",
  },
  showcaseRacking: {
    src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Warehouse interior with high-bay racking",
  },
  showcaseForklift: {
    src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Warehouse interior with forklift and stacked pallets",
  },
  showcaseContainerYard: {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Aerial view of an organised logistics and distribution yard",
  },
  showcaseCrane: {
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1600&auto=format&fit=crop",
    alt: "Heavy plant and crane at an industrial construction site",
  },
  showcaseUtility: {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop",
    alt: "Site electrician installing a utility connection with PPE",
  },
  showcaseSiteTeam: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    alt: "Site team on a reinforced concrete slab during structural works",
  },
  heroAerial: {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2400&auto=format&fit=crop",
    alt: "Aerial view of a large logistics and distribution yard with organised stacked storage",
    caption: "NELA 1 · Nelamangala, Bengaluru",
  },
  homeHeroPhoto: {
    src: "https://images.unsplash.com/photo-1715026323282-073e1a65576a?q=80&w=2800&auto=format&fit=crop",
    alt: "Aerial view of a large warehouse building with a landscaped surrounding site",
  },
  aboutInterior: {
    src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop",
    alt: "Interior of a warehouse showing high-bay racking and steel structure",
    caption: "PEB roof structure, in progress",
  },
  serviceWarehouse: {
    src: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=2000&auto=format&fit=crop",
    alt: "Tradesperson fabricating fit-out components for a warehouse build",
    caption: "Warehousing & logistics parks",
  },
  serviceIndustrial: {
    src: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2000&auto=format&fit=crop",
    alt: "Steel frame and scaffold construction of a multi-storey industrial building",
    caption: "Industrial construction",
  },
  servicePrecast: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
    alt: "Overhead view of reinforcement and precast structural work on an active site",
    caption: "Precast erection",
  },
  serviceInfra: {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop",
    alt: "Site electrician installing a utility connection with PPE",
    caption: "Infrastructure development",
  },
  serviceRmc: {
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2000&auto=format&fit=crop",
    alt: "Heavy plant and crane infrastructure at an industrial construction site",
    caption: "RMC plant & concrete supply",
  },
  rmcLab: {
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Technicians in safety glasses working with testing equipment in a lab",
    caption: "In-house RMC quality lab",
  },
  rmcFleet: {
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2000&auto=format&fit=crop",
    alt: "Heavy plant and crane infrastructure supporting concrete supply operations",
    caption: "Plant & fleet operations",
  },
  qualityInspection: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
    alt: "Overhead view of an engineer reviewing reinforcement work on an active site",
    caption: "Reinforcement inspection",
  },
  safetyInduction: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=900&h=1300&auto=format&fit=crop&crop=entropy",
    alt: "Construction workers attending a site safety briefing",
    caption: "EHS induction, NELA 1",
  },
  safetyPpe: {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop",
    alt: "Site welder wearing full protective mask and PPE",
    caption: "PPE compliance on site",
  },
  planningSchedule: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
    alt: "Construction planning schedule and Gantt chart on a desk",
    caption: "Master programme review",
  },
  leadershipPortrait1: {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1400&auto=format&fit=crop",
    alt: "Portrait placeholder for Vinara director",
  },
  leadershipPortrait2: {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1400&auto=format&fit=crop",
    alt: "Portrait placeholder for Vinara director",
  },
  gallery1: { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop", alt: "Master plan model of an industrial park", caption: "NELA 1 · Master plan" },
  gallery2: { src: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop", alt: "Construction in progress on a warehouse building", caption: "NELA 1 · B1000 under construction" },
  gallery3: { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop", alt: "Site team on a reinforced concrete slab during structural works", caption: "NELA 2 · Structural works" },
  gallery4: { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1600&auto=format&fit=crop", alt: "Heavy plant and crane infrastructure at the RMC site", caption: "RMC Plant · Batching operations" },
  gallery5: { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop", alt: "Overhead view of an engineer reviewing reinforcement work", caption: "Quality · Reinforcement inspection" },
  gallery6: { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600&auto=format&fit=crop", alt: "Site welder wearing full protective mask and PPE", caption: "Safety · PPE compliance" },
  gallery7: { src: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1600&auto=format&fit=crop", alt: "Completed warehouse exterior with loading docks", caption: "NELA 1 · B500 handed over" },
  gallery8: { src: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1600&auto=format&fit=crop", alt: "Steel frame and scaffold erection of an industrial building", caption: "Bikaner House · Block B" },
  gallery9: { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1600&auto=format&fit=crop", alt: "Heavy plant and crane infrastructure at the RMC site", caption: "RMC Plant · Fleet & logistics" },
  gallery10: { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop", alt: "Overhead view of structural work on an active site", caption: "NELA 2 · Precast installation" },
  gallery11: { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop", alt: "Safety awareness rally on a construction site", caption: "Safety · Awareness rally" },
  gallery12: { src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1600&auto=format&fit=crop", alt: "Completed warehouse interior with high-bay racking", caption: "NELA 1 · B900 handed over" },

  // Genuinely portrait-shot (not landscape-cropped) photos for the 9:16 home
  // gallery strip. Verified natural aspect ratio before use.
  portraitWarehouseRacking: {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000&auto=format&fit=crop",
    alt: "Interior of a large warehouse with high-bay racking",
  },
  portraitTowerCrane: {
    src: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=1000&auto=format&fit=crop",
    alt: "Low-angle view of a tower crane against the sky",
  },
  portraitShippingContainers: {
    src: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?q=80&w=1000&auto=format&fit=crop",
    alt: "Stacked shipping containers against a blue sky",
  },
  portraitForklift: {
    src: "https://images.unsplash.com/photo-1714627798569-b3e36d409c4b?q=80&w=1000&auto=format&fit=crop",
    alt: "Forklift parked inside a warehouse",
  },
  portraitScaffoldWorker: {
    src: "https://images.unsplash.com/photo-1593313637552-29c2c0dacd35?q=80&w=1000&auto=format&fit=crop",
    alt: "Construction worker on scaffolding near steel beams",
  },
  portraitScaffoldWorkers: {
    src: "https://images.unsplash.com/photo-1713593930871-e21d7f9ef4a1?q=80&w=1000&auto=format&fit=crop",
    alt: "Two construction workers on scaffolding on a building",
  },
  portraitHardHatWorker: {
    src: "https://images.unsplash.com/photo-1735494032948-14ef288fc9d3?q=80&w=1000&auto=format&fit=crop",
    alt: "Worker wearing a hard hat in an industrial facility",
  },
  portraitAerialContainerYard: {
    src: "https://images.unsplash.com/photo-1532986012014-e2ee98d47a46?q=80&w=1000&auto=format&fit=crop",
    alt: "Aerial drone photo of an organised shipping container yard",
  },

  // Planning page — supporting imagery.
  planningReview: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&h=1750&auto=format&fit=crop&crop=entropy",
    alt: "Construction planning schedule and Gantt chart laid out for review on a desk",
    caption: "Master programme review",
  },
  planningOutputs: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2400&auto=format&fit=crop",
    alt: "Overhead view of an engineer reviewing reinforcement work and control data on an active site",
    caption: "Progress & control reporting",
  },

  // About page hero — unique slideshow, not reused anywhere else on the site.
  aboutHeroFormwork: {
    src: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2400&auto=format&fit=crop",
    alt: "Site crew climbing reinforcement formwork on a high-rise structure",
  },
  aboutHeroLadderCrew: {
    src: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2400&auto=format&fit=crop",
    alt: "Site crew in hard hats climbing a ladder against an open sky",
  },
  aboutHeroRenovation: {
    src: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2400&auto=format&fit=crop",
    alt: "Structural renovation in progress inside a heritage building",
  },
  aboutHeroSkyline: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop",
    alt: "Low-angle view looking up at a cluster of glass high-rise towers",
  },
};
