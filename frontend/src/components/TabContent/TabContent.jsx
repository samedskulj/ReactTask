import React, { useState } from "react";
import { tabContent } from "../../data/tabContent";

const TabContent = ({ tabCategory }) => {
  const tabContentData = tabContent.findIndex(
    (tab) => tab.category === tabCategory
  );

  console.log(tabContentData);

  return (
    <>
      {tabContent[tabContentData]?.content?.map((content) => {
        return (
          <div key={content.id}>
            <h5>{content.username}</h5>
            <h5>{content.question}</h5>
          </div>
        );
      })}
    </>
  );
};

export default TabContent;
