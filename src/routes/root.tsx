import { Outlet } from "react-router-dom";
import AdviceGenerator from "../components/advice-generator";
import Navbar from "../components/navbar";

const Root = () => {
  return (
    <main>
      <Navbar />
      <AdviceGenerator />
      <Outlet />
    </main>
  );
};

export default Root;
