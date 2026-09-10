import Image from "next/image";
import type { ImageSlot } from "@/data/images";

const RATIO_CLASS: Record<string, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

export default function SiteImage({
  slot,
  image,
  ratio = "16/9",
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  slot: string;
  image?: ImageSlot;
  ratio?: keyof typeof RATIO_CLASS;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ratioClass = RATIO_CLASS[ratio] ?? RATIO_CLASS["16/9"];

  if (!image?.src) {
    return (
      <div
        className={`relative ${ratioClass} ${className} grid-rule border border-navy-500 bg-navy-900`}
      >
        <span className="absolute left-4 top-4 rounded-full border border-navy-500 bg-ink/60 px-3 py-1 text-label uppercase tracking-[0.08em] text-grey-300">
          {slot}
        </span>
      </div>
    );
  }

  return (
    <figure className={`relative ${ratioClass} ${className} overflow-hidden rounded-2xl border border-navy-500`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {image.caption ? (
        <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-caption text-white backdrop-blur">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
