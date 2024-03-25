import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { ChangeEvent, useState } from "react";
import {
  UserFormErrors,
  getErrors,
  validUserForm,
  validateUserForm,
} from "../utils/validate";
import { registerUser } from "../services/user";

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
    throw e;
  }

  return redirect(`/login`);
};

const Register = () => {
  const errors = useActionData() as UserFormErrors;

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
          {errors?.username && <p className="error">{errors.username}</p>}
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
          {errors?.password && <p className="error">{errors.password}</p>}
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
          {errors?.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </Form>
      <p>
        Already register? <Link to={`../login`}>Login</Link>
      </p>
    </>
  );
};

export default Register;
