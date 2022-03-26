import { useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  addQuestion,
} from "../utils/firebase-functions/firebase-functions";
import { formValidation } from "../helper/FormValidation";

const useForm = (formType, initialObject) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(initialObject);
  const [response, setResponse] = useState();
  const [errors, setErrors] = useState({});

  const confirmAction = async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      handleFirebase();
    }
  };

  useEffect(() => {
    confirmAction();
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFirebase = async () => {
    switch (formType) {
      case "registerUser":
        const registerResponse = await registerUser(formData);
        if (typeof registerResponse !== "string") {
        } else {
          setErrors({ ...errors, credentials: registerResponse });
          setFormData(initialObject);
        }
        break;
      case "loginUser":
        const loginResponse = await loginUser(formData);
        if (typeof loginResponse !== "string") {
        } else {
          setErrors({ ...errors, credentials: loginResponse });
          setFormData(initialObject);
        }
        break;
      case "addQuestion":
        const addQuestionResponse = await addQuestion(formData);
        console.log(addQuestionResponse);
        if (typeof addQuestionResponse !== "string") {
        } else {
          setErrors({ ...errors, credentials: addQuestionResponse });
          setFormData(initialObject);
        }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(formValidation(formData, formType));
    setIsSubmit(true);
  };

  const clearData = () => {
    setIsSubmit(false);
    setErrors({});
    setFormData(initialObject);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    response,
    setFormData,
    setErrors,
    setIsSubmit,
    clearData,
  };
};

export default useForm;
