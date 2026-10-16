"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Smartphone } from "lucide-react";
import { reservationSchema, type ReservationInput } from "@/lib/validation";
import { ROOM_TYPES, PAYMENT_METHODS } from "@/lib/constants";
import Field from "@/components/forms/field";
import { inputClass, inputErrorClass } from "@/components/forms/styles";

export default function ReservationForm({ defaultRoom }: { defaultRoom?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      roomType: defaultRoom && ROOM_TYPES.some((r) => r.slug === defaultRoom) ? defaultRoom : ROOM_TYPES[0].slug,
      guests: 1,
      paymentMethod: "CASH_ON_ARRIVAL",
      notes: "",
      paymentRef: "",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const activePayment = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  const onSubmit = async (values: ReservationInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      reset({
        roomType: values.roomType,
        guests: 1,
        paymentMethod: "CASH_ON_ARRIVAL",
        notes: "",
        paymentRef: "",
        fullName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-brass/30 bg-brass/10 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-brass" aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-semibold text-ink">
          Demande de réservation envoyée
        </p>
        <p className="mt-2 text-sm text-ink/65">
          Notre équipe vous contactera sous peu pour confirmer votre séjour.
          Pour une réponse plus rapide, écrivez-nous directement sur WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 cursor-pointer text-sm font-semibold text-laterite underline-offset-4 hover:underline"
        >
          Faire une nouvelle réservation
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Nom complet" htmlFor="res-fullName" required error={errors.fullName?.message}>
        <input
          id="res-fullName"
          className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
          placeholder="Ex. Aïcha Mbarga"
          {...register("fullName")}
        />
      </Field>

      <Field label="Téléphone" htmlFor="res-phone" required error={errors.phone?.message}>
        <input
          id="res-phone"
          className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
          placeholder="Ex. 6XX XXX XXX"
          {...register("phone")}
        />
      </Field>

      <Field label="Email" htmlFor="res-email" required error={errors.email?.message} className="sm:col-span-2">
        <input
          id="res-email"
          type="email"
          className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
          placeholder="vous@exemple.com"
          {...register("email")}
        />
      </Field>

      <Field label="Type de chambre" htmlFor="res-roomType" required error={errors.roomType?.message}>
        <select id="res-roomType" className={inputClass} {...register("roomType")}>
          {ROOM_TYPES.map((room) => (
            <option key={room.slug} value={room.slug}>
              {room.name} — {room.price.toLocaleString("fr-FR")} FCFA/nuit
            </option>
          ))}
        </select>
      </Field>

      <Field label="Nombre de personnes" htmlFor="res-guests" required error={errors.guests?.message}>
        <input
          id="res-guests"
          type="number"
          min={1}
          max={20}
          className={`${inputClass} ${errors.guests ? inputErrorClass : ""}`}
          {...register("guests", { valueAsNumber: true })}
        />
      </Field>

      <Field label="Date d'arrivée" htmlFor="res-checkIn" required error={errors.checkIn?.message}>
        <input
          id="res-checkIn"
          type="date"
          className={`${inputClass} ${errors.checkIn ? inputErrorClass : ""}`}
          {...register("checkIn")}
        />
      </Field>

      <Field label="Date de départ" htmlFor="res-checkOut" required error={errors.checkOut?.message}>
        <input
          id="res-checkOut"
          type="date"
          className={`${inputClass} ${errors.checkOut ? inputErrorClass : ""}`}
          {...register("checkOut")}
        />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium text-ink">
          Mode de paiement <span className="text-laterite">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-4 py-3 text-sm transition-colors ${
                paymentMethod === method.id
                  ? "border-brass bg-brass/10 font-semibold text-ink"
                  : "border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
            >
              <input
                type="radio"
                value={method.id}
                className="h-4 w-4 accent-[var(--color-laterite)]"
                {...register("paymentMethod")}
              />
              {method.label}
            </label>
          ))}
        </div>
      </fieldset>

      {activePayment?.number && (
        <div className="sm:col-span-2 rounded-sm border border-brass/30 bg-brass/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Smartphone className="h-4 w-4 text-brass" aria-hidden="true" />
            Déposez l&apos;acompte sur le {activePayment.label} suivant :
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold text-laterite">
            {activePayment.number}
          </p>
          <p className="mt-1 text-xs text-ink/60">
            Puis indiquez ci-dessous la référence de la transaction reçue par
            SMS. Notre équipe confirmera votre paiement sous peu.
          </p>
          <div className="mt-3">
            <Field label="Référence de transaction" htmlFor="res-paymentRef" error={errors.paymentRef?.message}>
              <input
                id="res-paymentRef"
                className={inputClass}
                placeholder="Ex. MP240610.1234.A56789"
                {...register("paymentRef")}
              />
            </Field>
          </div>
        </div>
      )}

      <Field
        label="Message / demandes particulières"
        htmlFor="res-notes"
        hint="Occasion spéciale, heure d'arrivée prévue, besoins spécifiques..."
        className="sm:col-span-2"
      >
        <textarea
          id="res-notes"
          rows={3}
          className={inputClass}
          {...register("notes")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm font-medium text-laterite">
          Une erreur est survenue. Vérifiez votre connexion et réessayez, ou
          contactez-nous directement sur WhatsApp.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Envoyer ma demande de réservation
        </button>
        <p className="mt-2 text-xs text-ink/45">
          Vous recevrez une confirmation par email ou WhatsApp. Aucun
          montant n&apos;est prélevé automatiquement.
        </p>
      </div>
    </form>
  );
}
