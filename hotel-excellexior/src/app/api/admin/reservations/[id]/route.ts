import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
  paymentStatus: z.enum(["NONE", "AWAITING_CONFIRMATION", "CONFIRMED", "FAILED"]).optional(),
});

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/reservations/[id]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Données invalides." }, { status: 422 });
  }

  try {
    const updated = await prisma.reservation.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ reservation: updated });
  } catch {
    return NextResponse.json({ error: "Réservation introuvable." }, { status: 404 });
  }
}
