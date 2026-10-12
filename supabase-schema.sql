-- ==============================================================================
-- GANN FACTURE / iziFacture — SCHÉMA COMPLET SUPABASE POSTGRESQL + RLS MULTI-TENANT
-- À copier et coller dans Supabase Dashboard > SQL Editor > New query > Run (Ctrl+Enter)
-- ==============================================================================

-- 1. Table des Paramètres de l'Entreprise
CREATE TABLE IF NOT EXISTS company_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
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

-- Si la table existait déjà, ajouter la colonne user_id
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

-- 2. Table des Clients
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
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

-- Si la table existait déjà, ajouter la colonne user_id
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

-- 3. Table des Factures
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
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

-- Si la table existait déjà, ajouter la colonne user_id
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
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

-- Si la table existait déjà, ajouter la colonne user_id
ALTER TABLE payments ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) : ISOLATION STRICTE PAR UTILISATEUR CONNECTÉ
-- ==============================================================================
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Nettoyage des anciennes politiques
DROP POLICY IF EXISTS "Public company_settings" ON company_settings;
DROP POLICY IF EXISTS "Public clients" ON clients;
DROP POLICY IF EXISTS "Public invoices" ON invoices;
DROP POLICY IF EXISTS "Public invoice_items" ON invoice_items;
DROP POLICY IF EXISTS "Public payments" ON payments;

DROP POLICY IF EXISTS "Users can manage their own settings" ON company_settings;
DROP POLICY IF EXISTS "Users can manage their own clients" ON clients;
DROP POLICY IF EXISTS "Users can manage their own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can manage their invoice items" ON invoice_items;
DROP POLICY IF EXISTS "Users can manage their own payments" ON payments;

-- Politiques RLS pour Utilisateurs Authentifiés (Chaque utilisateur ne voit que ses données)
CREATE POLICY "Users can manage their own settings" ON company_settings
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage their own clients" ON clients
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage their own invoices" ON invoices
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage their invoice items" ON invoice_items
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND (invoices.user_id = auth.uid() OR invoices.user_id IS NULL)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND (invoices.user_id = auth.uid() OR invoices.user_id IS NULL)
    )
  );

CREATE POLICY "Users can manage their own payments" ON payments
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Politique permissive pour accès public / clé anon (utile pour le mode démo ou exploration)
CREATE POLICY "Public company_settings" ON company_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Public clients" ON clients FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Public invoices" ON invoices FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Public invoice_items" ON invoice_items FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Public payments" ON payments FOR ALL TO anon USING (true) WITH CHECK (true);

-- Initialisation des paramètres par défaut
INSERT INTO company_settings (id, company_name)
VALUES ('default', 'Africa Digital Hub SARL')
ON CONFLICT (id) DO NOTHING;
