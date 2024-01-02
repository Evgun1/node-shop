import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productsArray: [],
        totalAmout: 0,
    },
    reducers: {
        addToCart(state, action) {
            // console.log(action.payload, state.productsArray);
            const payloadProduct = action.payload;
            const existingProductIndex = state.productsArray.findIndex(
                (product) => product.productID === payloadProduct.productID
            );
            if (existingProductIndex === -1) {
                state.productsArray.push(payloadProduct);
                state.totalAmout++;
            } else {
                console.log(payloadProduct.amount);
                state.productsArray[existingProductIndex].amount +=
                    payloadProduct.amount;
            }
            state.totalAmout = state.productsArray.length;
        },

        changeAmount(state, action) {
            const payload = action.payload;
            const indexProduct = state.productsArray.findIndex(
                (product) => product.productID === payload.productIDo
            );
            if (indexProduct === -1) return;

            state.productsArray[indexProduct].amount = payload.amount;

            if (state.productsArray[indexProduct].amount < 1) {
                state.productsArray.splice(indexProduct, 1);
                state.totalAmout = state.productsArray.length;
            }
        },
    },
});

export const { addToCart, changeAmount } = cartSlice.actions;

export default cartSlice.reducer;
