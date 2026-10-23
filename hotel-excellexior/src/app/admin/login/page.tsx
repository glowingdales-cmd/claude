import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Connexion administration" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-burgundy px-6">
      <LoginForm nextPath={nextPath} />
      <Link
        href="/"
        className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-soft/70 transition-colors hover:text-brass"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Retour au site
      </Link>
    </main>
  );
}
