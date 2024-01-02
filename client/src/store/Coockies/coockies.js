import { createSlice } from '@reduxjs/toolkit';

const coockies = createSlice({
    name: 'coockies',
    initialState: {
        userToken: null,
    },
    reducers: {
        init(state, action) {
            const payload = action.payload;
            state.userToken = payload;
        },
    },
});

export default coockies.reducer;
export const coockiesActions = coockies.actions;
