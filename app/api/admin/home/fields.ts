import { HOME_KINDS, type HomeData, type HomeKind } from "@/data/content/homeAdmin";

// Reads only the fields declared for this section, so stray form keys never reach the database.
export function parseHomeForm(kind: HomeKind, form: FormData): HomeData {
  const cfg = HOME_KINDS[kind];
  const data: HomeData = {};
  for (const f of cfg.fields) data[f.key] = String(form.get(f.key) ?? "").trim();
  if (!data[cfg.primary]) throw new Error("Please fill in the required fields.");
  if (cfg.hasImage) data.image = String(form.get("url") ?? "").trim();
  return data;
}
