import React from "react";
import { singlequestion } from "../../data/singlequestion";
import { Container, Row, Col } from "react-bootstrap";
import { Card, SiteInfo } from "../helper-components";

import "./QuestionSection.css";
const QuestionSection = ({ content }) => {
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
      </Container>
    </>
  );
};

export default QuestionSection;
