import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface appState {
    metamaskInstalled: boolean
    currentMetamaskAccount: string
    selectedNav: string
}

const initialState: appState = {
    currentMetamaskAccount: "",
    metamaskInstalled: false,
    selectedNav: "Home",
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

        setSelectedNav: (state, action: PayloadAction<string>) => {
            state.selectedNav = action.payload
        },
        purgeAppState: (state) => {
            state.currentMetamaskAccount = ""
            state.metamaskInstalled = false
            state.selectedNav = "Home"
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMetamaskInstalled, setCurrentMetamaskAccount, setSelectedNav, purgeAppState } = appSlice.actions

export default appSlice.reducer