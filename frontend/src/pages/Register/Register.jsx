import React from "react";
import { FormWrapper } from "../../components";

const Register = () => {
  return (
    <>
      <FormWrapper
        heading="Sign up with your email"
        subheading="Already have an account?"
        linkType="/login"
        linkText="Sign in"
        typeOfForm="register"
        buttonLabel="Register"
      />
    </>
  );
};

export default Register;
