import { CONTROL_CYCLE } from "@/data/content/planning";

export default function ControlCycle() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      {CONTROL_CYCLE.map((stage, i) => (
        <div key={stage.title} className="relative">
          <div className="rounded-[4px] border border-navy-500 bg-navy-900 p-5">
            <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-body-l font-display font-bold text-ink">{stage.title}</h3>
            <p className="mt-1 text-caption text-grey-300">{stage.body}</p>
          </div>
          {i < CONTROL_CYCLE.length - 1 ? (
            <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-grey-300 sm:block" aria-hidden>
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
