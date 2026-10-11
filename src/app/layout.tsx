import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GANN FACTURE — SaaS de facturation pour entrepreneurs africains",
  description:
    "Gérez vos factures, devis, clients et encaissements en FCFA en toute simplicité.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#F4F6F5] min-h-screen text-slate-900 antialiased selection:bg-[#E8F5EE] selection:text-[#0B8457]">
        {children}
      </body>
    </html>
  );
}
