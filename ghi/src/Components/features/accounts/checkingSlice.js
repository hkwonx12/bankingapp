import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    fields: {
        total_amount:'',
        account_number: '',
        routing_number: '',
        owner_id: ''
    },
    ErrorNotification: null
}

const checkingAccountSlice = createSlice({
    name: "checkingaccount",
    initialState,
    reducers: {
        handleTotalAmount: (state, action) => {
            state.fields.total_amount = action.payload
        },
        handleAccountNumber: (state, action) => {
            state.fields.account_number = action.payload
        },
        handleRoutingNumberChange: (state, action) => {
            state.fields.routing_number = action.payload
        },
        handleOwnerIdChange: (state, action) => {
            state.fields.owner_id = action.payload
        },
        error: (state, action) => {
            state.ErrorNotification = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handleTotalAmount,
    handleAccountNumber,
    handleRoutingNumberChange,
    handleOwnerIdChange,
    reset,
    error
} = checkingAccountSlice.actions
export default checkingAccountSlice.reducer
