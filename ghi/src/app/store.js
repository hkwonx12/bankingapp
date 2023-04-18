import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../Components/services/auth'
import loginReducer from '../Components/features/auth/loginSlice'
import signupReducer from '../Components/features/auth/signupSlice'
import newUserReducer from '../Components/features/user/newUserSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { usersApi } from '../Components/services/users'


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
