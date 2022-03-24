import React from "react";
import { FormWrapper } from "../../components";
const Login = () => {
  return (
    <>
      <FormWrapper
        heading="Sign in with your email"
        subheading="Dont have an account?"
        linkType="/register"
        linkText="Sign up"
        typeOfForm="login"
        buttonLabel="Login"
      />
    </>
  );
};

export default Login;
