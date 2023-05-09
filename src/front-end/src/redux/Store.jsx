import { configureStore } from "@reduxjs/toolkit";
import { researcherReducer } from "./researchers/Researcher";


const store = configureStore({
  reducer : {
    researcherFilter: researcherReducer,
    

  }
})
export default store;
