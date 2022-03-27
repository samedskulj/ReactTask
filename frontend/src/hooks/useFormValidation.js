import { useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  addQuestion,
} from "../utils/firebase-functions/firebase-functions";
import { formValidation } from "../helper/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/redux-thunk/userState";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useFormValidation = (formType, initialObject, callback) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(initialObject);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.user);

  const confirmAction = async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback();
    }
  };

  useEffect(() => {
    confirmAction();
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setFormData,
    setErrors,
    setIsSubmit,
    clearData,
  };
};

export default useFormValidation;
