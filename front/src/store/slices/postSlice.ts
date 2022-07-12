import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
    _id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    likes: string[];
    comments: string[];
    retweets: string[];
    authorAddress: string;
}

export interface postState {
    posts: Post[];
    refreshPosts: boolean;
}

const initialState: postState = {
    posts: [],
    refreshPosts: false,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        removePost: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.filter(post => post._id !== action.payload._id)
        },
        setRefreshPosts: (state, action: PayloadAction<boolean>) => {
            state.refreshPosts = action.payload
        },
        purgePostState: (state) => {
            state.posts = []
            state.refreshPosts = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPosts, setRefreshPosts, purgePostState, addPost, removePost } = postSlice.actions

export default postSlice.reducer