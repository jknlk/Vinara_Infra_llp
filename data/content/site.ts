export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/planning", label: "Planning & Controls" },
  { href: "/quality-safety", label: "Quality & Safety" },
  { href: "/leadership", label: "Leadership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_STAT_STRIP =
  "9,96,553 safe manhours · 42,30,930.54 sq.ft delivered · 23 buildings";

export const COMPANY_BLURB =
  "Vinara Infra LLP delivers high-quality, technology-driven construction solutions across warehousing, industrial and infrastructure projects, with a strong focus on safety, efficiency and long-term value.";

export const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/leadership", label: "Leadership" },
      { href: "/quality-safety", label: "Quality & Safety" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { href: "/services", label: "Warehousing & Logistics" },
      { href: "/services", label: "Industrial Construction" },
      { href: "/services", label: "Precast Construction" },
      { href: "/services", label: "RMC Plant & Concrete Supply" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { href: "/projects", label: "NELA 1" },
      { href: "/projects", label: "NELA 2" },
      { href: "/projects", label: "Bikaner House" },
      { href: "/planning", label: "Planning & Controls" },
    ],
  },
] as const;

export const CONTACT = {
  addressLines: [
    "Ground Floor No 12, 9th Cross,",
    "Kuvempu Nagar, Yelahanka,",
    "Chikkajala Post, Jala Hobli,",
    "Bangalore 562157",
  ],
  mapQuery: "Kuvempu Nagar, Yelahanka, Chikkajala Post, Bengaluru 562157",
  mapCenter: { lat: 13.1358, lng: 77.5946 },
  departments: [
    { department: "Managing Director", contact: "Rajat Panchal · 8971500945" },
    { department: "AGM", contact: "agm@vinara.co.in" },
    { department: "Planning", contact: "planning.nela1@vinara.co.in" },
    { department: "Quality", contact: "quality.nela1@vinara.co.in" },
  ],
} as const;

export const CLIENTS = [
  "AGP Industrial Logistics Parks",
  "Bikaner House",
  "Assetz Industrial Park Pvt Ltd",
  "Brit Logistics Pvt Ltd",
];

export const PMC_PARTNERS = ["CBRE", "FABS", "Turner & Townsend"];
export const TENANTS = ["Amazon", "DHL"];
