import React from "react";
import "./MultiButton.css";

const MultiButton = ({ type, roleClass, children }) => {
  return (
    <>
      <button className={`btn-form ${roleClass}`} type={type}>
        {children}
      </button>
    </>
  );
};

export default MultiButton;
