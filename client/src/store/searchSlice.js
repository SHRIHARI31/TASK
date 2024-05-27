import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: '',
};

const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export default searchReducer.reducer;

export const { updateName } = searchReducer.actions;
