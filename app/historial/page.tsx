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

const ajustarHoraBogota = (fechaUTC: string) => {
    const fecha = new Date(fechaUTC);
    fecha.setHours(fecha.getHours() - 5); // Restar 5 horas para UTC -5
    return fecha;
};

const HistorialTransacciones = () => {
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        const fetchTransacciones = async () => {
            const walletAddress = localStorage.getItem("walletAddress");

            if (!walletAddress) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("transacciones")
                .select("id, moneda_a_enviar, dinero_a_recibir, transaction_status, fecha")
                .or("transaction_status.ilike.%CONFIRMADO%, transaction_status.ilike.%pending%, transaction_status.ilike.%DEVUELTO%, transaction_status.ilike.%NO COINCIDE%, transaction_status.ilike.%EN REVISIÓN%")
                .eq("from_wallet_address", walletAddress)
                .order("fecha", { ascending: false });

            if (!error) setTransacciones(data as Transaccion[]);
            setLoading(false);
        };

        fetchTransacciones();
    }, []);

    // Cerrar el tooltip solo si se hace clic fuera del estado
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".estado-tooltip")) {
                setSelectedId(null);
                setTooltipPos(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleStatusClick = (e: React.MouseEvent<HTMLTableCellElement>, id: number) => {
        e.stopPropagation(); // Evita que se cierre inmediatamente
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const tooltipWidth = 200; // Ancho estimado del tooltip
        const tooltipHeight = 60; // Alto estimado del tooltip

        let left = rect.left + rect.width / 2 - tooltipWidth / 2;
        let top = rect.top - tooltipHeight - 10; // Aparece arriba del estado

        // Ajustar si se sale de la pantalla
        if (left < 10) left = 10;
        if (left + tooltipWidth > screenWidth - 10) left = screenWidth - tooltipWidth - 10;
        if (top < 10) top = rect.bottom + 10; // Si no cabe arriba, lo muestra abajo

        setSelectedId(selectedId === id ? null : id);
        setTooltipPos({ top, left });
    };

    if (loading) return <p className="text-center mt-10">Cargando historial...</p>;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center bg-gray-50 p-2 pt-32 overflow-hidden">
            <h2 className="text-lg font-bold mb-2">Historial de Transacciones</h2>
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
                                    <td className="border p-1 cursor-pointer text-blue-500 hover:underline">
                                        {trx.id}
                                    </td>
                                    <td className="border p-1">{Number(trx.moneda_a_enviar).toFixed(2)}</td>
                                    <td className="border p-1">${trx.dinero_a_recibir}</td>
                                    <td 
                                        className={`border p-1 font-bold cursor-pointer estado-tooltip ${getStatusColor(trx.transaction_status)}`}
                                        onClick={(e) => handleStatusClick(e, trx.id)}
                                    >
                                        {trx.transaction_status}
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

            {/* Tooltip flotante */}
            {selectedId !== null && tooltipPos && (
                <div
                    className="fixed z-50 bg-gray-800 text-white text-xs rounded shadow-md px-4 py-3 text-center whitespace-pre-line"
                    style={{
                        top: tooltipPos.top,
                        left: tooltipPos.left,
                        maxWidth: "200px",
                    }}
                >
                    {getStatusMessage(transacciones.find(trx => trx.id === selectedId)?.transaction_status || "")}
                </div>
            )}
        </div>
    );
};

const getStatusColor = (status: string) => {
    switch (status.trim()) {
        case "CONFIRMADO":
            return "text-green-600";
        case "pending":
            return "text-yellow-600";
        case "DEVUELTO":
            return "text-red-600";
        case "NO COINCIDE":
            return "text-gray-600";
        case "EN REVISIÓN":
            return "text-red-800 underline semibold";
        default:
            return "";
    }
};

const getStatusMessage = (status: string) => {
    switch (status.trim()) {
        case "CONFIRMADO":
            return "Tu transacción\nse ha completado\ncon éxito.";
        case "pending":
            return "Tu transacción\nestá en proceso.\nPronto recibirás\nuna actualización.";
        case "NO COINCIDE":
            return "Tus datos no coinciden\ncon la cuenta bancaria.\nPor favor contacta\na soporte.";
        case "DEVUELTO":
            return "La transacción\nno pudo completarse.\nTus fondos han\nsido devueltos.";
        case "EN REVISIÓN":
            return "La transacción\nse encuentra en revisión.\ndebido al fallo del dia\n9 de septiembre.";
        default:
            return "";
    }
};

export default HistorialTransacciones;