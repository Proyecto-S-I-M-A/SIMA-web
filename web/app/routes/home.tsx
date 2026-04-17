import type { Route } from "./+types/home";
import { Login } from "../components/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FarmaTic - Login" },
    { name: "description", content: "Sistema de Gestión Farmacéutica" },
  ];
}

export default function Home() {
  return <Login />;
}
