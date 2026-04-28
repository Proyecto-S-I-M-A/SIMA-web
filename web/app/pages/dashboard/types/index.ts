export type Row = {
  id: number;
  nombre: string;
  apellido: string | null;
  cedula: string | null;
  correo: string | null;
  asegurado: boolean;
  verificado: boolean;
  sexo: string | null;
  id_acceso: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SortKey = keyof Row;
export type SortDir = 'asc' | 'desc';