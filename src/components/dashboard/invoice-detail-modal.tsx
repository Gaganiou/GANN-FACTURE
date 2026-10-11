"use client";

import React from "react";
import { X, Download, Printer, CheckCircle2, FileText, Edit, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/app-context";
import { formatFCFA, formatDate, cn } from "@/lib/utils";

export function InvoiceDetailModal() {
  const {
    selectedInvoice,
    setSelectedInvoice,
    markInvoiceAsPaid,
    setEditingInvoice,
    settings,
    printInvoice,
  } = useApp();

  if (!selectedInvoice) return null;

  const handleMarkPaid = () => {
    markInvoiceAsPaid(selectedInvoice.id, selectedInvoice.paymentMethod || "Wave");
  };

  const handleEdit = () => {
    const inv = selectedInvoice;
    setSelectedInvoice(null);
    setEditingInvoice(inv);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#EBF5EF] border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B8457] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Facture {selectedInvoice.invoiceNumber}
              </h3>
              <p className="text-[11px] text-slate-500">
                Émise le {formatDate(selectedInvoice.issueDate)} • Échéance : {formatDate(selectedInvoice.dueDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => printInvoice(selectedInvoice)}
              className="p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Imprimer / PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Invoice Preview */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm" id="printable-invoice">
          {/* Header of the invoice document */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">{settings.companyName}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{settings.nifRccm}</p>
              <p className="text-xs text-slate-500">{settings.address}, {settings.city}</p>
              <p className="text-xs text-slate-500">{settings.phone}</p>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  selectedInvoice.status === "paid"
                    ? "bg-[#E8F5EE] text-[#0B8457] border border-emerald-200"
                    : selectedInvoice.status === "overdue"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : selectedInvoice.status === "sent"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {selectedInvoice.status === "paid"
                  ? "Payée"
                  : selectedInvoice.status === "overdue"
                  ? "En retard"
                  : selectedInvoice.status === "sent"
                  ? "Envoyée"
                  : "Brouillon"}
              </span>
              <p className="text-xs font-mono text-slate-400 mt-2">
                Réf: {selectedInvoice.invoiceNumber}
              </p>
            </div>
          </div>

          {/* Two-column overview */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Facturé à :
              </span>
              <p className="font-bold text-slate-900 mt-1">{selectedInvoice.client.name}</p>
              <p className="text-xs text-slate-700 font-medium">{selectedInvoice.client.company}</p>
              <p className="text-xs text-slate-500">{selectedInvoice.client.email}</p>
              <p className="text-xs text-slate-500">
                {selectedInvoice.client.city} {selectedInvoice.client.country ? `• ${selectedInvoice.client.country}` : ""}
              </p>
              {selectedInvoice.client.phone && (
                <p className="text-xs text-slate-500">{selectedInvoice.client.phone}</p>
              )}
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Informations règlement :
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Catégorie : <span className="font-semibold text-slate-800">{selectedInvoice.category}</span>
              </p>
              <p className="text-xs text-slate-600">
                Moyen prévu : <span className="font-semibold text-slate-800">{selectedInvoice.paymentMethod || "Wave / Virement"}</span>
              </p>
              <p className="text-xs text-slate-600">
                Échéance légale : <span className="font-semibold text-slate-800">{formatDate(selectedInvoice.dueDate)}</span>
              </p>
            </div>
          </div>

          {/* Description & items */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-[#EBF5EF] text-slate-700 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Désignation</th>
                  <th className="py-2.5 px-3 text-center">Qté</th>
                  <th className="py-2.5 px-3 text-right">Prix Unitaire</th>
                  <th className="py-2.5 px-4 text-right">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                  selectedInvoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                      <td className="py-3 px-3 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-3 px-3 text-right text-slate-600">{formatFCFA(item.unitPrice)}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        {formatFCFA(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">{selectedInvoice.description}</td>
                    <td className="py-3 px-3 text-center text-slate-600">1</td>
                    <td className="py-3 px-3 text-right text-slate-600">
                      {formatFCFA(Math.round(selectedInvoice.amount / 1.18))}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                      {formatFCFA(Math.round(selectedInvoice.amount / 1.18))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Box */}
          <div className="flex justify-end">
            <div className="w-72 bg-[#EBF5EF] rounded-2xl p-4 space-y-1.5 text-xs border border-emerald-100">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total HT :</span>
                <span className="font-semibold text-slate-800">
                  {formatFCFA(Math.round(selectedInvoice.amount / 1.18))}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>TVA (18%) :</span>
                <span className="font-semibold text-slate-800">
                  {formatFCFA(selectedInvoice.amount - Math.round(selectedInvoice.amount / 1.18))}
                </span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-emerald-200">
                <span>Net à payer TTC :</span>
                <span className="text-[#0B8457]">{formatFCFA(selectedInvoice.amount)}</span>
              </div>
            </div>
          </div>

          {/* Mentions légales & Cachet */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#0B8457]">
              <ShieldCheck className="w-4 h-4" />
              <span>Conforme réglementation OHADA & SYSCOHADA révisé</span>
            </div>
            <span className="font-medium">Cachet & Signature électronique validée</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Modifier</span>
            </button>
            <button
              onClick={() => printInvoice(selectedInvoice)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger / Imprimer</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {selectedInvoice.status !== "paid" && (
              <button
                onClick={handleMarkPaid}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marquer payée</span>
              </button>
            )}
            <button
              onClick={() => setSelectedInvoice(null)}
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-600 text-xs font-medium hover:bg-white transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
