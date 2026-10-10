import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listBuildingPhotos, listGallery, listHome, listJobs, listPartners, listProjects } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [gallery, projects, buildingPhotos, jobs, partners, hero_stat, featured, leader, work] = await Promise.all([
    listGallery(),
    listProjects(),
    listBuildingPhotos(),
    listJobs(),
    listPartners(),
    listHome("hero_stat"),
    listHome("featured"),
    listHome("leader"),
    listHome("work"),
  ]);
  return <AdminShell gallery={gallery} projects={projects} buildingPhotos={buildingPhotos} jobs={jobs} partners={partners} home={{ hero_stat, featured, leader, work }} />;
}
