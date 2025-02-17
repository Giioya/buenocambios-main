"use client";

import React from "react";

const Informacion: React.FC = () => {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                    Información Legal
                </h1>

                {/* Términos y Condiciones */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Términos y Condiciones</h2>
                    <p className="text-gray-600 mb-4">
                        Al utilizar nuestra aplicación de cambio de WLD por dinero fiat, aceptas cumplir con los siguientes términos y condiciones:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>La aplicación permite vender monedas Worldcoin de manera segura y eficiente.</li>
                        <li>Se requiere que proporciones información veraz y actualizada.</li>
                        <li>Solo pueden usar la aplicación personas mayores de 18 años.</li>
                        <li>No se permite el uso de la aplicación para actividades ilegales o fraudulentas.</li>
                        <li>No nos hacemos responsables por errores en los datos ingresados por el usuario.</li>
                        <li>Nos reservamos el derecho de modificar las tasas de cambio y comisiones en cualquier momento.</li>
                        <li>Nos reservamos el derecho de cancelar transacciones sospechosas de fraude o actividad ilegal.</li>
                    </ul>
                    <p className="text-gray-600 mb-4">
                        Al continuar utilizando esta aplicación, aceptas estos términos en su totalidad. Si no estás de acuerdo, por favor, no utilices nuestra plataforma.
                    </p>
                </section>

                <hr className="border-gray-300 my-6" />

                {/* Política de Privacidad */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Política de Privacidad</h2>
                    <p className="text-gray-600 mb-4">
                        En nuestra aplicación, respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. Al utilizar nuestros servicios, aceptas las siguientes políticas de privacidad:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Recopilamos datos personales y bancarios para facilitar las transacciones de cambio de WLD por dinero fiat.</li>
                        <li>Tus datos son almacenados de forma segura y no se compartirán con terceros sin tu consentimiento, salvo en casos legales requeridos.</li>
                        <li>Utilizamos medidas de seguridad avanzadas para proteger tu información de accesos no autorizados.</li>
                        <li>Nos reservamos el derecho de actualizar esta política de privacidad. Se te notificará cualquier cambio significativo.</li>
                    </ul>
                    <p className="text-gray-600 mb-4">
                        Al utilizar nuestra aplicación, confirmas que has leído y aceptas estas políticas de privacidad.
                    </p>
                </section>

                <hr className="border-gray-300 my-6" />

                {/* Modificaciones y Contacto */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Modificaciones y Contacto</h2>
                    <p className="text-gray-600 mb-4">
                        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se notificará a los usuarios con anticipación sobre cualquier cambio significativo. 
                    </p>
                    <p className="text-gray-600">
                        Si tienes preguntas sobre estos términos o nuestra política de privacidad, puedes contactarnos a: buenocambios@gmail.com
                    </p>
                </section>

                <button 
                    onClick={() => window.history.back()} 
                    className="button-group"
                    >
                    Atrás
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        Última actualización: Febrero 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Informacion;
