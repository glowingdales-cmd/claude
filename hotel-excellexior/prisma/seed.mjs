import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Starting photos for each album, from the hotel's official set bundled in
// /public/photos. Only inserted into an empty Photo table, so re-running the
// seed never overwrites what the admin has changed in /admin/photos.
const DEFAULT_PHOTOS = {
  "room:standard": [
    ["/photos/chambre-standard.webp", "Chambre Standard"],
    ["/photos/salle-de-bain-serviettes.webp", "Salle de bain privée"],
    ["/photos/salle-de-bain-miroir.webp", "Lavabo et miroir"],
  ],
  "room:deluxe": [
    ["/photos/chambre-deluxe.webp", "Chambre Deluxe avec coin salon"],
    ["/photos/chambre-equipee.webp", "Chambre Deluxe"],
    ["/photos/salle-de-bain-douche.webp", "Salle de bain"],
  ],
  "room:suite-executive": [
    ["/photos/suite-executive.webp", "Salon de la Suite Exécutive"],
    ["/photos/lit-dresse.webp", "Literie de la suite"],
    ["/photos/salle-de-bain-lavabo.webp", "Salle de bain de la suite"],
  ],
  "room:suite-presidentielle": [
    ["/photos/suite-presidentielle.webp", "Suite Présidentielle"],
    ["/photos/chambre-literie.webp", "Lit King Size"],
  ],
  gallery: [
    ["/photos/cour-nuit.webp", "La cour intérieure de nuit"],
    ["/photos/facade-jour.webp", "Façade de l'hôtel"],
    ["/photos/chambre-deluxe.webp", "Chambre"],
    ["/photos/salle-conference-entree.webp", "Salle de conférence"],
    ["/photos/table-reception.webp", "Table de réception"],
    ["/photos/salle-banquet.webp", "Salle de banquet"],
    ["/photos/buffet.webp", "Service buffet"],
    ["/photos/batiment-chambres.webp", "Galeries des chambres"],
    ["/photos/cour-interieure.webp", "Cour intérieure"],
  ],
};

async function seedPhotos() {
  if ((await prisma.photo.count()) > 0) return;
  const data = Object.entries(DEFAULT_PHOTOS).flatMap(([album, photos]) =>
    photos.map(([url, alt], position) => ({ album, url, alt, position })),
  );
  await prisma.photo.createMany({ data });
  console.log(`${data.length} photos ajoutees`);
}

async function main() {
  await seedPhotos();

  const email = process.env.ADMIN_EMAIL ?? "admin@hotelexcellexior.cm";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMoi123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Administrateur Excellexior" },
  });

  console.log(`Compte admin pret : ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
