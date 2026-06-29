import { useMutation } from "@tanstack/react-query";
import type { LoginData, LoginResponseData } from "~/types/login";
import { apiJson } from "~/lib/apiClient";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (form: LoginData): Promise<LoginResponseData> => {
      return apiJson<LoginResponseData>("/auth/login", {
        method: "POST",
        body: form,
      });
    }
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (form: LoginData): Promise<LoginResponseData> => {
      return apiJson<LoginResponseData>("/auth/signup", {
        method: "POST",
        body: form,
      });
    }
  });
};

export type CreateClienteResponse = { messages: string };


