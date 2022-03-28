import React from "react";
import { useSelector } from "react-redux";
const AuthorizedComment = ({ comment, children }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return user !== null && user[0].id === comment ? children : null;
};

export default AuthorizedComment;
