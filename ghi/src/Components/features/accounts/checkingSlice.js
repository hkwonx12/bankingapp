import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    fields: {
        totalamount:'',
        owner_id: ''
    },
    ErrorNotification: null
}
const checkingAccountSlice = createSlice({
    name: "checkingaccount",
    initialState,
    reducers: {
        handleTotalAmountChange: (state, action) => {
            state.fields.total_amount = action.payload
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
    handleTotalAmountChange,
    handleOwnerIdChange,
    reset,
    error
} = checkingAccountSlice.actions
export default checkingAccountSlice.reducer
