import type { Metadata } from "next";
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
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <LoginForm nextPath={nextPath} />
    </main>
  );
}
