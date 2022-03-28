import React from "react";
import "./ProfileData.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <h3>{user[0].firstName}</h3>
        </div>
        <Link to="/resetpassword">
          <MultiButton roleClass="change-password">Change Password</MultiButton>
        </Link>
      </Col>
    </>
  );
};

export default ProfileData;
