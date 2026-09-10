import { CONTACT } from "@/data/content/site";

export default function LocationMap({
  light = false,
  heightClassName = "h-[360px] w-full grayscale md:h-[440px]",
}: {
  light?: boolean;
  heightClassName?: string;
}) {
  const { lat, lng } = CONTACT.mapCenter;
  const d = 0.01;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className={`overflow-hidden rounded-2xl border ${light ? "border-[#E3EAF4]" : "border-navy-500"}`}>
      <iframe
        title="Vinara Infra LLP head office — Yelahanka, Bengaluru"
        src={src}
        className={heightClassName}
        loading="lazy"
      />
    </div>
  );
}
