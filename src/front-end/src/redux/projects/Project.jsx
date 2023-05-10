import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
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


  },
});


export const {
  reset, 
  updateName,
  
} = projectFilterReducer.actions;

export const projectReducer = projectFilterReducer.reducer;

