import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsauthenticated] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const login = () => {
    localStorage.setItem("loggedIn", "true");
    setIsauthenticated(true);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }

  return context;
};
