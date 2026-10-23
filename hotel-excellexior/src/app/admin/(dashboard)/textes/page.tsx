import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CONTENT_SECTIONS, DEFAULT_CONTENT } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import ContentSectionEditor from "@/components/admin/content-section-editor";

export const metadata: Metadata = { title: "Textes du site" };

export default async function AdminTextsPage() {
  const [content, overrides] = await Promise.all([
    getSiteContent(),
    prisma.siteText.findMany({ select: { key: true } }),
  ]);
  const modified = new Set(overrides.map((row) => row.key));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Textes du site</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink/55">
          Ouvrez une section, modifiez ses textes puis cliquez sur « Enregistrer » : le site est
          mis à jour immédiatement. « Rétablir les textes d&apos;origine » annule toutes les
          modifications de la section.
        </p>
      </div>

      {(["Accueil", "Chambres"] as const).map((page) => (
        <section key={page} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            Page {page}
          </h2>
          {CONTENT_SECTIONS.filter((s) => s.page === page).map((section) => (
            <ContentSectionEditor
              key={section.id}
              sectionId={section.id}
              label={section.label}
              initial={content[section.id]}
              defaults={DEFAULT_CONTENT[section.id]}
              modified={modified.has(section.id)}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
