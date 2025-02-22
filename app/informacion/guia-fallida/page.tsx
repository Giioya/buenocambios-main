"use client";

import React from "react";
import Image from "next/image";
import manten from '@/public/images/manten.jpg';
import scan from '@/public/images/scan.jpeg';
import qr from '@/public/images/qr.png';
import continuarqr from '@/public/images/continuarqr.jpeg';
import monedaseleccion from '@/public/images/monedaseleccion.jpeg';
import cantidad from '@/public/images/cantidad.jpeg';
import confirmacionretiro from '@/public/images/confirmacionretiro.jpeg';
import soportefinal from '@/public/images/soportefinal.jpg';
import whatsapp from '@/public/images/whatsapp.jpg';

const GuiaFallida: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md text-black pt-20 pb-20">
            <h1 className="text-3xl font-bold mb-4 text-center underline">Transacción fallida, intente más tarde</h1>
            <ol className="space-y-10 text-lg">
                <li>
                    <p className="mb-16 font-semibold">
                        Si al momento de presionar el botón &quot;Pagar&quot; te aparece &quot;Transacción fallida, intente más tarde&quot; y después el botón de &quot;Mantén presionado para pagar&quot;, no podrás hacer el retiro por nuestra aplicación por el momento.
                    </p>
                    <div className="mt-2 flex justify-center">
                        <Image 
                            src={manten} 
                            alt="manten" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mb-16 font-semibold">
                        Estamos teniendo dificultades en algunos dispositivos. Para solucionar este problema, les agradecemos su paciencia. Si te aparece este error, puedes realizar el retiro de la siguiente manera:
                    </p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={scan} 
                            alt="scan" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="mb-16 font-semibold">
                        Presiona el botón de escáner que te indicamos en la imagen, después escanea el siguiente QR.
                    </p>
                    <div className="mt-16 flex justify-center">
                        <Image 
                            src={qr} 
                            alt="boveda2" 
                            className="mt-2 w-3/4 rounded-md shadow-md" 
                            width={800} 
                            height={600} 
                        />
                    </div>
                </li>
                <li>
                    <p className="font-semibold">
                        Te aparecerá una pestaña donde deberás presionar &quot;Continuar&quot;. Luego de esto, selecciona la moneda Worldcoin y elige la cantidad de monedas que deseas retirar, o presiona en &quot;Máximo&quot; si deseas retirar todas. Terminas esta parte presionando en &quot;Continuar&quot;.
                    </p>
                    <div className="mt-2 flex justify-center">
                        <div className="mt-16 flex gap-4"> 
                            <Image 
                                src={continuarqr} 
                                alt="billetera" 
                                className="w-1/3 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                            <Image 
                                src={monedaseleccion} 
                                alt="boveda" 
                                className="w-1/4 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                            <Image 
                                src={cantidad} 
                                alt="boveda" 
                                className="w-1/3 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                        </div>
                    </div>
                </li>
                <li>
                    <p className="mt-16 font-semibold">
                        Por último, antes de confirmar el retiro, verifica que la dirección de la billetera coincida con las terminales e iniciales &quot;0x1f...76cf&quot; y luego presiona en &quot;Confirmar envío&quot;.  
                        Una vez terminado este proceso, abre la aplicación de BuenoCambios, presiona en &quot;Soporte&quot;, luego en &quot;Contactar por WhatsApp&quot; y envíanos el pantallazo de la transacción para hacerte el envío a tu cuenta bancaria.
                    </p>
                    <div className="mt-2 flex justify-center">
                        <div className="mt-16 flex gap-4"> 
                            <Image 
                                src={confirmacionretiro} 
                                alt="billetera" 
                                className="w-1/3 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                            <Image 
                                src={soportefinal} 
                                alt="boveda" 
                                className="w-1/4 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                            <Image 
                                src={whatsapp} 
                                alt="boveda" 
                                className="w-1/3 rounded-md shadow-md" 
                                width={800} 
                                height={600} 
                            />
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default GuiaFallida;
