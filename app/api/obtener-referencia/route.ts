import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const wallet = searchParams.get("wallet");

        if (!wallet) {
            return NextResponse.json({ error: "Wallet address no proporcionada" }, { status: 400 });
        }

        // Obtener la última transacción del usuario
        const { data, error } = await supabase
            .from("transacciones")
            .select("id")
            .eq("from_wallet_address", wallet)
            .order("fecha", { ascending: false }) // ✅ Usamos "fecha" en lugar de "created_at"
            .limit(1);


        console.log("Datos obtenidos de Supabase:", data);
        console.log("Error de Supabase:", error);

        if (error || !data || data.length === 0) {
            return NextResponse.json({ error: "No se encontró una transacción reciente" }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("Error en /api/obtener-referencia:", err);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}