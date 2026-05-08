import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Rutas públicas
  index("routes/index.tsx"),
  route("login", "pages/login/route.tsx"),
  route("autenticacion", "pages/autenticacion/route.tsx"),
  route("no-autorizado", "pages/unauthorized/route.tsx"),

  // Rutas protegidas (requieren autenticación)
  route("home", "pages/dashboard/route.tsx"),
  route("home/historial", "pages/historial/route.tsx"),
  route("home/nueva-receta", "pages/nueva-receta/route.tsx"),
  // ruta dinámicamente para cada paciente, con su cedula como parámetro
  route("home/paciente/:cedula", "pages/detalles/route.tsx"),

  route("admin", "pages/admin/route.tsx"),
  route("*", "routes/catch-all.tsx"),

] satisfies RouteConfig;
