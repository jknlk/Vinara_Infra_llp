export const DIRECTORS = [
  {
    name: "Mr. Vinod L Panchal",
    role: "Director",
    bio: "37 years in civil engineering with delivery leadership across major industrial projects.",
    imageKey: "leadershipPortrait1",
  },
  {
    name: "Mr. Rajat V Panchal",
    role: "Director & Managing Director",
    bio: "M.S. in Electronics Engineering, New York University. Drives technology-led delivery.",
    imageKey: "leadershipPortrait2",
  },
] as const;

export const MANAGEMENT_TEAM = [
  { name: "Mr. Neelakantappa", role: "AGM", bio: "Overall leadership and business management; ensures strategy and delivery." },
  { name: "Mr. Sanjay Singh", role: "Project Manager", bio: "Leads project execution teams; ensures quality, safety and timely delivery." },
  { name: "Mr. Robin Chauhan", role: "Senior Project Manager", bio: "Manages site operations and resources with focus on efficient and safe projects." },
  { name: "Mr. Rahul Pandey", role: "DPM", bio: "Oversees project planning, coordination and stakeholder management." },
];

// One further management team member (initials "MK") appears in the source
// deck with no full name or role — held back pending client confirmation.
export const PENDING_TEAM_MEMBER = { initials: "MK" };

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
