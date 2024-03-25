import { ChangeEvent, useState } from "react";
import { getErrors, validUserForm, validateUserForm } from "../utils/validate";
import { loginUser } from "../services/user";
import { AuthContextType } from "../utils/auth";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import {
  UserFormDatabaseErrors,
  UserFormValidationErrors,
} from "../utils/errors";

interface LoginFormInterface {
  username: string;
  password: string;
}

export const loginAction =
  (authContext: AuthContextType): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    validateUserForm({ username, password });
    if (!validUserForm()) return getErrors();

    try {
      let loggedIn = await loginUser(username as string, password as string);
      if (loggedIn) {
        authContext.login({ username, isLogged: true });
        return redirect("/");
      }
    } catch (e) {
      if (e instanceof Error)
        return { message: e.message } as UserFormDatabaseErrors;
      return { message: String(e) };
    }
  };

const Login = () => {
  const validationErrors = useActionData() as UserFormValidationErrors;
  const databaseErrors = useActionData() as UserFormDatabaseErrors;

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
        {databaseErrors && <p className="error">{databaseErrors.message}</p>}
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
          {validationErrors?.username && <p className="error">{validationErrors.username}</p>}
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
          {validationErrors?.password && <p className="error">{validationErrors.password}</p>}
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
