import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import { DELIVERY_STAGES } from "@/data/content/home";

export default function ConstructionTimeline() {
  const steps: Step[] = DELIVERY_STAGES.map((stage, i) => ({
    title: stage.title,
    description: `${stage.body}.`,
    colorTheme: "blue",
    colors:
      i % 2 === 0
        ? { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" }
        : { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
  }));

  return (
    <section className="bg-white pb-24 pt-12">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Construction Timeline
        </div>
        <h2 className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">Ten stages. </span>
          <span className="text-blue-600">One promise.</span>
        </h2>
      </div>

      <HowItWorks features={steps} className="!bg-white mt-8 !max-w-[1680px] !mx-auto" />
    </section>
  );
}
