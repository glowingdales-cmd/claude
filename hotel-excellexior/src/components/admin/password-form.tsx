"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Field from "@/components/forms/field";
import { inputClass, inputErrorClass } from "@/components/forms/styles";

export default function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMessage("Les deux mots de passe ne correspondent pas.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirm }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Modification impossible.");
        setStatus("error");
        return;
      }
      setPassword("");
      setConfirm("");
      setStatus("success");
    } catch {
      setErrorMessage("Modification impossible. Vérifiez votre réseau.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-5 rounded-sm bg-white p-6 shadow-sm shadow-black/5">
      <Field label="Nouveau mot de passe" htmlFor="new-password" hint="8 caractères minimum." required>
        <input
          id="new-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClass} ${status === "error" ? inputErrorClass : ""}`}
        />
      </Field>
      <Field label="Confirmer le mot de passe" htmlFor="confirm-password" required>
        <input
          id="confirm-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={`${inputClass} ${status === "error" ? inputErrorClass : ""}`}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-burgundy">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Mot de passe modifié. Utilisez-le à votre prochaine connexion.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Enregistrer le nouveau mot de passe
      </button>
    </form>
  );
}
