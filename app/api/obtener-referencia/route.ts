// app/api/obtener-referencia/route.ts

import { supabase } from '../../lib/supabase'; // Ajusta la ruta según sea necesario
import { NextResponse } from 'next/server';

export async function GET() {
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
            return NextResponse.json({ referencia: data.reference });
        }

        return NextResponse.json({ message: 'Referencia no encontrada' }, { status: 404 });
    } catch (error) {
        console.error('Error al obtener referencia:', error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}




