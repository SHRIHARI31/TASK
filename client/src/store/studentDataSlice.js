import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  loading: false,
  error: false,
};

const studentDataSlice = createSlice({
  name: "studentDataReducer",
  initialState,
  reducers: {
    fetchData(state, action) {
      state.data = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    error(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(getStudentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentData.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteStudentData.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (student) => student.id !== action.payload
        );
        state.error = false;
        state.loading = false;
      })
      .addCase(deleteStudentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudentData.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateStudentData.fulfilled, (state, action) => {
        const updatedStudent = action.payload;
        const index = state.data.findIndex(
          (student) => student.id === updatedStudent.id
        );
        if (index !== -1) {
          const newData = [
            ...state.data.slice(0, index),
            updatedStudent,
            ...state.data.slice(index + 1),
          ];
          state.data = newData;
        }
        state.error = false;
        state.loading = false;
      });
  },
});

export const getStudentData = createAsyncThunk(
  "studentDataReducer/get",
  async () => {
    try {
      const data = await axios.get("/api/get-student-details");
      return data.data.message;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteStudentData = createAsyncThunk(
  "studentDataDelete/delete",
  async (id) => {
    try {
      const response = await axios.delete(`/api/delete-student-details/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateStudentData = createAsyncThunk(
  "studentDataUpdate/update",
  async ({ id, updatedData }) => {
    try {
      const response = await axios.put(
        `/api/update-student-details/${id}`,
        updatedData
      );
      return response.data.message;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export default studentDataSlice.reducer;
export const { fetchData, loading, error } = studentDataSlice.actions;
