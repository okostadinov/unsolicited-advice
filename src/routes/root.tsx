import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Alert from "../components/alert-dialog";

const Root = () => {
  return (
    <>
      <Alert />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
