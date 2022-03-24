import React from "react";
import "./HeaderWrapper.css";

const HeaderWrapper = ({ children }) => {
  return <header className="header-wrapper">{children}</header>;
};

export default HeaderWrapper;
