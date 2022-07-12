import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'


import userReducer from './slices/userSlice'
import postReducer from './slices/postSlice'
import appReducer from './slices/appSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootRucer = combineReducers({
    user: userReducer,
    post: postReducer,
    app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootRucer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch