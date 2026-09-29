"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NequiPage() {
    const router = useRouter();

    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefonoNequi, setTelefonoNequi] = useState("");
    const [cedula, setCedula] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [correo, setCorreo] = useState("");

    const validarTexto = (texto: string) => {
        return texto.replace(/[^a-zA-Z\s]/g, "");
    };

    const formatAccountNumber = (value: string) => {
        let cleanValue = value.replace(/\D/g, "");

        if (cleanValue.length > 3) {
            cleanValue =
                cleanValue.slice(0, 3) +
                "-" +
                cleanValue.slice(3);
        }

        if (cleanValue.length > 10) {
            cleanValue =
                cleanValue.slice(0, 10) +
                "-" +
                cleanValue.slice(10);
        }

        return cleanValue;
    };

    const handleTelefonoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTelefonoNequi(
            formatAccountNumber(e.target.value)
        );
    };

    const esValido =
        nombreCompleto.trim() !== "" &&
        telefonoNequi.trim() !== "" &&
        cedula.trim() !== "" &&
        tipoCuenta.trim() !== "";

    const guardarYRedirigir = () => {
        if (!esValido) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        localStorage.setItem(
            "nombre_completo",
            nombreCompleto
        );

        localStorage.setItem(
            "telefono_nequi",
            telefonoNequi
        );

        localStorage.setItem("cedula", cedula);

        localStorage.setItem(
            "tipo_cuenta",
            tipoCuenta
        );

        localStorage.setItem(
            "tipoDocumento",
            tipoDocumento
        );

        localStorage.setItem(
            "correo",
            correo
        );

        router.push("/confirmacion");
    };

    return (
        <div className="min-h-screen bg-[#F7F9F5] px-4 py-6">

{/* AVISO */}
            <div className="mx-auto w-full max-w-xl mb-5">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

                    <div className="flex gap-3">

                        <div className="text-xl">
                            ⚠️
                        </div>

                        <div className="text-sm text-red-800">

                            <p className="font-bold mb-1">
                                Importante
                            </p>

                            <p className="leading-relaxed">
                                Por favor, ingresa tus nombres y
                                apellidos <strong>sin tildes</strong>.
                            </p>

                        </div>

                    </div>

                </div>
            </div>


            {/* TARJETA PRINCIPAL */}
            <div className="mx-auto w-full max-w-xl">

                <div className="rounded-3xl bg-white shadow-xl border border-[#D7E8C5] overflow-hidden">

                    {/* ENCABEZADO */}
                    <div className="px-6 pt-6 pb-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                                    Datos de Bancolombia
                                </h1>

                            </div>

                            <div className="h-12 w-12 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center">

                                <span className="text-xl font-bold text-[#589013]">
                                    B
                                </span>

                            </div>

                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Ingresa los datos del titular de la cuenta
                            donde recibirás el dinero.
                        </p>

                    </div>


                    {/* FORMULARIO */}
                    <div className="px-6 pb-6">

                        {/* NOMBRE */}
                        <div className="mb-5">

                            <label
                                htmlFor="nombre_completo"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Nombre y apellido del titular de la cuenta
                            </label>

                            <input
                                type="text"
                                id="nombre_completo"
                                placeholder="Nombre completo del titular"
                                value={nombreCompleto}
                                onChange={(e) =>
                                    setNombreCompleto(
                                        validarTexto(e.target.value)
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#589013] focus:bg-white focus:ring-1 focus:ring-[#589013]/20"
                            />

                        </div>


                        {/* CUENTA */}
                        <div className="mb-5">

                            <label
                                htmlFor="telefono_nequi"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Número de cuenta
                            </label>

                            <div className="flex items-center rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 transition focus-within:border-[#589013] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#589013]/20">

                                <div className="h-9 w-9 rounded-full bg-[#F1F7EA] border border-[#D7E8C5] flex items-center justify-center mr-3 shrink-0">

                                    <span className="font-bold text-[#589013]">
                                        B
                                    </span>

                                </div>

                                <input
                                    type="text"
                                    id="telefono_nequi"
                                    inputMode="numeric"
                                    placeholder="Número de cuenta Bancolombia"
                                    value={telefonoNequi}
                                    onChange={handleTelefonoChange}
                                    className="w-full bg-transparent outline-none text-lg font-semibold text-gray-900"
                                />

                            </div>

                            <p className="text-xs text-gray-400 mt-2">
                                Ingresa el número de cuenta Bancolombia
                                del titular.
                            </p>

                        </div>


                        {/* DOCUMENTO */}
                        <div className="mb-5">

                            {/* TIPO DE DOCUMENTO */}
                            <div className="mb-3">

                                <label
                                    htmlFor="tipoDocumento"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Tipo de documento
                                </label>

                                <select
                                    id="tipoDocumento"
                                    value={tipoDocumento}
                                    onChange={(e) =>
                                        setTipoDocumento(e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 text-gray-900 font-medium outline-none transition focus:border-[#589013] focus:bg-white focus:ring-1 focus:ring-[#589013]/20"
                                >

                                    <option value="" disabled>
                                        Selecciona tipo de documento
                                    </option>

                                    <option value="Cedula de ciudadania">
                                        Cédula de ciudadanía
                                    </option>

                                    <option value="Cedula de extranjeria">
                                        Cédula de extranjería
                                    </option>

                                    <option value="NIT">
                                        NIT
                                    </option>

                                    <option value="Tarjeta de identidad">
                                        Tarjeta de identidad
                                    </option>

                                    <option value="PPT">
                                        PPT
                                    </option>

                                    <option value="Pasaporte">
                                        Pasaporte
                                    </option>

                                    <option value="Fideicomiso">
                                        Fideicomiso
                                    </option>

                                    <option value="Registro civil">
                                        Registro civil
                                    </option>

                                </select>

                            </div>


                            {/* NÚMERO DE DOCUMENTO */}
                            <div>

                                <label
                                    htmlFor="cedula"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Cédula de ciudadanía
                                </label>

                                <input
                                    type="number"
                                    id="cedula"
                                    inputMode="numeric"
                                    placeholder="Cédula del titular"
                                    value={cedula}
                                    onChange={(e) =>
                                        setCedula(e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#589013] focus:bg-white focus:ring-1 focus:ring-[#589013]/20"
                                />

                            </div>

                        </div>


                        {/* TIPO DE CUENTA */}
                        <div className="mb-5">

                            <label
                                htmlFor="tipo-de-cuenta"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Tipo de cuenta
                            </label>

                            <select
                                id="tipo-de-cuenta"
                                value={tipoCuenta}
                                onChange={(e) =>
                                    setTipoCuenta(e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 text-gray-900 font-medium outline-none transition focus:border-[#589013] focus:bg-white focus:ring-1 focus:ring-[#589013]/20"
                            >

                                <option value="" disabled>
                                    Selecciona tipo de cuenta
                                </option>

                                <option value="ahorros">
                                    Ahorros
                                </option>

                                <option value="corriente">
                                    Corriente
                                </option>

                            </select>

                        </div>


                        {/* CORREO */}
                        <div className="mb-6">

                            <label
                                htmlFor="correo"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Correo electrónico

                                <span className="text-gray-400 font-normal ml-1">
                                    (opcional)
                                </span>

                            </label>

                            <input
                                type="email"
                                id="correo"
                                placeholder="correo@ejemplo.com"
                                value={correo}
                                onChange={(e) =>
                                    setCorreo(e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F5] px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#589013] focus:bg-white focus:ring-1 focus:ring-[#589013]/20"
                            />

                        </div>


                        {/* BOTONES */}
                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="flex-1 rounded-2xl border border-[#D7E8C5] bg-white py-4 text-base font-bold text-gray-700 transition hover:bg-[#F7F9F5] active:scale-[0.99]"
                            >
                                Atrás
                            </button>

                            <button
                                type="button"
                                id="continuar2"
                                onClick={guardarYRedirigir}
                                disabled={!esValido}
                                className={`flex-[1.5] rounded-2xl py-4 text-base font-bold transition-all ${
                                    esValido
                                        ? "bg-[#589013] text-white hover:bg-[#3F6B0D] active:scale-[0.99] shadow-lg"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Continuar
                            </button>

                        </div>


                        <p className="text-center text-xs text-gray-400 mt-4">
                            Revisa cuidadosamente los datos antes de
                            continuar.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}