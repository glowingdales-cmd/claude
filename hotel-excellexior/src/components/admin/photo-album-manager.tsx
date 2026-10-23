"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Trash2 } from "lucide-react";
import HotelPhoto from "@/components/hotel-photo";
import { inputClass } from "@/components/forms/styles";
import type { SitePhoto } from "@/lib/photos";

export default function PhotoAlbumManager({
  albumId,
  label,
  max,
  photos,
}: {
  albumId: string;
  label: string;
  max: number;
  photos: SitePhoto[];
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const full = photos.length >= max;

  const run = async (action: () => Promise<Response>) => {
    setBusy(true);
    setError("");
    try {
      const res = await action();
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Action impossible.");
        return false;
      }
      router.refresh();
      return true;
    } catch {
      setError("Action impossible. Vérifiez votre réseau.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setError("Choisissez d'abord une image.");
      return;
    }
    const body = new FormData();
    body.set("album", albumId);
    body.set("alt", newAlt);
    body.set("file", file);
    const ok = await run(() => fetch("/api/admin/photos", { method: "POST", body }));
    if (ok) {
      setNewAlt("");
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const patch = (id: string, payload: object) =>
    run(() =>
      fetch(`/api/admin/photos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );

  const onDelete = (photo: SitePhoto) => {
    if (!window.confirm(`Supprimer la photo « ${photo.alt} » ?`)) return;
    run(() => fetch(`/api/admin/photos/${photo.id}`, { method: "DELETE" }));
  };

  return (
    <section className="rounded-sm bg-white p-6 shadow-sm shadow-black/5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-semibold text-ink">{label}</h2>
        <span className={`text-sm ${full ? "font-medium text-burgundy" : "text-ink/50"}`}>
          {photos.length} / {max} photos
        </span>
      </div>

      {photos.length === 0 ? (
        <p className="mt-4 text-sm text-ink/50">Aucune photo pour le moment.</p>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {photos.map((photo, i) => (
            <li key={photo.id} className="flex flex-col gap-2">
              <div className="relative">
                <HotelPhoto
                  src={photo.url}
                  alt={photo.alt}
                  sizes="200px"
                  className="aspect-[4/3] w-full rounded-sm"
                />
                <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-xs font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <input
                aria-label={`Légende de la photo ${i + 1}`}
                defaultValue={photo.alt}
                maxLength={120}
                disabled={busy}
                onBlur={(e) => {
                  const alt = e.target.value.trim();
                  if (alt && alt !== photo.alt) patch(photo.id, { alt });
                }}
                className={`${inputClass} px-2 py-1.5 text-xs`}
              />
              <div className="flex items-center justify-between gap-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Déplacer vers la gauche"
                    disabled={busy || i === 0}
                    onClick={() => patch(photo.id, { move: "up" })}
                    className="cursor-pointer rounded-full border border-ink/15 p-1.5 text-ink/70 hover:border-brass hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer vers la droite"
                    disabled={busy || i === photos.length - 1}
                    onClick={() => patch(photo.id, { move: "down" })}
                    className="cursor-pointer rounded-full border border-ink/15 p-1.5 text-ink/70 hover:border-brass hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Supprimer la photo ${i + 1}`}
                  disabled={busy}
                  onClick={() => onDelete(photo)}
                  className="cursor-pointer rounded-full border border-burgundy/30 p-1.5 text-burgundy hover:bg-burgundy hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {full ? (
        <p className="mt-5 text-sm text-ink/55">
          Maximum atteint : supprimez une photo pour en ajouter une nouvelle.
        </p>
      ) : (
        <form onSubmit={onUpload} className="mt-6 flex flex-wrap items-end gap-3 border-t border-ink/10 pt-5">
          <div className="min-w-[200px] flex-1">
            <label htmlFor={`${albumId}-file`} className="block text-xs font-medium text-ink/70">
              Nouvelle photo (JPG, PNG ou WebP, 10 Mo max.)
            </label>
            <input
              id={`${albumId}-file`}
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              className="mt-1.5 block w-full text-sm text-ink/70 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-stone file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
            />
          </div>
          <div className="min-w-[200px] flex-1">
            <label htmlFor={`${albumId}-alt`} className="block text-xs font-medium text-ink/70">
              Légende (facultatif)
            </label>
            <input
              id={`${albumId}-alt`}
              value={newAlt}
              maxLength={120}
              onChange={(e) => setNewAlt(e.target.value)}
              placeholder="Ex. Salle de bain avec douche"
              disabled={busy}
              className={`${inputClass} mt-1.5`}
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ImagePlus className="h-4 w-4" aria-hidden="true" />}
            Ajouter
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-burgundy">
          {error}
        </p>
      )}
    </section>
  );
}
