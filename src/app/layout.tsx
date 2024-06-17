import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_provider/auth";
import { ContextProvider } from "@/contexts/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controle-Estoque",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
        <AuthProvider>
          <body className={inter.className}>
            <ContextProvider>
              {children}
            </ContextProvider>
          </body>
        </AuthProvider>
    </html>
  );
}
