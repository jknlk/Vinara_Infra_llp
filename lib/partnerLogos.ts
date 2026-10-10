export type PartnerLogo = { src: string; width: number; height: number };

// Logo files live in public/logos. Keys are partner names lowercased with everything
// but letters and digits removed, so "Turner & Townsend" matches "turnertownsend".
// A partner without an entry here is shown as a wordmark instead.
const LOGOS: Record<string, PartnerLogo> = {
  amazon: { src: "/logos/amazon.svg", width: 603, height: 182 },
  dhl: { src: "/logos/dhl.svg", width: 176, height: 39 },
  cbre: { src: "/logos/cbre.svg", width: 99, height: 25 },
  turnertownsend: { src: "/logos/turner-townsend.svg", width: 300, height: 43 },
};

export function partnerLogo(name: string): PartnerLogo | undefined {
  return LOGOS[name.toLowerCase().replace(/[^a-z0-9]/g, "")];
}
