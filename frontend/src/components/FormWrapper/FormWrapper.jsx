import React from "react";
import { Link } from "react-router-dom";
import { AccessForm } from "../helper-components";
import "./FormWrapper.css";

const FormWrapper = ({
  heading,
  subheading,
  linkType,
  linkText,
  typeOfForm,
}) => {
  return (
    <section className="form-wrapper">
      <div className="form-container">
        <h2>{heading}</h2>
        <div className="form-link-group">
          <p>{subheading}</p>
          <Link to={linkType}>{linkText}</Link>
          <Link className="ml-5" to="/">
            Go Home
          </Link>
        </div>
        <AccessForm formType={typeOfForm} />
      </div>
    </section>
  );
};

export default FormWrapper;
