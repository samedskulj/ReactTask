import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/redux-thunk/userState";
import { authFirebase } from "../../utils/firebase-config";
import { ProfileData, ProfileForm } from "../helper-components";
import Loader from "../helper-components/Loader/Loader";
import "./ProfileSection.css";

const ProfileSection = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <>
      {user == null ? (
        <Loader />
      ) : (
        <Container className="py-5">
          <div className="profile-section">
            <Row>
              <ProfileData user={user} />
              <ProfileForm user={user} />
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default ProfileSection;
