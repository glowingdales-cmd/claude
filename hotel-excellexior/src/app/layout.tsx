import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { SITE } from "@/lib/constants";
import WhatsAppButton from "@/components/whatsapp-button";
import ScrollToTop from "@/components/scroll-to-top";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotelexcellexior.cm"),
  title: {
    default: `${SITE.name} — Hôtel d'affaires & événementiel à Yaoundé`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Hôtel Excellexior à Yaoundé : chambres confortables, salles de réunion, parking sécurisé interne et externe, organisation de mariages et événements professionnels. Réservez en ligne ou sur WhatsApp.",
  keywords: [
    "hotel Yaoundé",
    "hotel excellexior",
    "chambre hotel Yaoundé",
    "salle de reunion Yaoundé",
    "mariage Yaoundé",
    "parking securisé Yaoundé",
  ],
  openGraph: {
    title: `${SITE.name} — Hôtel d'affaires & événementiel à Yaoundé`,
    description:
      "Chambres, salles de réunion, parking sécurisé et organisation d'événements au cœur de Yaoundé.",
    url: "https://www.hotelexcellexior.cm",
    siteName: SITE.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-stone-soft text-ink antialiased">
        <MotionConfig reducedMotion="user">
          {children}
          <WhatsAppButton />
          <ScrollToTop />
        </MotionConfig>
      </body>
    </html>
  );
}
