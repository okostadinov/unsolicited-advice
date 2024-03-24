import { ChangeEvent, useState } from "react";
import { ActionFunction, Form, redirect } from "react-router-dom";
import { createUser, userExists } from "../services/user";

type UserFormType = "Register" | "Login";

interface UserFormProps {
  userFormType: UserFormType;
}

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) return null;

  let created = await createUser(username as string, password as string);

  if (!created) throw new Error("User with this name already exists");

  return redirect(`/login`);
};

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) return null;

  let exists = await userExists(username as string, password as string);

  if (!exists) throw new Error("Invalid username or password");

  return redirect(`/login`);
};

const UserForm = ({ userFormType }: UserFormProps) => {
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
      </div>
      <button type="submit">{userFormType}</button>
    </Form>
  );
};

export default UserForm;
