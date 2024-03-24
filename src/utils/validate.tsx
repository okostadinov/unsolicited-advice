export interface UserFormErrors {
  username: string;
  password: string;
}

const errors: UserFormErrors = {
  username: "",
  password: "",
};

export const getErrors = () => errors;

export const validateUserForm = (username: string, password: string) => {
  clearErrors();
  validateUsername(username);
  validatePassword(password);
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
  } else if (!password.match("^[A-Za-z0-9]+$"))
    errors.password = "Password must include letters and numbers";
};

const clearErrors = () => {
  errors.username = "";
  errors.password = "";
};
