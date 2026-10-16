# Hôtel Excellexior — site web

Site vitrine et réservation pour l'Hôtel Excellexior (Yaoundé, Cameroun) :
chambres, salles de réunion, événementiel, parking sécurisé, formulaire de
réservation avec Orange Money / MTN Mobile Money, et espace admin.

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion ·
Prisma + SQLite · react-hook-form + zod.

## Démarrer en local

```bash
npm install
npm run db:push   # crée la base SQLite à partir du schéma Prisma
npm run db:seed   # crée le compte admin défini dans .env
npm run dev
```

Site public : http://localhost:3000
Espace admin : http://localhost:3000/admin/login

## Variables d'environnement

Copier `.env.example` vers `.env` et ajuster :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp de l'hôtel (format international, sans `+`) |
| `NEXT_PUBLIC_ORANGE_MONEY_NUMBER` / `NEXT_PUBLIC_MTN_MOMO_NUMBER` | Numéros marchands affichés aux clients pour le dépôt |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Identifiants créés par `npm run db:seed` |
| `AUTH_SECRET` | Chaîne aléatoire longue servant à signer les sessions admin |

## Ce qui est prêt à l'emploi

- Page d'accueil avec toutes les sections (chambres en aperçu, salles de
  réunion & événementiel, parking, services, galerie, témoignages,
  localisation, moyens de paiement, FAQ).
- Page `/chambres` : détail des 4 catégories de chambres.
- Page `/contact` : formulaire de réservation + formulaire de contact,
  enregistrés en base de données.
- Bouton WhatsApp flottant + liens directs partout sur le site.
- Espace admin (`/admin`) protégé par mot de passe : tableau de bord,
  gestion des réservations (statut, confirmation de paiement), messages.

## Ce qu'il reste à brancher avant la mise en ligne

1. **Photos réelles.** Le site n'a pas pu récupérer les visuels de la page
   Facebook de l'hôtel (cet environnement de build n'a pas d'accès internet
   sortant). Chaque photo est donc un emplacement réservé stylisé
   (`PhotoPlaceholder`) — à remplacer par de vraies images (`next/image`)
   dans `src/lib/constants.ts` et les composants `sections/*`.
2. **Coordonnées réelles.** Téléphone, adresse exacte et numéros Mobile
   Money sont des valeurs d'exemple dans `src/lib/constants.ts` et `.env` —
   à remplacer par les vraies informations de l'hôtel.
3. **Paiement Orange Money / MTN Mobile Money.** Sans contrat marchand
   actif, le site ne peut pas débiter automatiquement un client. Le
   formulaire de réservation affiche donc le numéro marchand de l'hôtel et
   demande la référence de transaction après un dépôt manuel ; l'admin
   confirme ensuite le paiement dans le tableau de bord. Pour un paiement
   automatique en ligne (API Orange Money Web Payment / MTN MoMo
   Collection), il faudra un compte marchand actif et brancher ces API dans
   `src/app/api/reservations/route.ts`.
4. **Email/SMS de confirmation automatique.** Les réservations et messages
   sont aujourd'hui uniquement visibles dans l'espace admin. Pour une
   notification automatique (email au client, SMS, notification interne),
   il faudra un fournisseur (ex. Resend, Twilio) et des clés API.
5. **Base de données en production.** SQLite convient en développement ;
   pour un déploiement (Vercel, VPS...), migrer vers Postgres/MySQL managé
   et ajuster `prisma/schema.prisma` (`provider`) + `DATABASE_URL`.

## Commandes utiles

```bash
npm run dev        # serveur de développement
npm run build       # build de production
npm run start        # lance le build de production
npm run lint          # ESLint
npm run db:push        # synchronise le schéma Prisma avec la base
npm run db:seed         # (re)crée le compte admin
npm run db:studio        # interface Prisma Studio pour explorer la base
```
