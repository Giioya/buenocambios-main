"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    interface Transaccion {
    id: number;
    moneda_a_enviar: number;
    dinero_a_recibir: string;
    transaction_status: string;
    fecha: string;
    }

    /* 🔥 NORMALIZADOR GLOBAL */
    const normalizeStatus = (status: string) =>
    (status || "").trim().toUpperCase();

    const ajustarHoraBogota = (fechaUTC: string) => {
    const fecha = new Date(fechaUTC);
    fecha.setHours(fecha.getHours() - 5);
    return fecha;
    };

    /* ===================== COMPONENTE ===================== */

    const HistorialTransacciones = () => {
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [tooltipPos, setTooltipPos] =
        useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        const fetchTransacciones = async () => {
        const walletAddress = localStorage.getItem("walletAddress");

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
            .eq("from_wallet_address", walletAddress)
            .order("fecha", { ascending: false });

        if (!error) setTransacciones(data as Transaccion[]);
        setLoading(false);
        };

        fetchTransacciones();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".estado-tooltip")) {
            setSelectedId(null);
            setTooltipPos(null);
        }
        };

        document.addEventListener("click", handleClickOutside);
        return () =>
        document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleStatusClick = (
        e: React.MouseEvent<HTMLTableCellElement>,
        id: number
    ) => {
        e.stopPropagation();

        const rect = (e.target as HTMLElement).getBoundingClientRect();

        setSelectedId(selectedId === id ? null : id);
        setTooltipPos({
        top: rect.top - 60,
        left: rect.left,
        });
    };

    /* ===================== HELPERS ===================== */

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
            return "text-green-600";
        case "PENDING":
            return "text-yellow-600";
        case "MINED":
            return "text-yellow-600";
        case "FAILED":
        case "DEVUELTO":
            return "text-red-600";
        case "NO COINCIDE":
            return "text-gray-600";
        case "EN REVISIÓN":
            return "text-red-800 underline font-semibold";
        default:
            return "";
        }
    };

    const getStatusMessage = (status: string) => {
        switch (normalizeStatus(status)) {
        case "CONFIRMADO":
            return "Tu transacción\nse ha completado\ncon éxito.";
        case "PENDING":
            return "Tu transacción\nestá en proceso.";
        case "MINED":
            return "Tu transacción\nestá en proceso.";
        case "NO COINCIDE":
            return "Tus datos no coinciden\ncon la cuenta bancaria.";
        case "DEVUELTO":
            return "La transacción fue revertida.";
        case "FAILED":
            return "La transacción fue revertida.";
        case "EN REVISIÓN":
            return "La transacción está en revisión.";
        default:
            return "";
        }
    };

    /* ===================== UI ===================== */

    if (loading) return <p className="text-center mt-10">Cargando historial...</p>;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center bg-gray-50 p-2 pt-32 overflow-hidden">

        <h2 className="text-lg font-bold mb-2">
            Historial de Transacciones
        </h2>

        {transacciones.length === 0 ? (
            <p>No tienes transacciones registradas.</p>
        ) : (
            <div className="w-full h-full max-w-5xl overflow-y-auto">
            <table className="w-full border border-gray-300 text-xs text-center">
                <thead className="bg-gray-200 sticky top-0">
                <tr>
                    <th className="border p-1">ID</th>
                    <th className="border p-1">WLD</th>
                    <th className="border p-1">A recibir</th>
                    <th className="border p-1">Estado</th>
                    <th className="border p-1">Fecha</th>
                </tr>
                </thead>

                <tbody>
                {transacciones.map((trx) => (
                    <tr key={trx.id} className="border">

                    <td className="border p-1 text-blue-500">
                        {trx.id}
                    </td>

                    <td className="border p-1">
                        {Number(trx.moneda_a_enviar).toFixed(2)}
                    </td>

                    <td className="border p-1">
                        ${trx.dinero_a_recibir}
                    </td>

                    <td
                        className={`border p-1 font-bold cursor-pointer estado-tooltip ${getStatusColor(
                        trx.transaction_status
                        )}`}
                        onClick={(e) => handleStatusClick(e, trx.id)}
                    >
                        {getStatusLabel(trx.transaction_status)}
                    </td>

                    <td className="border p-1">
                        {ajustarHoraBogota(trx.fecha).toLocaleString("es-CO", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                        })}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {/* Tooltip */}
        {selectedId !== null && tooltipPos && (
            <div
            className="fixed z-50 bg-gray-800 text-white text-xs rounded shadow-md px-4 py-3 text-center whitespace-pre-line"
            style={{
                top: tooltipPos.top,
                left: tooltipPos.left,
                maxWidth: "200px",
            }}
            >
            {getStatusMessage(
                transacciones.find((t) => t.id === selectedId)
                ?.transaction_status || ""
            )}
            </div>
        )}
        </div>
    );
    };

    export default HistorialTransacciones;