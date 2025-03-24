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
        let cleanValue = value.replace(/\D/g, ""); // Solo números

        if (cleanValue.length > 3) {
            cleanValue = cleanValue.slice(0, 3) + "-" + cleanValue.slice(3);
        }
        if (cleanValue.length > 10) {
            cleanValue = cleanValue.slice(0, 10) + "-" + cleanValue.slice(10);
        }
        return cleanValue;
    };

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefonoNequi(formatAccountNumber(e.target.value));
    };

    const guardarYRedirigir = () => {
        if (nombreCompleto.trim() === "" || telefonoNequi.trim() === "" || cedula.trim() === "" || tipoCuenta.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        localStorage.setItem("nombre_completo", nombreCompleto);
        localStorage.setItem("telefono_nequi", telefonoNequi);
        localStorage.setItem("cedula", cedula);
        localStorage.setItem("tipo_cuenta", tipoCuenta);
        localStorage.setItem("tipoDocumento", tipoDocumento);
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
                    <label htmlFor="telefono_nequi">Número de cuenta</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="telefono_nequi"
                            placeholder="Número de cuenta Bancolombia"
                            value={telefonoNequi}
                            onChange={(e) => {
                                setTelefonoNequi(e.target.value); 
                                handleTelefonoChange(e);
                            }}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select
                        id="tipoDocumento"
                        value={tipoDocumento}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                    >
                        <option value="" disabled>Selecciona tipo de documento</option>
                        <option value="Cedula de ciudadania">Cédula de ciudadania</option>
                        <option value="Cedula de extranjeria">Cédula de extranjeria</option>                   
                        <option value="NIT">NIT</option>
                        <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                        <option value="PPT">PPT</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Fideicomiso">Fideicomiso</option>
                        <option value="Registro civil">Registro civil</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="cedula">Cédula de ciudadanía</label>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            id="cedula"
                            placeholder="Cédula del titular"
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
                            telefonoNequi.trim() === "" || 
                            cedula.trim() === "" || 
                            tipoCuenta.trim() === ""
                        }
                        className={`${
                            nombreCompleto.trim() !== "" && telefonoNequi.trim() !== "" && cedula.trim() !== "" && tipoCuenta.trim() !== "" 
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