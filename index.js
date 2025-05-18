/* CREACIÓN DE API LOGIN */

// Importamos las librerías necesarias
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// Middleware para poder leer JSON en las solicitudes POST
app.use(bodyParser.json());

// Base de datos simulada en memoria para usuarios
const users = []; // Aquí guardaremos los usuarios registrados

// Ruta para registrar un nuevo usuario
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son requeridos" });
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  users.push({ username, password });
  res.status(201).json({ message: "Usuario registrado correctamente" });
});

// Ruta para login (inicio de sesión)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son requeridos" });
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.json({ message: "Autenticación satisfactoria" });
  } else {
    res.status(401).json({ message: "Error en la autenticación" });
  }
});

// NUEVA RUTA: Ver usuarios registrados (solo para pruebas)
app.get("/users", (req, res) => {
  res.json(users);
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
