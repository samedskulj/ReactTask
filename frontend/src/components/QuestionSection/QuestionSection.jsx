import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, SiteInfo, CommentArea } from "../helper-components";
import { Comments } from "../index";
import AuthorizedComponent from "../../helper/AuthorizedComponent";
import { RealtimeAnswersQuestion } from "../index";
import { useSelector } from "react-redux";

import "./QuestionSection.css";

const QuestionSection = () => {
  const { singleQuestion, answers } = useSelector(
    (state) => state.singleQuestion
  );

  return (
    <>
      <RealtimeAnswersQuestion>
        <Container className="py-5">
          <Row>
            <Col lg="8" md="12">
              {singleQuestion && <Card content={singleQuestion} />}
            </Col>
            <Col lg="4" className="question-mobile-none">
              <SiteInfo />
            </Col>
          </Row>
          <AuthorizedComponent>
            <Col lg="8" className="mb-5">
              <CommentArea />
            </Col>
          </AuthorizedComponent>
          {/* {commentSection?.map((comment) => (
          <Comments key={comment.id} comment={comment} />
        ))} */}
        </Container>
      </RealtimeAnswersQuestion>
    </>
  );
};

export default QuestionSection;
