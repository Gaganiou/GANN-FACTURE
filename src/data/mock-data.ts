export type InvoiceStatus = "paid" | "sent" | "overdue" | "draft";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  client: {
    id?: string;
    name: string;
    company: string;
    email: string;
    phone?: string;
    city: string;
    country?: string;
  };
  items?: InvoiceItem[];
  category: string;
  issueDate: string; // ISO date YYYY-MM-DD
  dueDate: string;
  amount: number; // Montant TTC en FCFA
  status: InvoiceStatus;
  paymentMethod?: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  totalBilled: number;
  totalPaid: number;
  invoiceCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  company: string;
  amount: number;
  date: string;
  method: "Wave" | "Orange Money" | "MTN MoMo" | "Moov Money" | "Virement bancaire" | "Chèque" | "Espèces";
  reference: string;
  status: "completed" | "pending";
}

export interface DashboardStats {
  totalInvoices: number;
  totalBilled: number;
  totalPaid: number;
  totalPending: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  draftCount: number;
}

export interface CompanySettings {
  companyName: string;
  nifRccm: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  currency: string;
  defaultTaxRate: number; // e.g. 18%
  waveNumber: string;
  orangeMoneyNumber: string;
  mtnNumber: string;
  bankName: string;
  bankIbanRib: string;
  invoicePrefix: string;
  notesMention: string;
}

export const DEFAULT_SETTINGS: CompanySettings = {
  companyName: "Africa Digital Hub SARL",
  nifRccm: "RCCM CI-ABJ-2023-B-11429 • NIF 2349182 A",
  email: "amadou@africabiz.sn",
  phone: "+221 77 654 32 10 / +225 07 89 45 12",
  address: "Immeuble Horizon, Plateau",
  city: "Abidjan & Dakar",
  country: "Côte d'Ivoire / Sénégal",
  currency: "FCFA",
  defaultTaxRate: 18,
  waveNumber: "+221 77 654 32 10",
  orangeMoneyNumber: "+225 07 89 45 12",
  mtnNumber: "+229 97 12 34 56",
  bankName: "Société Générale Côte d'Ivoire (SGCI)",
  bankIbanRib: "CI092 01001 00234567890 45",
  invoicePrefix: "FAC-2026-",
  notesMention: "Paiement exigible sous 30 jours. Tout retard entraîne une indemnité légale de 5% par mois de retard.",
};

export const MOCK_CLIENTS: Client[] = [
  {
    id: "cli-001",
    name: "Ibrahim Traoré",
    company: "Sahel Distribution SA",
    email: "ibrahim@saheldistrib.ci",
    phone: "+225 07 48 92 11",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    totalBilled: 4750000,
    totalPaid: 4750000,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-11-10",
  },
  {
    id: "cli-002",
    name: "Fatou Bamba",
    company: "Ivoire Cosmétiques",
    email: "contact@ivoirecosmetics.com",
    phone: "+225 05 12 34 89",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    totalBilled: 1850000,
    totalPaid: 0,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-12-02",
  },
  {
    id: "cli-003",
    name: "Mamadou Diop",
    company: "Teranga Logistique",
    email: "m.diop@terangalog.sn",
    phone: "+221 77 123 45 67",
    city: "Dakar",
    country: "Sénégal",
    totalBilled: 8200000,
    totalPaid: 8200000,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-09-15",
  },
  {
    id: "cli-004",
    name: "Aïcha Kone",
    company: "Kone Agro-Industrie",
    email: "aicha.kone@agro-kone.ci",
    phone: "+225 01 23 45 67",
    city: "Yamoussoukro",
    country: "Côte d'Ivoire",
    totalBilled: 2450000,
    totalPaid: 0,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-10-20",
  },
  {
    id: "cli-005",
    name: "Christian N'Goran",
    company: "Avenir Finance SARL",
    email: "ngoran@avenirfinance.com",
    phone: "+225 07 98 76 54",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    totalBilled: 950000,
    totalPaid: 0,
    invoiceCount: 1,
    status: "active",
    createdAt: "2026-01-05",
  },
  {
    id: "cli-006",
    name: "Clarisse Houngbo",
    company: "Bénin Fret Express",
    email: "c.houngbo@beninfret.bj",
    phone: "+229 97 65 43 21",
    city: "Cotonou",
    country: "Bénin",
    totalBilled: 6500000,
    totalPaid: 6500000,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-08-14",
  },
  {
    id: "cli-007",
    name: "Seydou Keita",
    company: "Mali Solar Solutions",
    email: "seydou@malisolar.ml",
    phone: "+223 76 54 32 10",
    city: "Bamako",
    country: "Mali",
    totalBilled: 1200000,
    totalPaid: 1200000,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-11-28",
  },
  {
    id: "cli-008",
    name: "Hervé Zongo",
    company: "Faso Mining Equipments",
    email: "zongo@fasomining.bf",
    phone: "+226 70 12 34 56",
    city: "Ouagadougou",
    country: "Burkina Faso",
    totalBilled: 3200000,
    totalPaid: 3200000,
    invoiceCount: 1,
    status: "active",
    createdAt: "2025-07-19",
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "FAC-2026-0042",
    description: "Refonte plateforme e-commerce & API Mobile",
    client: {
      name: "Ibrahim Traoré",
      company: "Sahel Distribution SA",
      email: "ibrahim@saheldistrib.ci",
      city: "Abidjan",
      phone: "+225 07 48 92 11",
      country: "Côte d'Ivoire",
    },
    items: [
      { id: "1", description: "Audit UX/UI & Prototypage", quantity: 1, unitPrice: 1200000 },
      { id: "2", description: "Développement Front Next.js & Intégration Wave", quantity: 1, unitPrice: 2825424 },
    ],
    category: "Développement Web",
    issueDate: "2026-01-16",
    dueDate: "2026-02-15",
    amount: 4750000,
    status: "paid",
    paymentMethod: "Wave",
  },
  {
    id: "inv-002",
    invoiceNumber: "FAC-2026-0041",
    description: "Campagne Marketing Digital & Ads Q1",
    client: {
      name: "Fatou Bamba",
      company: "Ivoire Cosmétiques",
      email: "contact@ivoirecosmetics.com",
      city: "Abidjan",
      phone: "+225 05 12 34 89",
      country: "Côte d'Ivoire",
    },
    items: [
      { id: "1", description: "Stratégie Ads Meta & Google", quantity: 1, unitPrice: 850000 },
      { id: "2", description: "Gestion Community Management 2 mois", quantity: 2, unitPrice: 358898 },
    ],
    category: "Marketing Digital",
    issueDate: "2026-01-15",
    dueDate: "2026-01-30",
    amount: 1850000,
    status: "sent",
    paymentMethod: "Orange Money",
  },
  {
    id: "inv-003",
    invoiceNumber: "FAC-2026-0040",
    description: "Audit système d'information & Sécurité Cloud",
    client: {
      name: "Mamadou Diop",
      company: "Teranga Logistique",
      email: "m.diop@terangalog.sn",
      city: "Dakar",
      phone: "+221 77 123 45 67",
      country: "Sénégal",
    },
    items: [
      { id: "1", description: "Audit de vulnérabilité & Pentest", quantity: 1, unitPrice: 3500000 },
      { id: "2", description: "Migration Cloud & Redondance GCP", quantity: 1, unitPrice: 3450000 },
    ],
    category: "Audit & Conseil",
    issueDate: "2026-01-14",
    dueDate: "2026-01-28",
    amount: 8200000,
    status: "paid",
    paymentMethod: "Virement bancaire",
  },
  {
    id: "inv-004",
    invoiceNumber: "FAC-2026-0039",
    description: "Contrat de maintenance annuelle infrastructure",
    client: {
      name: "Aïcha Kone",
      company: "Kone Agro-Industrie",
      email: "aicha.kone@agro-kone.ci",
      city: "Yamoussoukro",
      phone: "+225 01 23 45 67",
      country: "Côte d'Ivoire",
    },
    items: [
      { id: "1", description: "Support SLA 24/7 & Monitoring", quantity: 12, unitPrice: 173022 },
    ],
    category: "Maintenance IT",
    issueDate: "2026-01-14",
    dueDate: "2026-01-10",
    amount: 2450000,
    status: "overdue",
    paymentMethod: "Wave",
  },
  {
    id: "inv-005",
    invoiceNumber: "FAC-2026-0038",
    description: "Formation Power BI & Analyse financière",
    client: {
      name: "Christian N'Goran",
      company: "Avenir Finance SARL",
      email: "ngoran@avenirfinance.com",
      city: "Abidjan",
      phone: "+225 07 98 76 54",
      country: "Côte d'Ivoire",
    },
    items: [
      { id: "1", description: "Session de formation 3 jours (5 pers.)", quantity: 1, unitPrice: 805085 },
    ],
    category: "Formation",
    issueDate: "2026-01-12",
    dueDate: "2026-02-12",
    amount: 950000,
    status: "sent",
    paymentMethod: "Orange Money",
  },
  {
    id: "inv-006",
    invoiceNumber: "FAC-2026-0037",
    description: "Conception identité visuelle & Charte graphique",
    client: {
      name: "Seydou Keita",
      company: "Mali Solar Solutions",
      email: "seydou@malisolar.ml",
      city: "Bamako",
      phone: "+223 76 54 32 10",
      country: "Mali",
    },
    items: [
      { id: "1", description: "Création logo, papeterie et brandbook", quantity: 1, unitPrice: 1016949 },
    ],
    category: "Design & Branding",
    issueDate: "2026-01-11",
    dueDate: "2026-01-25",
    amount: 1200000,
    status: "paid",
    paymentMethod: "Wave",
  },
  {
    id: "inv-007",
    invoiceNumber: "FAC-2026-0036",
    description: "Déploiement ERP Odoo - Phase pilote",
    client: {
      name: "Clarisse Houngbo",
      company: "Bénin Fret Express",
      email: "c.houngbo@beninfret.bj",
      city: "Cotonou",
      phone: "+229 97 65 43 21",
      country: "Bénin",
    },
    items: [
      { id: "1", description: "Paramétrage modules Ventes & Facturation", quantity: 1, unitPrice: 2800000 },
      { id: "2", description: "Migration données historiques", quantity: 1, unitPrice: 2708475 },
    ],
    category: "Intégration ERP",
    issueDate: "2026-01-10",
    dueDate: "2026-02-28",
    amount: 6500000,
    status: "paid",
    paymentMethod: "MTN MoMo",
  },
  {
    id: "inv-008",
    invoiceNumber: "FAC-2026-0035",
    description: "Pack référencement SEO & Optimisation web",
    client: {
      name: "Ousmane Camara",
      company: "Guinée Tech Ventures",
      email: "o.camara@guineetech.gn",
      city: "Conakry",
      phone: "+224 62 11 22 33",
      country: "Guinée",
    },
    items: [
      { id: "1", description: "Audit SEO technique et Netlinking", quantity: 1, unitPrice: 720339 },
    ],
    category: "Marketing Digital",
    issueDate: "2026-01-09",
    dueDate: "2026-01-20",
    amount: 850000,
    status: "draft",
    paymentMethod: "Orange Money",
  },
  {
    id: "inv-009",
    invoiceNumber: "FAC-2026-0034",
    description: "Audit conformité fiscale & Déclarations",
    client: {
      name: "Nathalie Dossou",
      company: "Cabinet Atlas Partenaires",
      email: "contact@atlas-partenaires.com",
      city: "Lomé",
      phone: "+228 90 12 34 56",
      country: "Togo",
    },
    items: [
      { id: "1", description: "Revue comptes annuels & liasses", quantity: 1, unitPrice: 1186441 },
    ],
    category: "Audit & Conseil",
    issueDate: "2026-01-08",
    dueDate: "2026-01-05",
    amount: 1400000,
    status: "overdue",
    paymentMethod: "Virement bancaire",
  },
  {
    id: "inv-010",
    invoiceNumber: "FAC-2026-0033",
    description: "Installation réseau & Sécurisation VPN",
    client: {
      name: "Hervé Zongo",
      company: "Faso Mining Equipments",
      email: "zongo@fasomining.bf",
      city: "Ouagadougou",
      phone: "+226 70 12 34 56",
      country: "Burkina Faso",
    },
    items: [
      { id: "1", description: "Switches managés & Pare-feu Fortinet", quantity: 1, unitPrice: 2711864 },
    ],
    category: "Infrastructure",
    issueDate: "2026-01-07",
    dueDate: "2026-01-21",
    amount: 3200000,
    status: "paid",
    paymentMethod: "Wave",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-001",
    invoiceId: "inv-001",
    invoiceNumber: "FAC-2026-0042",
    clientName: "Ibrahim Traoré",
    company: "Sahel Distribution SA",
    amount: 4750000,
    date: "2026-01-16",
    method: "Wave",
    reference: "WAV-CI-8492019",
    status: "completed",
  },
  {
    id: "pay-002",
    invoiceId: "inv-003",
    invoiceNumber: "FAC-2026-0040",
    clientName: "Mamadou Diop",
    company: "Teranga Logistique",
    amount: 8200000,
    date: "2026-01-14",
    method: "Virement bancaire",
    reference: "VIR-SN-994021",
    status: "completed",
  },
  {
    id: "pay-003",
    invoiceId: "inv-006",
    invoiceNumber: "FAC-2026-0037",
    clientName: "Seydou Keita",
    company: "Mali Solar Solutions",
    amount: 1200000,
    date: "2026-01-11",
    method: "Wave",
    reference: "WAV-ML-332901",
    status: "completed",
  },
  {
    id: "pay-004",
    invoiceId: "inv-007",
    invoiceNumber: "FAC-2026-0036",
    clientName: "Clarisse Houngbo",
    company: "Bénin Fret Express",
    amount: 6500000,
    date: "2026-01-10",
    method: "MTN MoMo",
    reference: "MOM-BJ-847291",
    status: "completed",
  },
  {
    id: "pay-005",
    invoiceId: "inv-010",
    invoiceNumber: "FAC-2026-0033",
    clientName: "Hervé Zongo",
    company: "Faso Mining Equipments",
    amount: 3200000,
    date: "2026-01-07",
    method: "Wave",
    reference: "WAV-BF-109283",
    status: "completed",
  },
];

/**
 * Dynamically computes dashboard statistics from the actual invoices array.
 */
export function calculateStats(invoices: Invoice[]): DashboardStats {
  let totalBilled = 0;
  let totalPaid = 0;
  let totalPending = 0;
  let paidCount = 0;
  let pendingCount = 0;
  let overdueCount = 0;
  let draftCount = 0;

  for (const inv of invoices) {
    totalBilled += inv.amount;
    if (inv.status === "paid") {
      totalPaid += inv.amount;
      paidCount++;
    } else if (inv.status === "sent") {
      totalPending += inv.amount;
      pendingCount++;
    } else if (inv.status === "overdue") {
      totalPending += inv.amount;
      overdueCount++;
    } else if (inv.status === "draft") {
      draftCount++;
    }
  }

  return {
    totalInvoices: invoices.length,
    totalBilled,
    totalPaid,
    totalPending,
    paidCount,
    pendingCount,
    overdueCount,
    draftCount,
  };
}

export const MOCK_STATS: DashboardStats = calculateStats(MOCK_INVOICES);

/**
 * Generates and downloads an actual CSV file of invoices in the browser.
 */
export function exportInvoicesToCSV(invoices: Invoice[]) {
  const headers = [
    "N° Facture",
    "Description",
    "Client",
    "Entreprise",
    "Email",
    "Ville",
    "Catégorie",
    "Date Émission",
    "Échéance",
    "Montant (FCFA)",
    "Statut",
    "Moyen Paiement",
  ];

  const rows = invoices.map((inv) => [
    `"${inv.invoiceNumber}"`,
    `"${inv.description.replace(/"/g, '""')}"`,
    `"${inv.client.name.replace(/"/g, '""')}"`,
    `"${inv.client.company.replace(/"/g, '""')}"`,
    `"${inv.client.email}"`,
    `"${inv.client.city}"`,
    `"${inv.category}"`,
    `"${inv.issueDate}"`,
    `"${inv.dueDate}"`,
    inv.amount,
    `"${inv.status}"`,
    `"${inv.paymentMethod || ""}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `factures_gann_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
