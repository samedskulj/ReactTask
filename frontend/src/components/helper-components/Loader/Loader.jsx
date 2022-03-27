import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
