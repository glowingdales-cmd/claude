import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { findAlbum, MEDIA_PREFIX, revalidatePhotoPages, UPLOAD_DIR } from "@/lib/photos";

const MAX_BYTES = 10 * 1024 * 1024;

// Identify the format from the file's first bytes rather than trusting the
// browser-supplied MIME type or file name.
function detectImageType(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  return null;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const album = findAlbum(String(form.get("album") ?? ""));
  const file = form.get("file");
  const alt = String(form.get("alt") ?? "").trim().slice(0, 120);
  if (!album || !(file instanceof File)) {
    return NextResponse.json({ error: "Données invalides." }, { status: 422 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image trop lourde (10 Mo maximum)." }, { status: 413 });
  }

  const count = await prisma.photo.count({ where: { album: album.id } });
  if (count >= album.max) {
    return NextResponse.json(
      { error: `Maximum ${album.max} photos pour « ${album.label} ». Supprimez-en une d'abord.` },
      { status: 409 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = detectImageType(bytes);
  if (!ext) {
    return NextResponse.json({ error: "Format non pris en charge (JPG, PNG ou WebP)." }, { status: 415 });
  }

  const name = `${randomUUID()}.${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), bytes);

  const last = await prisma.photo.findFirst({
    where: { album: album.id },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const photo = await prisma.photo.create({
    data: {
      album: album.id,
      url: `${MEDIA_PREFIX}${name}`,
      alt: alt || album.label,
      position: (last?.position ?? -1) + 1,
    },
  });

  revalidatePhotoPages();
  return NextResponse.json({ ok: true, photo });
}
