import React, { useState } from "react";
import { tabsData } from "../../data/tabs";
import { Col } from "react-bootstrap";
import { TabContent } from "../index";
import "./Tabs.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleTabClick = (tab) => {
    window.scrollTo(0, 0);
    setActiveTab(tabsData[tab]);
  };

  return (
    <>
      <Col lg="3">
        <ul className="category-tab-list">
          {tabsData?.map((tab, index) => (
            <li className="category-tab" key={tab.id}>
              <button
                className={activeTab.category === tab.category ? "active" : ""}
                onClick={() => handleTabClick(index)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </Col>
      <Col lg="6">
        <TabContent tabCategory={activeTab.category} />
      </Col>
    </>
  );
};

export default Tabs;
