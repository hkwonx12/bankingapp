import { createSlice } from "@reduxjs/toolkit";

const initialState ={
fields: {
    date: '',
    amount: '',
    institution: '',
    checking_account_id: '',
},
ErrorNotification: null
}


const updateCheckingSlice = createSlice ({
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
        handleCheckingsAccountIdChange: (state, action) =>{
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
    handleCheckingsAccountIdChange,
    reset,
    error
} =updateCheckingSlice.actions;
export default updateCheckingSlice.reducer
