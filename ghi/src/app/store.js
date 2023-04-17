import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../services/auth'
import loginReducer from '../features/auth/loginSlice'
import signupReducer from '../features/auth/signupSlice'
import newUserReducer from '../features/user/newUserSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { usersApi } from '../services/users'


export const store = configureStore({
    reducer: {
        newUser: newUserReducer,
        login: loginReducer,
        signup: signupReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([usersApi.middleware, authApi.middleware])
})

setupListeners(store.dispatch)
