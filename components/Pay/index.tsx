"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation"; // Usamos el enrutador de Next.js
import { useEffect, useState } from "react";

export const PayBlock = () => {
  const router = useRouter(); // Hook de enrutamiento
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null); // Estado para saber si el pago fue exitoso

  const sendPayment = async () => {
    try {
      const res = await fetch(`/api/initiate-payment`, {
        method: "POST",
      });

      const { id } = await res.json();
      console.log("ID de la transacción:", id);

      const monedaAEnviar = localStorage.getItem("moneda_a_enviar");

      if (!monedaAEnviar || isNaN(Number(monedaAEnviar))) {
        console.error("Cantidad de WLD no válida");
        return null;
      }

      const payload: PayCommandInput = {
        reference: id,
        to: "0x73ca4a26cb0551ee43c2a876f8018f764fdb728d", 
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
      console.log("Error al enviar el pago:", error);
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
      console.log("Respuesta del pago:", response);

      if (!response) {
        console.error("Error: No se recibió respuesta de pago.");
        return;
      }

      // Verifica si la respuesta es exitosa
      if (response.status === "success") {
        const res = await fetch(`/api/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: response }),
        });

        const payment = await res.json();
        console.log("Respuesta del servidor de pago:", payment);

        if (payment.success) {
          console.log("¡Pago exitoso!");
          setPaymentSuccess(true); // Establece el estado como exitoso
        } else {
          console.log("Pago fallido");
          setPaymentSuccess(false); // Establece el estado como fallido
        }
      } else {
        console.log("El estado del pago no fue 'success'.");
        setPaymentSuccess(false);
      }
    } catch (error) {
      console.error("Error en handlePay:", error);
      setPaymentSuccess(false); // En caso de error, marcar como fallido
    }
  };

  // Redirige a la página de pago exitoso si el pago fue exitoso
  useEffect(() => {
    if (paymentSuccess) {
      console.log("Redirigiendo a la página de pago exitoso...");
      router.push("/pago-exitoso"); // Realiza la redirección
    } 
  }, [paymentSuccess, router]);

    return (
      <button 
          className="button-group" 
          onClick={handlePay}
      >
          Confirmar retiro
      </button>
  );
};

