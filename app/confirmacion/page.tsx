"use client";

import { useEffect, useState } from "react";
import { PayBlock } from "@/components/Pay";
import { guardarEnBaseDeDatos } from "@/app/lib/guardarDatos";

export default function Confirmacion() {
    const [datos, setDatos] = useState({
        nombreCompleto: "",
        telefonoNequi: "",
        cedula: "",
        tipoCuenta: "",
        monedaAEnviar: "",
        dineroARecibir: "",
        metodoPago: "",
        correo: "",
        fromWalletAddress: "",
        tipoDocumento: "",
    });

    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [transaccionConfirmada, setTransaccionConfirmada] =
        useState(false);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [transaccionId, setTransaccionId] =
        useState<string | null>(null);

    useEffect(() => {
        const nombreCompleto =
            localStorage.getItem("nombre_completo") || "";

        const telefonoNequi =
            localStorage.getItem("telefono_nequi") || "";

        const cedula =
            localStorage.getItem("cedula") || "";

        const tipoCuenta =
            localStorage.getItem("tipo_cuenta") || "";

        const monedaAEnviar =
            localStorage.getItem("moneda_a_enviar") || "";

        const dineroARecibir =
            localStorage.getItem("dinero_a_recibir") || "";

        const metodoPago =
            localStorage.getItem("metodo-pago") || "";

        const correo =
            localStorage.getItem("correo") || "";

        const fromWalletAddress =
            localStorage.getItem("walletAddress") || "";

        const tipoDocumento =
            localStorage.getItem("tipoDocumento") || "";

        setDatos({
            nombreCompleto,
            telefonoNequi,
            cedula,
            tipoCuenta,
            monedaAEnviar,
            dineroARecibir,
            metodoPago,
            correo,
            fromWalletAddress,
            tipoDocumento,
        });
    }, []);

    const irAVistaNequi = () => {
        window.history.back();
    };

    const confirmarTransaccion = async () => {
        setCargando(true);
        setError(false);
        setTransaccionConfirmada(false);

        try {
            console.log(
                "📤 Enviando datos a Supabase:",
                datos
            );

            const respuesta =
                await guardarEnBaseDeDatos(datos);

            if (!respuesta.success) {
                throw new Error(respuesta.error);
            }

            setTransaccionId(respuesta.id);
            setTransaccionConfirmada(true);

        } catch (error) {
            console.error(
                "❌ Error en la transacción:",
                error
            );

            setError(true);
            setTransaccionConfirmada(false);

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9F5] px-4 py-6">

            {/* AVISO */}
            <div className="mx-auto w-full max-w-xl mb-5">

                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">

                    <div className="flex gap-3">

                        <div className="text-xl">
                            ⚠️
                        </div>

                        <div className="text-sm text-yellow-900">

                            <p className="font-bold mb-1">
                                Verifica tu información
                            </p>

                            <p className="leading-relaxed">
                                Revisa cuidadosamente los datos antes
                                de finalizar la transacción.
                            </p>

                            <p className="mt-2 leading-relaxed">
                                Si los datos no coinciden,{" "}
                                <strong>BuenoCambios</strong> no enviará
                                el pago hasta que te comuniques con
                                soporte.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* TARJETA PRINCIPAL */}
            <div className="mx-auto w-full max-w-xl">

                <div className="rounded-3xl bg-white shadow-xl border border-[#D7E8C5] overflow-hidden">

                    {/* ENCABEZADO */}
                    <div className="px-6 pt-6 pb-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-[#589013] font-medium">
                                    Último paso
                                </p>

                                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                                    Confirmar retiro
                                </h1>

                            </div>

                            <div className="h-12 w-12 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">

                                <span className="text-xl font-bold text-[#589013]">
                                    ✓
                                </span>

                            </div>

                        </div>

                        <p className="text-sm text-gray-500 mt-3">
                            Comprueba que toda la información sea
                            correcta antes de continuar.
                        </p>

                    </div>

                    {/* RESUMEN DEL RETIRO */}
                    <div className="mx-6 mb-5 rounded-2xl bg-[#3F6B0D] p-5 text-white">

                        <p className="text-sm text-[#D7E8C5]">
                            Resumen del retiro
                        </p>

                        <div className="flex items-end justify-between mt-2">

                            <div>

                                <p className="text-3xl font-bold">
                                    {datos.monedaAEnviar || "0"}

                                    <span className="text-lg text-[#D7E8C5] ml-2">
                                        WLD
                                    </span>
                                </p>

                                <p className="text-sm text-[#D7E8C5] mt-1">
                                    Cantidad a retirar
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-2xl font-bold text-white">
                                    ${datos.dineroARecibir || "0"}
                                </p>

                                <p className="text-sm text-[#D7E8C5]">
                                    COP a recibir
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* INFORMACIÓN PERSONAL */}
                    <div className="px-6">

                        <div className="flex items-center gap-2 mb-4">

                            <div className="h-8 w-8 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">
                                👤
                            </div>

                            <h2 className="text-base font-bold text-gray-800">
                                Datos del titular
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-[#D7E8C5] bg-[#F7F9F5] overflow-hidden">

                            <div className="px-4 py-3 border-b border-[#D7E8C5]">
                                <p className="text-xs text-gray-400">
                                    Nombre completo
                                </p>

                                <p className="font-semibold text-gray-900 mt-1 break-words">
                                    {datos.nombreCompleto || "N/A"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2">

                                <div className="px-4 py-3 border-b border-r border-[#D7E8C5]">
                                    <p className="text-xs text-gray-400">
                                        Documento
                                    </p>

                                    <p className="font-semibold text-gray-900 mt-1">
                                        {datos.tipoDocumento || "N/A"}
                                    </p>
                                </div>

                                <div className="px-4 py-3 border-b border-[#D7E8C5]">
                                    <p className="text-xs text-gray-400">
                                        Número
                                    </p>

                                    <p className="font-semibold text-gray-900 mt-1 break-all">
                                        {datos.cedula || "N/A"}
                                    </p>
                                </div>

                            </div>

                            <div className="px-4 py-3">
                                <p className="text-xs text-gray-400">
                                    Correo electrónico
                                </p>

                                <p className="font-semibold text-gray-900 mt-1 break-words">
                                    {datos.correo || "No proporcionado"}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* INFORMACIÓN DE PAGO */}
                    <div className="px-6 mt-6">

                        <div className="flex items-center gap-2 mb-4">

                            <div className="h-8 w-8 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">
                                💳
                            </div>

                            <h2 className="text-base font-bold text-gray-800">
                                Datos del pago
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-[#D7E8C5] bg-[#F7F9F5] overflow-hidden">

                            <div className="px-4 py-3 border-b border-[#D7E8C5] flex justify-between gap-4">

                                <span className="text-sm text-gray-500">
                                    Método de pago
                                </span>

                                <span className="font-semibold text-gray-900 text-right">
                                    {datos.metodoPago || "N/A"}
                                </span>

                            </div>

                            <div className="px-4 py-3 flex justify-between gap-4">

                                <span className="text-sm text-gray-500">
                                    Cuenta / llave
                                </span>

                                <span className="font-semibold text-gray-900 text-right">
                                    {datos.telefonoNequi || "N/A"}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* TÉRMINOS */}
                    <div className="px-6 mt-6">

                        <label className="flex items-start gap-3 cursor-pointer">

                            <input
                                type="checkbox"
                                checked={aceptaTerminos}
                                onChange={(e) =>
                                    setAceptaTerminos(
                                        e.target.checked
                                    )
                                }
                                className="mt-1 h-5 w-5 rounded border-gray-300 accent-[#589013] focus:ring-[#589013]"
                            />

                            <span className="text-sm text-gray-600 leading-relaxed">

                                Acepto los{" "}

                                <a
                                    href="/Terminos"
                                    className="font-semibold text-[#589013] hover:text-[#3F6B0D] underline"
                                >
                                    Términos y condiciones
                                </a>

                                {" "}de BuenoCambios.

                            </span>

                        </label>

                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                            ⚠️ Ocurrió un error al procesar la
                            transacción. Intenta nuevamente.
                        </div>
                    )}

                    {/* BOTONES */}
                    <div className="px-6 pt-6 pb-6">

                        {!transaccionConfirmada && (

                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={irAVistaNequi}
                                    disabled={cargando}
                                    className="flex-1 rounded-2xl border border-[#D7E8C5] bg-white py-4 text-base font-bold text-gray-700 transition hover:bg-[#F7F9F5] active:scale-[0.99] disabled:opacity-50"
                                >
                                    Atrás
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmarTransaccion}
                                    disabled={
                                        !aceptaTerminos ||
                                        cargando
                                    }
                                    className={`flex-[1.5] rounded-2xl py-4 text-base font-bold transition-all ${
                                        aceptaTerminos && !cargando
                                            ? "bg-[#589013] text-white hover:bg-[#3F6B0D] active:scale-[0.99] shadow-lg"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    {cargando
                                        ? "Procesando..."
                                        : "Finalizar retiro"}
                                </button>

                            </div>

                        )}

                        {/* PAGO */}
                        {transaccionConfirmada &&
                            transaccionId && (

                                <div className="rounded-2xl border border-[#D7E8C5] bg-[#F1F7EA] p-5">

                                    <div className="flex items-center gap-3 mb-4">

                                        <div className="h-10 w-10 rounded-full bg-[#589013] text-white flex items-center justify-center">
                                            ✓
                                        </div>

                                        <div>

                                            <p className="font-bold text-[#3F6B0D]">
                                                Solicitud creada correctamente
                                            </p>

                                            <p className="text-xs text-[#589013] mt-1">
                                                Continúa con el siguiente paso.
                                            </p>

                                        </div>

                                    </div>

                                    <PayBlock
                                        transaccionId={transaccionId}
                                    />

                                </div>

                            )}

                        {!transaccionConfirmada && (
                            <p className="text-center text-xs text-gray-400 mt-4">
                                Verifica todos los datos antes de
                                finalizar el retiro.
                            </p>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}