import { createSlice } from '@reduxjs/toolkit';

type CoockieState = {
    userToken: null | string;
};

const initialState: CoockieState = {
    userToken: null,
};

const coockies = createSlice({
    name: 'coockies',
    initialState,
    reducers: {
        init(state, action) {
            const payload = action.payload;
            state.userToken = payload;
        },
    },
});

export default coockies.reducer;
export const coockiesActions = coockies.actions;
