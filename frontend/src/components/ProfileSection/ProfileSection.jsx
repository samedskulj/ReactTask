import { onAuthStateChanged } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { Row, Container, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/redux-thunk/userState";
import { authFirebase } from "../../utils/firebase-config";
import { ProfileData, ProfileForm } from "../helper-components";
import Loader from "../helper-components/Loader/Loader";
import "./ProfileSection.css";

const ProfileSection = () => {
  const user = useSelector((state) => state.user);
  const [updated, setUpdated] = useState(false);

  const checkUserUpdated = useCallback(() => {
    if (user.updated === true) {
      window.location.reload();
      setUpdated(true);
    }
  }, [user]);

  useEffect(() => {
    checkUserUpdated();
  }, [checkUserUpdated]);

  return (
    <>
      {user.user === null ? (
        <Loader />
      ) : (
        <Container className="py-5">
          {updated === true && (
            <Alert>You have succesfully updated your account settings!</Alert>
          )}
          <div className="profile-section">
            <Row>
              <ProfileData user={user.user} />
              <ProfileForm user={user.user} />
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default ProfileSection;
