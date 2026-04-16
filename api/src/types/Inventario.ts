export interface InventarioAttributes {
  id: number;
  id_maquina: number;
  nombre_medicamento: string | null;
  marca: string | null;
  precio: number | null;
  cantidad: number | null;
  resetado: boolean | null;
}

export interface InventarioCreationAttributes {
  id?: number;
  id_maquina: number;
  nombre_medicamento?: string | null;
  marca?: string | null;
  precio?: number | null;
  cantidad?: number | null;
  resetado?: boolean | null;
}

export type InventarioUpdateAttributes = Partial<
  Omit<InventarioAttributes, "id">
>;