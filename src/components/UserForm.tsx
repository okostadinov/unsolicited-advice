import { useState } from "react";

type UserFormType = "Register" | "Login";

interface UserFormProps {
  userFormType: UserFormType;
}

const UserForm = ({ userFormType }: UserFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form method="POST">
      <h1>{userFormType}</h1>
      <div>
        <label>
          Username{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password{" "}
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">{userFormType}</button>
    </form>
  );
};

export default UserForm;
