import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
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


  },
});


export const {
  reset, 
  updateTitle,
  
} = postFilterReducer.actions;

export const postReducer = postFilterReducer.reducer;

