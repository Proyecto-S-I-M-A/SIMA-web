export interface FichaMedicaAttributes {
  id: number;
  id_cliente: number;
  tipo_sanguineo: string | null;
  alergenos: string | null;
  enfermedad_cronica: string | null;
}

export interface FichaMedicaCreationAttributes {
  id?: number;
  id_cliente: number;
  tipo_sanguineo?: string | null;
  alergenos?: string | null;
  enfermedad_cronica?: string | null;
}

export type FichaMedicaUpdateAttributes = Partial<
  Omit<FichaMedicaAttributes, "id">
>;