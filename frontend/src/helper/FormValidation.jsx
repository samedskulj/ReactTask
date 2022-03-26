const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

export const formValidation = (formData, formType) => {
  const errors = {};

  switch (formType) {
    case "register":
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Email is invalid";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (
        !formData.confirmPassword ||
        formData.confirmPassword !== formData.password
      ) {
        errors.confirmPassword = "Password does not match";
      }
      break;
    case "login":
      if (!formData.email) {
        errors.email = "Email is required";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      }
      break;
    case "addQuestion":
      if (!formData.question) {
        errors.question = "Question is required";
      } else if (formData.question.length < 10) {
        errors.question = "Question must be at least 10 characters";
      }

      if (!formData.title) {
        errors.title = "Title is required";
      } else if (formData.title.length < 10) {
        errors.title = "Title must be at least 10 characters";
      }
      break;
  }

  return errors;
};
