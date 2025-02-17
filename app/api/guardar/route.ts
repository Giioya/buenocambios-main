import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Definir el tipo de datos de una transacción
interface Transaccion {
    id: number;
    nombre_completo: string;
    telefono_nequi: string;
    cedula: string;
    tipo_cuenta: string;
    moneda_a_enviar: string;
    dinero_a_recibir: string;
    metodo_pago: string;
    fecha: string;
    transactionId: string;
    transactionHash: string;
    transactionStatus: string;
    reference: string;
    miniappId: string;
    updatedAt: string;
    network: string;
    fromWalletAddress: string;
    recipientAddress: string;
    inputToken: string;
    inputTokenAmount: string;
}

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

// Función para manejar el método POST
export async function POST(req: Request) {
    const datos = await req.json();

    try {
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
            datos.nombreCompleto,
            datos.telefonoNequi,
            datos.cedula,
            datos.tipoCuenta,
            datos.monedaAEnviar,
            datos.dineroARecibir,
            datos.metodoPago,
            datos.transactionId,
            datos.transactionHash,
            datos.transactionStatus,
            datos.reference,
            datos.miniappId,
            datos.updatedAt,
            datos.network,
            datos.fromWalletAddress,
            datos.recipientAddress,
            datos.inputToken,
            datos.inputTokenAmount
        ]);

        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({}, { status: 500 });
    }
}









