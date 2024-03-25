import AdviceGenerator from "../components/advice-generator";
import { useAuth } from "../utils/auth";

const Index = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Hello {auth.user.username}</h1>
      <AdviceGenerator />
    </>
  );
};

export default Index;
