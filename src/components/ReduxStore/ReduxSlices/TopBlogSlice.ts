import { BlogInterface } from '@/components/api/GraphqlCalls'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: BlogInterface[] = []

export const topBlogSlice = createSlice({
  name: 'topBlog',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<BlogInterface[]>) => action.payload
  }
})

export const topBlogActions = topBlogSlice.actions
export const topBlogReducer = topBlogSlice.reducer