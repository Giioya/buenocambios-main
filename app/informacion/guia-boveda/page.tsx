"use client";

import React from "react";
import Image from "next/image";
import errorsinfondos from '@/public/images/error-sin-fondos.jpeg';
import billetera from '@/public/images/billetera.jpeg';
import boveda from '@/public/images/boveda.jpeg';
import boveda2 from '@/public/images/boveda2.jpg';
import boveda3 from '@/public/images/boveda3.jpg';
import boveda4 from '@/public/images/boveda4.jpeg';

const GuiaBoveda: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md text-black pt-20 pb-20">
            <h1 className="text-3xl font-bold mb-4 text-center underline">¿Cómo solucionar el error &quot;sin fondos&quot;?</h1>
            <ol className="space-y-10 text-lg">
                <li>
                    <p className="mb-16 font-semibold">Si al momento de retirar tus monedas ves que el sistema te muestra &quot;sin fondos&quot;, como ves en este ejemplo:</p>
                    <div className="mt-2 flex justify-center">
                        <Image 
                            src={errorsinfondos} 
                            alt="errorsinfondos" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mb-16 font-semibold">
                        Primero, debes asegurarte de que tus fondos están disponibles para retiro y no dentro de la bóveda.
                    </p>
                    <div className="mb-16 flex justify-center">
                        <div className="flex gap-4"> {/* Contenedor flexible para alinear las imágenes en fila */}
                            <Image 
                                src={billetera} 
                                alt="billetera" 
                                className="w-1/2 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                            <Image 
                                src={boveda} 
                                alt="boveda" 
                                className="w-1/2 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                        </div>
                    </div>
                    <p className="font-semibold underline">
                        Si tus fondos están en el apartado de gastos, pero aún te aparece como &quot;fondos insuficientes&quot;, prueba a retirar una menor cantidad.  
                        Por ejemplo, si tienes 16 monedas, intenta colocar 15.99.
                    </p>
                </li>

                <li>
                    <h2 className="mb-4 font-semibold text-2xl">¿Qué hacer si mis fondos están en la bóveda?</h2>
                    <p>
                        Si tus fondos están dentro de la bóveda, no podrás cambiar tus monedas a pesos hasta que retiremos estos fondos de la bóveda.  
                        Para ello, debes presionar sobre el cuadro que dice "Bóveda".
                    </p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={boveda2} 
                            alt="boveda2" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="font-semibold">Después de lo anterior, debes presionar en el botón que dice &quot;Retirar&quot;.</p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={boveda3} 
                            alt="boveda3" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="font-semibold">
                        Por último, podrás ver el tiempo que tardarán las monedas en salir de la bóveda.  
                        En nuestro ejemplo, son 7 días, pero pueden ser 3 días, 1 día o tan solo 1 hora.  
                        Finalmente, presiona en "Confirmar retiro".
                    </p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={boveda4} 
                            alt="boveda4" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default GuiaBoveda;
