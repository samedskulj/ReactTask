export const formValidation = (formData, formType) => {
  const errors = {};
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
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
  if (formType === "register") {
    if (
      !formData.confirmPassword ||
      formData.confirmPassword !== formData.password
    ) {
      errors.confirmPassword = "Password does not match";
    }
  }
  return errors;
};
