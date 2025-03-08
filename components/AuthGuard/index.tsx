"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const storedWallet = typeof window !== "undefined" ? localStorage.getItem("walletAddress") : null;
        const username = MiniKit.user?.username || storedWallet;

        if (MiniKit.user?.username) {
            localStorage.setItem("username", MiniKit.user.username);
            localStorage.setItem("walletAddress", MiniKit.walletAddress ?? "");
        }

        // Redirigir al login si no hay usuario autenticado
        if (pathname === "/" && !username) {
            router.push("/login");
        }
    }, [router, pathname, isClient, MiniKit.user?.username]); // Se agregó MiniKit.user?.username a las dependencias

    if (!isClient) {
        return <p>Cargando...</p>;
    }

    return <>{children}</>;
}




