"use client";

import React from "react";
import { useApp } from "@/context/app-context";
import {
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Download,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { formatFCFA } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function ReportsView() {
  const { invoices, payments, stats, exportInvoices } = useApp();

  // Monthly aggregated billing data
  const monthlyData = [
    { month: "Août 25", facture: 6500000, encaisse: 6500000 },
    { month: "Sept 25", facture: 8200000, encaisse: 8200000 },
    { month: "Oct 25", facture: 4200000, encaisse: 3100000 },
    { month: "Nov 25", facture: 5950000, encaisse: 5950000 },
    { month: "Déc 25", facture: 7400000, encaisse: 6200000 },
    { month: "Jan 26", facture: stats.totalBilled, encaisse: stats.totalPaid },
  ];

  // Category breakdown
  const categoryCounts: { [key: string]: number } = {};
  invoices.forEach((inv) => {
    categoryCounts[inv.category] = (categoryCounts[inv.category] || 0) + inv.amount;
  });

  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0B8457", "#0284C7", "#F59E0B", "#8B5CF6", "#EC4899", "#10B981"];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Finances & Rapports Analytiques</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Suivi des performances financières, prévisions de trésorerie et conformité fiscale
          </p>
        </div>

        <button
          onClick={exportInvoices}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Exporter le rapport financier</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Chiffre d'Affaires Global
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{formatFCFA(stats.totalBilled)}</p>
          <p className="text-xs text-[#0B8457] font-semibold mt-1">▲ +18.5% comparé au trimestre précédent</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Trésorerie Réellement Encaissée
          </span>
          <p className="text-2xl font-extrabold text-[#0B8457] mt-1">{formatFCFA(stats.totalPaid)}</p>
          <p className="text-xs text-slate-500 mt-1">
            Taux de recouvrement effectif : {Math.round((stats.totalPaid / stats.totalBilled) * 100)}%
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Créances Clients en Attente
          </span>
          <p className="text-2xl font-extrabold text-amber-700 mt-1">{formatFCFA(stats.totalPending)}</p>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            Dont {stats.overdueCount} facture(s) échue(s)
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Évolution Facturation vs Encaissements</h3>
              <p className="text-xs text-slate-400 mt-0.5">Montants en FCFA sur les 6 derniers mois</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Facturé
              </span>
              <span className="flex items-center gap-1.5 text-[#0B8457] font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0B8457]" /> Encaissé
              </span>
            </div>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(val: any) => formatFCFA(Number(val))}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
                <Bar dataKey="facture" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="encaisse" fill="#0B8457" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Répartition par Activité</h3>
            <p className="text-xs text-slate-400 mt-0.5">Contribution au chiffre d'affaires</p>

            <div className="space-y-3 mt-5">
              {pieData.map((item, index) => {
                const percentage = Math.round((item.value / stats.totalBilled) * 100);
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 truncate max-w-[160px]">{item.name}</span>
                      <span className="text-slate-900 font-bold">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0B8457] shrink-0" />
            <span>Rapports exportables certifiés pour déclaration fiscale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
