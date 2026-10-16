import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {
    const data = contactSchema.parse(body);

    const created = await prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Données invalides.", issues: error.flatten() },
        { status: 422 }
      );
    }
    console.error("POST /api/contact failed", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
