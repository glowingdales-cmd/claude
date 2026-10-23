import { MEETING_SPACES, ROOM_TYPES } from "@/lib/constants";

/**
 * Every editable text of the home and rooms pages, with its default value.
 * The admin can override any section from /admin/textes; overrides are
 * stored per section (SiteText table) and merged over these defaults by
 * `mergeSection`, which only keeps values whose type matches the default —
 * so the shape below is also the schema of what can be edited.
 */
export const DEFAULT_CONTENT = {
  hero: {
    title: "L'excellence hôtelière, en plein cœur de Yaoundé.",
    subtitle:
      "Chambres raffinées, salles de réunion équipées, parking sécurisé et jardins événementiels : l'Hôtel Excellexior accueille vos séjours d'affaires comme vos grands jours.",
    primaryCta: "Réserver une chambre",
    secondaryCta: "Voir les chambres",
    airportTitle: "Aéroport Nsimalen",
    airportValue: "≈ 25 min",
    airportNote: "Navette sur demande",
  },
  roomsTeaser: {
    eyebrow: "Hébergement",
    title: "Des chambres pensées pour chaque séjour",
    link: "Voir toutes les chambres",
  },
  stats: {
    items: [
      { value: "48", label: "Chambres & suites" },
      { value: "300", label: "Invités en événementiel" },
      { value: "60+", label: "Places de parking sécurisées" },
      { value: "25 min", label: "De l'aéroport de Nsimalen" },
    ],
  },
  about: {
    eyebrow: "Notre maison",
    title: "Une adresse de référence à Yaoundé",
    text:
      "Depuis le quartier Bastos, l'Hôtel Excellexior reçoit voyageurs d'affaires, délégations et familles avec la même exigence : un service attentif, des espaces soignés et une sécurité sans compromis — pour un séjour, une réunion ou le plus beau jour de votre vie.",
    highlights: [
      "Réception et sécurité ouvertes 24h/24",
      "Personnel bilingue français / anglais",
      "Restaurant, bar et room service",
      "Wi-Fi fibre gratuit dans tout l'hôtel",
    ],
  },
  events: {
    eyebrow: "Réunions & grands jours",
    title: "Salles de réunion, mariages et réceptions",
    text:
      "Du séminaire d'entreprise au mariage de 300 invités, nos équipes événementielles prennent en charge l'organisation complète : traiteur, décoration, sonorisation et hébergement de vos invités.",
    cta: "Demander un devis événementiel",
    spaces: MEETING_SPACES.map((space) => ({
      name: space.name as string,
      capacity: space.capacity as string,
      bestFor: space.bestFor as string,
      features: [...space.features] as string[],
    })),
  },
  parking: {
    eyebrow: "Tranquillité d'esprit",
    title: "Parking interne & externe, sécurisé 24h/24",
    text:
      "Garez votre véhicule en toute confiance : nos deux espaces de stationnement, surveillés jour et nuit, accueillent aussi bien les clients de l'hôtel que les invités de vos événements.",
    features: [
      {
        title: "Parking interne",
        description:
          "Accès direct et couvert, réservé aux clients résidents, avec places dédiées aux personnes à mobilité réduite.",
      },
      {
        title: "Parking externe surveillé",
        description: "Cour extérieure clôturée pour les visiteurs, séminaires et événements, avec gardiennage dédié.",
      },
      {
        title: "Vidéosurveillance 24h/24",
        description:
          "Caméras sur l'ensemble des zones de stationnement, supervisées en continu par la sécurité de l'hôtel.",
      },
      {
        title: "Service voiturier",
        description: "Sur demande à la réception, pour un dépôt et une reprise de véhicule sans contrainte.",
      },
    ],
  },
  services: {
    eyebrow: "À votre service",
    title: "Équipements & services inclus",
    items: [
      "Wi-Fi gratuit haut débit",
      "Restaurant & bar panoramique",
      "Piscine extérieure",
      "Salle de sport",
      "Spa & massage sur réservation",
      "Navette aéroport Nsimalen",
      "Blanchisserie & pressing",
      "Climatisation dans tout l'hôtel",
      "Room service 24h/24",
      "Réception & sécurité 24h/24",
    ],
  },
  gallery: {
    eyebrow: "Galerie",
    title: "L'hôtel en images",
    text:
      "Chambres, salles, réceptions et cour intérieure : découvrez l'Hôtel Excellexior tel que nos clients le vivent. Touchez une photo pour l'agrandir.",
  },
  testimonials: {
    eyebrow: "Ils nous ont fait confiance",
    title: "La parole à nos clients",
    items: [
      {
        quote:
          "Séminaire de 80 personnes organisé sans accroc : salle impeccable, pause-café soignée et équipe aux petits soins.",
        name: "Brice M.",
        role: "Directeur commercial, Yaoundé",
      },
      {
        quote:
          "Notre mariage à l'hôtel restera gravé dans nos mémoires. Décoration, traiteur et parking pour nos invités : tout était parfait.",
        name: "Carine & Steve",
        role: "Mariés en 2025",
      },
      {
        quote:
          "En déplacement professionnel toutes les semaines, je choisis toujours l'Excellexior : chambre calme, Wi-Fi rapide et parking sécurisé pour mon véhicule.",
        name: "Dr. Ngo Bisseck",
        role: "Consultant indépendant",
      },
    ],
  },
  location: {
    eyebrow: "Nous trouver",
    title: "Au cœur de Yaoundé, facile d'accès",
    address: "Quartier Bastos, Yaoundé, Cameroun",
    access: "À environ 25 minutes de l'aéroport international de Nsimalen",
  },
  payment: {
    eyebrow: "Réservation simple & locale",
    title: "Payez comme vous le souhaitez",
    text:
      "Nous acceptons les moyens de paiement mobile les plus utilisés au Cameroun, en plus du paiement en espèces à votre arrivée.",
    steps: [
      {
        title: "1. Choisissez vos dates",
        description:
          "Sélectionnez votre chambre, vos dates et le nombre de voyageurs sur le formulaire de réservation.",
      },
      {
        title: "2. Payez un acompte",
        description: "Réglez l'acompte via Orange Money, MTN Mobile Money, ou optez pour un paiement à l'arrivée.",
      },
      {
        title: "3. Recevez la confirmation",
        description: "Notre équipe confirme votre réservation par email ou WhatsApp sous quelques heures.",
      },
    ],
    cta: "Démarrer ma réservation",
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Tout ce qu'il faut savoir",
    items: [
      {
        question: "Quels sont les horaires d'arrivée et de départ ?",
        answer:
          "L'arrivée (check-in) est possible à partir de 14h00 et le départ (check-out) avant 12h00. Un départ tardif peut être organisé sur demande, selon disponibilité.",
      },
      {
        question: "Le parking est-il payant ?",
        answer:
          "Le parking interne est gratuit pour les clients résidents. Le parking externe est disponible pour les visiteurs et invités d'événements, avec un tarif préférentiel communiqué à la réservation.",
      },
      {
        question: "Puis-je payer par Orange Money ou MTN Mobile Money ?",
        answer:
          "Oui. Lors de la réservation, choisissez Orange Money ou MTN Mobile Money : vous recevrez le numéro marchand et les instructions pour effectuer votre dépôt, puis indiquerez la référence de transaction.",
      },
      {
        question: "Organisez-vous des mariages et événements d'entreprise ?",
        answer:
          "Oui, notre équipe événementielle organise mariages, réceptions et réunions professionnelles jusqu'à 300 invités, avec traiteur, décoration et parking dédié.",
      },
      {
        question: "Y a-t-il une politique d'annulation ?",
        answer:
          "Les réservations peuvent être annulées ou modifiées gratuitement jusqu'à 48h avant l'arrivée. Contactez-nous par téléphone, email ou WhatsApp pour toute modification.",
      },
      {
        question: "Le Wi-Fi est-il inclus ?",
        answer: "Le Wi-Fi fibre haut débit est gratuit dans toutes les chambres et espaces communs de l'hôtel.",
      },
    ],
  },
  finalCta: {
    title: "Prêt à vivre l'expérience Excellexior ?",
    text: "Notre équipe vous répond sous quelques heures, par téléphone, WhatsApp ou email.",
    cta: "Réserver maintenant",
  },
  roomsPage: {
    eyebrow: "Hébergement",
    title: "Nos chambres & suites",
    text: "Quatre catégories pensées pour chaque type de séjour, de la chambre Standard à la Suite Présidentielle.",
  },
  rooms: Object.fromEntries(
    ROOM_TYPES.map((room) => [
      room.slug,
      {
        name: room.name as string,
        price: room.price as number,
        capacity: room.capacity as number,
        size: room.size as number,
        description: room.description as string,
        amenities: [...room.amenities] as string[],
      },
    ]),
  ) as Record<(typeof ROOM_TYPES)[number]["slug"], RoomContent>,
};

type RoomContent = {
  name: string;
  price: number;
  capacity: number;
  size: number;
  description: string;
  amenities: string[];
};

export type SiteContent = typeof DEFAULT_CONTENT;
export type ContentSectionId = keyof SiteContent;

/** Sections as listed in /admin/textes, grouped by page. */
export const CONTENT_SECTIONS: { id: ContentSectionId; label: string; page: "Accueil" | "Chambres" }[] = [
  { id: "hero", label: "Bannière", page: "Accueil" },
  { id: "roomsTeaser", label: "Aperçu des chambres", page: "Accueil" },
  { id: "stats", label: "Chiffres clés", page: "Accueil" },
  { id: "about", label: "Notre maison", page: "Accueil" },
  { id: "events", label: "Salles de réunion & événementiel", page: "Accueil" },
  { id: "parking", label: "Parking", page: "Accueil" },
  { id: "services", label: "Équipements & services", page: "Accueil" },
  { id: "gallery", label: "Galerie", page: "Accueil" },
  { id: "testimonials", label: "Témoignages", page: "Accueil" },
  { id: "location", label: "Nous trouver", page: "Accueil" },
  { id: "payment", label: "Paiement", page: "Accueil" },
  { id: "faq", label: "Questions fréquentes", page: "Accueil" },
  { id: "finalCta", label: "Appel final", page: "Accueil" },
  { id: "roomsPage", label: "En-tête de la page", page: "Chambres" },
  { id: "rooms", label: "Les 4 chambres (aussi dans le formulaire de réservation)", page: "Chambres" },
];

/**
 * Human labels for fields, keyed by path with array indices written "*"
 * (e.g. "faq.items.*.question"). Fields without an entry fall back to a
 * generic label in the admin form.
 */
export const FIELD_LABELS: Record<string, string> = {
  eyebrow: "Petit titre (au-dessus)",
  title: "Titre",
  text: "Texte",
  cta: "Texte du bouton",
  link: "Texte du lien",
  "hero.title": "Titre principal",
  "hero.subtitle": "Texte sous le titre",
  "hero.primaryCta": "Bouton principal",
  "hero.secondaryCta": "Bouton secondaire",
  "hero.airportTitle": "Encadré aéroport — titre",
  "hero.airportValue": "Encadré aéroport — durée",
  "hero.airportNote": "Encadré aéroport — note",
  "stats.items": "Chiffre",
  "stats.items.*.value": "Valeur (ex. 48, 60+, 25 min)",
  "stats.items.*.label": "Libellé",
  "about.highlights": "Points forts (un par ligne)",
  "events.spaces": "Espace",
  "events.spaces.*.name": "Nom",
  "events.spaces.*.capacity": "Capacité",
  "events.spaces.*.bestFor": "Idéal pour",
  "events.spaces.*.features": "Atouts (un par ligne)",
  "parking.features": "Atout",
  "parking.features.*.title": "Titre",
  "parking.features.*.description": "Description",
  "services.items": "Services (un par ligne)",
  "testimonials.items": "Témoignage",
  "testimonials.items.*.quote": "Citation (laisser vide pour masquer)",
  "testimonials.items.*.name": "Nom",
  "testimonials.items.*.role": "Fonction / précision",
  "location.address": "Adresse",
  "location.access": "Accès",
  "payment.steps": "Étape",
  "payment.steps.*.title": "Titre",
  "payment.steps.*.description": "Description",
  "faq.items": "Question",
  "faq.items.*.question": "Question (laisser vide pour masquer)",
  "faq.items.*.answer": "Réponse",
  "rooms.*.name": "Nom",
  "rooms.*.price": "Prix par nuit (FCFA)",
  "rooms.*.capacity": "Personnes",
  "rooms.*.size": "Surface (m²)",
  "rooms.*.description": "Description",
  "rooms.*.amenities": "Équipements (un par ligne)",
};

/**
 * Overlays `stored` on `fallback`, keeping only values of the same type as
 * the default (strings stay strings, numbers stay finite numbers, lists keep
 * their length for object lists). Anything malformed falls back silently.
 */
export function mergeValue<T>(fallback: T, stored: unknown): T {
  if (typeof fallback === "string") {
    return (typeof stored === "string" ? stored.slice(0, 2000) : fallback) as T;
  }
  if (typeof fallback === "number") {
    return (typeof stored === "number" && Number.isFinite(stored) ? stored : fallback) as T;
  }
  if (Array.isArray(fallback)) {
    if (!Array.isArray(stored)) return fallback;
    if (fallback.every((item) => typeof item === "string")) {
      return stored
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.slice(0, 300))
        .filter((item) => item.trim() !== "")
        .slice(0, 30) as T;
    }
    return fallback.map((item, i) => mergeValue(item, stored[i])) as T;
  }
  if (fallback && typeof fallback === "object") {
    const source = stored && typeof stored === "object" ? (stored as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(fallback).map(([key, value]) => [key, mergeValue(value, source[key])]),
    ) as T;
  }
  return fallback;
}

export function isContentSection(id: string): id is ContentSectionId {
  return Object.hasOwn(DEFAULT_CONTENT, id);
}

/** Room types with their editable fields taken from the site content. */
export function roomsWithContent(content: SiteContent) {
  return ROOM_TYPES.map((room) => ({ ...room, ...content.rooms[room.slug] }));
}
