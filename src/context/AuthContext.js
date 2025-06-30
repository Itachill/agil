import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem("usuarioLogeado");
    if (guardado) {
      setUsuarioLogeado(JSON.parse(guardado));
    }
  }, []);

  const login = (usuario) => {
    localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
    setUsuarioLogeado(usuario);
  };

  const logout = () => {
    localStorage.removeItem("usuarioLogeado");
    setUsuarioLogeado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogeado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
