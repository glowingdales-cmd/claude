"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-stone-soft/80 transition-colors hover:border-brass hover:text-brass"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Déconnexion
    </button>
  );
}
