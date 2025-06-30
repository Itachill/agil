// src/pages/Home.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { usuarioLogeado } = useContext(AuthContext);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Bienvenido, {usuarioLogeado?.usuario}!</h2>
      <p>Rol: {usuarioLogeado?.rol}</p>
      <p>Selecciona una opción del menú superior para comenzar.</p>
    </div>
  );
}

export default Home;
