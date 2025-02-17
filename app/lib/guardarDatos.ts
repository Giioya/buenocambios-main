// /app/lib/guardarDatos.ts
import { supabase } from './supabase'; // Asegúrate de importar el cliente supabase

export const guardarEnBaseDeDatos = async (datos: any) => {
    try {
        // Inserta los datos en la tabla 'transacciones'
        const { data, error } = await supabase
            .from('transacciones') // Nombre de la tabla
            .insert([
                {
                    nombre_completo: datos.nombreCompleto,
                    telefono_nequi: datos.telefonoNequi,
                    cedula: datos.cedula,
                    tipo_cuenta: datos.tipoCuenta,
                    moneda_a_enviar: datos.monedaAEnviar,
                    dinero_a_recibir: datos.dineroARecibir,
                    metodo_pago: datos.metodoPago,
                    updated_at: new Date(),
                    // Puedes agregar más campos según tu tabla, por ejemplo:
                    transaction_id: '', // Si tienes alguna transacción específica
                    transaction_hash: '', // O un hash
                    transaction_status: '', // O el estado
                    reference: '', // Si tienes una referencia
                    miniapp_id: '', // ID de tu miniapp
                    network: '', // Red de la transacción
                    from_wallet_address: '', // Dirección de la billetera de envío
                    recipient_address: '', // Dirección de la billetera de recepción
                    input_token: '', // Token de entrada (si aplica)
                    input_token_amount: '', // Cantidad de token (si aplica)
                    fecha: new Date(),
                },
            ]);

        if (error) {
            throw error;
        }

        console.log('Datos guardados en Supabase:', data);
    } catch (error) {
        console.error('Error al guardar datos en Supabase:', error);
    }
};




    