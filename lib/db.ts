import { neon, neonConfig } from "@neondatabase/serverless";
import { GALLERY_ITEMS } from "@/data/content/gallery";
import { IMAGES } from "@/data/images";
import { PROJECTS } from "@/data/buildings";
import { OPEN_ROLES } from "@/data/content/careers";
import { homeSeed, type HomeData, type HomeKind } from "@/data/content/homeAdmin";

// Query over the project's own endpoint host rather than the driver's default api.<region> host,
// which some local DNS resolvers refuse to resolve.
neonConfig.fetchEndpoint = (host) => `https://${host}/sql`;

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

/* ------------------------------------------------------------------ types */

export type GalleryRow = {
  id: number;
  src: string;
  publicId: string | null;
  alt: string;
  title: string;
  description: string;
  categories: string[];
};

export type ProjectRow = {
  id: number;
  slug: string;
  name: string;
  client: string;
  location: string;
  description: string;
  plotAcres: number;
  buildingsCount: number;
  builtUpSqft: number;
  completed: number;
  wip: number;
  src: string | null;
  publicId: string | null;
};

export type JobStatus = "open" | "closed";

export type JobRow = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  status: JobStatus;
};

/* ---------------------------------------------------------- schema + seed */

const PROJECT_IMAGE: Record<string, string> = {
  "nela-1": "showcaseWarehouseAerial2",
  "nela-2": "showcaseSiteTeam",
  "bikaner-house": "showcaseBuildingFacade",
};

let ready: Promise<void> | null = null;

// Creates the tables on first use and seeds each once from the bundled static data.
export function ensureSchema() {
  ready ??= (async () => {
    const q = sql();
    await q`CREATE TABLE IF NOT EXISTS app_flags (key TEXT PRIMARY KEY)`;
    await q`CREATE TABLE IF NOT EXISTS gallery_items (
      id SERIAL PRIMARY KEY,
      src TEXT NOT NULL,
      public_id TEXT,
      alt TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      categories TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await q`CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      client TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      plot_acres DOUBLE PRECISION NOT NULL DEFAULT 0,
      buildings_count INT NOT NULL DEFAULT 0,
      built_up_sqft DOUBLE PRECISION NOT NULL DEFAULT 0,
      completed INT NOT NULL DEFAULT 0,
      wip INT NOT NULL DEFAULT 0,
      src TEXT,
      public_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await q`CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL DEFAULT 'Full-time',
      experience TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      responsibilities TEXT[] NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'open',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

    await q`CREATE TABLE IF NOT EXISTS home_items (
      id SERIAL PRIMARY KEY,
      kind TEXT NOT NULL,
      position INT NOT NULL DEFAULT 0,
      data JSONB NOT NULL DEFAULT '{}',
      public_id TEXT
    )`;

    const claim = async (key: string) =>
      (await q`INSERT INTO app_flags (key) VALUES (${key}) ON CONFLICT DO NOTHING RETURNING key`).length > 0;

    if (await claim("gallery_seeded")) {
      for (const item of GALLERY_ITEMS) {
        const img = IMAGES[item.imageKey];
        if (!img?.src) continue;
        await q`INSERT INTO gallery_items (src, alt, title, description, categories)
          VALUES (${img.src}, ${img.alt}, ${item.title}, ${item.description}, ${item.categories})`;
      }
    }
    // Gallery is now organised by project only: fold the old topic tags into a project.
    if (await claim("gallery_projects_v1")) {
      const remap: Record<string, string> = { "RMC Plant": "NELA 1", Quality: "NELA 2", Safety: "Bikaner House" };
      for (const [from, to] of Object.entries(remap)) {
        await q`UPDATE gallery_items SET categories = ARRAY[${to}]
          WHERE ${from} = ANY(categories) AND NOT (categories && ARRAY['NELA 1','NELA 2','Bikaner House'])`;
      }
      await q`UPDATE gallery_items SET categories = array_remove(array_remove(array_remove(categories, 'RMC Plant'), 'Quality'), 'Safety')`;
    }
    if (await claim("home_seeded")) {
      const seed = homeSeed();
      for (const kind of Object.keys(seed) as HomeKind[]) {
        let i = 0;
        for (const data of seed[kind]) {
          await q`INSERT INTO home_items (kind, position, data) VALUES (${kind}, ${i++}, ${JSON.stringify(data)}::jsonb)`;
        }
      }
    }
    if (await claim("projects_seeded")) {
      for (const p of PROJECTS) {
        const src = IMAGES[PROJECT_IMAGE[p.slug]]?.src ?? null;
        await q`INSERT INTO projects (slug, name, client, location, description, plot_acres, buildings_count, built_up_sqft, completed, wip, src)
          VALUES (${p.slug}, ${p.name}, ${p.client}, ${"Bengaluru"}, ${p.description}, ${p.plotAcres}, ${p.buildingsCount},
                  ${p.builtUpSqft}, ${p.completed}, ${p.wip}, ${src})`;
      }
    }
    if (await claim("jobs_seeded")) {
      for (const r of OPEN_ROLES) {
        await q`INSERT INTO jobs (title, department, location, type, experience, summary, responsibilities)
          VALUES (${r.title}, ${r.department}, ${r.location}, ${r.type}, ${r.experience}, ${r.summary}, ${r.responsibilities})`;
      }
    }
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

async function run<T = unknown>(fn: (q: ReturnType<typeof sql>) => Promise<unknown>): Promise<T[]> {
  await ensureSchema();
  return (await fn(sql())) as T[];
}

/* ---------------------------------------------------------------- gallery */

type GalleryRaw = {
  id: number;
  src: string;
  public_id: string | null;
  alt: string;
  title: string;
  description: string;
  categories: string[];
};

const mapGallery = (r: GalleryRaw): GalleryRow => ({
  id: r.id,
  src: r.src,
  publicId: r.public_id,
  alt: r.alt,
  title: r.title,
  description: r.description,
  categories: r.categories,
});

export async function listGallery() {
  return (await run<GalleryRaw>((q) => q`SELECT * FROM gallery_items ORDER BY id`)).map(mapGallery);
}

export async function getGalleryItem(id: number) {
  const rows = await run<GalleryRaw>((q) => q`SELECT * FROM gallery_items WHERE id = ${id}`);
  return rows[0] ? mapGallery(rows[0]) : null;
}

export async function insertGalleryItem(v: Omit<GalleryRow, "id">) {
  const rows = await run<GalleryRaw>(
    (q) => q`INSERT INTO gallery_items (src, public_id, alt, title, description, categories)
      VALUES (${v.src}, ${v.publicId}, ${v.alt}, ${v.title}, ${v.description}, ${v.categories}) RETURNING *`
  );
  return mapGallery(rows[0]);
}

export async function updateGalleryItem(id: number, v: Omit<GalleryRow, "id">) {
  const rows = await run<GalleryRaw>(
    (q) => q`UPDATE gallery_items SET src = ${v.src}, public_id = ${v.publicId}, alt = ${v.alt},
      title = ${v.title}, description = ${v.description}, categories = ${v.categories}
      WHERE id = ${id} RETURNING *`
  );
  return rows[0] ? mapGallery(rows[0]) : null;
}

export async function deleteGalleryItem(id: number) {
  await run((q) => q`DELETE FROM gallery_items WHERE id = ${id}`);
}

/* --------------------------------------------------------------- projects */

type ProjectRaw = {
  id: number;
  slug: string;
  name: string;
  client: string;
  location: string;
  description: string;
  plot_acres: number;
  buildings_count: number;
  built_up_sqft: number;
  completed: number;
  wip: number;
  src: string | null;
  public_id: string | null;
};

const mapProject = (r: ProjectRaw): ProjectRow => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  client: r.client,
  location: r.location,
  description: r.description,
  plotAcres: r.plot_acres,
  buildingsCount: r.buildings_count,
  builtUpSqft: r.built_up_sqft,
  completed: r.completed,
  wip: r.wip,
  src: r.src,
  publicId: r.public_id,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";

export type ProjectInput = Omit<ProjectRow, "id" | "slug">;

export async function listProjects() {
  return (await run<ProjectRaw>((q) => q`SELECT * FROM projects ORDER BY id`)).map(mapProject);
}

export async function getProject(id: number) {
  const rows = await run<ProjectRaw>((q) => q`SELECT * FROM projects WHERE id = ${id}`);
  return rows[0] ? mapProject(rows[0]) : null;
}

export async function insertProject(v: ProjectInput) {
  let slug = slugify(v.name);
  const taken = await run((q) => q`SELECT 1 FROM projects WHERE slug = ${slug}`);
  if (taken.length) slug = `${slug}-${Date.now().toString(36)}`;
  const rows = await run<ProjectRaw>(
    (q) => q`INSERT INTO projects (slug, name, client, location, description, plot_acres, buildings_count, built_up_sqft, completed, wip, src, public_id)
      VALUES (${slug}, ${v.name}, ${v.client}, ${v.location}, ${v.description}, ${v.plotAcres}, ${v.buildingsCount},
              ${v.builtUpSqft}, ${v.completed}, ${v.wip}, ${v.src}, ${v.publicId}) RETURNING *`
  );
  return mapProject(rows[0]);
}

export async function updateProject(id: number, v: ProjectInput) {
  const rows = await run<ProjectRaw>(
    (q) => q`UPDATE projects SET name = ${v.name}, client = ${v.client}, location = ${v.location},
      description = ${v.description}, plot_acres = ${v.plotAcres}, buildings_count = ${v.buildingsCount},
      built_up_sqft = ${v.builtUpSqft}, completed = ${v.completed}, wip = ${v.wip}, src = ${v.src}, public_id = ${v.publicId}
      WHERE id = ${id} RETURNING *`
  );
  return rows[0] ? mapProject(rows[0]) : null;
}

export async function deleteProject(id: number) {
  await run((q) => q`DELETE FROM projects WHERE id = ${id}`);
}

/* ------------------------------------------------------------------- jobs */

export type JobInput = Omit<JobRow, "id">;

const mapJob = (r: JobRow): JobRow => ({ ...r, status: r.status === "closed" ? "closed" : "open" });

export async function listJobs(onlyOpen = false) {
  const rows = await run<JobRow>((q) =>
    onlyOpen ? q`SELECT * FROM jobs WHERE status = 'open' ORDER BY id` : q`SELECT * FROM jobs ORDER BY id`
  );
  return rows.map(mapJob);
}

export async function insertJob(v: JobInput) {
  const rows = await run<JobRow>(
    (q) => q`INSERT INTO jobs (title, department, location, type, experience, summary, responsibilities, status)
      VALUES (${v.title}, ${v.department}, ${v.location}, ${v.type}, ${v.experience}, ${v.summary}, ${v.responsibilities}, ${v.status})
      RETURNING *`
  );
  return mapJob(rows[0]);
}

export async function updateJob(id: number, v: JobInput) {
  const rows = await run<JobRow>(
    (q) => q`UPDATE jobs SET title = ${v.title}, department = ${v.department}, location = ${v.location}, type = ${v.type},
      experience = ${v.experience}, summary = ${v.summary}, responsibilities = ${v.responsibilities}, status = ${v.status}
      WHERE id = ${id} RETURNING *`
  );
  return rows[0] ? mapJob(rows[0]) : null;
}

export async function deleteJob(id: number) {
  await run((q) => q`DELETE FROM jobs WHERE id = ${id}`);
}

/* ------------------------------------------------------------- home items */

export type HomeRow = { id: number; kind: HomeKind; data: HomeData; publicId: string | null };
type HomeRaw = { id: number; kind: HomeKind; data: HomeData; public_id: string | null };
const mapHome = (r: HomeRaw): HomeRow => ({ id: r.id, kind: r.kind, data: r.data, publicId: r.public_id });

export async function listHome(kind: HomeKind) {
  return (await run<HomeRaw>((q) => q`SELECT * FROM home_items WHERE kind = ${kind} ORDER BY position, id`)).map(mapHome);
}

export async function getHome(id: number) {
  const rows = await run<HomeRaw>((q) => q`SELECT * FROM home_items WHERE id = ${id}`);
  return rows[0] ? mapHome(rows[0]) : null;
}

export async function insertHome(kind: HomeKind, data: HomeData, publicId: string | null) {
  const rows = await run<HomeRaw>(
    (q) => q`INSERT INTO home_items (kind, position, data, public_id)
      VALUES (${kind}, COALESCE((SELECT MAX(position) + 1 FROM home_items WHERE kind = ${kind}), 0), ${JSON.stringify(data)}::jsonb, ${publicId})
      RETURNING *`
  );
  return mapHome(rows[0]);
}

export async function updateHome(id: number, data: HomeData, publicId: string | null) {
  const rows = await run<HomeRaw>(
    (q) => q`UPDATE home_items SET data = ${JSON.stringify(data)}::jsonb, public_id = ${publicId} WHERE id = ${id} RETURNING *`
  );
  return rows[0] ? mapHome(rows[0]) : null;
}

export async function deleteHome(id: number) {
  await run((q) => q`DELETE FROM home_items WHERE id = ${id}`);
}
