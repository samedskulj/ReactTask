import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Inputs } from "../../helper-components";
import { commentTextArea } from "../../../data/inputs";
import { MultiButton } from "../index";
import "./CommentArea.css";
import useFormValidation from "../../../hooks/useFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { addAnswerFirebase } from "../../../redux/redux-thunk/singleQuestionState";

const CommentArea = () => {
  const [input, setInput] = useState(commentTextArea);
  const dispatch = useDispatch();

  const initialObject = {
    commentTextArea: "",
  };

  const user = useSelector((state) => state.user);
  const { singleQuestion } = useSelector((state) => state.singleQuestion);

  const dispatchAnswer = () => {
    const data = {
      answer: formData.commentTextArea,
      userID: user.user[0].id,
      nameOfUser: user.user[0].firstName,
      id: singleQuestion.id,
    };
    if (singleQuestion.id !== undefined && user.user.length !== 0) {
      dispatch(addAnswerFirebase(data));
      clearData();
    }
  };

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFormValidation("comment", initialObject, dispatchAnswer);

  return (
    <div className="comment-area">
      <form onSubmit={handleSubmit}>
        <div className="comment-area__credentials">
          {user !== null && (
            <p>
              Comment as <Link to={"/profile"}>{user.user[0].firstName}</Link>{" "}
            </p>
          )}
          <Inputs
            {...input}
            value={formData[input.name]}
            handleChange={handleChange}
            error={errors[input.name]}
          />
        </div>
        <div className="comment-area__submit">
          <MultiButton roleClass="comment" type="submit">
            Submit a comment
          </MultiButton>
        </div>
      </form>
    </div>
  );
};

export default CommentArea;
