import React, { useState } from "react";
import { tabsData } from "../../data/tabs";
import { Col } from "react-bootstrap";
import { TabContent } from "../index";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tabsData[tab]);
  };

  console.log(activeTab);

  return (
    <>
      <Col lg="3">
        {tabsData?.map((tab, index) => (
          <div key={tab.id}>
            <h3 onClick={() => handleTabClick(index)}>{tab.name}</h3>
          </div>
        ))}
      </Col>
      <Col>
        <TabContent tabCategory={activeTab.category} />
      </Col>
    </>
  );
};

export default Tabs;
