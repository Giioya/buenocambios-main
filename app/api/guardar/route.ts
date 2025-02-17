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

export async function POST(req: Request) {
    const res = new Response('', {
        status: 200,
    });

    if (req.method === 'POST') {
        const data: TransactionData = await req.json(); // Usar .json() para obtener los datos del body

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
            return new Response(JSON.stringify({ error: 'Error inserting data', details: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(
            JSON.stringify({ message: 'Transaction inserted successfully', data: insertedData }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
            );
        }
        } catch (error: unknown) {
        // Comprobamos si 'error' es una instancia de Error
        if (error instanceof Error) {
            return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
            );
        } else {
            // Si no es un Error, retornamos un mensaje genérico de error
            return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: 'Unknown error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
            );
        }
        }
    } else {
        return new Response(
        JSON.stringify({ error: 'Method Not Allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }
}













