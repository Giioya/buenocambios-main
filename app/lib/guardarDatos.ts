// Importa el tipo
import { TransactionData } from '@/app/api/guardar/route';

const submitTransaction = async (transactionData: TransactionData) => {
    const response = await fetch('/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
    });

    const result = await response.json();

    if (response.ok) {
        console.log('Transaction inserted:', result);
    } else {
        console.error('Error inserting transaction:', result);
    }
};





    