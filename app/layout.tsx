import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image';
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import NextAuthProvider from "@/components/next-auth-provider";
import { FaHome, FaInfoCircle, FaHeadset } from "react-icons/fa";
import carga from '@/public/images/carga_buenocambios.jpg';
import ErudaProviderClient from "@/components/Eruda/ErudaProviderClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuenoCambios",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className={inter.className}>
        <header>
          <h1 className="title">BuenoCambios</h1>
        </header>

        <div className="flex justify-center mt-4">
          <Image 
            src={carga} 
            alt="Carga BuenoCambios" 
            className="carga_bc" 
            width={800} 
            height={600} 
          />
        </div>

        <footer className="footer">
          <a href="/informacion" className="footer-item">
            <FaInfoCircle />
            <span>Ayuda</span>
          </a>
          <a href="/" className="footer-item">
            <FaHome />
            <span>Inicio</span>
          </a>
          <a href="/soporte" className="footer-item">
            <FaHeadset />
            <span>Soporte</span>
          </a>
        </footer>

        <NextAuthProvider>
          <ErudaProviderClient>
            <MiniKitProvider>
              {children}
            </MiniKitProvider>
          </ErudaProviderClient>
        </NextAuthProvider>
      </body>
    </html>
  );
}

