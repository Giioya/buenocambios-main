"use client";

import React from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";

const Soporte: React.FC = () => {
    const whatsappNumber = "+573204855274";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    const correo = "buenocambios@gmail.com";
    const correoLink = `mailto:${correo}`;
    const instagramLink = "https://www.instagram.com/tu_cuenta/";

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
                    Horario de atención: Lunes a Sabado de 9:00 AM a 6:00 PM
                </p>
                <div className="flex flex-col gap-3 w-full">
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                        onClick={() => window.open(whatsappLink, "_blank")}
                    >
                        <FaWhatsapp /> Contactar por WhatsApp
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                        onClick={() => window.open(correoLink, "_blank")}
                    >
                        <FaEnvelope /> Enviar un Correo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Soporte;

