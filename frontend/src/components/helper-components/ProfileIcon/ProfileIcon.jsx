import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import MultiButton from "../Button/MultiButton";
import "./ProfileIcon.css";

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="profile-icon"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsOpen(false);
          }
        }}
      >
        <button className="profile-icon__image">
          <img src={DefaultIMG} />
        </button>
        {isOpen && (
          <div className="profile-icon__dropdown">
            <Link onClick={() => setIsOpen(false)} to="/profile">
              Profile
            </Link>
            <div className="profile-icon__footer">
              <MultiButton roleClass="sign-out">Sign Out</MultiButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileIcon;
