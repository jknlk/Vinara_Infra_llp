import type { Building } from "@/data/buildings";
import StatusPill from "./StatusPill";

function formatArea(v: number) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
}

export default function BuildingRow({ index, building }: { index: number; building: Building }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 border-b border-navy-500 py-3 text-body last:border-b-0 sm:grid-cols-[2.5rem_1fr_9rem_auto]">
      <span className="tabular text-caption text-grey-300">{String(index).padStart(2, "0")}</span>
      <span className="text-ink">{building.name}</span>
      <span className="tabular text-right text-grey-300">{formatArea(building.builtUpSqft)}</span>
      <StatusPill status={building.status} label={building.statusLabel} className="justify-self-end" />
    </div>
  );
}
