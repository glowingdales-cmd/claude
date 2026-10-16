import Image from "next/image";
import Link from "next/link";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-icon.png"
      alt="Hôtel Excellexior"
      width={120}
      height={115}
      priority
      className={`${className} object-contain`}
    />
  );
}

export function LogoLockup({ className = "h-20 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-lockup.png"
      alt="Hôtel Excellexior"
      width={854}
      height={592}
      className={`${className} object-contain`}
    />
  );
}

export default function NavLogo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`flex cursor-pointer items-center gap-2.5 ${className}`}
      aria-label="Hôtel Excellexior — Accueil"
    >
      <LogoMark className="h-10 w-10 shrink-0" />
      <span
        className="font-display text-lg font-semibold leading-tight tracking-tight"
        style={{ color: tone === "dark" ? "var(--color-ink)" : "#fff" }}
      >
        Hôtel
        <br />
        Excellexior
      </span>
    </Link>
  );
}
