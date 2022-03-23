import React from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import { Button } from "../index";

const NavbarList = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/myquestions"></NavLink>
        </li>
        <li>
          <NavLink to="/register">
            <Button roleClass={"btn-register"} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <Button roleClass={"btn-login"} />
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavbarList;
