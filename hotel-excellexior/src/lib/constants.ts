export const SITE = {
  name: "Hotel Excellexior",
  tagline: "L'excellence hôtelière au cœur de Yaoundé",
  city: "Yaoundé",
  country: "Cameroun",
  address: "Quartier Bastos, Yaoundé, Cameroun",
  phone: "+237 6XX XXX XXX",
  phoneHref: "+2376XXXXXXXX",
  email: "contact@hotelexcellexior.cm",
  facebook: "https://www.facebook.com/Hotelexcellexior",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237670000000",
  orangeMoneyNumber: process.env.NEXT_PUBLIC_ORANGE_MONEY_NUMBER ?? "237690000000",
  mtnMomoNumber: process.env.NEXT_PUBLIC_MTN_MOMO_NUMBER ?? "237670000000",
} as const;

export const ROOM_TYPES = [
  {
    slug: "standard",
    name: "Chambre Standard",
    price: 35000,
    capacity: 2,
    size: 22,
    description:
      "Confortable et lumineuse, idéale pour les voyageurs d'affaires ou un court séjour à Yaoundé.",
    amenities: ["Lit Queen Size", "Climatisation", "Wi-Fi haut débit", "TV écran plat", "Salle de bain privée", "Bureau de travail"],
  },
  {
    slug: "deluxe",
    name: "Chambre Deluxe",
    price: 55000,
    capacity: 2,
    size: 30,
    description:
      "Plus spacieuse, avec coin salon et vue dégagée sur la ville, pensée pour un séjour prolongé.",
    amenities: ["Lit King Size", "Coin salon", "Climatisation", "Wi-Fi haut débit", "Minibar", "Peignoirs & chaussons", "Room service"],
  },
  {
    slug: "suite-executive",
    name: "Suite Exécutive",
    price: 85000,
    capacity: 3,
    size: 45,
    description:
      "Suite haut de gamme avec salon séparé, parfaite pour les cadres et hôtes de marque.",
    amenities: ["Chambre + salon séparé", "Baignoire & douche", "Machine à café", "Coffre-fort", "Service de blanchisserie prioritaire", "Accès lounge"],
  },
  {
    slug: "suite-presidentielle",
    name: "Suite Présidentielle",
    price: 150000,
    capacity: 4,
    size: 70,
    description:
      "Notre plus grand espace : réception privée, salle à manger et vue panoramique sur Yaoundé.",
    amenities: ["Salle à manger privée", "Salon de réception", "2 salles de bain", "Butler sur demande", "Transfert aéroport inclus", "Vue panoramique"],
  },
] as const;

export type RoomSlug = (typeof ROOM_TYPES)[number]["slug"];

export const GALLERY_ALBUM = "gallery";
export const roomAlbum = (slug: RoomSlug) => `room:${slug}`;

// Photo albums editable from /admin/photos, with the maximum number of
// photos each one accepts.
export const PHOTO_ALBUMS = [
  ...ROOM_TYPES.map((room) => ({ id: roomAlbum(room.slug), label: room.name, max: 5 })),
  { id: GALLERY_ALBUM, label: "Galerie de la page d'accueil", max: 12 },
];

export const MEETING_SPACES = [
  {
    name: "Salle de Conférence Excellexior",
    photo: "/photos/salle-conference.webp",
    capacity: "Jusqu'à 120 personnes",
    bestFor: "Conférences, séminaires, assemblées générales",
    features: ["Sonorisation professionnelle", "Vidéoprojecteur & écran géant", "Wi-Fi dédié", "Climatisation", "Pause-café & restauration sur demande"],
  },
  {
    name: "Salons Privés d'Affaires",
    photo: "/photos/salon-affaires.webp",
    capacity: "8 à 40 personnes",
    bestFor: "Réunions de direction, formations, entretiens",
    features: ["Configuration modulable (U, théâtre, classe)", "Écran interactif", "Service traiteur", "Secrétariat sur demande"],
  },
  {
    name: "Jardin & Terrasse Événementielle",
    photo: "/photos/salle-banquet.webp",
    capacity: "Jusqu'à 300 invités",
    bestFor: "Mariages, réceptions, cocktails d'entreprise",
    features: ["Espace extérieur paysager", "Décoration personnalisable", "Traiteur & bar dédiés", "Éclairage d'ambiance", "Parking dédié aux invités"],
  },
] as const;

export const SERVICES = [
  "Wi-Fi gratuit haut débit",
  "Restaurant & Bar panoramique",
  "Petit-déjeuner buffet inclus",
  "Piscine extérieure",
  "Salle de sport (Fitness)",
  "Spa & massage sur réservation",
  "Navette aéroport (Nsimalen)",
  "Room service 24h/24",
  "Blanchisserie & pressing",
  "Climatisation dans tout l'hôtel",
  "Coffre-fort en chambre",
  "Réception ouverte 24h/24",
] as const;

export const PAYMENT_METHODS = [
  { id: "ORANGE_MONEY", label: "Orange Money", number: SITE.orangeMoneyNumber },
  { id: "MTN_MOMO", label: "MTN Mobile Money", number: SITE.mtnMomoNumber },
  { id: "CASH_ON_ARRIVAL", label: "Paiement à l'arrivée (cash)", number: null },
] as const;

export type ReservationStatusValue = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PaymentStatusValue = "NONE" | "AWAITING_CONFIRMATION" | "CONFIRMED" | "FAILED";
export type MessageStatusValue = "NEW" | "READ" | "REPLIED";
