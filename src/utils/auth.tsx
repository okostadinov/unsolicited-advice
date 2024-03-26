import React, { createContext, useContext, useState } from "react";

export interface AuthContextInterface {
  user: UserContextType;
  login: (user: UserContextType) => void;
  logout: () => void;
}

interface UserContextType {
  username: string;
  isLogged: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<UserContextType>({
    username: "",
    isLogged: false,
  });

  const login = (user: UserContextType) => {
    setUser(user);
  };

  const logout = () => {
    setUser({ username: "", isLogged: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
