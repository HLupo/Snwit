import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface appState {
    metamaskInstalled: boolean
    currentMetamaskAccount: string
}

const initialState: appState = {
    metamaskInstalled: false,
    currentMetamaskAccount: "",
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
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMetamaskInstalled, setCurrentMetamaskAccount, clearAppState } = appSlice.actions

export default appSlice.reducer