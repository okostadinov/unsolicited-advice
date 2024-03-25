import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Root = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Root;
