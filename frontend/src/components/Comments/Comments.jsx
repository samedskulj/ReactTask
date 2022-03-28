import React from "react";
import "./Comments.css";
import { Row, Col } from "react-bootstrap";
import { DefaultIMG } from "../../images";
import "./Comments.css";

const Comments = ({ comment }) => {
  return (
    <>
      <Row>
        <Col lg="8">
          <div className="comment-section">
            <div className="comment-section-grid">
              <img src={DefaultIMG} />
              <div className="comment-section__main">
                <p id="comment-section__name">{comment.firstName}</p>
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
