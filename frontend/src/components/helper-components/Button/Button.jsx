import React from "react";
import "./Button.css";

const Button = ({ type, roleClass, text }) => {
  return (
    <>
      <button className={`btn-form ${roleClass}`} type={type}>
        {text}
      </button>
    </>
  );
};

export default Button;
