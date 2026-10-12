"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  Menu,
  Check,
  CheckCircle2,
  LogOut,
  Globe,
  Building,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/app-context";
import { useAuth } from "@/context/auth-context";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    setIsCreateInvoiceOpen,
    showToast,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const { user, isDemo, signOut } = useAuth();
  const rawName = user?.user_metadata?.name || (isDemo ? "Utilisateur Démo" : (user?.email?.split("@")[0] || "Entrepreneur"));
  const initials = rawName
    .split(" ")
    .filter(Boolean)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "IF";
  const displayEmail = user?.email || (isDemo ? "demo@izifacture.com" : "");
  const displayCompany = user?.user_metadata?.company || (isDemo ? "Africa Business Démo" : "Africa Digital Hub SARL");

  const getPageInfo = () => {
    switch (activeTab) {
      case "invoices":
        return {
          title: "Factures",
          subtitle: "Émission, suivi et gestion des créances commerciales",
        };
      case "clients":
        return {
          title: "Clients",
          subtitle: "Gestion du portefeuille client et coordonnées de contact",
        };
      case "payments":
        return {
          title: "Encaissements",
          subtitle: "Flux de trésorerie, Mobile Money (Wave, Orange, MTN) et banques",
        };
      case "reports":
        return {
          title: "Finances & Rapports",
          subtitle: "Analyses de chiffre d'affaires, recouvrement et conformité OHADA",
        };
      case "documents":
        return {
          title: "Documents",
          subtitle: "Factures acquittées, justificatifs et devis archivés",
        };
      case "settings":
        return {
          title: "Paramètres",
          subtitle: "Identité d'entreprise, coordonnées Mobile Money et fiscalité",
        };
      case "help":
        return {
          title: "Centre d'Aide",
          subtitle: "Documentation, FAQ et assistance technique dédiée",
        };
      default:
        return {
          title: "Tableau de bord",
          subtitle: "Gérez vos finances, factures et encaissements clients",
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="w-full bg-[#F4F6F5] px-4 sm:px-8 pt-6 pb-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Title & Subtitle + Mobile Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-colors lg:hidden cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {pageInfo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                {pageInfo.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Search bar, Action button, Bell & Profile pill */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Pill Search input */}
          <div className="relative flex-1 sm:flex-initial sm:w-64 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par client, n° facture..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-slate-200/90 text-slate-800 placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0B8457]/20 focus:border-[#0B8457] transition-all"
            />
          </div>

          {/* Primary Action Button: + Nouvelle Facture */}
          <button
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-900/10 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nouvelle Facture</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-2.5 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[10px] text-[#0B8457] hover:underline font-semibold cursor-pointer"
                    >
                      Tout marquer comme lu
                    </button>
                  )}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100/80">
                    <p className="font-semibold text-slate-800">Paiement reçu !</p>
                    <p className="text-slate-500 text-[11px]">
                      Teranga Logistique a réglé 8 200 000 FCFA
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
                    <p className="font-semibold text-amber-900">Facture en retard</p>
                    <p className="text-amber-800 text-[11px]">
                      Kone Agro-Industrie (2 450 000 FCFA)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Capsule */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 sm:gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs transition-all text-left cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-[#0B8457] flex items-center justify-center font-bold text-xs shrink-0">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {rawName}
                </span>
                <span className="text-[10px] text-slate-400 font-normal leading-tight truncate max-w-[120px]">
                  {displayEmail}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Profile Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{rawName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{displayCompany}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-emerald-50 text-[#0B8457] border border-emerald-200/80 px-2 py-0.5 rounded-full font-bold">
                    {isDemo ? (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Mode Démo (Aperçu)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#0B8457]" />
                        <span>Compte Actif • Supabase</span>
                      </>
                    )}
                  </span>
                </div>

                <Link
                  href="/"
                  onClick={() => setShowUserDropdown(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Site vitrine (Accueil)</span>
                </Link>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setActiveTab("settings");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span>Paramètres du compte</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    showToast("Mode multi-entreprise : Espace synchronisé", "info");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span>Changer d'entreprise</span>
                </button>

                <div className="pt-1 border-t border-slate-100 mt-1">
                  <button
                    onClick={async () => {
                      setShowUserDropdown(false);
                      await signOut();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
