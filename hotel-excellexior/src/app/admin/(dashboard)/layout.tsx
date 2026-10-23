import Link from "next/link";
import { BedDouble, Images, KeyRound, LayoutDashboard, Mail } from "lucide-react";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/admin/logout-button";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Réservations", icon: BedDouble },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/photos", label: "Photos", icon: Images },
  { href: "/admin/mot-de-passe", label: "Mot de passe", icon: KeyRound },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The proxy already redirects unauthenticated requests away from /admin,
  // so this is only reached with a valid session — session is read here
  // purely to greet the admin by name.
  const session = await getSession();

  return (
    <div className="min-h-screen bg-stone-soft">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-burgundy px-6 py-4 text-white md:px-8">
        <div className="flex items-center gap-8">
          <span className="font-display text-lg font-semibold">Excellexior · Admin</span>
          <nav aria-label="Navigation administration" className="hidden items-center gap-6 md:flex">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-soft/75 transition-colors hover:text-brass"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-stone-soft/60 sm:inline">
            {session?.name ?? session?.email}
          </span>
          <LogoutButton />
        </div>
      </header>

      <nav aria-label="Navigation administration mobile" className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-burgundy px-4 py-2 md:hidden">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-stone-soft/75 hover:text-brass"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">{children}</main>
    </div>
  );
}
