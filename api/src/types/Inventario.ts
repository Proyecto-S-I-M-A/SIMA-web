export interface InventarioAttributes {
  id: number;
  nombre_medicamento: string | null;
  marca: string | null;
  precio: number | null;
  codigo: string | null;
  resetado: boolean | null;
}

export interface InventarioCreationAttributes {
  id?: number;
  nombre_medicamento?: string | null;
  marca?: string | null;
  precio?: number | null;
  resetado?: boolean | null;
  codigo?: string | null;
}

export type InventarioUpdateAttributes = Partial<
  Omit<InventarioAttributes, "id">
>;

export interface MaquinaInventarioAttributes {
  id: number;
  id_maquina: string;
  id_inventario: number;
  cantidad: number | null;
}

export interface MaquinaInventarioCreationAttributes {
  id?: number;
  id_maquina: string;
  id_inventario: number;
  cantidad?: number | null;
}

export type MaquinaInventarioUpdateAttributes = Partial<
  Omit<MaquinaInventarioAttributes, "id">
>;