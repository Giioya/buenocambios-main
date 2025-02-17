"use client";

import { useEffect, useState } from "react";
import { PayBlock } from "@/components/Pay";
import { guardarEnBaseDeDatos } from "@/app/lib/guardarDatos";

export default function Confirmacion() {
    const [datos, setDatos] = useState({
        nombreCompleto: "",
        telefonoNequi: "",
        cedula: "",
        tipoCuenta: "",
        monedaAEnviar: "",
        dineroARecibir: "",
        metodoPago: ""
    });

    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    useEffect(() => {
        // Recuperar los datos del localStorage
        const nombreCompleto = localStorage.getItem("nombre_completo") || "";
        const telefonoNequi = localStorage.getItem("telefono_nequi") || "";
        const cedula = localStorage.getItem("cedula") || "";
        const tipoCuenta = localStorage.getItem("tipo_cuenta") || "";
        const monedaAEnviar = localStorage.getItem("moneda_a_enviar") || "";
        const dineroARecibir = localStorage.getItem("dinero_a_recibir") || "";
        const metodoPago = localStorage.getItem("metodo-pago") || "";

        // Actualizar el estado con los datos recuperados
        setDatos({
            nombreCompleto,
            telefonoNequi,
            cedula,
            tipoCuenta,
            monedaAEnviar,
            dineroARecibir,
            metodoPago
        });
    }, []);

    const irAVistaNequi = () => {
        window.history.back();
    };

    const confirmarTransaccion = async () => {
        await guardarEnBaseDeDatos(datos);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-20">
        {/* Aviso en rojo */}
        <div className="w-full max-w-3xl mb-4">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <p className="font-semibold">
                    ⚠ Por favor verifica tu información.
                </p>
                <p>
                    En caso de que los datos no coincidan, <strong>BuenoCambios</strong> no enviará el pago hasta que te comuniques con soporte por motivos de seguridad.
                </p>
            </div>
        </div>

            {/* Contenedor de Datos */}
            <div className="spana">
                <h2 className="text-2xl font-bold mb-4 text-center">Información ingresada:</h2>

                <div className="space-y-8">
                <p><strong>Nombre:</strong> <span className="underline float-right">{datos.nombreCompleto}</span></p>
                    <p><strong>Número para pago:</strong> <span className="underline float-right">{datos.telefonoNequi}</span></p>
                    <p><strong>Cédula de ciudadanía:</strong> <span className="underline float-right">{datos.cedula}</span></p>
                    <p><strong>Tipo de cuenta:</strong> <span className="underline float-right">{datos.tipoCuenta}</span></p>
                    <p><strong>Cantidad de monedas a retirar:</strong> <span className="underline float-right">{datos.monedaAEnviar}</span></p>
                    <p><strong>Cantidad a recibir (COP):</strong> <span className="underline float-right">{datos.dineroARecibir}</span></p>
                    <p><strong>Método de pago:</strong> <span className="underline float-right">{datos.metodoPago}</span></p>
                </div>

                {/* Checkbox de Términos y Condiciones */}
                <div className="mt-4">
                    <label className="inline-flex items-center">
                        <input 
                            type="checkbox" 
                            className="form-checkbox text-green-600 w-4 h-4"
                            checked={aceptaTerminos}
                            onChange={(e) => setAceptaTerminos(e.target.checked)}
                        />
                        <span className="ml-2 text-gray-700">
                            He leído y acepto los  <a href="/Terminos" className="text-blue-500 underline">Términos y Condiciones</a>
                        </span>
                    </label>
                </div>

                {/* Botones */}
                <div className="button-group">
                    <button 
                        onClick={irAVistaNequi}
                        className="button-group"
                    >
                        Atrás
                    </button>
                    <button 
                        onClick={confirmarTransaccion} 
                        disabled={!aceptaTerminos} 
                        className={`button-group ${
                            aceptaTerminos ? 'bg-[#3b5110] hover:bg-[#589013]' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <PayBlock />
                    </button>
                </div>
            </div>
        </div>
    );
}





