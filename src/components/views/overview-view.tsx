"use client";

import React from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { InvoicesTable } from "@/components/dashboard/invoices-table";
import { useApp } from "@/context/app-context";
import { Plus, UserPlus, CreditCard, Download, ArrowUpRight, TrendingUp } from "lucide-react";
import { formatFCFA } from "@/lib/utils";

export function OverviewView() {
  const {
    stats,
    invoices,
    payments,
    setIsCreateInvoiceOpen,
    setIsCreateClientOpen,
    setIsRecordPaymentOpen,
    exportInvoices,
    setActiveTab,
  } = useApp();

  // Quick calculations for the mini overview widget
  const waveTotal = payments
    .filter((p) => p.method === "Wave")
    .reduce((acc, p) => acc + p.amount, 0);
  const orangeTotal = payments
    .filter((p) => p.method === "Orange Money")
    .reduce((acc, p) => acc + p.amount, 0);
  const virementTotal = payments
    .filter((p) => p.method === "Virement bancaire")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Quick Action Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF5EF] text-[#0B8457] flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Actions Rapides</h3>
            <p className="text-xs text-slate-400">Émettez des factures, enregistrez des paiements ou vos clients</p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nouvelle Facture</span>
          </button>

          <button
            onClick={() => setIsCreateClientOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-500" />
            <span>Nouveau Client</span>
          </button>

          <button
            onClick={() => setIsRecordPaymentOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium active:scale-95 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span>Encaisser un paiement</span>
          </button>

          <button
            onClick={exportInvoices}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-all cursor-pointer"
            title="Exporter en CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <StatsCards stats={stats} />

      {/* Mini Financial Health Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Taux de Recouvrement
            </span>
            <span className="text-xs font-bold text-[#0B8457]">
              {stats.totalBilled > 0
                ? Math.round((stats.totalPaid / stats.totalBilled) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-[#0B8457] h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  stats.totalBilled > 0
                    ? Math.min(100, (stats.totalPaid / stats.totalBilled) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {formatFCFA(stats.totalPaid)} encaissés sur {formatFCFA(stats.totalBilled)}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Répartition Règlements
            </span>
            <button
              onClick={() => setActiveTab("payments")}
              className="text-xs text-[#0B8457] hover:underline flex items-center font-semibold"
            >
              Voir détails <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="flex items-center gap-1.5 text-sky-700">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Wave : {formatFCFA(waveTotal)}
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Orange : {formatFCFA(orangeTotal)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Paiements instantanés Mobile Money Afrique de l'Ouest
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Échéances en retard
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
              {stats.overdueCount} alerte(s)
            </span>
          </div>
          <p className="text-sm font-bold text-rose-600 mt-2">
            {formatFCFA(
              invoices
                .filter((i) => i.status === "overdue")
                .reduce((acc, i) => acc + i.amount, 0)
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            Relances automatiques WhatsApp & SMS disponibles
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <InvoicesTable />
    </div>
  );
}
