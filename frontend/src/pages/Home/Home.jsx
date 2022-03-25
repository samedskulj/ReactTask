import React from "react";
import { Container, Row } from "react-bootstrap";
import { Tabs } from "../../components";
const Home = () => {
  return (
    <Container className="py-5">
      <Row>
        <Tabs />
      </Row>
    </Container>
  );
};

export default Home;
