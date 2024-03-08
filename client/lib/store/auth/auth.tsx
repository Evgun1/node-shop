import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { count } from 'console';
import { create } from 'domain';

export interface UserData {
  email: string;
  password: string;
  role?: string;
}

// type UserObject
type UserState = {
  user: UserData | null;
};
const initialState: UserState = { user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
    logOut(state, action) {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
