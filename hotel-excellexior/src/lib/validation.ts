import { z } from "zod";

export const reservationSchema = z
  .object({
    fullName: z.string().trim().min(2, "Veuillez indiquer votre nom complet."),
    email: z.string().trim().email("Adresse email invalide."),
    phone: z.string().trim().min(8, "Numéro de téléphone invalide."),
    roomType: z.string().trim().min(1, "Veuillez choisir un type de chambre."),
    checkIn: z.string().trim().min(1, "Veuillez choisir une date d'arrivée."),
    checkOut: z.string().trim().min(1, "Veuillez choisir une date de départ."),
    guests: z.number().int().min(1, "Au moins 1 personne.").max(20, "Maximum 20 personnes."),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
    paymentMethod: z.enum(["CASH_ON_ARRIVAL", "ORANGE_MONEY", "MTN_MOMO"]),
    paymentRef: z.string().trim().max(120).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "La date de départ doit être après la date d'arrivée.",
    path: ["checkOut"],
  });

export type ReservationInput = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Veuillez indiquer votre nom complet."),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Veuillez indiquer un sujet."),
  message: z.string().trim().min(10, "Votre message est un peu court."),
});

export type ContactInput = z.infer<typeof contactSchema>;
