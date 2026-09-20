import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listGallery, listHome, listJobs, listProjects } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [gallery, projects, jobs, hero_stat, featured, leader, work] = await Promise.all([
    listGallery(),
    listProjects(),
    listJobs(),
    listHome("hero_stat"),
    listHome("featured"),
    listHome("leader"),
    listHome("work"),
  ]);
  return <AdminShell gallery={gallery} projects={projects} jobs={jobs} home={{ hero_stat, featured, leader, work }} />;
}
