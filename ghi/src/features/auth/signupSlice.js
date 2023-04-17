import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    fields: {
        username:'',
        password: '',
        passwordConfirmation: ''
    },
    errorMessage: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        handleUsernameChange: (state, action) =>{
            state.fields.username = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        handlePasswordConfirmationChange: (state, action) => {
            state.fields.passwordConfirmation = action.payload
        },
        error: (state, action) =>{
            state.errorMessage = action.paylaod
        },
        reset: () => initialState
    }
})

export const {
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleUsernameChange,
    reset,
    error
} =signupSlice.actions;
export default signupSlice.reducer
