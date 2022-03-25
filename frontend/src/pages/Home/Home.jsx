import React from "react";
import { Container, Row } from "react-bootstrap";
import { Tabs, TopUsers } from "../../components";
const Home = () => {
  return (
    <Container className="py-5">
      <Row>
        <Tabs />
        <TopUsers />
      </Row>
    </Container>
  );
};

export default Home;
