export const CONTROL_DOMAINS = [
  { title: "Schedule", body: "Robust planning, realistic schedules, continuous update of progress" },
  { title: "Progress", body: "Measure actuals, analyze performance, drive corrective actions" },
  { title: "Resources", body: "Right people, right skills, right time" },
  { title: "Procurement", body: "Plan ahead, secure on time, ensure material and subcontractor readiness" },
  { title: "Risks & Opportunities", body: "Identify early, assess impact, proactively mitigate" },
  { title: "Reporting & Insights", body: "Timely, accurate and meaningful reports at all levels" },
];

export const CONTROLS_COMMITMENT = [
  "Plan with clarity",
  "Execute with discipline",
  "Monitor with precision",
  "Deliver with confidence",
  "Improve continuously",
];

export const PLANNING_LEVELS = [
  { level: "01", title: "Master Programme", term: "long term", purpose: "Defines overall project scope, key milestones and completion strategy", output: "Master schedule · Key milestones · S-curve" },
  { level: "02", title: "Milestone Schedule", term: "medium term", purpose: "Breaks down master milestones into major phases and deliverables", output: "Milestone plan · Phase durations · Critical path" },
  { level: "03", title: "Building / Phase Schedule", term: "short term", purpose: "Detailed schedule for each building or phase", output: "Detailed schedule · Activity logic · Resource plan" },
  { level: "04", title: "Look-Ahead Plan", term: "2–8 weeks", purpose: "Plans upcoming work, identifies constraints, prepares work fronts", output: "Look-ahead plan · Constraint log · Work front readiness" },
  { level: "05", title: "Weekly Work Plan", term: "1 week", purpose: "Commits to weekly targets with resources and deliverables", output: "Weekly plan · Resource allocation · Weekly targets" },
  { level: "06", title: "Daily Execution Plan", term: "daily", purpose: "Drives daily execution with clear tasks and accountability", output: "Daily plan · Daily progress · Issue log" },
];

export const HIERARCHY_BENEFITS = [
  "Clear alignment",
  "Better coordination",
  "Early visibility",
  "Disciplined execution",
  "Predictable delivery",
];

export const CONTROL_CYCLE = [
  { title: "Plan", body: "Define scope, activities, resources and targets; establish the baseline" },
  { title: "Execute", body: "Mobilize resources and execute safely and efficiently" },
  { title: "Measure", body: "Capture actual progress, quantities, productivity, performance" },
  { title: "Analyze", body: "Compare actuals vs plan; identify variances, root causes, risks" },
  { title: "Act", body: "Take corrective actions, reallocate resources, update the plan" },
];

export const CYCLE_FOUNDATIONS = ["People", "Process", "Data"];
export const CYCLE_ENABLERS = ["Collaboration", "Early warning", "Adaptability", "Continuous improvement", "Value delivery", "Technology"];
export const CYCLE_OUTCOMES = [
  "Predictable schedules",
  "Better resource utilization",
  "Reduced risks & variances",
  "Improved quality & safety",
  "Successful project delivery",
];

export const PROGRESS_STEPS = [
  "Site execution",
  "Daily progress collection",
  "Verification & validation",
  "Schedule update",
  "Performance analysis",
  "Management dashboard",
];

export const DATA_FLOW = ["Capture", "Verify", "Update", "Analyze", "Report", "Decide"];

export const OUTPUTS_REPORTS = [
  "Daily progress report",
  "Look-ahead plan",
  "Weekly progress report",
  "S-curve & trend analysis",
  "Management dashboard",
];

export const REPORTING_PRINCIPLES = [
  { title: "Accuracy", body: "Measure what is executed, not what is expected" },
  { title: "Timeliness", body: "Daily capture, weekly reporting, timely decisions" },
  { title: "Transparency", body: "Clear visibility across all levels" },
  { title: "Accountability", body: "Ownership for performance and commitments" },
  { title: "Continuous improvement", body: "Learn, adapt, improve every week" },
];

// The Controls & QHSE page walks through these in order, from award to handover.
export const DELIVERY_STAGES = [
  {
    id: "preconstruction",
    title: "Preconstruction",
    lead: "Before mobilising, we study the job in detail, so problems are solved on paper rather than on site.",
    actions: [
      "Review drawings, specifications and BOQ; raise queries before work starts",
      "Site survey, levels and soil data checked against the design",
      "Method statements prepared for every major activity",
      "Approved sources fixed for steel, cement, aggregates and precast elements",
    ],
    records: ["Drawing query log", "Method statements", "Material approval register"],
    image: "cyclePlan",
  },
  {
    id: "planning",
    title: "Planning",
    lead: "One master programme, broken down until every crew knows what it must finish this week and today.",
    actions: [
      "Master programme with key milestones and S-curve as the baseline",
      "Building-by-building schedules with activity logic and resource plans",
      "2–8 week look-ahead plans to clear constraints before work fronts open",
      "Weekly targets committed with the site team; daily execution plans",
    ],
    records: ["Master schedule", "Look-ahead plan", "Constraint log"],
    image: "planningSchedule",
  },
  {
    id: "quality",
    title: "Quality",
    lead: "Quality is built in at every stage of the work, not checked once at the end.",
    actions: [
      "Inspection & Test Plans (ITP) and checklists for every activity",
      "Incoming materials inspected and tested in the site lab before use",
      "Hold points: reinforcement, formwork and concreting released only after QC sign-off",
      "Non-conformances raised as NCRs and tracked until closed",
    ],
    records: ["Inspection requests on Aconex", "Cube and material test reports", "NCR register"],
    image: "qualityInspection",
  },
  {
    id: "safety",
    title: "Safety",
    lead: "No one starts work on our sites until they have been screened, inducted and equipped.",
    actions: [
      "Pre-deployment screening and medical check for every worker",
      "Site EHS induction covering the client’s Core Five Safety Risks",
      "Required PPE issued; gate pass only after induction",
      "Daily toolbox talks, work permits and safety inspections",
    ],
    records: ["Induction register", "Permit-to-work log", "Safety inspection reports"],
    image: "safetyInduction",
  },
  {
    id: "monitoring",
    title: "Progress monitoring",
    lead: "Progress is measured from what is built on site, not from what was planned.",
    actions: [
      "Daily progress captured on site and verified by the planning team",
      "Schedule updated weekly; actuals compared against the baseline",
      "Variances and root causes identified, with corrective actions agreed",
      "Management dashboard and S-curves shared with the client",
    ],
    records: ["Daily progress report", "Weekly progress report", "S-curve & trend analysis"],
    image: "cycleMeasure",
  },
  {
    id: "handover",
    title: "Handover",
    lead: "We hand over buildings that are complete, documented and ready for the tenant.",
    actions: [
      "Final inspection with the client and PMC; punch list raised",
      "Snags closed and verified before handover",
      "Test certificates, approvals and as-built records compiled",
      "Full quality record available to the client on Aconex",
    ],
    records: ["Punch list closure", "As-built documentation", "Handover dossier"],
    image: "gallery7",
  },
] as const;
