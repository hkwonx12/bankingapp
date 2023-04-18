import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    fields: {
        full_name:'',
        username:'',
        password: '',
        email:'',
        address:'',
        phone:'',
        dob:'',
        checking:'',
        savings:'',
        investment:''
        // passwordConfirmation: ''
    },
    ErrorNotification: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        handleFullNameChange: (state, action) =>{
            state.fields.full_name = action.payload
        },
        handleUsernameChange: (state, action) =>{
            state.fields.username = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        handleEmailChange: (state, action) => {
            state.fields.email = action.payload
        },
        handleAddressChange: (state, action) => {
            state.fields.address = action.payload
        },
        handlePhoneChange: (state, action) => {
            state.fields.phone = action.payload
        },
        handleDobChange: (state, action) => {
            state.fields.dob = action.payload
        },
        handleCheckingChange: (state, action) => {
            state.fields.checking = action.payload
        },
        handleSavingsChange: (state, action) => {
            state.fields.savings = action.payload
        },
        handleInvestmentChange: (state, action) => {
            state.fields.investment = action.payload
        },
        // handlePasswordConfirmationChange: (state, action) => {
        //     state.fields.passwordConfirmation = action.payload
        // },
        error: (state, action) =>{
            state.ErrorNotification = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handlePasswordChange,
    // handlePasswordConfirmationChange,
    handleUsernameChange,
    handleFullNameChange,
    handleEmailChange,
    handleAddressChange,
    handlePhoneChange,
    handleDobChange,
    handleCheckingChange,
    handleSavingsChange,
    handleInvestmentChange,
    reset,
    error
} =signupSlice.actions;
export default signupSlice.reducer
