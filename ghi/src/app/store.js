import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import loginReducer from '../features/counter/loginSlice'


export const store = configureStore({
reducer: {
    login: loginReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware)
})
