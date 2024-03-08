import { configureStore } from '@reduxjs/toolkit';
import popup from './store/popup/popup';
import coockies from './store/coockies/coockies';
import auth from './store/auth/auth';
import cartReducer from './store/cart/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    popup: popup,
    coockies: coockies,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
