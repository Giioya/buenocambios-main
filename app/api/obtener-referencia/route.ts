import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Referencia {
    id: number;
    referencia: string;
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("transacciones") // Reemplaza con el nombre real de tu tabla
            .select("id, reference") as { data: Referencia[] | null; error: any };

        if (error || !data) {
            return NextResponse.json({ error: error?.message || "No se encontraron datos" }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}