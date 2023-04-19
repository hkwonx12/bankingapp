import { createSlice } from "@reduxjs/toolkit";

const initialState ={
fields: {
    total_amount: '',
    interest_rate: '',
    account_number: '',
    routing_number: '',
    owner_id: ''
},
ErrorNotification: null
}


const savingsSlice = createSlice ({
    name: 'savings',
    initialState,
    reducers:{
        handleTotalAmountChange: (state, action) =>{
            state.fields.total_amount = action.payload
        },
        handleInterestRateChange: (state, action) =>{
            state.fields.interest_rate = action.payload
        },
        handleAccountNumberChange: (state, action) =>{
            state.fields.account_number = action.payload
        },
        handleRoutingNumberChange: (state, action) =>{
            state.fields.routing_number = action.payload
        },
        handleOwnerIdChange: (state, action) =>{
            state.fields.owner_id = action.payload
        },
        error: (state, action) =>{
            state.ErrorNotification = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handleTotalAmountChange,
    handleInterestRateChange,
    handleAccountNumberChange,
    handleRoutingNumberChange,
    handleOwnerIdChange,
    reset,
    error
} =savingsSlice.actions;
export default savingsSlice.reducer
