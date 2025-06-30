import React from "react";
import { Navigate } from "react-router-dom";

function RutaProtegida({ children, soloAdmin = false }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (soloAdmin && usuario.rol !== "admin") {
    return <Navigate to="/inventario" />;
  }

  return children;
}

export default RutaProtegida;
