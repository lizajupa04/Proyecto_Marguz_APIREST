/** CREACIÓN DE REGISTRO DE USUARIOS */

// Requiere Express y crea la app
const express = require("express");
const app = express();

// Permite que la app entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// Datos simulados de estudiantes
const students = [
  { id: 1, nombre: "Liza", edad: 30, inscrito: true },
  { id: 2, nombre: "Janine", edad: 27, inscrito: false },
  { id: 3, nombre: "Stefanny", edad: 34, inscrito: false },
];

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Node JS API");
});

// Obtener todos los estudiantes
app.get("/api/students", (req, res) => {
  res.send(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Estudiante no encontrado");
  res.send(student);
});

// Crear nuevo estudiante
app.post("/api/students", (req, res) => {
  const student = {
    id: students.length + 1,
    nombre: req.body.nombre,
    edad: parseInt(req.body.edad),
    inscrito: req.body.inscrito === "true" || req.body.inscrito === true,
  };

  students.push(student);
  res.send(student);
});

// Eliminar estudiante
app.delete("/api/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Estudiante no encontrado");

  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send(student);
});

// Puerto
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Escuchando nuestro puerto http://localhost:${port}...`)
);
