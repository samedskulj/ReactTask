import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import UnauthorizedComponent from "../../../helper/UnauthorizedComponent";
import { ProfileIcon } from "../index";
import AuthorizedComponent from "../../../helper/AuthorizedComponent";

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
        <AuthorizedComponent>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/myquestions"
              title="MyQuestions"
            >
              MyQuestions
            </NavLink>
          </li>
        </AuthorizedComponent>
        <UnauthorizedComponent>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/register"
              title="Register"
            >
              Register
            </NavLink>
          </li>
        </UnauthorizedComponent>
        <UnauthorizedComponent>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/login"
              title="Login"
            >
              Login
            </NavLink>
          </li>
        </UnauthorizedComponent>
      </ul>
      <AuthorizedComponent>
        <ProfileIcon />
      </AuthorizedComponent>
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
