import React from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import "./Card.css";

const Card = ({ content }) => {
  return (
    <>
      <Link to={`/question/${content.id}`} className="card-grid__link">
        <div className="card-grid">
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
                <p>{content.nameOfUser}</p>
              </div>
              <div className="card-grid__comments">
                <AiOutlineComment />
                <p>{content.numberOfComments}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
