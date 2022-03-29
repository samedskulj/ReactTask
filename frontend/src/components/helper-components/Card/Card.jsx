import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import "./Card.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addLikesFirebase,
  addDislikesFirebase,
} from "../../../redux/redux-thunk/singleQuestionState";

const Card = ({ content }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [className, setClassname] = useState("");
  const [status, setStatus] = useState();
  const { reactions } = useSelector((state) => state.reactions);
  const { allQuestions } = useSelector((state) => state.allQuestions);
  const { singleQuestion } = useSelector((state) => state.singleQuestion);

  //Showing the way to like
  const dispatchLikes = () => {
    const data = {
      userId: user[0].id,
      postId: content.id,
      status: 1,
    };
    dispatch(addLikesFirebase(data));
  };
  //Showing the way to dislike
  const dispatchDislikes = () => {
    const data = {
      userId: user[0].id,
      postId: content.id,
      status: -1,
    };
    dispatch(addDislikesFirebase(data));
  };

  return (
    <>
      <div className="card-grid">
        {/* <div className="card-grid__thumbs">
          <AiOutlineArrowUp
            onClick={dispatchLikes}
          />
          <p>{content.numberOfLikes}</p>
          <AiOutlineArrowDown onClick={dispatchDislikes} />
        </div> */}
        <Link to={`/question/${content.id}`} className="card-grid__link">
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
        </Link>
      </div>
    </>
  );
};

export default Card;
