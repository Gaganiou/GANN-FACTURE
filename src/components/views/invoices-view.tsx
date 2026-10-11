"use client";

import React from "react";
import { InvoicesTable } from "@/components/dashboard/invoices-table";
import { useApp } from "@/context/app-context";
import { Plus, Download, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { formatFCFA } from "@/lib/utils";

export function InvoicesView() {
  const { stats, setIsCreateInvoiceOpen, exportInvoices } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Gestion des Factures</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Émettez, suivez et encaissez vos factures professionnelles en devises FCFA
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportInvoices}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exporter CSV</span>
          </button>

          <button
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nouvelle Facture</span>
          </button>
        </div>
      </div>

      {/* Mini KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Factures
          </span>
          <p className="text-lg font-extrabold text-slate-900 mt-1">{stats.totalInvoices}</p>
          <span className="text-[11px] text-slate-500">{formatFCFA(stats.totalBilled)}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Payées ({stats.paidCount})
          </span>
          <p className="text-lg font-extrabold text-[#0B8457] mt-1">{formatFCFA(stats.totalPaid)}</p>
          <span className="text-[11px] text-emerald-700">Encaissées à 100%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block">
            En Attente ({stats.pendingCount})
          </span>
          <p className="text-lg font-extrabold text-amber-800 mt-1">{formatFCFA(stats.totalPending)}</p>
          <span className="text-[11px] text-amber-700">En cours d'échéance</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">
            En Retard ({stats.overdueCount})
          </span>
          <p className="text-lg font-extrabold text-rose-600 mt-1">{stats.overdueCount} dossier(s)</p>
          <span className="text-[11px] text-rose-500">Nécessite relance</span>
        </div>
      </div>

      {/* Invoices Table */}
      <InvoicesTable
        title="Toutes les factures"
        subtitle="Historique complet des émissions, paiements et créances clients"
      />
    </div>
  );
}
