// src/pages/CrearUsuario.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CrearUsuario() {
  const { usuarioLogeado } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [rol, setRol] = useState("visualizar");
  const [error, setError] = useState("");

  // Seguridad: solo admin puede ver esta vista
  if (!usuarioLogeado || usuarioLogeado.rol !== "admin") {
    return <p>No tienes permisos para crear usuarios.</p>;
  }

  const handleCrear = (e) => {
    e.preventDefault();

    if (!usuario || !clave || !rol) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find((u) => u.usuario === usuario)) {
      setError("El usuario ya existe");
      return;
    }

    const nuevo = { usuario, clave, rol };
    usuarios.push(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setUsuario("");
    setClave("");
    setRol("visualizar");
    setError("");
    alert("✅ Usuario creado exitosamente");
    navigate("/ver-usuarios");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleCrear}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", display: "block" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", display: "block" }}
        />
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", display: "block" }}
        >
          <option value="visualizar">Visualizar</option>
          <option value="editar">Editar</option>
        </select>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Crear Usuario
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CrearUsuario;
