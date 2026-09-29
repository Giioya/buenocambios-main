"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NequiPage() {
    const router = useRouter();

    const [primerNombre, setPrimerNombre] = useState("");
    const [segundoNombre, setSegundoNombre] = useState("");
    const [primerApellido, setPrimerApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");

    const [telefonoNequi, setTelefonoNequi] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [cedula, setCedula] = useState("");
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

        if (cleanValue.length > 7) {
        cleanValue =
            cleanValue.slice(0, 7) +
            "-" +
            cleanValue.slice(7);
        }

        return cleanValue.slice(0, 12);
    };

    const handleTelefonoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTelefonoNequi(
        formatAccountNumber(e.target.value)
        );
    };

    const nombreCompleto = `
        ${primerNombre}
        ${segundoNombre}
        ${primerApellido}
        ${segundoApellido}
    `
        .replace(/\s+/g, " ")
        .trim();

    const esValido =
        primerNombre.trim() !== "" &&
        primerApellido.trim() !== "" &&
        segundoApellido.trim() !== "" &&
        tipoDocumento.trim() !== "" &&
        cedula.trim() !== "" &&
        telefonoNequi.trim().length === 12;

    const guardarYRedirigir = () => {
        if (!esValido) return;

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
        "tipoDocumento",
        tipoDocumento
        );
        localStorage.setItem("correo", correo);

        router.push("/confirmacion");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">

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

            <div className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">

            {/* ENCABEZADO */}
            <div className="px-6 pt-6 pb-5">

                <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                    Método de pago
                    </p>

                    <h1 className="text-2xl font-bold text-gray-900 mt-1">
                    Datos de Nequi
                    </h1>

                </div>

                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">

                    <span className="text-xl font-bold text-purple-700">
                    N
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

                {/* NOMBRES */}
                <div className="mb-5">

                <p className="text-sm font-bold text-gray-800 mb-3">
                    Nombre del titular
                </p>

                <div className="space-y-3">

                    {/* PRIMER NOMBRE */}
                    <div>
                    <label
                        htmlFor="primer_nombre"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Primer nombre
                    </label>

                    <input
                        type="text"
                        id="primer_nombre"
                        placeholder="Primer nombre"
                        value={primerNombre}
                        onChange={(e) =>
                        setPrimerNombre(
                            validarTexto(e.target.value)
                        )
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                    </div>

                    {/* SEGUNDO NOMBRE */}
                    <div>
                    <label
                        htmlFor="segundo_nombre"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Segundo nombre
                        <span className="text-gray-400 font-normal ml-1">
                        (opcional)
                        </span>
                    </label>

                    <input
                        type="text"
                        id="segundo_nombre"
                        placeholder="Segundo nombre"
                        value={segundoNombre}
                        onChange={(e) =>
                        setSegundoNombre(
                            validarTexto(e.target.value)
                        )
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                    </div>

                </div>

                </div>

                {/* APELLIDOS */}
                <div className="mb-5">

                <p className="text-sm font-bold text-gray-800 mb-3">
                    Apellidos del titular
                </p>

                <div className="space-y-3">

                    {/* PRIMER APELLIDO */}
                    <div>

                    <label
                        htmlFor="primer_apellido"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Primer apellido
                    </label>

                    <input
                        type="text"
                        id="primer_apellido"
                        placeholder="Primer apellido"
                        value={primerApellido}
                        onChange={(e) =>
                        setPrimerApellido(
                            validarTexto(e.target.value)
                        )
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />

                    </div>

                    {/* SEGUNDO APELLIDO */}
                    <div>

                    <label
                        htmlFor="segundo_apellido"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Segundo apellido
                    </label>

                    <input
                        type="text"
                        id="segundo_apellido"
                        placeholder="Segundo apellido"
                        value={segundoApellido}
                        onChange={(e) =>
                        setSegundoApellido(
                            validarTexto(e.target.value)
                        )
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />

                    </div>

                </div>

                </div>

                {/* DOCUMENTO */}
                <div className="mb-5">

                <p className="text-sm font-bold text-gray-800 mb-3">
                    Documento de identidad
                </p>

                {/* TIPO */}
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
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 font-medium outline-none transition focus:border-blue-500 focus:bg-white"
                    >

                    <option value="" disabled>
                        Selecciona tipo de documento
                    </option>

                    <option value="Cédula de ciudadanía">
                        Cédula de ciudadanía
                    </option>

                    <option value="Cédula de extranjería">
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

                {/* NÚMERO */}
                <div>

                    <label
                    htmlFor="cedula"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                    Número de documento
                    </label>

                    <input
                    type="text"
                    inputMode="numeric"
                    id="cedula"
                    placeholder="Número de documento"
                    value={cedula}
                    onChange={(e) =>
                        setCedula(
                        e.target.value.replace(/\D/g, "")
                        )
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />

                </div>

                </div>

                {/* NEQUI */}
                <div className="mb-5">

                <p className="text-sm font-bold text-gray-800 mb-3">
                    Cuenta Nequi
                </p>

                <label
                    htmlFor="telefono_nequi"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                >
                    Número Nequi
                </label>

                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 transition focus-within:border-purple-500 focus-within:bg-white">

                    <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">

                    <span className="font-bold text-purple-700">
                        N
                    </span>

                    </div>

                    <input
                    type="tel"
                    id="telefono_nequi"
                    placeholder="300-123-4567"
                    value={telefonoNequi}
                    onChange={handleTelefonoChange}
                    className="w-full bg-transparent outline-none text-lg font-semibold text-gray-900"
                    />

                </div>

                <p className="text-xs text-gray-400 mt-2">
                    Ingresa el número de celular asociado a
                    tu cuenta Nequi.
                </p>

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
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                />

                </div>

                {/* BOTONES */}
                <div className="flex gap-3">

                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="flex-1 rounded-2xl border border-gray-200 bg-white py-4 text-base font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
                >
                    Atrás
                </button>

                <button
                    type="button"
                    onClick={guardarYRedirigir}
                    disabled={!esValido}
                    className={`flex-[1.5] rounded-2xl py-4 text-base font-bold transition-all ${
                    esValido
                        ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99] shadow-lg"
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