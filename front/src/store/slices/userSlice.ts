import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
    _id: string;
    address: string;
    email: string;
    username: string;
};

export interface UserState {
    connected: boolean
    currentAccount: string
    user: User | null;
}

const initialState: UserState = {
    connected: false,
    currentAccount: "",
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentAccount: (state, action: PayloadAction<string>) => {
            state.currentAccount = action.payload;
            state.connected = action.payload.length > 0;
            console.log(state.connected);
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentAccount, setUser } = userSlice.actions

export default userSlice.reducer