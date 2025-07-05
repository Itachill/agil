import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Proveedores from "./pages/Proveedores";
import Login from "./pages/login";
import CrearUsuario from "./pages/CrearUsuario";
import VerUsuarios from "./pages/VerUsuarios";
import RutaProtegida from "./components/RutaProtegida";
import { AuthContext } from "./context/AuthContext";
import './App.css'; // 🟦 Importa tus estilos

function App() {
  const { usuarioLogeado, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="App">
      {usuarioLogeado && (
        <div className="sidebar">
          <h2>INVENTARIO</h2>
          <Link to="/" className="nav-link">🏠 Inicio</Link>
          <Link to="/inventario" className="nav-link">📦 Inventario</Link>
          <Link to="/proveedores" className="nav-link">🚚 Proveedores</Link>

          {usuarioLogeado.rol === "admin" && (
            <>
              <Link to="/crear-usuario" className="nav-link">👤 Crear Usuario</Link>
              <Link to="/ver-usuarios" className="nav-link">📋 Ver Usuarios</Link>
            </>
          )}

          <button
            onClick={cerrarSesion}
            style={{
              margin: "1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer"
            }}
          >
            🔒 Cerrar sesión
          </button>

          <div style={{ marginTop: "auto", padding: "1rem", fontSize: "0.9rem" }}>
            👤 <strong>{usuarioLogeado.usuario}</strong> ({usuarioLogeado.rol})
          </div>
        </div>
      )}

      <div className="main">
        <Routes>
          <Route path="/" element={<RutaProtegida><Home /></RutaProtegida>} />
          <Route path="/inventario" element={<RutaProtegida><Inventario /></RutaProtegida>} />
          <Route path="/proveedores" element={<RutaProtegida><Proveedores /></RutaProtegida>} />
          <Route path="/crear-usuario" element={<RutaProtegida soloAdmin={true}><CrearUsuario /></RutaProtegida>} />
          <Route path="/ver-usuarios" element={<RutaProtegida soloAdmin={true}><VerUsuarios /></RutaProtegida>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<RutaProtegida><Home /></RutaProtegida>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
