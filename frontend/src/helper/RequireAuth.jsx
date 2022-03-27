import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default RequireAuth;
