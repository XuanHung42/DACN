import { configureStore } from "@reduxjs/toolkit";
import { researcherReducer } from "./researchers/Researcher";
import { departmentReducer } from "./departments/Department";
import { projectReducer } from "./projects/Project";
import { postReducer } from "./posts/Posts";
import authReducer from "./account/Account"
const store = configureStore({
  reducer : {
    researcherFilter: researcherReducer,
    departmentFilter: departmentReducer,
    projectFilter : projectReducer,
    postFilter: postReducer,
    auth: authReducer,
  }
})
export default store;
