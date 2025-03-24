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

    const esValido = 
        nombreCompleto.trim() !== "" && 
        telefonoNequi.trim().length === 12;

        const formatAccountNumber = (value: string) => {
            let cleanValue = value.replace(/\D/g, ""); // Solo números
    
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

    const guardarYRedirigir = () => {
        if (!esValido) return;

        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);
        localStorage.setItem("correo", correo);

        router.push("/confirmacion");
    };

    return (
        <div>
            <div className="w-full max-w-3xl mb-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                    <p className="font-semibold text-center">
                        ⚠ Por favor no usar tildes.
                    </p>
                    <p className="font-semibold text-center">
                    Si ingresas mal tus datos, no podremos enviar tu pago, pero te notificaremos a tu correo.
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
                            placeholder="Nombre completo del titular"
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(validarTexto(e.target.value))}
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