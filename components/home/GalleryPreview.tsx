import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/data/images";

const ROW_ONE = ["showcaseWarehouseAerial", "showcaseContainerYard", "galleryPrecastLift", "showcaseWarehouseAerial2"];
const ROW_TWO_LEFT = ["showcaseRacking", "galleryPrecastLift", "showcaseForklift", "showcaseScaffold"];
const ROW_TWO_RIGHT = "galleryCityCranes";

function Tile({ imageKey, className = "" }: { imageKey: string; className?: string }) {
  const img = IMAGES[imageKey];
  if (!img?.src) return null;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
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

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ROW_ONE.map((key) => (
            <Tile key={key} imageKey={key} className="aspect-square" />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {ROW_TWO_LEFT.map((key, i) => (
              <Tile key={key + i} imageKey={key} className="aspect-[4/3]" />
            ))}
          </div>
          <Tile imageKey={ROW_TWO_RIGHT} className="col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-auto" />
        </div>
      </div>
    </section>
  );
}
