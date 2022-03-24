import React from "react";
import { Container } from "react-bootstrap";
import { HeaderWrapper, NavbarBrand, NavbarList } from "../helper-components";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <HeaderWrapper>
        <Container className="navbar-container">
          <NavbarBrand />
          <NavbarList />
        </Container>
      </HeaderWrapper>
    </>
  );
};

export default Navbar;
