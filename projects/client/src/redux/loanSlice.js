import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
    name: "loans",
        initialState: {
            value: [],
        },
    reducers: {
        loanSync: (state, action) => {
        state.value = action.payload;
        },
        loanDel: (state) => {
            state.value = []
        },
    },
});

// Action creators are generated for each case reducer function
export const { loanSync, loanDel } = loanSlice.actions;

export default loanSlice.reducer;
