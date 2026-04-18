import { z } from 'zod';
import { id } from 'zod/v4/locales';

// Schema para lectura (todas las propiedades)
export const AccesoSchema = z.object({
  id: z.string(),
  usuario: z.string(),
  tipo: z.string(),
  ultimo_acceso: z.coerce.date().nullable(),
  correo: z.email('Email inválido'),
  activo: z.boolean(),
  updatedAt: z.coerce.date(),
});

// Schema para creación
export const AccesoCreationSchema = z.object({
  id: z.string().nonempty('El ID es requerido'),
  usuario: z.string().min(1, 'El usuario es requerido'),
  tipo: z.string().min(1, 'El tipo es requerido'),
  ultimo_acceso: z.coerce.date().nullable().optional(),
  correo: z.email('Email inválido'),
  activo: z.boolean().optional().default(true),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema para actualización
export const AccesoUpdateSchema = AccesoCreationSchema.partial();

// Types derivados
export type Acceso = z.infer<typeof AccesoSchema>;
export type AccesoCreation = z.infer<typeof AccesoCreationSchema>;
export type AccesoUpdate = z.infer<typeof AccesoUpdateSchema>;
