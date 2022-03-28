import React, { useEffect } from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import "./Card.css";
import { useSelector, useDispatch } from "react-redux";
import { getReactionsSuccess } from "../../../redux/redux-thunk/reactionsState";
import { reactionCollections } from "../../../utils/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { commentTextArea } from "../../../data/inputs";
import { addLikes } from "../../../utils/firebase-functions/firebase-functions";

const Card = ({ content }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { reactions } = useSelector((state) => state.reactions);
  useEffect(() => {
    const unsubscribe = onSnapshot(reactionCollections, (snapshot) => {
      dispatch(
        getReactionsSuccess(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const dispatchLikes = () => {
    const data = {
      userId: user[0].id,
      postId: content.id,
      status: 1,
    };

    dispatch(addLikes(data));
  };

  return (
    <>
      <Link to={`/question/${content.id}`} className="card-grid__link">
        <div className="card-grid">
          <div className="card-grid__thumbs">
            <AiOutlineArrowUp onClick={dispatchLikes} id="card-grid__like" />
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
