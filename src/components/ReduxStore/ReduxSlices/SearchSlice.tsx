/*************  ✨ Codeium Command ⭐  *************/
import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update: (state, {payload}: {payload: string[]}) => payload
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;