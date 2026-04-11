import express from "express";
import RouteAcceso from "./routes/Route_Acceso.js";
import RouteCliente from "./routes/Route_Cliente.js";
import RouteUsuario from "./routes/Route_Usuario.js";
import RouteFichaMedica from "./routes/Route_FichaMedica.js";
import RouteHistorialMedico from "./routes/Route_HistorialMedico.js";
import RouteReceta from "./routes/Route_Receta.js";
import RouteDosis from "./routes/Route_Dosis.js";
import RouteInventario from "./routes/Route_Inventario.js";
import RouteMaquina from "./routes/Route_Maquina.js";
import "./models/index.js";

const app = express();

app.use(express.json());

app.use("/api/v0", RouteAcceso);
app.use("/api/v0", RouteCliente);
app.use("/api/v0", RouteUsuario);
app.use("/api/v0", RouteFichaMedica);
app.use("/api/v0", RouteHistorialMedico);
app.use("/api/v0", RouteReceta);
app.use("/api/v0", RouteDosis);
app.use("/api/v0", RouteInventario);
app.use("/api/v0", RouteMaquina);

export default app;