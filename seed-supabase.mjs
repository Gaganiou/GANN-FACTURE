import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://rzubzgeauohgwtjyqngm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dWJ6Z2VhdW9oZ3d0anlxbmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NDU4MzksImV4cCI6MjEwNzMyMTgzOX0.s0n5PdJ6MRUWVUMkYjn1CRK4lYu1U5yqihc_EV3dk4s"
);

const MOCK_CLIENTS = [
  { id: "cli-001", name: "Ibrahim Traoré", company: "Sahel Distribution SA", email: "ibrahim@saheldistrib.ci", phone: "+225 07 48 92 11", city: "Abidjan", country: "Côte d'Ivoire", total_billed: 4750000, total_paid: 4750000, invoice_count: 1, status: "active" },
  { id: "cli-002", name: "Fatou Bamba", company: "Ivoire Cosmétiques", email: "contact@ivoirecosmetics.com", phone: "+225 05 12 34 89", city: "Abidjan", country: "Côte d'Ivoire", total_billed: 1850000, total_paid: 0, invoice_count: 1, status: "active" },
  { id: "cli-003", name: "Mamadou Diop", company: "Teranga Logistique", email: "m.diop@terangalog.sn", phone: "+221 77 123 45 67", city: "Dakar", country: "Sénégal", total_billed: 8200000, total_paid: 8200000, invoice_count: 1, status: "active" },
  { id: "cli-004", name: "Aïcha Kone", company: "Kone Agro-Industrie", email: "aicha.kone@agro-kone.ci", phone: "+225 01 23 45 67", city: "Yamoussoukro", country: "Côte d'Ivoire", total_billed: 2450000, total_paid: 0, invoice_count: 1, status: "active" },
  { id: "cli-005", name: "Christian N'Goran", company: "Avenir Finance SARL", email: "ngoran@avenirfinance.com", phone: "+225 07 98 76 54", city: "Abidjan", country: "Côte d'Ivoire", total_billed: 950000, total_paid: 0, invoice_count: 1, status: "active" },
  { id: "cli-006", name: "Clarisse Houngbo", company: "Bénin Fret Express", email: "c.houngbo@beninfret.bj", phone: "+229 97 65 43 21", city: "Cotonou", country: "Bénin", total_billed: 6500000, total_paid: 6500000, invoice_count: 1, status: "active" },
  { id: "cli-007", name: "Seydou Keita", company: "Mali Solar Solutions", email: "seydou@malisolar.ml", phone: "+223 76 54 32 10", city: "Bamako", country: "Mali", total_billed: 1200000, total_paid: 1200000, invoice_count: 1, status: "active" },
  { id: "cli-008", name: "Hervé Zongo", company: "Faso Mining Equipments", email: "zongo@fasomining.bf", phone: "+226 70 12 34 56", city: "Ouagadougou", country: "Burkina Faso", total_billed: 3200000, total_paid: 3200000, invoice_count: 1, status: "active" }
];

const MOCK_INVOICES = [
  { id: "inv-001", invoice_number: "FAC-2026-0042", description: "Refonte plateforme e-commerce & API Mobile", client_name: "Ibrahim Traoré", client_company: "Sahel Distribution SA", client_email: "ibrahim@saheldistrib.ci", client_city: "Abidjan", client_phone: "+225 07 48 92 11", client_country: "Côte d'Ivoire", category: "Développement Web", issue_date: "2026-01-16", due_date: "2026-02-15", amount: 4750000, status: "paid", payment_method: "Wave" },
  { id: "inv-002", invoice_number: "FAC-2026-0041", description: "Campagne Marketing Digital & Ads Q1", client_name: "Fatou Bamba", client_company: "Ivoire Cosmétiques", client_email: "contact@ivoirecosmetics.com", client_city: "Abidjan", client_phone: "+225 05 12 34 89", client_country: "Côte d'Ivoire", category: "Marketing Digital", issue_date: "2026-01-15", due_date: "2026-01-30", amount: 1850000, status: "sent", payment_method: "Orange Money" },
  { id: "inv-003", invoice_number: "FAC-2026-0040", description: "Audit système d'information & Sécurité Cloud", client_name: "Mamadou Diop", client_company: "Teranga Logistique", client_email: "m.diop@terangalog.sn", client_city: "Dakar", client_phone: "+221 77 123 45 67", client_country: "Sénégal", category: "Audit & Conseil", issue_date: "2026-01-14", due_date: "2026-01-28", amount: 8200000, status: "paid", payment_method: "Virement bancaire" },
  { id: "inv-004", invoice_number: "FAC-2026-0039", description: "Contrat de maintenance annuelle infrastructure", client_name: "Aïcha Kone", client_company: "Kone Agro-Industrie", client_email: "aicha.kone@agro-kone.ci", client_city: "Yamoussoukro", client_phone: "+225 01 23 45 67", client_country: "Côte d'Ivoire", category: "Maintenance IT", issue_date: "2026-01-14", due_date: "2026-01-10", amount: 2450000, status: "overdue", payment_method: "Wave" },
  { id: "inv-005", invoice_number: "FAC-2026-0038", description: "Formation Power BI & Analyse financière", client_name: "Christian N'Goran", client_company: "Avenir Finance SARL", client_email: "ngoran@avenirfinance.com", client_city: "Abidjan", client_phone: "+225 07 98 76 54", client_country: "Côte d'Ivoire", category: "Formation", issue_date: "2026-01-12", due_date: "2026-02-12", amount: 950000, status: "sent", payment_method: "Orange Money" },
  { id: "inv-006", invoice_number: "FAC-2026-0037", description: "Conception identité visuelle & Charte graphique", client_name: "Seydou Keita", client_company: "Mali Solar Solutions", client_email: "seydou@malisolar.ml", client_city: "Bamako", client_phone: "+223 76 54 32 10", client_country: "Mali", category: "Design & Branding", issue_date: "2026-01-11", due_date: "2026-01-25", amount: 1200000, status: "paid", payment_method: "Wave" },
  { id: "inv-007", invoice_number: "FAC-2026-0036", description: "Déploiement ERP Odoo - Phase pilote", client_name: "Clarisse Houngbo", client_company: "Bénin Fret Express", client_email: "c.houngbo@beninfret.bj", client_city: "Cotonou", client_phone: "+229 97 65 43 21", client_country: "Bénin", category: "Intégration ERP", issue_date: "2026-01-10", due_date: "2026-02-28", amount: 6500000, status: "paid", payment_method: "MTN MoMo" },
  { id: "inv-008", invoice_number: "FAC-2026-0035", description: "Pack référencement SEO & Optimisation web", client_name: "Ousmane Camara", client_company: "Guinée Tech Ventures", client_email: "o.camara@guineetech.gn", client_city: "Conakry", client_phone: "+224 62 11 22 33", client_country: "Guinée", category: "Marketing Digital", issue_date: "2026-01-09", due_date: "2026-01-20", amount: 850000, status: "draft", payment_method: "Orange Money" },
  { id: "inv-009", invoice_number: "FAC-2026-0034", description: "Audit conformité fiscale & Déclarations", client_name: "Nathalie Dossou", client_company: "Cabinet Atlas Partenaires", client_email: "contact@atlas-partenaires.com", client_city: "Lomé", client_phone: "+228 90 12 34 56", client_country: "Togo", category: "Audit & Conseil", issue_date: "2026-01-08", due_date: "2026-01-05", amount: 1400000, status: "overdue", payment_method: "Virement bancaire" },
  { id: "inv-010", invoice_number: "FAC-2026-0033", description: "Installation réseau & Sécurisation VPN", client_name: "Hervé Zongo", client_company: "Faso Mining Equipments", client_email: "zongo@fasomining.bf", client_city: "Ouagadougou", client_phone: "+226 70 12 34 56", client_country: "Burkina Faso", category: "Infrastructure", issue_date: "2026-01-07", due_date: "2026-01-21", amount: 3200000, status: "paid", payment_method: "Wave" }
];

const MOCK_PAYMENTS = [
  { id: "pay-001", invoice_id: "inv-001", invoice_number: "FAC-2026-0042", client_name: "Ibrahim Traoré", company: "Sahel Distribution SA", amount: 4750000, payment_date: "2026-01-16", method: "Wave", reference: "WAV-CI-8492019", status: "completed" },
  { id: "pay-002", invoice_id: "inv-003", invoice_number: "FAC-2026-0040", client_name: "Mamadou Diop", company: "Teranga Logistique", amount: 8200000, payment_date: "2026-01-14", method: "Virement bancaire", reference: "VIR-SN-994021", status: "completed" },
  { id: "pay-003", invoice_id: "inv-006", invoice_number: "FAC-2026-0037", client_name: "Seydou Keita", company: "Mali Solar Solutions", amount: 1200000, payment_date: "2026-01-11", method: "Wave", reference: "WAV-ML-332901", status: "completed" },
  { id: "pay-004", invoice_id: "inv-007", invoice_number: "FAC-2026-0036", client_name: "Clarisse Houngbo", company: "Bénin Fret Express", amount: 6500000, payment_date: "2026-01-10", method: "MTN MoMo", reference: "MOM-BJ-847291", status: "completed" },
  { id: "pay-005", invoice_id: "inv-010", invoice_number: "FAC-2026-0033", client_name: "Hervé Zongo", company: "Faso Mining Equipments", amount: 3200000, payment_date: "2026-01-07", method: "Wave", reference: "WAV-BF-109283", status: "completed" }
];

async function run() {
  const { error: e1 } = await sb.from("clients").upsert(MOCK_CLIENTS);
  if (e1) console.error("Clients err:", e1);
  else console.log("OK_CLIENTS");

  const { error: e2 } = await sb.from("invoices").upsert(MOCK_INVOICES);
  if (e2) console.error("Invoices err:", e2);
  else console.log("OK_INVOICES");

  const { error: e3 } = await sb.from("payments").upsert(MOCK_PAYMENTS);
  if (e3) console.error("Payments err:", e3);
  else console.log("OK_PAYMENTS");

  console.log("BASE_INITIALISEE_AVEC_SUCCES");
}
run();
