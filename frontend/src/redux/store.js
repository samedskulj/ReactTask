import { configureStore } from "@reduxjs/toolkit";
import {
  allQuestionsState,
  hotQuestionState,
  userState,
  singleQuestionState,
  topUsersState,
} from "./redux-thunk";

const store = configureStore({
  reducer: {
    allQuestions: allQuestionsState,
    hotQuestions: hotQuestionState,
    user: userState,
    singleQuestion: singleQuestionState,
    topUsers: topUsersState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
