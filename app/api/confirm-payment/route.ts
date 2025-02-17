import { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../lib/supabase';

// Función para parsear cookies
const parseCookies = (cookieHeader: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach((cookie) => {
            const [key, value] = cookie.split('=');
            cookies[key.trim()] = decodeURIComponent(value);
        });
    }
    return cookies;
};

interface IRequestPayload {
    payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { payload } = (await req.json()) as IRequestPayload;

        console.log("Datos recibidos en confirm-payment:", payload);

        // Obtener cookies de los headers
        const cookieHeader = req.headers.get("cookie") ?? undefined;
        const cookies = parseCookies(cookieHeader);

        const reference = cookies["payment-nonce"];

        console.log("Referencia en la cookie:", reference);
        console.log("Referencia en el payload:", payload.reference);

        // Recuperar datos de las cookies
        const nombre_completo = cookies["nombre_completo"] || null;
        const telefono_nequi = cookies["telefono_nequi"] || null;
        const cedula = cookies["cedula"] || null;
        const tipo_cuenta = cookies["tipo_cuenta"] || null;
        const moneda_a_enviar = cookies["moneda_a_enviar"] || null;
        const dinero_a_recibir = cookies["dinero_a_recibir"] || null;
        const metodo_pago = cookies["metodo_pago"] || null;

        if (!reference) {
            console.log("No se encontró la referencia en las cookies.");
            return NextResponse.json({ success: false, message: "Referencia no encontrada" });
        }

        // Verificamos que la transacción sea la misma
        if (payload.reference === reference) {
            const response = await fetch(
                `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                console.error("Error al obtener datos de Worldcoin:", response.statusText);
                return NextResponse.json({ success: false, message: "Error en la API de Worldcoin" });
            }

            const transaction = await response.json();
            console.log("Respuesta de la API de Worldcoin:", transaction);

            // Si la transacción no falló, guardamos los detalles en Supabase
            if (transaction.reference == reference && transaction.status !== "failed") {
                const { data, error } = await supabase
                    .from('transacciones') // Nombre de la tabla en Supabase
                    .insert([{
                        nombre_completo,
                        telefono_nequi,
                        cedula,
                        tipo_cuenta,
                        moneda_a_enviar,
                        dinero_a_recibir,
                        metodo_pago,
                        transactionId: transaction.transaction_id,
                        transactionHash: transaction.transactionHash,
                        transactionStatus: transaction.status,
                        reference: transaction.reference,
                        miniappId: transaction.miniappId,
                        updatedAt: transaction.updatedAt,
                        network: transaction.network,
                        fromWalletAddress: transaction.fromWalletAddress,
                        recipientAddress: transaction.recipientAddress,
                        inputToken: transaction.inputToken,
                        inputTokenAmount: transaction.inputTokenAmount
                    }]);

                if (error) {
                    console.error('Error al guardar en Supabase:', error);
                    return NextResponse.json({ success: false, message: "Error al guardar en Supabase" });
                }

                console.log("Datos guardados en Supabase:", data);
                return NextResponse.json({ success: true, message: "Transacción exitosa" });
            } else {
                console.log("Transacción fallida o no válida.");
                return NextResponse.json({ success: false, message: "Transacción no válida o fallida" });
            }
        } else {
            console.log("Referencia no coincide.");
            return NextResponse.json({ success: false, message: "Referencia no coincide" });
        }
    } catch (error) {
        console.error("Error en confirm-payment:", error);
        return NextResponse.json({ success: false, message: "Error en el servidor" });
    }
}







