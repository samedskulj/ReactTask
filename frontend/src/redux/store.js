import { configureStore } from "@reduxjs/toolkit";
import allQuestionsReducer from "./redux-thunk/allQuestionsState";
import hotQuestionsReducer from "./redux-thunk/hotQuestionState";
import userReducer from "./redux-thunk/userState";

const store = configureStore({
  reducer: {
    allQuestions: allQuestionsReducer,
    hotQuestions: hotQuestionsReducer,
    user: userReducer,
  },
});

export { store };
