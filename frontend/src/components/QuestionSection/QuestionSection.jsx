import React, { useState } from "react";
import { singlequestion } from "../../data/singlequestion";
import { Container, Row, Col } from "react-bootstrap";
import { Card, SiteInfo } from "../helper-components";
import { comments } from "../../data/comments";
import { Comments } from "../index";
import "./QuestionSection.css";

const QuestionSection = () => {
  const [commentSection, setCommentSection] = useState(comments);

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg="8" md="12">
            <Card content={singlequestion} />
          </Col>
          <Col lg="4">
            <SiteInfo />
          </Col>
        </Row>
        {commentSection?.map((comment) => (
          <Comments key={comment.id} comment={comment} />
        ))}
      </Container>
    </>
  );
};

export default QuestionSection;
