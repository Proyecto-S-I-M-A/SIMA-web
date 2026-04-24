import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "pages/login/route.tsx"),
  route("autenticacion", "pages/autenticacion/route.tsx"),
  route("home", "pages/dashboard/route.tsx"),
  

  // route("home/paciente/:cedula", "pages/paciente/route.tsx"),
  
  route("details", "pages/detalles/route.tsx"),
  route("admin", "pages/admin/route.tsx"),
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
