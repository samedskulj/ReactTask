import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./MyQuestionsSection.css";
import { myquestions } from "../../data/myquestions";
import { Card } from "../helper-components";
import "./MyQuestionsSection.css";
import { useSelector } from "react-redux";

const MyQuestionsSection = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <Container>
      <Row>
        <Col className="text-center p-5">
          <h1>My Questions</h1>
        </Col>
      </Row>
      <Row>
        {myquestions?.map((question) => (
          <Col lg="6">
            <Card content={question} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyQuestionsSection;
