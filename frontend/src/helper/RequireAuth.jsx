import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authFirebase } from "../utils/firebase-config";

const RequireAuth = ({ children }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user === null) {
        setTimeout(() => {
          setIsAuth(false);
        }, 1000);
      } else {
        setIsAuth(true);
      }
    });
  }, [authFirebase]);

  if (isAuth === false) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default RequireAuth;
