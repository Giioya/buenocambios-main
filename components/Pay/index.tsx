"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation"; // Usamos el enrutador de Next.js

export const PayBlock = () => {
  const router = useRouter(); // Hook de enrutamiento

  const sendPayment = async () => {
    try {
      const res = await fetch(`/api/initiate-payment`, {
        method: "POST",
      });

      const { id } = await res.json();
      console.log(id);

      const monedaAEnviar = localStorage.getItem("moneda_a_enviar");

      if (!monedaAEnviar || isNaN(Number(monedaAEnviar))) {
        console.error("Cantidad de WLD no válida");
        return null;
      }

      const payload: PayCommandInput = {
        reference: id,
        to: "0x1ffb26b25ea5b04206b0db888d974b5c632776cf", // Test address
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(Number(monedaAEnviar), Tokens.WLD).toString(),
          },
        ],
        description: "Retirando monedas",
      };

      console.log("Payload enviado a MiniKit:", payload);

      if (MiniKit.isInstalled()) {
        return await MiniKit.commandsAsync.pay(payload);
      }
      return null;
    } catch (error: unknown) {
      console.log("Error sending payment", error);
      return null;
    }
  };

  const handlePay = async () => {
    try {
      const sendPaymentResponse = await sendPayment();
      console.log("Respuesta de MiniKit:", sendPaymentResponse);

      if (!sendPaymentResponse) {
        console.error("Error: MiniKit no devolvió respuesta.");
        return;
      }

      const response = await sendPaymentResponse.finalPayload; 
      console.log(sendPaymentResponse?.finalPayload);

      if (!response) {
        console.error("Error: No se recibió respuesta de pago.");
        return;
      }

      if (response.status === "success") {
        const res = await fetch(`/api/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: response }),
        });

        const payment = await res.json();
        if (payment.success) {
          console.log("SUCCESS!");
          router.push("/pago-exitoso"); // Redirige a la página de éxito
        } else {
          console.log("FAILED!");
        }
      }
    } catch (error) {
      console.error("Error en handlePay:", error);
    }
  };

  return (
    <p onClick={handlePay}>
      Finalizar
    </p>
  );
};
