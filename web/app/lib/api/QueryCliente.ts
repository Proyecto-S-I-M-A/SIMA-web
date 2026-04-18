import { id } from 'zod/v4/locales';
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Cliente } from "~/types/cliente";
import { apiJson } from "../apiClient";

export const useGetClientes = (id: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["clientes", id],
    queryFn: async (): Promise<Cliente[]> => {
      return apiJson<Cliente[]>(`/clientes/${id}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
};
