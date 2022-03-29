import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MultiButton, Inputs } from "..";
import { registerInputs, loginInputs } from "../../../data/inputs";
import useFormValidation from "../../../hooks/useFormValidation";
import {
  registerUserFirebase,
  resetUserData,
  loginUserFirebase,
} from "../../../redux/redux-thunk/userState";
import "./AccessForm.css";

const Form = ({ formType }) => {
  const [errorFirebase, setErrorFirebase] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(
    formType === "register" ? registerInputs : loginInputs
  );

  const user = useSelector((state) => state.user);

  const dispatchRegister = () => {
    dispatch(registerUserFirebase(formData));
  };

  const dispatchLogin = () => {
    dispatch(loginUserFirebase(formData));
  };

  const checkAuthError = () => {
    if (typeof user.error === "string") {
      if (user.error.includes("auth/email")) {
        setErrorFirebase("Email already in use");
        dispatch(resetUserData());
        return;
      } else if (user.error.includes("auth/user-not-found")) {
        setErrorFirebase("Password or email incorrect");
        dispatch(resetUserData());
        return;
      } else {
        setErrorFirebase(null);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkAuthError();
  }, [user]);

  const initialObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { errors, formData, handleChange, handleSubmit } = useFormValidation(
    formType,
    initialObject,
    formType === "register" ? dispatchRegister : dispatchLogin
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
      {errorFirebase !== null && (
        <span className="form-firebase__error">{errorFirebase}</span>
      )}
    </>
  );
};

export default Form;
