import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../Components/services/auth'
import loginReducer from '../Components/features/auth/loginSlice'
import signupReducer from '../Components/features/auth/signupSlice'
import newUserReducer from '../Components/features/user/newUserSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { usersApi } from '../Components/services/users'
import savingsReducer from '../Components/features/accounts/savingsSlice'
import { savingsApi } from '../Components/services/savings'
import { checkingAccountApi } from '../Components/services/checking'
import updateCheckingReducer from '../Components/features/transactions/updateCheckingAccountSlice'
import updateInvestmentReducer from '../Components/features/transactions/updateInvestmentAccountSlice'
import { investmentAccountApi } from '../Components/services/investment'

export const store = configureStore({
    reducer: {
        newUser: newUserReducer,
        login: loginReducer,
        signup: signupReducer,
        savings: savingsReducer,
        updateChecking: updateCheckingReducer,
        updateInvestment: updateInvestmentReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [savingsApi.reducerPath]: savingsApi.reducer,
        [checkingAccountApi.reducerPath]: checkingAccountApi.reducer,
        [investmentAccountApi.reducerPath]: investmentAccountApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([usersApi.middleware, authApi.middleware,
    savingsApi.middleware, checkingAccountApi.middleware, investmentAccountApi.middleware])
})

setupListeners(store.dispatch)
