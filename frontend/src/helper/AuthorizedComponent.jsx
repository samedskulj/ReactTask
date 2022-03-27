import React from "react";
import { useSelector } from "react-redux";

const AuthorizedComponent = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (user) return <>{children}</>;
};

export default AuthorizedComponent;
