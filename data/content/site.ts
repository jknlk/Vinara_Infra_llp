export const NAV_LINKS = [
  { href: "/", label: "Home", navLabel: "Home" },
  { href: "/about", label: "About", navLabel: "About" },
  { href: "/services", label: "Services", navLabel: "Services" },
  { href: "/projects", label: "Projects", navLabel: "Projects" },
  { href: "/planning", label: "Controls & QHSE", navLabel: "Controls & QHSE" },
  { href: "/leadership", label: "Leadership", navLabel: "Leadership" },
  { href: "/gallery", label: "Gallery", navLabel: "Gallery" },
  { href: "/careers", label: "Careers", navLabel: "Careers" },
] as const;

export const COMPANY_BLURB =
  "Vinara Infra LLP delivers high-quality, technology-driven construction solutions across warehousing, industrial and infrastructure projects, with a strong focus on safety, efficiency and long-term value.";

export const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/leadership", label: "Leadership" },
      { href: "/planning", label: "Controls & QHSE" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
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
  mapCenter: { lat: 13.1709, lng: 77.6347 },
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
  "Vortex Motors",
  "BWSSB",
];

export const PMC_PARTNERS = ["CBRE", "FABS", "Turner & Townsend"];
export const TENANTS = ["Amazon", "DHL"];
