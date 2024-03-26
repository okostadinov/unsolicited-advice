import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const RequireAuth = (props: WrapperProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user.isLogged) navigate("/login");
  }, []);

  return props.children;
};

export const ExcludeAuth = (props: WrapperProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user.isLogged) navigate("/");
  }, []);

  return props.children;
};
