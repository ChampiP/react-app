const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Registro
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  const hash = await bcrypt.hash(password, 8);
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, hash]
  );
  res.status(201).json({ id: result.insertId });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email=?", [
    email,
  ]);
  if (!rows.length)
    return res.status(400).json({ message: "Usuario no encontrado" });

  const user = rows[0];
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// CRUD Usuarios (protegido)
router.get("/", auth, async (req, res) => {
  const [rows] = await db.query("SELECT id, nombre, email FROM usuarios");
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const { nombre, email } = req.body;
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, email) VALUES (?, ?)",
    [nombre, email]
  );
  res.status(201).json({ id: result.insertId });
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  await db.query("UPDATE usuarios SET nombre=?, email=? WHERE id=?", [
    nombre,
    email,
    id,
  ]);
  res.sendStatus(204);
});

router.delete("/:id", auth, async (req, res) => {
  await db.query("DELETE FROM usuarios WHERE id=?", [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
