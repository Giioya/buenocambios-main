"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface DatosUsuario {
    nombreCompleto: string;
    telefonoNequi: string;
    cedula: string;
    tipoCuenta: string;
    monedaAEnviar: string;
    dineroARecibir: string;
    metodoPago: string;
    numeroContacto: string;
}

const PagoExitoso = () => {
    const router = useRouter();

    const [codigoReferencia, setCodigoReferencia] =
        useState<string>("Cargando...");

    const [wallet, setWallet] = useState<string | null>(null);

    const [datosUsuario, setDatosUsuario] =
        useState<DatosUsuario>({
            nombreCompleto: "",
            telefonoNequi: "",
            cedula: "",
            tipoCuenta: "",
            monedaAEnviar: "",
            dineroARecibir: "",
            metodoPago: "",
            numeroContacto: "",
        });

    // Obtener wallet
    useEffect(() => {
        const storedWallet =
            localStorage.getItem("walletAddress");

        console.log(
            "🔍 Wallet obtenida en PagoExitoso:",
            storedWallet
        );

        if (!storedWallet) {
            console.error(
                "❌ No se encontró la billetera en localStorage"
            );

            setCodigoReferencia("No disponible");
            return;
        }

        setWallet(storedWallet);
    }, []);

    // Obtener referencia de la transacción
    useEffect(() => {
        if (!wallet) return;

        const obtenerReferencia = async () => {
            try {
                console.log(
                    `🔍 Solicitando referencia con wallet: ${wallet}`
                );

                const response = await fetch(
                    `/api/obtener-referencia?wallet=${encodeURIComponent(
                        wallet
                    )}`
                );

                console.log(
                    "📩 Respuesta recibida:",
                    response
                );

                if (!response.ok) {
                    const errorText = await response.text();

                    throw new Error(
                        `Error HTTP: ${response.status} - ${errorText}`
                    );
                }

                const data = await response.json();

                console.log(
                    "📦 Datos recibidos:",
                    data
                );

                if (
                    Array.isArray(data) &&
                    data.length > 0
                ) {
                    setCodigoReferencia(
                        data[0].id?.toString() ||
                        "No disponible"
                    );
                } else {
                    setCodigoReferencia("No disponible");
                }
            } catch (error) {
                console.error(
                    "⚠️ Error al obtener la referencia:",
                    error
                );

                setCodigoReferencia("No disponible");
            }
        };

        obtenerReferencia();
    }, [wallet]);

    // Cargar información de la transacción
    useEffect(() => {
        setDatosUsuario({
            nombreCompleto:
                localStorage.getItem("nombre_completo") ||
                "N/A",

            telefonoNequi:
                localStorage.getItem("telefono_nequi") ||
                "N/A",

            cedula:
                localStorage.getItem("cedula") ||
                "N/A",

            tipoCuenta:
                localStorage.getItem("tipo_cuenta") ||
                "N/A",

            monedaAEnviar:
                localStorage.getItem("moneda_a_enviar") ||
                "N/A",

            dineroARecibir:
                localStorage.getItem("dinero_a_recibir") ||
                "N/A",

            metodoPago:
                localStorage.getItem("metodo-pago") ||
                "N/A",

            numeroContacto:
                localStorage.getItem("numero-contacto") ||
                "N/A",
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#F7F9F5] px-4 py-6">

            {/* CONTENEDOR */}
            <div className="mx-auto w-full max-w-xl">

                {/* TARJETA PRINCIPAL */}
                <div className="rounded-3xl bg-white shadow-xl border border-[#D7E8C5] overflow-hidden">

                    {/* ENCABEZADO */}
                    <div className="bg-[#589013] px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center overflow-hidden">

                                <img
                                    src="/images/carga_buenocambios.jpg"
                                    alt="BuenoCambios"
                                    className="h-9 w-9 object-contain rounded-full"
                                />

                            </div>

                            <div>

                                <p className="text-sm text-[#D7E8C5]">
                                    BuenoCambios
                                </p>

                                <h1 className="text-lg font-bold text-white">
                                    Confirmación de retiro
                                </h1>

                            </div>

                        </div>

                    </div>


                    {/* ÉXITO */}
                    <div className="px-6 pt-8 text-center">

                        <div className="mx-auto h-20 w-20 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">

                            <CheckCircle
                                className="h-14 w-14 text-[#589013]"
                                strokeWidth={2}
                            />

                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            ¡Retiro exitoso!
                        </h1>

                        <p className="mt-3 text-sm leading-relaxed text-gray-500">

                            Tu solicitud de retiro fue registrada
                            correctamente.

                            <br />

                            El dinero llegará entre{" "}
                            <strong className="text-gray-700">
                                10 y 120 minutos
                            </strong>{" "}
                            a tu cuenta.

                        </p>

                    </div>


                    {/* ID DE TRANSACCIÓN */}
                    <div className="mx-6 mt-7 rounded-2xl bg-[#F1F7EA] border border-[#D7E8C5] p-5 text-center">

                        <p className="text-xs font-semibold uppercase tracking-wider text-[#3F6B0D]">
                            ID de transacción
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#589013] break-all">
                            {codigoReferencia}
                        </p>

                        <p className="mt-2 text-xs text-[#589013]">
                            Guarda este número como referencia de tu
                            operación.
                        </p>

                    </div>


                    {/* RESUMEN */}
                    <div className="mx-6 mt-5 rounded-2xl bg-[#3F6B0D] p-5 text-white">

                        <p className="text-sm text-[#D7E8C5]">
                            Resumen
                        </p>

                        <div className="flex items-end justify-between mt-2 gap-4">

                            <div>

                                <p className="text-3xl font-bold">
                                    {datosUsuario.monedaAEnviar ||
                                        "N/A"}

                                    <span className="ml-2 text-lg text-[#D7E8C5]">
                                        WLD
                                    </span>
                                </p>

                                <p className="text-sm text-[#D7E8C5] mt-1">
                                    Enviado
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-2xl font-bold text-white">
                                    ${datosUsuario.dineroARecibir ||
                                        "N/A"}
                                </p>

                                <p className="text-sm text-[#D7E8C5]">
                                    Recibirás
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* DETALLES */}
                    <div className="px-6 mt-7">

                        <div className="flex items-center gap-2 mb-4">

                            <div className="h-8 w-8 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">
                                📄
                            </div>

                            <h2 className="text-base font-bold text-gray-800">
                                Detalles de la transacción
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-[#D7E8C5] bg-[#F7F9F5] overflow-hidden">

                            {/* Nombre */}
                            <div className="px-4 py-3 border-b border-[#D7E8C5]">

                                <p className="text-xs text-gray-400">
                                    Nombre
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 break-words">
                                    {datosUsuario.nombreCompleto}
                                </p>

                            </div>


                            {/* Cuenta */}
                            <div className="px-4 py-3 border-b border-[#D7E8C5]">

                                <p className="text-xs text-gray-400">
                                    Cuenta o llave
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {datosUsuario.telefonoNequi}
                                </p>

                            </div>


                            {/* Cédula */}
                            <div className="grid grid-cols-2 border-b border-[#D7E8C5]">

                                <div className="px-4 py-3 border-r border-[#D7E8C5]">

                                    <p className="text-xs text-gray-400">
                                        Cédula
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900 break-all">
                                        {datosUsuario.cedula}
                                    </p>

                                </div>

                                <div className="px-4 py-3">

                                    <p className="text-xs text-gray-400">
                                        Tipo de cuenta
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {datosUsuario.tipoCuenta}
                                    </p>

                                </div>

                            </div>


                            {/* Método */}
                            <div className="px-4 py-3">

                                <p className="text-xs text-gray-400">
                                    Método de pago
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {datosUsuario.metodoPago}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* AVISO SOPORTE */}
                    <div className="mx-6 mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">

                        <div className="flex gap-3">

                            <div className="text-lg">
                                💬
                            </div>

                            <div>

                                <p className="font-bold text-red-700 text-sm">
                                    ¿Tuviste algún inconveniente?
                                </p>

                                <p className="mt-1 text-sm leading-relaxed text-red-600">
                                    Si el pago no llega dentro del tiempo
                                    indicado, contáctanos con tu ID de
                                    transacción para poder ayudarte.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* BOTÓN */}
                    <div className="px-6 pt-6 pb-6">

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="w-full rounded-2xl bg-[#589013] py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#3F6B0D] active:scale-[0.99]"
                        >
                            Listo
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            Gracias por utilizar BuenoCambios.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PagoExitoso;