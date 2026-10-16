"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

const OPTIONS = [
  { value: "NEW", label: "Nouveau" },
  { value: "READ", label: "Lu" },
  { value: "REPLIED", label: "Répondu" },
];

export default function MessageRowActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const update = async (value: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: value }),
      });
      if (!res.ok) throw new Error("failed");
      startTransition(() => router.refresh());
    } catch {
      setError("Échec de la mise à jour.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => update(e.target.value)}
        disabled={isPending}
        className="cursor-pointer rounded-sm border border-ink/15 bg-stone-soft px-2 py-1.5 text-xs text-ink focus:border-brass focus:outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink/40" aria-hidden="true" />}
      {error && <span className="text-xs font-medium text-burgundy">{error}</span>}
    </div>
  );
}
