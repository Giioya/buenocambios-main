export const guardarEnBaseDeDatos = async (datos: any) => {
    try {
        const response = await fetch('/api/guardar', {  // Aquí debe coincidir con tu archivo en app/api/guardar/route.ts
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            console.error('Error en la respuesta de la API:', response.statusText);
            alert('Error al guardar en la base de datos');
            return;
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);
    } catch (error) {
        console.error('Error en la petición:', error);
        alert('Error en la petición al guardar');
    }
};


    