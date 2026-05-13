export interface ClienteAttributes {
  id: number;
  nombre: string;
  apellido: string | null;
  cedula: string | null;
  correo: string | null;
  asegurado: boolean;
  verificado: boolean;
  sexo: string | null;
  id_acceso: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClienteCreationAttributes {
  nombre?: string;
  apellido?: string | null;
  cedula?: string | null;
  correo?: string | null;
  asegurado?: boolean;
  verificado?: boolean;
  sexo?: string | null;
  id_acceso: string;
  createdAt?: Date;
  updatedAt?: Date;
}


