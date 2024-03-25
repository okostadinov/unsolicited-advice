import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  username: string;
}

interface AuthContextType {
  user: UserContextType | null;
  login: (user: UserContextType) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<UserContextType | null>(null);

  const login = (user: UserContextType) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
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
