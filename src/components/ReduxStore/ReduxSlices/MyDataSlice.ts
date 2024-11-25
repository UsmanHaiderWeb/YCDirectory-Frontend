import { BlogInterface, myDataInterface } from '@/components/api/GraphqlCalls'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: myDataInterface | null = null;

export const myDataSlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    updateMyData: (state, action: PayloadAction<myDataInterface>) => {
        return action.payload
    },
    addLikedBlogs: (state, action: PayloadAction<BlogInterface>) => {
        state.likedBlogs.unshift(action.payload);
        return state
    },
    removeLikedBlog: (state, action: PayloadAction<string>) => {
        let newLikedBlogs = state.likedBlogs.filter((blog: BlogInterface) => {
            return (action.payload != blog._id)
        })
        state.likedBlogs = newLikedBlogs;
        return state
    },
    addLikedCreatos: (state, action: PayloadAction<{_id: string}>) => {
        state.likedCreators.unshift(action.payload);
        return state
    },
    removeLikedCreators: (state, action: PayloadAction<string>) => {
        let newLikedCreatorsArray = state.likedCreators.filter((creator: {_id: string}) => {
            return (action.payload != creator._id)
        })
        state.likedCreators = newLikedCreatorsArray;
        return state
    },
    saveBlogs: (state, action: PayloadAction<BlogInterface>) => {
        state.savedBlogs.unshift(action.payload);
        return state
    },
    removeSavedBlog: (state, action: PayloadAction<string>) => {
        let newLikedBlogs = state.savedBlogs.filter((blog: BlogInterface) => {
            return (action.payload != blog._id)
        })
        state.savedBlogs = newLikedBlogs;
        return state
    },
    removeBlog: (state, action: PayloadAction<string>) => {
        let newBlogs = state.blogs.filter((blog: BlogInterface) => {
            return (action.payload != blog._id)
        })
        state.blogs = newBlogs;
        return state
    },
  },
})


export const myDataActions = myDataSlice.actions;
export const myDataReducer = myDataSlice.reducer