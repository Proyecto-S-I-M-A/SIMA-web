export interface UsuarioAttributes {
  id: number;
  nombre: string | null;
  apellido: string | null;
  rol: string | null;
  password: string | null;
  usuario: string | null;
  ruc_doctor: string | null;
  especialidades: string | null;
}

export interface UsuarioCreationAttributes {
  id?: number;
  nombre?: string | null;
  apellido?: string | null;
  rol?: string | null;
  password?: string | null;
  usuario?: string | null;
  ruc_doctor?: string | null;
  especialidades?: string | null;
}

export type UsuarioUpdateAttributes = Partial<Omit<UsuarioAttributes, "id">>;