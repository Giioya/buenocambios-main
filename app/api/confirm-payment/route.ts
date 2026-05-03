import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const { payload } = await req.json();
        const { transactionId, transaccionId } = payload;

        if (!transactionId || !transaccionId) {
        return NextResponse.json(
            { success: false, message: "Payload inválido" },
            { status: 400 }
        );
        }

        // 🔥 1. Consultar Worldcoin
        const response = await fetch(
            `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transactionId}?app_id=${process.env.APP_ID}&type=payment`,
                {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
                },
            }
            );

            if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Error Worldcoin" },
                { status: 500 }
            );
            }

            const transaction = await response.json();

            const transactionStatus = transaction.transactionStatus;

            if (!transactionStatus) {
            return NextResponse.json(
                { success: false, message: "transactionStatus no encontrado" },
                { status: 500 }
            );
            }

            // 🔥 UN SOLO UPDATE (limpio y coherente)
            const { error } = await supabase
            .from("transacciones")
            .update({
                transaction_id: transaction.transactionId,
                transaction_hash: transaction.transactionHash,
                transaction_status: transaction.transactionStatus,
                reference: transaction.reference,
                network: transaction.network,
                recipient_address: transaction.recipientAddress,
                input_token: transaction.inputToken,
                input_token_amount: transaction.inputTokenAmount,
                updated_at: transaction.updatedAt,
            })
            .eq("id", transaccionId)

            if (error) {
                console.error("SUPABASE ERROR:", error);

                return NextResponse.json(
                    {
                    success: false,
                    message: "Error actualizando DB",
                    detail: error.message,
                    hint: error.hint,
                    code: error.code
                    },
                    { status: 500 }
                );
                }

        return NextResponse.json({
        success: true,
        message: "Pago verificado y guardado",
        });

    } catch (error: any) {
        return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
        );
    }
    }