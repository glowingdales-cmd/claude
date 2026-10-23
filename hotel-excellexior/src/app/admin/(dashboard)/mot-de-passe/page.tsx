import type { Metadata } from "next";
import PasswordForm from "@/components/admin/password-form";

export const metadata: Metadata = { title: "Mot de passe" };

export default function AdminPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Mot de passe</h1>
        <p className="mt-1 text-sm text-ink/55">
          Choisissez un nouveau mot de passe pour le compte administrateur.
        </p>
      </div>
      <PasswordForm />
    </div>
  );
}
