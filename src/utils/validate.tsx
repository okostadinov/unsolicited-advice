import { UserFormValidationErrors } from "./errors";

const errors: UserFormValidationErrors = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const getErrors = () => errors;

export const validateUserForm = (props: UserFormValidationErrors) => {
  clearErrors();
  const { username, password, confirmPassword } = props;
  validateUsername(username);
  validatePassword(password);
  confirmPassword !== undefined &&
    validateConfirmPassword(password, confirmPassword);
};

export const validUserForm = () => {
  for (const value of Object.values(errors)) {
    if (value !== "") return false;
  }
  return true;
};

const validateUsername = (username: string) => {
  if (username === "") {
    errors.username = "Username is required";
  } else if (username.length < 6 || username.length > 20)
    errors.username = "Username must be between 6 and 20 symbols";
};

const validatePassword = (password: string) => {
  if (password === "") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be minimum 8 symbols long";
  } else if (!password.match("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]+$"))
    errors.password =
      "Password must include uppercase and lowercase letters, as well as numbers";
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
};

const clearErrors = () => {
  (Object.keys(errors) as Array<keyof UserFormValidationErrors>).forEach((key) => {
    errors[key] = "";
  });
};
