"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Briefcase, Building2, Home, Images, LayoutGrid, LogOut, Star, Users } from "lucide-react";
import type { GalleryRow, HomeRow, JobRow, ProjectRow } from "@/lib/db";
import type { HomeKind } from "@/data/content/homeAdmin";
import AdminHome from "./AdminHome";
import AdminGallery from "./AdminGallery";
import AdminProjects from "./AdminProjects";
import AdminCareers from "./AdminCareers";

type Section = "gallery" | "projects" | "careers" | "home";

const HOME_TABS = [
  { id: "hero_stat", text: "Stats", Icon: BarChart3 },
  { id: "featured", text: "Featured projects", Icon: Star },
  { id: "leader", text: "Leadership", Icon: Users },
  { id: "work", text: "Our work", Icon: LayoutGrid },
] as const;

const SECTIONS = [
  { id: "gallery", text: "Gallery", Icon: Images },
  { id: "projects", text: "Projects", Icon: Building2 },
  { id: "careers", text: "Careers", Icon: Briefcase },
  { id: "home", text: "Home", Icon: Home },
] as const;

export default function AdminShell({
  gallery,
  projects,
  jobs,
  home,
}: {
  gallery: GalleryRow[];
  projects: ProjectRow[];
  jobs: JobRow[];
  home: Record<HomeKind, HomeRow[]>;
}) {
  const router = useRouter();
  const [projectList, setProjectList] = useState(projects);
  const [homeTab, setHomeTab] = useState<HomeKind>("hero_stat");
  const [section, setSection] = useState<Section>("gallery");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold">Admin</h1>
        <span className="text-caption text-[#5a6b84]">Vinara Infra LLP</span>
        <button onClick={logout} className="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-caption hover:bg-white">
          <LogOut size={16} /> Log out
        </button>
      </header>

      <nav className="mt-5 flex flex-wrap gap-x-2 border-b border-[#0f2b57]/15">
        {SECTIONS.map(({ id, text, Icon }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body font-medium ${
              section === id ? "border-[#3e86d0] text-[#0f2b57]" : "border-transparent text-[#5a6b84] hover:text-[#0f2b57]"
            }`}
          >
            <Icon size={18} /> {text}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        <div hidden={section !== "gallery"}>
          <AdminGallery initialItems={gallery} projectNames={projectList.map((p) => p.name)} />
        </div>
        <div hidden={section !== "projects"}>
          <AdminProjects initialItems={projects} onChange={setProjectList} />
        </div>
        <div hidden={section !== "careers"}>
          <AdminCareers initialItems={jobs} />
        </div>
        <div hidden={section !== "home"}>
          <div className="flex flex-wrap gap-2">
            {HOME_TABS.map(({ id, text, Icon }) => (
              <button
                key={id}
                onClick={() => setHomeTab(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-caption font-medium ${
                  homeTab === id ? "bg-[#0f2b57] text-white" : "border border-[#0f2b57]/20 hover:border-[#0f2b57]"
                }`}
              >
                <Icon size={15} /> {text}
              </button>
            ))}
          </div>
          <div className="mt-6">
            {(Object.keys(home) as HomeKind[]).map((k) => (
              <div key={k} hidden={homeTab !== k}>
                <AdminHome kind={k} initialItems={home[k]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
