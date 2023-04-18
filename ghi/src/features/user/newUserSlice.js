import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:'',
}

export const newUserSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        handleNameChange: (state, action) => {
            state.name = action.payload
        },
        reset: () => initialState
    },
})

export const { handleNameChange, reset } = newUserSlice.actions;

export default newUserSlice.reducer;
