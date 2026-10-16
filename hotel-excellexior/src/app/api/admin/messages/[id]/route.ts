import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED"]),
});

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/messages/[id]">) {
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
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 422 });
  }

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ message: updated });
  } catch {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }
}
