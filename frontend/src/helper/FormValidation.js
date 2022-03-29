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
    case "updateProfile":
      if (!formData.firstName) {
        errors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        errors.lastName = "Last name is required";
      }
      if (!formData.email) {
        errors.email = "Email is required";
      }
      break;
    case "comment":
      if (!formData.commentTextArea) {
        errors.commentTextArea = "Comment is required";
      }
      break;
    case "answer":
      if (!formData.answer) {
        errors.answer = "Your answer can't be empty";
      }

    case "resetPassword":
      if (!formData.password) {
        errors.password = "Type your new password. This should not be empty!";
      }
      if (!formData.oldPassword) {
        errors.oldPassword = "Type your old password";
      }
      if (!formData.newPassword) {
        errors.newPassword = "Confirm password field should not be empty";
      } else if (formData.newPassword.length < 6) {
        errors.newPassword = "Password should be at least 6 characters";
      } else if (
        !formData.newPassword ||
        formData.password !== formData.newPassword
      ) {
        errors.newPassword = "Passwords do not match";
      }
      break;
  }

  return errors;
};
