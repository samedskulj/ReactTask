import React from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineComment,
} from "react-icons/ai";
import { DefaultIMG } from "../../../images";

const Card = ({ content }) => {
  return (
    <>
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
              <p>{content.numberOfComments}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
