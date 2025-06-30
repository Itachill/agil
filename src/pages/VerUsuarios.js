// src/pages/VerUsuarios.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function VerUsuarios() {
  const { usuarioLogeado } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(datos);
  }, []);

  const eliminarUsuario = (usuarioAEliminar) => {
    if (usuarioAEliminar === "admin") {
      alert("⚠️ No puedes eliminar al usuario administrador principal.");
      return;
    }

    const confirm = window.confirm(`¿Eliminar al usuario "${usuarioAEliminar}"?`);
    if (confirm) {
      const nuevos = usuarios.filter(u => u.usuario !== usuarioAEliminar);
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
    }
  };

  if (!usuarioLogeado || usuarioLogeado.rol !== "admin") {
    return <p>No tienes permisos para ver esta página.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Usuarios del Sistema</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={index}>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  onClick={() => eliminarUsuario(u.usuario)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px"
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerUsuarios;
