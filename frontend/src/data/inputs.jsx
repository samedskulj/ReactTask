export const registerInputs = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    error: "Please enter a valid email",
    required: true,
    autocomplete: "off",
  },
  {
    id: 4,
    name: "password",
    label: "Password",
    type: "password",
    error: "Password must be at least 5 characters",
    required: true,
    autocomplete: "off",
  },
  {
    id: 5,
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    error: "Password should match",
    required: true,
    autocomplete: "off",
  },
];

export const loginInputs = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email",
    autocomplete: "off",
    error: "Email is required",
    required: true,
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password",
    autocomplete: "off",
    error: "Password should not be empty",
    required: true,
  },
];
