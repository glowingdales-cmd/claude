const LABELS: Record<string, Record<string, string>> = {
  status: {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    CANCELLED: "Annulée",
    COMPLETED: "Terminée",
  },
  payment: {
    NONE: "Sans dépôt",
    AWAITING_CONFIRMATION: "À confirmer",
    CONFIRMED: "Payé",
    FAILED: "Échoué",
  },
  message: {
    NEW: "Nouveau",
    READ: "Lu",
    REPLIED: "Répondu",
  },
};

const TONES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-rose-100 text-rose-800",
  COMPLETED: "bg-ink/10 text-ink/70",
  NONE: "bg-ink/10 text-ink/60",
  AWAITING_CONFIRMATION: "bg-amber-100 text-amber-800",
  FAILED: "bg-rose-100 text-rose-800",
  NEW: "bg-amber-100 text-amber-800",
  READ: "bg-ink/10 text-ink/70",
  REPLIED: "bg-emerald-100 text-emerald-800",
};

export default function StatusBadge({
  kind,
  value,
}: {
  kind: "status" | "payment" | "message";
  value: string;
}) {
  const label = LABELS[kind]?.[value] ?? value;
  const tone = TONES[value] ?? "bg-ink/10 text-ink/70";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {label}
    </span>
  );
}
