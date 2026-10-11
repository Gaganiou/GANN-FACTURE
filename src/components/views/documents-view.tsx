"use client";

import React, { useState } from "react";
import { useApp } from "@/context/app-context";
import { FolderOpen, FileText, Download, Printer, Search, CheckCircle, FileCheck } from "lucide-react";
import { formatDate, formatFCFA } from "@/lib/utils";

export function DocumentsView() {
  const { invoices, printInvoice, setSelectedInvoice } = useApp();
  const [filterType, setFilterType] = useState<string>("all");

  const documents = invoices.map((inv) => ({
    id: `doc-${inv.id}`,
    title: `Facture commerciale ${inv.invoiceNumber}`,
    type: inv.status === "paid" ? "Facture acquittée" : "Facture standard",
    client: inv.client.company,
    date: inv.issueDate,
    amount: inv.amount,
    invoiceRef: inv,
  }));

  const filteredDocs = documents.filter((doc) => {
    if (filterType === "paid" && doc.type !== "Facture acquittée") return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Documents & Justificatifs</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Téléchargez et imprimez vos factures acquittées, bordereaux et justificatifs fiscaux
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "paid"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterType === t
                  ? "bg-[#E8F5EE] text-[#0B8457] border-emerald-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {t === "all" ? "Tous les documents" : "Factures acquittées uniquement"}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF5EF] text-[#0B8457] flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{doc.title}</h3>
                    <p className="text-xs text-slate-500">{doc.client}</p>
                  </div>
                </div>
              </div>

              <div className="py-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date d'émission :</span>
                  <span className="font-medium">{formatDate(doc.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Montant TTC :</span>
                  <span className="font-bold text-slate-900">{formatFCFA(doc.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nature du document :</span>
                  <span className="font-semibold text-[#0B8457]">{doc.type}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedInvoice(doc.invoiceRef)}
                className="flex-1 py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center transition-colors cursor-pointer"
              >
                Aperçu
              </button>

              <button
                onClick={() => printInvoice(doc.invoiceRef)}
                className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer / PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
