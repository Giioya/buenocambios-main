"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NequiPage() {
    const router = useRouter();
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefonoNequi, setTelefonoNequi] = useState("");

    const validarTexto = (texto: string) => {
        return texto.replace(/[^a-zA-Z\s]/g, "");
    };

    const esValido = 
        nombreCompleto.trim() !== "" && 
        telefonoNequi.trim().length === 10;

    const guardarYRedirigir = () => {
        if (!esValido) return;

        // Guardamos los datos del segundo archivo en el localStorage
        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);

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
                    <label htmlFor="nombre_completo">Nombre completo</label>
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
                    <label htmlFor="telefono_nequi">Número Nequi</label>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            id="telefono_nequi"
                            placeholder="Escribe tu número de Nequi"
                            value={telefonoNequi}
                            onChange={(e) => setTelefonoNequi(e.target.value)}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={() => router.push("/")}>Atrás</button>
                    <button 
                        id="continuar2" 
                        onClick={guardarYRedirigir} 
                        disabled={!esValido}
                        className={`${esValido ? "bg-[#3b5110] hover:bg-[#589013]" : "bg-gray-300 cursor-not-allowed"} text-white`}

                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}



