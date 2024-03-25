import { Link } from "react-router-dom";
import UserForm from "../components/user-form";

const Register = () => {
  return (
    <>
      <UserForm userFormType="Register" />
      <p>
        Already register? <Link to={`../login`}>Login</Link>
      </p>
    </>
  );
};

export default Register;
