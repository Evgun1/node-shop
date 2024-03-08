import { createSlice } from '@reduxjs/toolkit';
import { log } from 'console';

const popup = createSlice({
  name: 'popup',
  initialState: { popupContent: null },
  reducers: {
    toggle(state, action) {
      state.popupContent = action.payload;
    },
  },
});

export default popup.reducer;
export const { toggle } = popup.actions;
