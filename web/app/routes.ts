import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "pages/login/route.tsx"),
  route("autenticacion", "pages/autenticacion/route.tsx"),
  route("home", "pages/dashboard/route.tsx"),
  route("home/historial", "pages/historial/route.tsx"),
  route("home/nueva-receta", "pages/nueva-receta/route.tsx"),
  // ruta dimamicamente para cada paciente, con su cedula como parametro
  route("home/paciente/:cedula", "pages/detalles/route.tsx"),

  route("admin", "pages/admin/route.tsx"),
  route("*", "routes/catch-all.tsx"),

] satisfies RouteConfig;
