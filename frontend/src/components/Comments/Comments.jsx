import React, { useState } from "react";
import "./Comments.css";
import { Row, Col } from "react-bootstrap";
import { DefaultIMG } from "../../images";
import "./Comments.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AuthorizedComment from "../../helper/AuthorizedComment";
import AnswersModal from "../helper-components/AnswersModal/AnswersModal";
import { deleteAnswerFirebase } from "../../redux/redux-thunk/singleQuestionState";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ comment }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { singleQuestion, answers } = useSelector(
    (state) => state.singleQuestion
  );

  const getSingleQuestion = answers.filter((single) => {
    return single.id === comment.id;
  });

  const dispatchDeleteAnswer = () => {
    const data = {
      id: singleQuestion.id,
      commentId: getSingleQuestion[0].id,
    };
    dispatch(deleteAnswerFirebase(data));
  };

  return (
    <>
      <Row>
        <Col lg="8">
          <div className="comment-section">
            <div className="comment-section-grid">
              <img src={DefaultIMG} />
              <div className="comment-section__main">
                <div className="comment-section__icons">
                  <p id="comment-section__name">{comment.nameOfUser}</p>
                  <div className="comment-section__icons_edit_delete">
                    <AuthorizedComment comment={comment.userID}>
                      <AiFillEdit
                        id="comment-section_edit"
                        onClick={handleShow}
                      />
                      <AiFillDelete onClick={dispatchDeleteAnswer} />
                    </AuthorizedComment>
                  </div>
                </div>
                <p id="comment-section__comment">{comment.answer}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <AnswersModal show={show} setShow={setShow} commentId={comment.id} />
    </>
  );
};

export default Comments;
