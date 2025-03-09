"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Transaccion {
    id: number;
    moneda_a_enviar: number;
    dinero_a_recibir: number;
    reference: string;
    transaction_status: string;
    }

    const HistorialTransacciones = () => {
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransacciones = async () => {
        const walletAddress = localStorage.getItem("walletAddress");

        if (!walletAddress) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("transacciones")
            .select("id, moneda_a_enviar, dinero_a_recibir, reference, transaction_status, fecha")
            .or("transaction_status.ilike.%CONFIRMADO%, transaction_status.ilike.%pending%, transaction_status.ilike.%DEVUELTO%, transaction_status.ilike.%NO COINCIDE%")
            .eq("from_wallet_address", walletAddress)
            .order("fecha", { ascending: false });


        if (!error) setTransacciones(data as Transaccion[]);
        setLoading(false);
        };

        fetchTransacciones();
    }, []);

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
                    <th className="border p-1">Moneda</th>
                    <th className="border p-1">Recibido</th>
                    <th className="border p-1">Referencia</th>
                    <th className="border p-1">Estado</th>
                </tr>
                </thead>
                <tbody>
                {transacciones.map((trx) => (
                    <tr key={trx.id} className="border">
                    <td className="border p-1">{trx.id}</td>
                    <td className="border p-1">{Number(trx.moneda_a_enviar).toFixed(2)}</td>
                    <td className="border p-1">{Number(trx.dinero_a_recibir).toFixed(2)}</td>
                    <td className="border p-1 relative">
                        <div className="group inline-block">
                            {/* Mostrar solo los 4 primeros y últimos caracteres */}
                            <span>{trx.reference.slice(0, 4)}...{trx.reference.slice(-4)}</span>

                            {/* Tooltip con la referencia completa */}
                            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {trx.reference}
                            </span>
                        </div>
                    </td>
                    <td className={`border p-1 font-bold ${getStatusColor(trx.transaction_status)}`}>
                        {trx.transaction_status}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
    };

    const getStatusColor = (status: string) => {
        switch (status.trim()) { // Elimina espacios antes y después del estado
            case "CONFIRMADO":
                return "text-green-600";
            case "pending":
                return "text-yellow-600";
            case "DEVUELTO":
                return "text-red-600";
            case "NO COINCIDE":
                return "text-gray-600";
            default:
                return "";
        }
    };
    

export default HistorialTransacciones;