import React from "react";
import "./Button.css";

const Button = ({ type, roleClass }) => {
  return (
    <>
      <button className={`btn ${roleClass}`} type={type}></button>
    </>
  );
};

export default Button;
