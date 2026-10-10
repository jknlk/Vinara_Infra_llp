import type { PartnerCategory } from "@/lib/db";

const CATEGORIES: PartnerCategory[] = ["client", "pmc", "tenant"];

export function parsePartner(body: unknown): { category: PartnerCategory; name: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  if (!name) throw new Error("Name is required.");
  const category = CATEGORIES.find((c) => c === b.category);
  if (!category) throw new Error("Choose a valid group.");
  return { category, name };
}
