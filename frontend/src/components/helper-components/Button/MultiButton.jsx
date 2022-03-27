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
        className={`btn-form ${roleClass}`}
        onClick={clickFunction && clickFunction}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default MultiButton;
