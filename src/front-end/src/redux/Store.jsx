import { configureStore } from "@reduxjs/toolkit";
import { researcherReducer } from "./researchers/Researcher";
import { departmentReducer } from "./departments/Department";


const store = configureStore({
  reducer : {
    researcherFilter: researcherReducer,
    departmentFilter: departmentReducer,

  }
})
export default store;
