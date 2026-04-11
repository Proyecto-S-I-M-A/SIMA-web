export interface AccesoAttributes {
  id: number;
  usuario: string;
  password: string;
  tipo: string;
  ultimo_acceso: Date | null;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccesoCreationAttributes {
  usuario?: string;
  password?: string;
  tipo?: string;
  ultimo_acceso?: Date | null;
  activo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
