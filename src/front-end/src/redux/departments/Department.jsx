import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};


const departmentFilterReducer = createSlice({
  name: "departmentFilter",
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
  
} = departmentFilterReducer.actions;

export const departmentReducer = departmentFilterReducer.reducer;

