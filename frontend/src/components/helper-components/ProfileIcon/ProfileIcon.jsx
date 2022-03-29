import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultIMG } from "../../../images";
import MultiButton from "../Button/MultiButton";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileIcon.css";
import {
  resetUserData,
  signOutUserFirebase,
} from "../../../redux/redux-thunk/userState";

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutUserFirebase());
    dispatch(resetUserData());
    navigate("/");
  };

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
              <MultiButton roleClass="sign-out" clickFunction={handleSignOut}>
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
