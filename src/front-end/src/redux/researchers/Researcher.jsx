import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: ""
};


const researcherFilterReducer = createSlice({
  name: "researcherFilter",
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

    updateEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },

  },
});


export const {
  reset, 
  updateName,
  updateEmail
  
} = researcherFilterReducer.actions;

export const researcherReducer = researcherFilterReducer.reducer;

