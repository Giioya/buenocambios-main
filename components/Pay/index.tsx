
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
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = async () => {
    if (isPaying) return;

    setIsPaying(true);

    try {
      console.log("🚀 INICIO PAYBLOCK");

      if (!MiniKit.isInstalled()) {
        console.warn("❌ MiniKit NO instalado");
        setIsPaying(false);
        return;
      }

      // 🔹 1. Obtener reference del backend
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
      });

      console.log("📡 initiate-payment status:", res.status);

      const refData = await res.json();
      console.log("🧾 reference response:", refData);

      const reference = refData?.id;

      if (!reference) {
        console.error("❌ No llegó reference del backend");
        setIsPaying(false);
        return;
      }

      // 🔹 2. Obtener datos de wallet
      const monedaAEnviar = localStorage.getItem("moneda_a_enviar");
      const wallet = localStorage.getItem("walletAddress");

      console.log("💰 monedaAEnviar:", monedaAEnviar);
      console.log("👛 wallet:", wallet);

      if (!monedaAEnviar) {
        console.error("❌ monedaAEnviar no existe");
        setIsPaying(false);
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
        setIsPaying(false);
        return;
      }

      // 🔹 4. Confirmar pago en backend
      console.log("📤 Enviando confirm-payment...");

      const confirmRes = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      if (!payment.success) {
        setIsPaying(false);
      }

    } catch (error) {
      console.error("💥 ERROR EN PAYBLOCK:", error);
      setPaymentSuccess(false);
      setIsPaying(false);
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      console.log("➡️ REDIRECCIÓN A /pago-exitoso");
      router.push("/pago-exitoso");
    }
  }, [paymentSuccess, router]);

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={isPaying}
      className={`
        w-full
        mt-4
        rounded-2xl
        px-5
        py-4
        text-base
        font-semibold
        transition-all
        duration-200
        shadow-md
        ${
          isPaying
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
        }
      `}
    >
      {isPaying ? "Procesando pago..." : "Confirmar retiro"}
    </button>
  );
};