"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

const Informacion = () => {
    return (
        <div className="min-h-screen bg-[#F7F9F5] px-4 py-6">

            <div className="mx-auto w-full max-w-xl">

                {/* ENCABEZADO */}
                <div className="mb-6">

                    <p className="text-sm text-[#589013] font-medium">
                        Centro de ayuda
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-gray-900">
                        Guías
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        Encuentra información y respuestas sobre el
                        proceso de retiro en BuenoCambios.
                    </p>

                </div>


                {/* TARJETA PRINCIPAL */}
                <div className="rounded-3xl bg-white border border-[#D7E8C5] shadow-xl overflow-hidden">

                    {/* CABECERA */}
                    <div className="bg-[#589013] px-6 py-6">

                        <div className="flex items-center gap-4">

                            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center">

                                <FaBookOpen className="text-white text-xl" />

                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-white">
                                    Centro de guías
                                </h2>

                                <p className="text-sm text-[#D7E8C5] mt-1">
                                    Aprende a usar BuenoCambios
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* GUÍAS */}
                    <div className="p-6">

                        <div className="space-y-4">

                            {/* GUÍA RETIRO */}
                            <Link
                                href="/informacion/guia-retiro"
                                className="group block rounded-2xl border border-[#D7E8C5] bg-[#F7F9F5] p-5 transition-all hover:bg-[#F1F7EA] hover:border-[#589013] active:scale-[0.99]"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="h-11 w-11 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center shrink-0">

                                        <FaBookOpen className="text-[#589013]" />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="text-base font-bold text-gray-900 leading-snug">
                                            ¿Cómo retirar con{" "}
                                            <strong>BuenoCambios</strong>?
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Conoce el proceso paso a paso para realizar un retiro.
                                        </p>

                                    </div>

                                    <FaArrowRight className="text-[#589013] text-sm shrink-0 transition-transform group-hover:translate-x-1" />

                                </div>

                            </Link>


                            {/* GUÍA SIN FONDOS */}
                            <Link
                                href="/informacion/guia-boveda"
                                className="group block rounded-2xl border border-[#D7E8C5] bg-[#F7F9F5] p-5 transition-all hover:bg-[#F1F7EA] hover:border-[#589013] active:scale-[0.99]"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="h-11 w-11 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center shrink-0">

                                        <FaBookOpen className="text-[#589013]" />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="text-base font-bold text-gray-900 leading-snug">
                                            ¿Estás intentando retirar y apareces{" "}
                                            <strong>sin fondos</strong>?
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Descubre qué hacer cuando el sistema indica que no tienes fondos disponibles.
                                        </p>

                                    </div>

                                    <FaArrowRight className="text-[#589013] text-sm shrink-0 transition-transform group-hover:translate-x-1" />

                                </div>

                            </Link>

                        </div>


                        {/* MENSAJE FINAL */}
                        <div className="mt-6 rounded-2xl border border-[#D7E8C5] bg-[#F1F7EA] p-4">

                            <p className="text-sm text-[#3F6B0D] leading-relaxed">
                                Si no encuentras la respuesta que buscas,
                                puedes comunicarte con nuestro equipo de
                                soporte para recibir ayuda.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Informacion;