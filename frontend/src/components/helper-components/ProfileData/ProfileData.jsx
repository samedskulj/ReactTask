import React from "react";
import "./ProfileData.css";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DefaultIMG } from "../../../images";
import MultiButton from "../Button/MultiButton";
const ProfileData = ({ user }) => {
  return (
    <>
      <Col lg="4">
        <div className="profile-data__image">
          <img src={DefaultIMG} />
        </div>
        <div className="profile-data__info">
          <h3>Samed Skulj</h3>
        </div>
        <MultiButton roleClass="change-password">Change Password</MultiButton>
      </Col>
    </>
  );
};

export default ProfileData;
