import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import MultiButton from "../Button/MultiButton";
import "./ProfileIcon.css";

const ProfileIcon = () => {
  const handleClick = () => {};

  return (
    <>
      <div className="profile-icon">
        <div className="profile-icon__image">
          <img src={DefaultIMG} />
        </div>
        <div className="profile-icon__dropdown">
          <Link to="/">Profile</Link>
          <div className="profile-icon__footer">
            <MultiButton roleClass="sign-out" clickFunction={handleClick}>
              Sign Out
            </MultiButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileIcon;
