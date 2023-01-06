import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "user",
  value: [],
};

export const nameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    syncName: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncName } = nameSlice.actions;

export default nameSlice.reducer;
