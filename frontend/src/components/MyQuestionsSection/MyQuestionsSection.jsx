import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./MyQuestionsSection.css";
import { Card } from "../helper-components";
import "./MyQuestionsSection.css";
import { getUsersQuestionsFirebase } from "../../redux/redux-thunk/usersQuestionsState";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../helper-components/Loader/Loader";

const MyQuestionsSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const usersQuestions = useSelector(
    (state) => state.usersQuestions.usersQuestions
  );
  useEffect(() => {
    if (user) {
      dispatch(getUsersQuestionsFirebase(user[0].id));
    }
  }, [user]);
  return (
    <Container>
      <Row>
        <Col className="text-center p-5">
          <h1>My Questions</h1>
        </Col>
      </Row>
      <Row>
        {usersQuestions === null ? (
          <Loader />
        ) : (
          <>
            {usersQuestions.length === 0 && (
              <Alert variant="info">You have no Questions</Alert>
            )}
            {usersQuestions?.map((question) => (
              <Col lg="6">
                <Card content={question} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default MyQuestionsSection;
