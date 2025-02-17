// app/api/obtener-referencia/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookies = req.cookies;
    const reference = cookies.get("payment-nonce");

    if (reference) {
        return NextResponse.json({ referencia: reference });
    } else {
        return NextResponse.json({ referencia: "No disponible" });
    }
}




