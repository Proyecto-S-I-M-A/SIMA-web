import { useMutation, useQuery } from "@tanstack/react-query";
import type { Usuario } from "~/types/Usuario";
import { apiJson } from "../apiClient";

export const useGetUsuarios = (id: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["usuarios", id],
    queryFn: async (): Promise<Usuario[]> => {
      return apiJson<Usuario[]>(`/usuarios/${id}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
};
