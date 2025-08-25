const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a Hybridge Blog API" });
});

// Ejemplo de posts
let posts = [
  { id: 1, title: "Primer Post", content: "Contenido del primer post" },
  { id: 2, title: "Segundo Post", content: "Contenido del segundo post" },
];

// Obtener todos los posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Obtener un post por ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post no encontrado" });
  res.json(post);
});

// Crear un nuevo post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
