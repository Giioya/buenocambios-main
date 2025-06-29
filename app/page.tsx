"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import monedaEnviarImg from "@/public/images/wld-logo.png";
import dineroRecibirImg from "@/public/images/colombia-flag.png";
import { useWalletAuth } from "@/components/wallet/";
import { getBalance } from "@/components/balance";

const redirigirSegunMetodoPago = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  datos: { cantidadWLD: number; metodoPago: string; dineroARecibir: string }
) => {
  const { cantidadWLD, metodoPago, dineroARecibir } = datos;

  if (!metodoPago || isNaN(cantidadWLD) || cantidadWLD <= 0 || !dineroARecibir) {
    setErrorMessage("Por favor completa los espacios.");
    return;
  }

  localStorage.setItem("moneda_a_enviar", cantidadWLD.toString());
  localStorage.setItem("dinero_a_recibir", dineroARecibir);
  localStorage.setItem("metodo-pago", metodoPago);

  setErrorMessage(null);
  window.location.href = `/${metodoPago}`;
};

export default function Home() {
  const [cantidadWLD, setCantidadWLD] = useState<number>(0);
  const [metodoPago, setMetodoPago] = useState<string>("");
  const [dineroARecibir, setDineroARecibir] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [precioWLD, setPrecioWLD] = useState<number | null>(null);
  const [precioUSDT, setPrecioUSDT] = useState<number | null>(null);
  const { walletAddress, username } = useWalletAuth();
  const [saldoDisponible, setSaldoDisponible] = useState<number>(0);

  useEffect(() => {
    if (walletAddress) {
      getBalance(walletAddress).then((saldo) => {
        let descuento = 0.03; 

      if (saldo < 5) {
          descuento = 0.01;
      } else if (saldo >= 5 && saldo < 20) {
          descuento = 0.02;
      }
        setSaldoDisponible(parseFloat((saldo - descuento).toFixed(2))); 
      });
    }
  }, [walletAddress]);

  const actualizarPrecios = async () => {
    try {
      const [wldResponse, usdtResponse] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=worldcoin-wld&vs_currencies=usd&_=${Date.now()}`),
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=cop&_=${Date.now()}`),
      ]);
      const wldData = await wldResponse.json();
      const usdtData = await usdtResponse.json();

      setPrecioWLD(wldData["worldcoin-wld"]?.usd || null);
      setPrecioUSDT(usdtData.tether?.cop || null);
    } catch (error) {
      console.error("Error al obtener los precios:", error);
      setPrecioWLD(null);
      setPrecioUSDT(null);
    }
  };

  useEffect(() => {
    actualizarPrecios();
    const interval = setInterval(actualizarPrecios, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (precioWLD !== null && precioUSDT !== null && cantidadWLD > 0) {
      const precioUSDTajustado = precioUSDT - 90;
      const valorWLDenCOP = precioWLD * precioUSDTajustado;
      const descuento = cantidadWLD < 1 ? 0.5 : 0.9;
      const valorTotal = valorWLDenCOP * descuento * cantidadWLD;

      setDineroARecibir(
        valorTotal.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      );
    } else {
      setDineroARecibir("");
    }
  }, [precioWLD, precioUSDT, cantidadWLD]);

  return (
    <div>
      <div className="w-full max-w-2xl mb-4 flex justify-center">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-red-600 text-sm p-2 rounded-md shadow-md text-center">
          <p className="font-semibold">
            ⚠ Si tienes problemas con tu transacción, dirígete al apartado de &quot;Ayuda&quot; o escríbenos a soporte.
          </p>
          <p className="font-semibold">
            * Las transacciones que se realicen después de las 10:00 PM se verán reflejadas a las 9:00 AM del día siguiente.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <p className="text-gray-500 text-lg font-semibold">Saldo disponible para retiro:</p>
        <p className="text-4xl font-bold">
          {saldoDisponible.toLocaleString("es-CO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).split(".")[0]} WLD
          <span className="text-gray-400">
          </span>
        </p>
        <p className="text-gray-500 text-lg font-semibold text-center">
            Si no ves tus fondos, verifica que no los tengas en bóveda.
        </p>
        
      </div>

      <div className="container">
        <div className="text-center text-xl font-bold my-4">
          {username ? `Bienvenido, ${username}` : `Bienvenido, ${walletAddress?.slice(0, 6)}...`}
        </div>

        <div className="input-group">
          <label htmlFor="moneda_a_enviar">Moneda a retirar</label>
          <div className="input-wrapper">
            <Image src={monedaEnviarImg.src} alt="Moneda a enviar" className="input-icon" width={24} height={24} />
            <input
              type="number"
              step="0.1"
              id="moneda_a_enviar"
              value={cantidadWLD || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setCantidadWLD(value);
              }}
              placeholder="Cantidad en WLD"
              className={cantidadWLD > saldoDisponible ? "text-red-500" : ""}
            />
          </div>
          <div className="flex justify-between mt-1">
            <p
              className="text-blue-600 text-sm cursor-pointer underline"
              onClick={() => setCantidadWLD(saldoDisponible)}
            >
              Retiro máximo
            </p>
            {cantidadWLD > saldoDisponible && (
              <p className="text-red-500 text-sm">Fondos insuficientes</p>
            )}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="dinero_a_recibir">Dinero a recibir</label>
          <div className="input-wrapper">
            <Image src={dineroRecibirImg.src} alt="Dinero a recibir" className="input-icon" width={24} height={24} />
            <input type="text" id="dinero_a_recibir" value={dineroARecibir || ""} placeholder="Cantidad en COP" readOnly />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="metodo-pago">Método de pago</label>
          <select
            id="metodo-pago"
            value={metodoPago}
            onChange={(e) => {
              const selected = e.target.value;

              // Solo permitir "llave" si WLD < 15
              if (cantidadWLD < 10 && selected !== "llave") {
                setErrorMessage("⚠️ Solo montos superiores a 10 WLD permiten este método.");
                setMetodoPago(""); // Limpia selección
                return;
              }

              setErrorMessage(null);
              setMetodoPago(selected);
            }}
          >
            <option value="">Selecciona un banco</option>
            <option value="nequi" disabled={cantidadWLD < 10}>Nequi</option>
            <option value="daviplata" disabled={cantidadWLD < 10}>Daviplata</option>
            <option value="bancolombia" disabled={cantidadWLD < 10}>Bancolombia</option>
            <option value="llave">Retira con tus llaves</option>
          </select>
        </div>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px", marginBottom: "20px" }}>{errorMessage}</div>
        )}

          <div className="btn-continuar">
            <button
              onClick={() => redirigirSegunMetodoPago(setErrorMessage, { cantidadWLD, metodoPago, dineroARecibir })}
              type="submit"
              disabled={cantidadWLD > saldoDisponible}
            >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}