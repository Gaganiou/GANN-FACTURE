# GANN FACTURE — Documentation & Guide d'Architecture

> **SaaS de facturation et de gestion de trésorerie conçu pour les entrepreneurs, PME et freelances d'Afrique de l'Ouest et Centrale (Zone UEMOA / CEMAC).**

---

## 1. Ce que fait l'application

**GANN FACTURE** résout les défis concrets de facturation des entreprises africaines :
1. **Émission de factures professionnelles et normalisées** : Conformes aux exigences du droit commercial **OHADA** (numérotation séquentielle, mentions obligatoires, RCCM, NIF, ventilation de la TVA à 18%).
2. **Gestion des paiements adaptés au marché local** : Suivi des règlements instantanés par **Mobile Money** (**Wave**, **Orange Money**, **MTN MoMo**, **Moov Money**) et virements bancaires d'entreprises.
3. **Pilotage de la trésorerie en temps réel** : Suivi du taux de recouvrement, alertes sur les créances impayées et factures en retard avec canaux de relance directe (WhatsApp/Email).
4. **Répertoire client & historique commercial** : Suivi du chiffre d'affaires et des factures émises par client dans toute la sous-région (Côte d'Ivoire, Sénégal, Bénin, Burkina Faso, Mali, Togo, etc.).
5. **Comptabilité simplifiée** : Exportation des écritures en fichier CSV/Excel et impression PDF de factures acquittées avec cachet électronique.

---

## 2. Toutes les fonctionnalités implémentées

### A. Gestion du Cycle des Factures
- **Création dynamique de factures** :
  - Sélection d'un client dans le carnet d'adresses ou ajout rapide.
  - Ajout/suppression dynamique de lignes de prestations avec quantité, prix unitaire HT et calcul automatique en FCFA.
  - Calcul automatique en direct de la TVA (18%) et du montant Net TTC.
  - Choix du mode de règlement privilégié (Wave, OM, MTN MoMo, Virement).
  - Enregistrement immédiat au statut *Brouillon* ou *Émise / Envoyée*.
- **Tableau interactif & Filtres avancés** :
  - Filtres par statut en un clic : *Tous les statuts*, *Payée*, *Envoyée*, *En retard*, *Brouillon*.
  - Filtres avancés : filtrage par catégorie d'activité et tri (*Plus récent, Plus ancien, Montant croissant/décroissant*).
  - Barre de recherche en temps réel par nom de client, entreprise, description ou numéro de facture.
  - Pagination dynamique calculée automatiquement en fonction du nombre de résultats.
- **Actions sur chaque facture** :
  - **Voir le détail** : Aperçu de la facture complète conforme aux normes OHADA.
  - **Imprimer / PDF** : Impression immédiate via la boîte de dialogue système avec feuille de style optimisée.
  - **Marquer payée** : Mise à jour instantanée du statut et enregistrement automatique d'une ligne d'encaissement.
  - **Modifier** : Modal d'édition permettant de corriger la description, l'échéance, la catégorie ou le montant.
  - **Supprimer** : Suppression sécurisée avec confirmation et recalcul instantané des statistiques.

### B. Gestion des Clients
- Répertoire complet des clients (Nom, Entreprise, Email, Téléphone WhatsApp, Ville, Pays).
- Modal d'ajout `+ Nouveau Client`.
- Statistiques par client : Total facturé, total encaissé, nombre de factures associées.
- Action rapide pour créer directement une facture pré-assignée à un client.
- Suppression de client avec confirmation.

### C. Encaissements & Mobile Money
- Historique détaillé de tous les règlements reçus avec numéro de référence transactionnelle.
- Badges visuels distincts par moyen de paiement :
  - 🔵 **Wave** (Ciel)
  - 🟠 **Orange Money** (Ambre)
  - 🟡 **MTN MoMo** (Jaune)
  - 🟣 **Virement bancaire** (Violet)
- Modal `+ Enregistrer un encaissement` : permet d'encaisser une facture en attente et de solder son statut.
- Filtrage rapide par moyen de paiement.

### D. Finances & Rapports Analytiques
- Graphique interactif **Recharts** : Histogramme comparatif sur 6 mois entre montants facturés et montants effectivement encaissés.
- Ventilation du chiffre d'affaires par catégorie d'activité sous forme de jauges de contribution (Développement Web, Conseil, ERP, IT, etc.).
- Calcul dynamique du **Taux de recouvrement** effectif (% du CA encaissé).

### E. Documents & Conformité
- Liste des factures acquittées et justificatifs comptables.
- Prévisualisation et impression rapide d'une attestation de paiement avec mentions légales.

### F. Paramètres d'Entreprise
- Formulaire de configuration de la société : Raison sociale, NIF, RCCM, adresses, email, téléphone.
- Configuration des comptes marchands Mobile Money (numéros Wave, Orange Money, MTN MoMo) et coordonnées bancaires (IBAN / RIB).
- Taux de TVA personnalisable et mentions légales obligatoires de bas de page.
- Bouton de sauvegarde fonctionnel avec persistance dans le `localStorage`.

### G. Aide, Support & UX
- FAQ interactive avec accordéons dépliables sur la conformité OHADA, le fonctionnement du Mobile Money et l'export comptable.
- Boutons d'accès direct au support par WhatsApp et Email.
- Menu de notifications dans l'en-tête avec bouton « Tout marquer comme lu ».
- Système de notifications **Toast** (alertes en bas à droite confirmant chaque création, modification, suppression ou export).
- Exportation réelle au format `.csv` standardisé encodé en UTF-8 avec BOM (compatible Excel sans problème d'accents).

---

## 3. Structure des fichiers

```
d:\GANN FACTURE/
├── package.json                   # Dépendances (Next.js 14, React 18, Recharts, TailwindCSS, Lucide)
├── tsconfig.json                  # Configuration TypeScript et alias de chemin (@/*)
├── tailwind.config.ts             # Configuration Tailwind (palette, tokens, animations)
├── postcss.config.js              # Pipeline PostCSS
├── next.config.js                 # Configuration Next.js
│
└── src/
    ├── app/
    │   ├── layout.tsx             # Root layout avec polices et métadonnées SEO
    │   ├── globals.css            # Styles globaux et styles d'impression (@media print)
    │   └── page.tsx               # Point d'entrée principal orchestrant le Dashboard et ses vues
    │
    ├── context/
    │   └── app-context.tsx        # Store global réactif (Invoices, Clients, Payments, Settings, Toasts, Persistence)
    │
    ├── data/
    │   └── mock-data.ts           # Modèles TypeScript, données de départ Ouest-Africaines, calcul de stats, export CSV
    │
    ├── lib/
    │   └── utils.ts               # Utilitaires de formatage monétaire FCFA, dates JJ/MM/AAAA, helpers de classes (cn)
    │
    └── components/
        ├── layout/
        │   ├── sidebar.tsx        # Barre latérale avec logos, navigation principale, responsive mobile
        │   └── header.tsx         # En-tête avec recherche globale, + Nouvelle Facture, cloche et profil
        │
        ├── dashboard/
        │   ├── sub-header-tabs.tsx       # Onglets rapides (Vue d'ensemble, Factures, Clients, Encaissements, Finances)
        │   ├── stats-cards.tsx           # Les 4 cartes statistiques (Total facturé, encaissé, en attente, alertes)
        │   ├── invoices-table.tsx        # Tableau complet avec pagination réelle, filtres et menu d'actions (...)
        │   ├── create-invoice-modal.tsx  # Modal de création de facture avec calcul HT/TVA/TTC en direct
        │   ├── edit-invoice-modal.tsx    # Modal de modification des factures existantes
        │   ├── create-client-modal.tsx   # Modal d'ajout de nouveau client
        │   ├── record-payment-modal.tsx  # Modal d'enregistrement d'un encaissement
        │   └── invoice-detail-modal.tsx  # Modal d'affichage et impression de facture normalisée OHADA
        │
        ├── views/
        │   ├── overview-view.tsx         # Vue Tableau de bord (KPIs, actions rapides, graphique condensé, tableau)
        │   ├── invoices-view.tsx         # Vue dédiée Factures avec filtres et statistiques spécifiques
        │   ├── clients-view.tsx          # Vue dédiée Répertoire Clients avec cartes et totaux facturés
        │   ├── payments-view.tsx         # Vue dédiée Encaissements Mobile Money et Virements
        │   ├── reports-view.tsx          # Vue dédiée Finances & Graphiques analytiques Recharts
        │   ├── documents-view.tsx        # Vue dédiée Archivage et impression des justificatifs
        │   ├── settings-view.tsx         # Vue dédiée Paramètres d'entreprise et comptes marchands
        │   └── help-view.tsx             # Vue dédiée FAQ, conformité OHADA et support client
        │
        └── ui/
            └── toast.tsx                 # Composant de notifications toast temporaires
```

---

## 4. Technologies utilisées

| Technologie | Version | Rôle |
| :--- | :--- | :--- |
| **Next.js** | `14.2.35` (App Router) | Framework React Fullstack, architecture moderne de composants |
| **React** | `18.3.1` | Moteur UI réactif et gestion d'état |
| **TypeScript** | `5.9.3` | Typage strict de l'ensemble des entités métiers |
| **TailwindCSS** | `3.4.19` | Design system utilitaire, palette sobre et moderne |
| **Recharts** | `3.10.1` | Graphiques vectoriels interactifs (BarChart, ResponsiveContainer) |
| **Lucide React** | `1.55.0` | Iconographie moderne cohérente |
| **clsx & tailwind-merge** | Dernières | Concaténation propre et sécurisée des classes CSS conditionnelles |

---

## 5. Décisions de design et ergonomie

1. **Palette sobre et institutionnelle** :
   - Fond d'écran neutre doux : `#F4F6F5`.
   - Vert émeraude institutionnel fort : `#0B8457` (symbole de prospérité et de rigueur financière).
   - Accents doux : Menthe `#EBF5EF`, Ambre pour les factures envoyées, Rose pour les impayés/retards.
2. **Affichage adapté aux devises d'Afrique de l'Ouest (FCFA)** :
   - Formatage des montants sans centimes avec séparateurs d'espaces (`Intl.NumberFormat('fr-FR')`).
   - Mention claire de la devise : **FCFA (XOF/XAF)**.
3. **Formulaires fluides et sans friction** :
   - L'ajout d'une facture calcule immédiatement la TVA et le TTC dès la frappe des quantités ou prix.
   - Les boutons d'actions utilisent des retours haptiques visuels (`active:scale-95`, transitions fluides).
4. **Impression prête pour la production** :
   - Les modals de détail de facture intègrent une mise en page d'impression avec en-tête d'entreprise, coordonnées du client, tableau des prestations et mentions de conformité OHADA.

---

## 6. Instructions pour un futur modèle IA

Si un futur modèle IA ou un développeur reprend ce projet pour connecter la base de données ou ajouter des fonctionnalités :

1. **Remplacement du state local par une base de données** :
   - L'ensemble des appels de données est centralisé dans [app-context.tsx](file:///d:/GANN%20FACTURE/src/context/app-context.tsx).
   - Pour brancher une base de données (PostgreSQL via Prisma, Supabase, Firebase ou Neon), remplacer les manipulations directes du state dans `addInvoice`, `updateInvoice`, `deleteInvoice`, `markInvoiceAsPaid`, `addClient`, etc. par des **Server Actions** ou des routes API Next.js (`/api/invoices`, `/api/clients`, `/api/payments`).
   - Conserver les interfaces TypeScript définies dans [mock-data.ts](file:///d:/GANN%20FACTURE/src/data/mock-data.ts) comme schéma de validation (Zod).
2. **Ajout de passerelles de paiement automatisées (Webhooks)** :
   - Pour automatiser les encaissements, implémenter les webhooks de réception **Wave Merchant API** ou **PayDunya / CinetPay / FedaPay**.
   - Lorsqu'un webhook valide un paiement, déclencher `markInvoiceAsPaid` avec la référence externe de transaction.
3. **Génération PDF côté serveur** :
   - Bien que l'impression système soit active via `printInvoice()`, pour envoyer des factures PDF automatiquement par email/WhatsApp, utiliser `@react-pdf/renderer` ou `puppeteer` dans une route API `GET /api/invoices/[id]/pdf`.
4. **Multidevises & Multi-entreprises** :
   - La structure dans `DEFAULT_SETTINGS` est prête à accueillir le choix entre XOF, XAF, EUR et USD, ainsi qu'une clé d'isolation multi-tenant `companyId`.
