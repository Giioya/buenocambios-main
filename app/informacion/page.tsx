"use client";

import React from "react";
import Link from "next/link";

const Informacion = () => {
    const borrarLocalStorage = () => {
        localStorage.clear();
        alert("Local Storage eliminado.");
    };

    return (
        <div className="container">
            <h2 className="text-4xl text-black font-bold underline text-center mb-16">Guías</h2>
            <ul>
                <li className="text-2xl text-center mb-16">
                    <Link href="/informacion/guia-retiro" className="text-blue-500 underline">
                        ¿Cómo retirar con <strong>BuenoCambios</strong>?
                    </Link>
                </li>
                <li className="text-2xl text-center mb-16">
                    <Link href="/informacion/guia-boveda" className="text-blue-500 underline">
                        Quiero retirar, pero el sistema me dice que estoy <strong>sin fondos</strong>. ¿Qué debo hacer?
                    </Link>
                </li>
            </ul>

            {/* Botón para borrar el Local Storage */}
            <div className="text-center mt-8 mb-32">
                <button
                    onClick={borrarLocalStorage}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Borrar Local Storage
                </button>
            </div>
        </div>
    );
};

export default Informacion;






