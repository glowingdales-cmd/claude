import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Reveal from "@/components/motion/reveal";
import ReservationForm from "@/components/forms/reservation-form";
import ContactForm from "@/components/forms/contact-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact & Réservation",
  description:
    "Contactez l'Hôtel Excellexior à Yaoundé ou réservez votre chambre, salle de réunion ou événement. Paiement par Orange Money, MTN Mobile Money ou à l'arrivée.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ chambre?: string }>;
}) {
  const { chambre } = await searchParams;
  const whatsappMessage = encodeURIComponent(
    "Bonjour Hôtel Excellexior, je souhaite avoir des informations."
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-ink px-6 pb-14 pt-32 text-white md:px-8 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
                Contact & réservation
              </p>
              <h1 className="font-display text-balance mt-3 max-w-2xl text-5xl font-semibold md:text-6xl">
                Parlons de votre séjour
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-6 text-sm text-stone-soft/80">
              <a href={`tel:${SITE.phoneHref}`} className="flex cursor-pointer items-center gap-2 hover:text-brass">
                <Phone className="h-4 w-4 text-brass" aria-hidden="true" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex cursor-pointer items-center gap-2 hover:text-brass">
                <Mail className="h-4 w-4 text-brass" aria-hidden="true" /> {SITE.email}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-2 hover:text-brass"
              >
                <MessageCircle className="h-4 w-4 text-brass" aria-hidden="true" /> Écrire sur WhatsApp
              </a>
              <span className="flex items-center gap-2 text-stone-soft/60">
                <MapPin className="h-4 w-4 text-brass" aria-hidden="true" /> {SITE.address}
              </span>
            </Reveal>
          </div>
        </section>

        <section id="reservation" className="scroll-mt-24 bg-stone px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                Réserver une chambre ou un espace
              </h2>
              <p className="mt-3 text-sm text-ink/60">
                Remplissez le formulaire ci-dessous : notre équipe confirme
                chaque réservation sous peu par email ou WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 rounded-sm bg-stone-soft p-6 shadow-sm shadow-black/5 md:p-10">
              <ReservationForm defaultRoom={chambre} />
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                Une autre question ?
              </h2>
              <p className="mt-3 text-sm text-ink/60">
                Pour toute demande qui ne concerne pas une réservation,
                écrivez-nous ici.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 rounded-sm bg-stone p-6 shadow-sm shadow-black/5 md:p-10">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
