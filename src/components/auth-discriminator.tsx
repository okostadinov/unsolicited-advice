import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const RequireAuth = (props: WrapperProps) => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user.isLogged) {
      <Navigate to={`/login`} />;
    }
  }, []);

  return props.children;
};

export const ExcludeAuth = (props: WrapperProps) => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.user.isLogged) {
      <Navigate to={`/`} />;
    }
  }, []);

  return props.children;
};
