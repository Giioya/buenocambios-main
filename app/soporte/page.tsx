"use client";

import React from "react";
import { FaTelegram, FaEnvelope, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Soporte: React.FC = () => {
    const telegramNumber = "+573204855274";
    const telegramLink = `https://t.me/${telegramNumber}`;
    const whatsappNumber = "+573237571686";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const correo = "buenocambios@gmail.com";
    const correoLink = `mailto:${correo}`;
    const facebookLink = "https://www.facebook.com/profile.php?id=61573392065683";

    return (
        <div className="container mx-auto py-10">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md text-center mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Soporte y Atención al Cliente</h1>
                <p className="text-gray-600 mb-4">
                    Si tienes dudas o necesitas asistencia, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte.
                </p>
                <p className="text-gray-600 mb-4">
                    Correo: <a href={correoLink} className="text-blue-600 hover:underline">{correo}</a>
                </p>
                <p className="text-gray-600 mb-4">
                    Horario de atención: Lunes a Domingo de 9:00 AM a 10:00 PM
                </p>
                <div className="flex flex-col gap-3 w-full">
                    {<button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                        onClick={() => window.open(whatsappLink, "_blank")}
                    >
                        <FaWhatsapp /> Contactar por WhatsApp
                    </button>}
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                        onClick={() => window.open(correoLink, "_blank")}
                    >
                        <FaEnvelope /> Enviar un Correo
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-300"
                        onClick={() => window.open(facebookLink, "_blank")}
                    >
                        <FaFacebook /> Sigue nuestra página de Facebook
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
                        onClick={() => window.open(telegramLink, "_blank")}
                    >
                        <FaTelegram /> Contactar por Telegram
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Soporte;