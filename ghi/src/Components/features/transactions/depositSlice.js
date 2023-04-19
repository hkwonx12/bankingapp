import { createSlice } from "@reduxjs/toolkit";

const initialState ={
fields: {
    date: '',
    amount: '',
    institution: '',
    checking_accound_id: '',
    savings_account_id: '',
    investment_account_id: ''
},
ErrorNotification: null
}


const depositSlice = createSlice ({
    name: 'deposit',
    initialState,
    reducers:{
        handleDateChange: (state, action) => {
            state.fields.amount = actionl.payload
        },
        handleAmountChange: (state, action) =>{
            state.fields.amount = action.payload
        },
        handleInstitutionChange: (state, action) =>{
            state.fields.institution = action.payload
        },
        handleCheckingsAccountIdChange: (state, action) =>{
            state.fields.checking_accound_id = action.payload
        },
        handleSavingsAccountIdChange: (state, action) =>{
            state.fields.savings_account_id = action.payload
        },
        handleInvestmentAccountIdChange: (state, action) =>{
            state.fields.investment_account_id = action.payload
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
    handleCheckingsAccountIdChange,
    handleSavingsAccountIdChange,
    handleInvestmentAccountIdChange,
    reset,
    error
} =depositSlice.actions;
export default depositSlice.reducer
