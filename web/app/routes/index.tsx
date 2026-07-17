import type { Route } from "./+types/index";
import Landing from "~/pages/landing/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "S.I.M.A. - Sistema Inteligente de Medicación Asistida" },
    {
      name: "description",
      content:
        "Plataforma que conecta médicos, pacientes y dispensación automatizada de medicamentos.",
    },
  ];
}

export default function App() {
  return <Landing />;
}
