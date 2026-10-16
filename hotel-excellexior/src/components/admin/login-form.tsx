"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { inputClass, inputErrorClass } from "@/components/forms/styles";

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Connexion impossible.");
        setStatus("error");
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setErrorMessage("Connexion impossible. Vérifiez votre réseau.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass/15">
          <Lock className="h-5 w-5 text-brass" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-white">Espace administration</h1>
        <p className="text-sm text-stone-soft/60">Hôtel Excellexior</p>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-stone-soft/80">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputClass} mt-1.5 bg-white/5 text-white border-white/15`}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-stone-soft/80">
            Mot de passe
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} mt-1.5 bg-white/5 text-white border-white/15 ${
              status === "error" ? inputErrorClass : ""
            }`}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-burgundy">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Se connecter
        </button>
      </div>
    </form>
  );
}
