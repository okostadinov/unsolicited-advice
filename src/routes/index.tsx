import AdviceGenerator from "../components/advice-generator";
import { useAuth } from "../utils/auth";

const Index = () => {
  const auth = useAuth();

  return (
    <div className="pt-10 flex flex-col items-center  gap-6">
      <h1 className="text-3xl text-stone-800 font-semibold font-sans">Hello, {auth.user.username}</h1>
      <AdviceGenerator />
    </div>
  );
};

export default Index;
