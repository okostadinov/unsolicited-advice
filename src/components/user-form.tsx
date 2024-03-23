import { ChangeEvent, useState } from "react";
import { Form } from "react-router-dom";

type UserFormType = "Register" | "Login";

interface UserFormProps {
  userFormType: UserFormType;
}

// export const action = () => {
//   const user = await createUser();
//   return { user };
// };

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
