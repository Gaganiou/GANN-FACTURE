"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  PieChart,
  FolderOpen,
  Settings,
  HelpCircle,
  X,
  Receipt,
  CreditCard,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { activeTab, setActiveTab } = useApp();

  const menuItems = [
    {
      id: "overview",
      name: "Tableau de bord",
      icon: LayoutDashboard,
    },
    {
      id: "invoices",
      name: "Factures",
      icon: FileText,
    },
    {
      id: "clients",
      name: "Clients",
      icon: Users,
    },
    {
      id: "payments",
      name: "Encaissements",
      icon: CreditCard,
    },
    {
      id: "reports",
      name: "Finances & Rapports",
      icon: PieChart,
    },
    {
      id: "documents",
      name: "Documents",
      icon: FolderOpen,
    },
  ];

  const generalItems = [
    {
      id: "settings",
      name: "Paramètres",
      icon: Settings,
    },
    {
      id: "help",
      name: "Aide & Support",
      icon: HelpCircle,
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between pb-7">
            <Link
              href="/"
              className="flex items-center gap-3 group text-left cursor-pointer"
              title="Retour au site vitrine"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B8457] to-[#065F46] flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                <Receipt className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                    iziFacture
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#0B8457] tracking-widest uppercase mt-0.5">
                  App SaaS
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-7 overflow-y-auto pr-1">
            {/* Primary Menu */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 block mb-2">
                Menu Principal
              </span>
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelectTab(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left",
                          isActive
                            ? "bg-[#E8F5EE] text-[#0B8457] shadow-2xs font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive ? "text-[#0B8457]" : "text-slate-400"
                          )}
                        />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* General Settings */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 block mb-2">
                Préférences
              </span>
              <ul className="space-y-1">
                {generalItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelectTab(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left",
                          isActive
                            ? "bg-[#E8F5EE] text-[#0B8457] shadow-2xs font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive ? "text-[#0B8457]" : "text-slate-400"
                          )}
                        />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/"
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 cursor-pointer text-left"
                  >
                    <Globe className="w-4 h-4 shrink-0 text-slate-400" />
                    <span>Site vitrine iziFacture</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Bottom Card - Mobile Money Wave Badge */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-[#E8F5EE] border border-emerald-100">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0B8457] animate-pulse" />
                <span className="text-[11px] font-bold text-[#0B8457] uppercase tracking-wide">
                  Afrique de l'Ouest
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Encaissez via Wave, Orange Money et MTN MoMo sans commission.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
