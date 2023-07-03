import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  processId: '',
  year: '',
  month: '',
};


const projectFilterReducer = createSlice({
  name: "projectFilter",
  initialState,
  reducers: {
    reset: (state, action) => {
      return initialState;
    },

    updateName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },

    updateProcessId: (state, action) => {
      return {
        ...state,
        processId: action.payload
      }
    },

    updateYear: (state, action) => {
      return {
        ...state,
        year: action.payload,
      }
    },

    updateMonth: (state, action) => {
      return {
        ...state,
        month: action.payload
      }
    }

  },
});


export const {
  reset, 
  updateName,
  updateProcessId,
  updateYear,
  updateMonth,
  
} = projectFilterReducer.actions;

export const projectReducer = projectFilterReducer.reducer;

