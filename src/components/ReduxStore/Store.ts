import { configureStore } from '@reduxjs/toolkit';
import { myDataReducer } from './ReduxSlices/MyDataSlice';
import { searchReducer } from './ReduxSlices/SearchSlice';
import { topBlogReducer } from './ReduxSlices/TopBlogSlice';
import { shouldFetchAppDataReducer } from './ReduxSlices/ShouldFetcAppData';

export const ReduxStore = configureStore({
  reducer: {
    myDataSlice: myDataReducer,
    searchSlice: searchReducer,
    shouldFetchAppDataSlice: shouldFetchAppDataReducer,
    topBlogSlice: topBlogReducer
  }
});

export type AppDispatch = typeof ReduxStore.dispatch;
export type StoreType = ReturnType<typeof ReduxStore.getState>

export default ReduxStore;