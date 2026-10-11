"use client";

import React from "react";
import {
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import { DashboardStats } from "@/data/mock-data";
import { formatFCFA } from "@/lib/utils";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Factures",
      value: stats.totalInvoices.toString(),
      unit: "factures",
      subtitle: `${stats.paidCount} payées, ${stats.pendingCount} en attente`,
      badge: "+14.2%",
      badgeType: "positive",
      icon: FileText,
      iconBg: "bg-[#EBF5EF] text-[#0B8457]",
    },
    {
      title: "Montant Facturé",
      value: formatFCFA(stats.totalBilled),
      unit: "",
      subtitle: "Volume global émis ce mois",
      badge: "+18.5%",
      badgeType: "positive",
      icon: TrendingUp,
      iconBg: "bg-[#EBF5EF] text-[#0B8457]",
    },
    {
      title: "Montant Payé",
      value: formatFCFA(stats.totalPaid),
      unit: "",
      subtitle: `${Math.round((stats.totalPaid / stats.totalBilled) * 100)}% encaissé avec succès`,
      badge: "+24.1%",
      badgeType: "positive",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Montant en Attente",
      value: formatFCFA(stats.totalPending),
      unit: "",
      subtitle: `${stats.pendingCount} factures (${stats.overdueCount} en retard)`,
      badge: `${stats.overdueCount} en retard`,
      badgeType: "warning",
      icon: Clock,
      iconBg: "bg-amber-100 text-amber-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200/70 shadow-2xs hover:shadow-md hover:border-emerald-200/60 transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row: Title & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg} shrink-0 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            {/* Middle: Big Value */}
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </span>
                {card.unit && (
                  <span className="text-xs font-medium text-slate-500">
                    {card.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom: Subtitle & Trend Badge */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 text-[11px] truncate">
                {card.subtitle}
              </span>

              {card.badgeType === "positive" ? (
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.badge}
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full shrink-0 border border-amber-200/60">
                  <AlertCircle className="w-3 h-3" />
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
