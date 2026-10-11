"use client";

import React, { useState } from "react";
import { X, Plus, Trash2, CheckCircle2, UserPlus } from "lucide-react";
import { formatFCFA } from "@/lib/utils";
import { Invoice, InvoiceItem } from "@/data/mock-data";
import { useApp } from "@/context/app-context";

export function CreateInvoiceModal() {
  const {
    isCreateInvoiceOpen,
    setIsCreateInvoiceOpen,
    clients,
    addInvoice,
    setIsCreateClientOpen,
    settings,
  } = useApp();

  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || "");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [category, setCategory] = useState("Développement Web");
  const [paymentMethod, setPaymentMethod] = useState("Wave");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "item-1",
      description: "Prestation de service & intégration API",
      quantity: 1,
      unitPrice: 1500000,
    },
  ]);

  if (!isCreateInvoiceOpen) return null;

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        description: "",
        quantity: 1,
        unitPrice: 250000,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Calculations
  const subtotalHT = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const taxRate = (settings?.defaultTaxRate || 18) / 100;
  const taxTVA = Math.round(subtotalHT * taxRate);
  const totalTTC = subtotalHT + taxTVA;

  const handleSubmit = (status: "draft" | "sent") => {
    if (!selectedClient) return;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `${settings.invoicePrefix}${Math.floor(Math.random() * 900) + 100}`,
      description: items[0]?.description || "Prestation de services",
      client: {
        id: selectedClient.id,
        name: selectedClient.name,
        company: selectedClient.company,
        email: selectedClient.email,
        phone: selectedClient.phone,
        city: selectedClient.city,
        country: selectedClient.country,
      },
      items: items,
      category: category,
      issueDate: issueDate,
      dueDate: dueDate,
      amount: totalTTC,
      status: status,
      paymentMethod: paymentMethod,
    };

    addInvoice(newInvoice);
    setIsCreateInvoiceOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#EBF5EF] border-b border-emerald-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Créer une nouvelle facture
            </h3>
            <p className="text-xs text-slate-500">
              Calcul automatique de la TVA 18% et devises en FCFA
            </p>
          </div>
          <button
            onClick={() => setIsCreateInvoiceOpen(false)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Client & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Client sélectionné *
                </label>
                <button
                  type="button"
                  onClick={() => setIsCreateClientOpen(true)}
                  className="text-[11px] text-[#0B8457] hover:underline flex items-center gap-1 font-medium"
                >
                  <UserPlus className="w-3 h-3" />
                  + Nouveau
                </button>
              </div>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company} — {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catégorie de prestation
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              >
                <option value="Développement Web">Développement Web & Mobile</option>
                <option value="Marketing Digital">Marketing Digital & Ads</option>
                <option value="Audit & Conseil">Audit & Conseil</option>
                <option value="Maintenance IT">Maintenance IT & Infogérance</option>
                <option value="Formation">Formation & Coaching</option>
                <option value="Design & Branding">Design & Branding</option>
                <option value="Intégration ERP">Intégration ERP Odoo</option>
                <option value="Infrastructure">Infrastructure Réseau & Cloud</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date d'émission
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date d'échéance
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Moyen préféré
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              >
                <option value="Wave">Wave</option>
                <option value="Orange Money">Orange Money</option>
                <option value="MTN MoMo">MTN MoMo</option>
                <option value="Virement bancaire">Virement bancaire</option>
              </select>
            </div>
          </div>

          {/* Line items section */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Lignes de facturation
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-xs text-[#0B8457] font-semibold hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une ligne</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Description de la prestation..."
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0B8457]"
                    />
                  </div>

                  <div className="w-16">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qté"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full px-2 py-1.5 text-xs text-center rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0B8457]"
                    />
                  </div>

                  <div className="w-28 sm:w-32">
                    <input
                      type="number"
                      placeholder="Prix unit. (FCFA)"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "unitPrice",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-2 py-1.5 text-xs text-right rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0B8457]"
                    />
                  </div>

                  <div className="w-24 text-right font-bold text-xs text-slate-800 hidden sm:block">
                    {formatFCFA(item.quantity * item.unitPrice)}
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Supprimer la ligne"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-[#EBF5EF] rounded-2xl p-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Sous-total HT :</span>
              <span className="font-medium">{formatFCFA(subtotalHT)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>TVA (18%) :</span>
              <span className="font-medium">{formatFCFA(taxTVA)}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-emerald-200">
              <span>Total TTC à payer :</span>
              <span className="text-[#0B8457]">{formatFCFA(totalTTC)}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsCreateInvoiceOpen(false)}
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-medium hover:bg-white transition-colors"
          >
            Annuler
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white transition-colors"
            >
              Sauvegarder brouillon
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("sent")}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Émettre et finaliser</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
