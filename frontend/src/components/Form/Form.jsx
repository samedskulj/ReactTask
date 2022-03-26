import React, { useState, useEffect } from "react";
import { MultiButton, Inputs } from "../helper-components";
import { registerInputs, loginInputs } from "../../data/inputs";
import { formValidation } from "../../helper/FormValidation";
import {
  registerUser,
  loginUser,
} from "../../utils/firebase-functions/firebase-functions";
import "./Form.css";

const Form = ({ formType }) => {
  const [inputs, setInputs] = useState(
    formType === "register" ? registerInputs : loginInputs
  );
  const [isSubmit, setIsSubmit] = useState(false);

  const initialObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialObject);

  const [errors, setErrors] = useState({});

  const confirmAction = async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      var firebaseInfo;
      if (formType === "register") {
        firebaseInfo = await registerUser(formData);
      } else {
        firebaseInfo = await loginUser(formData);
      }
      if (firebaseInfo instanceof Object) {
        console.log(firebaseInfo);
      } else {
        setErrors({ ...errors, credentials: firebaseInfo });
        setFormData(initialObject);
      }
    }
  };

  useEffect(() => {
    confirmAction();
  }, [errors, isSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSubmit);
    setErrors(formValidation(formData, formType));
    setIsSubmit(true);
    console.log(errors);
  };

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
