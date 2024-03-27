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
import { NonFieldErrors, ValidationErrors } from "../utils/errors";
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
      if (e instanceof Error) return { message: e.message } as NonFieldErrors;
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
    <div className="flex flex-col gap-6 items-center p-10">
      <h1 className="text-3xl font-semibold text-stone-800 font-serif">
        Already Registered?
      </h1>
      <Form method="POST" className="flex flex-col gap-2 min-w-80">
        {nonFieldErrors && (
          <p className="text-red-800 font-semibold">{nonFieldErrors.message}</p>
        )}
        <div className="grid">
          <label htmlFor="username" className="text-stone-800 text-lg">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={input.username}
            className="border-2 rounded border-slate-300 px-2 py-1"
            onChange={handleInput}
          />
          {validationErrors?.username && (
            <p className="text-red-800">{validationErrors.username}</p>
          )}
        </div>
        <div className="grid">
          <label htmlFor="password" className="text-stone-800 text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            className="border-2 rounded border-slate-300 px-2 py-1"
            onChange={handleInput}
          />
          {validationErrors?.password && (
            <p className="text-red-800">{validationErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="border border-teal-100 rounded-md px-10 py-3 text-lg uppercase w-fit mx-auto bg-emerald-200 hover:bg-emerald-100 mt-4"
        >
          Login
        </button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to={`../register`} className="text-blue-600 hover:text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
