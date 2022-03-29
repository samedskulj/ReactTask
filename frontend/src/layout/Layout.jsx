import React, { useEffect } from "react";
import { Navbar } from "../components";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/redux-thunk/userState";
import { authFirebase } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        return;
      }
    });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
