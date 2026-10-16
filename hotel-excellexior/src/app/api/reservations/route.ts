import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {
    const data = reservationSchema.parse(body);

    const paymentStatus =
      data.paymentMethod === "CASH_ON_ARRIVAL" ? "NONE" : "AWAITING_CONFIRMATION";

    const reservation = await prisma.reservation.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        roomType: data.roomType,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guests: data.guests,
        notes: data.notes || null,
        paymentMethod: data.paymentMethod,
        paymentStatus,
        paymentRef: data.paymentRef || null,
      },
    });

    return NextResponse.json({ id: reservation.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Données invalides.", issues: error.flatten() },
        { status: 422 }
      );
    }
    console.error("POST /api/reservations failed", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
