interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

// Renders `repeat` copies of `children` back to back and animates the whole
// row (or column) by exactly one copy's width, looping seamlessly. Speed and
// spacing are set via the --duration/--gap custom properties so callers can
// override them with e.g. className="[--duration:30s] [--gap:1.5rem]".
export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around gap-[var(--gap)] ${
            vertical ? "animate-team-marquee-vertical flex-col" : "animate-team-marquee flex-row"
          } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${
            reverse ? "[animation-direction:reverse]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
