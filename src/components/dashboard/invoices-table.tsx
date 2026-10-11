"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Printer,
  CheckCircle,
  FileEdit,
  Trash2,
  Filter,
} from "lucide-react";
import { Invoice, InvoiceStatus } from "@/data/mock-data";
import { formatFCFA, formatDate, cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";

interface InvoicesTableProps {
  invoices?: Invoice[];
  searchQuery?: string;
  onViewInvoice?: (invoice: Invoice) => void;
  title?: string;
  subtitle?: string;
}

export function InvoicesTable({
  invoices: propInvoices,
  searchQuery: propSearchQuery,
  onViewInvoice,
  title = "Factures récentes",
  subtitle = "Historique de facturation et état des règlements",
}: InvoicesTableProps) {
  const appContext = useApp();
  const invoices = propInvoices ?? appContext.invoices;
  const searchQuery = propSearchQuery ?? appContext.searchQuery;

  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Filter invoices based on status, category, and search query
  const filteredInvoices = invoices
    .filter((inv) => {
      if (selectedStatus !== "all" && inv.status !== selectedStatus) return false;
      if (selectedCategory !== "all" && inv.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchClient = inv.client.name.toLowerCase().includes(q);
        const matchCompany = inv.client.company.toLowerCase().includes(q);
        const matchNumber = inv.invoiceNumber.toLowerCase().includes(q);
        const matchDesc = inv.description.toLowerCase().includes(q);
        return matchClient || matchCompany || matchNumber || matchDesc;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
      if (sortBy === "date-asc") return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + pageSize);

  const filterTabs = [
    { id: "all", label: "Tous les statuts" },
    { id: "paid", label: "Payée" },
    { id: "sent", label: "Envoyée" },
    { id: "overdue", label: "En retard" },
    { id: "draft", label: "Brouillon" },
  ];

  const categories = Array.from(new Set(invoices.map((i) => i.category)));

  const renderStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5EE] text-[#0B8457] border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B8457]" />
            Payée
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Envoyée
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            En retard
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Brouillon
          </span>
        );
    }
  };

  const handleRowClick = (inv: Invoice) => {
    if (onViewInvoice) onViewInvoice(inv);
    else appContext.setSelectedInvoice(inv);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/70 shadow-2xs">
      {/* Top Bar of the Table: Title & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterTabs.map((tab) => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedStatus(tab.id);
                  setCurrentPage(1);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-[#E8F5EE] text-[#0B8457] font-semibold border border-emerald-300/80 shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                )}
              >
                {tab.label}
              </button>
            );
          })}

          {/* More Filters button toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer",
              showAdvancedFilters
                ? "bg-[#0B8457] text-white border-[#0B8457]"
                : "bg-white border-slate-200/80 hover:bg-slate-50 text-slate-600"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Drawer */}
      {showAdvancedFilters && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-wrap items-center gap-4 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Catégorie :</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#0B8457]"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#0B8457]"
            >
              <option value="date-desc">Plus récent d'abord</option>
              <option value="date-asc">Plus ancien d'abord</option>
              <option value="amount-desc">Montant décroissant</option>
              <option value="amount-asc">Montant croissant</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedStatus("all");
              setSelectedCategory("all");
              setSortBy("date-desc");
            }}
            className="text-xs text-[#0B8457] hover:underline font-medium ml-auto cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-[#EBF5EF] text-slate-700 text-xs font-semibold rounded-2xl">
                <th className="py-3.5 pl-4 pr-3 first:rounded-l-xl">Date</th>
                <th className="py-3.5 px-3">N° Facture & Description</th>
                <th className="py-3.5 px-3">Client</th>
                <th className="py-3.5 px-3 hidden md:table-cell">Catégorie</th>
                <th className="py-3.5 px-3">Statut</th>
                <th className="py-3.5 px-3 text-right">Montant</th>
                <th className="py-3.5 pl-3 pr-4 text-center last:rounded-r-xl">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">Aucune facture trouvée</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Essayez de modifier vos filtres ou vos critères de recherche.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => handleRowClick(inv)}
                  >
                    {/* Date */}
                    <td className="py-4 pl-4 pr-3 whitespace-nowrap text-slate-600 font-medium">
                      {formatDate(inv.issueDate)}
                    </td>

                    {/* N° Facture & Description */}
                    <td className="py-4 px-3 max-w-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 group-hover:text-[#0B8457] transition-colors line-clamp-1">
                          {inv.description}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {inv.invoiceNumber}
                        </span>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {inv.client.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {inv.client.company} • {inv.client.city}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-3 whitespace-nowrap hidden md:table-cell text-slate-500 text-xs">
                      {inv.category}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      {renderStatusBadge(inv.status)}
                    </td>

                    {/* Amount in FCFA */}
                    <td className="py-4 px-3 whitespace-nowrap text-right font-bold">
                      <span
                        className={cn(
                          inv.status === "paid"
                            ? "text-[#0B8457]"
                            : inv.status === "overdue"
                            ? "text-rose-600"
                            : "text-slate-900"
                        )}
                      >
                        {inv.status === "paid" ? "+ " : ""}
                        {formatFCFA(inv.amount)}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="py-4 pl-3 pr-4 text-center whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setOpenActionId(openActionId === inv.id ? null : inv.id)
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          aria-label="Actions"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {openActionId === inv.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-30 animate-in fade-in zoom-in-95">
                            <button
                              onClick={() => {
                                setOpenActionId(null);
                                handleRowClick(inv);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>Voir le détail</span>
                            </button>
                            <button
                              onClick={() => {
                                setOpenActionId(null);
                                appContext.printInvoice(inv);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-400" />
                              <span>Imprimer / PDF</span>
                            </button>
                            {inv.status !== "paid" && (
                              <button
                                onClick={() => {
                                  setOpenActionId(null);
                                  appContext.markInvoiceAsPaid(inv.id);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors text-left font-medium cursor-pointer"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Marquer payée</span>
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setOpenActionId(null);
                                appContext.setEditingInvoice(inv);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                            >
                              <FileEdit className="w-3.5 h-3.5 text-slate-400" />
                              <span>Modifier</span>
                            </button>
                            <div className="pt-1 border-t border-slate-100 mt-1">
                              <button
                                onClick={() => {
                                  setOpenActionId(null);
                                  if (confirm(`Confirmez-vous la suppression de la facture ${inv.invoiceNumber} ?`)) {
                                    appContext.deleteInvoice(inv.id);
                                  }
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 rounded-xl hover:bg-rose-50 transition-colors text-left cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                <span>Supprimer</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Pagination Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 mt-4 border-t border-slate-100 text-xs text-slate-500">
        <div>
          Affichage {filteredInvoices.length > 0 ? startIndex + 1 : 0} -{" "}
          {Math.min(startIndex + pageSize, filteredInvoices.length)} sur {filteredInvoices.length} factures
        </div>

        {/* Pagination Pill Buttons */}
        <div className="flex items-center gap-1 self-center sm:self-auto">
          <button
            disabled={activePage <= 1}
            onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
            className="w-8 h-8 rounded-full border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-500 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = activePage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "w-8 h-8 rounded-full font-semibold flex items-center justify-center transition-colors cursor-pointer",
                  isActive
                    ? "bg-[#0B8457] text-white shadow-2xs"
                    : "border border-slate-200/80 hover:bg-slate-50 text-slate-600"
                )}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={activePage >= totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, activePage + 1))}
            className="w-8 h-8 rounded-full border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-500 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
