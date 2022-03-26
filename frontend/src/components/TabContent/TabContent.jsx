import React, { useEffect } from "react";
import { tabContent } from "../../data/tabContent";
import "./TabContent.css";
import { Card } from "../helper-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions } from "../../redux/redux-thunk/allQuestionsState";

const TabContent = ({ tabCategory }) => {
  const dispatch = useDispatch();
  const tabContentData = useSelector(
    (state) => state.allQuestions.allQuestions
  );

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  console.log(tabContentData);

  return (
    <>
      {tabContent[tabContentData]?.content?.map((content) => {
        return <Card content={content} key={content.id} />;
      })}
    </>
  );
};

export default TabContent;
