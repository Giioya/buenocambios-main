"use client";

import { useWalletAuth } from "@/components/wallet/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/carga_buenocambios.jpg";

export default function LoginPage() {
    const { signInWithWallet, isLoading, walletAddress } = useWalletAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const storedWallet = typeof window !== "undefined" ? localStorage.getItem("walletAddress") : null;
        
        if (walletAddress || storedWallet) {
            console.log("✅ Wallet detectada, redirigiendo a la página principal...");
            router.push("/");
        }
    }, [walletAddress, router]);

    useEffect(() => {
        document.body.classList.add("hide-header-footer", "no-scroll");
        return () => document.body.classList.remove("hide-header-footer", "no-scroll");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 fixed top-0 left-0 border-8 border-[#3b5110]">

            {/* 🔘 BOTÓN IR AL INICIO */}
            <button
                onClick={() => router.push("/")}
                className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow-md transition"
            >
                ← Inicio
            </button>

            {/* Título */}
            <h1 className="text-5xl font-extrabold text-center mb-12 relative shine-effect">
                BuenoCambios
            </h1>

            <style jsx>{`
                @keyframes shine {
                    0% { background-position: -200%; }
                    100% { background-position: 200%; }
                }

                .shine-effect {
                    background: linear-gradient(90deg, #CCCCCC, #589013, #3b5110, #589013, #CCCCCC);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shine 3s linear infinite;
                }
            `}</style>

            {/* Logo */}
            <div className="w-40 h-40 mb-12 border-4 border-gray-800 rounded-full flex items-center justify-center">
                <Image src={logo} alt="Logo BuenoCambios" width={160} height={160} className="rounded-full" />
            </div>

            {/* Subtítulo */}
            <p className="text-sm text-gray-600 mb-10">
                Cambia tus monedas fácil, rápido y seguro
            </p>

            {/* Botón login */}
            <button
                onClick={signInWithWallet}
                className="bg-[#3b5110] text-white text-lg w-full py-5 mb-10 absolute bottom-0 left-0 rounded-none shadow-md hover:bg-[#589013] transition disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? "Conectando..." : "Inicia sesión"}
            </button>
        </div>
    );
}