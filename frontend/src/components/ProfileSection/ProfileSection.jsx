import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Row, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/redux-thunk/userState";
import { ProfileData, ProfileForm } from "../helper-components";
import { authFirebase } from "../../utils/firebase-config";
import "./ProfileSection.css";

const ProfileSection = () => {
  const [account, setAccount] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        dispatch(getUser(user.email));
        setAccount(user);
      }
    });
  }, [user]);

  console.log(account);

  return (
    <>
      {account && (
        <Container className="py-5">
          <div className="profile-section">
            <Row>
              <ProfileData user={account[0]} />
              <ProfileForm user={account[0]} />
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default ProfileSection;
