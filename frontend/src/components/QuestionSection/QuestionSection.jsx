import React, { useEffect } from "react";
import { singlequestion } from "../../data/singlequestion";
import { Container, Row, Col } from "react-bootstrap";
import { Card, SiteInfo, CommentArea } from "../helper-components";
import { Comments } from "../index";
import AuthorizedComponent from "../../helper/UnauthorizedComponent";
import { onSnapshot } from "firebase/firestore";
import { questionsCollections } from "../../utils/firebase-config";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleQuestionSuccess,
  getSingleQuestionAnswersSuccess,
} from "../../redux/redux-thunk/singleQuestionState";
import "./QuestionSection.css";

const QuestionSection = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const unsubscribeQuestion = onSnapshot(
      questionsCollections,
      id,
      (snapshot) => {
        dispatch(
          getSingleQuestionSuccess(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        );
      }
    );

    const unsubscribeAnswers = onSnapshot(
      questionsCollections,
      id,
      "answers",
      (snapshot) => {
        dispatch(
          getSingleQuestionAnswersSuccess(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        );
      }
    );

    return () => {
      unsubscribeQuestion();
      unsubscribeAnswers();
    };
  }, [dispatch]);

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg="8" md="12">
            <Card content={singlequestion} />
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
    </>
  );
};

export default QuestionSection;
