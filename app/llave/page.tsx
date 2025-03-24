"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NequiPage() {
    const router = useRouter();
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefonoNequi, setTelefonoNequi] = useState("");
    const [correo, setCorreo] = useState("");

    const validarTexto = (texto: string) => {
        return texto.replace(/[^a-zA-Z\s]/g, "");
    };

    const guardarYRedirigir = () => {
        if (nombreCompleto.trim() === "" || telefonoNequi.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Guardamos los datos del formulario en el localStorage
        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);
        localStorage.setItem("correo", correo);

        // Redirigimos al archivo de confirmación
        router.push("/confirmacion");
    };

    return (
        <div>
        {/* Aviso en rojo */}
        <div className="w-full max-w-3xl mb-4">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <p className="font-semibold text-center">
                    ⚠ Por favor no usar tildes.
                </p>
                <p className="font-semibold text-center">
                    Si ingresas mal tus datos no podremos enviar tu pago, pero te notificaremos a tu correo
                </p>
            </div>
        </div>
        <div className="container">
            <div className="input-group">
                <label htmlFor="nombre_completo">Nombre completo del titular</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        id="nombre_completo"
                        placeholder="Nombre completo del titular"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(validarTexto(e.target.value))}
                    />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="telefono_nequi">Ingresa la llave</label>
                <div className="input-wrapper">
                    <input
                        id="telefono_nequi"
                        placeholder="Escribe la llave"
                        value={telefonoNequi}
                        onChange={(e) => setTelefonoNequi(e.target.value)}
                    />
                </div>
            </div>

            <div className="input-group">
                    <label htmlFor="correo">Correo electronico</label>
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
                    disabled={
                        nombreCompleto.trim() === "" || 
                        telefonoNequi.trim() === "" 
                    }
                    className={`
                        ${nombreCompleto.trim() !== "" && telefonoNequi.trim() !== ""  
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