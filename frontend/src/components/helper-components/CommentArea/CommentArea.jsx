import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Inputs } from "../../helper-components";
import { commentTextArea } from "../../../data/inputs";
import { MultiButton } from "../index";
import "./CommentArea.css";

const CommentArea = () => {
  const [commentArea, setCommentArea] = useState("");
  const [input, setInput] = useState(commentTextArea);

  const handleChange = (e) => {
    setCommentArea(e.target.value);
  };

  return (
    <div className="comment-area">
      <div className="comment-area__credentials">
        <p>
          Comment as <Link to={"/profile"}>Samke</Link>
        </p>
        <Inputs {...input} value={commentArea} handleChange={handleChange} />
      </div>
      <div className="comment-area__submit">
        <MultiButton roleClass="comment">Submit a comment</MultiButton>
      </div>
    </div>
  );
};

export default CommentArea;
