"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmée" },
  { value: "CANCELLED", label: "Annulée" },
  { value: "COMPLETED", label: "Terminée" },
];

const PAYMENT_OPTIONS = [
  { value: "NONE", label: "Sans dépôt" },
  { value: "AWAITING_CONFIRMATION", label: "À confirmer" },
  { value: "CONFIRMED", label: "Payé" },
  { value: "FAILED", label: "Échoué" },
];

export default function ReservationRowActions({
  id,
  status,
  paymentStatus,
}: {
  id: string;
  status: string;
  paymentStatus: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const update = async (payload: Record<string, string>) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      startTransition(() => router.refresh());
    } catch {
      setError("Échec de la mise à jour.");
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => update({ status: e.target.value })}
          disabled={isPending}
          className="cursor-pointer rounded-sm border border-ink/15 bg-stone-soft px-2 py-1.5 text-xs text-ink focus:border-brass focus:outline-none"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={paymentStatus}
          onChange={(e) => update({ paymentStatus: e.target.value })}
          disabled={isPending}
          className="cursor-pointer rounded-sm border border-ink/15 bg-stone-soft px-2 py-1.5 text-xs text-ink focus:border-brass focus:outline-none"
        >
          {PAYMENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink/40" aria-hidden="true" />}
      </div>
      {error && <p className="text-xs font-medium text-laterite">{error}</p>}
    </div>
  );
}
