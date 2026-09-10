import type { BuildingStatus } from "@/data/buildings";

const STATUS_STYLES: Record<BuildingStatus, string> = {
  completed: "bg-green-500/15 text-green-500 border-green-500/40",
  wip: "bg-sky-400/15 text-sky-200 border-sky-400/40",
  upcoming: "bg-orange-500/15 text-orange-300 border-orange-500/40",
};

export default function StatusPill({
  status,
  label,
  className = "",
}: {
  status: BuildingStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-caption font-medium ${STATUS_STYLES[status]} ${className}`}
    >
      {label}
    </span>
  );
}
