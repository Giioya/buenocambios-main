import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MiniKitProvider from "@/components/minikit-provider";
import "./globals.css";

import {
  FaHome,
  FaInfoCircle,
  FaHeadset,
  FaHistory,
} from "react-icons/fa";

import ErudaProviderClient from "@/components/Eruda/ErudaProviderClient";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuenoCambios",
  description: "Intercambio de WLD a COP - BuenoCambios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900`}
      >
        <AuthGuard>

          {/* =========================
              CONTENEDOR PRINCIPAL
          ========================== */}
          <div className="min-h-screen flex flex-col">

            {/* =========================
                HEADER
            ========================== */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

              <div className="mx-auto max-w-xl px-5 h-[68px] flex items-center justify-between">

                {/* LOGO / NOMBRE */}
                <a
                  href="/"
                  className="flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">

                    <img
                      src="/images/carga_buenocambios.jpg"
                      alt="BuenoCambios"
                      className="h-9 w-9 object-contain rounded-full"
                    />

                  </div>

                  <div>
                    <h1 className="text-lg font-bold text-gray-900 leading-none">
                      BuenoCambios
                    </h1>

                    <p className="text-[11px] text-gray-400 mt-1">
                      WLD → COP
                    </p>
                  </div>
                </a>

              </div>

            </header>


            {/* =========================
                CONTENIDO
            ========================== */}
            <main className="flex-1 pt-[68px] pb-[88px]">
              {/*
                El padding superior evita que el header
                tape el contenido.

                El padding inferior evita que el footer
                tape botones o formularios.
              */}

              <div className="mx-auto w-full">
                <ErudaProviderClient>
                  <MiniKitProvider>
                    {children}
                  </MiniKitProvider>
                </ErudaProviderClient>
              </div>

            </main>


            {/* =========================
                FOOTER / NAVEGACIÓN
            ========================== */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_15px_rgba(0,0,0,0.04)]">

              <nav className="mx-auto max-w-xl h-[76px] px-3 flex items-center justify-around">

                {/* HISTORIAL */}
                <a
                  href="/historial"
                  className="group flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <FaHistory className="text-[20px] group-hover:scale-110 transition-transform" />

                  <span className="text-[11px] font-medium">
                    Historial
                  </span>
                </a>


                {/* INICIO */}
                <a
                  href="/"
                  className="group flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 text-gray-900 transition-colors"
                >
                  <div className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <FaHome className="text-[17px]" />
                  </div>

                  <span className="text-[11px] font-bold">
                    Inicio
                  </span>
                </a>


                {/* SOPORTE */}
                <a
                  href="/soporte"
                  className="group flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <FaHeadset className="text-[20px] group-hover:scale-110 transition-transform" />

                  <span className="text-[11px] font-medium">
                    Soporte
                  </span>
                </a>


                {/* AYUDA */}
                <a
                  href="/informacion"
                  className="group flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <FaInfoCircle className="text-[20px] group-hover:scale-110 transition-transform" />

                  <span className="text-[11px] font-medium">
                    Ayuda
                  </span>
                </a>

              </nav>

            </footer>

          </div>

        </AuthGuard>
      </body>
    </html>
  );
}