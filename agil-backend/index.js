const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
const db = new sqlite3.Database("./agil.db");

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    stock INTEGER NOT NULL
  )
`);

// Obtener productos
app.get("/productos", (req, res) => {
  db.all("SELECT * FROM productos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Agregar producto
app.post("/productos", (req, res) => {
  const { nombre, stock } = req.body;
  db.run(
    "INSERT INTO productos (nombre, stock) VALUES (?, ?)",
    [nombre, stock],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
