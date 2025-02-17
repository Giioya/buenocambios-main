import { createClient } from '@supabase/supabase-js';

// Exporta el tipo
export interface TransactionData {
    nombre_completo: string;
    telefono_nequi: string;
    cedula: string;
    tipo_cuenta: string;
    moneda_a_enviar: string;
    dinero_a_recibir: string;
    metodo_pago: string;
    transaction_id: string;
    transaction_hash: string;
    transaction_status: string;
    reference: string;
    miniapp_id: string;
    updated_at: string;
    network: string;
    from_wallet_address: string;
    recipient_address: string;
    input_token: string;
    input_token_amount: string;
    fecha: string;
}

// Conectar con tu URL y la clave de la API de Supabase
const supabase = createClient(
  'https://hgxwaxwnsuaxaprfudqr.supabase.co', // Tu URL de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneHdheHduc3VheGFwcmZ1ZHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDYxNzIsImV4cCI6MjA1NTM4MjE3Mn0._g02ca8rRtMHgjeRgwY9VuHzPQimgpezcl0VdmfjWf0' // Tu public-anon-key
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Obtener los datos de la solicitud
        const data: TransactionData = req.body;

        try {
            const { data: insertedData, error } = await supabase
                .from('transacciones')  // Nombre de tu tabla en Supabase
                .insert([
                    {
                        nombre_completo: data.nombre_completo,
                        telefono_nequi: data.telefono_nequi,
                        cedula: data.cedula,
                        tipo_cuenta: data.tipo_cuenta,
                        moneda_a_enviar: data.moneda_a_enviar,
                        dinero_a_recibir: data.dinero_a_recibir,
                        metodo_pago: data.metodo_pago,
                        transaction_id: data.transaction_id,
                        transaction_hash: data.transaction_hash,
                        transaction_status: data.transaction_status,
                        reference: data.reference,
                        miniapp_id: data.miniapp_id,
                        updated_at: data.updated_at,
                        network: data.network,
                        from_wallet_address: data.from_wallet_address,
                        recipient_address: data.recipient_address,
                        input_token: data.input_token,
                        input_token_amount: data.input_token_amount,
                        fecha: data.fecha
                    }
                ]);

            if (error) {
                res.status(500).json({ error: 'Error inserting data', details: error });
            } else {
                res.status(200).json({ message: 'Transaction inserted successfully', data: insertedData });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        // Si no es un método POST, devuelve un error 405
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}











