import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/admin/status-badge";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function AdminDashboardPage() {
  const [total, pending, awaitingPayment, newMessages, recentReservations, recentMessages] =
    await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: "PENDING" } }),
      prisma.reservation.count({ where: { paymentStatus: "AWAITING_CONFIRMATION" } }),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Réservations totales", value: total },
    { label: "En attente de traitement", value: pending },
    { label: "Paiements à confirmer", value: awaitingPayment },
    { label: "Nouveaux messages", value: newMessages },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-sm text-ink/55">Activité récente de l&apos;hôtel.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-sm bg-white p-5 shadow-sm shadow-black/5">
            <p className="font-display text-3xl font-semibold text-ink">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{s.label}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Dernières réservations</h2>
          <Link href="/admin/reservations" className="cursor-pointer text-sm font-medium text-laterite hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-sm bg-white shadow-sm shadow-black/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Chambre</th>
                <th className="px-4 py-3">Arrivée</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Paiement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {recentReservations.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-ink">{r.fullName}</td>
                  <td className="px-4 py-3 text-ink/70">{r.roomType}</td>
                  <td className="px-4 py-3 text-ink/70">{format(r.checkIn, "dd MMM yyyy", { locale: fr })}</td>
                  <td className="px-4 py-3"><StatusBadge kind="status" value={r.status} /></td>
                  <td className="px-4 py-3"><StatusBadge kind="payment" value={r.paymentStatus} /></td>
                </tr>
              ))}
              {recentReservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink/45">
                    Aucune réservation pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Derniers messages</h2>
          <Link href="/admin/messages" className="cursor-pointer text-sm font-medium text-laterite hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 divide-y divide-ink/5 rounded-sm bg-white shadow-sm shadow-black/5">
          {recentMessages.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{m.fullName} — {m.subject}</p>
                <p className="text-xs text-ink/50">{m.email}</p>
              </div>
              <StatusBadge kind="message" value={m.status} />
            </div>
          ))}
          {recentMessages.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-ink/45">Aucun message pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}
