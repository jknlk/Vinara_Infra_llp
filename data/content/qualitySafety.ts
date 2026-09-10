export const QUALITY_POSITIONING = [
  { title: "Our Vision", body: "Right first time, every time" },
  { title: "Our Commitment", body: "Delivering excellence in every detail" },
  { title: "Our Promise", body: "Zero compromise on quality" },
  { title: "Our Culture", body: "Quality is everyone's responsibility" },
];

export const QUALITY_APPROACH = [
  { title: "Planning", body: "Quality requirements defined, ITP, checklists and method statements prepared" },
  { title: "Material Control", body: "Approved sources, material inspection, testing, controlled storage" },
  { title: "Execution", body: "Work executed per approved drawings, specifications and methodology" },
  { title: "Inspection", body: "Inspection at each critical stage by QC team and hold points" },
  { title: "Testing", body: "Material, concrete and field testing in site lab" },
  { title: "Documentation", body: "Records, test reports, checklists, approvals maintained" },
  { title: "Approval", body: "Work approved only after inspection, testing and compliance verification" },
];

export const QC_ORG_CHART = [
  "Project Head",
  "QA/QC Manager",
  "QC Engineer × 3",
  "QC Supervisor / Inspector × 3",
  "Execution teams & subcontractors",
];

export const QC_RESPONSIBILITIES = [
  "Implement quality plans and procedures",
  "Inspect and monitor workmanship and materials",
  "Conduct measurements, tests and inspections",
  "Coordinate testing with site lab and third parties",
  "Maintain quality records and documentation",
  "Ensure compliance with drawings, specifications and standards",
  "Raise NCRs and ensure corrective actions",
  "Follow up on quality issues until closure",
];

export const ONSITE_CONTROL = [
  "Pre-activity checks",
  "In-process inspections",
  "Testing & verification",
  "Non-conformance control",
  "Record & report",
];

export const QC_EQUIPMENT = [
  "Compression testing machine",
  "Rebound hammer",
  "Total station / auto level",
  "Cube moulds",
  "Sieves & lab equipment",
];

export const ACONEX_MODULES = [
  "Inspection Requests (IR)",
  "Quality Checklists",
  "Test Reports",
  "Material Approvals",
  "NCR & Corrective Actions",
  "Document Records",
];

export const ACONEX_CLIENT_BENEFITS = [
  "Real-time access to quality status and records",
  "Faster approvals and issue resolution",
  "Improved transparency and communication",
  "Strong audit trail for compliance and certification",
  "Better control, fewer delays, higher quality",
];

export const ACONEX_REGISTER = {
  irRangeStart: "VINARA-GCOR-003273",
  irRangeEnd: "VINARA-GCOR-003284",
  issuedTo: "AGP Industrial Parks Private Limited",
  dateRange: "29–31 August 2026",
  totalRecords: 3617,
};

export const INSPECTION_ACTIVITIES = [
  { activity: "Reinforcement", checked: "Bar size, spacing, cover, lap length, binding" },
  { activity: "Formwork", checked: "Alignment, level, dimensions, stability, release agent" },
  { activity: "Concreting", checked: "Slump, temperature, cube, compaction, finishing" },
  { activity: "Masonry", checked: "Block quality, alignment, joints, verticality" },
  { activity: "Plastering", checked: "Surface preparation, thickness, finish" },
  { activity: "Waterproofing", checked: "Surface prep, membrane, laps, sealing, holiday test" },
  { activity: "Flooring", checked: "Level, flatness, alignment, joint width, finish" },
  { activity: "Painting", checked: "Surface prep, putty, coats, thickness, finish" },
  { activity: "Façade", checked: "Fixing, alignment, sealant, anchorage, finish" },
  { activity: "Doors & Windows", checked: "Alignment, fixing, gaps, sealant, hardware" },
  { activity: "MEP Services", checked: "Routing, supports, clearances, testing & compliance" },
  { activity: "Structural Steel", checked: "Weld quality, bolting, alignment, coatings" },
  { activity: "Earthwork", checked: "Excavation level, slope, compaction, density" },
  { activity: "Final Inspection", checked: "Overall quality, punch list, snag clearance" },
];

export const INDUCTION_DETAILS = {
  conductedBy: "Project EHS Team",
  workLocation: "Nela 01 & 02",
  campLocation: "Nela 02",
  client: "AGP (Assetz Property Group)",
  purpose:
    "A proactive step of making new site workforce aware about the AGP Core Five Safety Risks and control measures prior to entering site.",
};

export const DEPLOYMENT_STEPS = [
  "Contractor carries workforce to project location",
  "Pre-deployment screening",
  "Pre-deployment medical checkup by medical officer",
  "Delivery of site EHS induction",
  "Issue of required PPE",
  "Start work on site as per safety rules",
  "Issue site gate pass / ID card",
];

export const CORE_FIVE_RISKS = [
  "Fall of person",
  "Fall of material",
  "Electrocution",
  "Collision with moving construction vehicle",
  "Open blades causing cut injuries and lacerations",
];

export const VEHICLE_RULES = [
  "Max 20 km/h",
  "Designated routes and pedestrian walkways",
  "Reverse horn and blind-spot care",
  "Never stand behind a reversing vehicle",
  "No mobile phones while driving",
  "Park only in designated areas",
  "Safe distance during loading and unloading",
  "Follow signs and banksmen",
];

export const EXCAVATION_RULES = [
  "Permit and risk assessment before starting",
  "Proper shoring / benching / sloping",
  "Barricading with top and mid rails",
  "Daily inspection for instability, water accumulation, loose soil",
  "Safe access/egress with ladder at every excavation over 1.2 m",
  "Keep soil, material and vehicles clear of the edge",
  "Stop work in heavy rain or high wind",
  "PPE compliance at all times",
];

export const HEIGHT_RULES = [
  "Permit before starting",
  "Risk assessment/JSA and toolbox talk",
  "Full-body harness with double lanyard",
  "Scaffolds with guardrails, midrails and toe boards",
  "Stop work in strong wind or heavy rain",
  "Never work at height without fall protection",
];

export const SCAFFOLD_LOADS = {
  liveLoadKn: 1.7,
  deadLoadKn: 1.55,
  totalKn: 3.25,
  standards: ["IS 3966:1995", "IS 875 Part 1", "IS 875 Part 2", "IS 875 Part 3"],
};

export const FIRE_EXTINGUISHERS = [
  { class: "Water", suitableFor: "Class A" },
  { class: "CO₂", suitableFor: "Class B" },
  { class: "Foam", suitableFor: "Class A, B" },
  { class: "Powder", suitableFor: "Class A, B, C" },
  { class: "Wet chemical", suitableFor: "Class F" },
];

export const FIRE_RESPONSE = ["Raise alarm", "Inform", "Act", "Evacuate"];
export const EMERGENCY_FLOW = ["Detect", "Alert", "Evacuate", "Assemble", "Account", "All clear"];

export const NEAR_MISS_STEPS = [
  "Immediate action",
  "Report",
  "Identify root cause",
  "Corrective action",
  "Preventive action",
  "Learn & share",
];

export const SAFETY_PERFORMANCE = [
  { metric: "Today manpower", value: "412" },
  { metric: "Staff & operators", value: "82" },
  { metric: "Safe manhours — staff & operator", value: "1,265" },
  { metric: "Safe manhours — workers", value: "2,480" },
  { metric: "Total safe manhours daily", value: "3,745" },
  { metric: "Total safe manhours to March 2026", value: "9,96,553" },
];

export const SAFETY_PROGRAMME = [
  { title: "Safety Facilities", body: "Well-maintained rest shed with safety facilities for all workers" },
  { title: "Safety Awareness", body: "Regular safety meetings and awareness programs" },
  { title: "Safety Engagement", body: "Engaging programs to motivate and encourage safe behaviour" },
];

export const SAFETY_ACTIVITIES = [
  "Safety Awareness Rally",
  "Safety Orientation & Talk",
  "Tool Box Talk (TBT)",
  "Safety Motivation Activities",
];

export const SAFETY_WELFARE = [
  "Rest shed",
  "Safe pathway",
  "Alcohol testing at entry",
  "First aid room",
  "Emergency assembly point",
  "Drinking water",
  "Toilets",
  "Workmen rest area",
];
