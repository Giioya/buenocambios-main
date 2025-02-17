"use client"; // Marca este componente como un cliente

import dynamic from "next/dynamic";

// Importa ErudaProvider de manera dinámica con SSR deshabilitado
const ErudaProvider = dynamic(
    () => import("./index").then((c) => c.ErudaProvider),
    {
        ssr: false,
    }
);

export default ErudaProvider;
