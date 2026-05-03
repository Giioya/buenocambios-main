    "use client";

    import { useState, useEffect } from "react";
    import { MiniKit } from "@worldcoin/minikit-js";

    export function useWalletAuth() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
        const storedWallet = localStorage.getItem("walletAddress");
        const storedUsername = localStorage.getItem("username");

        if (storedWallet) setWalletAddress(storedWallet);
        if (storedUsername) setUsername(storedUsername);
        }

        setIsAuthReady(true);
    }, []);

    const signInWithWallet = async () => {
        setIsLoading(true);

        try {
        if (!MiniKit.isInstalled()) {
            alert("MiniKit no está instalado.");
            return;
        }

        // 🔹 1. Obtener nonce
        const res = await fetch("/api/nonce");
        const { nonce } = await res.json();

        // 🔹 2. Auth con MiniKit (nuevo flujo)
        const result = await MiniKit.walletAuth({
            nonce,
            statement: "Sign in to my app",
            expirationTime: new Date(Date.now() + 60 * 60 * 1000),
        });

        // 🔹 fallback (fuera de World App)
        if (result.executedWith === "fallback") {
            return;
        }

        // 🔹 3. Enviar al backend
        const verifyRes = await fetch("/api/complete-siwe", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            payload: result.data,
            nonce,
            }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.isValid) {
            const address = result.data.address;
            const userInfo = await MiniKit.getUserByAddress(address);
            console.log("👤 userInfo:", userInfo);

            setWalletAddress(address);
            localStorage.setItem("walletAddress", address);

            // 🔹 username opcional
            if (userInfo?.username) {
                setUsername(userInfo.username);
                localStorage.setItem("username", userInfo.username);
}
        } else {
            console.error("Verificación fallida:", verifyData.error);
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
        isAuthReady,
    };
    }