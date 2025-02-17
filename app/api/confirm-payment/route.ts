import { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Función para inicializar la base de datos
const initializeDB = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    // Crear tabla si no existe
    await db.exec(`
        CREATE TABLE IF NOT EXISTS transacciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_completo TEXT,
            telefono_nequi TEXT,
            cedula TEXT,
            tipo_cuenta TEXT,
            moneda_a_enviar TEXT,
            dinero_a_recibir TEXT,
            metodo_pago TEXT,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            transactionId TEXT,
            transactionHash TEXT,
            transactionStatus TEXT,
            reference TEXT,
            miniappId TEXT,
            updatedAt TEXT,
            network TEXT,
            fromWalletAddress TEXT,
            recipientAddress TEXT,
            inputToken TEXT,
            inputTokenAmount TEXT
        )
    `);

    return db;
};

interface IRequestPayload {
    payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest) {
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

        // Si la transacción no falló, guardamos los detalles
        if (transaction.reference == reference && transaction.status != "failed") {
            const db = await initializeDB();

            await db.run(`
                INSERT INTO transacciones (
                    nombre_completo,
                    telefono_nequi,
                    cedula,
                    tipo_cuenta,
                    moneda_a_enviar,
                    dinero_a_recibir,
                    metodo_pago,
                    transactionId,
                    transactionHash,
                    transactionStatus,
                    reference,
                    miniappId,
                    updatedAt,
                    network,
                    fromWalletAddress,
                    recipientAddress,
                    inputToken,
                    inputTokenAmount
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                nombre_completo,                   // nombre_completo desde las cookies
                telefono_nequi,                    // telefono_nequi desde las cookies
                cedula,                            // cedula desde las cookies
                tipo_cuenta,                       // tipo_cuenta desde las cookies
                moneda_a_enviar,                   // moneda_a_enviar desde las cookies
                dinero_a_recibir,                  // dinero_a_recibir desde las cookies
                metodo_pago,                       // metodo_pago desde las cookies
                transaction.transaction_id,
                transaction.transactionHash,
                transaction.status,
                transaction.reference,
                transaction.miniappId,
                transaction.updatedAt,
                transaction.network,
                transaction.fromWalletAddress,
                transaction.recipientAddress,
                transaction.inputToken,
                transaction.inputTokenAmount
            ]);

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
    }
}



