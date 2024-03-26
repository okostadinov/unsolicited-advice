import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Alert from "../components/alert-dialog";

const Root = () => {
  return (
    <>
      <Alert />
      <Navbar/>
      <main className="bg-slate-100">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
