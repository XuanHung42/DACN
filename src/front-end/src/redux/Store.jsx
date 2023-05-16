import { configureStore } from "@reduxjs/toolkit";
import { researcherReducer } from "./researchers/Researcher";
import { departmentReducer } from "./departments/Department";
import { projectReducer } from "./projects/Project";
import { postReducer } from "./posts/Posts";


const store = configureStore({
  reducer : {
    researcherFilter: researcherReducer,
    departmentFilter: departmentReducer,
    projectFilter : projectReducer,
    postFilter: postReducer,

  }
})
export default store;
