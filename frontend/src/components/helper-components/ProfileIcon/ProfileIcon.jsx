import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import MultiButton from "../Button/MultiButton";
import "./ProfileIcon.css";

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="profile-icon">
        <button className="profile-icon__image" onClick={handleClick}>
          <img src={DefaultIMG} />
        </button>
        {isOpen && (
          <div className="profile-icon__dropdown">
            <Link to="/">Profile</Link>
            <div className="profile-icon__footer">
              <MultiButton roleClass="sign-out" clickFunction={handleClick}>
                Sign Out
              </MultiButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileIcon;
