// /pages/api/obtener-referencia.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase'; // Ajusta la ruta según sea necesario

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Obtén el código de referencia de la última transacción registrada (ajusta según tu lógica)
        const { data, error } = await supabase
            .from('transacciones')
            .select('reference')
            .order('fecha', { ascending: false }) // Asegúrate de obtener la transacción más reciente
            .limit(1)
            .single();

        if (error) {
            throw error;
        }

        if (data) {
            return res.status(200).json({ referencia: data.reference });
        }

        return res.status(404).json({ message: 'Referencia no encontrada' });
    } catch (error) {
        console.error('Error al obtener referencia:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}



