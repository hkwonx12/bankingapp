import { createSlice } from "@reduxjs/toolkit";

const initialState ={
fields: {
    date: '',
    amount: '',
    institution: '',
    investment_account_id: ''
},
ErrorNotification: null
}


const UpdateInvestmentSlice = createSlice ({
    name: 'deposit',
    initialState,
    reducers:{
        handleDateChange: (state, action) => {
            state.fields.date = action.payload
        },
        handleAmountChange: (state, action) =>{
            state.fields.amount = action.payload
        },
        handleInstitutionChange: (state, action) =>{
            state.fields.institution = action.payload
        },
        handleInvestmentAccountIdChange: (state, action) =>{
            state.fields.checking_accound_id = action.payload
        },
        error: (state, action) =>{
            state.ErrorNotification = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handleDateChange,
    handleAmountChange,
    handleInstitutionChange,
    handleInvestmentAccountIdChange,
    reset,
    error
} =UpdateInvestmentSlice.actions;
export default UpdateInvestmentSlice.reducer
