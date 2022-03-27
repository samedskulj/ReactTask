import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import AuthComponent from "../../../helper/UnauthorizedComponent";
import { ProfileIcon } from "../index";

const NavbarList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul
        className={`navbar-ul ${isOpen ? "mobile-menu active" : "mobile-menu"}`}
      >
        {isOpen && (
          <button
            className="navbar--close-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GrClose />
          </button>
        )}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/myquestions"
            title="MyQuestions"
          >
            MyQuestions
          </NavLink>
        </li>
        <li>
          <ProfileIcon />
        </li>
        <AuthComponent>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/register"
              title="Register"
            >
              Register
            </NavLink>
          </li>
        </AuthComponent>
        <AuthComponent>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/login"
              title="Login"
            >
              Login
            </NavLink>
          </li>
        </AuthComponent>
      </ul>
      <button
        className="navbar--hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenuAlt3 />
      </button>
    </>
  );
};

export default NavbarList;
