"use client";

import React, { useState } from "react";
import { X, CheckCircle, CreditCard, DollarSign } from "lucide-react";
import { useApp } from "@/context/app-context";
import { formatFCFA } from "@/lib/utils";
import { Payment } from "@/data/mock-data";

export function RecordPaymentModal() {
  const { isRecordPaymentOpen, setIsRecordPaymentOpen, invoices, addPayment } = useApp();

  // Only unpaid invoices
  const pendingInvoices = invoices.filter((inv) => inv.status !== "paid");

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(
    pendingInvoices[0]?.id || ""
  );
  const [method, setMethod] = useState<Payment["method"]>("Wave");
  const [reference, setReference] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  if (!isRecordPaymentOpen) return null;

  const currentInvoice = invoices.find((inv) => inv.id === selectedInvoiceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInvoice) return;

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      invoiceId: currentInvoice.id,
      invoiceNumber: currentInvoice.invoiceNumber,
      clientName: currentInvoice.client.name,
      company: currentInvoice.client.company,
      amount: currentInvoice.amount,
      date: paymentDate,
      method: method,
      reference: reference.trim() || `${method.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`,
      status: "completed",
    };

    addPayment(newPayment);
    setIsRecordPaymentOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#EBF5EF] border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B8457] text-white flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enregistrer un encaissement</h3>
              <p className="text-[11px] text-slate-500">Marquez une facture comme réglée et tracez le règlement</p>
            </div>
          </div>
          <button
            onClick={() => setIsRecordPaymentOpen(false)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {pendingInvoices.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              <p className="font-semibold">Toutes les factures sont actuellement réglées !</p>
              <p className="text-xs text-slate-400 mt-1">Aucune facture en attente de paiement.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Facture à régler *
                </label>
                <select
                  value={selectedInvoiceId}
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
                >
                  {pendingInvoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoiceNumber} • {inv.client.company} ({formatFCFA(inv.amount)})
                    </option>
                  ))}
                </select>
              </div>

              {currentInvoice && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-800 font-semibold block">Montant à encaisser</span>
                    <span className="text-sm font-bold text-[#0B8457]">{formatFCFA(currentInvoice.amount)}</span>
                  </div>
                  <span className="text-xs text-slate-600 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                    {currentInvoice.client.name}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Moyen de paiement *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: "Wave", color: "text-sky-600 border-sky-200 bg-sky-50" },
                    { label: "Orange Money", color: "text-amber-600 border-amber-200 bg-amber-50" },
                    { label: "MTN MoMo", color: "text-yellow-700 border-yellow-200 bg-yellow-50" },
                    { label: "Moov Money", color: "text-blue-700 border-blue-200 bg-blue-50" },
                    { label: "Virement bancaire", color: "text-purple-700 border-purple-200 bg-purple-50" },
                    { label: "Espèces", color: "text-emerald-700 border-emerald-200 bg-emerald-50" },
                  ].map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setMethod(m.label as Payment["method"])}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        method === m.label
                          ? `${m.color} ring-2 ring-emerald-500 font-bold shadow-xs`
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date du règlement
                  </label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Référence transaction (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: WAV-CI-99482"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Valider l'encaissement
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
