import { PROJECTS } from "@/data/buildings";
import { layoutBuildings } from "./layout";

const STATUS_HEX: Record<string, string> = {
  completed: "#1e7a4b",
  wip: "#f2841f",
  upcoming: "#12386f",
};

export default function SitePoster({ slug = "nela-1" }: { slug?: string }) {
  const project = PROJECTS.find((p) => p.slug === slug) ?? PROJECTS[0];
  const laid = layoutBuildings(project.buildings);
  const scale = 14;
  const w = 640;
  const h = 420;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" role="img" aria-label={`Static site-plan illustration of ${project.name}`}>
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#12386f" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="#050f24" />
      <rect width={w} height={h} fill="url(#grid)" />
      {laid.map((b) => {
        const x = w / 2 + b.x * scale - (b.width * scale) / 2;
        const y = h / 2 + b.z * scale - (b.depth * scale) / 2;
        return (
          <rect
            key={b.id}
            x={x}
            y={y}
            width={b.width * scale}
            height={b.depth * scale}
            fill={STATUS_HEX[b.status]}
            fillOpacity={b.status === "upcoming" ? 0.2 : 0.85}
            stroke="#3e86d0"
            strokeWidth={0.75}
          />
        );
      })}
    </svg>
  );
}
