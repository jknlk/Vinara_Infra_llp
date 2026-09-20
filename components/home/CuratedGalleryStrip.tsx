import Image from "next/image";
import { PROJECTS_SHOWCASE } from "@/data/content/projectsShowcase";
import { IMAGES } from "@/data/images";

const STRIP = PROJECTS_SHOWCASE.slice(0, 7);
const ARC_DEGREES = 46;

export default function CuratedGalleryStrip() {
  const step = ARC_DEGREES / (STRIP.length - 1);

  return (
    <section className="bg-surface pb-24">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-navy-900 py-16">
          <span className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-ink/70 px-4 py-1.5 text-caption font-semibold text-white backdrop-blur">
            23 Buildings · 3 Parks
          </span>

          <div
            className="mx-auto flex items-center justify-center gap-3 px-6"
            style={{ perspective: "1400px" }}
          >
            {STRIP.map((p, i) => {
              const angle = -ARC_DEGREES / 2 + step * i;
              const image = IMAGES[p.imageKey];
              return (
                <div
                  key={p.id}
                  className="group relative h-64 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-xl transition-[filter] duration-500 hover:brightness-110 sm:h-80 sm:w-48"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(-40px) scale(${1 - Math.abs(angle) / 140})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-full border border-white/15 bg-ink/80 px-3 py-1 text-center text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.name}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-caption text-grey-300">
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Tap</span> a frame · every image links back to a real, tracked building
          </p>
        </div>
      </div>
    </section>
  );
}
