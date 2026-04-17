import { useMutation } from "@tanstack/react-query";
import { API_URL } from "~/config/ApiConfig";
import type { LoginData, LoginResponseData } from "~/types/login";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (form: LoginData): Promise<LoginResponseData> => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
        const data: LoginResponseData = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        return data;
    }
  });
};