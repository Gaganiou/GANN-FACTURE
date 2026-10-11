"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Invoice,
  Client,
  Payment,
  CompanySettings,
  DashboardStats,
  MOCK_INVOICES,
  MOCK_CLIENTS,
  MOCK_PAYMENTS,
  DEFAULT_SETTINGS,
  calculateStats,
  exportInvoicesToCSV,
} from "@/data/mock-data";

interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  invoices: Invoice[];
  clients: Client[];
  payments: Payment[];
  stats: DashboardStats;
  settings: CompanySettings;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Selection state
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (inv: Invoice | null) => void;
  editingInvoice: Invoice | null;
  setEditingInvoice: (inv: Invoice | null) => void;
  isCreateInvoiceOpen: boolean;
  setIsCreateInvoiceOpen: (open: boolean) => void;
  isCreateClientOpen: boolean;
  setIsCreateClientOpen: (open: boolean) => void;
  isRecordPaymentOpen: boolean;
  setIsRecordPaymentOpen: (open: boolean) => void;

  // Actions Full-Stack Supabase
  addInvoice: (inv: Invoice) => Promise<void>;
  updateInvoice: (id: string, fields: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  markInvoiceAsPaid: (id: string, method?: string) => Promise<void>;
  addClient: (cli: Client) => Promise<void>;
  updateClient: (id: string, fields: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  addPayment: (pay: Payment) => Promise<void>;
  updateSettings: (newSettings: CompanySettings) => Promise<void>;

  // Utilities
  toast: ToastMessage | null;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  exportInvoices: () => void;
  printInvoice: (invoice: Invoice) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  // Chargement initial depuis Supabase
  useEffect(() => {
    async function loadDataFromSupabase() {
      try {
        setIsLoading(true);

        const [resClients, resInvoices, resPayments, resSettings] = await Promise.all([
          supabase.from("clients").select("*").order("created_at", { ascending: false }),
          supabase.from("invoices").select("*").order("issue_date", { ascending: false }),
          supabase.from("payments").select("*").order("payment_date", { ascending: false }),
          supabase.from("company_settings").select("*").eq("id", "default").maybeSingle(),
        ]);

        if (resClients.data && resClients.data.length > 0) {
          setClients(
            resClients.data.map((c: any) => ({
              id: c.id,
              name: c.name,
              company: c.company,
              email: c.email || "",
              phone: c.phone || "",
              city: c.city || "Abidjan",
              country: c.country || "Côte d'Ivoire",
              totalBilled: Number(c.total_billed) || 0,
              totalPaid: Number(c.total_paid) || 0,
              invoiceCount: Number(c.invoice_count) || 0,
              status: c.status || "active",
              createdAt: c.created_at,
            }))
          );
        }

        if (resInvoices.data && resInvoices.data.length > 0) {
          setInvoices(
            resInvoices.data.map((i: any) => ({
              id: i.id,
              invoiceNumber: i.invoice_number,
              description: i.description,
              client: {
                id: i.client_id,
                name: i.client_name,
                company: i.client_company,
                email: i.client_email || "",
                phone: i.client_phone || "",
                city: i.client_city || "Abidjan",
                country: i.client_country || "Côte d'Ivoire",
              },
              category: i.category,
              issueDate: i.issue_date,
              dueDate: i.due_date,
              amount: Number(i.amount),
              status: i.status,
              paymentMethod: i.payment_method || "Wave",
            }))
          );
        }

        if (resPayments.data && resPayments.data.length > 0) {
          setPayments(
            resPayments.data.map((p: any) => ({
              id: p.id,
              invoiceId: p.invoice_id,
              invoiceNumber: p.invoice_number,
              clientName: p.client_name,
              company: p.company,
              amount: Number(p.amount),
              date: p.payment_date,
              method: p.method,
              reference: p.reference,
              status: p.status,
            }))
          );
        }

        if (resSettings.data) {
          const s = resSettings.data;
          setSettings({
            companyName: s.company_name || DEFAULT_SETTINGS.companyName,
            nifRccm: s.nif_rccm || DEFAULT_SETTINGS.nifRccm,
            email: s.email || DEFAULT_SETTINGS.email,
            phone: s.phone || DEFAULT_SETTINGS.phone,
            address: s.address || DEFAULT_SETTINGS.address,
            city: s.city || DEFAULT_SETTINGS.city,
            country: s.country || DEFAULT_SETTINGS.country,
            currency: s.currency || DEFAULT_SETTINGS.currency,
            defaultTaxRate: Number(s.default_tax_rate) || DEFAULT_SETTINGS.defaultTaxRate,
            waveNumber: s.wave_number || DEFAULT_SETTINGS.waveNumber,
            orangeMoneyNumber: s.orange_money_number || DEFAULT_SETTINGS.orangeMoneyNumber,
            mtnNumber: s.mtn_number || DEFAULT_SETTINGS.mtnNumber,
            bankName: s.bank_name || DEFAULT_SETTINGS.bankName,
            bankIbanRib: s.bank_iban_rib || DEFAULT_SETTINGS.bankIbanRib,
            invoicePrefix: s.invoice_prefix || DEFAULT_SETTINGS.invoicePrefix,
            notesMention: s.notes_mention || DEFAULT_SETTINGS.notesMention,
          });
        }
      } catch (err) {
        console.error("Erreur de synchronisation Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDataFromSupabase();
  }, []);

  const stats = calculateStats(invoices);

  // Actions Factures (Sauvegarde en base Supabase)
  const addInvoice = async (newInv: Invoice) => {
    // 1. Mise à jour immédiate optimiste de l'UI
    setInvoices([newInv, ...invoices]);
    showToast(`Facture ${newInv.invoiceNumber} enregistrée dans Supabase !`, "success");

    // 2. Écriture Supabase
    try {
      const { error } = await supabase.from("invoices").insert({
        id: newInv.id,
        invoice_number: newInv.invoiceNumber,
        description: newInv.description,
        client_name: newInv.client.name,
        client_company: newInv.client.company,
        client_email: newInv.client.email,
        client_phone: newInv.client.phone,
        client_city: newInv.client.city,
        client_country: newInv.client.country,
        category: newInv.category,
        issue_date: newInv.issueDate,
        due_date: newInv.dueDate,
        amount: newInv.amount,
        status: newInv.status,
        payment_method: newInv.paymentMethod || "Wave",
      });

      if (error) console.error("Erreur insertion invoice Supabase:", error);

      // Si la facture contient des items
      if (newInv.items && newInv.items.length > 0) {
        const itemsPayload = newInv.items.map((it) => ({
          id: it.id,
          invoice_id: newInv.id,
          description: it.description,
          quantity: it.quantity,
          unit_price: it.unitPrice,
        }));
        await supabase.from("invoice_items").insert(itemsPayload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateInvoice = async (id: string, fields: Partial<Invoice>) => {
    setInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, ...fields } : inv)));
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice({ ...selectedInvoice, ...fields });
    }
    showToast(`Facture mise à jour sur Supabase.`, "info");

    try {
      const updatePayload: any = {};
      if (fields.description !== undefined) updatePayload.description = fields.description;
      if (fields.amount !== undefined) updatePayload.amount = fields.amount;
      if (fields.dueDate !== undefined) updatePayload.due_date = fields.dueDate;
      if (fields.status !== undefined) updatePayload.status = fields.status;
      if (fields.category !== undefined) updatePayload.category = fields.category;

      await supabase.from("invoices").update(updatePayload).eq("id", id);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInvoice = async (id: string) => {
    const invToDelete = invoices.find((inv) => inv.id === id);
    setInvoices(invoices.filter((inv) => inv.id !== id));
    if (selectedInvoice?.id === id) setSelectedInvoice(null);
    showToast(`Facture ${invToDelete?.invoiceNumber || ""} supprimée.`, "info");

    try {
      await supabase.from("invoices").delete().eq("id", id);
    } catch (err) {
      console.error(err);
    }
  };

  const markInvoiceAsPaid = async (id: string, method: string = "Wave") => {
    const target = invoices.find((inv) => inv.id === id);
    if (!target) return;

    // Mise à jour de l'UI
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, status: "paid" as const, paymentMethod: method } : inv
      )
    );

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      invoiceId: target.id,
      invoiceNumber: target.invoiceNumber,
      clientName: target.client.name,
      company: target.client.company,
      amount: target.amount,
      date: new Date().toISOString().split("T")[0],
      method: (method as Payment["method"]) || "Wave",
      reference: `REG-${target.invoiceNumber.replace("FAC-", "")}-${Math.floor(Math.random() * 899 + 100)}`,
      status: "completed",
    };
    setPayments([newPayment, ...payments]);

    if (selectedInvoice?.id === id) {
      setSelectedInvoice({ ...selectedInvoice, status: "paid", paymentMethod: method });
    }

    showToast(`Facture ${target.invoiceNumber} payée & synchronisée (${method}) !`, "success");

    // Supabase
    try {
      await supabase
        .from("invoices")
        .update({ status: "paid", payment_method: method })
        .eq("id", id);

      await supabase.from("payments").insert({
        id: newPayment.id,
        invoice_id: newPayment.invoiceId,
        invoice_number: newPayment.invoiceNumber,
        client_name: newPayment.clientName,
        company: newPayment.company,
        amount: newPayment.amount,
        payment_date: newPayment.date,
        method: newPayment.method,
        reference: newPayment.reference,
        status: newPayment.status,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Actions Clients
  const addClient = async (cli: Client) => {
    setClients([cli, ...clients]);
    showToast(`Client ${cli.company} créé sur Supabase !`, "success");

    try {
      await supabase.from("clients").insert({
        id: cli.id,
        name: cli.name,
        company: cli.company,
        email: cli.email,
        phone: cli.phone,
        city: cli.city,
        country: cli.country,
        total_billed: cli.totalBilled,
        total_paid: cli.totalPaid,
        invoice_count: cli.invoiceCount,
        status: cli.status,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateClient = async (id: string, fields: Partial<Client>) => {
    setClients(clients.map((c) => (c.id === id ? { ...c, ...fields } : c)));
    showToast(`Client mis à jour.`, "info");

    try {
      await supabase.from("clients").update(fields).eq("id", id);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClient = async (id: string) => {
    const target = clients.find((c) => c.id === id);
    setClients(clients.filter((c) => c.id !== id));
    showToast(`Client ${target?.company || ""} supprimé.`, "info");

    try {
      await supabase.from("clients").delete().eq("id", id);
    } catch (err) {
      console.error(err);
    }
  };

  // Actions Paiements
  const addPayment = async (pay: Payment) => {
    setPayments([pay, ...payments]);
    if (pay.invoiceId) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === pay.invoiceId ? { ...inv, status: "paid" as const, paymentMethod: pay.method } : inv
        )
      );
    }
    showToast(`Encaissement de ${pay.amount.toLocaleString()} FCFA sauvegardé sur Supabase !`, "success");

    try {
      await supabase.from("payments").insert({
        id: pay.id,
        invoice_id: pay.invoiceId,
        invoice_number: pay.invoiceNumber,
        client_name: pay.clientName,
        company: pay.company,
        amount: pay.amount,
        payment_date: pay.date,
        method: pay.method,
        reference: pay.reference,
        status: pay.status,
      });

      if (pay.invoiceId) {
        await supabase
          .from("invoices")
          .update({ status: "paid", payment_method: pay.method })
          .eq("id", pay.invoiceId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Actions Paramètres
  const updateSettings = async (newSettings: CompanySettings) => {
    setSettings(newSettings);
    showToast(`Paramètres enregistrés dans Supabase.`, "success");

    try {
      await supabase.from("company_settings").upsert({
        id: "default",
        company_name: newSettings.companyName,
        nif_rccm: newSettings.nifRccm,
        email: newSettings.email,
        phone: newSettings.phone,
        address: newSettings.address,
        city: newSettings.city,
        country: newSettings.country,
        currency: newSettings.currency,
        default_tax_rate: newSettings.defaultTaxRate,
        wave_number: newSettings.waveNumber,
        orange_money_number: newSettings.orangeMoneyNumber,
        mtn_number: newSettings.mtnNumber,
        bank_name: newSettings.bankName,
        bank_iban_rib: newSettings.bankIbanRib,
        invoice_prefix: newSettings.invoicePrefix,
        notes_mention: newSettings.notesMention,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const exportInvoices = () => {
    exportInvoicesToCSV(invoices);
    showToast(`Export CSV téléchargé (${invoices.length} factures) !`, "success");
  };

  const printInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <AppContext.Provider
      value={{
        invoices,
        clients,
        payments,
        stats,
        settings,
        isLoading,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedInvoice,
        setSelectedInvoice,
        editingInvoice,
        setEditingInvoice,
        isCreateInvoiceOpen,
        setIsCreateInvoiceOpen,
        isCreateClientOpen,
        setIsCreateClientOpen,
        isRecordPaymentOpen,
        setIsRecordPaymentOpen,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markInvoiceAsPaid,
        addClient,
        updateClient,
        deleteClient,
        addPayment,
        updateSettings,
        toast,
        showToast,
        exportInvoices,
        printInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
