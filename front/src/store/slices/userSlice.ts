import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
    _id: string;
    address: string;
    email: string;
    username: string;
};

export interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        clearUserState: (state) => {
            state.user = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUserState } = userSlice.actions

export default userSlice.reducer