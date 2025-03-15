"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NequiPage() {
    const router = useRouter();
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefonoNequi, setTelefonoNequi] = useState("");
    const [cedula, setCedula] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");

    const validarTexto = (texto: string) => {
        return texto.replace(/[^a-zA-Z\s]/g, "");
    };

    const guardarYRedirigir = () => {
        if (nombreCompleto.trim() === "" || telefonoNequi.trim() === "" || cedula.trim() === "" || tipoCuenta.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Guardamos los datos del formulario en el localStorage
        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);
        localStorage.setItem("cedula", cedula);
        localStorage.setItem("tipo_cuenta", tipoCuenta);

        // Redirigimos al archivo de confirmación
        router.push("/confirmacion");
    };

    return (
        <div>
        {/* Aviso en rojo */}
        <div className="w-full max-w-3xl mb-4">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <p className="font-semibold">
                    ⚠ Por favor no usar tildes.
                </p>
            </div>
        </div>
        <div className="container">
            <div className="input-group">
                <label htmlFor="nombre_completo">Nombre y apellido del titular de la cuenta</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        id="nombre_completo"
                        placeholder="Escribe tu nombre completo"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(validarTexto(e.target.value))}
                    />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="telefono_nequi">Número de cuenta</label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        id="telefono_nequi"
                        placeholder="Escribe tu número de cuenta Bancolombia"
                        value={telefonoNequi}
                        onChange={(e) => setTelefonoNequi(e.target.value)}
                    />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="cedula">Cédula de ciudadanía</label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        id="cedula"
                        placeholder="Escribe tu cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="tipo-de-cuenta">Tipo de cuenta</label>
                <select
                    id="tipo-de-cuenta"
                    value={tipoCuenta}
                    onChange={(e) => setTipoCuenta(e.target.value)}
                >
                    <option value="" disabled>Selecciona tipo de cuenta</option>
                    <option value="ahorros">Ahorros</option>
                    <option value="corriente">Corriente</option>
                </select>
            </div>

            <div className="button-group">
                <button onClick={() => router.push("/")}>Atrás</button>
                <button
                    id="continuar2"
                    onClick={guardarYRedirigir}
                    disabled={
                        nombreCompleto.trim() === "" || 
                        telefonoNequi.trim() === "" || 
                        cedula.trim() === "" || 
                        tipoCuenta.trim() === ""
                    }
                    className={`
                        ${nombreCompleto.trim() !== "" && telefonoNequi.trim() !== "" && cedula.trim() !== "" && tipoCuenta.trim() !== "" 
                            ? "bg-[#3b5110] hover:bg-[#589013]" 
                            : "bg-gray-300 cursor-not-allowed"
                        } 
                        text-white font-bold py-2 px-4 rounded
                    `}
                >
                    Continuar
                </button>
            </div>
        </div>
        </div>
    );
}
