import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cliente, ClienteUpdate } from "~/types/cliente";
import { apiJson } from "../apiClient";

export const useUpdateClienteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: ClienteUpdate }) => {
      return apiJson<{ message: string }>(`/clientes/${id}`, {
        method: "PUT",
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};

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
