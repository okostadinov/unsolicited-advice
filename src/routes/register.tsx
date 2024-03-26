import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { getErrors, validUserForm, validateUserForm } from "../utils/validate";
import { registerUser } from "../services/user";
import {
  UserFormDatabaseErrors,
  UserFormValidationErrors,
} from "../utils/errors";

interface RegisterFormInterface {
  username: string;
  password: string;
  confirmPassword: string;
}

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  validateUserForm({ username, password, confirmPassword });
  if (!validUserForm()) return getErrors();

  try {
    await registerUser(username, password);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message } as UserFormDatabaseErrors;
    return { message: String(e) };
  }

  return redirect(`/login`);
};

const Register = () => {
  const validationErrors = useActionData() as UserFormValidationErrors;
  const databaseErrors = useActionData() as UserFormDatabaseErrors;

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
