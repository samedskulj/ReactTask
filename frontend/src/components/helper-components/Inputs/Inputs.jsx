import React, { useState } from "react";
import "./Inputs.css";

const Inputs = ({
  value,
  error,
  handleChange,
  confirmPasswordPattern,
  ...input
}) => {
  const { label, name, type } = input;

  return (
    <>
      {type !== "textarea" ? (
        <div className="input-container">
          <div className="form-input-group">
            <input
              className="form-input-field"
              value={value}
              onChange={handleChange}
              {...input}
            />
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
            <span className="input-span">{error}</span>
          </div>
        </div>
      ) : (
        <div className="text-area-container">
          <textarea
            className="form-input-textarea"
            value={value}
            onChange={handleChange}
            {...input}
          ></textarea>
          <span className="input-span">{error}</span>
        </div>
      )}
    </>
  );
};

export default Inputs;
