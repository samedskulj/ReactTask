import React from "react";
import { tabContent } from "../../data/tabContent";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineComment,
} from "react-icons/ai";
import { DefaultIMG } from "../../images";
import "./TabContent.css";

const TabContent = ({ tabCategory }) => {
  const tabContentData = tabContent.findIndex(
    (tab) => tab.category === tabCategory
  );

  return (
    <>
      {tabContent[tabContentData]?.content?.map((content) => {
        return (
          <div className="card-grid" key={content.id}>
            <div className="card-grid__thumbs">
              <AiOutlineArrowUp />
              <p>{content.numberOfLikes}</p>
              <AiOutlineArrowDown />
            </div>
            <div className="card-grid__main">
              <h2>{content.title}</h2>
              <p>{content.question}</p>

              <div className="card-grid__footer">
                <div className="card-grid__information">
                  <img src={DefaultIMG} />
                  <p>{content.username}</p>
                </div>
                <div className="card-grid__comments">
                  <AiOutlineComment />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TabContent;
