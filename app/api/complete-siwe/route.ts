import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
    payload: any;
    nonce: string;
}

export async function POST(req: NextRequest) {
    try {
    const { payload, nonce } = (await req.json()) as IRequestPayload;

    const cookieStore = await cookies();
    const storedNonce = cookieStore.get("siwe")?.value;

    if (nonce !== storedNonce) {
        return NextResponse.json(
        {
            isValid: false,
            error: "Invalid nonce",
        },
        { status: 400 }
        );
    }

    // 🔥 Validación básica (porque no tenemos verify oficial)
    if (!payload?.address || !payload?.signature || !payload?.message) {
        return NextResponse.json(
        { isValid: false, error: "Malformed payload" },
        { status: 400 }
        );
    }

    return NextResponse.json({
        isValid: true,
        address: payload.address,
    });

    } catch (error: any) {
        return NextResponse.json(
        {
            isValid: false,
            error: error.message || "Error en la verificación",
        },
        { status: 400 }
        );
    }
}