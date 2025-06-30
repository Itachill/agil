// src/App.js
import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home"; // ← NUEVO
import Inventario from "./pages/Inventario";
import Proveedores from "./pages/Proveedores";
import Login from "./pages/login";
import CrearUsuario from "./pages/CrearUsuario";
import VerUsuarios from "./pages/VerUsuarios";
import RutaProtegida from "./components/RutaProtegida";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { usuarioLogeado, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* 🔵 Navegación solo si hay usuario logeado */}
      {usuarioLogeado && (
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Inicio</Link>
          <Link to="/inventario" style={{ marginRight: "10px" }}>Inventario</Link>
          <Link to="/proveedores" style={{ marginRight: "10px" }}>Proveedores</Link>

          {/* 🔒 Opciones exclusivas del admin */}
          {usuarioLogeado.rol === "admin" && (
            <>
              <Link to="/crear-usuario" style={{ marginRight: "10px" }}>Crear Usuario</Link>
              <Link to="/ver-usuarios" style={{ marginRight: "10px" }}>Ver Usuarios</Link>
            </>
          )}

          {/* 🔴 Botón de cierre de sesión */}
          <button
            onClick={cerrarSesion}
            style={{
              marginLeft: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Cerrar sesión
          </button>

          {/* 👤 Mostrar usuario y rol */}
          <span style={{ marginLeft: "20px", fontStyle: "italic" }}>
            Usuario: <strong>{usuarioLogeado.usuario}</strong> ({usuarioLogeado.rol})
          </span>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<RutaProtegida><Home /></RutaProtegida>} />
        <Route path="/inventario" element={<RutaProtegida><Inventario /></RutaProtegida>} />
        <Route path="/proveedores" element={<RutaProtegida><Proveedores /></RutaProtegida>} />
        <Route path="/crear-usuario" element={<RutaProtegida soloAdmin={true}><CrearUsuario /></RutaProtegida>} />
        <Route path="/ver-usuarios" element={<RutaProtegida soloAdmin={true}><VerUsuarios /></RutaProtegida>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<RutaProtegida><Home /></RutaProtegida>} /> {/* fallback */}
      </Routes>
    </div>
  );
}

export default App;
