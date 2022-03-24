import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./FormWrapper.css";

const FormWrapper = ({
  heading,
  subheading,
  linkType,
  linkText,
  typeOfForm,
  buttonLabel,
}) => {
  return (
    <section className="form-wrapper">
      <div className="form-container">
        <h2>{heading}</h2>
        <div className="form-link-group">
          <p>{subheading}</p>
          <Link to={linkType}>{linkText}</Link>
        </div>
        <Form formType={typeOfForm} textButton={buttonLabel} />
      </div>
    </section>
  );
};

export default FormWrapper;
