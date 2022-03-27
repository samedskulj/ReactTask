import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { ProfileData, ProfileForm } from "../helper-components";
import "./ProfileSection.css";

const ProfileSection = () => {
  return (
    <>
      <Container className="py-5">
        <div className="profile-section">
          <Row>
            <ProfileData />
            <ProfileForm />
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ProfileSection;
