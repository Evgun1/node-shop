import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './Cart/cart';
import popup from './popup/popup';
import coockies from './Coockies/coockies';

export default configureStore({
    reducer: {
        cart: cartReducer,
        popup: popup,
        coockies: coockies,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
