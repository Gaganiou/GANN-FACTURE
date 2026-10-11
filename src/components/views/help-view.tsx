"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageSquare, Mail, Phone, BookOpen, ShieldCheck } from "lucide-react";

export function HelpView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Comment fonctionne l'encaissement via Mobile Money (Wave, Orange Money, MTN MoMo) ?",
      a: "Chaque facture émise contient vos coordonnées marchandes ou QR codes Wave / Orange Money. Lorsque le client effectue le paiement depuis son smartphone, vous pouvez soit valider la notification reçue, soit cliquer sur 'Enregistrer un encaissement' pour marquer la facture comme payée immédiatement.",
    },
    {
      q: "Les factures générées sont-elles conformes aux normes OHADA et fiscales ?",
      a: "Oui, GANN FACTURE intègre l'ensemble des mentions légales requises par l'OHADA : Raison sociale, Numéro RCCM, Numéro d'Identifiant Fiscal (NIF), TVA à 18% ventilée, et mentions des pénalités de retard légales.",
    },
    {
      q: "Comment exporter mes données pour mon expert-comptable ?",
      a: "Vous pouvez cliquer à tout moment sur le bouton 'Exporter' en haut de page ou dans l'onglet Factures pour télécharger un fichier CSV / Excel standardisé compatible avec Sage, Odoo, QuickBooks et Excel.",
    },
    {
      q: "Comment puis-je relancer un client dont la facture est en retard ?",
      a: "Dans la liste des factures, cliquez sur le filtre 'En retard'. Vous pouvez ensuite cliquer sur les détails du client pour le joindre directement par WhatsApp ou email avec la référence de sa facture.",
    },
    {
      q: "Puis-je modifier une facture après son émission ?",
      a: "Oui, tant que la facture n'est pas acquittée ou si vous avez besoin d'ajuster les montants, ouvrez le menu d'actions '...' à droite de la ligne et cliquez sur 'Modifier'.",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900">Centre d'Aide & Support GANN FACTURE</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Guides pratiques, réglementation OHADA et assistance technique
        </p>
      </div>

      {/* FAQs */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm mb-4">Questions fréquentes</h3>

        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180 text-[#0B8457]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 pt-1 text-xs text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Card */}
      <div className="p-6 rounded-3xl bg-[#EBF5EF] border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0B8457] text-white flex items-center justify-center font-bold">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Besoin d'une assistance prioritaire ?</h4>
            <p className="text-xs text-slate-600">Notre équipe support vous répond 7j/7 sur WhatsApp et email</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:support@gannfacture.com"
            className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all"
          >
            Email Support
          </a>
          <a
            href="https://wa.me/22507000000"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs transition-all"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
