const express = require("express");
const path = require("path");
const app = express();
const db = require("./db");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const envs = require("./config/envs");
const cors = require("cors");
// const authRoutes = require("./routes/oAuth");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000", // URL del frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita el intercambio de cookies a través de las solicitudes
    optionsSuccessStatus: 204,
  })
);
// parsing middleware
app.use(cookieParser());
app.use(express.json());
//Express routing
app.use("/api", routes);
// app.use("/auth", authRoutes);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//------------------------------------------------------------------
// app.use("/api", (req, res) => {
//   res.sendStatus(404);
// });

app.use((req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    // Recién ahora estamos seguros que la conexión fue exitosa
    app.listen(3001, () =>
      console.log("Servidor de express escuchando en el puerto 3001")
    );
  })
  .catch(console.error);
