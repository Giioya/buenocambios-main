"use client";

import { MiniKit } from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const toDecimals = (amount: number, decimals = 18) => {
  return BigInt(Math.floor(amount * 10 ** decimals)).toString();
};

export const PayBlock = ({ transaccionId }: { transaccionId: string }) => {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const handlePay = async () => {
    try {
      console.log("🚀 INICIO PAYBLOCK");

      if (!MiniKit.isInstalled()) {
        console.warn("❌ MiniKit NO instalado");
        return;
      }

      // 🔹 1. reference backend
      const res = await fetch("/api/initiate-payment", { method: "POST" });

      console.log("📡 initiate-payment status:", res.status);

      const refData = await res.json();
      console.log("🧾 reference response:", refData);

      const reference = refData?.id;

      if (!reference) {
        console.error("❌ No llegó reference del backend");
        return;
      }

      // 🔹 2. wallet data
      const monedaAEnviar = localStorage.getItem("moneda_a_enviar");
      const wallet = localStorage.getItem("walletAddress");

      console.log("💰 monedaAEnviar:", monedaAEnviar);
      console.log("👛 wallet:", wallet);

      if (!monedaAEnviar) {
        console.error("❌ monedaAEnviar no existe");
        return;
      }

      // 🔹 3. PAY
      console.log("💳 Ejecutando MiniKit.pay...");

      const result = await MiniKit.pay({
        reference,
        to: "0x1ffb26b25ea5b04206b0db888d974b5c632776cf",
        tokens: [
          {
            symbol: "WLD" as any,
            token_amount: toDecimals(Number(monedaAEnviar)),
          },
        ],
        description: "Retirando monedas",
      });

      console.log("📦 FULL MiniKit result:", result);
      console.log("⚙️ executedWith:", result.executedWith);
      console.log("🔑 result.data:", result.data);
      

      if (!result.data?.transactionId) {
        console.error("❌ NO transactionId en respuesta");
        return;
      }

      // 🔹 4. CONFIRM BACKEND
      console.log("📤 Enviando confirm-payment...");

      const confirmRes = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: {
            transactionId: result.data.transactionId,
            reference,
            transaccionId,
            fromWalletAddress: wallet,
          },
        }),
      });

      console.log("📡 confirm-payment status:", confirmRes.status);

      const payment = await confirmRes.json();

      console.log("📥 backend response:", payment);

      

      setPaymentSuccess(payment.success);

    } catch (error) {
      console.error("💥 ERROR EN PAYBLOCK:", error);
      setPaymentSuccess(false);
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      console.log("➡️ REDIRECCIÓN A /pago-exitoso");
      router.push("/pago-exitoso");
    }
  }, [paymentSuccess, router]);

  return <button onClick={handlePay}>Confirmar retiro</button>;
};