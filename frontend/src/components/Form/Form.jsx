import React, { useState } from "react";
import { Button, Inputs } from "../helper-components";
import { registerInputs, loginInputs } from "../../data/inputs";

const Form = ({ formType, textButton }) => {
  const [inputs, setInputs] = useState(
    formType === "register" ? registerInputs : loginInputs
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    commentTextArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form autoComplete="off">
        {inputs?.map((input) => (
          <Inputs
            key={input.id}
            {...input}
            value={formData[input.name]}
            handleChange={handleChange}
          />
        ))}
        <Button roleClass={formType} type="submit" text={textButton} />
      </form>
    </>
  );
};

export default Form;
