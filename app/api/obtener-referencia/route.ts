import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET() {
    const { data, error } = await supabase
        .from("reference")
        .select("uuid")
        .order("created_at", { ascending: false }) // Ordenar por fecha (el más reciente primero)
        .limit(1) // Obtener solo el último UUID

        if (error || !data || data.length === 0) {
        return NextResponse.json({ error: "No disponible" }, { status: 404 });
        }

        return NextResponse.json({ id: data[0].uuid });
    }





