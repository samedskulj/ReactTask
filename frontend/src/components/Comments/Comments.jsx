import React from "react";
import "./Comments.css";
import { Row, Col } from "react-bootstrap";
import { DefaultIMG } from "../../images";
import "./Comments.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AuthorizedComment from "../../helper/AuthorizedComment";

const Comments = ({ comment }) => {
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
                      <AiFillEdit id="comment-section_edit" />
                      <AiFillDelete />
                    </AuthorizedComment>
                  </div>
                </div>
                <p id="comment-section__comment">{comment.answer}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Comments;
