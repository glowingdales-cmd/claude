import type { Metadata } from "next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { prisma } from "@/lib/prisma";
import MessageRowActions from "@/components/admin/message-row-actions";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Messages</h1>
        <p className="mt-1 text-sm text-ink/55">
          {messages.length} message{messages.length > 1 ? "s" : ""} reçu{messages.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <article key={m.id} className="rounded-sm bg-white p-5 shadow-sm shadow-black/5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-ink">{m.subject}</p>
                <p className="text-xs text-ink/50">
                  {m.fullName} · {m.email}{m.phone ? ` · ${m.phone}` : ""}
                </p>
                <p className="text-xs text-ink/40">
                  {format(m.createdAt, "dd MMM yyyy à HH:mm", { locale: fr })}
                </p>
              </div>
              <MessageRowActions id={m.id} status={m.status} />
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-ink/75">{m.message}</p>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="rounded-sm bg-white p-8 text-center text-sm text-ink/45 shadow-sm shadow-black/5">
            Aucun message pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
