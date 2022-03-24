import React, { useState } from "react";
import "./Inputs.css";

const Inputs = ({ value, handleChange, ...input }) => {
  const { label, error, name } = input;

  const [focused, setFocused] = useState(false);

  const handleFocusing = (e) => {
    setFocused(true);
  };

  return (
    <>
      <div className="input-container">
        <div className="form-input-group">
          <input
            className="form-input-field"
            value={value}
            onChange={handleChange}
            {...input}
            onBlur={handleFocusing}
            focused={focused.toString()}
          />
          <label className="form-label" for={name}>
            {label}
          </label>
          <span className="input-span">{error}</span>
        </div>
      </div>
    </>
  );
};

export default Inputs;
