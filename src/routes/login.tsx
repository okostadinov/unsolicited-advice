import { ChangeEvent, useState } from "react";
import { loginUser } from "../services/user";
import { AuthContextInterface } from "../utils/auth";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import {
  NonFieldErrors,
  ValidationErrors,
} from "../utils/errors";
import { AlertContextInterface } from "../utils/alert";
import { AlertType } from "../components/alert-dialog";
import Validator from "../utils/validator";

interface LoginFormInterface {
  username: string;
  password: string;
}

export const loginAction =
  (
    authContext: AuthContextInterface,
    alertContext: AlertContextInterface
  ): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validator = new Validator();
    validator.validate({ username, password });
    if (!validator.isValid()) return validator.errors;

    try {
      let loggedIn = await loginUser(username as string, password as string);
      if (loggedIn) {
        authContext.login({ username, isLogged: true });
        alertContext.setAlert({
          message: "Successfully logged in!",
          type: AlertType.Success,
        });
        return redirect("/");
      }
    } catch (e) {
      if (e instanceof Error)
        return { message: e.message } as NonFieldErrors;
      return { message: String(e) };
    }
  };

const Login = () => {
  const validationErrors = useActionData() as ValidationErrors;
  const nonFieldErrors = useActionData() as NonFieldErrors;

  const [input, setInput] = useState<LoginFormInterface>({
    username: "",
    password: "",
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
        <h1>Login</h1>
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
        <button type="submit">Login</button>
      </Form>
      <p>
        Don't have an account? <Link to={`../register`}>Register</Link>
      </p>
    </>
  );
};

export default Login;
