import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { registerUser } from "../services/user";
import { NonFieldErrors, ValidationErrors } from "../utils/errors";
import { AlertContextInterface } from "../utils/alert";
import { AlertType } from "../components/alert-dialog";
import Validator from "../utils/validator";

interface RegisterFormInterface {
  username: string;
  password: string;
  confirmPassword: string;
}

export const registerAction =
  (alertContext: AlertContextInterface): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validator = new Validator();
    validator.validate({ username, password, confirmPassword });
    if (!validator.isValid()) return validator.errors;

    try {
      await registerUser(username, password);
      alertContext.setAlert({
        message: "Successfully registed! You may log in now.",
        type: AlertType.Success,
      });
    } catch (e) {
      if (e instanceof Error) return { message: e.message } as NonFieldErrors;
      return { message: String(e) };
    }

    return redirect(`/login`);
  };

const Register = () => {
  const validationErrors = useActionData() as ValidationErrors;
  const nonFieldErrors = useActionData() as NonFieldErrors;

  const [input, setInput] = useState<RegisterFormInterface>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Form method="POST">
        <h1>Register</h1>
        {nonFieldErrors && <p className="error">{nonFieldErrors.message}</p>}
        <div>
          <label>
            Username{" "}
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleInput}
            />
          </label>
          {validationErrors?.username && (
            <p className="error">{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label>
            Password{" "}
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </label>
          {validationErrors?.password && (
            <p className="error">{validationErrors.password}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password{" "}
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleInput}
            />
          </label>
          {validationErrors?.confirmPassword && (
            <p className="error">{validationErrors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </Form>
      <p>
        Already registered? <Link to={`../login`}>Login</Link>
      </p>
    </>
  );
};

export default Register;
