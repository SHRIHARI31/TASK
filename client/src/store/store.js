import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import studentDataReducer from "./studentDataSlice";
import updateReducer from "./updateSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    studentData: studentDataReducer,
    updater: updateReducer,
    search: searchReducer,
  },
});

export default store;
