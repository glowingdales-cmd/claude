import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DEFAULT_CONTENT, isContentSection, mergeValue, type SiteContent } from "@/lib/content";

/** Site texts: the defaults with every admin override applied. */
export async function getSiteContent(): Promise<SiteContent> {
  const rows = await prisma.siteText.findMany();
  const content = { ...DEFAULT_CONTENT };
  for (const row of rows) {
    if (!isContentSection(row.key)) continue;
    try {
      const stored = JSON.parse(row.value);
      // Each section is merged against its own default, so the result keeps
      // the exact shape of DEFAULT_CONTENT.
      (content as Record<string, unknown>)[row.key] = mergeValue(DEFAULT_CONTENT[row.key], stored);
    } catch {
      // Corrupt row: keep the default for this section.
    }
  }
  return content;
}

/** Re-render every page that shows editable texts after an admin change. */
export function revalidateContentPages() {
  revalidatePath("/");
  revalidatePath("/chambres");
  revalidatePath("/contact");
  revalidatePath("/admin/textes");
}
