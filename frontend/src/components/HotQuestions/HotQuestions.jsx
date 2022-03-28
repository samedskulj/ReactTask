import React, { useEffect } from "react";
import { getHotQuestions } from "../../redux/redux-thunk/hotQuestionState";
import { useSelector, useDispatch } from "react-redux";
import { resetAllQuestions } from "../../redux/redux-thunk/allQuestionsState";

const HotQuestions = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotQuestions());
  }, [dispatch]);

  return <>{children}</>;
};

export default HotQuestions;
