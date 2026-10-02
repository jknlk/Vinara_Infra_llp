import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { IMAGES } from "@/data/images";
import { PROGRESS_STEPS } from "@/data/content/planning";

// One photo per progress step, in the same order as PROGRESS_STEPS.
const STEP_IMAGES = [
  IMAGES.cycleExecute,
  IMAGES.cycleMeasure,
  IMAGES.planningSchedule,
  IMAGES.cyclePlan,
  IMAGES.cycleAnalyze,
  IMAGES.cycleAct,
];

export default function ProgressMarquee() {
  return (
    <div className="relative mt-10 w-full">
      <Marquee className="[--gap:1.25rem] [--duration:45s]" pauseOnHover repeat={3}>
        {PROGRESS_STEPS.map((step, i) => {
          const img = STEP_IMAGES[i];
          return (
            <div
              key={step}
              className="group relative aspect-[4/5] w-64 shrink-0 overflow-hidden rounded-2xl border border-[#0f2b57]/15 bg-[#0f2b57] sm:w-72"
            >
              <Image
                src={img.src ?? ""}
                alt={img.alt}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b57] via-[#0f2b57]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="tabular font-display text-3xl font-bold text-[#7fb4e8]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 font-display text-body-l font-bold text-white">{step}</p>
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
