"use client";

import React from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";

interface SubHeaderTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onExport?: () => void;
}

export function SubHeaderTabs({
  activeTab: propTab,
  onTabChange: propOnTabChange,
  onExport: propOnExport,
}: SubHeaderTabsProps) {
  const appContext = useApp();
  const activeTab = propTab ?? appContext.activeTab;
  const onTabChange = propOnTabChange ?? appContext.setActiveTab;
  const onExport = propOnExport ?? appContext.exportInvoices;

  const tabs = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "invoices", label: "Factures" },
    { id: "clients", label: "Clients" },
    { id: "payments", label: "Encaissements" },
    { id: "reports", label: "Finances & Rapports" },
  ];

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap pb-1">
      {/* Pills Container */}
      <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-slate-200/80 rounded-full shadow-2xs backdrop-blur-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-[#E8F5EE] text-[#0B8457] border border-emerald-300/60 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-slate-500" />
        <span>Exporter CSV</span>
      </button>
    </div>
  );
}
