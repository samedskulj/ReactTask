import React from "react";
import "./MultiButton.css";

const MultiButton = ({ type, roleClass, children, clickFunction }) => {
  return (
    <>
      <button
        className={`btn-form ${roleClass}`}
        onClick={clickFunction && clickFunction}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default MultiButton;
