import express from "express";
import cors from "cors";
import RouteAcceso from "./routes/Route_Acceso.js";
import RouteCliente from "./routes/Route_Cliente.js";
import RouteUsuario from "./routes/Route_Usuario.js";
import RouteFichaMedica from "./routes/Route_FichaMedica.js";
import RouteHistorialMedico from "./routes/Route_HistorialMedico.js";
import RouteReceta from "./routes/Route_Receta.js";
import RouteDosis from "./routes/Route_Dosis.js";
import RouteInventario from "./routes/Route_Inventario.js";
import RouteMaquina from "./routes/Route_Maquina.js";
import requireSupabaseAuth from "./middleware/requireSupabaseAuth.js";
import RouteSession from "./routes/Route_Session.js";
import RouteGetRecetaByCedula from "./routes/Route-GetRecetaByCedula.js";
import "./models/index.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();

const prefix = "/api/v0";

app.use(cors(
  {
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  }
))

app.use(express.json());
app.use(prefix, RouteSession);

app.use(prefix, requireSupabaseAuth);
// Rutas protegidas por autenticación
app.use(prefix, RouteGetRecetaByCedula);
app.use(prefix, RouteAcceso);
app.use(prefix, RouteCliente);
app.use(prefix, RouteUsuario);
app.use(prefix, RouteFichaMedica);
app.use(prefix, RouteHistorialMedico);
app.use(prefix, RouteReceta);
app.use(prefix, RouteDosis);
app.use(prefix, RouteInventario);
app.use(prefix, RouteMaquina);

export default app;