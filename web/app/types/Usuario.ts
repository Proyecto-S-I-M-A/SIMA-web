import { z } from 'zod';

// Schema para lectura (todas las propiedades)
export const UsuarioSchema = z.object({
  id: z.number(),
  nombre: z.string().nullable(),
  apellido: z.string().nullable(),
  rol: z.string().nullable(),
  password: z.string().nullable(),
  usuario: z.string().nullable(),
  ruc_doctor: z.string().nullable(),
  especialidades: z.string().nullable(),
});

// Schema para creación
export const UsuarioCreationSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().nullable().optional(),
  rol: z.string().min(1, 'El rol es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  usuario: z.string().min(1, 'El usuario es requerido'),
  ruc_doctor: z.string().nullable().optional(),
  especialidades: z.string().nullable().optional(),
});

// Schema para actualización
export const UsuarioUpdateSchema = UsuarioCreationSchema.omit({ password: true }).partial().merge(
  z.object({ password: z.string().min(6).optional() })
);

// Types derivados
export type Usuario = z.infer<typeof UsuarioSchema>;
export type UsuarioCreation = z.infer<typeof UsuarioCreationSchema>;
export type UsuarioUpdate = z.infer<typeof UsuarioUpdateSchema>;
