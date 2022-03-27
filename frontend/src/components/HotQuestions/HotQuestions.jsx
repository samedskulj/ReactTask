import React, { useEffect } from "react";
import { getHotQuestions } from "../../redux/redux-thunk/hotQuestionState";
import { useSelector, useDispatch } from "react-redux";

const HotQuestions = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotQuestions());
  }, [dispatch]);

  return <>{children}</>;
};

export default HotQuestions;
