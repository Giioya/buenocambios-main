"use client";

import React from "react";
import {
    FaEnvelope,
    FaWhatsapp,
    FaClock,
    FaHeadset,
    } from "react-icons/fa";

    const Soporte: React.FC = () => {
    const whatsappNumber = "+573237571686";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const correo = "buenocambios@gmail.com";
    const correoLink = `mailto:${correo}`;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">

        <div className="mx-auto w-full max-w-xl">

            {/* ENCABEZADO */}
            <div className="mb-6">

            <p className="text-sm text-gray-500">
                ¿Necesitas ayuda?
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
                Soporte
            </h1>

            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Estamos aquí para ayudarte con tus
                transacciones y resolver cualquier duda.
            </p>

            </div>


            {/* TARJETA PRINCIPAL */}
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">

            {/* HEADER DE LA TARJETA */}
            <div className="bg-gray-900 px-6 py-6">

                <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">

                    <FaHeadset className="text-white text-xl" />

                </div>

                <div>

                    <h2 className="text-lg font-bold text-white">
                    Atención al cliente
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                    BuenoCambios
                    </p>

                </div>

                </div>

            </div>


            {/* CONTENIDO */}
            <div className="p-6">

                {/* DESCRIPCIÓN */}
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">

                <p className="text-sm text-gray-600 leading-relaxed">
                    Si tienes dudas sobre un retiro, necesitas
                    asistencia con una transacción o tienes
                    algún inconveniente, puedes comunicarte
                    directamente con nuestro equipo.
                </p>

                </div>


                {/* HORARIO */}
                <div className="mt-5 rounded-2xl bg-green-50 border border-green-100 p-4">

                <div className="flex items-start gap-3">

                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">

                    <FaClock className="text-green-700 text-sm" />

                    </div>

                    <div>

                    <p className="text-sm font-bold text-green-800">
                        Horario de atención
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                        Lunes a Domingo
                    </p>

                    <p className="text-sm text-green-700">
                        9:00 AM a 8:00 PM
                    </p>

                    </div>

                </div>

                </div>


                {/* CONTACTO POR CORREO */}
                <div className="mt-6">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    Correo electrónico
                </p>

                <a
                    href={correoLink}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-gray-100"
                >

                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">

                    <FaEnvelope className="text-blue-600" />

                    </div>

                    <div className="min-w-0">

                    <p className="text-sm font-bold text-gray-800">
                        Escríbenos por correo
                    </p>

                    <p className="text-sm text-blue-600 break-all mt-1">
                        {correo}
                    </p>

                    </div>

                </a>

                </div>


                {/* BOTONES */}
                <div className="mt-6 space-y-3">

                <button
                    type="button"
                    onClick={() =>
                    window.open(
                        whatsappLink,
                        "_blank",
                        "noopener,noreferrer"
                    )
                    }
                    className="w-full flex items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99]"
                >
                    <FaWhatsapp className="text-xl" />
                    Contactar por WhatsApp
                </button>


                <button
                    type="button"
                    onClick={() =>
                    window.open(
                        correoLink,
                        "_blank",
                        "noopener,noreferrer"
                    )
                    }
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-4 text-base font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
                >
                    <FaEnvelope className="text-lg text-blue-600" />
                    Enviar un correo
                </button>

                </div>


                {/* MENSAJE FINAL */}
                <div className="mt-6 text-center">

                <p className="text-xs text-gray-400 leading-relaxed">
                    Cuando nos contactes por una transacción,
                    ten a mano tu ID de operación para que
                    podamos ayudarte más rápidamente.
                </p>

                </div>

            </div>

            </div>

        </div>

        </div>
    );
    };

    export default Soporte;