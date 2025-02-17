import { supabase } from "@/app/lib/supabase"; // Asegúrate de que la ruta sea correcta

export const guardarEnBaseDeDatos = async (datos: any) => {
    const { data, error } = await supabase
        .from("nombre_de_tu_tabla") // Asegúrate de poner el nombre correcto de tu tabla
        .insert([
            {
                nombre_completo: datos.nombreCompleto,
                telefono_nequi: datos.telefonoNequi,
                cedula: datos.cedula,
                tipo_cuenta: datos.tipoCuenta,
                moneda_a_enviar: datos.monedaAEnviar,
                dinero_a_recibir: datos.dineroARecibir,
                metodo_pago: datos.metodoPago,
            },
        ]);

    if (error) {
        console.error("Error al guardar los datos: ", error.message);
    } else {
        console.log("Datos guardados exitosamente: ", data);
    }
};



    