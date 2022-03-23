import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
