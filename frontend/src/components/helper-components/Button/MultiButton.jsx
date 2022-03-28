import React from "react";
import "./MultiButton.css";

const MultiButton = ({
  type,
  roleClass,
  children,
  clickFunction,
  disabled,
}) => {
  return (
    <>
      <button
        className={`btn-form ${roleClass} ${
          disabled === true ? "disabled" : ""
        }`}
        onClick={clickFunction && clickFunction}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default MultiButton;
