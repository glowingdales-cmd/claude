import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { DEFAULT_CONTENT, isContentSection, mergeValue } from "@/lib/content";
import { revalidateContentPages } from "@/lib/site-content";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/content/[section]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { section } = await ctx.params;
  if (!isContentSection(section)) {
    return NextResponse.json({ error: "Section inconnue." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Normalise against the default shape so only known fields of the right
  // type are ever stored.
  const value = mergeValue(DEFAULT_CONTENT[section], body);
  await prisma.siteText.upsert({
    where: { key: section },
    update: { value: JSON.stringify(value) },
    create: { key: section, value: JSON.stringify(value) },
  });

  revalidateContentPages();
  return NextResponse.json({ ok: true, value });
}

/** Restores a section to its default texts. */
export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/content/[section]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { section } = await ctx.params;
  if (!isContentSection(section)) {
    return NextResponse.json({ error: "Section inconnue." }, { status: 404 });
  }

  await prisma.siteText.deleteMany({ where: { key: section } });
  revalidateContentPages();
  return NextResponse.json({ ok: true, value: DEFAULT_CONTENT[section] });
}
