export const TEAM = [
  {
    name: "Mr. Vinod L Panchal",
    initials: "MV",
    role: "Director",
    bio: "37 years in civil engineering with delivery leadership across major industrial and institutional builds.",
  },
  {
    name: "Mr. Rajat V Panchal",
    initials: "MR",
    role: "Director & Managing Director",
    bio: "M.S. in Electronics Engineering from New York University. Drives technology-enabled delivery across the portfolio.",
  },
  {
    name: "Mr. Neelakantappa",
    initials: "MN",
    role: "AGM",
    bio: "Overall leadership and business management. Ensures strategy, delivery and client satisfaction stay aligned.",
  },
  {
    name: "Mr. Sanjay Singh",
    initials: "MS",
    role: "Project Manager",
    bio: "Leads project execution teams and ensures quality, safety and timely delivery on active warehousing sites.",
  },
  {
    name: "Mr. Robin Chauhan",
    initials: "MR",
    role: "Senior Project Manager",
    bio: "Manages site operations and resources with a focus on efficient and safe project delivery.",
  },
  {
    name: "Mr. Rahul Pandey",
    initials: "MR",
    role: "DPM",
    bio: "Oversees project planning, coordination and stakeholder management across live sites.",
  },
  {
    name: "Mr. Kaushik Babu",
    initials: "MK",
    role: "Planning Engineer",
    bio: "Handles project planning, scheduling and progress tracking using modern planning tools.",
  },
] as const;

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
