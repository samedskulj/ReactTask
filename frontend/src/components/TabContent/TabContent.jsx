import React, { useEffect } from "react";
import { tabContent } from "../../data/tabContent";
import "./TabContent.css";
import { Card } from "../helper-components";
import { useSelector, useDispatch } from "react-redux";
import { RealTimeQuestions } from "../index";
import HotQuestions from "../HotQuestions/HotQuestions";

const TabContent = ({ tabCategory }) => {
  const allQuestions = useSelector((state) => state.allQuestions.allQuestions);
  const hotQuestions = useSelector((state) => state.hotQuestions.hotQuestions);

  return (
    <>
      {tabCategory === "Hot Questions" ? (
        <>
          <HotQuestions>
            {hotQuestions.map((content) => {
              return <Card content={content} key={content.id} />;
            })}
          </HotQuestions>
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
