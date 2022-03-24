import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

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
            <AiOutlineClose />
          </button>
        )}
        <li>
          <NavLink to="/myquestions">MyQuestions</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
      <button
        className="navbar--hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </button>
    </>
  );
};

export default NavbarList;
