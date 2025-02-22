"use client";

import React from "react";
import Image from "next/image";
import paso1 from '@/public/images/paso1.jpeg';
import paso2 from '@/public/images/paso2.jpeg';
import paso3 from '@/public/images/paso3.jpeg';
import paso4 from '@/public/images/paso4.jpeg';
import paso5 from '@/public/images/paso5.jpeg';

const GuiaRetiro: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md text-black pt-20 pb-20">
            <h1 className="text-3xl font-bold mb-4 text-center underline">Pasos para retirar en BuenoCambios</h1>
            <ol className="space-y-10 text-lg">
                <li>
                    <p className="font-semibold">1. Ingresa la cantidad de monedas que deseas vender y el método donde recibirás tus fondos. Luego, presiona &quot;Continuar&quot;.</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={paso1} 
                            alt="Paso 1" 
                            className="w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mt-16 font-semibold">2. Ingresa tus datos bancarios (no uses tildes).</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={paso2} 
                            alt="Paso 2" 
                            className="w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mt-16 font-semibold">3. Página de confirmación: Verifica que tus datos sean correctos. No somos responsables por errores en la información proporcionada.  
                    Acepta los términos y condiciones y, finalmente, presiona &quot;Finalizar&quot;.</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={paso3} 
                            alt="Paso 3" 
                            className="w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mt-16 font-semibold">4. Usa la opción de "Pagar" para completar tu retiro.</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={paso4} 
                            alt="Paso 4" 
                            className="w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mt-16 font-semibold">5. Si el proceso ha sido exitoso, verás una pantalla de confirmación. Toma un pantallazo o copia el código de referencia de tu transacción.</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={paso5} 
                            alt="Paso 5" 
                            className="w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default GuiaRetiro;




