export interface DosisAttributes {
  id: number;
  id_medicamento: number | null;
  id_receta: number;
  cantidad: number | null;
  instrucciones: string | null;
}

export interface DosisCreationAttributes {
  id?: number;
  id_medicamento?: number | null;
  id_receta: number;
  cantidad?: number | null;
  instrucciones?: string | null;
}

export type DosisUpdateAttributes = Partial<Omit<DosisAttributes, "id">>;