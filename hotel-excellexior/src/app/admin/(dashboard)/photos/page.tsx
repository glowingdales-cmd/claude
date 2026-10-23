import type { Metadata } from "next";
import { PHOTO_ALBUMS } from "@/lib/constants";
import { getAllAlbums } from "@/lib/photos";
import PhotoAlbumManager from "@/components/admin/photo-album-manager";

export const metadata: Metadata = { title: "Photos" };

export default async function AdminPhotosPage() {
  const albums = await getAllAlbums();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Photos</h1>
        <p className="mt-1 text-sm text-ink/55">
          Carrousels des chambres (5 photos maximum chacun) et galerie de la page d&apos;accueil.
          La première photo d&apos;une chambre est aussi celle de sa carte sur la page d&apos;accueil.
        </p>
      </div>

      {PHOTO_ALBUMS.map((album) => (
        <PhotoAlbumManager
          key={album.id}
          albumId={album.id}
          label={album.label}
          max={album.max}
          photos={albums[album.id] ?? []}
        />
      ))}
    </div>
  );
}
