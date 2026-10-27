import { CLIENTS, PMC_PARTNERS, TENANTS } from "@/data/content/site";
import { listPartners, type PartnerCategory } from "@/lib/db";
import { partnerLogo } from "@/lib/partnerLogos";

export const PARTNER_GROUPS: { category: PartnerCategory; label: string }[] = [
  { category: "client", label: "Clients" },
  { category: "pmc", label: "PMC partners" },
  { category: "tenant", label: "Tenants" },
];

export type PartnerGroup = { label: string; names: string[] };

// Reads the groups from the database; falls back to the bundled lists if it is unavailable.
export async function loadPartnerGroups(): Promise<PartnerGroup[]> {
  const fallback: Record<PartnerCategory, readonly string[]> = { client: CLIENTS, pmc: PMC_PARTNERS, tenant: TENANTS };
  try {
    const rows = await listPartners();
    return PARTNER_GROUPS.map((g) => ({
      label: g.label,
      names: rows.filter((r) => r.category === g.category).map((r) => r.name),
    }));
  } catch {
    return PARTNER_GROUPS.map((g) => ({ label: g.label, names: [...fallback[g.category]] }));
  }
}

export type PartnerEntry = { name: string; logo: string | null; showName: boolean; showLogo: boolean };

// Uploaded logo first, then the bundled file in public/logos. Entries with both hidden are dropped.
export async function loadPartnerEntries(): Promise<PartnerEntry[]> {
  let entries: PartnerEntry[];
  try {
    entries = (await listPartners()).map((r) => ({
      name: r.name,
      logo: r.logoSrc ?? partnerLogo(r.name)?.src ?? null,
      showName: r.showName,
      showLogo: r.showLogo,
    }));
  } catch {
    entries = [...CLIENTS, ...PMC_PARTNERS, ...TENANTS].map((name) => ({
      name,
      logo: partnerLogo(name)?.src ?? null,
      showName: true,
      showLogo: true,
    }));
  }
  return entries.filter((e) => (e.showLogo && e.logo) || e.showName);
}
