import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/cart';
import popup from './popup/popup';
import coockies from './coockies/coockies';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        popup: popup,
        coockies: coockies,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
