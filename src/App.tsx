import "./App.css";
import AdviceGenerator from "./components/AdviceGenerator";
import UserForm from "./components/UserForm";

function App() {
  return (
    <>
      <AdviceGenerator />
      <UserForm userFormType={"Register"} />
      <UserForm userFormType={"Login"} />
    </>
  );
}

export default App;
