"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(
    supabaseUrl,
    supabaseKey
    );

    interface Transaccion {
    id: number;
    moneda_a_enviar: number;
    dinero_a_recibir: string;
    transaction_status: string;
    fecha: string;
    }

    /* =========================
    HELPERS
    ========================= */

    const normalizeStatus = (status: string) =>
    (status || "").trim().toUpperCase();

    const ajustarHoraBogota = (fechaUTC: string) => {
    const fecha = new Date(fechaUTC);
    fecha.setHours(fecha.getHours() - 5);
    return fecha;
    };

    function getStatusLabel(status: string) {
    switch (normalizeStatus(status)) {
        case "MINED":
        return "Pendiente";

        case "FAILED":
        return "Fallido";

        case "CONFIRMADO":
        return "Confirmado";

        case "NO COINCIDE":
        return "No coincide";

        case "DEVUELTO":
        return "Fallido";

        case "PENDING":
        return "Pendiente";

        case "EN REVISIÓN":
        return "En revisión";

        default:
        return "Desconocido";
    }
    }

    const getStatusColor = (status: string) => {
    switch (normalizeStatus(status)) {
        case "CONFIRMADO":
        return "text-green-700 bg-green-50 border-green-200";

        case "PENDING":
        case "MINED":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";

        case "FAILED":
        case "DEVUELTO":
        return "text-red-700 bg-red-50 border-red-200";

        case "NO COINCIDE":
        return "text-gray-700 bg-gray-100 border-gray-200";

        case "EN REVISIÓN":
        return "text-orange-700 bg-orange-50 border-orange-200";

        default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
    };

    const getStatusMessage = (status: string) => {
    switch (normalizeStatus(status)) {
        case "CONFIRMADO":
        return "Tu transacción se ha completado con éxito.";

        case "PENDING":
        case "MINED":
        return "Tu transacción está en proceso.";

        case "NO COINCIDE":
        return "Tus datos no coinciden con la cuenta bancaria.";

        case "DEVUELTO":
        case "FAILED":
        return "La transacción fue revertida.";

        case "EN REVISIÓN":
        return "La transacción está en revisión.";

        default:
        return "";
    }
    };

    const formatFecha = (fecha: string) => {
    return ajustarHoraBogota(fecha).toLocaleString(
        "es-CO",
        {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        }
    );
    };

    /* =========================
    COMPONENTE
    ========================= */

    const HistorialTransacciones = () => {
    const [transacciones, setTransacciones] =
        useState<Transaccion[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [selectedId, setSelectedId] =
        useState<number | null>(null);

    useEffect(() => {
        const fetchTransacciones = async () => {
        const walletAddress =
            localStorage.getItem("walletAddress");

        if (!walletAddress) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("transacciones")
            .select(
            "id, moneda_a_enviar, dinero_a_recibir, transaction_status, fecha"
            )
            .or(
            "transaction_status.ilike.%CONFIRMADO%, transaction_status.ilike.%pending%, transaction_status.ilike.%mined%, transaction_status.ilike.%failed%, transaction_status.ilike.%DEVUELTO%, transaction_status.ilike.%NO COINCIDE%, transaction_status.ilike.%EN REVISIÓN%"
            )
            .eq(
            "from_wallet_address",
            walletAddress
            )
            .order("fecha", {
            ascending: false,
            });

        if (!error && data) {
            setTransacciones(
            data as Transaccion[]
            );
        }

        if (error) {
            console.error(
            "Error obteniendo historial:",
            error
            );
        }

        setLoading(false);
        };

        fetchTransacciones();
    }, []);

    /* =========================
        LOADING
    ========================== */

    if (loading) {
        return (
        <div className="min-h-screen bg-gray-50 px-4 pt-24">

            <div className="mx-auto max-w-xl">

            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8 text-center">

                <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin" />

                <p className="text-sm font-medium text-gray-500">
                Cargando historial...
                </p>

            </div>

            </div>

        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">

        <div className="mx-auto w-full max-w-xl">

            {/* =========================
                ENCABEZADO
            ========================== */}

            <div className="mb-6">

            <p className="text-sm text-gray-500">
                Tus operaciones
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
                Historial
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                Consulta el estado y los detalles de tus
                retiros anteriores.
            </p>

            </div>


            {/* =========================
                SIN TRANSACCIONES
            ========================== */}

            {transacciones.length === 0 ? (

            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8 text-center">

                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                📋
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                No hay transacciones
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                Todavía no tienes retiros registrados
                en tu historial.
                </p>

            </div>

            ) : (

            <>
                {/* =========================
                    CONTADOR
                ========================== */}

                <div className="mb-4 flex items-center justify-between">

                <div className="rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white">
                    {transacciones.length}{" "}
                    {transacciones.length === 1
                    ? "transacción"
                    : "transacciones"}
                </div>

                </div>


                {/* =========================
                    TARJETAS MÓVILES
                ========================== */}

                <div className="space-y-4">

                {transacciones.map((trx) => {

                    const statusColor =
                    getStatusColor(
                        trx.transaction_status
                    );

                    const statusLabel =
                    getStatusLabel(
                        trx.transaction_status
                    );

                    const isSelected =
                    selectedId === trx.id;

                    return (
                    <div
                        key={trx.id}
                        className="rounded-3xl bg-white border border-gray-100 shadow-lg overflow-hidden"
                    >

                        {/* CABECERA */}
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                        <div>

                            <p className="text-xs text-gray-400">
                            ID de transacción
                            </p>

                            <p className="mt-1 text-lg font-bold text-gray-900">
                            #{trx.id}
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                            setSelectedId(
                                isSelected
                                ? null
                                : trx.id
                            )
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${statusColor}`}
                        >
                            {statusLabel}
                        </button>

                        </div>


                        {/* RESUMEN */}
                        <div className="p-5">

                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-2xl bg-gray-50 p-4">

                            <p className="text-xs text-gray-400">
                                WLD enviado
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {Number(
                                trx.moneda_a_enviar
                                ).toFixed(2)}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                WLD
                            </p>

                            </div>


                            <div className="rounded-2xl bg-green-50 p-4">

                            <p className="text-xs text-green-600">
                                Recibirás
                            </p>

                            <p className="mt-1 text-xl font-bold text-green-700">
                                ${trx.dinero_a_recibir}
                            </p>

                            <p className="text-xs text-green-600 mt-1">
                                COP
                            </p>

                            </div>

                        </div>


                        {/* FECHA */}
                        <div className="mt-4 flex items-center justify-between">

                            <div>

                            <p className="text-xs text-gray-400">
                                Fecha
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {formatFecha(
                                trx.fecha
                                )}
                            </p>

                            </div>

                            <span className="text-gray-300 text-xl">
                            →
                            </span>

                        </div>


                        {/* MENSAJE DE ESTADO */}
                        {isSelected && (
                            <div className="mt-4 rounded-2xl bg-gray-900 p-4 text-sm text-white">

                            <p className="font-semibold mb-1">
                                Estado de la transacción
                            </p>

                            <p className="text-gray-300 leading-relaxed">
                                {getStatusMessage(
                                trx.transaction_status
                                )}
                            </p>

                            </div>
                        )}

                        </div>

                    </div>
                    );
                })}

                </div>


                {/* =========================
                    TABLA DESKTOP
                ========================== */}

                <div className="hidden lg:block mt-6">

                <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">

                    <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-900 text-white">

                        <tr>

                            <th className="px-4 py-4 text-left">
                            ID
                            </th>

                            <th className="px-4 py-4 text-left">
                            WLD
                            </th>

                            <th className="px-4 py-4 text-left">
                            A recibir
                            </th>

                            <th className="px-4 py-4 text-left">
                            Estado
                            </th>

                            <th className="px-4 py-4 text-left">
                            Fecha
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {transacciones.map(
                            (trx) => (
                            <tr
                                key={trx.id}
                                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                            >

                                <td className="px-4 py-4 font-bold text-gray-900">
                                #{trx.id}
                                </td>

                                <td className="px-4 py-4">
                                {Number(
                                    trx.moneda_a_enviar
                                ).toFixed(2)}
                                </td>

                                <td className="px-4 py-4 font-semibold text-green-700">
                                ${trx.dinero_a_recibir}
                                </td>

                                <td className="px-4 py-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                    setSelectedId(
                                        selectedId ===
                                        trx.id
                                        ? null
                                        : trx.id
                                    )
                                    }
                                    className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusColor(
                                    trx.transaction_status
                                    )}`}
                                >
                                    {getStatusLabel(
                                    trx.transaction_status
                                    )}
                                </button>

                                </td>

                                <td className="px-4 py-4 text-gray-500">
                                {formatFecha(
                                    trx.fecha
                                )}
                                </td>

                            </tr>
                            )
                        )}

                        </tbody>

                    </table>

                    </div>

                </div>

                </div>

            </>
            )}

        </div>

        </div>
    );
    };

    export default HistorialTransacciones;