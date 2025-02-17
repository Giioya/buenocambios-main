"use client";

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const PagoExitoso = () => {
    const [codigoReferencia, setCodigoReferencia] = useState<string | null>('Cargando...');
    const [isError, setIsError] = useState<boolean>(false); // Estado para manejar el error

    useEffect(() => {
        const obtenerReferencia = async () => {
            try {
                const response = await fetch('/api/obtener-referencia');
                
                if (!response.ok) {
                    throw new Error('No se pudo obtener la referencia');
                }

                const data = await response.json();
                setCodigoReferencia(data.id || 'No disponible');
            } catch (error) {
                console.error('Error al obtener la referencia:', error);
                setIsError(true);  // Establecer que ocurrió un error
                setCodigoReferencia('No disponible');
            }
        };

        obtenerReferencia();
    }, []);

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <CheckCircle className="text-red-500 w-24 h-24 mb-4" />
                <h1 className="text-4xl font-bold text-gray-800">Error al procesar el pago</h1>
                <p className="text-red-500 mt-4">Por favor, intente más tarde.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <CheckCircle className="text-green-500 w-24 h-24 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">Retiro Exitoso</h1>
            <p className="text-gray-600 mt-2 text-center">
                Gracias por usar nuestro servicio. <br />
                Su dinero llegará de 30-60 minutos a su cuenta bancaria.
            </p>
            <br />
            <p className="text-black mt-4 text-center text-1xl font-semibold break-words">
                <strong>Código de referencia:</strong> {codigoReferencia}
            </p>
            <br />
            <p className="text-red-500 mt-2 text-center">
                Si tienes algún inconveniente con tu pago, <br />
                guarda tu código de referencia y <br />
                contáctanos. ¡Estamos aquí para ayudarte!
            </p>
        </div>
    );
};

export default PagoExitoso;









