import type { CSSProperties } from "react";

export type CurvedPersonSlot = {
  src: string;
  alt?: string;
  name?: string;
  role?: string;
};

const DEFAULT_IMAGES: CurvedPersonSlot[] = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/person-${i + 1}.jpg`,
  alt: `Team member ${i + 1}`,
}));

// Every length below is in `--u` units (1vw, clamped), so the whole scene
// scales with the viewport and the curvature never flattens.
//
// Geometry is fit to the reference: portraits sit on the inside of a cylinder
// of radius RADIUS and the camera stands inside it, CAMERA behind the axis.
// That is what makes each card a slanted quad — small and square-on at the
// centre, tall and raked at the edges — with the top and bottom edges curving
// symmetrically.
const UNIT = "clamp(8.5px, 1vw, 17px)";
const RADIUS = 50;
const CAMERA = 40.9; // perspective distance; the ring axis sits on the z=0 plane
const CARD_W = 20;
const CARD_H = 30;
const CARD_RADIUS = 2.4;
const MIN_CARDS = 12; // fewer than this leaves visible holes in the ring
const SECONDS_PER_CARD = 4.5;
// Stage extents above/below the portrait centre line. The vw cap takes over
// on small screens, where `--u` bottoms out and only the short centre cards of
// the ring are in view.
const STAGE_TOP = "min(calc(17.5 * var(--u)), 19vw)";
const STAGE_BOTTOM_IMAGE = "min(calc(17.5 * var(--u)), 19vw)";
const STAGE_BOTTOM_CAPTION = "min(calc(24 * var(--u)), 26vw)";

const u = (n: number) => `calc(${n} * var(--u))`;

/**
 * An endlessly rotating ring of portraits seen from inside: cards drift
 * sideways along a concave arc, growing and tilting as they approach the
 * edges, where they fade out. The set of people is repeated to close the ring.
 *
 * Swap `images` for real photos. Pass `name`/`role` on each slot to show a
 * caption under its card; the caption travels with the card.
 */
export default function CurvedPeopleGallery({
  images = DEFAULT_IMAGES,
  className = "",
}: {
  images?: CurvedPersonSlot[];
  className?: string;
}) {
  const people = images.filter((img) => img.src.trim().length > 0);
  const n = people.length;

  if (n === 0) {
    return null;
  }

  const copies = Math.ceil(MIN_CARDS / n);
  const total = n * copies;
  const step = 360 / total;
  // Keep the card-to-gap ratio constant when the ring holds more than 14 cards.
  const radius = Math.max(RADIUS, (RADIUS * total) / 14);
  const showCaptions = people.some((img) => img.name || img.role);
  const stageBottom = showCaptions ? STAGE_BOTTOM_CAPTION : STAGE_BOTTOM_IMAGE;

  const cards = Array.from({ length: total }, (_, i) => ({
    ...people[i % n],
    angle: (i + 0.5) * step,
    duplicate: i >= n,
  }));

  return (
    <div
      className={`curved-stage relative left-1/2 w-screen -translate-x-1/2 overflow-hidden ${className}`}
      style={
        {
          "--u": UNIT,
          "--stage-top": STAGE_TOP,
          height: `calc(var(--stage-top) + ${stageBottom})`,
          maskImage: "linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
        } as CSSProperties
      }
    >
      {/* centred on the vanishing point, so no perspective-origin is needed (Safari mislays it) */}
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: "calc(2 * var(--stage-top))", perspective: u(CAMERA) }}
      >
        <div
          className="curved-ring absolute left-1/2 top-1/2 h-0 w-0"
          style={
            {
              "--ring-loop": `${360 / copies}deg`,
              "--duration": `${n * SECONDS_PER_CARD}s`,
            } as CSSProperties
          }
        >
          {cards.map((c, i) => (
            <figure
              key={i}
              aria-hidden={c.duplicate || undefined}
              className="absolute m-0"
              style={{
                width: u(CARD_W),
                left: u(-CARD_W / 2),
                top: u(-CARD_H / 2),
                // negative, so the people read left to right in the order given
                transform: `rotateY(${-c.angle}deg) translateZ(${u(-radius)})`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.src}
                alt={c.duplicate ? "" : (c.alt ?? c.name ?? "")}
                draggable={false}
                className="block w-full object-cover"
                style={{ height: u(CARD_H), borderRadius: u(CARD_RADIUS) }}
              />
              {(c.name || c.role) && (
                <figcaption className="text-center" style={{ marginTop: u(1.4) }}>
                  {c.name && (
                    <p className="truncate font-semibold text-ink" style={{ fontSize: u(1.9), lineHeight: 1.25 }}>
                      {c.name}
                    </p>
                  )}
                  {c.role && (
                    <p className="text-grey-500" style={{ fontSize: u(1.6), lineHeight: 1.25 }}>
                      {c.role}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
