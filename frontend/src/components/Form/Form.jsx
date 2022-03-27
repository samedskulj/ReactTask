import React, { useState } from "react";
import { MultiButton, Inputs } from "../helper-components";
import { registerInputs, loginInputs } from "../../data/inputs";
import useFirebase from "../../hooks/useFirebase";
import "./Form.css";

const Form = ({ formType }) => {
  const [inputs, setInputs] = useState(
    formType === "register" ? registerInputs : loginInputs
  );

  const initialObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { errors, formData, handleChange, handleSubmit } = useFirebase(
    formType,
    initialObject
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputs?.map((input) => (
          <Inputs
            key={input.id}
            {...input}
            value={formData[input.name]}
            handleChange={handleChange}
            error={errors[input.name]}
          />
        ))}
        <MultiButton roleClass={formType} type="submit">
          {formType}
        </MultiButton>
      </form>
      {errors.credentials && (
        <span className="form-firebase__error">{errors.credentials}</span>
      )}
    </>
  );
};

export default Form;
