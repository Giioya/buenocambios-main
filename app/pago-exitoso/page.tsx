"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Definir tipos para los datos del usuario
interface DatosUsuario {
    nombreCompleto: string;
    telefonoNequi: string;
    cedula: string;
    tipoCuenta: string;
    monedaAEnviar: string;
    dineroARecibir: string;
    metodoPago: string;
    numeroContacto: string;
}

const PagoExitoso = () => {
    const router = useRouter();
    const [codigoReferencia, setCodigoReferencia] = useState<string>("Cargando...");
    const [datosUsuario, setDatosUsuario] = useState<DatosUsuario>({
        nombreCompleto: "",
        telefonoNequi: "",
        cedula: "",
        tipoCuenta: "",
        monedaAEnviar: "",
        dineroARecibir: "",
        metodoPago: "",
        numeroContacto: "",
    });

    useEffect(() => {
        // Obtener la referencia desde la API
        const obtenerReferencia = async () => {
            try {
                const response = await fetch("/api/obtener-referencia");
                if (!response.ok) throw new Error("Error al obtener referencia");
                
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setCodigoReferencia(data[0].referencia || "No disponible");
                } else {
                    setCodigoReferencia("No disponible");
                }
            } catch (error) {
                console.error("Error al obtener la referencia:", error);
                setCodigoReferencia("No disponible");
            }
        };

        // Cargar datos del usuario desde localStorage
        const cargarDatosUsuario = () => {
            setDatosUsuario({
                nombreCompleto: localStorage.getItem("nombre_completo") || "No disponible",
                telefonoNequi: localStorage.getItem("telefono_nequi") || "No disponible",
                cedula: localStorage.getItem("cedula") || "No disponible",
                tipoCuenta: localStorage.getItem("tipo_cuenta") || "N/A",
                monedaAEnviar: localStorage.getItem("moneda_a_enviar") || "No disponible",
                dineroARecibir: localStorage.getItem("dinero_a_recibir") || "No disponible",
                metodoPago: localStorage.getItem("metodo-pago") || "No disponible",
                numeroContacto: localStorage.getItem("numero-contacto") || "N/A",
            });
        };

        obtenerReferencia();
        cargarDatosUsuario();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-[45px] pb-24 px-6 relative">
            {/* Encabezado con logo y nombre alineados a la izquierda */}
            <div className="bg-[#589013] text-white w-full py-4 flex items-center justify-start rounded-t-xl shadow-md pl-4">
                <img src="/images/carga_buenocambios.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-full mr-3" />
                <h1 className="text-2xl font-bold">BuenoCambios</h1>
            </div>

            {/* Icono y mensaje de éxito */}
            <CheckCircle className="text-[#589013] w-24 h-24 mt-6 mb-4" />
            <h1 className="text-4xl font-bold text-[#589013]">Retiro Exitoso</h1>
            <p className="text-gray-600 mt-2 text-center">
                Gracias por usar nuestro servicio. <br />
                Su dinero llegará de 30-60 minutos a su cuenta bancaria.
            </p>

            {/* Código de referencia */}
            <div className="mt-6 bg-[#589013] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md">
                ID: {codigoReferencia}
            </div>

            {/* Caja de información de la transacción */}
            <div className="bg-white p-6 rounded-xl text-center max-w-md w-full mt-6 relative shadow-[0_0_15px_#589013] border border-[#589013]">
                <div className="absolute top-0 left-0 w-full h-6 bg-[#589013] rounded-t-lg border-b border-gray-300 shadow-sm"></div>
                <h2 className="text-lg font-bold text-[#589013] mb-4">Detalles de la Transacción</h2>

                <div className="text-left font-medium space-y-4">
                    <p className="flex justify-between"><span>Nombre:</span> <span className="font-normal">{datosUsuario.nombreCompleto}</span></p>
                    <p className="flex justify-between"><span>Teléfono Nequi:</span> <span className="font-normal">{datosUsuario.telefonoNequi}</span></p>
                    <p className="flex justify-between"><span>Cédula:</span> <span className="font-normal">{datosUsuario.cedula}</span></p>
                    <p className="flex justify-between"><span>Tipo de Cuenta:</span> <span className="font-normal">{datosUsuario.tipoCuenta}</span></p>
                    <p className="flex justify-between"><span>Moneda a Enviar:</span> <span className="font-normal">{datosUsuario.monedaAEnviar}</span></p>
                    <p className="flex justify-between"><span>Dinero a Recibir:</span> <span className="font-normal underline">{datosUsuario.dineroARecibir}</span></p>
                    <p className="flex justify-between"><span>Método de Pago:</span> <span className="font-normal">{datosUsuario.metodoPago}</span></p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-6 bg-[#589013] rounded-b-lg border-t border-gray-300 shadow-sm"></div>
            </div>

            {/* Mensaje de soporte */}
            <p className="text-red-500 mt-6 text-center">
                Si tienes algún inconveniente con tu pago, <br />
                contáctanos. ¡Estamos aquí para ayudarte!
            </p>

            {/* Botón de regreso */}
            <button
                onClick={() => router.push("/")}
                className="mt-6 px-6 py-3 bg-[#589013] text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Listo
            </button>
        </div>
    );
};

export default PagoExitoso;










