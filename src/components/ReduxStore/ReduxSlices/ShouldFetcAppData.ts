import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: boolean = false;

export const shouldFetchAppDataSlice = createSlice({
    name: 'shouldFetchAppData',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<boolean>) => action.payload,
    }
})

export const ShouldFetchActions = shouldFetchAppDataSlice.actions
export const shouldFetchAppDataReducer = shouldFetchAppDataSlice.reducer