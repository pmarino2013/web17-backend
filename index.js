// import { createServer } from "node:http";

// const hostName = "127.0.0.1";
// const port = 4500;

// const server = createServer((req, res) => {
//   //request - response
//   res.statusCode = 200;
//   res.setHeader("Content-type", "text/plain");
//   res.end("Hola Backend!!");
// });

// server.listen(port, hostName, () =>
//   console.log("Server online" + hostName + " port: " + port)
// );

import express from "express";

const app = express();
const PORT = 4500;

app.use(express.static("public"));
app.use(express.json());

//Rutas---------------------------
app.get("/api", (req, res) => {
  res.json({
    msg: "Petición GET",
  });
});

app.post("/api", (req, res) => {
  const { correo, nombre, mensaje } = req.body;

  //   BD.save({
  //     correo,nombre,mensaje
  //   })

  res.json({
    msg: "Datos guardados correctamente",
    correo,
    nombre,
    mensaje,
  });
});

app.put("/api/:id", (req, res) => {
  const { id } = req.params;
  const datos = req.body;
  res.json({
    msg: "Petición PUT",
    id,
    datos,
  });
});

app.delete("/api/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "Se borró el producto con éxito! id de producto: " + id,
    ok: true,
  });
});

app.listen(PORT, () => console.log(`Server online, port: ${PORT}`));
