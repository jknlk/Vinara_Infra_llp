import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import GalleryGrid, { type GalleryDisplayItem } from "@/components/gallery/GalleryGrid";
import { GALLERY_ITEMS } from "@/data/content/gallery";
import { IMAGES } from "@/data/images";
import { listGallery, listProjects } from "@/lib/db";
import { GALLERY_CATEGORIES } from "@/data/content/gallery";

export const metadata: Metadata = {
  title: "Gallery — Vinara Infra LLP",
  description: "Drone captures, in-progress shots and completed builds from live Vinara sites.",
};

export const dynamic = "force-dynamic";

async function loadItems(): Promise<GalleryDisplayItem[]> {
  try {
    const rows = await listGallery();
    return rows.map((r) => ({
      id: r.id,
      src: r.src,
      alt: r.alt,
      title: r.title,
      description: r.description,
      categories: r.categories,
    }));
  } catch {
    // Database unavailable — fall back to the bundled gallery so the page never breaks.
    return GALLERY_ITEMS.flatMap((i) => {
      const img = IMAGES[i.imageKey];
      return img?.src
        ? [{ id: i.imageKey, src: img.src, alt: img.alt, title: i.title, description: i.description, categories: i.categories }]
        : [];
    });
  }
}

async function loadProjectNames() {
  try {
    return (await listProjects()).map((p) => p.name);
  } catch {
    return GALLERY_CATEGORIES.filter((c) => c !== "All") as string[];
  }
}

export default async function GalleryPage() {
  const [items, projectNames] = await Promise.all([loadItems(), loadProjectNames()]);
  return (
    <>
      <section className="bg-[#f2f7fc] pb-10 pt-28 md:pt-32">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 text-label uppercase tracking-[0.14em] text-[#3e86d0]">
              <span className="h-px w-10 bg-[#3e86d0]" />
              Gallery
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-[#0f2b57] md:text-7xl">
              From the <span className="text-[#3e86d0]">field.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-body-l text-[#5a6b84]">
              Drone captures, in-progress shots and completed builds from live Vinara sites.
            </p>
            <p className="tabular mt-4 font-display text-3xl font-bold text-[#0f2b57]">
              {items.length}
              <span className="ml-2 text-body font-normal text-[#5a6b84]">photos</span>
            </p>
          </div>
        </Container>
      </section>
      <section className="overflow-x-hidden bg-white">
        <GalleryGrid items={items} projectNames={projectNames} />
      </section>
    </>
  );
}
