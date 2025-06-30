import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Inventario() {
  const { usuarioLogeado } = useContext(AuthContext); // ← accede al usuario
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("todos");

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoStock, setNuevoStock] = useState("");
  const [nuevoOC, setNuevoOC] = useState("");
  const [nuevoProveedorID, setNuevoProveedorID] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [stockEditado, setStockEditado] = useState("");

  useEffect(() => {
    const guardadoProductos = localStorage.getItem("productos");
    const guardadoProveedores = localStorage.getItem("proveedores");

    if (guardadoProductos) setProductos(JSON.parse(guardadoProductos));
    if (guardadoProveedores) setProveedores(JSON.parse(guardadoProveedores));
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevoNombre || isNaN(nuevoStock) || !nuevoOC || !nuevoProveedorID) {
      alert("Completa todos los campos correctamente.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      stock: parseInt(nuevoStock),
      oc: nuevoOC,
      proveedorId: nuevoProveedorID,
    };

    setProductos([...productos, nuevo]);
    setNuevoNombre("");
    setNuevoStock("");
    setNuevoOC("");
    setNuevoProveedorID("");
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setStockEditado(producto.stock);
  };

  const guardarEdicion = (id) => {
    const actualizados = productos.map((p) =>
      p.id === id ? { ...p, stock: parseInt(stockEditado) } : p
    );
    setProductos(actualizados);
    setEditandoId(null);
    setStockEditado("");
  };

  const productosFiltrados =
    proveedorSeleccionado === "todos"
      ? productos
      : productos.filter((p) => p.proveedorId === proveedorSeleccionado);

  const obtenerNombreProveedor = (id) => {
    const proveedor = proveedores.find((prov) => prov.id.toString() === id);
    return proveedor ? proveedor.nombre : "Desconocido";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Inventario - Agregar Material</h2>

      {(usuarioLogeado?.rol === "admin" || usuarioLogeado?.rol === "editar") && (
        <form onSubmit={agregarProducto} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="number"
            placeholder="Stock"
            value={nuevoStock}
            onChange={(e) => setNuevoStock(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", width: "100px" }}
          />
          <input
            type="text"
            placeholder="OC (Orden de Compra)"
            value={nuevoOC}
            onChange={(e) => setNuevoOC(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", width: "150px" }}
          />
          <select
            value={nuevoProveedorID}
            onChange={(e) => setNuevoProveedorID(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          >
            <option value="">Seleccione Proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
          <button type="submit" style={{ padding: "5px 10px" }}>
            Agregar
          </button>
        </form>
      )}

      <h3>Filtrar por proveedor:</h3>
      <select
        value={proveedorSeleccionado}
        onChange={(e) => setProveedorSeleccionado(e.target.value)}
        style={{ marginBottom: "1rem", padding: "5px" }}
      >
        <option value="todos">Todos</option>
        {proveedores.map((prov) => (
          <option key={prov.id} value={prov.id.toString()}>
            {prov.nombre}
          </option>
        ))}
      </select>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>OC</th>
            <th>Proveedor</th>
            <th>Alerta</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr
              key={producto.id}
              style={{ backgroundColor: producto.stock <= 5 ? "#ffe5e5" : "white" }}
            >
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>
                {editandoId === producto.id ? (
                  (usuarioLogeado?.rol === "admin" || usuarioLogeado?.rol === "editar") ? (
                    <input
                      type="number"
                      value={stockEditado}
                      onChange={(e) => setStockEditado(e.target.value)}
                      style={{ width: "60px" }}
                    />
                  ) : (
                    producto.stock
                  )
                ) : (
                  producto.stock
                )}
              </td>
              <td>{producto.oc}</td>
              <td>{obtenerNombreProveedor(producto.proveedorId)}</td>
              <td>
                {producto.stock <= 5 ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    🔴 Stock bajo
                  </span>
                ) : (
                  "✔️ OK"
                )}
              </td>
              <td>
                {(usuarioLogeado?.rol === "admin" || usuarioLogeado?.rol === "editar") ? (
                  editandoId === producto.id ? (
                    <button onClick={() => guardarEdicion(producto.id)}>Guardar</button>
                  ) : (
                    <button onClick={() => iniciarEdicion(producto)}>Editar</button>
                  )
                ) : (
                  "Sin permisos"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;
