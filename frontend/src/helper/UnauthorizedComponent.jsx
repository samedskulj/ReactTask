import React from "react";
import { useSelector } from "react-redux";

const UnauthorizedComponent = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return !user ? children : null;
};

export default UnauthorizedComponent;
