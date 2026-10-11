"use client";

import React, { useState } from "react";
import { useApp } from "@/context/app-context";
import {
  CreditCard,
  Plus,
  CheckCircle2,
  Calendar,
  Building2,
  DollarSign,
  Download,
} from "lucide-react";
import { formatFCFA, formatDate, cn } from "@/lib/utils";

export function PaymentsView() {
  const { payments, setIsRecordPaymentOpen } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<string>("all");

  const filteredPayments = payments.filter((p) => {
    if (selectedMethod !== "all" && p.method !== selectedMethod) return false;
    return true;
  });

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "Wave":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Orange Money":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "MTN MoMo":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "Moov Money":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Virement bancaire":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-emerald-50 text-[#0B8457] border-emerald-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Encaissements & Règlements</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Historique de tous les flux reçus par Mobile Money (Wave, Orange, MTN) et Virements
          </p>
        </div>

        <button
          onClick={() => setIsRecordPaymentOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Enregistrer un encaissement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Encaissé
          </span>
          <p className="text-xl font-extrabold text-[#0B8457] mt-1">{formatFCFA(totalCollected)}</p>
          <span className="text-[11px] text-slate-500">{payments.length} transactions confirmées</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider block">
            Mobile Money (Wave / OM / MTN)
          </span>
          <p className="text-xl font-extrabold text-sky-800 mt-1">
            {formatFCFA(
              payments
                .filter((p) => ["Wave", "Orange Money", "MTN MoMo", "Moov Money"].includes(p.method))
                .reduce((acc, p) => acc + p.amount, 0)
            )}
          </p>
          <span className="text-[11px] text-sky-600">Disponibilité immédiate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider block">
            Virements Bancaires
          </span>
          <p className="text-xl font-extrabold text-purple-800 mt-1">
            {formatFCFA(
              payments
                .filter((p) => p.method === "Virement bancaire")
                .reduce((acc, p) => acc + p.amount, 0)
            )}
          </p>
          <span className="text-[11px] text-purple-600">Comptes d'entreprises certifiés</span>
        </div>
      </div>

      {/* Table of payments */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
        {/* Method Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pb-4 border-b border-slate-100">
          {["all", "Wave", "Orange Money", "MTN MoMo", "Virement bancaire"].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMethod(m)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                selectedMethod === m
                  ? "bg-[#E8F5EE] text-[#0B8457] font-semibold border border-emerald-300"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {m === "all" ? "Tous les moyens" : m}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#EBF5EF] text-slate-700 text-xs font-semibold rounded-2xl">
                <th className="py-3 pl-4 pr-3 rounded-l-xl">Date</th>
                <th className="py-3 px-3">Référence & N° Facture</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Moyen Utilisé</th>
                <th className="py-3 px-3 text-right">Montant Encaissé</th>
                <th className="py-3 pl-3 pr-4 text-center rounded-r-xl">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pl-4 pr-3 whitespace-nowrap text-slate-600 font-medium">
                    {formatDate(pay.date)}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-mono text-slate-800 font-semibold block">{pay.reference}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{pay.invoiceNumber}</span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-semibold text-slate-900 block">{pay.company}</span>
                    <span className="text-[11px] text-slate-500">{pay.clientName}</span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getMethodBadge(
                        pay.method
                      )}`}
                    >
                      {pay.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap text-right font-extrabold text-[#0B8457]">
                    + {formatFCFA(pay.amount)}
                  </td>
                  <td className="py-3.5 pl-3 pr-4 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Reçu
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
