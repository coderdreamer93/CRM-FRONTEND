import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  });

  // ✅ Login Function
  const login = (token, user) => {
    setAuth({ token, user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // ✅ Logout Function
  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
