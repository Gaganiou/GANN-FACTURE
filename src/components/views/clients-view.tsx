"use client";

import React, { useState } from "react";
import { useApp } from "@/context/app-context";
import {
  UserPlus,
  Building2,
  Mail,
  Phone,
  MapPin,
  FilePlus,
  Trash2,
  Search,
  ExternalLink,
} from "lucide-react";
import { formatFCFA } from "@/lib/utils";

export function ClientsView() {
  const { clients, setIsCreateClientOpen, setIsCreateInvoiceOpen, deleteClient } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter((c) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const totalBilledAll = clients.reduce((acc, c) => acc + c.totalBilled, 0);
  const totalPaidAll = clients.reduce((acc, c) => acc + c.totalPaid, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Répertoire des Clients</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gérez vos comptes clients, coordonnées et historique d'encaissement
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCreateClientOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B8457] hover:bg-[#086b46] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nouveau Client</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Clients Enregistrés
          </span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{clients.length} comptes</p>
          <span className="text-[11px] text-[#0B8457]">100% actifs en Afrique de l'Ouest</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Volume Global Facturé
          </span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{formatFCFA(totalBilledAll)}</p>
          <span className="text-[11px] text-slate-500">Total des prestations émises</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Total Encaissé
          </span>
          <p className="text-xl font-extrabold text-[#0B8457] mt-1">{formatFCFA(totalPaidAll)}</p>
          <span className="text-[11px] text-emerald-700">Règlements reçus</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, entreprise, ville (ex: Dakar, Abidjan)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-[#0B8457]"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header card */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-[#0B8457] font-bold flex items-center justify-center text-sm shadow-2xs">
                    {client.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1">
                      {client.company}
                    </h3>
                    <p className="text-xs text-slate-500">{client.name}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5EE] text-[#0B8457]">
                  Actif
                </span>
              </div>

              {/* Coordinates */}
              <div className="py-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {client.city}, {client.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial summary & Action buttons */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-slate-400">Total facturé :</span>
                <span className="font-bold text-slate-900">{formatFCFA(client.totalBilled)}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setIsCreateInvoiceOpen(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-[#E8F5EE] text-[#0B8457] hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FilePlus className="w-3.5 h-3.5" />
                  <span>Facturer</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Supprimer le client ${client.name} (${client.company}) ?`)) {
                      deleteClient(client.id);
                    }
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Supprimer le client"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
