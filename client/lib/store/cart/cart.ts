import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItemData {
  id?: number;
  productID: number;
  amount: number;
}

export type CartState = {
  productsArray: CartItemData[];
  totalAmount: number;
};

const initialState: CartState = {
  productsArray: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveCard(state, action: PayloadAction<CartItemData[]>) {
      const payload = action.payload;
      console.log(payload);
      if (payload && payload.length) {
        state.productsArray = payload;
        state.totalAmount = payload.length;
      }
    },

    removeCart(state, action: PayloadAction<number>) {
      const payload = action.payload;
      const index = state.productsArray.findIndex(
        (product) => product.productID === payload
      );
      state.productsArray.splice(index, 1);
      console.log(state.productsArray);

      // console.log(index);
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
        state.totalAmount = state.productsArray.length;
      }
    },
  },
});

export const { saveCard, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
