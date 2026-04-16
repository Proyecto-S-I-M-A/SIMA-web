export interface AccesoAttributes {
  id: number;
  usuario: string;
  tipo: string;
  ultimo_acceso: Date | null;
  correo: string;
  activo: boolean;
  updatedAt: Date;
}

export interface AccesoCreationAttributes {
  usuario?: string;
  tipo?: string;
  ultimo_acceso?: Date | null;
  correo?: string;
  activo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
