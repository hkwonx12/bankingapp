import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../services/auth'
import loginReducer from '../features/auth/loginSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'


export const store = configureStore({
reducer: {
    login: loginReducer,
    [authApi.reducerPath]: authApi.reducer
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch)
