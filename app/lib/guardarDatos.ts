// /app/lib/guardarDatos.ts
import { supabase } from './supabase'; // Asegúrate de importar el cliente supabase

export const guardarEnBaseDeDatos = async (datos: any) => {
    try {
        // Inserta los datos en la tabla 'transacciones'
        const { data, error } = await supabase
            .from('transacciones')
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
                from_wallet_address: datos.fromWalletAddress,
                correo: datos.correo,
                tipoDocumento: datos.tipoDocumento,

                transaction_id: '',
                transaction_hash: '',
                transaction_status: '',
                reference: '',
                miniapp_id: '',
                network: '',
                recipient_address: '',
                input_token: '',
                input_token_amount: '',
                fecha: new Date(),
                },
            ])
            .select() // 🔥 CLAVE
            .single();

            if (error) {
            console.error('❌ Error al guardar datos en Supabase:', error);
            return { error: error.message };
            }

            console.log('✅ Datos guardados en Supabase:', data);

            return {
            success: true,
            id: data.id, // 🔥 AQUÍ está lo que te faltaba
            };
        } catch (error) {
            console.error('❌ Error inesperado en Supabase:', error);
            return { error: "Error inesperado en la base de datos" }; // ✅ Captura cualquier error inesperado
        }
    };