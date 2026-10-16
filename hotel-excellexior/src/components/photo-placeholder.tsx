import type { LucideIcon } from "lucide-react";

/**
 * Stand-in "plate" for real photography. Styled like an archive/catalog
 * card rather than a broken-image box, so the layout reads intentionally
 * even before the hotel's own photos are dropped in. Swap for a real
 * <Image> with the same className once photos are available.
 */
export default function PhotoPlaceholder({
  icon: Icon,
  label,
  className = "",
  tone = "light",
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`relative isolate flex items-center justify-center overflow-hidden ${
        tone === "dark"
          ? "bg-gradient-to-br from-ink via-ink-soft to-ink"
          : "bg-gradient-to-br from-ink-soft via-ink to-[#0f1a14]"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-brass) 0, var(--color-brass) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <Icon
        aria-hidden="true"
        className="relative h-14 w-14 text-brass/50 sm:h-16 sm:w-16"
        strokeWidth={1.25}
      />
      <span className="absolute bottom-3 left-3 rounded-sm bg-ink/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-soft/80 backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
