export default function Container({
  children,
  className = "",
  grid = false,
  full = false,
}: {
  children: React.ReactNode;
  className?: string;
  grid?: boolean;
  full?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${full ? "max-w-none" : "max-w-[1280px]"} px-6 md:px-12 ${
        grid ? "grid grid-cols-12 gap-x-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
