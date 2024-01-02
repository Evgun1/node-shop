import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisiable: false },
    reducers: {
        toggle(state, action) {
            state.cartIsVisiable = !state.cartIsVisiable;
        },
    },
});

export default uiSlice.reducer;
export const uiAction = uiSlice.actions;
