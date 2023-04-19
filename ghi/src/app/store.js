import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../Components/services/auth'
import loginReducer from '../Components/features/auth/loginSlice'
import signupReducer from '../Components/features/auth/signupSlice'
import checkingAccountReducer from '../Components/features/accounts/checkingSlice'
import newUserReducer from '../Components/features/user/newUserSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { usersApi } from '../Components/services/users'
import savingsReducer from '../Components/features/accounts/savingsSlice'
import { savingsApi } from '../Components/services/savings'


export const store = configureStore({
    reducer: {
        newUser: newUserReducer,
        login: loginReducer,
        signup: signupReducer,
        savings: savingsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [savingsApi.reducerPath]: savingsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([usersApi.middleware, authApi.middleware, savingsApi.middleware])
})

setupListeners(store.dispatch)
