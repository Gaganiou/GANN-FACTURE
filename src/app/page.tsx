"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/context/app-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SubHeaderTabs } from "@/components/dashboard/sub-header-tabs";
import { OverviewView } from "@/components/views/overview-view";
import { InvoicesView } from "@/components/views/invoices-view";
import { ClientsView } from "@/components/views/clients-view";
import { PaymentsView } from "@/components/views/payments-view";
import { ReportsView } from "@/components/views/reports-view";
import { DocumentsView } from "@/components/views/documents-view";
import { SettingsView } from "@/components/views/settings-view";
import { HelpView } from "@/components/views/help-view";

import { CreateInvoiceModal } from "@/components/dashboard/create-invoice-modal";
import { EditInvoiceModal } from "@/components/dashboard/edit-invoice-modal";
import { CreateClientModal } from "@/components/dashboard/create-client-modal";
import { RecordPaymentModal } from "@/components/dashboard/record-payment-modal";
import { InvoiceDetailModal } from "@/components/dashboard/invoice-detail-modal";
import { ToastNotification } from "@/components/ui/toast";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case "invoices":
        return <InvoicesView />;
      case "clients":
        return <ClientsView />;
      case "payments":
        return <PaymentsView />;
      case "reports":
        return <ReportsView />;
      case "documents":
        return <DocumentsView />;
      case "settings":
        return <SettingsView />;
      case "help":
        return <HelpView />;
      case "overview":
      default:
        return <OverviewView />;
    }
  };

  const showSubTabs = ["overview", "invoices", "clients", "payments", "reports"].includes(activeTab);

  return (
    <div className="flex min-h-screen bg-[#F4F6F5]">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <Header onOpenMobileMenu={() => setSidebarOpen(true)} />

        {/* Dashboard Content Container */}
        <main className="flex-1 px-4 sm:px-8 py-2 pb-14 space-y-6 max-w-7xl w-full mx-auto">
          {/* Sub Header Tabs for quick navigation */}
          {showSubTabs && <SubHeaderTabs />}

          {/* Dynamic Active View */}
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <CreateInvoiceModal />
      <EditInvoiceModal />
      <CreateClientModal />
      <RecordPaymentModal />
      <InvoiceDetailModal />
      <ToastNotification />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}
