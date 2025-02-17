import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Inicializar la base de datos
const initializeDB = async () => {
    const db = await open({
        filename: './database.db',  // Nombre del archivo de la base de datos
        driver: sqlite3.Database
    });

    // Crear la tabla si no existe
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
            inputTokenAmount TEXT,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    return db;
};

export default initializeDB;



