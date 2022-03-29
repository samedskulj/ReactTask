import React, { useState, useEffect } from "react";
import "./ResetPasswordSection.css";
import useFormValidation from "../../hooks/useFormValidation";
import { resetpassword } from "../../data/inputs";
import { useDispatch, useSelector } from "react-redux";
import { Inputs, MultiButton } from "../helper-components";
import { resetPasswordFirebase } from "../../redux/redux-thunk/userState";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Loader from "../helper-components/Loader/Loader";

const ResetPasswordSection = () => {
  const [inputs, setInputs] = useState(resetpassword);
  const { user, resetpassword: resetPass } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialObject = {
    oldPassword: "",
    password: "",
    newPassword: "",
  };

  const dispatchResetPassword = () => {
    const data = {
      password: formData.password,
      email: user[0].email,
      oldPassword: formData.oldPassword,
    };
    dispatch(resetPasswordFirebase(data));
  };

  const checkResetAuth = () => {
    if (user !== null && typeof resetPass === "string") {
      if (resetPass.includes("(auth/wrong-password)")) {
        setSuccess(false);
        clearData();
        return;
      }
    }
  };
  useEffect(() => {
    checkResetAuth();
    if (user !== null && resetPass !== null && resetPass === true) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, []);

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFormValidation("resetPassword", initialObject, dispatchResetPassword);

  return (
    <>
      {user === null ? (
        <Loader />
      ) : (
        <div className="reset-password">
          <div className="reset-password__section">
            <h2>Change your password</h2>
            {inputs?.map((input) => {
              return (
                <Inputs
                  key={input.id}
                  {...input}
                  value={formData[input.name]}
                  handleChange={handleChange}
                  error={errors[input.name]}
                />
              );
            })}
            <MultiButton roleClass="update" clickFunction={handleSubmit}>
              Reset Password
            </MultiButton>
            {success === true ? (
              <Alert className="mt-3">
                You have successfully changed your password. Wait for reload!
              </Alert>
            ) : (
              <>
                {success === false && (
                  <Alert className="mt-3" variant="danger">
                    You have entered wrong old password
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordSection;
