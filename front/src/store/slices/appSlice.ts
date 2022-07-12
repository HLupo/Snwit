import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface appState {
    metamaskInstalled: boolean
    currentMetamaskAccount: string
    selectedNav: string
    refreshPosts: boolean
}

const initialState: appState = {
    metamaskInstalled: false,
    currentMetamaskAccount: "",
    selectedNav: "Home",
    refreshPosts: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMetamaskInstalled: (state, action: PayloadAction<boolean>) => {
            state.metamaskInstalled = action.payload
        },
        setCurrentMetamaskAccount: (state, action: PayloadAction<string>) => {
            state.currentMetamaskAccount = action.payload
        },
        clearAppState: (state) => {
            state.metamaskInstalled = false
            state.currentMetamaskAccount = ""
            state.selectedNav = "Home"
            state.refreshPosts = false
        },
        setSelectedNav: (state, action: PayloadAction<string>) => {
            state.selectedNav = action.payload
        },
        setRefreshPosts: (state, action: PayloadAction<boolean>) => {
            state.refreshPosts = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMetamaskInstalled, setCurrentMetamaskAccount, clearAppState, setSelectedNav, setRefreshPosts } = appSlice.actions

export default appSlice.reducer