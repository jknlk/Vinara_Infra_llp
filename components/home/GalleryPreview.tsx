import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { loadHome } from "@/lib/homeContent";
import type { HomeData } from "@/data/content/homeAdmin";

function MarqueeCard({ item }: { item: HomeData }) {
  if (!item.image) return null;
  return (
    <div className="group/item relative z-0 flex w-64 flex-shrink-0 origin-top flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgba(13,56,84,0.25)] transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(13,56,84,0.45)] sm:w-72">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 60vw, 300px"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="truncate text-caption font-semibold text-ink">{item.title}</p>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover/item:bg-blue-600 group-hover/item:text-white">
          <ArrowUpRight size={13} />
        </span>
      </div>
      <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover/item:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="space-y-1 border-t border-[#E3EAF4] px-4 py-3">
            <div className="flex items-center justify-between text-caption">
              <span className="text-grey-500">Category</span>
              <span className="font-medium text-ink">{item.category}</span>
            </div>
            <p className="text-caption text-grey-500">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function GalleryPreview() {
  const items = await loadHome("work");
  const LOOP = [...items, ...items];
  return (
    <section className="bg-white pb-24 pt-4">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="relative mx-2 sm:mx-8 lg:mx-14">
          {/* single blue backdrop spanning behind the heading and the whole row, incl. gaps between cards */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-navy-700 shadow-[0_24px_60px_-16px_rgba(14,156,186,0.55)]">
            <span className="absolute -left-6 -top-10 h-28 w-28 rounded-full bg-white/10" />
            <span className="absolute -right-10 top-1/3 h-32 w-32 rounded-full bg-white/5" />
          </div>

          <div className="relative z-10 pt-10 text-center sm:pt-12">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/15">
              <Sparkles size={22} className="text-white" />
            </div>
            <h2 className="text-display-m font-display font-bold text-white">Our Work</h2>
            <p className="mt-2 text-body text-sky-100">A selection of signature projects</p>
          </div>

          <div className="relative z-10 mt-2 pb-10">
            <div className="relative left-1/2 w-screen -translate-x-1/2">
              <div className="group relative w-full overflow-x-hidden overflow-y-visible py-8">
                <div className="animate-marquee flex w-max items-start gap-6 px-4 group-hover:[animation-play-state:paused]">
                  {LOOP.map((item, i) => (
                    <MarqueeCard key={`${item.title}-${i}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {items.slice(0, 5).map((item, i) => (
                <span
                  key={`${item.title}-${i}`}
                  className={`h-1.5 rounded-full ${i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>

            <Link
              href="/gallery"
              aria-label="View full gallery"
              className="absolute bottom-4 right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-blue-600 shadow-[0_10px_30px_-8px_rgba(10,30,45,0.45)] transition-transform hover:scale-105 hover:bg-sky-100 sm:right-6"
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
