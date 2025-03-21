import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import NextAuthProvider from "@/components/next-auth-provider";
import { FaHome, FaInfoCircle, FaHeadset, FaHistory } from "react-icons/fa";
import ErudaProviderClient from "@/components/Eruda/ErudaProviderClient";
import AuthGuard from "@/components/AuthGuard"; // 🛑 Importa el AuthGuard

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuenoCambios",
  description: "Generated by Gioya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthGuard> {/* 🔒 Protege toda la app */}
          <header>
            <h1 className="title">BuenoCambios</h1>
          </header>

          <footer className="footer">
          <a href="/historial" className="footer-item">
              <FaHistory />
              <span>Historial</span>
            </a>
            <a href="/" className="footer-item">
              <FaHome />
              <span>Inicio</span>
            </a>
            <a href="/soporte" className="footer-item">
              <FaHeadset />
              <span>Soporte</span>
            </a>
            <a href="/informacion" className="footer-item">
              <FaInfoCircle />
              <span>Ayuda</span>
            </a>
          </footer>

          <NextAuthProvider>
            <ErudaProviderClient>
              <MiniKitProvider>
                {children}
              </MiniKitProvider>
            </ErudaProviderClient>
          </NextAuthProvider>
        </AuthGuard>
      </body>
    </html>
  );
}

