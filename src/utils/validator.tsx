import { ValidationErrors } from "./errors";

export default class Validator {
  #errors: ValidationErrors = {};

  get errors(): ValidationErrors {
    return this.#errors;
  }

  validate(props: ValidationErrors) {
    const { username, password, confirmPassword } = props;
    username !== undefined && this.#validateUsername(username);
    password !== undefined && this.#validatePassword(password);
    password !== undefined &&
      confirmPassword !== undefined &&
      this.#validateConfirmPassword(password, confirmPassword);
  }

  isValid() {
    for (const value of Object.values(this.#errors)) {
      if (value !== "") return false;
    }
    return true;
  }

  #validateUsername(username: string) {
    if (username === "") {
      this.#errors.username = "Username is required";
    } else if (username.length < 6 || username.length > 20) {
      this.#errors.username = "Username must be between 6 and 20 symbols";
    }
  }

  #validatePassword(password: string) {
    if (password === "") {
      this.#errors.password = "Password is required";
    } else if (password.length < 8) {
      this.#errors.password = "Password must be minimum 8 symbols long";
    } else if (
      !password.match("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]+$")
    ) {
      this.#errors.password =
        "Password must include uppercase and lowercase letters, as well as numbers";
    }
  }

  #validateConfirmPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      this.#errors.confirmPassword = "Passwords do not match";
    }
  }
}
