import React from "react";
import { Card } from "../helper-components";
import { useSelector } from "react-redux";
import { RealTimeQuestions } from "../index";
import HotQuestions from "../HotQuestions/HotQuestions";
import Loader from "../helper-components/Loader/Loader";
import "./TabContent.css";

const TabContent = ({ tabCategory }) => {
  const allQuestions = useSelector((state) => state.allQuestions.allQuestions);
  const hotQuestions = useSelector((state) => state.hotQuestions.hotQuestions);

  return (
    <>
      {hotQuestions.length === 0 && allQuestions.length === 0 && <Loader />}
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
