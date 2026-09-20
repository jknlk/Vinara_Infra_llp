import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CareersContent from "@/components/careers/CareersContent";
import { OPEN_ROLES, type JobRole } from "@/data/content/careers";
import { listJobs } from "@/lib/db";

export const metadata: Metadata = {
  title: "Careers — Vinara Infra LLP",
  description: "Open engineering, planning, quality and commercial roles across Vinara's live warehousing and industrial sites.",
};

export const dynamic = "force-dynamic";

async function loadRoles(): Promise<JobRole[]> {
  try {
    const jobs = await listJobs(true);
    return jobs.map(({ title, department, location, type, experience, summary, responsibilities }) => ({
      title,
      department,
      location,
      type,
      experience,
      summary,
      responsibilities,
    }));
  } catch {
    // Database unavailable — fall back to the bundled roles so the page never breaks.
    return OPEN_ROLES;
  }
}

export default async function CareersPage() {
  const roles = await loadRoles();
  const departments = new Set(roles.map((r) => r.department).filter(Boolean)).size;
  return (
    <>
      <CareersHero openRoles={roles.length} departments={departments} />
      <CareersContent roles={roles} />
    </>
  );
}
