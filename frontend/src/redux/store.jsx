import { configureStore } from "@reduxjs/toolkit";
import allQuestionsReducer from "./redux-thunk/allQuestionsState";
const store = configureStore({
  reducer: { allQuestions: allQuestionsReducer },
});

export { store };
