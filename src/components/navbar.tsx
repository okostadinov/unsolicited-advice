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
    <nav className="p-6 border-b-2 border-stone-500 bg-slate-200">
      <ul className="flex gap-4">
        <li>
          <Link to={`/`} className="font-medium text-l text-stone-800 hover:text-stone-500">
            Home
          </Link>
        </li>
        {(!auth.user.isLogged && (
          <>
            <li className="ml-auto">
              <Link
                to={`/login`}
                className="font-medium text-l text-stone-800 hover:text-stone-500"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={`/register`}
                className="font-medium text-l text-stone-800 hover:text-stone-500"
              >
                Register
              </Link>
            </li>
          </>
        )) || (
          <>
            <li className="ml-auto">
              <button
                onClick={handleLogout}
                className="font-medium text-l text-stone-800 hover:text-stone-500"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
