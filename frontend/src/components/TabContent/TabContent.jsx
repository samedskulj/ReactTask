import React, { useEffect } from "react";
import { tabContent } from "../../data/tabContent";
import "./TabContent.css";
import { Card } from "../helper-components";
import { useSelector, useDispatch } from "react-redux";
import { getHotQuestions } from "../../redux/redux-thunk/hotQuestionState";
import { RealTimeQuestions } from "../index";
const TabContent = ({ tabCategory }) => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.allQuestions.allQuestions);
  const hotQuestions = useSelector((state) => state.hotQuestions.hotQuestions);

  useEffect(() => {
    dispatch(getHotQuestions());
  }, [dispatch]);

  return (
    <>
      {tabCategory === "Hot Questions" ? (
        <>
          {hotQuestions.map((content) => {
            return <Card content={content} key={content.id} />;
          })}
        </>
      ) : (
        <>
          <RealTimeQuestions>
            {allQuestions.map((content) => {
              return <Card content={content} key={content.id} />;
            })}
          </RealTimeQuestions>
        </>
      )}
    </>
  );
};

export default TabContent;
