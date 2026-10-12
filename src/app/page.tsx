"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Receipt,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  FileText,
  Users,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Smartphone,
  ChevronRight,
  Star,
  Quote,
  Building2,
  Menu,
  X,
  Play,
  Download,
  AlertCircle,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0B8457] selection:text-white relative overflow-x-hidden">
      {/* Background Subtle Tech Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `radial-gradient(#0B8457 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-emerald-200/40 via-emerald-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[600px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-amber-200/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* =========================================================================
          1. NAVIGATION BAR
      ========================================================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B8457] to-[#065F46] flex items-center justify-center text-white shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform duration-200">
              <Receipt className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-950">
                  izi<span className="text-[#0B8457]">Facture</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#E8F5EE] text-[#0B8457] border border-emerald-200/80">
                  Afrique 🌍
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Facturation Pro
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#problemes" className="hover:text-[#0B8457] transition-colors">
              Problèmes
            </a>
            <a href="#fonctionnalites" className="hover:text-[#0B8457] transition-colors">
              Fonctionnalités
            </a>
            <a href="#comment-ca-marche" className="hover:text-[#0B8457] transition-colors">
              Comment ça marche
            </a>
            <a href="#tarifs" className="hover:text-[#0B8457] transition-colors">
              Tarifs
            </a>
            <a href="#temoignages" className="hover:text-[#0B8457] transition-colors">
              Avis
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-all"
            >
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-bold shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white border-b border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-4">
            <a
              href="#problemes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Problèmes
            </a>
            <a
              href="#fonctionnalites"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Fonctionnalités
            </a>
            <a
              href="#comment-ca-marche"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Comment ça marche
            </a>
            <a
              href="#tarifs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Tarifs
            </a>
            <a
              href="#temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Témoignages
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="w-full text-center py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-800"
              >
                Se connecter
              </Link>
              <Link
                href="/dashboard"
                className="w-full text-center py-2.5 rounded-full bg-[#0B8457] text-white text-xs font-bold"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION
      ========================================================================== */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-emerald-300/80 text-[#0B8457] text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0B8457] animate-ping" />
            <span>La facturation nouvelle génération pour les entrepreneurs africains</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Fini les factures sur Word & Excel.{" "}
            <span className="bg-gradient-to-r from-[#0B8457] to-[#047857] bg-clip-text text-transparent">
              Facturez comme un grand compte.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Créez des factures 100% conformes aux normes OHADA en 2 clics, calculez la TVA 18% automatiquement et encaissez vos paiements Wave, Orange Money et virements sans friction.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-sm font-bold shadow-xl shadow-emerald-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Commencer gratuitement (0 FCFA)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 text-sm font-bold shadow-2xs transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#0B8457] fill-[#0B8457]" />
              <span>Voir la démo en direct</span>
            </Link>
          </div>

          {/* Micro social proof under CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0B8457]" />
              Aucune carte bancaire requise
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0B8457]" />
              Conforme SYSCOHADA & UEMOA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0B8457]" />
              Actif en 60 secondes
            </span>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="mt-14 sm:mt-20 relative max-w-5xl mx-auto">
          {/* Glass Card Wrapper */}
          <div className="relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-white/90 to-white/40 border border-slate-200/80 shadow-2xl backdrop-blur-xl">
            {/* Top Mockup Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/80 rounded-t-2xl text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-4 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-600">
                https://app.izifacture.com/dashboard
              </div>
              <div className="w-10" />
            </div>

            {/* Dashboard Content Preview */}
            <div className="p-4 sm:p-8 bg-[#F4F6F5] rounded-b-2xl space-y-6">
              {/* Header inside mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/60">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Tableau de bord</h3>
                  <p className="text-xs text-slate-500">Finances & Encaissements Mobile Money</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E8F5EE] text-[#0B8457] text-xs font-bold border border-emerald-200">
                    ● En ligne • FCFA (XOF)
                  </span>
                </div>
              </div>

              {/* 3 Metric Cards inside Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Montant Facturé
                  </span>
                  <p className="text-xl font-extrabold text-slate-950 mt-1">28 450 000 FCFA</p>
                  <span className="text-[11px] text-[#0B8457] font-semibold">▲ +18.5% ce trimestre</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Montant Encaissé (Wave / Banques)
                  </span>
                  <p className="text-xl font-extrabold text-[#0B8457] mt-1">21 650 000 FCFA</p>
                  <span className="text-[11px] text-emerald-700">76% taux de recouvrement</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    En Attente de règlement
                  </span>
                  <p className="text-xl font-extrabold text-amber-800 mt-1">6 800 000 FCFA</p>
                  <span className="text-[11px] text-slate-400">8 factures en cours</span>
                </div>
              </div>

              {/* Real Table Sample inside Mockup */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                <div className="px-4 py-3 bg-[#EBF5EF] border-b border-emerald-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Factures récentes</span>
                  <span className="text-[#0B8457]">Conforme OHADA & SYSCOHADA</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">FAC-2026-0042 • Sahel Distribution SA</p>
                      <p className="text-[11px] text-slate-400">Refonte plateforme e-commerce & API Mobile • Abidjan</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#0B8457] text-sm">+ 4 750 000 FCFA</span>
                      <span className="block text-[10px] font-semibold text-sky-600">Payé via Wave</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">FAC-2026-0040 • Teranga Logistique</p>
                      <p className="text-[11px] text-slate-400">Audit système d'information & Sécurité Cloud • Dakar</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#0B8457] text-sm">+ 8 200 000 FCFA</span>
                      <span className="block text-[10px] font-semibold text-purple-600">Virement bancaire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Pill Badges (Dribbble Style) */}
          <div className="hidden lg:flex items-center gap-3 absolute -top-6 -right-6 px-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xl animate-bounce duration-1000">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Paiement reçu instantané</p>
              <p className="text-[11px] text-slate-500">4 750 000 FCFA via Wave CI</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 absolute -bottom-6 -left-6 px-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5EE] text-[#0B8457] flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">+24.1% de trésorerie</p>
              <p className="text-[11px] text-slate-500">Délais de paiement divisés par 3</p>
            </div>
          </div>
        </div>

        {/* Payment partners ribbon */}
        <div className="mt-20 pt-8 border-t border-slate-200/70 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Encaissez par tous les moyens utilisés par vos clients
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all">
            <span className="text-base sm:text-lg font-extrabold text-sky-600 tracking-tight">
              Wave 📱
            </span>
            <span className="text-base sm:text-lg font-extrabold text-amber-600 tracking-tight">
              Orange Money 🟠
            </span>
            <span className="text-base sm:text-lg font-extrabold text-yellow-700 tracking-tight">
              MTN MoMo 🟡
            </span>
            <span className="text-base sm:text-lg font-extrabold text-blue-700 tracking-tight">
              Moov Money 🔵
            </span>
            <span className="text-base sm:text-lg font-extrabold text-purple-700 tracking-tight">
              Virements SGCI / CBAO / BOA 🏦
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION PROBLÈME
      ========================================================================== */}
      <section id="problemes" className="py-20 bg-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              La réalité du terrain
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Pourquoi la gestion de facturation fait perdre des millions aux entrepreneurs ?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Créer une facture ne devrait pas être un parcours du combattant entre des fichiers Word corrompus et des relances gênantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Factures Word & Excel non professionnelles</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Mises en page cassées, copier-coller d'anciens devis avec le nom d'un autre client, aucun numéro de RCCM ou NIF... Vos clients doutent de votre crédibilité et retardent leurs règlements.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Calculs manuels de TVA 18% & Erreurs fiscales</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                TVA mal ventilée, arrondi bancal entre HT et TTC, sanctions lors des déclarations comptables... Vous perdez du temps précieux avec une calculatrice au lieu de vous concentrer sur vos ventes.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Suivi des impayés quasi impossible</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Qui a payé ? Qui est en retard de 30 jours ? Les notifications de Mobile Money se noient dans vos SMS personnels et des factures entières restent impayées sans aucune trace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION FONCTIONNALITÉS (BENTO GRID MODERNE)
      ========================================================================== */}
      <section id="fonctionnalites" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B8457] border border-emerald-300 uppercase tracking-wider">
            Conçu pour vous
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Toutes les fonctionnalités dont vous avez besoin pour facturer comme un pro
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Une interface intuitive pensée spécialement pour les devises FCFA et les spécificités des entreprises africaines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 2 Clics */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#0B8457] flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950">Factures pro en 2 clics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Renseignez votre client, saisissez vos prestations, et téléchargez un PDF impeccable estampillé avec votre logo, NIF et RCCM.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center text-xs font-bold text-[#0B8457]">
                Format conforme OHADA →
              </span>
            </div>
          </div>

          {/* Card 2: TVA 18% */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950">TVA 18% automatique</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Calcul en direct du sous-total HT, de la taxe sur la valeur ajoutée et du net à payer TTC en FCFA sans risque d'erreur d'arrondi.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center text-xs font-bold text-amber-700">
                Zéro calcul mental →
              </span>
            </div>
          </div>

          {/* Card 3: Suivi des paiements */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950">Suivi des paiements en temps réel</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Suivez qui a payé et qui est en retard. Enregistrez les règlements Wave, Orange Money et virements avec leurs références de transaction.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center text-xs font-bold text-sky-700">
                Trésorerie limpide →
              </span>
            </div>
          </div>

          {/* Card 4: Gestion clients */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950">Gestion clients intégrée</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Carnet d'adresses centralisé, historique des factures émises par client, chiffre d'affaires cumulé et contact WhatsApp en un clic.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center text-xs font-bold text-purple-700">
                Fidélisation simplifiée →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION COMMENT ÇA MARCHE
      ========================================================================== */}
      <section id="comment-ca-marche" className="py-20 bg-slate-100/70 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B8457] border border-emerald-300 uppercase tracking-wider">
              En 3 étapes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-slate-600 text-sm">
              Prenez en main votre facturation en moins de 3 minutes chrono.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 relative">
              <span className="text-4xl font-black text-[#0B8457]/20 font-mono">01</span>
              <h3 className="text-xl font-bold text-slate-950">Inscrivez votre entreprise</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Renseignez votre raison sociale, NIF, RCCM et vos coordonnées Mobile Money (Wave, Orange, MTN). Vos coordonnées apparaîtront sur chaque facture.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 relative">
              <span className="text-4xl font-black text-[#0B8457]/20 font-mono">02</span>
              <h3 className="text-xl font-bold text-slate-950">Créez votre première facture</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sélectionnez votre client ou ajoutez-le en direct, listez vos prestations : le sous-total, la TVA 18% et le total TTC se calculent automatiquement.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 relative">
              <span className="text-4xl font-black text-[#0B8457]/20 font-mono">03</span>
              <h3 className="text-xl font-bold text-slate-950">Envoyez et suivez les paiements</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Téléchargez le PDF ou envoyez-le par WhatsApp/Email. Dès que votre client effectue le virement ou le paiement Wave, marquez-la comme payée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION TÉMOIGNAGES
      ========================================================================== */}
      <section id="temoignages" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B8457] border border-emerald-300 uppercase tracking-wider">
            Ils nous font confiance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Ce que disent les entrepreneurs africains
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Découvrez comment iziFacture transforme le quotidien des agences, consultants et PME.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                « Nos clients règlent désormais en 4 jours en moyenne. Le fait d'avoir nos numéros marchands Wave et Orange Money directement indiqués sur la facture pro a changé notre trésorerie. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0B8457] font-bold flex items-center justify-center text-xs">
                IT
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Ibrahim Traoré</p>
                <p className="text-xs text-slate-500">DG Agence Web • Abidjan, Côte d'Ivoire</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                « Fini les calculs d'apothicaire sur Excel avec la TVA 18% ! Mon comptable à Dakar est ravi et mes clients institutionnels apprécient la présentation conforme OHADA. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                FB
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Fatou Bamba</p>
                <p className="text-xs text-slate-500">Fondatrice Cosmétiques • Dakar, Sénégal</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                « C'est le seul logiciel qui a compris le marché africain : simple, rapide, en FCFA, sans fioritures inutiles. Je gère plus de 20 millions de FCFA de factures mensuelles avec. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                JM
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Jean-Marc Kamga</p>
                <p className="text-xs text-slate-500">Consultant Logistique • Douala, Cameroun</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION TARIFICATION
      ========================================================================== */}
      <section id="tarifs" className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0B8457]/30 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Des tarifs clairs en FCFA
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Investissez dans la clarté de votre trésorerie
            </h2>
            <p className="text-slate-400 text-sm">
              Commencez gratuitement et faites évoluer votre formule selon vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan Gratuit */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan Gratuit</h3>
                  <p className="text-xs text-slate-400 mt-1">Pour tester et démarrer sans frais</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">0</span>
                  <span className="text-sm font-semibold text-slate-400">FCFA / mois</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Jusqu'à 5 factures par mois
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    1 utilisateur
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Format légal OHADA
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span className="w-4 h-4 flex items-center justify-center font-bold">✕</span>
                    Export CSV / Comptable
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full text-center py-3.5 rounded-full border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Plan Pro (MIS EN AVANT) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#0B8457] shadow-2xl shadow-emerald-950/50 flex flex-col justify-between space-y-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0B8457] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                ⭐ Le plus populaire
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan Pro</h3>
                  <p className="text-xs text-emerald-400 mt-1">Pour les indépendants, agences et consultants</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0B8457]">5 000</span>
                  <span className="text-sm font-semibold text-slate-400">FCFA / mois</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Factures & Devis <strong className="text-white">illimités</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Calcul automatique TVA 18% & Net TTC
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Suivi des règlements Wave / Orange / Banques
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Export CSV compatible Sage & Excel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Logo, NIF & cachet d'entreprise personnalisé
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Support prioritaire WhatsApp 7j/7
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full text-center py-4 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-sm font-extrabold shadow-lg shadow-emerald-900/40 active:scale-95 transition-all"
              >
                Passer au Plan Pro
              </Link>
            </div>

            {/* Plan Business */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan Business</h3>
                  <p className="text-xs text-slate-400 mt-1">Pour les PME et équipes en croissance</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">15 000</span>
                  <span className="text-sm font-semibold text-slate-400">FCFA / mois</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Tout le Plan Pro inclus
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Multi-utilisateurs (comptable, associés)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Gestion multi-entreprises
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B8457] shrink-0" />
                    Rapports comptables annuels avancés
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full text-center py-3.5 rounded-full border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Contacter l'équipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. SECTION CTA FINAL
      ========================================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B8457] to-[#044E36] p-8 sm:p-16 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Rejoins les entrepreneurs qui facturent comme des pros.
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Ne laissez plus vos devis et factures freiner la croissance de votre entreprise. Ouvrez votre compte en 60 secondes.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 text-sm font-bold shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                Commencer gratuitement dès aujourd'hui
              </Link>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER
      ========================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0B8457] flex items-center justify-center text-white">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900">
                izi<span className="text-[#0B8457]">Facture</span>
              </span>
              <p className="text-[11px] text-slate-400">Logiciel de facturation SaaS pour l'Afrique</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 font-medium text-slate-600">
            <a href="#fonctionnalites" className="hover:text-[#0B8457]">
              Fonctionnalités
            </a>
            <a href="#tarifs" className="hover:text-[#0B8457]">
              Tarifs
            </a>
            <Link href="/dashboard" className="hover:text-[#0B8457]">
              Espace Application
            </Link>
            <a href="mailto:contact@izifacture.com" className="hover:text-[#0B8457]">
              Contact
            </a>
          </div>

          {/* African Pride Signature */}
          <div className="text-center md:text-right">
            <p className="font-semibold text-slate-800">
              Fait avec fierté en Afrique 🌍
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              © {new Date().getFullYear()} iziFacture. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
