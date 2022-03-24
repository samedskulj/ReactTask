import React from "react";
import { Link } from "react-router-dom";
import "./NavbarBrand.css";
import { BiTask } from "react-icons/bi";
const NavbarBrand = () => {
  return (
    <div className="navbar-brand-logo">
      <Link to={"/"}>
        <BiTask />
        React<span>Task</span>
      </Link>
    </div>
  );
};

export default NavbarBrand;
