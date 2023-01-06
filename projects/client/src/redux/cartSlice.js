import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "carts",
        initialState: {
            value: [],
        },
    reducers: {
        cartSync: (state, action) => {
            state.value = action.payload;
        },
        cartDel: (state) => {
            state.value = []
        },
    },
});

// Action creators are generated for each case reducer function
export const { cartSync, cartDel } = cartSlice.actions;

export default cartSlice.reducer;
