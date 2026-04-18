import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Debe ser un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
})

export type LoginData = z.infer<typeof LoginSchema>;

export const LoginResponse = z.object({
  message: z.string(),
  session: z.object({
    user: z.string(),
    access_token: z.string(),
    refresh_token: z.string(),
  }).optional(),
});

export type LoginResponseData = z.infer<typeof LoginResponse>;
