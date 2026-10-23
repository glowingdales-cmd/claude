import path from "node:path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PHOTO_ALBUMS } from "@/lib/constants";

export type SitePhoto = { id: string; url: string; alt: string };

// Uploaded photos live outside /public: Next.js only serves public files that
// existed at build time, so uploads are served by the /media/[name] route.
export const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
export const MEDIA_PREFIX = "/media/";
export const UPLOAD_NAME_PATTERN = /^[a-f0-9-]{36}\.(jpg|png|webp)$/;

export function findAlbum(id: string) {
  return PHOTO_ALBUMS.find((album) => album.id === id);
}

export async function getAlbumPhotos(album: string): Promise<SitePhoto[]> {
  return prisma.photo.findMany({
    where: { album },
    orderBy: { position: "asc" },
    select: { id: true, url: true, alt: true },
  });
}

/** Every album's photos, keyed by album id (albums with no photos are []). */
export async function getAllAlbums(): Promise<Record<string, SitePhoto[]>> {
  const photos = await prisma.photo.findMany({
    orderBy: { position: "asc" },
    select: { id: true, url: true, alt: true, album: true },
  });
  const byAlbum: Record<string, SitePhoto[]> = Object.fromEntries(
    PHOTO_ALBUMS.map((album) => [album.id, []]),
  );
  for (const { album, ...photo } of photos) {
    byAlbum[album]?.push(photo);
  }
  return byAlbum;
}

/** Re-render every page that shows album photos after an admin change. */
export function revalidatePhotoPages() {
  revalidatePath("/");
  revalidatePath("/chambres");
  revalidatePath("/admin/photos");
}
