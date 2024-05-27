import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  secondName: "",
  updatedData: [],
};

const updateSlice = createSlice({
  name: "updateReducer",
  initialState,
  reducers: {
    updateId: (state, action) => {
      state.id = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateSecondName: (state, action) => {
      state.secondName = action.payload;
    },
    updateEditedValue: (state, action) => {
      state.updatedData = action.payload;
    },
  },
});

export default updateSlice.reducer;
export const { updateId, updateName, updateSecondName, updateEditedValue } =
  updateSlice.actions;
