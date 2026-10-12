import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "iziFacture — SaaS de facturation pour entrepreneurs africains",
  description:
    "Créez des factures professionnelles, gérez vos clients et suivez vos encaissements Wave, Orange Money et virements en FCFA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#F4F6F5] min-h-screen text-slate-900 antialiased selection:bg-[#E8F5EE] selection:text-[#0B8457]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
