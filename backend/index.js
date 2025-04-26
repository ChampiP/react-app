const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuarios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
