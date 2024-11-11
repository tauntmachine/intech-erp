import { createSlice } from '@reduxjs/toolkit';

// Initial state for daySelector
const initialState = {
  day: 'Monday', // Default day
};

const daySelectorSlice = createSlice({
  name: 'daySelector',
  initialState,
  reducers: {
    setDay(state, action) {
      state.day = action.payload; // Update the selected day
    },
  },
});

export const { setDay } = daySelectorSlice.actions;
export default daySelectorSlice.reducer;
