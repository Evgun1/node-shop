import { useState } from 'react';

export default function () {
    const [isSending, setIsSending] = useState(false);

    async function saveCart(cart, userToken) {
        if (!cart || !cart.length || !userToken) return;
        const body = {
            products: cart.productsArray,
            userToken,
        };
        const response = await fetch('http://localhost:5000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok || response.status !== 200) setIsSending(false);

        const data = await response.json();
        console.log(data);
        setIsSending(true);
    }

    return {
        isSending,
        saveCart,
    };
}
