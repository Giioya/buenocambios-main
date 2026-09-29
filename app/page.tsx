"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import monedaEnviarImg from "@/public/images/wld-logo.png";
import dineroRecibirImg from "@/public/images/colombia-flag.png";
import { useWalletAuth } from "@/components/wallet/";
import { getBalance } from "@/components/balance";

const redirigirSegunMetodoPago = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  datos: {
    cantidadWLD: number;
    metodoPago: string;
    dineroARecibir: string;
  }
) => {
  const { cantidadWLD, metodoPago, dineroARecibir } = datos;

  if (
    !metodoPago ||
    isNaN(cantidadWLD) ||
    cantidadWLD <= 0 ||
    !dineroARecibir
  ) {
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
  const [precioUSDCOP, setPrecioUSDCOP] = useState<number | null>(null);
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

        setSaldoDisponible(
          parseFloat((saldo - descuento).toFixed(2))
        );
      });
    }
  }, [walletAddress]);

  const actualizarPrecios = async () => {
    try {
      const [wldResponse, copResponse] = await Promise.all([
        fetch(
          "https://api.coinpaprika.com/v1/tickers/wld-worldcoin"
        ),
        fetch(
          `https://fxapi.app/api/USD/COP.json?_=${Date.now()}`
        ),
      ]);

      const wldData = await wldResponse.json();
      const copData = await copResponse.json();

      setPrecioWLD(
        wldData?.quotes?.USD?.price ?? null
      );

      setPrecioUSDCOP(
        copData?.rate ?? null
      );
    } catch (error) {
      console.error("Error al obtener los precios:", error);
      setPrecioWLD(null);
      setPrecioUSDCOP(null);
    }
  };

  useEffect(() => {
    actualizarPrecios();

    const interval = setInterval(
      actualizarPrecios,
      300000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      precioWLD !== null &&
      precioUSDCOP !== null &&
      cantidadWLD > 0
    ) {
      const precioUSDCOPajustado =
        precioUSDCOP - 90;

      const valorWLDenCOP =
        precioWLD * precioUSDCOPajustado;

      const descuento =
        cantidadWLD < 1 ? 0.5 : 0.9;

      const valorTotal =
        valorWLDenCOP *
        descuento *
        cantidadWLD;

      setDineroARecibir(
        valorTotal.toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    } else {
      setDineroARecibir("");
    }
  }, [
    precioWLD,
    precioUSDCOP,
    cantidadWLD,
  ]);

  const fondosInsuficientes =
    cantidadWLD > saldoDisponible;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* AVISO */}
      <div className="mx-auto w-full max-w-xl mb-5">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="text-xl">⚠️</div>

            <div className="text-sm text-yellow-900">
              <p className="font-bold mb-1">
                Información importante
              </p>

              <p className="leading-relaxed">
                Si tienes problemas con tu transacción,
                dirígete al apartado de <strong>Ayuda</strong>{" "}
                o escríbenos a soporte.
              </p>

              <p className="mt-2 leading-relaxed">
                Las transacciones realizadas después de las
                <strong> 10:00 PM</strong> se verán reflejadas
                a partir de las <strong>9:00 AM</strong> del
                día siguiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TARJETA PRINCIPAL */}
      <div className="mx-auto w-full max-w-xl">

        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">

          {/* ENCABEZADO */}
          <div className="px-6 pt-6 pb-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {username
                    ? `Bienvenido, ${username}`
                    : walletAddress
                    ? `Billetera ${walletAddress.slice(0, 6)}...`
                    : "Bienvenido"}
                </p>

                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                  Retirar WLD
                </h1>
              </div>

              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={monedaEnviarImg.src}
                  alt="WLD"
                  width={30}
                  height={30}
                />
              </div>

            </div>

          </div>

          {/* SALDO */}
          <div className="mx-6 mb-6 rounded-2xl bg-gray-900 px-5 py-4 text-white">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Saldo disponible
                </p>

                <p className="text-3xl font-bold mt-1">
                  {saldoDisponible.toLocaleString(
                    "es-CO",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                  <span className="text-lg text-gray-400 ml-2">
                    WLD
                  </span>
                </p>
              </div>

              <Image
                src={monedaEnviarImg.src}
                alt="WLD"
                width={42}
                height={42}
              />

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Si no ves tus fondos, presiona el botón de inicio.
            </p>

          </div>

          {/* FORMULARIO */}
          <div className="px-6 pb-6">

            {/* WLD */}
            <div className="mb-5">

              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="moneda_a_enviar"
                  className="text-sm font-semibold text-gray-700"
                >
                  Quiero retirar
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setCantidadWLD(saldoDisponible)
                  }
                  className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition"
                >
                  Retiro máximo
                </button>
              </div>

              <div
                className={`flex items-center rounded-2xl border px-4 py-3 transition ${
                  fondosInsuficientes
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white"
                }`}
              >

                <Image
                  src={monedaEnviarImg.src}
                  alt="WLD"
                  width={32}
                  height={32}
                  className="mr-3"
                />

                <input
                  type="number"
                  step="0.1"
                  id="moneda_a_enviar"
                  value={cantidadWLD || ""}
                  onChange={(e) => {
                    const value =
                      parseFloat(e.target.value) || 0;

                    setCantidadWLD(value);
                    setErrorMessage(null);
                  }}
                  placeholder="0.0"
                  className="w-full bg-transparent outline-none text-2xl font-bold text-gray-900"
                />

                <span className="font-bold text-gray-500">
                  WLD
                </span>

              </div>

              {fondosInsuficientes && (
                <p className="text-red-500 text-sm mt-2">
                  ⚠️ Fondos insuficientes
                </p>
              )}

            </div>

            {/* FLECHA */}
            <div className="flex justify-center -my-1 mb-4">
              <div className="h-9 w-9 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center text-gray-500">
                ↓
              </div>
            </div>

            {/* COP */}
            <div className="mb-5">

              <label
                htmlFor="dinero_a_recibir"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Recibirás aproximadamente
              </label>

              <div className="flex items-center rounded-2xl border border-green-200 bg-green-50 px-4 py-4">

                <Image
                  src={dineroRecibirImg.src}
                  alt="COP"
                  width={32}
                  height={32}
                  className="mr-3"
                />

                <input
                  type="text"
                  id="dinero_a_recibir"
                  value={dineroARecibir || ""}
                  placeholder="0"
                  readOnly
                  className="w-full bg-transparent outline-none text-2xl font-bold text-gray-900"
                />

                <span className="font-bold text-green-700">
                  COP
                </span>

              </div>

            </div>

            {/* MÉTODO DE PAGO */}
            <div className="mb-5">

              <label
                htmlFor="metodo-pago"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Método de pago
              </label>

              <select
                id="metodo-pago"
                value={metodoPago}
                onChange={(e) => {
                  const selected = e.target.value;

                  if (
                    cantidadWLD < 1 &&
                    selected !== "llave"
                  ) {
                    setMetodoPago("");
                    return;
                  }

                  setErrorMessage(null);
                  setMetodoPago(selected);
                }}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 font-semibold outline-none focus:border-blue-500 focus:bg-white transition"
              >

                <option value="">
                  Selecciona un método
                </option>

                <option
                  value="nequi"
                  disabled={cantidadWLD < 1}
                >
                  Nequi
                </option>

                <option
                  value="daviplata"
                  disabled={cantidadWLD < 1}
                >
                  Daviplata
                </option>

                <option
                  value="bancolombia"
                  disabled={cantidadWLD < 1}
                >
                  Bancolombia
                </option>

                <option value="llave">
                  Llaves Bre-B
                </option>

              </select>

              {cantidadWLD < 1 && (
                <p className="text-xs text-gray-500 mt-2">
                  Para retirar a bancos necesitas ingresar
                  al menos 1 WLD.
                </p>
              )}

            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-600">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* BOTÓN */}
            <button
              onClick={() =>
                redirigirSegunMetodoPago(
                  setErrorMessage,
                  {
                    cantidadWLD,
                    metodoPago,
                    dineroARecibir,
                  }
                )
              }
              type="button"
              disabled={fondosInsuficientes}
              className={`w-full rounded-2xl py-4 text-lg font-bold transition-all ${
                fondosInsuficientes
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99] shadow-lg"
              }`}
            >
              Continuar
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Revisa los datos antes de continuar
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}