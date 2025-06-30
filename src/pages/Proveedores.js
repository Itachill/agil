// src/pages/Proveedores.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Proveedores() {
  const { usuarioLogeado } = useContext(AuthContext);

  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem("proveedores");
    if (guardados) {
      setProveedores(JSON.parse(guardados));
    }
  }, []);

  // Guardar al cambiar la lista
  useEffect(() => {
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
  }, [proveedores]);

  const validarRut = (rut) => {
    return /^[0-9]+-[0-9kK]{1}$/.test(rut);
  };

  const validarCorreo = (correo) => {
    return correo.includes("@");
  };

  const agregarProveedor = (e) => {
    e.preventDefault();

    if (!nombre || !rut || !correo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!validarRut(rut)) {
      alert("RUT no válido. Usa formato XXXXXXXX-X");
      return;
    }

    if (!validarCorreo(correo)) {
      alert("Correo no válido.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      rut,
      correo,
    };

    setProveedores([...proveedores, nuevo]);
    setNombre("");
    setRut("");
    setCorreo("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Proveedores</h2>

      {(usuarioLogeado?.rol === "admin" || usuarioLogeado?.rol === "editar") && (
        <form onSubmit={agregarProveedor} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="RUT (ej: 12345678-9)"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button type="submit" style={{ padding: "5px 10px" }}>
            Agregar
          </button>
        </form>
      )}

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.id}</td>
              <td>{prov.nombre}</td>
              <td>{prov.rut}</td>
              <td>{prov.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Proveedores;
