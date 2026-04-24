export type Row = {
  nombre: string;
  apellido: string;
  edad: number;
  motivo: string;
  cedula: string;
  correo: string;
  asegurado: boolean;
  sexo: string;
};
 
export type SortKey = keyof Row;
export type SortDir = 'asc' | 'desc';
 