import { CartItemData, saveCard } from './cart';
import { AppDispatch } from '..';

export function initCart(userTocken: string) {
    return async function (dispatch: AppDispatch) {
        if (!userTocken) return;

        const response = await fetch(
            `http://localhost:5000/cart/${userTocken}`
        );
        if (!response.ok || response.status !== 200)
            throw new Error(response.statusText);

        const data = (await response.json()) as [];

        const output = data.map((value: any) => new CartItem(value));

        dispatch(saveCard(output));
    };
}

export function updateCart(payload: {
    curentProduct: CartItemData;
    cart: CartItemData[];
    userToken: string;
}) {
    return async function (dispatch: AppDispatch) {
        const { curentProduct, userToken } = payload;
        const cartProductItems = [...payload.cart];
        const existingProductIndex = cartProductItems.findIndex(
            (product) => product.productID === curentProduct.productID
        );

        if (existingProductIndex === -1) {
            const response = await fetch('http://localhost:5000/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ curentProduct, userToken }),
            });
            if (response.ok && response.status === 200) {
                cartProductItems.push(curentProduct);
            }
        } else {
            curentProduct.amount +=
                cartProductItems[existingProductIndex].amount;
            const response = await fetch('http://localhost:5000/cart/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ curentProduct, userToken }),
            });
            if (response.ok && response.status === 200) {
                cartProductItems[existingProductIndex] = curentProduct;
            }
        }


        dispatch(saveCard(cartProductItems));
    };
}

class CartItem implements CartItemData {
    amount: number;
    id?: number | undefined;
    productID: number;
    constructor(value: any) {
        (this.id = parseInt(value.item_id)),
            (this.productID = parseInt(value.product_id));
        this.amount = parseInt(value.item_amount);
    }
}
