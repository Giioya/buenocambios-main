import { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../lib/supabase'; // Importa correctamente el cliente de Supabase

interface IRequestPayload {
    payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { payload } = (await req.json()) as IRequestPayload;

    console.log("Datos recibidos en confirm-payment:", payload);

    const cookieStore = await cookies(); // Esperar a que la promesa se resuelva
    const reference = cookieStore.get("payment-nonce")?.value;

    console.log("Referencia en la cookie:", reference);
    console.log("Referencia en el payload:", payload.reference);

    // Recuperar datos de las cookies
    const nombre_completo = cookieStore.get("nombre_completo")?.value || null;
    const telefono_nequi = cookieStore.get("telefono_nequi")?.value || null;
    const cedula = cookieStore.get("cedula")?.value || null;
    const tipo_cuenta = cookieStore.get("tipo_cuenta")?.value || null;
    const moneda_a_enviar = cookieStore.get("moneda_a_enviar")?.value || null;
    const dinero_a_recibir = cookieStore.get("dinero_a_recibir")?.value || null;
    const metodo_pago = cookieStore.get("metodo_pago")?.value || null;

    if (!reference) {
        return NextResponse.json({ success: false });
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
                return NextResponse.json({ success: false });
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
    } else {
        return NextResponse.json({ success: false });
    }
}




