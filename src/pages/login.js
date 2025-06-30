import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, usuarioLogeado } = useContext(AuthContext);

  // 👉 Si ya está logeado, redirigir al home
  useEffect(() => {
    if (usuarioLogeado) {
      navigate("/");
    }
  }, [usuarioLogeado, navigate]);

  // 👇 Agrega el admin por defecto si no existe
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeAdmin = usuarios.some(u => u.usuario === "admin");

    if (!existeAdmin) {
      usuarios.push({ usuario: "admin", clave: "1234", rol: "admin" });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(
      (u) => u.usuario === usuario && u.clave === clave
    );

    if (encontrado) {
      login(encontrado); // ✅ usamos el contexto
      navigate("/"); // ✅ redirige al Home
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit" style={{ padding: "5px 10px" }}>
          Iniciar sesión
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
