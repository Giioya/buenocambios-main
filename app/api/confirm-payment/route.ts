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

            // Obtiene la última transacción registrada de esa wallet
            const { data: lastTransaction, error: fetchError } = await supabase
                .from('transacciones')
                .select('id')
                .eq('from_wallet_address', transaction.fromWalletAddress)
                .order('fecha', { ascending: false })
                .limit(1)
                .single();

            if (fetchError || !lastTransaction) {
                console.error("No se encontró una transacción para actualizar:", fetchError);
                return NextResponse.json({ success: false, message: "No se encontró transacción para actualizar" });
            }

            // Si la transacción no falló, actualizamos los detalles en Supabase
            if (transaction.reference == reference && transaction.status !== "failed") {
                const { error } = await supabase
                    .from('transacciones')
                    .update({
                        transaction_id: transaction.transactionId,
                        transaction_hash: transaction.transactionHash,
                        transaction_status: transaction.transactionStatus,
                        reference: transaction.reference,
                        miniapp_id: transaction.miniappId,
                        updated_at: transaction.updatedAt,
                        network: transaction.network,
                        recipient_address: transaction.recipientAddress,
                        input_token: transaction.inputToken,
                        input_token_amount: transaction.inputTokenAmount
                    })
                    .eq('id', lastTransaction.id);

                if (error) {
                    console.error('Error al actualizar en Supabase:', error);
                    return NextResponse.json({ success: false, message: "Error al actualizar la transacción" });
                }

                console.log("Transacción actualizada correctamente");
                return NextResponse.json({ success: true, message: "Transacción actualizada correctamente" });
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







