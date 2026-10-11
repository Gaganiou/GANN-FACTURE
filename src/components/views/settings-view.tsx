"use client";

import React, { useState } from "react";
import { useApp } from "@/context/app-context";
import { Settings, Save, Building2, Phone, Mail, Landmark, Smartphone, FileText } from "lucide-react";
import { CompanySettings } from "@/data/mock-data";

export function SettingsView() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState<CompanySettings>(settings);

  const handleChange = (field: keyof CompanySettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Paramètres de l'Entreprise</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configurez vos coordonnées légales, vos numéros Mobile Money et mentions de facturation
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Identity */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-[#0B8457]" />
            <h3 className="font-bold text-slate-900 text-sm">Identité & Statut Juridique (OHADA)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Raison Sociale de l'entreprise *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIF & Numéro RCCM *
              </label>
              <input
                type="text"
                required
                value={formData.nifRccm}
                onChange={(e) => handleChange("nifRccm", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse email professionnelle
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone principal
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse & Ville
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pays & Zone économique
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>
          </div>
        </div>

        {/* Mobile Money & Banking */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Smartphone className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">Comptes d'Encaissement Mobile Money & Banques</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro Wave Merchant
              </label>
              <input
                type="text"
                value={formData.waveNumber}
                onChange={(e) => handleChange("waveNumber", e.target.value)}
                placeholder="+221 77 000 00 00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro Orange Money
              </label>
              <input
                type="text"
                value={formData.orangeMoneyNumber}
                onChange={(e) => handleChange("orangeMoneyNumber", e.target.value)}
                placeholder="+225 07 00 00 00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro MTN MoMo
              </label>
              <input
                type="text"
                value={formData.mtnNumber}
                onChange={(e) => handleChange("mtnNumber", e.target.value)}
                placeholder="+229 97 00 00 00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Banque partenaire
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                RIB / IBAN
              </label>
              <input
                type="text"
                value={formData.bankIbanRib}
                onChange={(e) => handleChange("bankIbanRib", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>
          </div>
        </div>

        {/* Invoice Format & Tax */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <FileText className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-sm">Fiscalité & Numérotation des factures</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Préfixe des factures
              </label>
              <input
                type="text"
                value={formData.invoicePrefix}
                onChange={(e) => handleChange("invoicePrefix", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Taux de TVA standard (%)
              </label>
              <input
                type="number"
                value={formData.defaultTaxRate}
                onChange={(e) => handleChange("defaultTaxRate", Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0B8457]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mentions obligatoires de bas de page
            </label>
            <textarea
              rows={2}
              value={formData.notesMention}
              onChange={(e) => handleChange("notesMention", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-[#0B8457]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
