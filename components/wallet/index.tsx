"use client";

import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export function useWalletAuth() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false); // 🔥 clave

    // 🔥 Cargar desde localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedWallet = localStorage.getItem("walletAddress");
            const storedUsername = localStorage.getItem("username");

            if (storedWallet) {
                setWalletAddress(storedWallet);
            }

            if (storedUsername) {
                setUsername(storedUsername);
            }
        }

        setIsAuthReady(true); // 👈 importante
    }, []);

    const signInWithWallet = async () => {
        setIsLoading(true);

        try {
            if (!MiniKit.isInstalled()) {
                alert("MiniKit no está instalado.");
                return;
            }

            const res = await fetch(`/api/nonce`);
            const { nonce } = await res.json();

            const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
                nonce,
                requestId: "0",
                expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
            });

            if (finalPayload.status === "error") {
                alert("Error en la autenticación.");
                return;
            }

            const verifyRes = await fetch("/api/complete-siwe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: finalPayload, nonce }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.status === "success" && verifyData.isValid) {

                // 🔥 CORRECTO
                const address = MiniKit.walletAddress ?? null;

                if (address) {
                    setWalletAddress(address);
                    localStorage.setItem("walletAddress", address);
                }

                if (MiniKit.user?.username) {
                    setUsername(MiniKit.user.username);
                    localStorage.setItem("username", MiniKit.user.username);
                }
            }

        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Hubo un problema con la autenticación.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        walletAddress,
        username,
        signInWithWallet,
        isLoading,
        isAuthReady, // 🔥 nuevo
    };
}













