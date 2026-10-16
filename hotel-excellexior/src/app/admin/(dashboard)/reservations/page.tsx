import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/admin/status-badge";
import ReservationRowActions from "@/components/admin/reservation-row-actions";

export const metadata: Metadata = { title: "Réservations" };

const FILTERS = [
  { value: "ALL", label: "Toutes" },
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmées" },
  { value: "CANCELLED", label: "Annulées" },
  { value: "COMPLETED", label: "Terminées" },
];

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeFilter = FILTERS.some((f) => f.value === status) ? status! : "ALL";

  const reservations = await prisma.reservation.findMany({
    where: activeFilter === "ALL" ? {} : { status: activeFilter },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Réservations</h1>
        <p className="mt-1 text-sm text-ink/55">
          {reservations.length} réservation{reservations.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "ALL" ? "/admin/reservations" : `/admin/reservations?status=${f.value}`}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f.value ? "bg-ink text-white" : "bg-white text-ink/60 hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-sm bg-white shadow-sm shadow-black/5">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Chambre</th>
              <th className="px-4 py-3">Séjour</th>
              <th className="px-4 py-3">Invités</th>
              <th className="px-4 py-3">Paiement</th>
              <th className="px-4 py-3">Statut & paiement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{r.fullName}</p>
                  <p className="text-xs text-ink/50">{r.email}</p>
                  <p className="text-xs text-ink/50">{r.phone}</p>
                </td>
                <td className="px-4 py-3 text-ink/70">{r.roomType}</td>
                <td className="px-4 py-3 text-ink/70">
                  {format(r.checkIn, "dd MMM", { locale: fr })} → {format(r.checkOut, "dd MMM yyyy", { locale: fr })}
                </td>
                <td className="px-4 py-3 text-ink/70">{r.guests}</td>
                <td className="px-4 py-3 text-ink/70">
                  <p>{r.paymentMethod.replaceAll("_", " ")}</p>
                  {r.paymentRef && <p className="text-xs text-ink/45">Réf. {r.paymentRef}</p>}
                </td>
                <td className="px-4 py-3">
                  <div className="mb-2 flex gap-1.5">
                    <StatusBadge kind="status" value={r.status} />
                    <StatusBadge kind="payment" value={r.paymentStatus} />
                  </div>
                  <ReservationRowActions id={r.id} status={r.status} paymentStatus={r.paymentStatus} />
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/45">
                  Aucune réservation dans cette catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
