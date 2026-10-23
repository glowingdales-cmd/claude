"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronDown, Loader2, RotateCcw } from "lucide-react";
import { inputClass } from "@/components/forms/styles";
import { FIELD_LABELS } from "@/lib/content";

type Path = (string | number)[];

function labelFor(path: Path) {
  const pattern = path.map((p) => (typeof p === "number" ? "*" : p)).join(".");
  // Room fields are keyed by slug ("rooms.standard.price"): try "rooms.*.price" too.
  const wildcardFirstKey = [path[0], "*", ...path.slice(2)].join(".");
  const last = String(path[path.length - 1]);
  return FIELD_LABELS[pattern] ?? FIELD_LABELS[wildcardFirstKey] ?? FIELD_LABELS[last] ?? last;
}

function setAt(root: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = [...root];
    copy[head as number] = setAt(copy[head as number], rest, value);
    return copy;
  }
  const obj = root as Record<string, unknown>;
  return { ...obj, [head]: setAt(obj[head as string], rest, value) };
}

/**
 * Form for one section of the site texts, generated from the shape of its
 * default value: strings → text inputs (textareas for long ones), numbers →
 * number inputs, string lists → one item per line, object lists → one
 * fieldset per item.
 */
export default function ContentSectionEditor({
  sectionId,
  label,
  initial,
  defaults,
  modified,
}: {
  sectionId: string;
  label: string;
  initial: unknown;
  defaults: unknown;
  modified: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const update = (path: Path, next: unknown) => {
    setValue((current: unknown) => setAt(current, path, next));
    setStatus("idle");
  };

  const send = async (method: "PUT" | "DELETE") => {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(`/api/admin/content/${sectionId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "PUT" ? JSON.stringify(value) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Enregistrement impossible.");
        setStatus("error");
        return;
      }
      setValue(data.value);
      setStatus("saved");
      router.refresh();
    } catch {
      setError("Enregistrement impossible. Vérifiez votre réseau.");
      setStatus("error");
    }
  };

  const renderField = (path: Path, current: unknown, fallback: unknown): React.ReactNode => {
    const id = `${sectionId}-${path.join("-")}`;
    const fieldLabel = labelFor([sectionId, ...path]);

    if (typeof fallback === "string" || typeof fallback === "number") {
      const isNumber = typeof fallback === "number";
      const long = !isNumber && fallback.length > 70;
      return (
        <div key={id}>
          <label htmlFor={id} className="block text-xs font-medium text-ink/70">
            {fieldLabel}
          </label>
          {long ? (
            <textarea
              id={id}
              rows={3}
              value={String(current ?? "")}
              onChange={(e) => update(path, e.target.value)}
              className={`${inputClass} mt-1.5 resize-y`}
            />
          ) : (
            <input
              id={id}
              type={isNumber ? "number" : "text"}
              min={isNumber ? 0 : undefined}
              value={String(current ?? "")}
              onChange={(e) => update(path, isNumber ? Number(e.target.value) : e.target.value)}
              className={`${inputClass} mt-1.5`}
            />
          )}
        </div>
      );
    }

    if (Array.isArray(fallback) && fallback.every((item) => typeof item === "string")) {
      const lines = Array.isArray(current) ? (current as string[]) : [];
      return (
        <div key={id}>
          <label htmlFor={id} className="block text-xs font-medium text-ink/70">
            {fieldLabel}
          </label>
          <textarea
            id={id}
            rows={Math.max(3, lines.length + 1)}
            value={lines.join("\n")}
            onChange={(e) => update(path, e.target.value.split("\n"))}
            className={`${inputClass} mt-1.5 resize-y`}
          />
        </div>
      );
    }

    if (Array.isArray(fallback)) {
      const items = Array.isArray(current) ? current : [];
      return (
        <div key={id} className="space-y-4">
          {fallback.map((itemFallback, i) => (
            <fieldset key={i} className="space-y-3 rounded-sm border border-ink/10 p-4">
              <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-burgundy">
                {fieldLabel} {i + 1}
              </legend>
              {renderObject([...path, i], items[i], itemFallback)}
            </fieldset>
          ))}
        </div>
      );
    }

    if (fallback && typeof fallback === "object") {
      const obj = (current ?? {}) as Record<string, unknown>;
      const legend = typeof obj.name === "string" && obj.name ? obj.name : fieldLabel;
      return (
        <fieldset key={id} className="space-y-3 rounded-sm border border-ink/10 p-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-burgundy">{legend}</legend>
          {renderObject(path, current, fallback)}
        </fieldset>
      );
    }

    return null;
  };

  const renderObject = (path: Path, current: unknown, fallback: unknown) => {
    const obj = (current ?? {}) as Record<string, unknown>;
    return Object.entries(fallback as Record<string, unknown>).map(([key, fieldFallback]) =>
      renderField([...path, key], obj[key], fieldFallback),
    );
  };

  return (
    <details className="group rounded-sm bg-white shadow-sm shadow-black/5 open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4">
        <span className="font-display text-lg font-semibold text-ink">{label}</span>
        <span className="flex items-center gap-3">
          {modified && (
            <span className="rounded-full bg-brass/15 px-2.5 py-0.5 text-xs font-medium text-ink">
              Modifié
            </span>
          )}
          <ChevronDown className="h-4 w-4 text-ink/50 transition-transform group-open:rotate-180" aria-hidden="true" />
        </span>
      </summary>

      <form
        className="space-y-4 border-t border-ink/10 px-6 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          send("PUT");
        }}
      >
        {renderObject([], value, defaults)}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={status === "saving"}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Enregistrer
          </button>
          <button
            type="button"
            disabled={status === "saving"}
            onClick={() => {
              if (window.confirm(`Rétablir les textes d'origine de « ${label} » ?`)) send("DELETE");
            }}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 hover:border-burgundy hover:text-burgundy disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Rétablir les textes d&apos;origine
          </button>
          {status === "saved" && (
            <span role="status" className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Enregistré, visible sur le site.
            </span>
          )}
          {status === "error" && (
            <span role="alert" className="text-sm font-medium text-burgundy">
              {error}
            </span>
          )}
        </div>
      </form>
    </details>
  );
}
