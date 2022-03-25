import React from "react";
import { tabContent } from "../../data/tabContent";

import "./TabContent.css";
import { Card } from "../helper-components";

const TabContent = ({ tabCategory }) => {
  const tabContentData = tabContent.findIndex(
    (tab) => tab.category === tabCategory
  );
  return (
    <>
      {tabContent[tabContentData]?.content?.map((content) => {
        return <Card content={content} key={content.id} />;
      })}
    </>
  );
};

export default TabContent;
