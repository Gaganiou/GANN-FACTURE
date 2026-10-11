"use client";

import React, { useState, useEffect } from "react";
import { X, Save, FileEdit } from "lucide-react";
import { useApp } from "@/context/app-context";
import { Invoice, InvoiceStatus } from "@/data/mock-data";

export function EditInvoiceModal() {
  const { editingInvoice, setEditingInvoice, updateInvoice } = useApp();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<InvoiceStatus>("sent");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingInvoice) {
      setDescription(editingInvoice.description);
      setAmount(editingInvoice.amount);
      setDueDate(editingInvoice.dueDate);
      setStatus(editingInvoice.status);
      setCategory(editingInvoice.category);
    }
  }, [editingInvoice]);

  if (!editingInvoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInvoice(editingInvoice.id, {
      description,
      amount: Number(amount),
      dueDate,
      status,
      category,
    });
    setEditingInvoice(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#EBF5EF] border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B8457] text-white flex items-center justify-center">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Modifier la facture {editingInvoice.invoiceNumber}
              </h3>
              <p className="text-[11px] text-slate-500">
                Client : {editingInvoice.client.company}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditingInvoice(null)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description de la prestation *
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Montant Total (FCFA) *
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              >
                <option value="Développement Web">Développement Web</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Audit & Conseil">Audit & Conseil</option>
                <option value="Maintenance IT">Maintenance IT</option>
                <option value="Formation">Formation</option>
                <option value="Design & Branding">Design & Branding</option>
                <option value="Intégration ERP">Intégration ERP</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date d'échéance
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
              >
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyée</option>
                <option value="paid">Payée</option>
                <option value="overdue">En retard</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingInvoice(null)}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
