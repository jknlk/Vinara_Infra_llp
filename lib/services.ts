import { loadHome } from "@/lib/homeContent";

export type Service = {
  slug: string;
  title: string;
  body: string;
  items: string[];
  reference: string;
  image: { src: string; alt: string };
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "service";

// Services are edited in Admin → Services.
export async function loadServices(): Promise<Service[]> {
  const seen = new Set<string>();
  return (await loadHome("service")).map((d) => {
    let slug = slugify(d.title ?? "");
    while (seen.has(slug)) slug += "-2";
    seen.add(slug);
    return {
      slug,
      title: d.title ?? "",
      body: d.body ?? "",
      items: (d.items ?? "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean),
      reference: d.reference ?? "",
      image: { src: d.image ?? "", alt: d.title ?? "" },
    };
  });
}
