import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        {(!auth.user.isLogged && (
          <>
            <li>
              <Link to={`/login`}>Login</Link>
            </li>
            <li>
              <Link to={`/register`}>Register</Link>
            </li>
          </>
        )) || (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
