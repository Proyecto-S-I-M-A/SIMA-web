export interface RecetaAttributes {
  id: number;
  id_cliente: number;
  doctor_remitente: string | null;
  ruc_doctor_remitente: string | null;
  hospital_remitente: string | null;
  telefono_hospital: string | null;
  correo: string | null;
  codigo: number | null;
  fecha: Date | null;
}

export interface RecetaCreationAttributes {
  id?: number;
  id_cliente: number;
  doctor_remitente?: string | null;
  ruc_doctor_remitente?: string | null;
  hospital_remitente?: string | null;
  telefono_hospital?: string | null;
  correo?: string | null;
  codigo?: number | null;
  fecha?: Date | null;
}

export type RecetaUpdateAttributes = Partial<Omit<RecetaAttributes, "id">>;