"use client";

import React from "react";
import Link from "next/link";

const Informacion = () => {
    return (
        <div className="container">
            <h2 className="text-4xl font-bold underline text-center mb-16">Guías</h2>
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
                <li className="text-2xl text-center mb-16">
                    <Link href="/informacion/guia-fallida" className="text-blue-500 underline">
                        Error <strong>Transacción fallida, intente más tarde</strong>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Informacion;






