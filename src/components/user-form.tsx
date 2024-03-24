import { ChangeEvent, useState } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { registerUser, loginUser } from "../services/user";
import {
  UserFormErrors,
  getErrors,
  validUserForm,
  validateUserForm,
} from "../utils/validate";

type UserFormType = "Register" | "Login";

interface UserFormProps {
  userFormType: UserFormType;
}

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  validateUserForm(username, password);
  if (!validUserForm()) return getErrors();

  try {
    await registerUser(username, password);
  } catch (e) {
    throw e;
  }

  return redirect(`/login`);
};

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  validateUserForm(username, password);
  if (!validUserForm()) return getErrors();

  try {
    await loginUser(username as string, password as string);
  } catch (e) {
    throw e;
  }

  return redirect(`/login`);
};

const UserForm = ({ userFormType }: UserFormProps) => {
  const errors = useActionData() as UserFormErrors;

  const [input, setInput] = useState({
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
    <Form method="POST">
      <h1>{userFormType}</h1>
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
        {errors?.username && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">{userFormType}</button>
    </Form>
  );
};

export default UserForm;
