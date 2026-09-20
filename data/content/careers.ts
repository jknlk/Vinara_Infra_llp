export const CAREERS_VALUES = [
  {
    icon: "HardHat",
    title: "Hands-on from day one",
    body: "Work on live warehousing, industrial and infrastructure sites — not a training desk.",
  },
  {
    icon: "Cpu",
    title: "Technology-led delivery",
    body: "Planning, QC and reporting run through modern tools, not paper registers.",
  },
  {
    icon: "ShieldCheck",
    title: "Safety & quality first",
    body: "Zero-harm culture with structured induction, PPE and daily toolbox talks.",
  },
  {
    icon: "TrendingUp",
    title: "Grow into leadership",
    body: "A lean, delivery-focused team where engineers move fast into ownership roles.",
  },
] as const;

export const CAREERS_STATS = [
  { value: "8", label: "Open roles" },
  { value: "5", label: "Departments" },
  { value: "3", label: "Active site locations" },
  { value: "37+", label: "Years of engineering legacy" },
] as const;

export const DEPARTMENT_ICONS = {
  "Engineering & Execution": "HardHat",
  "Planning & Controls": "CalendarClock",
  "Quality & Safety": "ShieldCheck",
  Commercial: "Briefcase",
  "Design & Precast": "Layers",
} as const;

export type JobRole = {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
};

export const OPEN_ROLES: JobRole[] = [
  {
    title: "Site Engineer — Civil",
    department: "Engineering & Execution",
    location: "NELA 1 / NELA 2, Bengaluru",
    type: "Full-time",
    experience: "2–5 years",
    summary: "Own day-to-day execution of civil works on an active warehousing block — layout, pour sequencing and crew coordination.",
    responsibilities: [
      "Supervise RCC, PEB and finishing works against drawings",
      "Coordinate labour, material and equipment on your block",
      "Maintain daily progress and quality records",
    ],
  },
  {
    title: "Planning Engineer",
    department: "Planning & Controls",
    location: "Bengaluru (Site + HO)",
    type: "Full-time",
    experience: "3–6 years",
    summary: "Build and track the master programme across parallel towers, flagging slippage before it becomes a problem.",
    responsibilities: [
      "Prepare and update L1–L3 schedules in Primavera / MS Project",
      "Track progress vs. programme and issue recovery plans",
      "Report programme health to project leadership weekly",
    ],
  },
  {
    title: "QA/QC Engineer",
    department: "Quality & Safety",
    location: "NELA 1, Bengaluru",
    type: "Full-time",
    experience: "2–4 years",
    summary: "Run inspection checklists across structural and finishing activities and keep the Aconex IR register current.",
    responsibilities: [
      "Conduct stage inspections and raise NCRs where needed",
      "Maintain material test records and lab coordination",
      "Close out inspection requests within SLA",
    ],
  },
  {
    title: "EHS / Safety Officer",
    department: "Quality & Safety",
    location: "Active project sites",
    type: "Full-time",
    experience: "2–5 years",
    summary: "Lead site inductions, PPE compliance and incident prevention across a multi-tower construction front.",
    responsibilities: [
      "Conduct daily toolbox talks and safety walks",
      "Manage permit-to-work for height, excavation and hot works",
      "Investigate near-misses and drive corrective action",
    ],
  },
  {
    title: "Quantity Surveyor / Billing Engineer",
    department: "Commercial",
    location: "Bengaluru (HO)",
    type: "Full-time",
    experience: "3–6 years",
    summary: "Measure completed works, prepare client billing and track cost against the BOQ for live projects.",
    responsibilities: [
      "Prepare RA bills and reconcile with site measurements",
      "Track BOQ vs. actuals and flag cost variances",
      "Support subcontractor bill certification",
    ],
  },
  {
    title: "Precast Engineer",
    department: "Design & Precast",
    location: "Bikaner House / RMC Plant",
    type: "Full-time",
    experience: "2–5 years",
    summary: "Oversee precast panel casting, curing and erection sequencing across active blocks.",
    responsibilities: [
      "Plan casting yard schedules against erection fronts",
      "Inspect panel quality before dispatch and erection",
      "Coordinate crane and rigging plans with site teams",
    ],
  },
  {
    title: "RMC Plant / QC Chemist",
    department: "Design & Precast",
    location: "RMC Plant, Bengaluru",
    type: "Full-time",
    experience: "1–4 years",
    summary: "Run mix design, batching QC and lab testing for concrete supplied across active pours.",
    responsibilities: [
      "Design and validate mix grades from M10 to M50",
      "Run cube testing and maintain lab records",
      "Coordinate batching schedules with pour programmes",
    ],
  },
  {
    title: "Store & Procurement Officer",
    department: "Commercial",
    location: "Active project sites",
    type: "Full-time",
    experience: "2–4 years",
    summary: "Manage material inflow, site stores and vendor coordination against the procurement plan.",
    responsibilities: [
      "Maintain stock records and reconcile against site consumption",
      "Coordinate delivery schedules with vendors and site teams",
      "Support procurement with material indenting",
    ],
  },
];
