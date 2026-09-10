export default function SectionHead({
  title,
  standfirst,
  align = "left",
  tone = "dark",
  className = "",
}: {
  title: string;
  standfirst?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <h2
        className={`text-display-m font-display ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {standfirst ? (
        <p
          className={`mt-4 max-w-[68ch] text-body-l ${align === "center" ? "mx-auto" : ""} ${
            tone === "dark" ? "text-grey-300" : "text-grey-500"
          }`}
        >
          {standfirst}
        </p>
      ) : null}
    </div>
  );
}
