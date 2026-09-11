import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { IMAGES } from "@/data/images";

const STRIP = [
  "portraitWarehouseRacking",
  "portraitTowerCrane",
  "portraitShippingContainers",
  "portraitForklift",
  "portraitScaffoldWorker",
  "portraitAerialContainerYard",
  "portraitScaffoldWorkers",
  "portraitHardHatWorker",
] as const;

const LOOP = [...STRIP, ...STRIP];

function MarqueeItem({ imageKey }: { imageKey: string }) {
  const img = IMAGES[imageKey];
  if (!img?.src) return null;
  return (
    <div className="group/item relative aspect-[9/16] w-36 flex-shrink-0 overflow-hidden rounded-2xl sm:w-44 lg:w-52">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 30vw, 15vw"
        className="object-cover transition-transform duration-500 group-hover/item:scale-105"
      />
    </div>
  );
}

export default function GalleryPreview() {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-300">
              <span className="h-px w-6 bg-blue-500" />
              Gallery
            </div>
            <h2 className="mt-4 text-display-l font-display leading-[1.05]">
              <span className="text-white">From the </span>
              <span className="text-sky-400">field.</span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-body-l text-grey-300">
              Drone captures, in-progress shots and completed builds from live Vinara sites.
            </p>
            <Link
              href="/gallery"
              className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold text-sky-200 hover:text-sky-400"
            >
              View full gallery
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative mt-16 w-full pb-4">
          <div className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-900 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-900 to-transparent sm:w-24" />

            <div className="animate-marquee flex w-max items-stretch gap-4 px-4 group-hover:[animation-play-state:paused]">
              {LOOP.map((key, i) => (
                <MarqueeItem key={`${key}-${i}`} imageKey={key} />
              ))}
            </div>
          </div>

          <div className="absolute -top-4 right-8 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-[0_6px_20px_rgba(0,0,0,0.25)] sm:right-16">
            <Building2 size={14} className="text-blue-600" /> 23 buildings
          </div>
          <div className="absolute bottom-8 left-8 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.4)] sm:left-16">
            <Image src="/vinara-logo-transparent.png" alt="Vinara Infra LLP" width={28} height={28} className="h-7 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
