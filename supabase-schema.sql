-- ==============================================================================
-- GANN FACTURE — SCHÉMA COMPLET SUPABASE POSTGRESQL
-- À copier et coller dans Supabase Dashboard > SQL Editor > New query > Run (Ctrl+Enter)
-- ==============================================================================

-- 1. Table des Paramètres de l'Entreprise
CREATE TABLE IF NOT EXISTS company_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  company_name TEXT NOT NULL DEFAULT 'Africa Digital Hub SARL',
  nif_rccm TEXT DEFAULT 'RCCM CI-ABJ-2023-B-11429 • NIF 2349182 A',
  email TEXT DEFAULT 'amadou@africabiz.sn',
  phone TEXT DEFAULT '+221 77 654 32 10 / +225 07 89 45 12',
  address TEXT DEFAULT 'Immeuble Horizon, Plateau',
  city TEXT DEFAULT 'Abidjan & Dakar',
  country TEXT DEFAULT 'Côte d''Ivoire / Sénégal',
  currency TEXT DEFAULT 'FCFA',
  default_tax_rate NUMERIC DEFAULT 18,
  wave_number TEXT DEFAULT '+221 77 654 32 10',
  orange_money_number TEXT DEFAULT '+225 07 89 45 12',
  mtn_number TEXT DEFAULT '+229 97 12 34 56',
  bank_name TEXT DEFAULT 'Société Générale Côte d''Ivoire (SGCI)',
  bank_iban_rib TEXT DEFAULT 'CI092 01001 00234567890 45',
  invoice_prefix TEXT DEFAULT 'FAC-2026-',
  notes_mention TEXT DEFAULT 'Paiement exigible sous 30 jours. Tout retard entraîne une indemnité légale de 5% par mois de retard.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des Clients
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT DEFAULT 'Abidjan',
  country TEXT DEFAULT 'Côte d''Ivoire',
  total_billed NUMERIC DEFAULT 0,
  total_paid NUMERIC DEFAULT 0,
  invoice_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des Factures
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  client_id TEXT REFERENCES clients(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  client_city TEXT,
  client_country TEXT,
  category TEXT DEFAULT 'Développement Web',
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- 'draft', 'sent', 'paid', 'overdue'
  payment_method TEXT DEFAULT 'Wave',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table des Lignes de Facture (Items)
CREATE TABLE IF NOT EXISTS invoice_items (
  id TEXT PRIMARY KEY,
  invoice_id TEXT REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table des Paiements / Règlements
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  invoice_id TEXT REFERENCES invoices(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL,
  method TEXT NOT NULL, -- 'Wave', 'Orange Money', 'MTN MoMo', 'Virement bancaire'
  reference TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Autoriser la lecture et l'écriture avec la clé anon (application SaaS)
DROP POLICY IF EXISTS "Public company_settings" ON company_settings;
CREATE POLICY "Public company_settings" ON company_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public clients" ON clients;
CREATE POLICY "Public clients" ON clients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public invoices" ON invoices;
CREATE POLICY "Public invoices" ON invoices FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public invoice_items" ON invoice_items;
CREATE POLICY "Public invoice_items" ON invoice_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public payments" ON payments;
CREATE POLICY "Public payments" ON payments FOR ALL USING (true) WITH CHECK (true);

-- Initialisation des paramètres par défaut
INSERT INTO company_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
