import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextResponse } from 'next/server';

// Función para inicializar la base de datos
const initializeDB = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });
    return db;
};

// API Route para obtener el último código de referencia
export async function GET() {
    try {
        const db = await initializeDB();
        const referencia = await db.get("SELECT reference FROM transacciones ORDER BY id DESC LIMIT 1");

        console.log("Resultado de la consulta:", referencia);

        if (referencia && referencia.reference) {
            return NextResponse.json({ referencia: referencia.reference });
        } else {
            return NextResponse.json({ referencia: "No disponible" });
        }
    } catch (error) {
        console.error("Error al obtener el código de referencia:", error);
        return NextResponse.json({ referencia: "Error al obtener la referencia" }, { status: 500 });
    }
}


