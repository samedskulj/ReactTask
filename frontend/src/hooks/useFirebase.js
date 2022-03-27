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

const useFirebase = (formType, initialObject) => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(initialObject);
  const [response, setResponse] = useState(false);
  const [errors, setErrors] = useState({});
  const [setCookie, removeCookie] = useCookies(["firebaseUser"]);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
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
      case "register":
        const registerResponse = await registerUser(formData);
        if (typeof registerResponse !== "string") {
          dispatch(getUser(registerResponse.email));
          clearData();
          navigate("/");
        } else {
          setErrors({ ...errors, credentials: registerResponse });
          setFormData(initialObject);
        }
        break;
      case "login":
        const loginResponse = await loginUser(formData);
        if (typeof loginResponse !== "string") {
        } else {
          setErrors({ ...errors, credentials: loginResponse });
          setFormData(initialObject);
        }
        break;
      case "addQuestion":
        const addQuestionResponse = await addQuestion(formData, "Samed");
        console.log(addQuestionResponse);
        if (typeof addQuestionResponse !== "string") {
          setResponse(true);
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
    setFormData,
    setErrors,
    setIsSubmit,
    clearData,
  };
};

export default useFirebase;
