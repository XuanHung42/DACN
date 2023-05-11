import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  shortDescription: ""
};


const postFilterReducer = createSlice({
  name: "postFilter",
  initialState,
  reducers: {
    reset: (state, action) => {
      return initialState;
    },

    updateTitle: (state, action) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    
    updateShortDescription: (state, action) => {
      return {
        ...state,
        shortDescription: action.payload,
      };
    },



  },
});


export const {
  reset, 
  updateTitle,
  updateShortDescription,
  
} = postFilterReducer.actions;

export const postReducer = postFilterReducer.reducer;

