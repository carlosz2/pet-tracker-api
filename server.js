// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas para la tabla "users"
app.post('/users', async (req, res) => {
  const { nombre, apellido, pass, email, fnac, tipo_usuario, img, confirmed_account } = req.body;
  try {
    const conn = await db.getConnection();
    const result = await conn.query(
      'INSERT INTO users (nombre, apellido, pass, email, fnac, tipo_usuario, img, confirmed_account) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, pass, email, fnac, tipo_usuario, img, confirmed_account]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    let conn;
    try {
      conn = await db.getConnection();
      const rows = await conn.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      res.status(500).json(err);
    } finally {
      if (conn) conn.release(); // Asegúrate de liberar la conexión
    }
  });

// Obtener un usuario por ID
app.get('/users/:id', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const row = await conn.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(row);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar un usuario
app.put('/users/:id', async (req, res) => {
  const { nombre, apellido, pass, email, fnac, tipo_usuario, img, confirmed_account } = req.body;
  try {
    const conn = await db.getConnection();
    const result = await conn.query(
      'UPDATE users SET nombre = ?, apellido = ?, pass = ?, email = ?, fnac = ?, tipo_usuario = ?, img = ?, confirmed_account = ? WHERE id = ?',
      [nombre, apellido, pass, email, fnac, tipo_usuario, img, confirmed_account, req.params.id]
    );
    res.json({ updated: result.affectedRows });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Borrar un usuario
app.delete('/users/:id', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ deleted: result.affectedRows });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
