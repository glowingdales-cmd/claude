import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { MEDIA_PREFIX, revalidatePhotoPages, UPLOAD_DIR, UPLOAD_NAME_PATTERN } from "@/lib/photos";

const patchSchema = z.union([
  z.object({ move: z.enum(["up", "down"]) }),
  z.object({ alt: z.string().trim().min(1).max(120) }),
]);

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/photos/[id]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 422 });
  }

  const photo = await prisma.photo.findUnique({ where: { id } });
  if (!photo) {
    return NextResponse.json({ error: "Photo introuvable." }, { status: 404 });
  }

  if ("alt" in parsed.data) {
    await prisma.photo.update({ where: { id }, data: { alt: parsed.data.alt } });
  } else {
    // Swap positions with the neighbouring photo in the same album.
    const up = parsed.data.move === "up";
    const neighbour = await prisma.photo.findFirst({
      where: { album: photo.album, position: up ? { lt: photo.position } : { gt: photo.position } },
      orderBy: { position: up ? "desc" : "asc" },
    });
    if (neighbour) {
      await prisma.$transaction([
        prisma.photo.update({ where: { id: photo.id }, data: { position: neighbour.position } }),
        prisma.photo.update({ where: { id: neighbour.id }, data: { position: photo.position } }),
      ]);
    }
  }

  revalidatePhotoPages();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/photos/[id]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const photo = await prisma.photo.findUnique({ where: { id } });
  if (!photo) {
    return NextResponse.json({ error: "Photo introuvable." }, { status: 404 });
  }

  await prisma.photo.delete({ where: { id } });

  // Uploaded files are removed from disk; bundled /photos/* files stay, since
  // other albums (or a future re-seed) may still use them.
  const name = photo.url.startsWith(MEDIA_PREFIX) ? photo.url.slice(MEDIA_PREFIX.length) : null;
  if (name && UPLOAD_NAME_PATTERN.test(name)) {
    await unlink(path.join(UPLOAD_DIR, name)).catch(() => {});
  }

  revalidatePhotoPages();
  return NextResponse.json({ ok: true });
}
