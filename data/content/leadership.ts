// Stock Unsplash portraits used as temporary stand-ins — NOT real photos of
// these people. Swap each `photo` for the real headshot when available.
const RAW_TEAM = [
  {
    name: "Mr. Vinod L Panchal",
    initials: "MV",
    role: "Director",
    bio: "37 years in civil engineering with delivery leadership across major industrial and institutional builds.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Rajat V Panchal",
    initials: "MR",
    role: "Director & Managing Director",
    bio: "M.S. in Electronics Engineering from New York University. Drives technology-enabled delivery across the portfolio.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Neelakantappa",
    initials: "MN",
    role: "AGM",
    bio: "Overall leadership and business management. Ensures strategy, delivery and client satisfaction stay aligned.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Sanjay Singh",
    initials: "MS",
    role: "Project Manager",
    bio: "Leads project execution teams and ensures quality, safety and timely delivery on active warehousing sites.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Robin Chauhan",
    initials: "MR",
    role: "Senior Project Manager",
    bio: "Manages site operations and resources with a focus on efficient and safe project delivery.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Rahul Pandey",
    initials: "MR",
    role: "DPM",
    bio: "Oversees project planning, coordination and stakeholder management across live sites.",
    photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mr. Kaushik Babu",
    initials: "MK",
    role: "Planning Engineer",
    bio: "Handles project planning, scheduling and progress tracking using modern planning tools.",
    photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=800&auto=format&fit=crop",
  },
] as const;

export const TEAM = RAW_TEAM;

export const DIRECTORS = TEAM.slice(0, 2);

export const PROJECT_ORG_CHART = [
  "Project Head",
  "QA/QC Manager",
  "QC Engineers",
  "QC Supervisors / Inspectors",
  "Execution teams & subcontractors",
];

export const MANPOWER_STATS = [
  { value: 412, label: "Today manpower" },
  { value: 82, label: "Staff and operators" },
  { value: 3745, label: "Daily safe manhours" },
];

export const CULTURE_PILLARS = [
  "Quality First",
  "Skilled People",
  "Strong Systems",
  "Safety & Quality",
  "Continuous Improvement",
  "Client Satisfaction",
];
