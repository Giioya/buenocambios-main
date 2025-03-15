"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import monedaEnviarImg from '@/public/images/wld-logo.png';
import dineroRecibirImg from '@/public/images/colombia-flag.png';
import { useWalletAuth } from "@/components/wallet/";
import { getBalance } from "@/components/balance";

// Función para redirigir según el método de pago
const redirigirSegunMetodoPago = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  datos: { cantidadWLD: number, metodoPago: string, dineroARecibir: string }
) => {
  const { cantidadWLD, metodoPago, dineroARecibir } = datos;

  if (!metodoPago || isNaN(cantidadWLD) || cantidadWLD <= 0 || !dineroARecibir) {
    setErrorMessage('Por favor completa los espacios.');
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
  const { walletAddress, username } = useWalletAuth();
  const [saldoDisponible, setSaldoDisponible] = useState<number>(0);

  useEffect(() => {
    const obtenerSaldo = async () => {
      if (walletAddress) {
        const saldo = await getBalance(walletAddress);
        console.log("Saldo disponible en WLD:", saldo);
        setSaldoDisponible(saldo);
      }
    };
    obtenerSaldo();
  }, [walletAddress]);

  // Función para obtener el precio de WLD en USD
  const actualizarPrecioWLD = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=worldcoin-wld&vs_currencies=usd&_=${Date.now()}`);
      const data = await response.json();
      setPrecioWLD(data["worldcoin-wld"].usd);
    } catch (error) {
      console.error('Error al obtener el precio de WLD:', error);
      setPrecioWLD(null);
    }
  };

  // Llamar la API de CoinGecko al cargar el componente y cada 30s
  useEffect(() => {
    actualizarPrecioWLD();
    const interval = setInterval(actualizarPrecioWLD, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calcular el valor en COP cuando cambia `cantidadWLD` o `precioWLD`
  useEffect(() => {
    if (precioWLD !== null && cantidadWLD > 0) {
      const tasaCambioCOP = 4020;
      const valorWLDenCOP = precioWLD * tasaCambioCOP;
      const descuento = cantidadWLD < 1 ? 0.5 : 0.9;
      const valorConDescuento = valorWLDenCOP * descuento;

      const valorTotal = valorConDescuento * cantidadWLD;

      setDineroARecibir(valorTotal.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
    } else {
      setDineroARecibir("");
    }
  }, [precioWLD, cantidadWLD]);

  return (
    <div>
      {/* Aviso en rojo */}
      <div className="w-full max-w-2xl mb-4 flex justify-center">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-red-600 text-sm p-2 rounded-md shadow-md text-center">
          <p className="font-semibold">
            ⚠ Si tienes problemas con tu transacción, dirígete al apartado de &quot;Ayuda&quot; o escríbenos a soporte.
          </p>
          <p className="font-semibold">
            * Las transacciones que se realicen después de las 10pm se verán reflejadas a las 9am del día siguiente.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Mensaje de bienvenida */}
        <div className="text-center text-xl font-bold my-4">
          {username ? `Bienvenido, ${username}` : `Bienvenido, ${walletAddress?.slice(0, 6)}...`}
        </div>

      <div className="container">
        <div className="input-group">
          <label htmlFor="moneda_a_enviar">Moneda a enviar</label>
          <div className="input-wrapper">
            <Image 
              src={monedaEnviarImg.src} 
              alt="Moneda a enviar" 
              className="input-icon" 
              width={24} 
              height={24} 
            />
            <input
              type="number"
              step="0.1"
              id="moneda_a_enviar"
              value={cantidadWLD || ''}
              onChange={(e) => setCantidadWLD(parseFloat(e.target.value))}
              placeholder="Cantidad en WLD"
            />
          </div>
          {/* Botón "MAX" como texto subrayado */}
          {saldoDisponible > 0 && (
            <p 
              className="text-blue-600 text-sm cursor-pointer underline mt-1"
              onClick={() => setCantidadWLD(parseFloat((saldoDisponible * 0.996).toFixed(2)))}
            >
              MAX ({(saldoDisponible * 0.997).toFixed(2)} WLD)
            </p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="dinero_a_recibir">Dinero a recibir</label>
          <div className="input-wrapper">
            <Image 
              src={dineroRecibirImg.src} 
              alt="Dinero a recibir" 
              className="input-icon" 
              width={24} 
              height={24} 
            />
            <input
              type="text"
              id="dinero_a_recibir"
              value={dineroARecibir || ''}
              placeholder="Cantidad en COP"
              readOnly
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="metodo-pago">Método de pago</label>
          <select
            id="metodo-pago"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="" disabled>Selecciona un banco</option>
            <option value="nequi">Nequi</option>
            <option value="daviplata">Daviplata</option>
            <option value="bancolombia">Bancolombia</option>
          </select>
        </div>

        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px', marginBottom: '20px' }}>
            {errorMessage}
          </div>
        )}

        <div className="btn-continuar">
          <button
            onClick={() => redirigirSegunMetodoPago(setErrorMessage, { cantidadWLD, metodoPago, dineroARecibir })}
            type="submit"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}