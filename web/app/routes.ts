import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "pages/login/route.tsx"),
  route("home", "pages/dashboard/route.tsx"),
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
