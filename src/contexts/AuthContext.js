import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persistedAuth);
  const [user, setUser] = useState("Guest");
  function login(authData) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  function userData(authData) {
    setUser(authData);
  }

  return (
    <AuthContext.Provider value={{ auth, login, userData, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;