"use client";

import { useWalletAuth } from "@/components/wallet/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/carga_buenocambios.jpg";

export default function LoginPage() {
    const {
        signInWithWallet,
        isLoading,
        walletAddress,
        username,
    } = useWalletAuth();

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // REDIRECCIÓN
    useEffect(() => {
        if (!isClient) return;

        const storedWallet =
            localStorage.getItem("walletAddress");

        const storedUsername =
            localStorage.getItem("username");

        console.log("walletAddress:", walletAddress);
        console.log("localStorage:", storedWallet);
        console.log("username:", username);
        console.log("localStorage:", storedUsername);

        if (walletAddress || storedWallet) {
            console.log(
                "✅ Wallet detectada, redirigiendo..."
            );

            router.replace("/");
        }
    }, [walletAddress, isClient, router]);

    // OCULTAR LAYOUT
    useEffect(() => {
        document.body.classList.add(
            "hide-header-footer",
            "no-scroll"
        );

        return () =>
            document.body.classList.remove(
                "hide-header-footer",
                "no-scroll"
            );
    }, []);

    return (
        <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-[#F7F9F5] px-5">

            {/* CONTENEDOR */}
            <div className="w-full max-w-md">

                {/* TARJETA */}
                <div className="rounded-3xl bg-white border border-[#D7E8C5] shadow-xl overflow-hidden">

                    {/* CABECERA */}
                    <div className="px-6 pt-8 pb-6 text-center">

                        {/* LOGO */}
                        <div className="mx-auto mb-6 h-28 w-28 rounded-full bg-[#F1F7EA] border-4 border-[#D7E8C5] flex items-center justify-center shadow-sm">

                            <Image
                                src={logo}
                                alt="Logo BuenoCambios"
                                width={112}
                                height={112}
                                className="rounded-full object-cover"
                            />

                        </div>

                        {/* TÍTULO */}
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            BuenoCambios
                        </h1>

                        {/* SUBTÍTULO */}
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                            Cambia tus monedas fácil,
                            <br />
                            rápido y seguro.
                        </p>

                    </div>


                    {/* CONTENIDO */}
                    <div className="px-6 pb-6">

                        {/* INFORMACIÓN */}
                        <div className="rounded-2xl bg-[#F1F7EA] border border-[#D7E8C5] p-4 mb-5">

                            <div className="flex items-center gap-3">

                                <div className="h-10 w-10 rounded-full bg-white border border-[#D7E8C5] flex items-center justify-center shrink-0">
                                    <span className="text-[#589013] text-lg font-bold">
                                        W
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#3F6B0D]">
                                        Conecta tu wallet
                                    </p>

                                    <p className="text-xs text-[#589013] mt-1">
                                        Necesaria para realizar tus
                                        operaciones.
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* BOTÓN */}
                        <button
                            type="button"
                            onClick={async () => {
                                await signInWithWallet();
                                router.replace("/");
                            }}
                            disabled={isLoading}
                            className={`w-full rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all ${
                                isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                    : "bg-[#589013] hover:bg-[#3F6B0D] active:scale-[0.99]"
                            }`}
                        >
                            {isLoading
                                ? "Conectando..."
                                : "Inicia sesión"}
                        </button>


                        {/* TEXTO INFERIOR */}
                        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                            Al continuar, conectarás tu wallet
                            para utilizar BuenoCambios.
                        </p>

                    </div>

                </div>

            </div>


            {/* ANIMACIÓN */}
            <style jsx>{`
                @keyframes shine {
                    0% {
                        background-position: -200%;
                    }

                    100% {
                        background-position: 200%;
                    }
                }

                .shine-effect {
                    background: linear-gradient(
                        90deg,
                        #589013,
                        #3F6B0D,
                        #589013
                    );

                    background-size: 200% auto;

                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;

                    animation: shine 3s linear infinite;
                }
            `}</style>

        </div>
    );
}