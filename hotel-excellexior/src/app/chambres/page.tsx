import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Maximize, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HotelPhoto from "@/components/hotel-photo";
import Reveal from "@/components/motion/reveal";
import { ROOM_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chambres & Suites",
  description:
    "Découvrez les chambres Standard, Deluxe, Suite Exécutive et Suite Présidentielle de l'Hôtel Excellexior à Yaoundé : équipements, tarifs et réservation.",
};

export default function ChambresPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[48vh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <HotelPhoto
              src="/photos/chambre-literie.webp"
              alt="Lit dressé avec le linge aux couleurs de l'hôtel"
              sizes="100vw"
              priority
              className="h-full w-full"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
              Hébergement
            </p>
            <h1 className="font-display text-balance mt-3 max-w-2xl text-5xl font-semibold text-white md:text-6xl">
              Nos chambres & suites
            </h1>
            <p className="mt-5 max-w-xl text-base text-stone-soft/80">
              Quatre catégories pensées pour chaque type de séjour, de la
              chambre Standard à la Suite Présidentielle.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8 md:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-20">
            {ROOM_TYPES.map((room, i) => (
              <div
                key={room.slug}
                id={room.slug}
                className="scroll-mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <HotelPhoto
                    src={room.photo}
                    alt={room.name}
                    className="aspect-[4/3] w-full rounded-sm"
                  />
                </Reveal>

                <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                    {room.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-4 text-sm text-ink/55">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" aria-hidden="true" /> {room.capacity} personnes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="h-4 w-4" aria-hidden="true" /> {room.size} m²
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink/70">
                    {room.description}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-ink/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <p className="font-display text-2xl font-semibold text-burgundy">
                      {room.price.toLocaleString("fr-FR")} FCFA
                      <span className="text-sm font-normal text-ink/50"> / nuit</span>
                    </p>
                    <Link
                      href={`/contact?chambre=${room.slug}#reservation`}
                      className="cursor-pointer rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                    >
                      Réserver cette chambre
                    </Link>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
