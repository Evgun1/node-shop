import { addToCart, setCartProducts } from './cart';

export function initCart(userTocken) {
    return async function (dispatch) {
        if (!userTocken) return;

        const response = await fetch(
            `http://localhost:5000/cart/${userTocken}`
        );
        if (!response.ok || response.status !== 200)
            throw new Error(response.statusText);

        const data = await response.json();
        dispatch(setCartProducts(data));
    };
}

export function updateCart(payload) {
    return async function (dispatch) {
        const { curentProduct } = payload;
        const cart = [...payload.cart];
        console.log(cart, curentProduct);
        const existingProductIndex = cart.findIndex(
            (product) => product.productID === curentProduct.productID
        );

        if (existingProductIndex === -1) {
            cart.push(curentProduct);
        } else {
            cart[existingProductIndex].amount += curentProduct.amount;
        }
        console.log(cart);

        //         console.log(cartItem);
        //         const response = await fetch('http://localhost:5000/cart/add', {
        //             method: 'POST',
        //             body: JSON.stringify(cartItem),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         });

        //         if (!response.ok || response.status !== 200)
        //             throw new Error(response.statusText);
        //         dispatch(addToCart(cartItem));
    };
}
