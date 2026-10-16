"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import Field from "@/components/forms/field";
import { inputClass, inputErrorClass } from "@/components/forms/styles";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      reset();
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
        <p className="mt-4 font-display text-xl font-semibold text-ink">Message envoyé</p>
        <p className="mt-2 text-sm text-ink/65">
          Merci de nous avoir écrit, nous vous répondrons très vite.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 cursor-pointer text-sm font-semibold text-burgundy underline-offset-4 hover:underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Nom complet" htmlFor="c-fullName" required error={errors.fullName?.message}>
        <input
          id="c-fullName"
          className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
          {...register("fullName")}
        />
      </Field>
      <Field label="Téléphone" htmlFor="c-phone" error={errors.phone?.message}>
        <input
          id="c-phone"
          className={inputClass}
          {...register("phone")}
        />
      </Field>
      <Field label="Email" htmlFor="c-email" required error={errors.email?.message} className="sm:col-span-2">
        <input
          id="c-email"
          type="email"
          className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
          {...register("email")}
        />
      </Field>
      <Field label="Sujet" htmlFor="c-subject" required error={errors.subject?.message} className="sm:col-span-2">
        <input
          id="c-subject"
          className={`${inputClass} ${errors.subject ? inputErrorClass : ""}`}
          placeholder="Ex. Question sur une salle de réunion"
          {...register("subject")}
        />
      </Field>
      <Field label="Message" htmlFor="c-message" required error={errors.message?.message} className="sm:col-span-2">
        <textarea
          id="c-message"
          rows={5}
          className={`${inputClass} ${errors.message ? inputErrorClass : ""}`}
          {...register("message")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm font-medium text-burgundy">
          Une erreur est survenue. Merci de réessayer dans un instant.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Envoyer le message
        </button>
      </div>
    </form>
  );
}
